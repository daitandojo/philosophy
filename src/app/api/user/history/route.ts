import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { UserModel, type ReadingHistoryItem, type FavoriteVerse } from '@/lib/models/user';
import mongoose, { Types } from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type') || 'history';
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    await connectDB();

    const user = await UserModel.findOne({ email: userId }).lean();

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (type === 'history') {
      const history = (user.readingHistory || [])
        .sort((a: ReadingHistoryItem, b: ReadingHistoryItem) => 
          new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime()
        )
        .slice(0, limit);

      return NextResponse.json({
        history: history.map((h: ReadingHistoryItem) => ({
          verseId: h.verseId.toString(),
          viewedAt: h.viewedAt,
          completionPercentage: h.completionPercentage,
        })),
      });
    } else if (type === 'favorites') {
      const favorites = (user.favoriteVerses || [])
        .sort((a: FavoriteVerse, b: FavoriteVerse) => 
          new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
        )
        .slice(0, limit);

      return NextResponse.json({
        favorites: favorites.map((f: FavoriteVerse) => ({
          verseId: f.verseId.toString(),
          addedAt: f.addedAt,
        })),
      });
    } else if (type === 'philosophers') {
      return NextResponse.json({
        philosophers: user.recentlyViewedPhilosophers || [],
      });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error) {
    console.error('History GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch history' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, verseId, type = 'history', completionPercentage = 100 } = body;

    if (!userId || !verseId) {
      return NextResponse.json({ error: 'User ID and verse ID are required' }, { status: 400 });
    }

    await connectDB();

    const user = await UserModel.findOne({ email: userId });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (type === 'history') {
      const existingIndex = user.readingHistory?.findIndex(
        (h: ReadingHistoryItem) => h.verseId.toString() === verseId
      );

      const historyEntry: ReadingHistoryItem = {
        verseId: new Types.ObjectId(verseId),
        viewedAt: new Date(),
        completionPercentage,
      };

      if (existingIndex !== undefined && existingIndex >= 0) {
        user.readingHistory![existingIndex] = historyEntry;
      } else {
        user.readingHistory = user.readingHistory || [];
        user.readingHistory.push(historyEntry);
      }

      if (user.readingHistory.length > 100) {
        user.readingHistory = user.readingHistory
          .sort((a: ReadingHistoryItem, b: ReadingHistoryItem) => 
            new Date(b.viewedAt).getTime() - new Date(a.viewedAt).getTime()
          )
          .slice(0, 100);
      }
    } else if (type === 'favorite') {
      const existingIndex = user.favoriteVerses?.findIndex(
        (f: FavoriteVerse) => f.verseId.toString() === verseId
      );

      if (existingIndex === undefined || existingIndex < 0) {
        user.favoriteVerses = user.favoriteVerses || [];
        user.favoriteVerses.push({
          verseId: new Types.ObjectId(verseId),
          addedAt: new Date(),
        });
      }
    } else if (type === 'unfavorite') {
      user.favoriteVerses = user.favoriteVerses || [];
      user.favoriteVerses = user.favoriteVerses.filter(
        (f: FavoriteVerse) => f.verseId.toString() !== verseId
      );
    }

    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('History POST error:', error);
    return NextResponse.json({ error: 'Failed to update history' }, { status: 500 });
  }
}
