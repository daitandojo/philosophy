import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface TermData {
  english: string;
  variations: string[];
  essays: Record<string, string>;
  persian?: string;
}
const PHILOSOPHICAL_TERMS: Record<string, TermData> = {
  'عشق': {
    english: 'Love (Eshq)',
    variations: ['عشق', 'عاشق', 'معشوق', 'محبوب'],
    essays: {
      rumi: 'In Rumi\'s Sufi framework, Eshq is not merely human love but divine madness—the soul\'s longing to reunite with the Beloved. It is the fire that burns away all falsehood, leaving only truth. The lover becomes the loved; the seeker becomes the sought.',
      hafez: 'For Hafez, Eshq is the wine of consciousness that frees the soul from the prison of self. It is both destructive and regenerative—breaking the ego while rebuilding it in the image of the divine.',
      'ibn-arabi': 'Ibn Arabi teaches that Eshq is the universal force of attraction that binds all existence. Every particle loves its opposite, creating the dance of being. Human love is a mirror of the divine love that animates the cosmos.',
    },
  },
  'وحدت': {
    english: 'Unity (Wahdat)',
    variations: ['وحدت', 'یکتائی', 'توحید'],
    essays: {
      'ibn-arabi': 'Wahdat al-Wujud (Unity of Being) is the concept that all existence is a single reality. The diverse forms we perceive are like waves on one ocean—temporarily separate but eternally one.',
      'mulla-sadra': 'Mulla Sadra expands this to show that being itself subsists and transforms. All things are gradations of the one Being, moving from pure actuality to potentiality and back.',
      suhrawardi: 'The Illuminationist school shows that light is the fundamental reality. All beings are lights不同程度的 illumination from the Supreme Light—closer to the source means more reality and goodness.',
    },
  },
  'دانش': {
    english: 'Knowledge (Danesh)',
    variations: ['دانش', 'علم', 'معرفت', 'حکمت'],
    essays: {
      'ibn-sina': 'For Avicenna, knowledge is the correspondence between the mind and reality. True knowledge requires both empirical observation and rational demonstration—he is the father of systematic philosophy in the Islamic world.',
      'al-farabi': 'Al-Farabi distinguishes between knowledge that leads to action (practical) and knowledge that leads to happiness (theoretical). The highest knowledge is the contemplation of the First Truth.',
      'al-ghazali': 'Al-Ghazali warns that mere intellectual knowledge without spiritual practice is worthless. True knowledge transforms the heart; without that transformation, one is just a sophist.',
    },
  },
  'قلب': {
    english: 'Heart (Qalb)',
    variations: ['قلب', 'دل', 'سینه'],
    essays: {
      rumi: 'The heart is not flesh but the seat of divine perception. When polished through remembrance (zikr), it becomes a mirror reflecting the Infinite. The damaged heart cannot see truth; the pure heart sees everywhere.',
      ghazali: 'The heart is the battleground between faith and desire. It can become hell (if darkened by sin) or paradise (if illuminated by virtue). Introspection (muhasaba) is the daily cleaning of this mirror.',
      attar: 'The heart is the throne of God within the human being. When the ego dies, the heart awakens. Every spiritual journey is really a journey into the heart\'s深处—its depths.',
    },
  },
  'نور': {
    english: 'Light (Nur)',
    variations: ['نور', 'روشنایی', 'ضیاء'],
    essays: {
      suhrawardi: 'Light is not metaphor but reality. The world is composed of varying intensities of divine light. The soul is a light trapped in darkness; wisdom is its liberation.',
      rumi: 'The wound is where the Light enters. Pain reveals the hidden light within. Darkness is not absence of light but the veil over our eyes—removing the veil reveals we have always been swimming in light.',
      'mulla-sadra': 'Being is light—more existence means more light. The journey of the soul is from dim potentiality to bright actuality, culminating in the eternal Light.',
    },
  },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const word = searchParams.get('word');
    const philosopher = searchParams.get('philosopher');

    if (!word) {
      // Return all available terms
      return NextResponse.json({
        terms: Object.entries(PHILOSOPHICAL_TERMS).map(([persian, data]) => ({
          persian,
          english: data.english,
          variations: data.variations,
        })),
      });
    }

    // Find the term
    let term = PHILOSOPHICAL_TERMS[word];
    
    // Search in variations if exact match not found
    if (!term) {
      for (const [persian, data] of Object.entries(PHILOSOPHICAL_TERMS)) {
        if (data.variations.some(v => v.includes(word) || word.includes(v))) {
          term = { persian, ...data };
          break;
        }
      }
    }

    if (!term) {
      return NextResponse.json({ 
        error: 'Term not found in database' 
      }, { status: 404 });
    }

    // Get specific philosopher's essay or all essays
    let essay;
    if (philosopher && term.essays[philosopher]) {
      essay = {
        philosopher,
        text: term.essays[philosopher],
      };
    }

    return NextResponse.json({
      term: {
        persian: term.persian || word,
        english: term.english,
        variations: term.variations,
        essays: essay ? [essay] : Object.entries(term.essays).map(([philosopher, text]) => ({
          philosopher,
          text,
        })),
      },
    });
  } catch (error: any) {
    console.error('Etymology error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to get etymology' 
    }, { status: 500 });
  }
}

// Background job to generate etymologies for all verses (admin only)
export async function POST(request: NextRequest) {
  try {
    // Verify admin
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }

    // Get all unique philosophical terms from verses
    const terms = await db.collection('verses').distinct('themes');

    const etymologyResults = [];

    for (const term of terms.slice(0, 50)) {
      // Skip if already analyzed
      const existing = await db.collection('etymologies').findOne({ term });
      if (existing) continue;

      // Generate essay using LLM
      const response = await fetch(`${process.env.DEEPSEEK_API_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: `You are an expert in Persian philosophy. Explain the philosophical meaning and evolution of this Persian/Arabic term in Islamic mysticism and philosophy. 
Write 100 words covering:
1. Literal meaning
2. Evolution through classical Persian poets
3. Key philosophical nuances

Be scholarly but accessible.`,
            },
            {
              role: 'user',
              content: term,
            },
          ],
        }),
      });

      const data = await response.json();
      const essay = data.choices?.[0]?.message?.content || '';

      await db.collection('etymologies').insertOne({
        term,
        essay,
        createdAt: new Date(),
      });

      etymologyResults.push({ term, essay: essay.slice(0, 50) + '...' });
    }

    return NextResponse.json({
      success: true,
      processed: etymologyResults.length,
      results: etymologyResults,
    });
  } catch (error: any) {
    console.error('Etymology generation error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to generate etymologies' 
    }, { status: 500 });
  }
}
