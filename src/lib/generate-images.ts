import 'dotenv/config';
import { generateImage } from './services/openai';

const imagePrompts = [
  {
    name: 'Splash Background',
    filename: 'splash-bg',
    prompt: `13th century Persian miniature painting of mystical Sufi gathering in moonlit courtyard. Traditional Ilkhanate era art with gold leaf. Colors: lapis blue, gold, terracotta, sage green. Soft ethereal glow. White edges for light background blending.`,
  },
  {
    name: 'Hero Image',
    filename: 'hero-image', 
    prompt: `13th century Persian miniature - divine light from above illuminating a seeker's heart. Traditional Ilkhanate style with gold patterns. Deep lapis blue background, golden rays, terracotta accents. Mystical atmosphere. White edges.`,
  },
];

async function generateSiteImages() {
  console.log('🎨 Generating 13th century Persian miniature images for Rumi...\n');

  const results: { name: string; url: string }[] = [];

  for (const img of imagePrompts) {
    try {
      console.log(`Generating ${img.name}...`);
      const imageUrl = await generateImage(img.prompt);
      results.push({ name: img.name, url: imageUrl });
      console.log(`   ✅ ${imageUrl}\n`);
    } catch (error) {
      console.error(`   ❌ Failed: ${error}\n`);
    }
  }

  console.log('\n📋 Generated URLs (these are permanent):');
  results.forEach(r => console.log(`${r.name}: ${r.url}`));
}

generateSiteImages().catch(console.error);
