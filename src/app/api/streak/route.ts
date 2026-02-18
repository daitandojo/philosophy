import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { StreakModel } from '@/lib/models/streak';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    let streak = await StreakModel.findOne({ userId }).lean();

    if (!streak) {
      streak = {
        userId,
        currentStreak: 0,
        longestStreak: 0,
        lastVisitDate: null,
        dailyWisdomRead: false,
        wisdomReadDates: [],
      };
    }

    return NextResponse.json({
      streak: {
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        lastVisitDate: streak.lastVisitDate,
        dailyWisdomRead: streak.dailyWisdomRead,
        wisdomReadDates: streak.wisdomReadDates?.length || 0,
      },
    });
  } catch (error) {
    console.error('Streak GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch streak' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, action } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    let streak = await StreakModel.findOne({ userId });

    if (!streak) {
      streak = await StreakModel.create({
        userId,
        currentStreak: 0,
        longestStreak: 0,
        lastVisitDate: null,
        dailyWisdomRead: false,
        wisdomReadDates: [],
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const lastVisit = streak.lastVisitDate ? new Date(streak.lastVisitDate) : null;
    lastVisit?.setHours(0, 0, 0, 0);

    if (action === 'visit') {
      if (lastVisit) {
        const dayDiff = Math.floor((today.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));
        
        if (dayDiff === 1) {
          streak.currentStreak += 1;
        } else if (dayDiff > 1) {
          streak.currentStreak = 1;
        }
      } else {
        streak.currentStreak = 1;
      }

      if (streak.currentStreak > streak.longestStreak) {
        streak.longestStreak = streak.currentStreak;
      }

      streak.lastVisitDate = new Date();
    }

    if (action === 'read_wisdom') {
      streak.dailyWisdomRead = true;
      streak.wisdomReadDates = streak.wisdomReadDates || [];
      
      const hasReadToday = streak.wisdomReadDates.some((d: Date) => {
        const date = new Date(d);
        date.setHours(0, 0, 0, 0);
        return date.getTime() === today.getTime();
      });

      if (!hasReadToday) {
        streak.wisdomReadDates.push(new Date());
        
        if (streak.wisdomReadDates.length > 365) {
          streak.wisdomReadDates = streak.wisdomReadDates.slice(-365);
        }
      }
    }

    await streak.save();

    return NextResponse.json({
      streak: {
        currentStreak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        lastVisitDate: streak.lastVisitDate,
        dailyWisdomRead: streak.dailyWisdomRead,
      },
    });
  } catch (error) {
    console.error('Streak POST error:', error);
    return NextResponse.json({ error: 'Failed to update streak' }, { status: 500 });
  }
}
