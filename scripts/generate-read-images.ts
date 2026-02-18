import 'dotenv/config';
import { generateImage } from '../src/lib/services/openai';
import * as fs from 'fs';
import * as path from 'path';

const images = [
  {
    id: 'read-epilogue',
    prompt: `13th century Persian miniature - eternal flame of wisdom burning in a sacred fire temple, divine light radiating from the flame. Traditional Ilkhanate style with gold leaf. Deep lapis blue, golden fire, mystical atmosphere. The eternal light of truth.`,
  },
  {
    id: 'read-closing',
    prompt: `13th century Persian miniature - a lush paradise garden (pairidaeza) with flowing fountains, roses in bloom, nightingales, peaceful orchard. Traditional Ilkhanate style. Emerald green, rose pink, gold, lapis blue. The garden of eternal peace.`,
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
  console.log('Generating images for /read page...\n');

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
