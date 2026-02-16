import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { WorkModel } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const philosopherId = searchParams.get('philosopherId');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const query: Record<string, any> = {};

    if (philosopherId) {
      query.philosopherId = philosopherId;
    }
    if (type) {
      query.type = type;
    }

    const skip = (page - 1) * limit;
    const works = await WorkModel.find(query)
      .sort({ philosopherId: 1, 'chapters.order': 1 })
      .skip(skip)
      .limit(limit);

    const total = await WorkModel.countDocuments(query);

    return NextResponse.json({
      works,
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error fetching works:', error);
    return NextResponse.json({ error: 'Failed to fetch works' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { philosopherId, title, titlePersian, description, type, year, chapters, tags, imageUrl } = body;

    if (!philosopherId || !title || !description || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const work = await WorkModel.create({
      philosopherId,
      title,
      titlePersian,
      description,
      type,
      year,
      chapters: chapters || [],
      tags: tags || [],
      imageUrl,
    });

    return NextResponse.json(work, { status: 201 });
  } catch (error) {
    console.error('Error creating work:', error);
    return NextResponse.json({ error: 'Failed to create work' }, { status: 500 });
  }
}
