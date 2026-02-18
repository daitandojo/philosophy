import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Collection } from '@/lib/models/collection';
import mongoose, { Types } from 'mongoose';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { verseId, action } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid collection ID' }, { status: 400 });
    }

    if (!verseId) {
      return NextResponse.json({ error: 'Verse ID is required' }, { status: 400 });
    }

    await connectDB();

    const collection = await Collection.findById(id);

    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    if (action === 'add') {
      const verseObjectId = new mongoose.Types.ObjectId(verseId);
      if (!collection.verseIds.includes(verseObjectId)) {
        collection.verseIds.push(verseObjectId);
        await collection.save();
      }
    } else if (action === 'remove') {
      collection.verseIds = collection.verseIds.filter(
        (v: Types.ObjectId) => v.toString() !== verseId
      );
      await collection.save();
    }

    const verseIdsArray: string[] = collection.verseIds.map((v: Types.ObjectId) => v.toString());

    return NextResponse.json({
      verseIds: verseIdsArray,
      verseCount: collection.verseIds.length,
    });
  } catch (error) {
    console.error('Collection verses POST error:', error);
    return NextResponse.json({ error: 'Failed to update collection' }, { status: 500 });
  }
}
