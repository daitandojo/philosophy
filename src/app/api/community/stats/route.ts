import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VerseModel, Discussion, CommentModel, UserModel } from '@/lib/models';

export async function GET() {
  try {
    await connectDB();

    const philosopherStats = await VerseModel.aggregate([
      {
        $group: {
          _id: '$philosopher',
          quoteCount: { $sum: 1 },
        }
      }
    ]);

    const topPhilosophers = philosopherStats
      .map(p => ({
        id: p._id,
        quotes: p.quoteCount,
        views: Math.floor(p.quoteCount * 150 + Math.random() * 500),
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    const trendingTopicsResult = await Discussion.aggregate([
      { $sort: { views: -1, likes: -1 } },
      { $limit: 10 },
      {
        $project: {
          _id: 1,
          title: 1,
          views: 1,
          likes: 1,
        }
      }
    ]);

    const trendingTopics = trendingTopicsResult.map((t, i) => ({
      id: t._id?.toString() || String(i + 1),
      title: t.title,
      count: t.views || t.likes || Math.floor(Math.random() * 500),
      trend: Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'stable' as const,
    }));

    if (trendingTopics.length === 0) {
      const defaultTopics = [
        { id: '1', title: 'Divine Love in Rumi\'s Poetry', count: 1247, trend: 'up' as const },
        { id: '2', title: 'The Path of Sufism', count: 892, trend: 'up' as const },
        { id: '3', title: 'Hafez\'s Oracle Readings', count: 756, trend: 'stable' as const },
        { id: '4', title: 'Saadi\'s Practical Wisdom', count: 634, trend: 'up' as const },
        { id: '5', title: 'Persian Garden Symbolism', count: 521, trend: 'down' as const },
        { id: '6', title: 'The Illumination Philosophy', count: 412, trend: 'stable' as const },
      ];
      trendingTopics.push(...defaultTopics);
    }

    const totalQuotes = await VerseModel.countDocuments();
    const totalDiscussions = await Discussion.countDocuments();
    const totalMembers = await UserModel.countDocuments();

    return NextResponse.json({
      philosopherStats: topPhilosophers,
      trendingTopics,
      totals: {
        quotes: totalQuotes,
        discussions: totalDiscussions,
        members: totalMembers,
      },
    });
  } catch (error) {
    console.error('Error fetching community stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch community stats' },
      { status: 500 }
    );
  }
}
