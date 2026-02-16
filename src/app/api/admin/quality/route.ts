import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VerseModel } from '@/lib/models/verse';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { verseIds, action, notes } = body;

    if (!verseIds || !Array.isArray(verseIds) || !action) {
      return NextResponse.json({ error: 'verseIds and action are required' }, { status: 400 });
    }

    const validActions = ['approve', 'reject', 'flag', 'review', 'publish'];
    if (!validActions.includes(action)) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const updates: Record<string, any> = {
      qualityStatus: action,
      qualityNotes: notes || '',
      qualityReviewedAt: new Date(),
    };

    if (action === 'approve') {
      updates.qualityApprovedAt = new Date();
    }

    const result = await VerseModel.updateMany(
      { _id: { $in: verseIds } },
      { $set: updates }
    );

    return NextResponse.json({
      message: `Updated ${result.modifiedCount} verses`,
      modifiedCount: result.modifiedCount,
      action,
    });
  } catch (error) {
    console.error('Quality verification error:', error);
    return NextResponse.json({ error: 'Failed to process quality verification' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const philosopher = searchParams.get('philosopher');

    const query: Record<string, any> = {};
    if (status) query.qualityStatus = status;
    if (philosopher) query.philosopher = philosopher;

    const verses = await VerseModel.find(query)
      .select('persianText englishTranslation philosopher sourceWork qualityStatus qualityNotes createdAt')
      .limit(100)
      .sort({ createdAt: -1 });

    const stats = await VerseModel.aggregate([
      { $group: { _id: '$qualityStatus', count: { $sum: 1 } } }
    ]);

    return NextResponse.json({
      verses,
      stats: Object.fromEntries(stats.map(s => [s._id || 'unreviewed', s.count])),
      total: verses.length,
    });
  } catch (error) {
    console.error('Error fetching quality data:', error);
    return NextResponse.json({ error: 'Failed to fetch quality data' }, { status: 500 });
  }
}
