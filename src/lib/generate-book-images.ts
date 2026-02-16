import 'dotenv/config';
import { generateImage } from './services/openai';
import { bookContent, BookSection } from './book-content';

const bookImages: Record<string, string> = {};

async function generateBookImages() {
  console.log('🎨 Generating Persian miniature images for each book section...\n');

  for (const section of bookContent) {
    try {
      console.log(`Generating image for: ${section.title}...`);
      const imageUrl = await generateImage(section.imagePrompt);
      bookImages[section.id] = imageUrl;
      console.log(`   ✅ ${section.id}: ${imageUrl}\n`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`   ❌ Failed for ${section.id}: ${error}\n`);
    }
  }

  console.log('\n📋 Generated Book Image URLs:');
  console.log('-----------------------------');
  Object.entries(bookImages).forEach(([id, url]) => {
    console.log(`${id}: ${url}`);
  });

  console.log('\n📝 Add these to your environment or config:');
  console.log(JSON.stringify(bookImages, null, 2));
}

generateBookImages().catch(console.error);
