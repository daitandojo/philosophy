import fs from 'fs';
import path from 'path';
import type { Verse } from '@/types';

interface RawQuote {
  persianText?: string;
  englishTranslation?: string;
  transliteration?: string;
  summary?: string;
  sourceWork?: string;
  philosopher?: string;
  themes?: string[];
  tags?: string[];
  wisdomScore?: number;
  complexity?: number;
  emotionalTone?: string;
  category?: string;
  author?: string;
  level_of_wisdom?: number;
  wisdomScale?: number;
}

const PHILOSOPHER_MAP: Record<string, string> = {
  'Rumi': 'rumi',
  'Mevlana': 'rumi',
  'Hafez': 'hafez',
  'Saadi': 'saadi',
  'Attar': 'attar',
  'Sanai': 'sanai',
  'Jami': 'jami',
  'Nizami': 'nizami',
  'Ferdowsi': 'ferdowsi',
  'Ibn Sina': 'ibn-sina',
  'Avicenna': 'ibn-sina',
  'Al-Farabi': 'al-farabi',
  'Farabi': 'al-farabi',
  'Al-Ghazali': 'al-ghazali',
  'Ghazali': 'al-ghazali',
  'Suhrawardi': 'suhrawardi',
  'Mulla Sadra': 'mulla-sadra',
  'Nasir al-Din Tusi': 'nasir-tusi',
  'Ibn Rushd': 'ibn-rushd',
  'Averroes': 'ibn-rushd',
  'Al-Kindi': 'al-kindi',
  'Ibn Arabi': 'ibn-arabi',
  'Bayazid Bastami': 'bayazid-bastami',
  'Hallaj': 'hallaj',
  'Mani': 'mani',
  'Zoroaster': 'zoroaster',
  'Mazdak': 'mazdak',
  'Omar Khayyam': 'omar-khayyam',
  'Khayyam': 'omar-khayyam',
  'Nasser Khosrow': 'nasser-khosrow',
};

function normalizePhilosopher(name: string | undefined): string | undefined {
  if (!name) return undefined;
  const trimmed = name.trim();
  if (PHILOSOPHER_MAP[trimmed]) return PHILOSOPHER_MAP[trimmed];
  const lower = trimmed.toLowerCase();
  for (const [key, val] of Object.entries(PHILOSOPHER_MAP)) {
    if (key.toLowerCase() === lower) return val;
    if (lower.includes(key.toLowerCase())) return val;
  }
  return trimmed;
}

function pick<T>(obj: RawQuote, keys: (keyof RawQuote)[]): T | undefined {
  for (const key of keys) {
    const val = obj[key];
    if (val !== undefined && val !== null && val !== '') return val as T;
  }
  return undefined;
}

function toVerse(raw: RawQuote, source: string, index: number): Verse | null {
  const persianText = pick<string>(raw, ['persianText', 'persian', 'original_farsi']);
  const englishTranslation = pick<string>(raw, ['englishTranslation', 'english_translation', 'quote_english']);

  if (!persianText && !englishTranslation) return null;

  const philosopherId = normalizePhilosopher(raw.philosopher || raw.author);
  const themes = pick<string[]>(raw, ['themes', 'categories', 'theme']) || ['wisdom'];
  const themeArray = Array.isArray(themes) ? themes : [themes];
  const wisdomScore = pick<number>(raw, ['wisdomScore', 'wisdomScale', 'level_of_wisdom']) ?? 70;

  return {
    persianText: persianText || '',
    transliteration: raw.transliteration || '',
    englishTranslation: englishTranslation || '',
    summary: raw.summary || '',
    sourceWork: raw.sourceWork || 'Unknown',
    philosopher: philosopherId || 'unknown',
    themes: themeArray,
    wisdomScore: Number(wisdomScore),
    complexity: raw.complexity ?? 3,
    emotionalTone: raw.emotionalTone || 'contemplative',
    tags: raw.tags || [],
    versions: [],
    source,
  };
}

async function main() {
  const quotesDir = path.join(__dirname, '..', 'quotes');
  const files = fs.readdirSync(quotesDir).filter(f => f.endsWith('.json'));

  const allVerses: Verse[] = [];

  for (const file of files) {
    const filePath = path.join(quotesDir, file);
    let raw: RawQuote[] | Record<string, RawQuote[]> = [];

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      raw = JSON.parse(content);
    } catch {
      // Try Python-style dict format
      try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const cleaned = content
          .replace(/^[a-z_]+\s*=\s*/i, '')
          .replace(/;?\s*$/, '');
        raw = JSON.parse(cleaned);
      } catch {
        console.log(`Skipping ${file}: unable to parse`);
        continue;
      }
    }

    const quotes = Array.isArray(raw) ? raw : Object.values(raw).flat();

    for (let i = 0; i < quotes.length; i++) {
      const verse = toVerse(quotes[i], file, i);
      if (verse) allVerses.push(verse);
    }

    console.log(`  ${file}: ${quotes.length} quotes loaded`);
  }

  console.log(`\nTotal verses extracted: ${allVerses.length}`);
  console.log('\nPhilosopher distribution:');

  const dist: Record<string, number> = {};
  for (const v of allVerses) {
    const p = v.philosopher || 'unknown';
    dist[p] = (dist[p] || 0) + 1;
  }

  for (const [phil, count] of Object.entries(dist).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${phil}: ${count}`);
  }

  // Write parsed output to a JSON file for review
  const outPath = path.join(__dirname, '..', 'quotes', '_parsed-quotes.json');
  fs.writeFileSync(outPath, JSON.stringify(allVerses, null, 2));
  console.log(`\nOutput written to ${outPath}`);
  console.log('To seed into database, add these to seed.ts or run through the verse API.');
}

main().catch(console.error);
