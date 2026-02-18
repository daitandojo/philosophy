import 'dotenv/config';
import { generateImage } from '../src/lib/services/openai';
import * as fs from 'fs';
import * as path from 'path';

const images = [
  {
    id: 'divine-love-quotes',
    prompt: `13th century Persian miniature painting - divine love and mystical romance. Two souls united in celestial union, rays of golden light descending from heaven. Traditional Ilkhanate style with intricate gold leaf patterns. Deep lapis lazuli blue and burgundy red colors. Romantic, transcendent atmosphere. Decorative border motifs.`,
  },
  {
    id: 'wisdom-for-hard-times',
    prompt: `13th century Persian miniature - a wise sage sitting peacefully in a desert oasis during a storm. Traditional Ilkhanate miniature with gold accents. Calming sage green and deep blue tones. Tranquil atmosphere despite surrounding difficulties. Mystical light.`,
  },
  {
    id: 'path-of-sufism',
    prompt: `13th century Persian miniature - Sufi mystic walking on a spiritual path, whirling dervish silhouette against divine light. Traditional Ilkhanate art with gold leaf. Deep blue background, terracotta and gold. Journey, enlightenment theme.`,
  },
  {
    id: 'persian-poetry-masterpieces',
    prompt: `13th century Persian miniature - ancient scholar surrounded by open books and scrolls, writing poetry by candlelight. Traditional Ilkhanate style with intricate book covers, gold decorations. Rich burgundy, deep blue, ivory colors. Scholarly, timeless atmosphere.`,
  },
  {
    id: 'garden-of-wisdom',
    prompt: `13th century Persian miniature - mystical garden in full bloom, roses and nightingales, fountain in center. Traditional Persian paradise garden (pairidaeza). Gold leaf, lapis blue, emerald green, rose pink. Poetic, romantic atmosphere.`,
  },
  {
    id: 'light-and-darkness',
    prompt: `13th century Persian miniature - dramatic contrast of light and shadow, a figure holding a candle illuminating ancient wisdom. Traditional Ilkhanate style. Deep blacks, golden light rays, burgundy and blue. Philosophical, mystical mood.`,
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
  console.log('Generating collection images...\n');

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
