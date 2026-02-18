import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

interface ImageDefinition {
  filename: string;
  prompt: string;
  subdir?: string;
}

const styleGuide = `13th century Persian miniature painting, traditional Iranian art style. Fine gold leaf brushwork, intricate patterns. Color palette: lapis lazuli blue #1e3a5f, gold #c9a962, terracotta #8b4513, sage green #2e4a3d, deep burgundy #722f37, ivory white. Composition: spiritual motif with decorative borders. Atmosphere: mystical, contemplative, ethereal. NO modern elements, NO western art, NO bright neon, NO photography.`;

const images: ImageDefinition[] = [
  // Hero
  { filename: 'hero-main', prompt: 'Whirling dervish in mystical dance, cosmic motion, celestial spheres, reed flute ney, golden divine light rays, Persian miniature art, spiritual ecstasy' },
  
  // Philosophers
  { filename: 'rumi', prompt: 'Rumi the Persian mystic poet, 13th century, whirling dervish, divine love, golden light, spiritual ecstasy', subdir: 'philosophers' },
  { filename: 'hafez', prompt: 'Hafez of Shiraz, Persian poet, mystical ghazal, wine and roses, book of divination, enigmatic smile', subdir: 'philosophers' },
  { filename: 'saadi', prompt: 'Saadi Shirazi, wise Persian poet, moral teacher, rose garden, storytelling elder', subdir: 'philosophers' },
  { filename: 'attar', prompt: 'Attar of Nishapur, Sufi mystic, Conference of the Birds, spiritual journey, mystical symbolism', subdir: 'philosophers' },
  { filename: 'ibn-sina', prompt: 'Ibn Sina Avicenna, Persian philosopher physician, medieval scholar, Bukhara, with manuscripts', subdir: 'philosophers' },
  { filename: 'al-farabi', prompt: 'Al-Farabi the Second Teacher, Persian philosopher, music of spheres, golden age scholar', subdir: 'philosophers' },
  { filename: 'al-ghazali', prompt: 'Al-Ghazali Persian theologian, desert scholar, spiritual struggle, mystical wisdom', subdir: 'philosophers' },
  { filename: 'suhrawardi', prompt: 'Suhrawardi illumination philosopher, light metaphysics, radiant golden light', subdir: 'philosophers' },
  { filename: 'mulla-sadra', prompt: 'Mulla Sadra Persian transcendent philosopher, Isfahan seminary, contemplative scholar', subdir: 'philosophers' },
  { filename: 'ferdowsi', prompt: 'Ferdowsi poet, Shahnameh epic, ancient Persian king, heroic scene', subdir: 'philosophers' },
  
  // Book sections
  { filename: 'section-ancient', prompt: 'Ancient Persian fire temple, Zoroastrian priests, sacred flame, bronze age Iran', subdir: 'sections' },
  { filename: 'section-islamic', prompt: 'Medieval Islamic library, Baghdad House of Wisdom, Persian scholars', subdir: 'sections' },
  { filename: 'section-mysticism', prompt: 'Sufi mystic in divine light, whirling dervish, spiritual ecstasy', subdir: 'sections' },
  { filename: 'section-synthesis', prompt: 'Isfahan city, Safavid architecture, blue tile mosque', subdir: 'sections' },
  { filename: 'section-poetry', prompt: 'Persian garden, rose and nightingale, poetry reading', subdir: 'sections' },
  { filename: 'section-modern', prompt: 'Modern Tehran, intellectual discourse, traditional meets modern', subdir: 'sections' },
];

async function downloadImage(url: string, filepath: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
}

async function generateAndSaveImages() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('❌ OPENAI_API_KEY not found in environment');
    process.exit(1);
  }
  
  console.log('🎨 Generating Persian-style images with DALL-E...\n');
  
  // Ensure directories exist
  const subdirs = ['hero', 'philosophers', 'sections'];
  for (const subdir of subdirs) {
    const dir = path.join(IMAGES_DIR, subdir);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  let successCount = 0;
  let failCount = 0;

  for (const img of images) {
    const dir = img.subdir ? path.join(IMAGES_DIR, img.subdir) : IMAGES_DIR;
    const filepath = path.join(dir, `${img.filename}.png`);
    
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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenAI error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const imageUrl = data.data[0].url;
      
      if (!imageUrl) {
        throw new Error('No image URL returned');
      }
      
      await downloadImage(imageUrl, filepath);
      console.log(`   ✅ Saved to: public/images/${img.subdir || ''}/${img.filename}.png`);
      successCount++;
    } catch (error) {
      console.log(`   ❌ Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      failCount++;
    }
    
    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log(`\n✨ Complete! ${successCount} images generated, ${failCount} failed.`);
  console.log('\n📁 Images saved to public/images/');
}

generateAndSaveImages().catch(console.error);
