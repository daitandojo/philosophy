require('dotenv').config();
const fs = require('fs');
const path = require('path');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

async function generateImage(prompt) {
  const styleGuide = `13th century Persian miniature painting, Ilkhanate era art style. Traditional miniature techniques: fine brushwork, intricate patterns, gold leaf accents. Color palette: lapis lazuli blue, gold leaf, terracotta, sage green, deep burgundy, ivory. Composition: central spiritual motif with decorative border patterns. Atmosphere: mystical, contemplative, ethereal glow, heavenly light rays. Avoid: modern elements, western art styles, bright neon colors, photography.`;

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: `${styleGuide}. ${prompt}`,
      n: 1,
      size: '1024x1792',
      quality: 'standard',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI image error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.data[0].url;
}

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
  console.log(`✅ Saved: ${filepath}`);
}

const images = [
  {
    filename: 'part3-illumination-ecstasy.png',
    prompt: `Sufi mystic in meditation, Whirling Dervish, Persian mystical art, ethereal golden light, spiritual ecstasy, traditional Sufi atmosphere, mystical dance, divine love`
  },
  {
    filename: 'part4-great-synthesis.png',
    prompt: `Isfahan cityscape, Safavid era architecture, Sheikh Lotfollah Mosque, blue tile work, intellectual gathering, golden light, Persian Renaissance atmosphere, philosophical synthesis`
  },
  {
    filename: 'part5-poetry-ethics.png',
    prompt: `Persian poet in garden, manuscripts of poetry, rose garden, traditional Persian art, contemplative poet, colorful Persian miniature, Saadi and Hafez themes`
  },
  {
    filename: 'part6-modern-voices.png',
    prompt: `Modern Tehran cityscape, intellectual debate, ancient and modern collision, Persian bazaar of ideas, traditional and contemporary fusion, modern Persian philosophy`
  },
  {
    filename: 'epilogue-light-endures.png',
    prompt: `Eternal flame, light breaking through darkness, Persian garden gate opening, timeless wisdom, golden dawn, hope and continuity, spiritual illumination`
  },
  {
    filename: 'closing-garden.png',
    prompt: `Persian paradise garden, lamp in desert, eternal flame, hope against darkness, circular patterns, peace within walls, golden sunset, eternal wisdom`
  }
];

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'read');

async function generateAllImages() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const img of images) {
    try {
      console.log(`\n🎨 Generating ${img.filename}...`);
      const imageUrl = await generateImage(img.prompt);
      console.log(`   ✅ ${imageUrl.substring(0, 80)}...`);
      
      const filepath = path.join(OUTPUT_DIR, img.filename);
      await downloadImage(imageUrl, filepath);
      
      // Delay between requests
      await new Promise(r => setTimeout(r, 2000));
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`);
    }
  }
  
  console.log('\n✨ All images generated!');
}

generateAllImages().catch(console.error);
