import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VerseModel } from '@/lib/models';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const verse = await VerseModel.findById(id);
    
    if (!verse) {
      return NextResponse.json({ error: 'Verse not found' }, { status: 404 });
    }

    return NextResponse.json(verse);
  } catch (error) {
    console.error('Error fetching verse:', error);
    return NextResponse.json({ error: 'Failed to fetch verse' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    
    const verse = await VerseModel.findByIdAndUpdate(id, body, { new: true });
    
    if (!verse) {
      return NextResponse.json({ error: 'Verse not found' }, { status: 404 });
    }

    return NextResponse.json(verse);
  } catch (error) {
    console.error('Error updating verse:', error);
    return NextResponse.json({ error: 'Failed to update verse' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const verse = await VerseModel.findByIdAndDelete(id);
    
    if (!verse) {
      return NextResponse.json({ error: 'Verse not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Verse deleted successfully' });
  } catch (error) {
    console.error('Error deleting verse:', error);
    return NextResponse.json({ error: 'Failed to delete verse' }, { status: 500 });
  }
}
