import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VerseModel } from '@/lib/models/verse';
import { findSimilarVerses } from '@/lib/deepseek';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { error: 'Search query is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const verses = await VerseModel.find()
      .select('persianText englishTranslation philosopher sourceWork themes wisdomScore')
      .limit(50)
      .lean();

    if (verses.length === 0) {
      return NextResponse.json({
        verses: [],
        total: 0,
      });
    }

    const { indices, reasons } = await findSimilarVerses(
      query,
      verses.map(v => ({
        persianText: v.persianText,
        englishTranslation: v.englishTranslation,
        philosopher: v.philosopher,
      }))
    );

    const results = indices.slice(0, limit).map((index, i) => ({
      _id: verses[index]._id.toString(),
      persianText: verses[index].persianText,
      englishTranslation: verses[index].englishTranslation,
      philosopher: verses[index].philosopher,
      sourceWork: verses[index].sourceWork,
      themes: verses[index].themes,
      wisdomScore: verses[index].wisdomScore,
      relevanceReason: reasons[i] || '',
    }));

    return NextResponse.json({
      verses: results,
      total: results.length,
    });
  } catch (error) {
    console.error('Semantic search error:', error);
    return NextResponse.json(
      { error: 'Semantic search failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
