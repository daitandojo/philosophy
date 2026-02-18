import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { StudyGroupModel } from '@/lib/models/studyGroup';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const learningPathId = searchParams.get('learningPathId');
    const userId = searchParams.get('userId');

    await connectDB();

    const conditions: Record<string, unknown> = {};
    
    if (learningPathId) {
      conditions.learningPathId = learningPathId;
    }

    if (userId) {
      conditions.$or = [
        { isPrivate: false },
        { memberIds: userId },
        { creatorId: userId },
      ];
    }

    const groups = await StudyGroupModel.find(conditions)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      groups: groups.map(g => ({
        _id: g._id.toString(),
        name: g.name,
        description: g.description,
        learningPathId: g.learningPathId,
        creatorId: g.creatorId,
        memberIds: g.memberIds,
        memberCount: g.memberIds?.length || 0,
        maxMembers: g.maxMembers,
        isPrivate: g.isPrivate,
        currentChapter: g.currentChapter,
        discussionEnabled: g.discussionEnabled,
        createdAt: g.createdAt,
      })),
    });
  } catch (error) {
    console.error('Study groups GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch study groups' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, learningPathId, creatorId, maxMembers, isPrivate } = body;

    if (!name || !learningPathId || !creatorId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const group = await StudyGroupModel.create({
      name,
      description,
      learningPathId,
      creatorId,
      memberIds: [creatorId],
      maxMembers: maxMembers || 20,
      isPrivate: isPrivate || false,
      currentChapter: 1,
      discussionEnabled: true,
    });

    return NextResponse.json({
      group: {
        _id: group._id.toString(),
        name: group.name,
        description: group.description,
        learningPathId: group.learningPathId,
        creatorId: group.creatorId,
        memberIds: group.memberIds,
        memberCount: 1,
      },
    });
  } catch (error) {
    console.error('Study groups POST error:', error);
    return NextResponse.json({ error: 'Failed to create study group' }, { status: 500 });
  }
}
