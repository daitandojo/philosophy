import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { CommentModel } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const verseId = searchParams.get('verseId');

    const query: Record<string, any> = {};
    if (verseId) query.verseId = verseId;

    const comments = await CommentModel.find(query)
      .populate('userId', 'name image')
      .sort({ createdAt: -1 });

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { verseId, content, parentCommentId } = body;

    if (!verseId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const comment = await CommentModel.create({
      verseId,
      content,
      parentCommentId,
      likes: 0,
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
