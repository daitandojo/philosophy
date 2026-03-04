import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VideoModel } from '@/lib/models/video';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import mongoose from 'mongoose';

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'You must be logged in to submit a video' }, { status: 401 });
    }
    
    await connectDB();
    const body = await request.json();
    const { youtubeUrl, title, description, category, philosopher, tags } = body;

    if (!youtubeUrl || !title) {
      return NextResponse.json({ error: 'YouTube URL and title are required' }, { status: 400 });
    }

    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    const existingVideo = await VideoModel.findOne({ youtubeId });
    if (existingVideo) {
      return NextResponse.json({ error: 'Video already exists in the library' }, { status: 400 });
    }

    const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;

    const video = await VideoModel.create({
      youtubeId,
      title,
      description: description || '',
      category: category || 'educational',
      philosopher,
      duration: '0:00',
      thumbnailUrl,
      submittedBy: new mongoose.Types.ObjectId(session.user.id),
      approved: true,
      featured: false,
      views: 0,
      likes: 0,
      tags: tags || [],
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error submitting video:', error);
    return NextResponse.json({ error: 'Failed to submit video' }, { status: 500 });
  }
}
