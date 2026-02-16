import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VerseModel } from '@/lib/models';
import { translateAndAnalyze } from '@/lib/deepseek';

const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';

const philosopherContexts: Record<string, { works: string[], themes: string[], style: string }> = {
  rumi: {
    works: ['Masnavi', 'Divan-e Shams', 'Fihi Ma Fihi', 'Mawlana Letters'],
    themes: ['Divine love', 'Self-knowledge', 'Transformation', 'The soul\'s journey', 'Unity with God', 'The reed flute', 'Wine of love', 'Whirling dervishes', 'Death and rebirth', 'The heart', 'The light', 'The veil', 'The beloved', 'Longing and ecstasy'],
    style: 'Passionate, mystical, filled with metaphors of wine, dance, light, and love. Emphasizes divine love, self-annihilation (fana), and union with the beloved.'
  },
  hafez: {
    works: ['Divan-e Hafez'],
    themes: ['The cupbearer', 'Wine and tavern', 'Fortune-telling', 'The rose and nightingale', 'The beloved\'s face', 'Destiny and fate', 'Hidden treasure', 'The garden', 'Sincerity', 'The mirror', 'Truth and falsehood', 'Kingship and humility'],
    style: 'Elegant, cryptic, mystical ghazals. Uses wine as spiritual metaphor, speaks of the "cupbearer" as divine messenger, known for esoteric meanings that can be interpreted multiple ways.'
  },
  saadi: {
    works: ['Gulistan', 'Bustan'],
    themes: ['Moral conduct', 'Gratitude', 'Patience', 'Friendship', 'Kindness', 'Kingship', 'Wisdom in adversity', 'Contentment', 'Silence', 'Education', 'Justice', 'Humility'],
    style: 'Clear, didactic, practical wisdom. Uses fables with animals, practical ethical guidance, accessible poetry that teaches moral lessons through storytelling.'
  },
  attar: {
    works: ['Conference of the Birds', 'Ilahi-Nama', 'Tazkirat al-Awliya'],
    themes: ['The soul\'s journey', 'The Simurgh', 'Self-annihilation', 'The stages of the Sufi path', 'Mystical allegory', 'The caravan of lovers', 'The desert of love', 'The pearl in the oyster'],
    style: 'Allegorical, symbolic, mystical. The Conference of the Birds uses birds as seekers on the spiritual path, each representing a spiritual station.'
  },
  sanai: {
    works: ['Walled Garden of Truth', 'Hadiqat al-Haqiqa'],
    themes: ['The walled garden', 'Romantic love as spiritual metaphor', 'The journey from worldly to spiritual', 'Divine wisdom', 'Love and longing', 'The veil of reality'],
    style: 'Pioneered the use of romantic imagery for spiritual themes. His style influenced Rumi directly. Poetic, mystical, with clear spiritual allegories.'
  },
  jami: {
    works: ['Yusuf and Zulaikha', 'Layla and Majnun', 'Silsilat al-Dahab', 'Baharistan'],
    themes: ['Divine love', 'Romantic passion', 'The soul as lover', 'Beauty of the beloved', 'Union and separation', 'Mystical romance'],
    style: 'Combines romantic narrative with spiritual allegory. Last great master of classical Persian Sufi poetry. Elegant, ornate, deeply romantic.'
  },
};

const samplePersianVerses: Record<string, string[]> = {
  rumi: [
    'در عشق، جان را فدا کن',
    'عشق، همه چیز را نو می‌کند',
    'خود را بشناس',
    'عشق، زبان بی‌زبان است',
    'مرگ، زندگی نو است',
    'دل، آینه خداوند است',
    'نور، در تاریکی می‌تابد',
    'عشق، ویران‌کننده و سازنده است',
  ],
  hafez: [
    'ساقی، بیا که وقت طرب رسید',
    'می و معشوق و میدان همه چهارگانه عشق است',
    'حال ما در چنگال نظر یار است',
    'از میخانه سخن تازه می‌آید',
    'صبر کن که بهار جاودان خواهد آمد',
    'می ناب، روح را صفا می‌دهد',
  ],
  saadi: [
    'سخن نیکو به هر زبانی که بگویی بهار است',
    'دوست واقعی در روز سخت شناخته می‌شود',
    'کسی که نفس خویشتن را به دست آرد همه جهان را به دست آورده است',
    'سکوت نشان فضل بزرگان است',
    'صبر مفتاح هر خیر است',
    'بدی مکن که به تو بازگردد',
  ],
  attar: [
    'پرنده seeker است که در پرواز خویشتن آشیان را جستجو می‌کند',
    'هر که را جان بود مرگ را ببیند',
    'زیر پای درویش گنج پنهان است',
  ],
  sanai: [
    'عشق نردبان آسمان است',
    'اگر می‌خواهی جان را بستانی باید خویشتن را فروگذاری',
    'هر دلی که عشق را نشناخت سنگ است',
  ],
  jami: [
    'یوسف و زلیخا داستان عشق الهی است',
    'در محبت الهی جان فدا باید کرد',
  ],
};

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const { philosopherId, count = 10, force = false } = body;

    if (!philosopherId) {
      return NextResponse.json({ error: 'philosopherId is required' }, { status: 400 });
    }

    const context = philosopherContexts[philosopherId];
    if (!context) {
      return NextResponse.json({ error: 'Unknown philosopher' }, { status: 400 });
    }

    // Check existing verses count
    const existingCount = await VerseModel.countDocuments({ philosopher: philosopherId });
    if (existingCount >= 50 && !force) {
      return NextResponse.json({ 
        message: `Already have ${existingCount} verses for ${philosopherId}`,
        existingCount,
      });
    }

    const versesToGenerate = Math.min(count, 100);
    const generatedVerses = [];
    const baseVerses = samplePersianVerses[philosopherId] || [];

    for (let i = 0; i < versesToGenerate; i++) {
      const theme = context.themes[Math.floor(Math.random() * context.themes.length)];
      const work = context.works[Math.floor(Math.random() * context.works.length)];
      
      // Generate a Persian verse concept
      const prompt = `You are a master of Persian Sufi poetry in the style of ${philosopherId}.
Generate ONE original Persian verse (2-4 lines maximum) that expresses wisdom about: ${theme}
The verse should be in classical Persian poetic style with mystical or philosophical meaning.
Just output the Persian text, nothing else.`;

      let persianText = baseVerses[i % baseVerses.length] || '';
      
      try {
        const response = await fetch(`${DEEPSEEK_API_URL}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
              { role: 'system', content: 'You are a Persian Sufi poet.' },
              { role: 'user', content: prompt }
            ],
            max_tokens: 100,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const content = data.choices[0]?.message?.content?.trim();
          if (content && content.length < 200) {
            persianText = content;
          }
        }
      } catch (e) {
        console.log('Using fallback verse');
      }

      // Translate and analyze using existing function
      let verseData: Record<string, any> = {
        persianText,
        sourceWork: work,
        philosopher: philosopherId,
        tags: [theme.toLowerCase()],
      };

      try {
        const analysis = await translateAndAnalyze(persianText);
        verseData = {
          ...verseData,
          transliteration: analysis.transliteration,
          englishTranslation: analysis.englishTranslation,
          summary: analysis.summary,
          themes: analysis.themes,
          wisdomScore: analysis.wisdomScore,
          emotionalTone: analysis.emotionalTone,
        };
      } catch (e) {
        verseData = {
          ...verseData,
          transliteration: 'Transliteration pending',
          englishTranslation: 'Translation pending',
          summary: `A verse about ${theme}`,
          themes: [theme],
          wisdomScore: Math.floor(Math.random() * 5) + 5,
          emotionalTone: 'contemplative',
        };
      }

      generatedVerses.push(verseData);
    }

    // Save verses
    const created = await VerseModel.insertMany(generatedVerses);

    return NextResponse.json({
      message: `Generated ${created.length} verses for ${philosopherId}`,
      versesCreated: created.length,
      totalVerses: await VerseModel.countDocuments({ philosopher: philosopherId }),
    });
  } catch (error) {
    console.error('Error generating verses:', error);
    return NextResponse.json({ error: 'Failed to generate verses' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const philosopherId = searchParams.get('philosopherId');
    
    const query = philosopherId ? { philosopher: philosopherId } : {};
    const count = await VerseModel.countDocuments(query);
    
    const byPhilosopher = await VerseModel.aggregate([
      { $match: {} },
      { $group: { _id: '$philosopher', count: { $sum: 1 } } }
    ]);

    return NextResponse.json({
      total: count,
      byPhilosopher: Object.fromEntries(byPhilosopher.map(p => [p._id, p.count])),
    });
  } catch (error) {
    console.error('Error getting verse count:', error);
    return NextResponse.json({ error: 'Failed to get verse count' }, { status: 500 });
  }
}
