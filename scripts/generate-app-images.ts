import 'dotenv/config';
import { generateImage } from '../src/lib/services/openai';
import * as fs from 'fs';
import * as path from 'path';

const images = [
  // Logo for Navbar
  {
    id: 'navbar-logo',
    prompt: `Elegant Persian calligraphy logo design, stylized "حکمت" (Hikmat - Wisdom) in traditional Nastaliq script, traditional Persian ink painting style on cream background. Minimalist, timeless, sophisticated. Lapis blue and gold accents. Ancient manuscript aesthetic. Clean, iconic, suitable for navigation bar. Square format.`,
  },
  // Home page hero
  {
    id: 'home-hero',
    prompt: `13th century Persian miniature painting - a gathering of wise scholars and mystics in an illuminated library. Traditional Ilkhanate art with gold leaf. Lapis blue, gold, ivory, burgundy colors. Books, scrolls, candlelight. Mystical ethereal atmosphere with divine light rays. Beautiful intricate patterns.`,
  },
  // Explore page hero
  {
    id: 'explore-hero',
    prompt: `13th century Persian miniature - an open book with floating verses and wisdom symbols. Traditional Ilkhanate style with gold leaf. Deep lapis blue background, golden light emanating from the book. Mystical, contemplative. Decorative border patterns.`,
  },
  // Philosophers chat portraits - portrait style
  {
    id: 'philosopher-rumi',
    prompt: `13th century Persian miniature portrait of a wise Sufi mystic with a long beard wearing a tall taj (hat) and flowing robes, traditional Ilkhanate style. Deep blue and gold colors. Mystical, serene expression. Portrait composition facing right.`,
  },
  {
    id: 'philosopher-hafez',
    prompt: `14th century Persian miniature portrait of a Persian poet with a wise expression, wearing a turban and elegant robe, traditional Shiraz art style. Burgundy and gold colors. Contemplative, mysterious. Portrait composition.`,
  },
  {
    id: 'philosopher-saadi',
    prompt: `13th century Persian miniature portrait of a Persian sage with a white beard, wearing a traditional kolah (hat) and scholarly robe, traditional Ilkhanate style. Sage green and gold. Warm, wise expression. Portrait composition.`,
  },
  {
    id: 'philosopher-attar',
    prompt: `12th century Persian miniature portrait of a Sufi mystic with a long beard, wearing a simple wool cloak and turban, traditional Nishapur style. Earth tones and gold. Visionary, mystical expression. Portrait composition.`,
  },
  {
    id: 'philosopher-ferdowsi',
    prompt: `14th century Persian miniature portrait of a dignified Persian poet-historian with a long white beard wearing a royal turban and ornate robe, traditional manuscript style. Deep burgundy and gold. Majestic, scholarly. Portrait composition.`,
  },
  {
    id: 'philosopher-ibn-sina',
    prompt: `11th century Persian miniature portrait of a Persian philosopher-physician with a beard wearing a scholarly robe and traditional head covering, traditional Seljuk art style. Deep blue and gold. Learned, intellectual expression. Portrait composition.`,
  },
  {
    id: 'philosopher-suhrawardi',
    prompt: `12th century Persian miniature portrait of a Persian mystical philosopher with a beard wearing illuminated robes, traditional art style. Golden light emanating from behind. Deep blue and gold. Mystical, glowing. Portrait composition.`,
  },
  {
    id: 'philosopher-al-ghazali',
    prompt: `11th century Persian miniature portrait of a Persian theologian and scholar with a beard wearing traditional scholarly robes and turban, traditional art style. Burgundy and gold. Authoritative, wise. Portrait composition.`,
  },
  {
    id: 'philosopher-nizami',
    prompt: `12th century Persian miniature portrait of a Persian poet with a beard wearing an elegant patterned robe and turban, traditional Ganja style. Rich reds and gold. Poetic, romantic expression. Portrait composition.`,
  },
  // Learning paths
  {
    id: 'learn-ancient',
    prompt: `Ancient Persian miniature - Zoroastrian fire temple with priests in white robes, ancient Achaemenid era style. Lapis blue, white, gold colors. Eternal flame, cosmic order symbolism. Mystical atmosphere.`,
  },
  {
    id: 'learn-islamic',
    prompt: `13th century Persian miniature - scholars in a medieval Islamic library, translating Greek texts. Traditional Ilkhanate style with gold leaf. Books, astrolabes, candlelight. Intellect, learning. Burgundy and blue.`,
  },
  {
    id: 'learn-illumination',
    prompt: `12th century Persian miniature - mystical philosopher in a garden at dawn, divine light illuminating the soul. Traditional Sufi art style. Golden light rays, emerald garden, deep blue sky. Illumination philosophy.`,
  },
  {
    id: 'learn-wisdom-love',
    prompt: `13th century Persian miniature - lovers in a mystical garden, rose and nightingale, divine love theme. Traditional Ilkhanate style with gold. Rose pink, emerald green, lapis blue. Romantic, transcendent.`,
  },
  {
    id: 'learn-poetry',
    prompt: `13th century Persian miniature - a poet composing verses at a writing desk, with floating words and symbols. Traditional miniature style. Ink, paper, roses. Creative inspiration. Gold and burgundy.`,
  },
  {
    id: 'learn-contemporary',
    prompt: `Modern interpretation of Persian miniature - a contemporary scholar with traditional elements, bridging past and present. Fusion style. Gold, deep blue, contemporary clothing with traditional patterns.`,
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

async function generateAllImages() {
  console.log('🎨 Generating Persian miniature images for Hikmatia...\n');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results: { id: string; localPath: string }[] = [];

  for (const img of images) {
    try {
      console.log(`Generating ${img.id}...`);
      const imageUrl = await generateImage(img.prompt);
      console.log(`   📥 Downloading...`);
      
      const localPath = await downloadImage(imageUrl, img.id);
      console.log(`   ✅ Saved to: ${path.basename(localPath)}\n`);
      
      results.push({ id: img.id, localPath });
    } catch (error) {
      console.error(`   ❌ Failed: ${error}\n`);
    }
  }

  console.log('\n📋 Generated Images:');
  results.forEach(r => console.log(`${r.id}: /images/${r.id}.png`));
}

generateAllImages().catch(console.error);
