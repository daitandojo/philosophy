import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Discussion } from '@/lib/models/discussion';
import { CommentModel } from '@/lib/models/comment';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);

    await connectDB();

    const discussion = await Discussion.findById(id).lean();

    if (!discussion) {
      return NextResponse.json({ error: 'Discussion not found' }, { status: 404 });
    }

    await Discussion.updateOne({ _id: id }, { $inc: { views: 1 } });

    const comments = await CommentModel.find({ discussionId: id, parentCommentId: { $exists: false } })
      .sort({ createdAt: -1 })
      .lean();

    const getReplies = async (parentId: string) => {
      return CommentModel.find({ parentCommentId: parentId })
        .sort({ createdAt: 1 })
        .lean();
    };

    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await getReplies(comment._id.toString());
        return {
          ...comment,
          replies,
        };
      })
    );

    return NextResponse.json({
      discussion: {
        _id: discussion._id.toString(),
        title: discussion.title,
        content: discussion.content,
        authorId: discussion.authorId,
        authorName: discussion.authorName,
        authorImage: discussion.authorImage,
        category: discussion.category,
        philosopherId: discussion.philosopherId,
        theme: discussion.theme,
        tags: discussion.tags,
        isPinned: discussion.isPinned,
        isLocked: discussion.isLocked,
        isResolved: discussion.isResolved,
        likesCount: discussion.likes?.length || 0,
        views: discussion.views,
        replyCount: discussion.replyCount,
        createdAt: discussion.createdAt,
        updatedAt: discussion.updatedAt,
      },
      comments: commentsWithReplies.map(c => ({
        _id: c._id.toString(),
        userId: c.userId,
        content: c.content,
        likesCount: c.likes?.length || 0,
        isEdited: c.isEdited,
        createdAt: c.createdAt,
        replies: (c.replies || []).map((r: { _id: { toString(): string }; userId: string; content: string; likes?: string[]; isEdited: boolean; createdAt: Date }) => ({
          _id: r._id.toString(),
          userId: r.userId,
          content: r.content,
          likesCount: r.likes?.length || 0,
          isEdited: r.isEdited,
          createdAt: r.createdAt,
        })) || [],
      })),
    });
  } catch (error) {
    console.error('Discussion GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch discussion' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId, title, content, action } = body;

    await connectDB();

    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return NextResponse.json({ error: 'Discussion not found' }, { status: 404 });
    }

    if (discussion.authorId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (title) discussion.title = title;
    if (content) discussion.content = content;

    if (action === 'like') {
      const likes = discussion.likes || [];
      const userIndex = likes.indexOf(userId);
      if (userIndex > -1) {
        discussion.likes = likes.filter((l: string) => l !== userId);
      } else {
        discussion.likes = [...likes, userId];
      }
    }

    await discussion.save();

    return NextResponse.json({
      discussion: {
        _id: discussion._id.toString(),
        title: discussion.title,
        likesCount: discussion.likes?.length || 0,
      },
    });
  } catch (error) {
    console.error('Discussion PUT error:', error);
    return NextResponse.json({ error: 'Failed to update discussion' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    await connectDB();

    const discussion = await Discussion.findById(id);

    if (!discussion) {
      return NextResponse.json({ error: 'Discussion not found' }, { status: 404 });
    }

    if (discussion.authorId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await Discussion.deleteOne({ _id: id });
    await CommentModel.deleteMany({ discussionId: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Discussion DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete discussion' }, { status: 500 });
  }
}
