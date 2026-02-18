import { NextRequest, NextResponse } from 'next/server';
import { trackEvent, getAnalyticsEvents } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, properties, userId, page } = body;

    if (!event) {
      return NextResponse.json({ error: 'Event name is required' }, { status: 400 });
    }

    await trackEvent({
      name: event,
      properties,
      userId,
      page,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics track error:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const event = searchParams.get('event');
    const limit = parseInt(searchParams.get('limit') || '100');

    let events = getAnalyticsEvents();

    if (event) {
      events = events.filter(e => e.name === event);
    }

    events = events.slice(-limit);

    const stats = {
      total: events.length,
      byEvent: events.reduce((acc, e) => {
        acc[e.name] = (acc[e.name] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      recent: events.slice(-10),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Analytics GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
