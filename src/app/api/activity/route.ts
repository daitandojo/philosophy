import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ActivityModel } from '@/lib/models/activity';
import { FollowModel } from '@/lib/models/follow';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    await connectDB();

    let userIds: string[] = [];

    if (userId) {
      const following = await FollowModel.find({ followerId: userId }).lean();
      userIds = [userId, ...following.map(f => f.followingId)];
    }

    const conditions: Record<string, unknown> = {};

    if (userIds.length > 0) {
      conditions.userId = { $in: userIds };
    }

    if (type) {
      conditions.type = type;
    }

    const activities = await ActivityModel.find(conditions)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const total = await ActivityModel.countDocuments(conditions);

    return NextResponse.json({
      activities: activities.map(a => ({
        _id: a._id.toString(),
        userId: a.userId,
        type: a.type,
        targetType: a.targetType,
        targetId: a.targetId,
        metadata: a.metadata,
        createdAt: a.createdAt,
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error('Activity GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}
