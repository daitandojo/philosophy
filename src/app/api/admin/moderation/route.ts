import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { AnnotationModel, CommentModel } from '@/lib/models';

interface FlaggedContent {
  type: 'annotation' | 'comment' | 'verse';
  id: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  flaggedAt: Date;
  reviewedAt?: Date;
  reviewerId?: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { contentType, contentId, reason, userId } = body;

    if (!contentType || !contentId || !reason) {
      return NextResponse.json({ error: 'contentType, contentId, and reason are required' }, { status: 400 });
    }

    const validTypes = ['annotation', 'comment', 'verse'];
    if (!validTypes.includes(contentType)) {
      return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
    }

    const flaggedContent = {
      type: contentType,
      id: contentId,
      reason,
      status: 'pending' as const,
      flaggedAt: new Date(),
      flaggedBy: userId || 'anonymous',
    };

    if (contentType === 'annotation') {
      await AnnotationModel.findByIdAndUpdate(contentId, { 
        moderationStatus: 'flagged',
        moderationReason: reason 
      });
    } else if (contentType === 'comment') {
      await CommentModel.findByIdAndUpdate(contentId, { 
        moderationStatus: 'flagged',
        moderationReason: reason 
      });
    }

    return NextResponse.json({ 
      message: 'Content flagged for moderation',
      flaggedContent 
    });
  } catch (error) {
    console.error('Moderation error:', error);
    return NextResponse.json({ error: 'Failed to process moderation request' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';
    const type = searchParams.get('type');

    const query: Record<string, any> = {};
    if (type) query.type = type;
    if (status !== 'all') query.status = status;

    const annotations = await AnnotationModel.find({ 
      moderationStatus: status === 'all' ? { $exists: true } : 'flagged'
    }).limit(50);

    const comments = await CommentModel.find({ 
      moderationStatus: status === 'all' ? { $exists: true } : 'flagged'
    }).limit(50);

    const flaggedItems = [
      ...annotations.map((a: any) => ({ type: 'annotation', ...a.toObject() })),
      ...comments.map((c: any) => ({ type: 'comment', ...c.toObject() }))
    ];

    return NextResponse.json({
      items: flaggedItems,
      total: flaggedItems.length,
      pendingCount: annotations.length + comments.length,
    });
  } catch (error) {
    console.error('Error fetching moderation data:', error);
    return NextResponse.json({ error: 'Failed to fetch moderation data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { contentType, contentId, action, notes } = body;

    if (!contentType || !contentId || !action) {
      return NextResponse.json({ error: 'contentType, contentId, and action are required' }, { status: 400 });
    }

    const validActions = ['approve', 'reject', 'ban'];
    if (!validActions.includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const newStatus = action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'banned';

    if (contentType === 'annotation') {
      await AnnotationModel.findByIdAndUpdate(contentId, { 
        moderationStatus: newStatus,
        moderationReviewedAt: new Date(),
        moderationNotes: notes || ''
      });
    } else if (contentType === 'comment') {
      await CommentModel.findByIdAndUpdate(contentId, { 
        moderationStatus: newStatus,
        moderationReviewedAt: new Date(),
        moderationNotes: notes || ''
      });
    }

    return NextResponse.json({ 
      message: `Content ${action}ed successfully`,
      contentId,
      newStatus 
    });
  } catch (error) {
    console.error('Moderation update error:', error);
    return NextResponse.json({ error: 'Failed to update moderation status' }, { status: 500 });
  }
}
