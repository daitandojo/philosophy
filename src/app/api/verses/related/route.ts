import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VerseModel } from '@/lib/models/verse';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const verseId = searchParams.get('id');
    const limit = parseInt(searchParams.get('limit') || '5');

    if (!verseId) {
      return NextResponse.json(
        { error: 'Verse ID is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const currentVerse = await VerseModel.findById(verseId).lean();

    if (!currentVerse) {
      return NextResponse.json(
        { error: 'Verse not found' },
        { status: 404 }
      );
    }

    const conditions = [
      { _id: { $ne: new mongoose.Types.ObjectId(verseId) } },
      { philosopher: currentVerse.philosopher },
    ];

    const themeConditions = currentVerse.themes?.length 
      ? { themes: { $in: currentVerse.themes } }
      : {};

    const emotionalToneCondition = currentVerse.emotionalTone
      ? { emotionalTone: currentVerse.emotionalTone }
      : {};

    const relatedByPhilosopher = await VerseModel.find({
      $and: [
        { _id: { $ne: new mongoose.Types.ObjectId(verseId) } },
        { philosopher: currentVerse.philosopher },
      ],
    })
      .select('persianText transliteration englishTranslation summary philosopher sourceWork themes wisdomScore')
      .limit(limit)
      .lean();

    const relatedByThemes = await VerseModel.find({
      $and: [
        { _id: { $ne: new mongoose.Types.ObjectId(verseId) } },
        { philosopher: { $ne: currentVerse.philosopher } },
        { themes: { $in: currentVerse.themes || [] } },
      ],
    })
      .select('persianText transliteration englishTranslation summary philosopher sourceWork themes wisdomScore')
      .limit(Math.floor(limit / 2))
      .lean();

    const relatedByTone = await VerseModel.find({
      $and: [
        { _id: { $ne: new mongoose.Types.ObjectId(verseId) } },
        { philosopher: { $ne: currentVerse.philosopher } },
        { emotionalTone: currentVerse.emotionalTone },
      ],
    })
      .select('persianText transliteration englishTranslation summary philosopher sourceWork themes wisdomScore')
      .limit(Math.floor(limit / 2))
      .lean();

    const seenIds = new Set<string>();
    const uniqueRelated: typeof relatedByPhilosopher = [];

    const addUnique = (verses: typeof relatedByPhilosopher) => {
      for (const verse of verses) {
        const id = verse._id.toString();
        if (!seenIds.has(id)) {
          seenIds.add(id);
          uniqueRelated.push(verse);
        }
      }
    };

    addUnique(relatedByPhilosopher);
    addUnique(relatedByThemes);
    addUnique(relatedByTone);

    const results = uniqueRelated.slice(0, limit).map(v => ({
      _id: v._id.toString(),
      persianText: v.persianText,
      transliteration: v.transliteration,
      englishTranslation: v.englishTranslation,
      summary: v.summary,
      philosopher: v.philosopher,
      sourceWork: v.sourceWork,
      themes: v.themes,
      wisdomScore: v.wisdomScore,
    }));

    return NextResponse.json({ verses: results });
  } catch (error) {
    console.error('Related verses error:', error);
    return NextResponse.json(
      { error: 'Failed to get related verses', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
