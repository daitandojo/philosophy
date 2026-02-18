import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VideoModel } from '@/lib/models/video';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    
    const query: Record<string, any> = { approved: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { philosopher: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }
    
    if (featured === 'true') {
      query.featured = true;
    }

    const videos = await VideoModel.find(query).sort({ createdAt: -1 });

    return NextResponse.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { youtubeId, title, description, titleFa, descriptionFa, category, philosopher, duration, thumbnailUrl, featured, tags } = body;

    if (!youtubeId || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const existingVideo = await VideoModel.findOne({ youtubeId });
    if (existingVideo) {
      return NextResponse.json({ error: 'Video already exists' }, { status: 400 });
    }

    const video = await VideoModel.create({
      youtubeId,
      title,
      description: description || '',
      titleFa,
      descriptionFa,
      category: category || 'educational',
      philosopher,
      duration: duration || '0:00',
      thumbnailUrl: thumbnailUrl || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      featured: featured || false,
      tags: tags || [],
      approved: true,
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
  }
}
