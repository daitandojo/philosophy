import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { MemorizationCardModel } from '@/lib/models/memorization';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const dueOnly = searchParams.get('dueOnly') === 'true';

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    const conditions: Record<string, unknown> = { userId };

    if (dueOnly) {
      conditions.nextReviewDate = { $lte: new Date() };
    }

    if (status) {
      conditions.status = status;
    }

    const cards = await MemorizationCardModel.find(conditions)
      .sort({ nextReviewDate: 1 })
      .limit(20)
      .lean();

    return NextResponse.json({
      cards: cards.map(c => ({
        verseId: c.verseId,
        easeFactor: c.easeFactor,
        interval: c.interval,
        repetitions: c.repetitions,
        nextReviewDate: c.nextReviewDate,
        lastReviewDate: c.lastReviewDate,
        status: c.status,
      })),
    });
  } catch (error) {
    console.error('Memorization GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch memorization cards' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, verseId, quality } = body;

    if (!userId || !verseId === undefined) {
      return NextResponse.json({ error: 'User ID and verse ID are required' }, { status: 400 });
    }

    await connectDB();

    let card = await MemorizationCardModel.findOne({ userId, verseId });

    if (!card) {
      card = await MemorizationCardModel.create({
        userId,
        verseId,
        easeFactor: 2.5,
        interval: 1,
        repetitions: 0,
        nextReviewDate: new Date(),
        status: 'new',
      });
    }

    let { easeFactor, interval, repetitions } = card;
    
    if (quality >= 3) {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
    } else {
      repetitions = 0;
      interval = 1;
    }

    easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

    const nextReviewDate = new Date();
    nextReviewDate.setDate(nextReviewDate.getDate() + interval);

    let status: 'new' | 'learning' | 'review' | 'mastered' = 'learning';
    if (repetitions >= 5 && interval >= 21) {
      status = 'mastered';
    } else if (repetitions >= 2) {
      status = 'review';
    }

    card.easeFactor = easeFactor;
    card.interval = interval;
    card.repetitions = repetitions;
    card.nextReviewDate = nextReviewDate;
    card.lastReviewDate = new Date();
    card.status = status;

    await card.save();

    return NextResponse.json({
      card: {
        verseId: card.verseId,
        easeFactor: card.easeFactor,
        interval: card.interval,
        repetitions: card.repetitions,
        nextReviewDate: card.nextReviewDate,
        status: card.status,
      },
    });
  } catch (error) {
    console.error('Memorization POST error:', error);
    return NextResponse.json({ error: 'Failed to update memorization' }, { status: 500 });
  }
}
