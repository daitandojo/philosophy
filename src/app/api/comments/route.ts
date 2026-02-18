import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { CommentModel } from '@/lib/models';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import mongoose from 'mongoose';

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
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'You must be logged in to post a comment' }, { status: 401 });
    }
    
    await connectDB();
    const body = await request.json();
    const { verseId, content, parentCommentId } = body;

    if (!verseId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const comment = await CommentModel.create({
      userId: new mongoose.Types.ObjectId(session.user.id),
      verseId: new mongoose.Types.ObjectId(verseId),
      content,
      parentCommentId: parentCommentId ? new mongoose.Types.ObjectId(parentCommentId) : undefined,
      likes: 0,
    });

    const populatedComment = await CommentModel.findById(comment._id)
      .populate('userId', 'name image');

    return NextResponse.json(populatedComment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
