import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VerseModel } from '@/lib/models/verse';
import mongoose from 'mongoose';

interface VersePreview {
  _id: mongoose.Types.ObjectId;
  persianText: string;
  transliteration: string;
  englishTranslation: string;
  philosopher: string;
  sourceWork: string;
  themes: string[];
  wisdomScore: number;
}

const THEMATIC_COLLECTIONS = [
  {
    id: 'wisdom-of-love',
    title: 'Wisdom of Love',
    description: 'Verses about love, compassion, and the heart\'s journey',
    themes: ['love', 'compassion', 'heart', 'devotion', 'passion'],
    color: '#e91e63',
    icon: 'favorite',
  },
  {
    id: 'path-of-sufism',
    title: 'Path of Sufism',
    description: 'Mystical wisdom and spiritual journeying',
    themes: ['mysticism', 'spiritual', 'journey', 'truth', 'inner'],
    color: '#9c27b0',
    icon: 'auto_awesome',
  },
  {
    id: 'wisdom-of-death',
    title: 'Wisdom of Mortality',
    description: 'Reflections on life, death, and the eternal',
    themes: ['death', 'life', 'eternal', 'soul', 'spirit'],
    color: '#607d8b',
    icon: 'hourglass_empty',
  },
  {
    id: 'nature-wisdom',
    title: 'Nature\'s Wisdom',
    description: 'Lessons from the natural world',
    themes: ['nature', 'sun', 'moon', 'wind', 'ocean', 'flower'],
    color: '#4caf50',
    icon: 'park',
  },
  {
    id: 'knowledge-wisdom',
    title: 'Knowledge & Wisdom',
    description: 'Verses about learning, wisdom, and understanding',
    themes: ['knowledge', 'wisdom', 'learning', 'understanding', 'truth'],
    color: '#2196f3',
    icon: 'school',
  },
  {
    id: 'moral-guidance',
    title: 'Moral Guidance',
    description: 'Ethical teachings and moral wisdom',
    themes: ['ethics', 'moral', 'righteousness', 'good', 'virtue'],
    color: '#ff9800',
    icon: 'balance',
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const themeId = searchParams.get('id');
    const includeVerses = searchParams.get('includeVerses') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    await connectDB();

    if (themeId) {
      const collection = THEMATIC_COLLECTIONS.find(c => c.id === themeId);
      
      if (!collection) {
        return NextResponse.json({ error: 'Theme not found' }, { status: 404 });
      }

      let verses: VersePreview[] = [];
      let total = 0;

      if (includeVerses) {
        const conditions = {
          themes: { $in: collection.themes },
        };

        verses = await VerseModel.find(conditions)
          .select('persianText transliteration englishTranslation philosopher sourceWork themes wisdomScore')
          .skip((page - 1) * pageSize)
          .limit(pageSize)
          .lean() as VersePreview[];

        total = await VerseModel.countDocuments(conditions);
      }

      return NextResponse.json({
        collection: {
          ...collection,
          verses: verses.map(v => ({
            _id: v._id.toString(),
            persianText: v.persianText,
            transliteration: v.transliteration,
            englishTranslation: v.englishTranslation,
            philosopher: v.philosopher,
            sourceWork: v.sourceWork,
            themes: v.themes,
            wisdomScore: v.wisdomScore,
          })),
          total,
          page,
          pageSize,
        },
      });
    }

    return NextResponse.json({
      collections: THEMATIC_COLLECTIONS.map(c => ({
        id: c.id,
        title: c.title,
        description: c.description,
        color: c.color,
        icon: c.icon,
      })),
    });
  } catch (error) {
    console.error('Theme collections GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch theme collections' }, { status: 500 });
  }
}
