import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Collection } from '@/lib/models/collection';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const visibility = searchParams.get('visibility') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '12');

    await connectDB();

    const conditions: Record<string, unknown> = {};

    if (userId) {
      conditions.$or = [
        { userId },
        { visibility: 'public' },
        { collaborators: userId },
      ];
    }

    if (visibility === 'public') {
      conditions.visibility = 'public';
    } else if (visibility === 'private' && userId) {
      conditions.userId = userId;
      conditions.visibility = 'private';
    }

    const collections = await Collection.find(conditions)
      .sort({ createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const total = await Collection.countDocuments(conditions);

    return NextResponse.json({
      collections: collections.map(c => ({
        _id: c._id.toString(),
        userId: c.userId,
        title: c.title,
        description: c.description,
        verseIds: c.verseIds,
        philosopherIds: c.philosopherIds,
        coverImage: c.coverImage,
        color: c.color,
        visibility: c.visibility,
        isFeatured: c.isFeatured,
        likes: c.likes,
        views: c.views,
        verseCount: c.verseIds?.length || 0,
        createdAt: c.createdAt,
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error('Collections GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, title, description, visibility = 'private', color, philosopherIds, verseIds } = body;

    if (!userId || !title) {
      return NextResponse.json(
        { error: 'User ID and title are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const collection = await Collection.create({
      userId,
      title,
      description,
      visibility,
      color: color || '#8b4513',
      philosopherIds: philosopherIds || [],
      verseIds: verseIds || [],
      isFeatured: false,
      likes: 0,
      views: 0,
      collaborators: [],
    });

    return NextResponse.json({
      collection: {
        _id: collection._id.toString(),
        userId: collection.userId,
        title: collection.title,
        description: collection.description,
        visibility: collection.visibility,
        color: collection.color,
        verseIds: collection.verseIds,
        philosopherIds: collection.philosopherIds,
      },
    });
  } catch (error) {
    console.error('Collections POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create collection' },
      { status: 500 }
    );
  }
}
