import 'dotenv/config';
import mongoose from 'mongoose';
import { VerseModel } from '@/lib/models';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rumi';

const rumiMore = Array.from({ length: 40 }, (_, i) => ({
  persianText: `عشق ${i + 1}`,
  transliteration: `eshq ${i + 1}`,
  englishTranslation: `Love verse ${i + 1} - A mystical reflection on divine love`,
  summary: `A verse about the nature of love and spirituality ${i + 1}`,
  sourceWork: i % 2 === 0 ? 'Masnavi' : 'Divan-e Shams',
  philosopher: 'rumi',
  themes: ['Love', 'Divine', 'Spiritual'],
  wisdomScore: Math.floor(Math.random() * 3) + 8,
  complexity: Math.floor(Math.random() * 4) + 3,
  emotionalTone: 'wise',
  tags: ['love', 'spiritual', 'mystical'],
}));

const hafezMore = Array.from({ length: 35 }, (_, i) => ({
  persianText: `حکمت ${i + 1}`,
  transliteration: `hekmat ${i + 1}`,
  englishTranslation: `Wisdom verse ${i + 1} - A ghazal of mystical insight`,
  summary: `Philosophical reflection ${i + 1}`,
  sourceWork: 'Divan-e Hafez',
  philosopher: 'hafez',
  themes: ['Wisdom', 'Mystical', 'Truth'],
  wisdomScore: Math.floor(Math.random() * 3) + 8,
  complexity: Math.floor(Math.random() * 4) + 3,
  emotionalTone: 'wise',
  tags: ['wisdom', 'mystical', 'truth'],
}));

const saadiMore = Array.from({ length: 35 }, (_, i) => ({
  persianText: `پند ${i + 1}`,
  transliteration: `pand ${i + 1}`,
  englishTranslation: `Moral teaching ${i + 1} - Practical wisdom for life`,
  summary: `Ethical guidance ${i + 1}`,
  sourceWork: i % 2 === 0 ? 'Gulistan' : 'Bustan',
  philosopher: 'saadi',
  themes: ['Moral', 'Wisdom', 'Ethics'],
  wisdomScore: Math.floor(Math.random() * 3) + 7,
  complexity: Math.floor(Math.random() * 3) + 2,
  emotionalTone: 'wise',
  tags: ['moral', 'wisdom', 'ethics'],
}));

const attarMore = Array.from({ length: 30 }, (_, i) => ({
  persianText: `سیر ${i + 1}`,
  transliteration: `seyr ${i + 1}`,
  englishTranslation: `Journey verse ${i + 1} - The soul's path to God`,
  summary: `Spiritual journey ${i + 1}`,
  sourceWork: 'Conference of the Birds',
  philosopher: 'attar',
  themes: ['Journey', 'Soul', 'Spiritual'],
  wisdomScore: Math.floor(Math.random() * 3) + 8,
  complexity: Math.floor(Math.random() * 4) + 4,
  emotionalTone: 'mystical',
  tags: ['journey', 'soul', 'spiritual'],
}));

const sanaiMore = Array.from({ length: 25 }, (_, i) => ({
  persianText: `Garden ${i + 1}`,
  transliteration: `bagh ${i + 1}`,
  englishTranslation: `Garden wisdom ${i + 1} - From the walled garden of truth`,
  summary: `Spiritual teaching ${i + 1}`,
  sourceWork: 'Walled Garden of Truth',
  philosopher: 'sanai',
  themes: ['Truth', 'Garden', 'Wisdom'],
  wisdomScore: Math.floor(Math.random() * 3) + 8,
  complexity: Math.floor(Math.random() * 3) + 3,
  emotionalTone: 'wise',
  tags: ['truth', 'garden', 'wisdom'],
}));

const jamiMore = Array.from({ length: 25 }, (_, i) => ({
  persianText: `عشق جاودان ${i + 1}`,
  transliteration: `eshq-e javdan ${i + 1}`,
  englishTranslation: ` eternal love ${i + 1} - A mystical romance`,
  summary: `Love and longing ${i + 1}`,
  sourceWork: 'Yusuf and Zulaikha',
  philosopher: 'jami',
  themes: ['Love', 'Romance', 'Divine'],
  wisdomScore: Math.floor(Math.random() * 3) + 8,
  complexity: Math.floor(Math.random() * 4) + 4,
  emotionalTone: 'passionate',
  tags: ['love', 'romance', 'divine'],
}));

async function addMoreVerses() {
  console.log('📜 Adding more verses in bulk...\n');
  
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const allNew = [...rumiMore, ...hafezMore, ...saadiMore, ...attarMore, ...sanaiMore, ...jamiMore];
    console.log(`   Adding ${allNew.length} new verses...`);

    await VerseModel.insertMany(allNew);
    console.log(`   Added ${allNew.length} verses`);

    const counts = await VerseModel.aggregate([
      { $group: { _id: '$philosopher', count: { $sum: 1 } } }
    ]);
    
    const total = await VerseModel.countDocuments({});
    console.log(`\n📊 Total verses: ${total}`);
    console.log('By philosopher:');
    counts.forEach(c => console.log(`   ${c._id}: ${c.count}`));

    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

addMoreVerses();
