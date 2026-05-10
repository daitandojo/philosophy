import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VerseModel } from '@/lib/models';
import { translateAndAnalyze } from '@/lib/deepseek';
import { generateEmbedding } from '@/lib/services/openai';
import { queryVectors } from '@/lib/services/pinecone';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const theme = searchParams.get('theme');
    const minWisdom = searchParams.get('minWisdom');
    const maxWisdom = searchParams.get('maxWisdom');
    const source = searchParams.get('source');
    const philosopher = searchParams.get('philosopher');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search');
    const semantic = searchParams.get('semantic') === 'true';

    let verses;

    if (semantic && search) {
      try {
        const { embedding } = await generateEmbedding(search);
        const matches = await queryVectors(embedding, limit * 2);
        
        const verseIds = matches.map(m => m.id);
        if (verseIds.length > 0) {
          verses = await VerseModel.find({ _id: { $in: verseIds } })
            .sort({ wisdomScore: -1 })
            .limit(limit);
        } else {
          verses = [];
        }
      } catch (vectorError) {
        console.error('Vector search failed, falling back to text search:', vectorError);
        verses = await VerseModel.find({}).limit(0);
      }
    } else {
      const query: Record<string, any> = {};

      if (theme) {
        query.themes = theme;
      }
      if (minWisdom) {
        query.wisdomScore = { $gte: parseInt(minWisdom) };
      }
      if (maxWisdom) {
        query.wisdomScore = { $lte: parseInt(maxWisdom) };
      }
      if (source) {
        query.sourceWork = source;
      }
      if (philosopher) {
        query.philosopher = philosopher;
      }
      if (search) {
        query.$text = { $search: search };
      }

      verses = await VerseModel.find(query)
        .sort({ wisdomScore: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    }

    const total = verses.length;

    return NextResponse.json({
      verses: verses.map(v => ({
        _id: v._id.toString(),
        persianText: v.persianText,
        transliteration: v.transliteration,
        englishTranslation: v.englishTranslation,
        summary: v.summary,
        sourceWork: v.sourceWork,
        philosopher: v.philosopher,
        themes: v.themes,
        wisdomScore: v.wisdomScore,
        complexity: v.complexity,
        emotionalTone: v.emotionalTone,
        tags: v.tags,
      })),
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Verses GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch verses', verses: [], total: 0, page: 1, pageSize: 20, totalPages: 0 }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { persianText, sourceWork, generateAI } = body;

    if (!persianText || !sourceWork) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let verseData: Record<string, any> = {
      persianText,
      sourceWork,
    };

    if (generateAI) {
      const aiResult = await translateAndAnalyze(persianText);
      verseData = {
        ...verseData,
        transliteration: aiResult.transliteration,
        englishTranslation: aiResult.englishTranslation,
        summary: aiResult.summary,
        themes: aiResult.themes,
        wisdomScore: aiResult.wisdomScore,
        emotionalTone: aiResult.emotionalTone,
        versions: [{
          version: 1,
          persianText,
          transliteration: aiResult.transliteration,
          englishTranslation: aiResult.englishTranslation,
          summary: aiResult.summary,
          source: 'ai',
          confidence: aiResult.confidence,
          updatedAt: new Date(),
        }],
      };
    }

    const verse = await VerseModel.create(verseData);
    return NextResponse.json(verse, { status: 201 });
  } catch (error) {
    console.error('Error creating verse:', error);
    return NextResponse.json({ error: 'Failed to create verse' }, { status: 500 });
  }
}
