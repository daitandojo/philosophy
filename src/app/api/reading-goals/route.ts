import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ReadingGoalModel } from '@/lib/models/readingGoal';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    let goal = await ReadingGoalModel.findOne({ userId }).lean();

    if (!goal) {
      return NextResponse.json({
        goal: {
          weeklyGoal: 10,
          currentWeekVerses: 0,
          totalVersesRead: 0,
          progress: 0,
        },
      });
    }

    const weekStart = goal.weekStartDate ? new Date(goal.weekStartDate) : new Date();
    const today = new Date();
    
    if (!goal.weekStartDate || weekStart < new Date(today.setDate(today.getDate() - today.getDay()))) {
      goal.currentWeekVerses = 0;
      goal.weekStartDate = new Date();
    }

    const progress = Math.min(100, Math.round((goal.currentWeekVerses / goal.weeklyGoal) * 100));

    return NextResponse.json({
      goal: {
        weeklyGoal: goal.weeklyGoal,
        currentWeekVerses: goal.currentWeekVerses,
        totalVersesRead: goal.totalVersesRead,
        progress,
        weekStartDate: goal.weekStartDate,
      },
    });
  } catch (error) {
    console.error('Reading goal GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch reading goal' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, weeklyGoal, increment } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    let goal = await ReadingGoalModel.findOne({ userId });

    if (!goal) {
      goal = await ReadingGoalModel.create({
        userId,
        weeklyGoal: weeklyGoal || 10,
        currentWeekVerses: 0,
        weekStartDate: new Date(),
        totalVersesRead: 0,
      });
    }

    if (weeklyGoal !== undefined) {
      goal.weeklyGoal = weeklyGoal;
    }

    if (increment) {
      const today = new Date();
      const weekStart = goal.weekStartDate ? new Date(goal.weekStartDate) : null;
      
      if (!weekStart || weekStart < new Date(today.setDate(today.getDate() - today.getDay()))) {
        goal.currentWeekVerses = 0;
        goal.weekStartDate = new Date();
      }

      goal.currentWeekVerses += 1;
      goal.totalVersesRead += 1;
    }

    await goal.save();

    const progress = Math.min(100, Math.round((goal.currentWeekVerses / goal.weeklyGoal) * 100));

    return NextResponse.json({
      goal: {
        weeklyGoal: goal.weeklyGoal,
        currentWeekVerses: goal.currentWeekVerses,
        totalVersesRead: goal.totalVersesRead,
        progress,
      },
    });
  } catch (error) {
    console.error('Reading goal POST error:', error);
    return NextResponse.json({ error: 'Failed to update reading goal' }, { status: 500 });
  }
}
