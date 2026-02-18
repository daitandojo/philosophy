import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { UserProfile } from '@/lib/models/userProfile';
import { UserModel } from '@/lib/models/user';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    let profile = await UserProfile.findOne({ userId }).lean();

    if (!profile) {
      const user = await UserModel.findOne({ _id: userId }).lean();
      
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      profile = await UserProfile.create({
        userId,
        bio: '',
        favoritePhilosophers: [],
        favoriteQuotes: [],
        followers: 0,
        reputation: 0,
        badges: [],
      });
    }

    return NextResponse.json({
      profile: {
        userId: profile.userId,
        displayName: profile.displayName,
        bio: profile.bio,
        avatar: profile.avatar,
        coverImage: profile.coverImage,
        location: profile.location,
        website: profile.website,
        socialLinks: profile.socialLinks,
        interests: profile.interests,
        favoritePhilosophers: profile.favoritePhilosophers,
        isPublic: profile.isPublic,
        followers: profile.followers,
        reputation: profile.reputation,
        badges: profile.badges,
        privacySettings: profile.privacySettings,
      },
    });
  } catch (error) {
    console.error('Profile GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, displayName, bio, avatar, coverImage, location, website, socialLinks, interests, favoritePhilosophers, isPublic, privacySettings } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    const profile = await UserProfile.findOneAndUpdate(
      { userId },
      {
        $set: {
          ...(displayName !== undefined && { displayName }),
          ...(bio !== undefined && { bio }),
          ...(avatar !== undefined && { avatar }),
          ...(coverImage !== undefined && { coverImage }),
          ...(location !== undefined && { location }),
          ...(website !== undefined && { website }),
          ...(socialLinks !== undefined && { socialLinks }),
          ...(interests !== undefined && { interests }),
          ...(favoritePhilosophers !== undefined && { favoritePhilosophers }),
          ...(isPublic !== undefined && { isPublic }),
          ...(privacySettings !== undefined && { privacySettings }),
        },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Profile PUT error:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
