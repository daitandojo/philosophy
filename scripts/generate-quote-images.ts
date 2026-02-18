import 'dotenv/config';
import { generateImage } from '../src/lib/services/openai';
import * as fs from 'fs';
import * as path from 'path';

const images = [
  {
    id: 'quote-wound-light',
    prompt: `13th century Persian miniature - a mystical scene of divine golden light streaming through a crack in a dark stone wall, illuminating a humble room. Traditional Ilkhanate style with gold leaf rays of light. Deep shadows contrasted with brilliant golden light. Spiritual, transcendent atmosphere.`,
  },
  {
    id: 'quote-seek-seeking',
    prompt: `13th century Persian miniature - a mystical seeker walking through a desert at twilight, seeing their own silhouette reflected in the sky above. Traditional Sufi art style. Golden light emanating from the horizon, deep blue night sky. The journey of seeking.`,
  },
  {
    id: 'quote-river-joy',
    prompt: `13th century Persian miniature - a joyful soul sitting by a flowing river in an ancient garden, feeling the water's movement within. Traditional Ilkhanate style. Emerald green river, golden light, roses in bloom. Blissful, peaceful, mystical joy.`,
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
  console.log('Generating quote images...\n');

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
