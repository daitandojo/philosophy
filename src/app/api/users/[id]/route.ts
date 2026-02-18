import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { UserModel } from '@/lib/models/user';
import { UserProfile } from '@/lib/models/userProfile';
import { FollowModel } from '@/lib/models/follow';
import { ActivityModel } from '@/lib/models/activity';
import { VerseModel } from '@/lib/models/verse';
import { Discussion } from '@/lib/models/discussion';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const currentUserId = searchParams.get('currentUserId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    const user = await UserModel.findOne({ _id: userId }).lean();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const profile = await UserProfile.findOne({ userId }).lean();

    const isFollowing = currentUserId
      ? !!(await FollowModel.findOne({ followerId: currentUserId, followingId: userId }))
      : false;

    const followersCount = await FollowModel.countDocuments({ followingId: userId });
    const followingCount = await FollowModel.countDocuments({ followerId: userId });

    const recentActivity = await ActivityModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    const savedVerses = profile?.favoriteQuotes?.slice(0, 5) || [];

    const verseCount = await VerseModel.countDocuments();
    const discussionCount = await Discussion.countDocuments({ authorId: userId });

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        createdAt: user.createdAt,
      },
      profile: {
        displayName: profile?.displayName || user.name,
        bio: profile?.bio || '',
        avatar: profile?.avatar || user.image,
        coverImage: profile?.coverImage,
        location: profile?.location,
        website: profile?.website,
        socialLinks: profile?.socialLinks,
        interests: profile?.interests || [],
        favoritePhilosophers: profile?.favoritePhilosophers || [],
        badges: profile?.badges || [],
        reputation: profile?.reputation || 0,
        isFollowing,
        followersCount,
        followingCount,
        verseCount,
        discussionCount,
      },
      recentActivity: recentActivity.map(a => ({
        type: a.type,
        targetType: a.targetType,
        targetId: a.targetId,
        metadata: a.metadata,
        createdAt: a.createdAt,
      })),
    });
  } catch (error) {
    console.error('User GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}
