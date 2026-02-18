import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VerseModel } from '@/lib/models/verse';
import { UserModel } from '@/lib/models/user';
import { ConversationModel } from '@/lib/models/conversation';
import { Discussion } from '@/lib/models/discussion';
import { StreakModel } from '@/lib/models/streak';
import { getAnalyticsEvents } from '@/lib/analytics';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '7d';
    
    await connectDB();

    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case '24h':
        startDate.setHours(now.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '90d':
        startDate.setMonth(now.getMonth() - 3);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    const [
      totalUsers,
      totalVerses,
      totalPhilosophers,
      totalDiscussions,
      totalConversations,
      activeUsers,
      newUsersThisPeriod,
    ] = await Promise.all([
      UserModel.countDocuments(),
      VerseModel.countDocuments(),
      VerseModel.distinct('philosopher'),
      Discussion.countDocuments(),
      ConversationModel.countDocuments(),
      UserModel.countDocuments({ updatedAt: { $gte: startDate } }),
      UserModel.countDocuments({ createdAt: { $gte: startDate } }),
    ]);

    const streaks = await StreakModel.find()
      .sort({ currentStreak: -1 })
      .limit(10)
      .lean();

    const topPhilosophers = await VerseModel.aggregate([
      { $group: { _id: '$philosopher', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    const analyticsEvents = getAnalyticsEvents();
    const recentEvents = analyticsEvents.slice(-100);

    const stats = {
      overview: {
        totalUsers,
        totalVerses,
        totalPhilosophers: totalPhilosophers.length,
        totalDiscussions,
        totalConversations,
      },
      activity: {
        activeUsers,
        newUsersThisPeriod,
        period,
      },
      streaks: streaks.slice(0, 5).map(s => ({
        userId: s.userId,
        currentStreak: s.currentStreak,
        longestStreak: s.longestStreak,
      })),
      topPhilosophers: topPhilosophers.map(p => ({
        name: p._id,
        verseCount: p.count,
      })),
      analytics: {
        totalEvents: recentEvents.length,
        byType: recentEvents.reduce((acc, e) => {
          acc[e.name] = (acc[e.name] || 0) + 1;
          return acc;
        }, {} as Record<string, number>),
      },
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
