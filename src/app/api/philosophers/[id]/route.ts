import { NextResponse } from 'next/server';
import { getPhilosopherById, getWorksByPhilosopher, philosophers } from '@/lib/philosophers';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const philosopher = getPhilosopherById(id);

  if (!philosopher) {
    return NextResponse.json(
      { error: 'Philosopher not found' },
      { status: 404 }
    );
  }

  const works = getWorksByPhilosopher(id);

  return NextResponse.json({
    philosopher,
    works,
  });
}
