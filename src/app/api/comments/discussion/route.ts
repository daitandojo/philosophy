import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { CommentModel } from '@/lib/models/comment';
import { Discussion } from '@/lib/models/discussion';
import { NotificationModel } from '@/lib/models/notification';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, discussionId, parentCommentId, content } = body;

    if (!userId || !discussionId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const comment = await CommentModel.create({
      userId,
      discussionId,
      parentCommentId,
      content,
      likes: [],
      isEdited: false,
    });

    await Discussion.updateOne(
      { _id: discussionId },
      { 
        $inc: { replyCount: 1 },
        $set: { lastReplyAt: new Date(), lastReplyBy: userId },
      }
    );

    const discussion = await Discussion.findById(discussionId).lean();

    if (discussion && discussion.authorId !== userId) {
      await NotificationModel.create({
        recipientId: discussion.authorId,
        senderId: userId,
        type: parentCommentId ? 'reply' : 'comment',
        title: parentCommentId ? 'New Reply' : 'New Comment',
        message: `Someone commented on your discussion: ${discussion.title}`,
        link: `/community/discussions/${discussionId}`,
      });
    }

    return NextResponse.json({
      comment: {
        _id: comment._id.toString(),
        userId: comment.userId,
        content: comment.content,
        parentCommentId: comment.parentCommentId,
        likesCount: 0,
        isEdited: false,
        createdAt: comment.createdAt,
      },
    });
  } catch (error) {
    console.error('Comment POST error:', error);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
