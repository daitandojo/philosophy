import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VerseModel } from '@/lib/models/verse';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const philosopher = searchParams.get('philosopher');
    const themes = searchParams.get('themes')?.split(',').filter(Boolean);
    const emotionalTone = searchParams.get('emotionalTone');

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const searchConditions: Record<string, unknown> = {};

    if (philosopher) {
      searchConditions.philosopher = philosopher;
    }

    if (themes && themes.length > 0) {
      searchConditions.themes = { $in: themes };
    }

    if (emotionalTone) {
      searchConditions.emotionalTone = emotionalTone;
    }

    const textSearchConditions = {
      $text: { $search: query },
      ...searchConditions,
    };

    const verseResults = await VerseModel.find(
      type === 'all' || type === 'verse' ? textSearchConditions : {}
    )
      .select('persianText transliteration englishTranslation summary philosopher sourceWork themes wisdomScore emotionalTone tags imageUrl calligraphyUrl audioUrl')
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const total = await VerseModel.countDocuments(
      type === 'all' || type === 'verse' ? textSearchConditions : {}
    );

    const results = {
      verses: verseResults.map(v => ({
        _id: v._id.toString(),
        persianText: v.persianText,
        transliteration: v.transliteration,
        englishTranslation: v.englishTranslation,
        summary: v.summary,
        philosopher: v.philosopher,
        sourceWork: v.sourceWork,
        themes: v.themes,
        wisdomScore: v.wisdomScore,
        emotionalTone: v.emotionalTone,
        tags: v.tags,
        imageUrl: v.imageUrl,
        calligraphyUrl: v.calligraphyUrl,
        audioUrl: v.audioUrl,
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };

    return NextResponse.json(results);
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
