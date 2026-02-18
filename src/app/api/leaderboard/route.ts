import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { UserModel } from '@/lib/models/user';
import { UserProfile } from '@/lib/models/userProfile';
import { UserAchievementModel } from '@/lib/models/userAchievement';
import { StreakModel } from '@/lib/models/streak';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    await connectDB();

    let dateFilter = {};
    if (period === 'daily') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      dateFilter = { lastVisitDate: { $gte: today } };
    } else if (period === 'weekly') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      dateFilter = { lastVisitDate: { $gte: weekAgo } };
    } else if (period === 'monthly') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      dateFilter = { lastVisitDate: { $gte: monthAgo } };
    }

    const streaks = await StreakModel.find(dateFilter)
      .sort({ currentStreak: -1 })
      .limit(100)
      .lean();

    const userIds = streaks.map(s => s.userId);

    const users = await UserModel.find({ _id: { $in: userIds } })
      .select('name email image')
      .lean();

    const profiles = await UserProfile.find({ userId: { $in: userIds } })
      .lean();

    const userMap = new Map(users.map(u => [u._id.toString(), u]));
    const profileMap = new Map(profiles.map(p => [p.userId, p]));

    const leaderboard = streaks.map((streak, index) => {
      const user = userMap.get(streak.userId);
      const profile = profileMap.get(streak.userId);
      
      return {
        rank: index + 1,
        userId: streak.userId,
        name: user?.name || 'Anonymous',
        image: profile?.avatar || user?.image,
        streak: streak.currentStreak,
        totalWisdomRead: streak.wisdomReadDates?.length || 0,
      };
    });

    const start = (page - 1) * pageSize;
    const paginatedLeaderboard = leaderboard.slice(start, start + pageSize);

    return NextResponse.json({
      leaderboard: paginatedLeaderboard,
      total: leaderboard.length,
      page,
      pageSize,
      totalPages: Math.ceil(leaderboard.length / pageSize),
    });
  } catch (error) {
    console.error('Leaderboard GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
