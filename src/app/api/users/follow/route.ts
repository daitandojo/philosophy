import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { FollowModel } from '@/lib/models/follow';
import { UserProfile } from '@/lib/models/userProfile';
import { ActivityModel } from '@/lib/models/activity';
import { NotificationModel } from '@/lib/models/notification';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { followerId, followingId } = body;

    if (!followerId || !followingId) {
      return NextResponse.json({ error: 'Follower ID and following ID are required' }, { status: 400 });
    }

    if (followerId === followingId) {
      return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 });
    }

    await connectDB();

    const existing = await FollowModel.findOne({ followerId, followingId });

    if (existing) {
      return NextResponse.json({ error: 'Already following this user' }, { status: 409 });
    }

    await FollowModel.create({ followerId, followingId });

    await UserProfile.updateOne(
      { userId: followingId },
      { $inc: { followers: 1 } }
    );

    await ActivityModel.create({
      userId: followerId,
      type: 'followed',
      targetType: 'user',
      targetId: followingId,
    });

    await NotificationModel.create({
      recipientId: followingId,
      senderId: followerId,
      type: 'follow',
      title: 'New Follower',
      message: 'Someone started following you',
      link: `/u/${followerId}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Follow POST error:', error);
    return NextResponse.json({ error: 'Failed to follow user' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const followerId = searchParams.get('followerId');
    const followingId = searchParams.get('followingId');

    if (!followerId || !followingId) {
      return NextResponse.json({ error: 'Follower ID and following ID are required' }, { status: 400 });
    }

    await connectDB();

    const result = await FollowModel.findOneAndDelete({ followerId, followingId });

    if (!result) {
      return NextResponse.json({ error: 'Not following this user' }, { status: 404 });
    }

    await UserProfile.updateOne(
      { userId: followingId },
      { $inc: { followers: -1 } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Follow DELETE error:', error);
    return NextResponse.json({ error: 'Failed to unfollow user' }, { status: 500 });
  }
}
