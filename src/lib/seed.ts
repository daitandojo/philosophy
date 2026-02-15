import 'dotenv/config';
import mongoose from 'mongoose';
import { VerseModel, UserModel, BlogPostModel, AnnotationModel } from '@/lib/models';
import { generateEmbedding, generateImage, generateSpeech } from '@/lib/services/openai';
import { upsertVectors } from '@/lib/services/pinecone';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rumi';

const rumiVerses = [
  // From Masnavi
  {
    persianText: 'ای陌生人، تو خود را بشناس، خود را، آنجا که عشق آغاز می‌شود، تو را صدا می‌زنند.',
    transliteration: 'Ey gharib, to khod ra beshnas, khod ra, anja ke \'eshq aghaz mishavad, to ra seda mizanand.',
    englishTranslation: 'O stranger, know yourself. Where love begins, there you will be called.',
    summary: 'Rumi speaks of self-knowledge as the pathway to divine love. The journey inward leads to the source of all being.',
    sourceWork: 'Masnavi',
    themes: ['Self-knowledge', 'Love', 'Divine'],
    wisdomScore: 9,
    complexity: 7,
    emotionalTone: 'contemplative',
    tags: ['wisdom', 'love', 'spiritual', 'journey'],
  },
  {
    persianText: 'آنچه را می‌جویی، تو خودی. از خود بیرون نرو؛ درون خود فرورو و همه چیز را بیاب.',
    transliteration: 'Anjo ra ke juyi, to khodi. Az khod biroon naro; darun khod fururo va hame chiz ra beyaab.',
    englishTranslation: 'What you seek is you yourself. Do not go outside; descend into yourself and find everything.',
    summary: 'Rumi emphasizes that true wisdom lies within us. The search for meaning should be an inward journey.',
    sourceWork: 'Masnavi',
    themes: ['Self-discovery', 'Inner journey', 'Wisdom'],
    wisdomScore: 10,
    complexity: 6,
    emotionalTone: 'wise',
    tags: ['wisdom', 'spiritual', 'journey', 'inner'],
  },
  {
    persianText: 'بیا تا برایت ببینیم، آنچه ن دیده‌ای و نه شنیده‌ای، نه به خاطر سپرده‌ای.',
    transliteration: 'Bia ta berayat binim, anjo na didei va na shenidi, na be khater separdei.',
    englishTranslation: 'Come, let us see for you what you have not seen, heard, or even imagined.',
    summary: 'Rumi invites the seeker to a transformative experience beyond ordinary perception.',
    sourceWork: 'Masnavi',
    themes: ['Transformation', 'Divine', 'Spiritual awakening'],
    wisdomScore: 10,
    complexity: 5,
    emotionalTone: 'joyful',
    tags: ['transformation', 'spiritual', 'awakening', 'divine'],
  },
  {
    persianText: 'صوفی برای گندم به بازار رفت، خرید و به خانه آورد. همه دیدند و تعجب کردند.',
    transliteration: 'Soufi bara-ye gandom be bazar raft, kharid va be khaneh avord. Hame didand va ta\'ajjab kardand.',
    englishTranslation: 'The Sufi went to the market to buy wheat, bought it and brought it home. Everyone saw and wondered.',
    summary: 'A humorous tale showing how seekers are often distracted by the very things they seek to transcend.',
    sourceWork: 'Masnavi',
    themes: ['Wisdom', 'Irony', 'Spiritual journey'],
    wisdomScore: 7,
    complexity: 4,
    emotionalTone: 'humorous',
    tags: ['wisdom', 'irony', 'humor', 'parable'],
  },
  {
    persianText: 'موسیقیِ سُنا را بشنو؛ خاموش می‌ماند اگر کسی نبود که گوش دهد.',
    transliteration: 'Mosighi-ye suna ra beshna; khamush mimanad agar kasi nabud ke goosh darad.',
    englishTranslation: 'Listen to the music of the flute. It would remain silent if there were no one to hear.',
    summary: 'Rumi uses the famous flute metaphor to describe the soul\'s longing and the role of the beloved.',
    sourceWork: 'Masnavi',
    themes: ['Music', 'Soul', 'Longing', 'Love'],
    wisdomScore: 10,
    complexity: 6,
    emotionalTone: 'melancholic',
    tags: ['music', 'soul', 'longing', 'metaphor'],
  },
  {
    persianText: 'در میانِ ما، حجابی نیست؛ فقط دل‌های ما پرده‌ها را ساخته‌اند.',
    transliteration: 'Dar miyan-e ma, hijab-i nist; faghat del-ha-ye ma pardeha ra sakhteh and.',
    englishTranslation: 'There is no veil between us; only our hearts have made the veils.',
    summary: 'Rumi reveals that the barriers between us and the divine are of our own making.',
    sourceWork: 'Masnavi',
    themes: ['Illusion', 'Reality', 'Divine'],
    wisdomScore: 10,
    complexity: 6,
    emotionalTone: 'revealing',
    tags: ['illusion', 'reality', 'divine', 'veils'],
  },
  {
    persianText: 'هر که را جان بود، مرگ را ببیند؛ هر که را عشق بود، رستگاری را ببیند.',
    transliteration: 'Har ke ra jan bud, marg ra bebinad; har ke ra \'eshq bud, rästgari ra bebinad.',
    englishTranslation: 'Whoever has life, sees death; whoever has love, sees salvation.',
    summary: 'Rumi connects life, death, love and salvation in a profound philosophical statement.',
    sourceWork: 'Masnavi',
    themes: ['Life', 'Death', 'Love', 'Salvation'],
    wisdomScore: 10,
    complexity: 5,
    emotionalTone: 'profound',
    tags: ['life', 'death', 'love', 'salvation'],
  },
  // From Divan-e Shams
  {
    persianText: 'در طلبِ وصالِ یار، هر دم بکش جان را، که این نفس، تمامِ هستیِ من است.',
    transliteration: 'Dar talab-e visal-e yar, har dam bokash jan ra, ke in nafas, tamam-e hasti-e man ast.',
    englishTranslation: 'In longing for the beloved, sacrifice your soul each moment, for this breath is the entirety of my existence.',
    summary: 'Rumi expresses the intensity of divine longing, where each breath is an offering to the beloved.',
    sourceWork: 'Divan-e Shams',
    themes: ['Love', 'Longing', 'Sufism'],
    wisdomScore: 9,
    complexity: 8,
    emotionalTone: 'passionate',
    tags: ['love', 'passion', 'divine', 'longing'],
  },
  {
    persianText: 'دل را بیازار تا ببینی، آنچه در دل می‌گنجد. در دل، دریایی از نور است.',
    transliteration: 'Del ra biyazar ta bebini, anjo dar del miganjad. Dar del, daryayi az noor ast.',
    englishTranslation: 'Torture your heart so you may see what it contains. In the heart is an ocean of light.',
    summary: 'Rumi speaks of the transformative power of spiritual struggle and the hidden light within.',
    sourceWork: 'Divan-e Shams',
    themes: ['Spiritual struggle', 'Inner light', 'Transformation'],
    wisdomScore: 9,
    complexity: 7,
    emotionalTone: 'intense',
    tags: ['spiritual', 'transformation', 'light', 'struggle'],
  },
  {
    persianText: 'عشق برده است مرا، بی‌اختیارم، از خود بی‌خودم، در عشق افتاده‌ام.',
    transliteration: 'eshq bordeh ast mara, bi-ikhtiyaram, az khod bi-khodam, dar eshq oftadam.',
    englishTranslation: 'Love has taken me, I am helpless, beside myself with love, I have fallen in love.',
    summary: 'Rumi\'s famous declaration of surrender to divine love.',
    sourceWork: 'Divan-e Shams',
    themes: ['Love', 'Surrender', 'Passion'],
    wisdomScore: 9,
    complexity: 4,
    emotionalTone: 'passionate',
    tags: ['love', 'surrender', 'passion', 'devotion'],
  },
  {
    persianText: 'ای دوست، بیا که وقت رفتن است؛ این جهان، خوابی بیش نیست.',
    transliteration: 'Ey dust, bia ke vaght raftan ast; in jahan, khabi bish nist.',
    englishTranslation: 'O friend, come, for it is time to go; this world is but a dream.',
    summary: 'Rumi reminds us of life\'s transience and the importance of awakening.',
    sourceWork: 'Divan-e Shams',
    themes: ['Impermanence', 'Awakening', 'Death'],
    wisdomScore: 9,
    complexity: 5,
    emotionalTone: 'urgent',
    tags: ['impermanence', 'awakening', 'world', 'dream'],
  },
  {
    persianText: 'ای پسر، من نورم و تو نوری؛ ما دو روی یک سکه هستیم.',
    transliteration: 'Ey pesar, man nooram va tu noori; ma du roy ye sekke hastim.',
    englishTranslation: 'O son, I am light and you are light; we are two faces of the same coin.',
    summary: 'Rumi reveals the fundamental unity between the seeker and the divine.',
    sourceWork: 'Mawlana Letters',
    themes: ['Unity', 'Divine', 'Oneness'],
    wisdomScore: 10,
    complexity: 3,
    emotionalTone: 'loving',
    tags: ['unity', 'divine', 'oneness', 'love'],
  },
  // Additional verses
  {
    persianText: 'خواجه شد و خوابید؛ درویش بمُرد و زنده شد. این است کار عشق.',
    transliteration: 'Khwajeh shod va khabid; darvish bemord va zendeh shod. In ast kar-e \'eshq.',
    englishTranslation: 'The master fell asleep and the dervish died and came to life. This is the work of love.',
    summary: 'Love transforms us completely, making us die to our old selves and be reborn.',
    sourceWork: 'Masnavi',
    themes: ['Transformation', 'Love', 'Death'],
    wisdomScore: 9,
    complexity: 5,
    emotionalTone: 'mysterious',
    tags: ['transformation', 'love', 'rebirth'],
  },
  {
    persianText: 'هیچ دروازه‌ای بسته نیست برای کسی که واقعاً می‌خواهد وارد شود.',
    transliteration: 'Hich darvazeye basti nist bara-ye kasi ke vaghe\'an mikhvad vared shavad.',
    englishTranslation: 'No door is closed for those who truly wish to enter.',
    summary: 'The path to the divine is always open to the sincere seeker.',
    sourceWork: 'Fihi Ma Fihi',
    themes: ['Divine', 'Spiritual journey', 'Openness'],
    wisdomScore: 8,
    complexity: 4,
    emotionalTone: 'hopeful',
    tags: ['divine', 'journey', 'openness'],
  },
  {
    persianText: 'عشق، زبانی است که همه می‌فهمند، اما فقط عشق می‌تواند بگوید.',
    transliteration: 'eshq, zabani ast ke hameh mimanand, vali faqat eshq mitavanad begohad.',
    englishTranslation: 'Love is a language that everyone understands, but only love can speak.',
    summary: 'Love is the universal language that transcends words and connects souls.',
    sourceWork: 'Divan-e Shams',
    themes: ['Love', 'Communication', 'Unity'],
    wisdomScore: 9,
    complexity: 4,
    emotionalTone: 'wise',
    tags: ['love', 'language', 'unity'],
  },
  {
    persianText: 'زخم را نشان بده تا ببینم؛ جایی که نور وارد می‌شود، همان جاست.',
    transliteration: 'Zakhme ra neshan bedeh ta bebini; jayi ke noor vared mishavad, hamun jast.',
    englishTranslation: 'Show me your wound, that I may see; where the light enters, that is where.',
    summary: 'Our wounds and struggles become the vessels for divine light.',
    sourceWork: 'Masnavi',
    themes: ['Transformation', 'Light', 'Struggle'],
    wisdomScore: 10,
    complexity: 5,
    emotionalTone: 'compassionate',
    tags: ['wound', 'light', 'transformation'],
  },
  {
    persianText: 'صدای ناقوس را بشنو، نه با گوش، بلکه با قلب.',
    transliteration: 'Sedaye naghous ra beshna, na ba goosh, Balkeh ba del.',
    englishTranslation: 'Listen to the bells, not with your ears, but with your heart.',
    summary: 'True spiritual hearing is through the heart, not the physical ears.',
    sourceWork: 'Masnavi',
    themes: ['Spiritual hearing', 'Heart', 'Awareness'],
    wisdomScore: 8,
    complexity: 4,
    emotionalTone: 'contemplative',
    tags: ['heart', 'awareness', 'spiritual'],
  },
  {
    persianText: 'وقتی عشق می‌آید، خرد خواب می‌بیند.',
    transliteration: 'Vaqt ke \'eshq miyad, kherad khab mibinad.',
    englishTranslation: 'When love comes, reason falls asleep.',
    summary: 'Divine love transcends rational thought and awakens the soul.',
    sourceWork: 'Divan-e Shams',
    themes: ['Love', 'Reason', 'Awakening'],
    wisdomScore: 9,
    complexity: 3,
    emotionalTone: 'mystical',
    tags: ['love', 'reason', 'awakening'],
  },
  {
    persianText: 'هیچ چیز از دست نداده‌ای، مگر آنچه را که هرگز نداشتی.',
    transliteration: 'Hich chiz az dast nadadei, magar anjo ke hargiz nadashti.',
    englishTranslation: 'You have lost nothing except what you never had.',
    summary: 'Material attachments were never truly ours; only the divine is permanent.',
    sourceWork: 'Masnavi',
    themes: ['Non-attachment', 'Loss', 'Divine'],
    wisdomScore: 8,
    complexity: 5,
    emotionalTone: 'liberating',
    tags: ['non-attachment', 'loss', 'wisdom'],
  },
  {
    persianText: 'عشق، خانه را ویران می‌کند و با خاک، قصر می‌سازد.',
    transliteration: 'eshq, khaneh ra viran mikunad va ba khak, ghasr misazad.',
    englishTranslation: 'Love destroys the house and with its dust builds a palace.',
    summary: 'Love breaks down our ego to rebuild us as something greater.',
    sourceWork: 'Divan-e Shams',
    themes: ['Love', 'Destruction', 'Rebuilding'],
    wisdomScore: 9,
    complexity: 5,
    emotionalTone: 'transformative',
    tags: ['love', 'destruction', 'rebirth'],
  },
];

const rumiInfo = {
  name: 'Jalāl ad-Dīn Muhammad Rūmī',
  born: '1207',
  died: '1273',
  birthplace: 'Balkh (present-day Afghanistan)',
  era: 'Persian poet, Sufi mystic, Islamic scholar',
  majorWorks: ['Masnavi-i Ma\'navi', 'Divan-e Shams-e Tabrizi', 'Fihi Ma Fihi', 'Mawlana Letters'],
  philosophy: 'Sufism, Divine love, Spiritual unity, Whirling dervishes',
  influence: 'One of the most influential poets in world history, inspiration for countless seekers',
};

const themes = [
  { name: 'Love', description: 'Divine and earthly love, the longing for the Beloved', color: '#e91e63' },
  { name: 'Wisdom', description: 'Philosophical insights and spiritual truths', color: '#ffc107' },
  { name: 'Divine', description: 'God, the sacred, and spiritual reality', color: '#9c27b0' },
  { name: 'Self-knowledge', description: 'Understanding the true self', color: '#3f51b5' },
  { name: 'Journey', description: 'The spiritual path and transformation', color: '#009688' },
  { name: 'Friendship', description: 'Bonds between seekers and the divine', color: '#4caf50' },
  { name: 'Peace', description: 'Inner tranquility and surrender', color: '#00bcd4' },
  { name: 'Transformation', description: 'Personal growth and awakening', color: '#ff5722' },
  { name: 'Longing', description: 'The soul\'s yearning for the divine', color: '#f44336' },
  { name: 'Soul', description: 'The essence of being', color: '#673ab7' },
];

const blogPosts = [
  {
    title: 'The Whirling Dervishes: A Dance of Devotion',
    content: `The whirling dervishes of the Mevlevi order represent the soul's journey towards divine love. Through rotation, they embody the planets orbiting the sun, and the spiritual journey of the ego dying to itself to be reborn in the divine.

Rumi founded the Mevlevi order after his encounter with Shams-e Tabrizi. The whirling practice, known as "sema," is a form of meditation that symbolizes the cutting away of all worldly attachments and the embrace of divine presence.

During the ceremony, the dervishes wear distinctive brown robes and tall brown hats called "sikke," representing the tombstone of the ego. As they spin, they recite Rumi's poetry, particularly from the Masnavi.

The sema begins with a verse from the Quran: "From God we come, to God we return." This embodies the Sufi belief in fana—the annihilation of the self in the divine.

For those seeking to understand Rumi's spirituality, watching or practicing the whirling meditation offers a profound glimpse into the heart of Sufi mysticism.`,
    published: true,
  },
  {
    title: 'Understanding Rumi: A Guide for Beginners',
    content: `Rumi's poetry can seem overwhelming at first glance, with its complex metaphors and mystical references. But his core message is surprisingly simple: love is the answer to everything.

Born in 1207 in what is now Afghanistan, Rumi was a respected Islamic scholar until meeting the wandering dervish Shams-e Tabrizi in 1244. This encounter transformed him from a conventional jurist into one of history's greatest mystical poets.

His major works include:

1. The Masnavi - A 25,000-verse spiritual epic considered the "Koran in Persian"
2. The Divan-e Shams - Over 40,000 verses dedicated to his lost beloved Shams
3. Fihi Ma Fihi - Discourses and spiritual teachings
4. The Letters - Correspondence with disciples

Start with short quotes and ghazals. Let the beauty of the words wash over you before analyzing their meaning. Rumi himself said: "Don't grieve. Anything you lose comes round in another form."

The journey into Rumi's poetry is itself a spiritual practice. Take your time. Let him meet you where you are.`,
    published: true,
  },
  {
    title: 'The Fourteen Steps of a Sufi: A Journey Inward',
    content: `In the Sufi tradition, the path toward divine union involves stages of spiritual development. While different orders have varying numbers of stations, Rumi outlines a profound journey of transformation.

The journey begins with **Longing** - the soul's awakening to its true home. This is followed by **Love**, which burns away all that is not essential.

**Renunciation** marks the letting go of worldly attachments, while **Trust** in the divine guide opens the heart. **Patience** and **Gratitude** become constant companions on the path.

The seeker then enters **Fear** (of separation from the Beloved), **Shame** (before divine light), and **Contentment** (with God's will). 

**Unity** emerges as the self dissolves into the divine. Finally, **Annihilation** (fana) and **Permanence** (baqa) represent the paradox of Sufi realization - the ego dies to live eternally in God.

Rumi writes: "Die before you die." This is not about physical death but the killing of the ego, the false self that believes it is separate from the divine.

The path is not linear but cyclical. We return to these stages again and again, each time with deeper understanding. This is the beauty of Sufi practice - it is a lifetime journey of becoming.`,
    published: true,
  },
];

const learningPaths = [
  {
    title: 'Introduction to Rumi',
    description: 'Begin your journey into the mystical world of Rumi. Learn about his life, his poetry, and the spiritual traditions that shaped his work.',
    difficulty: 'beginner',
    estimatedTime: 30,
    lessons: [
      { title: 'Who Was Rumi?', content: 'Jalal ad-Din Muhammad Rumi was born in 1207 in Balkh, Afghanistan. He was a Persian poet, Islamic scholar, and Sufi mystic who founded the Mevlevi order of whirling dervishes.' },
      { title: 'The Masnavi', content: 'The Masnavi is Rumi\'s magnum opus, a 25,000-verse spiritual epic considered the "Koran in Persian." It weaves together stories, parables, and mystical teachings.' },
      { title: 'The Spiritual Path', content: 'Sufism is the mystical dimension of Islam. Rumi\'s path emphasizes divine love, personal transformation, and the annihilation of the ego in union with the Beloved.' },
    ],
  },
  {
    title: 'The Poetry of Divine Love',
    description: 'Explore Rumi\'s beautiful expressions of divine love and the longing of the soul for the Beloved.',
    difficulty: 'intermediate',
    estimatedTime: 45,
    lessons: [
      { title: 'The Nature of Love', content: 'For Rumi, love is not an emotion but the fundamental force of the universe. All love, whether human or divine, points toward the ultimate Love of God.' },
      { title: 'Longing and Ecstasy', content: 'The soul\'s longing for the Divine is depicted as both painful and beautiful. This longing, or "sevdā," drives the spiritual seeker toward union.' },
      { title: 'The Beloved and the Lover', content: 'In Rumi\'s poetry, the relationship between the Beloved (God) and the lover (the soul) is portrayed with intense emotion and poetic beauty.' },
    ],
  },
  {
    title: 'Wisdom for Daily Life',
    description: 'Apply Rumi\'s timeless wisdom to everyday challenges. Find guidance for relationships, work, and spiritual growth.',
    difficulty: 'beginner',
    estimatedTime: 40,
    lessons: [
      { title: 'Transforming Difficulty', content: 'Rumi teaches that difficulties are opportunities for growth. "The wound is where the light enters" - our challenges become our teachers.' },
      { title: 'The Power of Gratitude', content: 'Gratitude opens the heart to divine blessings. Rumi encourages daily reflection on the gifts of life, no matter how small.' },
      { title: 'Living with Purpose', content: 'Every moment is an opportunity to remember God and serve others. Rumi\'s teachings help us find meaning in ordinary activities.' },
    ],
  },
  {
    title: 'Advanced Studies in Sufism',
    description: 'Deep dive into the philosophical and mystical dimensions of Rumi\'s work for advanced students.',
    difficulty: 'advanced',
    estimatedTime: 60,
    lessons: [
      { title: 'The Concept of Wahdat al-Wujud', content: 'Unity of Being - the philosophical foundation of Rumi\'s mysticism. All existence is a manifestation of the Divine.' },
      { title: 'The Spiritual States', content: 'Sufi practitioners pass through various states (hal) including repentance, silence, solitude, and poverty of spirit.' },
      { title: 'The Maqam of the Sufi', content: 'The stations (maqamat) of spiritual development, from initial faith to ultimate union with God.' },
    ],
  },
];

async function seed() {
  console.log('🌱 Starting Rumi database seeding...\n');

  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      VerseModel.deleteMany({}),
      BlogPostModel.deleteMany({}),
      AnnotationModel.deleteMany({}),
      UserModel.deleteMany({}),
    ]);
    console.log('🗑️ Cleared existing data');

    // Seed verses
    console.log('📜 Seeding verses...');
    const createdVerses = await VerseModel.insertMany(rumiVerses);
    console.log(`   Created ${createdVerses.length} verses`);

    // Generate embeddings and upsert to Pinecone
    console.log('🔮 Generating embeddings for vector search...');
    try {
      const apiKey = process.env.OPENAI_API_KEY;
      const pineconeKey = process.env.PINECONE_API_KEY;
      console.log(`   OpenAI key present: ${!!apiKey}, starts with: ${apiKey?.substring(0, 7)}...`);
      console.log(`   Pinecone key present: ${!!pineconeKey}`);
      
      if (!pineconeKey) {
        console.log(`   ⚠️ Pinecone not configured - skipping vector upsert`);
      } else {
        const vectorBatch = await Promise.all(
          createdVerses.map(async (verse) => {
            const text = `${verse.persianText} ${verse.englishTranslation} ${verse.themes.join(' ')}`;
            const { embedding } = await generateEmbedding(text);
            return {
              id: verse._id.toString(),
              values: embedding,
              metadata: {
                persianText: verse.persianText,
                englishTranslation: verse.englishTranslation,
                sourceWork: verse.sourceWork,
                themes: verse.themes.join(','),
              },
            };
          })
        );
        
        await upsertVectors(vectorBatch);
        console.log(`   Upserted ${vectorBatch.length} vectors to Pinecone`);
      }
    } catch (error: any) {
      console.log(`   ⚠️ Vector embedding skipped: ${error.message || error.toString()}`);
    }

    // Generate sample images for verses (only if not already set)
    console.log('🎨 Generating AI images for verses (sample)...');
    try {
      // First check which verses already have images
      const versesWithImages = await VerseModel.find({ imageUrl: { $exists: true, $ne: '' } }).select('_id');
      const existingImageIds = new Set(versesWithImages.map(v => v._id.toString()));
      
      // Consistent 13th century Persian miniature prompts for Rumi verses
      const samplePrompts = [
        'A wandering Sufi seeker in traditional robes walking through a moonlit desert, stars overhead, distant minaret silhouette, golden light emanating from the horizon - self-knowledge theme',
        'Two mystical figures embracing beneath an ancient cypress tree, divine light streaming down, gold leaf decorations, celestial beings in the background - divine love theme',
        'A whirling dervish in traditional brown robes spinning in a circular motion, extended arms, skirt flowing, surrounded by concentric rings of golden light - spiritual ecstacy',
        'A human heart transformed into a radiant sun, emitting beams of golden light that illuminate the darkness, mystical symbols floating around, infinite depth - inner light theme',
      ];
      
      let imagesGenerated = 0;
      for (let i = 0; i < Math.min(4, createdVerses.length); i++) {
        // Skip if image already exists in database
        if (existingImageIds.has(createdVerses[i]._id.toString())) {
          console.log(`   Skipped verse ${i + 1} (already has image)`);
          continue;
        }
        const imageUrl = await generateImage(samplePrompts[i]);
        await VerseModel.findByIdAndUpdate(createdVerses[i]._id, { imageUrl });
        console.log(`   Generated image for verse ${i + 1}`);
        imagesGenerated++;
      }
      if (imagesGenerated === 0) {
        console.log(`   All verses already have images`);
      }
    } catch (error: any) {
      console.log(`   ⚠️ Image generation skipped: ${error.message || error.toString()}`);
    }

    // Generate sample TTS audio (optional)
    console.log('🔊 Generating sample TTS audio...');
    try {
      for (let i = 0; i < Math.min(3, createdVerses.length); i++) {
        const audioBuffer = await generateSpeech(createdVerses[i].englishTranslation, 'alloy');
        // Store a placeholder - in production you'd upload to storage and save the URL
        await VerseModel.findByIdAndUpdate(createdVerses[i]._id, { 
          audioUrl: `data:audio/mp3;base64,placeholder` 
        });
      }
      console.log(`   Generated sample TTS for ${Math.min(3, createdVerses.length)} verses`);
    } catch (error: any) {
      console.log(`   ⚠️ TTS generation skipped: ${error.message || 'Unknown error'}`);
    }

    // Seed admin user first
    console.log('👤 Creating admin user...');
    const adminUser = await UserModel.create({
      name: 'Rumi Admin',
      email: 'admin@rumi.app',
      role: 'admin',
      image: 'https://api.dicebear.com/7.x/initials/svg?seed=Rumi',
    });
    console.log('   Created admin user (admin@rumi.app)');

    // Seed blog posts
    console.log('📝 Seeding blog posts...');
    const blogsWithUser = blogPosts.map(post => ({
      ...post,
      userId: adminUser._id,
    }));
    const createdBlogs = await BlogPostModel.insertMany(blogsWithUser);
    console.log(`   Created ${createdBlogs.length} blog posts`);

    console.log('\n✅ Seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Verses: ${createdVerses.length}`);
    console.log(`   - Blog posts: ${createdBlogs.length}`);
    console.log(`   - Users: 1`);
    console.log(`   - Themes: ${themes.length}`);
    console.log(`   - Learning paths: ${learningPaths.length}`);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run if called directly
seed().catch(console.error);
