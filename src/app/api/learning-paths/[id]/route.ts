import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { LearningPathModel } from '@/lib/models/learningPath';
import { UserProgressModel } from '@/lib/models/userProgress';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    await connectDB();

    const path = await LearningPathModel.findById(id).lean();

    if (!path) {
      return NextResponse.json({ error: 'Learning path not found' }, { status: 404 });
    }

    let progress = null;
    if (userId) {
      progress = await UserProgressModel.findOne({ userId, learningPathId: id }).lean();
    }

    return NextResponse.json({
      learningPath: {
        _id: path._id.toString(),
        title: path.title,
        titlePersian: path.titlePersian,
        description: path.description,
        philosopherId: path.philosopherId,
        difficulty: path.difficulty,
        estimatedTime: path.estimatedTime,
        imageUrl: path.imageUrl,
        tags: path.tags,
        lessons: (path.lessons || []).map((l: { _id: string; title: string; titlePersian?: string; content: string; verseIds: string[]; quizId?: string; order: number }) => ({
          _id: l._id,
          title: l.title,
          titlePersian: l.titlePersian,
          content: l.content,
          verseIds: l.verseIds,
          quizId: l.quizId,
          order: l.order,
        })) || [],
      },
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
    console.error('Learning path GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch learning path' }, { status: 500 });
  }
}
