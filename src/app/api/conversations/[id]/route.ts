import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ConversationModel } from '@/lib/models/conversation';
import mongoose from 'mongoose';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const sharedToken = searchParams.get('token');

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid conversation ID' }, { status: 400 });
    }

    await connectDB();

    const conversation = await ConversationModel.findById(id).lean();

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    if (conversation.isShared && sharedToken === conversation.sharedToken) {
      await ConversationModel.updateOne(
        { _id: id },
        { $inc: { views: 1 } }
      );

      return NextResponse.json({
        conversation: {
          _id: conversation._id.toString(),
          title: conversation.title,
          philosopherId: conversation.philosopherId,
          messages: conversation.messages,
          isShared: true,
          views: conversation.views,
          createdAt: conversation.createdAt,
        },
      });
    }

    if (conversation.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    return NextResponse.json({
      conversation: {
        _id: conversation._id.toString(),
        title: conversation.title,
        philosopherId: conversation.philosopherId,
        messages: conversation.messages,
        isArchived: conversation.isArchived,
        isShared: conversation.isShared,
        likes: conversation.likes,
        views: conversation.views,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
      },
    });
  } catch (error) {
    console.error('Conversation GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch conversation' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId, title, isArchived, addMessage } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid conversation ID' }, { status: 400 });
    }

    await connectDB();

    const conversation = await ConversationModel.findById(id);

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    if (conversation.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (title !== undefined) conversation.title = title;
    if (isArchived !== undefined) conversation.isArchived = isArchived;

    if (addMessage) {
      conversation.messages.push({
        role: addMessage.role,
        content: addMessage.content,
        timestamp: new Date(),
        tokens: addMessage.tokens,
        verseReferences: addMessage.verseReferences,
      } as typeof conversation.messages[0]);

      if (!conversation.title || conversation.title === 'New Conversation') {
        const firstUserMessage = conversation.messages.find((m: typeof conversation.messages[0]) => m.role === 'user');
        if (firstUserMessage) {
          conversation.title = firstUserMessage.content.slice(0, 50) + (firstUserMessage.content.length > 50 ? '...' : '');
        }
      }
    }

    await conversation.save();

    return NextResponse.json({
      conversation: {
        _id: conversation._id.toString(),
        title: conversation.title,
        philosopherId: conversation.philosopherId,
        messages: conversation.messages,
        isArchived: conversation.isArchived,
      },
    });
  } catch (error) {
    console.error('Conversation PUT error:', error);
    return NextResponse.json({ error: 'Failed to update conversation' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid conversation ID' }, { status: 400 });
    }

    await connectDB();

    const conversation = await ConversationModel.findById(id);

    if (!conversation) {
      return NextResponse.json({ error: 'Conversation not found' }, { status: 404 });
    }

    if (conversation.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await ConversationModel.deleteOne({ _id: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Conversation DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete conversation' }, { status: 500 });
  }
}
