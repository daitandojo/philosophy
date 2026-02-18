import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ModerationModel } from '@/lib/models/moderation';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending';
    const contentType = searchParams.get('contentType');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    await connectDB();

    const conditions: Record<string, unknown> = { status };

    if (contentType) {
      conditions.contentType = contentType;
    }

    const items = await ModerationModel.find(conditions)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const total = await ModerationModel.countDocuments(conditions);

    return NextResponse.json({
      items: items.map(item => ({
        _id: item._id.toString(),
        contentType: item.contentType,
        contentId: item.contentId.toString(),
        status: item.status,
        reason: item.reason,
        severity: item.severity,
        reportedBy: item.reportedBy,
        reviewedBy: item.reviewedBy,
        reviewedAt: item.reviewedAt,
        notes: item.notes,
        createdAt: item.createdAt,
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error('Moderation GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch moderation items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentType, contentId, reason, reportedBy, severity = 'low' } = body;

    if (!contentType || !contentId) {
      return NextResponse.json(
        { error: 'Content type and content ID are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const existingItem = await ModerationModel.findOne({
      contentType,
      contentId: new mongoose.Types.ObjectId(contentId),
      status: 'pending',
    });

    if (existingItem) {
      return NextResponse.json(
        { error: 'This content is already under review' },
        { status: 409 }
      );
    }

    const moderationItem = await ModerationModel.create({
      contentType,
      contentId: new mongoose.Types.ObjectId(contentId),
      status: 'pending',
      reason,
      reportedBy,
      severity,
    });

    return NextResponse.json({
      item: {
        _id: moderationItem._id.toString(),
        contentType: moderationItem.contentType,
        contentId: moderationItem.contentId.toString(),
        status: moderationItem.status,
      },
    });
  } catch (error) {
    console.error('Moderation POST error:', error);
    return NextResponse.json({ error: 'Failed to create moderation item' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, reviewedBy, notes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const moderationItem = await ModerationModel.findById(id);

    if (!moderationItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    moderationItem.status = status;
    if (reviewedBy) moderationItem.reviewedBy = reviewedBy;
    if (notes) moderationItem.notes = notes;
    moderationItem.reviewedAt = new Date();

    await moderationItem.save();

    return NextResponse.json({
      item: {
        _id: moderationItem._id.toString(),
        status: moderationItem.status,
        reviewedAt: moderationItem.reviewedAt,
      },
    });
  } catch (error) {
    console.error('Moderation PUT error:', error);
    return NextResponse.json({ error: 'Failed to update moderation item' }, { status: 500 });
  }
}
