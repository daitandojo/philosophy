import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Discussion } from '@/lib/models/discussion';
import { UserProfile } from '@/lib/models/userProfile';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const philosopherId = searchParams.get('philosopherId');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    await connectDB();

    const conditions: Record<string, unknown> = {};

    if (category && category !== 'all') {
      conditions.category = category;
    }

    if (philosopherId) {
      conditions.philosopherId = philosopherId;
    }

    if (search) {
      conditions.$text = { $search: search };
    }

    const discussions = await Discussion.find(conditions)
      .sort({ isPinned: -1, lastReplyAt: -1, createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const total = await Discussion.countDocuments(conditions);

    return NextResponse.json({
      discussions: discussions.map(d => ({
        _id: d._id.toString(),
        title: d.title,
        content: d.content,
        authorId: d.authorId,
        authorName: d.authorName,
        authorImage: d.authorImage,
        category: d.category,
        philosopherId: d.philosopherId,
        theme: d.theme,
        tags: d.tags,
        isPinned: d.isPinned,
        isLocked: d.isLocked,
        isResolved: d.isResolved,
        likesCount: d.likes?.length || 0,
        views: d.views,
        replyCount: d.replyCount,
        lastReplyAt: d.lastReplyAt,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error('Discussions GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch discussions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, authorId, authorName, authorImage, category, philosopherId, theme, tags } = body;

    if (!title || !content || !authorId || !authorName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const discussion = await Discussion.create({
      title,
      content,
      authorId,
      authorName,
      authorImage,
      category: category || 'general',
      philosopherId,
      theme,
      tags: tags || [],
      isPinned: false,
      isLocked: false,
      isResolved: false,
      likes: [],
      views: 0,
      replyCount: 0,
    });

    return NextResponse.json({
      discussion: {
        _id: discussion._id.toString(),
        title: discussion.title,
        content: discussion.content,
        authorId: discussion.authorId,
        authorName: discussion.authorName,
        category: discussion.category,
      },
    });
  } catch (error) {
    console.error('Discussions POST error:', error);
    return NextResponse.json({ error: 'Failed to create discussion' }, { status: 500 });
  }
}
