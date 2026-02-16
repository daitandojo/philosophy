import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { WorkModel } from '@/lib/models';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    const work = await WorkModel.findById(id);
    
    if (!work) {
      return NextResponse.json({ error: 'Work not found' }, { status: 404 });
    }

    return NextResponse.json(work);
  } catch (error) {
    console.error('Error fetching work:', error);
    return NextResponse.json({ error: 'Failed to fetch work' }, { status: 500 });
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

    const work = await WorkModel.findByIdAndUpdate(id, body, { new: true });

    if (!work) {
      return NextResponse.json({ error: 'Work not found' }, { status: 404 });
    }

    return NextResponse.json(work);
  } catch (error) {
    console.error('Error updating work:', error);
    return NextResponse.json({ error: 'Failed to update work' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const work = await WorkModel.findByIdAndDelete(id);

    if (!work) {
      return NextResponse.json({ error: 'Work not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Work deleted successfully' });
  } catch (error) {
    console.error('Error deleting work:', error);
    return NextResponse.json({ error: 'Failed to delete work' }, { status: 500 });
  }
}
