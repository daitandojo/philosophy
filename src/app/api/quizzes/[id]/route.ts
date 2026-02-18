import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { QuizModel } from '@/lib/models/quiz';
import { UserProgressModel } from '@/lib/models/userProgress';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    await connectDB();

    const quiz = await QuizModel.findById(id).lean();

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    return NextResponse.json({
      quiz: {
        _id: quiz._id.toString(),
        title: quiz.title,
        lessonId: quiz.lessonId,
        learningPathId: quiz.learningPathId,
        questions: quiz.questions.map((q: { _id: string; question: string; options: string[]; type: string; explanation: string }) => ({
          _id: q._id,
          question: q.question,
          options: q.options,
          type: q.type,
          explanation: q.explanation,
        })),
        passingScore: quiz.passingScore,
        timeLimit: quiz.timeLimit,
      },
    });
  } catch (error) {
    console.error('Quiz GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch quiz' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { userId, answers } = body;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    const quiz = await QuizModel.findById(id).lean();

    if (!quiz) {
      return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    }

    let correctCount = 0;
    const results = quiz.questions.map((q: { _id: string; correctAnswer: string; explanation: string }) => {
      const userAnswer = answers[q._id];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correctCount++;
      return {
        questionId: q._id,
        userAnswer,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation,
      };
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= (quiz.passingScore || 70);

    if (quiz.learningPathId) {
      await UserProgressModel.findOneAndUpdate(
        { userId, learningPathId: quiz.learningPathId },
        {
          $push: {
            quizScores: {
              lessonId: quiz.lessonId,
              quizId: id,
              score,
              attemptedAt: new Date(),
            },
          },
        },
        { upsert: true }
      );
    }

    return NextResponse.json({
      results: {
        score,
        passed,
        correctCount,
        totalQuestions: quiz.questions.length,
        details: results,
      },
    });
  } catch (error) {
    console.error('Quiz POST error:', error);
    return NextResponse.json({ error: 'Failed to submit quiz' }, { status: 500 });
  }
}
