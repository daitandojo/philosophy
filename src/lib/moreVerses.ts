import 'dotenv/config';
import mongoose from 'mongoose';
import { VerseModel } from '@/lib/models';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rumi';

const themes = ['Love', 'Wisdom', 'Truth', 'Spirit', 'Soul', 'Heart', 'Light', 'Darkness', 'Life', 'Death', 'Joy', 'Sorrow', 'Hope', 'Faith', 'Patience', 'Gratitude', 'Kindness', 'Courage', 'Peace', 'Freedom'];

const createVerse = (philosopher: string, sourceWork: string, i: number) => ({
  persianText: `شعر ${philosopher} ${i}`,
  transliteration: `sher ${philosopher} ${i}`,
  englishTranslation: `A verse about spiritual wisdom - ${philosopher} ${i}`,
  summary: `Mystical teaching about ${themes[i % themes.length]} by ${philosopher}`,
  sourceWork,
  philosopher,
  themes: [themes[i % themes.length], themes[(i + 1) % themes.length]],
  wisdomScore: Math.floor(Math.random() * 3) + 7,
  complexity: Math.floor(Math.random() * 5) + 2,
  emotionalTone: ['wise', 'mystical', 'contemplative', 'hopeful', 'peaceful'][i % 5],
  tags: [themes[i % themes.length].toLowerCase(), 'spiritual', 'persian'],
});

const philosophers = [
  { id: 'rumi', sources: ['Masnavi', 'Divan-e Shams', 'Fihi Ma Fihi'] },
  { id: 'hafez', sources: ['Divan-e Hafez'] },
  { id: 'saadi', sources: ['Gulistan', 'Bustan'] },
  { id: 'attar', sources: ['Conference of the Birds', 'Ilahi-Nama'] },
  { id: 'sanai', sources: ['Walled Garden of Truth'] },
  { id: 'jami', sources: ['YusUF and Zulaikha', 'Baharistan'] },
];

const allVerses: any[] = [];
philosophers.forEach(p => {
  const count = p.id === 'rumi' ? 60 : p.id === 'hafez' ? 50 : p.id === 'saadi' ? 50 : 30;
  for (let i = 0; i < count; i++) {
    allVerses.push(createVerse(p.id, p.sources[i % p.sources.length], i));
  }
});

async function addMoreVerses() {
  console.log(`📜 Adding ${allVerses.length} more verses...\n`);
  
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await VerseModel.insertMany(allVerses);
    console.log(`   Added ${allVerses.length} verses`);

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
