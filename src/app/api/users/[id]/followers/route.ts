import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { FollowModel } from '@/lib/models/follow';
import { UserProfile } from '@/lib/models/userProfile';
import { UserModel } from '@/lib/models/user';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type') || 'followers';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    let userIds: string[] = [];

    if (type === 'followers') {
      const follows = await FollowModel.find({ followingId: userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean();
      userIds = follows.map(f => f.followerId);
    } else {
      const follows = await FollowModel.find({ followerId: userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean();
      userIds = follows.map(f => f.followingId);
    }

    const total = type === 'followers'
      ? await FollowModel.countDocuments({ followingId: userId })
      : await FollowModel.countDocuments({ followerId: userId });

    const users = await UserModel.find({ _id: { $in: userIds } })
      .select('name email image')
      .lean();

    const profiles = await UserProfile.find({ userId: { $in: userIds } })
      .lean();

    const profileMap = new Map(profiles.map(p => [p.userId, p]));

    const userData = users.map(u => {
      const profile = profileMap.get(u._id.toString());
      return {
        id: u._id.toString(),
        name: u.name,
        email: u.email,
        image: u.image,
        bio: profile?.bio || '',
        displayName: profile?.displayName,
        isFollowing: type === 'followers' ? false : true,
      };
    });

    return NextResponse.json({
      users: userData,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error('Followers GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch followers' }, { status: 500 });
  }
}
