import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ConversationModel } from '@/lib/models/conversation';
import mongoose from 'mongoose';
import { randomBytes } from 'crypto';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId, expiresInHours = 168 } = body;

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

    const shareToken = randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);

    conversation.isShared = true;
    conversation.sharedToken = shareToken;
    conversation.shareExpiresAt = expiresAt;

    await conversation.save();

    const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'https://hikmatia.com'}/chat/shared/${id}?token=${shareToken}`;

    return NextResponse.json({
      shareUrl,
      expiresAt,
    });
  } catch (error) {
    console.error('Share POST error:', error);
    return NextResponse.json({ error: 'Failed to create share link' }, { status: 500 });
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

    conversation.isShared = false;
    conversation.sharedToken = undefined;
    conversation.shareExpiresAt = undefined;

    await conversation.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Share DELETE error:', error);
    return NextResponse.json({ error: 'Failed to revoke share link' }, { status: 500 });
  }
}
