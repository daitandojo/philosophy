import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { LearningPathModel } from '@/lib/models/learningPath';
import { UserProgressModel } from '@/lib/models/userProgress';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const philosopherId = searchParams.get('philosopherId');
    const difficulty = searchParams.get('difficulty');
    const userId = searchParams.get('userId');

    await connectDB();

    const conditions: Record<string, unknown> = { isPublished: true };
    if (philosopherId) conditions.philosopherId = philosopherId;
    if (difficulty) conditions.difficulty = difficulty;

    const paths = await LearningPathModel.find(conditions)
      .select('title titlePersian description philosopherId difficulty estimatedTime imageUrl tags')
      .lean();

    let userProgress: Record<string, unknown> = {};
    if (userId) {
      const progressList = await UserProgressModel.find({ userId }).lean();
      progressList.forEach(p => {
        userProgress[p.learningPathId] = p;
      });
    }

    return NextResponse.json({
      learningPaths: paths.map(p => ({
        _id: p._id.toString(),
        title: p.title,
        titlePersian: p.titlePersian,
        description: p.description,
        philosopherId: p.philosopherId,
        difficulty: p.difficulty,
        estimatedTime: p.estimatedTime,
        imageUrl: p.imageUrl,
        tags: p.tags,
        lessonCount: p.lessons?.length || 0,
        userProgress: userProgress[p._id.toString()] || null,
      })),
    });
  } catch (error) {
    console.error('Learning paths GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch learning paths' }, { status: 500 });
  }
}
