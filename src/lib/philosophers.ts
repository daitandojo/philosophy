import { Philosopher } from '@/types';

export const philosophers: Philosopher[] = [
  {
    id: 'rumi',
    name: { persian: 'مولانا', english: 'Rumi' },
    life: { birth: 1207, death: 1273, birthPlace: 'Balkh (modern Afghanistan)', deathPlace: 'Konya, Turkey' },
    school: ['Sufi Mysticism', 'Poetry'],
    description: 'The mystical poet of divine love whose poetry has touched souls for centuries. His Masnavi is considered one of the greatest works of mystical poetry.',
    quoteCount: 450,
    era: 'golden-age',
  },
  {
    id: 'hafez',
    name: { persian: 'حافظ', english: 'Hafez' },
    life: { birth: 1315, death: 1390, birthPlace: 'Shiraz, Iran', deathPlace: 'Shiraz, Iran' },
    school: ['Sufi Mysticism', 'Lyric Poetry'],
    description: 'The immortal Persian poet whose Divan contains some of the most beautiful ghazals ever written. Known as "The Interpreter" for his profound mystical insights.',
    quoteCount: 380,
    era: 'golden-age',
  },
  {
    id: 'saadi',
    name: { persian: 'سعدی', english: 'Saadi Shirazi' },
    life: { birth: 1210, death: 1291, birthPlace: 'Shiraz, Iran', deathPlace: 'Shiraz, Iran' },
    school: ['Sufi Wisdom', 'Moral Philosophy'],
    description: 'The wise master of practical virtue. His Gulistan and Bustan are treasured for their ethical guidance and beautiful storytelling.',
    quoteCount: 320,
    era: 'golden-age',
  },
  {
    id: 'attar',
    name: { persian: 'عطار', english: 'Attar of Nishapur' },
    life: { birth: 1145, death: 1221, birthPlace: 'Nishapur, Iran', deathPlace: 'Nishapur, Iran' },
    school: ['Sufi Mysticism', 'Poetry'],
    description: 'The visionary mystic whose "Conference of the Birds" is a masterpiece of allegorical poetry exploring the soul\'s journey to God.',
    quoteCount: 180,
    era: 'classical',
  },
  {
    id: 'sanai',
    name: { persian: 'سنایی', english: 'Sanai' },
    life: { birth: 1080, death: 1131, birthPlace: 'Ghazni, Afghanistan', deathPlace: 'Ghazni, Afghanistan' },
    school: ['Sufi Poetry', 'Mystical Philosophy'],
    description: 'The pioneering Sufi poet who first used romantic imagery to express spiritual themes. His "Walled Garden of Truth" influenced Rumi.',
    quoteCount: 120,
    era: 'classical',
  },
  {
    id: 'ibn-sina',
    name: { persian: 'ابن سینا', english: 'Ibn Sina (Avicenna)' },
    life: { birth: 980, death: 1037, birthPlace: 'Bukhara, Uzbekistan', deathPlace: 'Hamadan, Iran' },
    school: ['Islamic Philosophy', 'Peripatetic', 'Medicine'],
    description: 'The greatest philosopher and physician of the Islamic Golden Age. His "Canon of Medicine" was the medical textbook in Europe for 600 years.',
    quoteCount: 150,
    era: 'classical',
  },
  {
    id: 'ghazali',
    name: { persian: 'غزالی', english: 'Al-Ghazali' },
    life: { birth: 1058, death: 1111, birthPlace: 'Tus, Iran', deathPlace: 'Tus, Iran' },
    school: ['Theology', 'Sufi Mysticism', 'Philosophy'],
    description: 'The reviver of religious thought who reconciled Sufi mysticism with orthodox Islam. His "Incoherence of the Philosophers" shaped Islamic intellectual history.',
    quoteCount: 140,
    era: 'classical',
  },
  {
    id: 'mulla-sadra',
    name: { persian: 'ملاصدرا', english: 'Mulla Sadra' },
    life: { birth: 1571, death: 1640, birthPlace: 'Shiraz, Iran', deathPlace: 'Shiraz, Iran' },
    school: ['Transcendent Theosophy', 'Illuminationist'],
    description: 'The revolutionary philosopher who founded the "Transcendent Theosophy" school, synthesizing philosophy, theology, and Sufi mysticism.',
    quoteCount: 90,
    era: 'modern',
  },
  {
    id: 'ibn-arabi',
    name: { persian: 'ابن عربی', english: 'Ibn Arabi' },
    life: { birth: 1165, death: 1240, birthPlace: 'Murcia, Spain', deathPlace: 'Damascus, Syria' },
    school: ['Sufi Mysticism', 'Theosophy'],
    description: 'The "Greatest Master" whose philosophical system of Wahdat al-Wujud (Unity of Being) profoundly influenced Sufi thought worldwide.',
    quoteCount: 110,
    era: 'classical',
  },
  {
    id: 'jami',
    name: { persian: 'جامی', english: 'Jami' },
    life: { birth: 1414, death: 1492, birthPlace: 'Jam, Iran', deathPlace: 'Herat, Afghanistan' },
    school: ['Sufi Poetry', 'Romantic Epic'],
    description: 'The last great master of classical Persian Sufi poetry, whose "Yusuf and Zulaikha" is a pinnacle of mystical romance.',
    quoteCount: 95,
    era: 'golden-age',
  },
  {
    id: 'nizami',
    name: { persian: 'نظامی', english: 'Nizami Ganjavi' },
    life: { birth: 1141, death: 1209, birthPlace: 'Ganja, Azerbaijan', deathPlace: 'Ganja, Azerbaijan' },
    school: ['Romantic Epic', 'Poetry'],
    description: 'The master of the Khamsa (Five Poems), whose romantic epics combined love stories with spiritual wisdom.',
    quoteCount: 85,
    era: 'classical',
  },
  {
    id: 'ferdowsi',
    name: { persian: 'فردوسی', english: 'Ferdowsi' },
    life: { birth: 940, death: 1020, birthPlace: 'Tus, Iran', deathPlace: 'Tus, Iran' },
    school: ['Epic Poetry', 'Persian Literature'],
    description: 'The immortal poet who preserved Persian language and culture through his Shahnameh, the Book of Kings.',
    quoteCount: 200,
    era: 'classical',
  },
];

export const eraColors: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'info'> = {
  ancient: 'info',
  classical: 'secondary',
  'golden-age': 'primary',
  modern: 'warning',
};

export const eraLabels: Record<string, string> = {
  ancient: 'Ancient (Pre-Islamic)',
  classical: 'Classical (8th-13th c.)',
  'golden-age': 'Golden Age (13th-16th c.)',
  modern: 'Modern (16th-21st c.)',
};

export function getPhilosopherById(id: string): Philosopher | undefined {
  return philosophers.find(p => p.id === id);
}
