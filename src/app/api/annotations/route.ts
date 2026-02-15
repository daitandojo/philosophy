import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { AnnotationModel } from '@/lib/models';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const verseId = searchParams.get('verseId');
    const visibility = searchParams.get('visibility');

    const query: Record<string, any> = {};
    if (verseId) query.verseId = verseId;
    if (visibility) query.visibility = visibility;

    const annotations = await AnnotationModel.find(query).populate('userId', 'name image');
    return NextResponse.json(annotations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch annotations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { verseId, content, visibility, highlightedText } = body;

    if (!verseId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const annotation = await AnnotationModel.create({
      verseId,
      content,
      visibility: visibility || 'private',
      highlightedText,
    });

    return NextResponse.json(annotation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create annotation' }, { status: 500 });
  }
}
