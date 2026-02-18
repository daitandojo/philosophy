import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ConversationModel } from '@/lib/models/conversation';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const philosopherId = searchParams.get('philosopherId');
    const archived = searchParams.get('archived') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    const conditions: Record<string, unknown> = { userId, isArchived: archived };

    if (philosopherId) {
      conditions.philosopherId = philosopherId;
    }

    const conversations = await ConversationModel.find(conditions)
      .select('title philosopherId messages createdAt updatedAt isArchived')
      .sort({ updatedAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const total = await ConversationModel.countDocuments(conditions);

    return NextResponse.json({
      conversations: conversations.map(c => ({
        _id: c._id.toString(),
        title: c.title,
        philosopherId: c.philosopherId,
        messageCount: c.messages?.length || 0,
        lastMessage: c.messages?.[c.messages.length - 1]?.content?.slice(0, 100),
        isArchived: c.isArchived,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error('Conversations GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, philosopherId, title } = body;

    if (!userId || !philosopherId) {
      return NextResponse.json(
        { error: 'User ID and philosopher ID are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const conversation = await ConversationModel.create({
      userId,
      philosopherId,
      title: title || 'New Conversation',
      messages: [],
      isArchived: false,
      isShared: false,
      likes: 0,
      views: 0,
    });

    return NextResponse.json({
      conversation: {
        _id: conversation._id.toString(),
        title: conversation.title,
        philosopherId: conversation.philosopherId,
        messages: [],
      },
    });
  } catch (error) {
    console.error('Conversations POST error:', error);
    return NextResponse.json({ error: 'Failed to create conversation' }, { status: 500 });
  }
}
