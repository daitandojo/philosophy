import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

const styleGuide = `13th century Persian miniature painting, traditional Iranian art style. Fine gold leaf brushwork, intricate patterns. Color palette: lapis lazuli blue #1e3a5f, gold #c9a962, terracotta #8b4513, sage green #2e4a3d, deep burgundy #722f37. Composition: spiritual motif with decorative borders. Atmosphere: mystical, contemplative. NO modern elements, NO photography.`;

const sections = [
  { filename: 'section-ancient', prompt: 'Ancient Persian fire temple, Zoroastrian priests, sacred flame, bronze age Iran' },
  { filename: 'section-islamic', prompt: 'Medieval Islamic library, Baghdad House of Wisdom, Persian scholars translating manuscripts' },
  { filename: 'section-mysticism', prompt: 'Sufi mystic in divine light, whirling dervish, spiritual ecstasy, golden illumination' },
  { filename: 'section-synthesis', prompt: 'Isfahan city, Safavid architecture, blue tile mosque, intellectual gathering' },
  { filename: 'section-poetry', prompt: 'Persian garden, rose and nightingale, poetry reading, mystical atmosphere' },
  { filename: 'section-modern', prompt: 'Modern Tehran, intellectual discourse, traditional meets modern Persian' },
];

async function downloadImage(url: string, filepath: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to download: ${response.status}`);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
}

async function generate() {
  const apiKey = process.env.OPENAI_API_KEY;
  console.log('Generating section images...\n');
  
  for (const img of sections) {
    const filepath = path.join(IMAGES_DIR, 'sections', `${img.filename}.png`);
    console.log(`Generating: ${img.filename}...`);
    
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: `${styleGuide}. ${img.prompt}`,
          n: 1,
          size: '1024x1024',
          quality: 'standard',
        }),
      });

      const data = await response.json();
      const imageUrl = data.data[0].url;
      await downloadImage(imageUrl, filepath);
      console.log(`   ✅ Saved: ${img.filename}.png`);
    } catch (error) {
      console.log(`   ❌ Failed: ${error}`);
    }
    
    await new Promise(r => setTimeout(r, 3000));
  }
  console.log('\nDone!');
}

generate();
