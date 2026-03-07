import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { AnnotationModel } from '@/lib/models';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const OPENAI_MODERATION_KEY = process.env.OPENAI_API_KEY;

async function moderateContent(text: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.openai.com/v1/moderations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_MODERATION_KEY}`,
      },
      body: JSON.stringify({ input: text }),
    });

    if (!response.ok) {
      console.error('Moderation API error:', response.statusText);
      return true;
    }

    const data = await response.json();
    return data.results[0]?.flagged || false;
  } catch (error) {
    console.error('Moderation check failed:', error);
    return true;
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const verseId = searchParams.get('verseId');
    const visibility = searchParams.get('visibility');
    const userId = searchParams.get('userId');

    const query: Record<string, any> = {};
    if (verseId) query.verseId = verseId;
    if (visibility) query.visibility = visibility;
    
    // If userId provided, get user's annotations + public ones
    if (userId) {
      delete query.visibility;
      query.$or = [
        { userId },
        { visibility: 'public' }
      ];
    }

    const annotations = await AnnotationModel.find(query)
      .populate('userId', 'name image')
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json(annotations);
  } catch (error) {
    console.error('Annotations error:', error);
    return NextResponse.json({ error: 'Failed to fetch annotations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { verseId, content, visibility = 'private', highlightedText } = body;

    if (!verseId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Moderate content before saving
    const isFlagged = await moderateContent(content);
    if (isFlagged) {
      return NextResponse.json({ 
        error: 'Your annotation contains content that does not align with our community guidelines.' 
      }, { status: 400 });
    }

    const annotation = await AnnotationModel.create({
      verseId,
      content,
      visibility,
      highlightedText,
    });

    return NextResponse.json(annotation, { status: 201 });
  } catch (error) {
    console.error('Annotation error:', error);
    return NextResponse.json({ error: 'Failed to create annotation' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { annotationId, upvotes } = body;

    if (!annotationId) {
      return NextResponse.json({ error: 'annotationId required' }, { status: 400 });
    }

    const annotation = await AnnotationModel.findByIdAndUpdate(
      annotationId,
      { $inc: { upvotes: upvotes || 1 } },
      { new: true }
    );

    return NextResponse.json(annotation);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update annotation' }, { status: 500 });
  }
}
