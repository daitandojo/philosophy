import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Collection } from '@/lib/models/collection';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const visibility = searchParams.get('visibility') || 'all';
    const slug = searchParams.get('slug');
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '12');

    await connectDB();

    // If slug provided, return single collection
    if (slug) {
      const collection = await Collection.findOne({ slug }).lean();
      if (!collection) {
        return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
      }
      // Increment view count
      await Collection.findByIdAndUpdate(collection._id, { $inc: { views: 1 } });
      
      return NextResponse.json({
        collection: {
          _id: collection._id.toString(),
          slug: collection.slug,
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
          views: (collection.views || 0) + 1,
          verseCount: collection.verseIds?.length || 0,
          createdAt: collection.createdAt,
        },
      });
    }

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

    // Generate unique slug from title
    const baseSlug = title.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .substring(0, 50);
    
    // Check for existing slug and make unique if needed
    let slug = baseSlug;
    let counter = 0;
    while (await Collection.findOne({ slug })) {
      counter++;
      slug = `${baseSlug}-${counter}`;
    }

    const collection = await Collection.create({
      userId,
      title,
      slug,
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
        slug: collection.slug,
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
