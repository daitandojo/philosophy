import fs from 'fs';
import path from 'path';
import { generateImage } from '../src/lib/services/openai';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

interface ImageDefinition {
  filename: string;
  prompt: string;
  subdir?: string;
}

const styleGuide = `13th century Persian miniature painting, traditional Iranian art style. Fine brushwork, intricate patterns, gold leaf accents. Color palette: lapis lazuli blue, gold, terracotta, sage green, deep burgundy, ivory. Composition: spiritual motif with decorative borders. Atmosphere: mystical, contemplative, ethereal, heavenly light. Avoid: modern elements, western art, bright neon, photography.`;

const images: ImageDefinition[] = [
  // Hero and landing
  { filename: 'hero-main', prompt: 'Whirling dervish in mystical dance, cosmic motion, golden divine light, reed flute, celestial spheres, Persian miniature art, spiritual ecstasy' },
  { filename: 'hero-quote', prompt: 'Ancient Persian scholar in contemplation, library of wisdom, mystical books, golden light rays, peaceful atmosphere' },
  
  // Philosophers
  { filename: 'rumi', prompt: 'Rumi the mystic poet, 13th century Persian miniature, whirling dervish, divine love, golden light, spiritual ecstasy, contemplative', subdir: 'philosophers' },
  { filename: 'hafez', prompt: 'Hafez of Shiraz, Persian poet, mystical ghazal, wine and roses, book of divination, ancient library, enigmatic smile', subdir: 'philosophers' },
  { filename: 'saadi', prompt: 'Saadi Shirazi, wise Persian poet, moral teacher, rose garden, storytelling, Gulistan, elder sage, warm colors', subdir: 'philosophers' },
  { filename: 'attar', prompt: 'Attar of Nishapur, Sufi mystic, Conference of the Birds, spiritual journey, mystical symbols, visionar art', subdir: 'philosophers' },
  { filename: 'ibn-sina', prompt: 'Ibn Sina Avicenna, Persian philosopher physician, medieval scholar, manuscript, Bukhara, scholarly atmosphere', subdir: 'philosophers' },
  { filename: 'al-farabi', prompt: 'Al-Farabi the Second Teacher, Persian philosopher, music of spheres, golden age scholar, contemplative mood', subdir: 'philosophers' },
  { filename: 'al-ghazali', prompt: 'Al-Ghazali Persian theologian, desert scholar, spiritual struggle, mystical wisdom, austere setting', subdir: 'philosophers' },
  { filename: 'suhrawardi', prompt: 'Suhrawardi illumination philosopher, light metaphysics, mystical radiance, ancient fire temple wisdom, brilliant golden light', subdir: 'philosophers' },
  { filename: 'mulla-sadra', prompt: 'Mulla Sadra transcendent philosopher, Isfahan seminary, existential meditation, flowing light, Persian scholar', subdir: 'philosophers' },
  { filename: 'ferdowsi', prompt: 'Ferdowsi poet, Shahnameh epic, ancient Persian king, heroic scene, traditional miniature art', subdir: 'philosophers' },
  
  // Book sections
  { filename: 'part1-ancient', prompt: 'Ancient Persian fire temple, Zoroastrian priests, sacred flame, bronze age Iran, mystical dawn, golden light', subdir: 'sections' },
  { filename: 'part2-islamic', prompt: 'Medieval Islamic library, Baghdad House of Wisdom, Persian scholars, golden age manuscripts, amber light', subdir: 'sections' },
  { filename: 'part3-mysticism', prompt: 'Sufi mystic in divine light, whirling dervish, spiritual ecstasy, Persian mystical art, golden illumination', subdir: 'sections' },
  { filename: 'part4-synthesis', prompt: 'Isfahan city, Safavid architecture, blue tile mosque, intellectual gathering, Persian Renaissance atmosphere', subdir: 'sections' },
  { filename: 'part5-poetry', prompt: 'Persian garden, rose nightingale, poetry reading, Saadi and Hafez, mystical atmosphere, colorful miniature', subdir: 'sections' },
  { filename: 'part6-modern', prompt: 'Modern Tehran, intellectual discourse, ancient meets modern, Persian bazaar of ideas, traditional and contemporary', subdir: 'sections' },
  
  // UI Elements
  { filename: 'logo-bg', prompt: 'Persian geometric pattern, gold on dark blue, intricate tessellation, traditional ornamental design, elegant', subdir: 'ui' },
  { filename: 'pattern-overlay', prompt: 'Persian Islamic geometric pattern, subtle gold lines, traditional ornamental design, transparent background', subdir: 'ui' },
];

async function generateAndSaveImages() {
  console.log('🎨 Generating Persian-style images...\n');
  
  // Ensure directories exist
  const subdirs = ['hero', 'philosophers', 'sections', 'ui'];
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
      const imageUrl = await generateImage(img.prompt);
      
      // Download the image
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`Failed to download: ${response.status}`);
      }
      
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(filepath, Buffer.from(buffer));
      
      console.log(`   ✅ Saved to: public/images/${img.subdir || ''}/${img.filename}.png`);
      successCount++;
    } catch (error) {
      console.log(`   ❌ Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      failCount++;
    }
    
    // Rate limiting - wait between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\n✨ Complete! ${successCount} images generated, ${failCount} failed.`);
}

generateAndSaveImages().catch(console.error);
