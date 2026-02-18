import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { UserProgressModel } from '@/lib/models/userProgress';
import { LearningPathModel } from '@/lib/models/learningPath';
import { AchievementModel, DEFAULT_ACHIEVEMENTS } from '@/lib/models/achievement';
import { UserAchievementModel } from '@/lib/models/userAchievement';

interface RouteParams {
  params: Promise<{ pathId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { pathId } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    const progress = await UserProgressModel.findOne({ userId, learningPathId: pathId }).lean();

    return NextResponse.json({
      progress: progress ? {
        completedLessons: progress.completedLessons,
        currentLesson: progress.currentLesson,
        progress: progress.progress,
        quizScores: progress.quizScores,
        startedAt: progress.startedAt,
        completedAt: progress.completedAt,
      } : null,
    });
  } catch (error) {
    console.error('Progress GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { pathId } = await params;
    const body = await request.json();
    const { userId, lessonId, action } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    const path = await LearningPathModel.findById(pathId);
    if (!path) {
      return NextResponse.json({ error: 'Learning path not found' }, { status: 404 });
    }

    let progress = await UserProgressModel.findOne({ userId, learningPathId: pathId });

    if (!progress) {
      progress = await UserProgressModel.create({
        userId,
        learningPathId: pathId,
        completedLessons: [],
        quizScores: [],
        progress: 0,
        startedAt: new Date(),
      });
    }

    if (action === 'complete_lesson' && lessonId) {
      if (!progress.completedLessons.includes(lessonId)) {
        progress.completedLessons.push(lessonId);
        progress.currentLesson = lessonId;
        
        const totalLessons = path.lessons?.length || 1;
        progress.progress = Math.round((progress.completedLessons.length / totalLessons) * 100);
      }

      if (progress.completedLessons.length === path.lessons?.length) {
        progress.completedAt = new Date();
        
        await AchievementModel.insertMany(DEFAULT_ACHIEVEMENTS.filter(a => a.code === 'first_path'), { ordered: false }).catch(() => {});
        await UserAchievementModel.findOneAndUpdate(
          { userId, achievementCode: 'first_path' },
          { userId, achievementCode: 'first_path', unlockedAt: new Date() },
          { upsert: true }
        ).catch(() => {});
      }
    }

    await progress.save();

    return NextResponse.json({
      progress: {
        completedLessons: progress.completedLessons,
        currentLesson: progress.currentLesson,
        progress: progress.progress,
        completedAt: progress.completedAt,
      },
    });
  } catch (error) {
    console.error('Progress POST error:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}
