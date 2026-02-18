import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BlockModel } from '@/lib/models/block';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { blockerId, blockedId, reason } = body;

    if (!blockerId || !blockedId) {
      return NextResponse.json({ error: 'Blocker ID and blocked ID are required' }, { status: 400 });
    }

    if (blockerId === blockedId) {
      return NextResponse.json({ error: 'Cannot block yourself' }, { status: 400 });
    }

    await connectDB();

    const existing = await BlockModel.findOne({ blockerId, blockedId });

    if (existing) {
      return NextResponse.json({ error: 'User already blocked' }, { status: 409 });
    }

    await BlockModel.create({ blockerId, blockedId, reason });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Block POST error:', error);
    return NextResponse.json({ error: 'Failed to block user' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const blockerId = searchParams.get('blockerId');
    const blockedId = searchParams.get('blockedId');

    if (!blockerId || !blockedId) {
      return NextResponse.json({ error: 'Blocker ID and blocked ID are required' }, { status: 400 });
    }

    await connectDB();

    await BlockModel.findOneAndDelete({ blockerId, blockedId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Block DELETE error:', error);
    return NextResponse.json({ error: 'Failed to unblock user' }, { status: 500 });
  }
}
