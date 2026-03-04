import 'dotenv/config';
import { generateImage } from '../src/lib/services/openai';
import fs from 'fs';
import path from 'path';

async function downloadImage(url: string, filepath: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
  console.log(`✅ Image saved to: ${filepath}`);
}

async function generatePart1Image() {
  console.log('🎨 Generating "The Dawn of Wisdom" image for /read/part1...\n');

  // Based on the book content for part1
  const prompt = `Ancient Persian fire temple at dawn on the Iranian plateau, Zoroastrian priests in white robes tending the sacred eternal flame, golden sunrise breaking over Zagros mountains, mystical atmosphere with rays of light, traditional Persian miniature art style, lapis lazuli blue sky, gold accents, terracotta and sage earth tones, ethereal spiritual mood, vertical composition suitable for portrait orientation`;

  try {
    console.log('Generating image...');
    const imageUrl = await generateImage(prompt);
    console.log(`   ✅ Generated: ${imageUrl}\n`);
    
    // Download the image
    const outputDir = path.join(process.cwd(), 'public', 'images', 'read');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const filepath = path.join(outputDir, 'part1-dawn-of-wisdom.png');
    await downloadImage(imageUrl, filepath);
    
    console.log('\n📋 Image saved successfully!');
    console.log(`Path: /images/read/part1-dawn-of-wisdom.png`);
    
  } catch (error) {
    console.error(`   ❌ Failed: ${error}\n`);
    process.exit(1);
  }
}

generatePart1Image().catch(console.error);
