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
  console.log(`✅ Image saved to: ${filepath}`);
}

async function generatePart2Image() {
  console.log('🎨 Generating "Revelation and Reason" image for /read/part2...\n');

  const prompt = `Medieval Islamic library in Baghdad, scholars translating ancient manuscripts by candlelight, Persian and Arabic scholars working together, House of Wisdom, golden age of Islamic scholarship, warm amber and lapis blue tones, traditional Persian miniature art style, intricate architectural details, mystical atmosphere`;

  try {
    console.log('Generating image with DALL-E 3...');
    const imageUrl = await generateImage(prompt);
    console.log(`   ✅ Generated: ${imageUrl}\n`);
    
    const outputDir = path.join(process.cwd(), 'public', 'images', 'read');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const filepath = path.join(outputDir, 'part2-revelation-reason.png');
    await downloadImage(imageUrl, filepath);
    
    console.log('\n📋 Image saved successfully!');
    console.log(`Path: /images/read/part2-revelation-reason.png`);
    
  } catch (error) {
    console.error(`   ❌ Failed: ${error.message}\n`);
    process.exit(1);
  }
}

generatePart2Image().catch(console.error);
