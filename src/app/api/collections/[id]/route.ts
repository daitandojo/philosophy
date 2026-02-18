import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Collection } from '@/lib/models/collection';
import mongoose from 'mongoose';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid collection ID' }, { status: 400 });
    }

    await connectDB();

    const collection = await Collection.findById(id).lean();

    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    await Collection.updateOne(
      { _id: id },
      { $inc: { views: 1 } }
    );

    return NextResponse.json({
      collection: {
        _id: collection._id.toString(),
        userId: collection.userId,
        title: collection.title,
        description: collection.description,
        verseIds: collection.verseIds,
        philosopherIds: collection.philosopherIds,
        coverImage: collection.coverImage,
        color: collection.color,
        visibility: collection.visibility,
        isFeatured: collection.isFeatured,
        likes: collection.likes,
        views: collection.views,
        collaborators: collection.collaborators,
        createdAt: collection.createdAt,
        updatedAt: collection.updatedAt,
      },
    });
  } catch (error) {
    console.error('Collection GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch collection' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId, title, description, visibility, color, coverImage } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid collection ID' }, { status: 400 });
    }

    await connectDB();

    const collection = await Collection.findById(id);

    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    if (collection.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (title) collection.title = title;
    if (description !== undefined) collection.description = description;
    if (visibility) collection.visibility = visibility;
    if (color) collection.color = color;
    if (coverImage !== undefined) collection.coverImage = coverImage;

    await collection.save();

    return NextResponse.json({
      collection: {
        _id: collection._id.toString(),
        title: collection.title,
        description: collection.description,
        visibility: collection.visibility,
        color: collection.color,
      },
    });
  } catch (error) {
    console.error('Collection PUT error:', error);
    return NextResponse.json({ error: 'Failed to update collection' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid collection ID' }, { status: 400 });
    }

    await connectDB();

    const collection = await Collection.findById(id);

    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    if (collection.userId !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await Collection.deleteOne({ _id: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Collection DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete collection' }, { status: 500 });
  }
}
