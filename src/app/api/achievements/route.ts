import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { AchievementModel, DEFAULT_ACHIEVEMENTS } from '@/lib/models/achievement';
import { UserAchievementModel } from '@/lib/models/userAchievement';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    await connectDB();

    await AchievementModel.insertMany(DEFAULT_ACHIEVEMENTS, { ordered: false }).catch(() => {});

    const achievements = await AchievementModel.find().lean();

    let userAchievements: string[] = [];
    if (userId) {
      const userAchievementsList = await UserAchievementModel.find({ userId }).lean();
      userAchievements = userAchievementsList.map(a => a.achievementCode);
    }

    return NextResponse.json({
      achievements: achievements.map(a => ({
        code: a.code,
        name: a.name,
        description: a.description,
        icon: a.icon,
        category: a.category,
        points: a.points,
        unlocked: userAchievements.includes(a.code),
      })),
      userAchievements,
    });
  } catch (error) {
    console.error('Achievements GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}
