import 'dotenv/config';
import { generateImage } from '../src/lib/services/openai';
import * as fs from 'fs';
import * as path from 'path';

const images = [
  {
    id: 'philosopher-sanai',
    prompt: `11th century Persian miniature portrait of a Sufi poet with a beard wearing traditional robes and turban, traditional Ghaznavid art style. Deep blue and gold colors. Poetic, wise expression. Portrait composition.`,
  },
  {
    id: 'philosopher-jami',
    prompt: `15th century Persian miniature portrait of a Persian poet and Sufi master with a white beard wearing an elegant turban and robes, traditional Herat style. Rich burgundy and gold. Elegant, mystical. Portrait composition.`,
  },
  {
    id: 'philosopher-al-farabi',
    prompt: `10th century Persian miniature portrait of a Persian philosopher with a beard wearing scholarly robes and a distinctive hat, traditional Seljuk art style. Deep blue and gold. Intellectual, wise. Portrait composition.`,
  },
  {
    id: 'philosopher-mulla-sadra',
    prompt: `17th century Persian miniature portrait of a Persian philosopher with a beard wearing flowing robes and turban, traditional Safavid art style. Deep emerald green and gold. Contemplative, profound. Portrait composition.`,
  },
  {
    id: 'philosopher-nasir-tusi',
    prompt: `13th century Persian miniature portrait of a Persian polymath with a beard wearing scholarly robes, traditional Ilkhanate art style. Golden light, deep blue. Scientific, learned. Portrait composition.`,
  },
  {
    id: 'philosopher-ibn-rushd',
    prompt: `12th century Persian miniature portrait of a philosopher with a beard wearing scholarly robes and turban, traditional Andalusian-Moorish style. Deep blue and white. Scholarly, authoritative. Portrait composition.`,
  },
  {
    id: 'philosopher-al-kindi',
    prompt: `9th century Persian miniature portrait of an Arab philosopher with a beard wearing scholarly robes, early Islamic art style. Deep green and gold. Venerable, wise. Portrait composition.`,
  },
  {
    id: 'philosopher-ibn-arabi',
    prompt: `12th century Persian miniature portrait of a Sufi master with a long white beard wearing a simple wool cloak and turban, traditional mystical style. Earth tones and gold. Visionary, transcendent. Portrait composition.`,
  },
  {
    id: 'philosopher-bayazid-bastami',
    prompt: `9th century Persian miniature portrait of an early Sufi master with a long beard wearing simple wool robes, traditional Persian style. Earth tones, deep green. Ecstatic, mystical. Portrait composition.`,
  },
  {
    id: 'philosopher-hallaj',
    prompt: `10th century Persian miniature portrait of a Sufi mystic with a beard wearing simple robes, traditional Baghdad style. Deep blue and gold. Passionate, divine. Portrait composition.`,
  },
  {
    id: 'philosopher-junayd-baghdadi',
    prompt: `9th century Persian miniature portrait of a Sufi master with a beard wearing simple robes, traditional Baghdad style. Sage green and gold. Sober, wise. Portrait composition.`,
  },
  {
    id: 'philosopher-abdul-qadir-gilani',
    prompt: `11th century Persian miniature portrait of a Persian Sufi sheikh with a beard wearing elaborate robes and turban, traditional Baghdad style. Deep green and gold. Authoritative, saintly. Portrait composition.`,
  },
  {
    id: 'philosopher-najm-kubra',
    prompt: `13th century Persian miniature portrait of a Sufi master with a beard wearing mystical robes, traditional Khwarezm style. Golden light emanating, deep blue. Visionary, illuminated. Portrait composition.`,
  },
  {
    id: 'philosopher-seyyed-hossein-nasr',
    prompt: `Modern interpretation Persian miniature - contemporary Islamic scholar with a white beard wearing traditional robes and glasses, fusion style. Deep blue and gold. Scholarly, traditional. Portrait composition.`,
  },
  {
    id: 'philosopher-allama-tabatabai',
    prompt: `20th century Persian miniature portrait of a Shi'a scholar with a beard wearing traditional robes and turban, modern interpretation. Deep burgundy and gold. Erudite, spiritual. Portrait composition.`,
  },
  {
    id: 'philosopher-morteza-motahhari',
    prompt: `20th century Persian miniature portrait of an Iranian philosopher with a beard wearing traditional robes, modern interpretation. Deep green and gold. Intellectual, reformist. Portrait composition.`,
  },
  {
    id: 'philosopher-abdolkarim-soroush',
    prompt: `Contemporary Persian miniature portrait of an Iranian philosopher with a beard wearing modern formal clothes with traditional patterns, fusion style. Deep blue and gold. Contemporary, thoughtful. Portrait composition.`,
  },
  {
    id: 'philosopher-dariush-shayegan',
    prompt: `Contemporary Persian miniature portrait of an Iranian philosopher with a beard wearing suit with traditional Persian patterns, fusion style. Deep burgundy and gold. Comparative, philosophical. Portrait composition.`,
  },
  {
    id: 'philosopher-zoroaster',
    prompt: `Ancient Persian miniature portrait of a prophet with a long beard wearing white robes, traditional Zoroastrian art style. White, gold, deep blue. Ancient, wise, celestial. Portrait composition.`,
  },
  {
    id: 'philosopher-mazdak',
    prompt: `6th century Persian miniature portrait of a Persian prophet-philosopher with a beard wearing ancient Persian robes, ancient style. Earth tones, deep red. Revolutionary, ancient. Portrait composition.`,
  },
  {
    id: 'philosopher-mani',
    prompt: `3rd century Persian miniature portrait of a prophet with long hair wearing flowing robes, ancient Persian-Greek style. White robes, gold, light. Founder, visionary. Portrait composition.`,
  },
];

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images');

async function downloadImage(url: string, filename: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }
  
  const buffer = await response.arrayBuffer();
  const filePath = path.join(OUTPUT_DIR, `${filename}.png`);
  fs.writeFileSync(filePath, Buffer.from(buffer));
  return filePath;
}

async function generateImages() {
  console.log('Generating remaining philosopher images...\n');

  for (const img of images) {
    try {
      console.log(`Generating ${img.id}...`);
      const imageUrl = await generateImage(img.prompt);
      const localPath = await downloadImage(imageUrl, img.id);
      console.log(`   ✅ Saved to: ${localPath}\n`);
    } catch (error) {
      console.error(`   ❌ Failed: ${error}\n`);
    }
  }
}

generateImages().catch(console.error);
