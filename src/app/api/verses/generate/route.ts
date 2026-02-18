import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VerseModel } from '@/lib/models';
import { translateAndAnalyze } from '@/lib/deepseek';
import { generateEmbedding } from '@/lib/services/openai';
import { queryVectors, upsertVectors } from '@/lib/services/pinecone';

const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const SIMILARITY_THRESHOLD = 0.88;

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
  nizami: {
    works: ['Khosrow and Shirin', 'Layla and Majnun', 'Seven Beauties', 'Iskandarnameh'],
    themes: ['Romantic love', 'Heroism', 'Wisdom and kingship', 'Beauty and art', 'Loyalty', 'The wise ruler', 'Knowledge'],
    style: 'Master of romantic epic poetry. Combines love stories with moral and philosophical lessons. Rich imagery, elaborate descriptions.'
  },
  ferdowsi: {
    works: ['Shahnameh'],
    themes: ['Heroism', 'Kingship', 'Justice', 'Patriotic duty', 'Love of homeland', 'Tragic fate', 'Wisdom of ages', 'The glory of Persia'],
    style: 'Epic, heroic, majestic. Preserves Persian mythology and history. Fluent, dignified, rich in Persian vocabulary.'
  },
  'ibn-sina': {
    works: ['Canon of Medicine', 'Book of Healing', 'Physics', 'Metaphysics'],
    themes: ['The soul', 'Intellect', 'Medicine', 'Logic', 'Being and non-being', 'Knowledge', 'Cause and effect', 'The heavens'],
    style: 'Philosophical, systematic, analytical. Clear prose explaining complex metaphysical and medical concepts.'
  },
  'al-farabi': {
    works: ['The Virtuous City', 'The Enumeration of the Sciences', 'Music', 'Logic'],
    themes: ['The ideal state', 'Music and harmony', 'The role of the philosopher-ruler', 'Science and knowledge', 'The soul', 'Happiness'],
    style: 'Systematic, philosophical, political. Known for political philosophy and music theory.'
  },
  'al-ghazali': {
    works: ['Ihya Ulum al-Din', 'The Incoherence of the Philosophers', 'The Alchemist of Happiness', 'Deliverer from Error'],
    themes: ['Self-purification', 'Knowledge and faith', 'The heart', 'Sufi mysticism', 'Islamic jurisprudence', 'The afterlife', 'Divine unity'],
    style: 'Theological, introspective, practical. Combines rigorous scholarship with mystical insight.'
  },
  suhrawardi: {
    works: ['The Philosophy of Illumination', 'The Martyrs of the Light', 'The Rising of the Light'],
    themes: ['Light', 'The angelic world', 'Self-knowledge', 'Illumination', 'The imaginal world', 'Mystical experience'],
    style: 'Mystical, visionary, luminous. Founder of Illuminationist philosophy (Ishraq).'
  },
  'mulla-sadra': {
    works: ['The Transcendent Theosophy', 'Four Essays', 'The Journey of the Soul'],
    themes: ['Transcendent theosophy', 'The primacy of being', 'The journey of the soul', 'Imagination', 'Knowledge', 'Death and resurrection'],
    style: 'Deep metaphysical, synthesizing philosophy, theology and mysticism. Complex but profound.'
  },
  'nasir-tusi': {
    works: ['Ethics for Nasir', 'Zij-i Ilkhani', 'Tusis Commentary on the Almagest'],
    themes: ['Ethics', 'Astronomy', 'Mathematics', 'Justice', 'The rational soul', 'Knowledge'],
    style: 'Scientific, ethical, philosophical. Practical wisdom combined with astronomical knowledge.'
  },
  'ibn-rushd': {
    works: ['The Incoherence of the Incoherence', 'Commentary on Aristotle', 'Fasl al-Maqal'],
    themes: ['Reason and religion', 'Philosophy and sharia', 'The intellect', 'Cause and effect', 'Aristotle'],
    style: 'Rationalist, scholarly, rigorous defense of Aristotelian philosophy against theological attacks.'
  },
  'al-kindi': {
    works: ['On First Philosophy', 'On the Intellect', 'Medical Treatises'],
    themes: ['First philosophy', 'The one and the many', 'Prophecy', 'The soul', 'Knowledge'],
    style: 'Clear, introductory, philosophical. The first to introduce Greek philosophy to the Islamic world.'
  },
  'ibn-arabi': {
    works: ['Fusus al-Hikam', 'Al-Futuhat al-Makkiyya', 'The Meccan Revelations'],
    themes: ['Unity of being', 'The divine names', 'The perfect human', 'Prophets as manifestations', 'Love', 'The heart'],
    style: 'Profound mystical, metaphysical, esoteric. Dense but transformative. The greatest theoretician of Sufi mysticism.'
  },
  'bayazid-bastami': {
    works: ['Sayings', 'The Apothegm of Bayazid'],
    themes: ['Annihilation in God', 'The divine attributes', 'Ecstasy', 'The state of servanthood', 'The essence'],
    style: 'Ecstatic, short, powerful utterances. Known for his declaration of divine glory.'
  },
  hallaj: {
    works: ['The Tawasin', 'Poems', 'Apology'],
    themes: ['Divine unity', 'Annihilation', 'I am the Truth', 'Love of God', 'Sacrifice'],
    style: 'Bold, mystical, controversial. Famous for his declaration of divine unity through personal identity.'
  },
  'junayd-baghdadi': {
    works: ['Discourses', 'Letters', 'Sayings'],
    themes: ['Sober Sufism', 'The middle path', 'Islamic law and mysticism', 'Spiritual states', 'Training the self'],
    style: 'Measured, moderate, scholarly. Emphasized moderation over ecstasy.'
  },
  'abdul-qadir-gilani': {
    works: ['Al-Ghunya', 'Sermons', 'Letters'],
    themes: ['Divine mercy', 'Islamic jurisprudence', 'Sufi discipline', 'Repentance', 'The path'],
    style: 'Practical, accessible, juristic. Founder of the Qadiriyya order.'
  },
  'najm-kubra': {
    works: ['Favorites', 'Teachings', 'Visionary accounts'],
    themes: ['The imaginal world', 'Spiritual states', 'The Sufi path', 'Vision', 'Love'],
    style: 'Visionary, experiential. Founded the Kubrawiyya order.'
  },
  'seyyed-hossein-nasr': {
    works: ['Knowledge and the Sacred', 'Islamic Science', 'The Heart of Islam', 'Traditionalism'],
    themes: ['Traditional philosophy', 'Sacred knowledge', 'Islamic civilization', 'Perennial philosophy', 'Nature', 'Modernity'],
    style: 'Scholarly, articulate, defending traditional wisdom. A leading voice for Islamic intellectual tradition.'
  },
  'allama-tabatabai': {
    works: ['Tafsir al-Mizan', 'Shia Islam', 'Principles of Philosophy'],
    themes: ['Quranic exegesis', 'Shia theology', 'Islamic philosophy', 'The soul', 'Esoteric meaning'],
    style: 'Deeply scholarly, Quranic, theological. Major Shia philosopher and exegete.'
  },
  'morteza-motahhari': {
    works: ['The Islamic Government', 'Man and Faith', 'Islamic Ethics'],
    themes: ['Islamic government', 'Ethics', 'Mans relationship with God', 'Social justice', 'Intellectual history'],
    style: 'Intellectual, reformist, educational. Key figure in Islamic revival.'
  },
  'abdolkarim-soroush': {
    works: ['The Contraction and Expansion of Religious Knowledge', 'Reason and Revelation', 'Pluralism'],
    themes: ['Evolution of religious knowledge', 'Reform', 'Pluralism', 'Reason and faith', 'Democracy'],
    style: 'Reformist, philosophical, contemporary. Leading voice for religious intellectualism.'
  },
  'dariush-shayegan': {
    works: ['The Islamic Fundamentalism', 'The Crises of Identity', 'Beyond the Horizon'],
    themes: ['Comparative philosophy', 'Cultural identity', 'Dialogue', 'Modernity', 'Fundamentalism'],
    style: 'Comparative, cultural, philosophical. Known for cross-cultural dialogue.'
  },
  zoroaster: {
    works: ['Gathas', 'Yasna', 'Avesta'],
    themes: ['Good thoughts good words good deeds', 'Light and darkness', 'Free will', 'Truth', 'The holy fire'],
    style: 'Ancient, sacred, rhythmic. Hymns of praise to Ahura Mazda.'
  },
  mazdak: {
    works: ['Teachings', 'Principles'],
    themes: ['Equality', 'Community of goods', 'Justice', 'Oppression', 'The good life'],
    style: 'Social, reformist, ancient. Proto-socialist philosophy.'
  },
  mani: {
    works: ['The Shapurgan', 'Kephalaia', 'The Gospel of Light'],
    themes: ['Light and darkness', 'The Two Principles', 'The Apostle of Light', 'Salvation', 'The cosmos'],
    style: 'Dualistic, symbolic, missionary. Founder of Manichaeism.'
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
  ferdowsi: [
    'به نام خداوند جان و خرد',
    'کزین برتر اندیشه برنگذرد',
    'نیکی و بد را کس نمي‌توان کرد',
  ],
  'ibn-sina': [
    'جان، از عقل نورانی است',
    'بدن، خانه جان است',
    'دانش، درخت عمل است',
    'حکمت، زینت بخش انسان است',
  ],
  'al-ghazali': [
    'دانش بدون عمل، درخت بدون میوه است',
    'قلب، آینه جان است',
    'ترس از خدا، آغاز حکمت است',
  ],
  'ibn-arabi': [
    'همه چیز در خداوند است و خداوند در همه چیز',
    'عشق، پل اتصال به حق است',
    'انسان کامل، آینه الهی است',
  ],
  suhrawardi: [
    'نور، حقیقت اشیاء است',
    'هر چیزی نور خود را دارد',
    'در تابش نور الهی، حقیقت آشکار می‌شود',
  ],
  hallaj: [
    'من حقم',
    'عشق، مرا به وحدت رساند',
    'در عشق، نفس محو می‌شود',
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
    // Check existing verses count - allow up to 200 verses per philosopher without force
    const existingCount = await VerseModel.countDocuments({ philosopher: philosopherId });
    if (existingCount >= 200 && !force) {
      return NextResponse.json({ 
        message: `Already have ${existingCount} verses for ${philosopherId}`,
        existingCount,
      });
    }

    const versesToGenerate = Math.min(count, 200);
    const generatedVerses = [];
    const baseVerses = samplePersianVerses[philosopherId] || [];
    let duplicatesSkipped = 0;

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

        // Check for duplicates using embeddings
        try {
          const embedText = `${verseData.persianText} ${verseData.englishTranslation}`;
          const { embedding } = await generateEmbedding(embedText);
          const similar = await queryVectors(embedding, 5, { philosopher: philosopherId });
          
          if (similar.length > 0 && similar[0].score > SIMILARITY_THRESHOLD) {
            console.log(`Skipping duplicate (similarity: ${similar[0].score}): ${verseData.persianText.substring(0, 30)}...`);
            duplicatesSkipped++;
            continue;
          }
        } catch (embedError) {
          console.log('Duplicate check skipped due to error');
        }
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

    // Upsert embeddings to Pinecone for future duplicate detection
    try {
      const { embedding } = await generateEmbedding('');
      const vectors = await Promise.all(
        created.map(async (verse: any) => {
          const embedText = `${verse.persianText} ${verse.englishTranslation}`;
          const { embedding: emb } = await generateEmbedding(embedText);
          return {
            id: verse._id.toString(),
            values: emb,
            metadata: {
              persianText: verse.persianText,
              englishTranslation: verse.englishTranslation,
              theme: verse.themes?.[0] || '',
              sourceWork: verse.sourceWork,
              philosopher: verse.philosopher,
            },
          };
        })
      );
      
      if (vectors.length > 0) {
        await upsertVectors(vectors);
        console.log(`Upserted ${vectors.length} embeddings to Pinecone`);
      }
    } catch (embedError) {
      console.error('Failed to upsert embeddings:', embedError);
    }

    return NextResponse.json({
      message: `Generated ${created.length} verses for ${philosopherId}`,
      versesCreated: created.length,
      duplicatesSkipped,
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
