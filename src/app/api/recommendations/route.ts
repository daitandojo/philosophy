import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { ConversationModel } from '@/lib/models/conversation';
import { VerseModel } from '@/lib/models/verse';
import { UserModel } from '@/lib/models/user';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    const user = await UserModel.findOne({ email: userId }).lean();

    const recentConversations = await ConversationModel.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(10)
      .lean();

    const allMessages = recentConversations.flatMap(c => c.messages || []);
    const userMessages = allMessages.filter(m => m.role === 'user').map(m => m.content);

    const themeCounts: Record<string, number> = {};
    const philosopherCounts: Record<string, number> = {};

    recentConversations.forEach(c => {
      philosopherCounts[c.philosopherId] = (philosopherCounts[c.philosopherId] || 0) + 1;
    });

    userMessages.forEach(msg => {
      const words = msg.toLowerCase().split(/\s+/);
      const themes = ['love', 'death', 'life', 'wisdom', 'soul', 'spirit', 'god', 'truth', 'peace', 'joy'];
      themes.forEach(theme => {
        if (words.includes(theme)) {
          themeCounts[theme] = (themeCounts[theme] || 0) + 1;
        }
      });
    });

    const topPhilosophers = Object.entries(philosopherCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([id]) => id);

    const topThemes = Object.entries(themeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([theme]) => theme);

    const recommendedVerses = await VerseModel.find({
      $or: [
        { philosopher: { $in: topPhilosophers } },
        { themes: { $in: topThemes } },
      ],
    })
      .select('persianText englishTranslation philosopher sourceWork themes wisdomScore')
      .limit(5)
      .lean();

    const personalizedContent = {
      summary: {
        topPhilosophers,
        topThemes,
        totalConversations: recentConversations.length,
      },
      recommendations: {
        verses: recommendedVerses.map(v => ({
          _id: v._id.toString(),
          persianText: v.persianText,
          englishTranslation: v.englishTranslation,
          philosopher: v.philosopher,
          sourceWork: v.sourceWork,
          themes: v.themes,
          wisdomScore: v.wisdomScore,
        })),
        philosophers: topPhilosophers.map(id => ({ id })),
        suggestedTopics: topThemes.slice(0, 3).map(theme => ({
          topic: theme,
          question: getSuggestedQuestion(theme),
        })),
      },
    };

    return NextResponse.json(personalizedContent);
  } catch (error) {
    console.error('Recommendations GET error:', error);
    return NextResponse.json({ error: 'Failed to get recommendations' }, { status: 500 });
  }
}

function getSuggestedQuestion(theme: string): string {
  const questions: Record<string, string> = {
    love: 'What is the nature of divine love?',
    death: 'What happens after death?',
    life: 'How should we live a meaningful life?',
    wisdom: 'What is true wisdom?',
    soul: 'What is the nature of the soul?',
    spirit: 'What is the difference between soul and spirit?',
    god: 'What is your understanding of God?',
    truth: 'What is truth?',
    peace: 'How can one find inner peace?',
    joy: 'What brings true joy?',
  };
  return questions[theme] || 'Share your wisdom on this topic';
}
