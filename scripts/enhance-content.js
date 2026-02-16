#!/usr/bin/env node
/**
 * Content Enhancement Script
 * 
 * This script generates additional quotes from Persian philosophers using AI.
 * Run with: node scripts/enhance-content.js [--philosopher=rumi] [--count=50]
 * 
 * Prerequisites:
 * - Set DEEPSEEK_API_KEY in your environment
 * - MongoDB connection configured
 */

// Uses native fetch in Node 18+

const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';

// Philosopher data with their famous works and themes
const PHILOSOPHER_DATA = {
  rumi: {
    name: 'Rumi',
    persianName: 'مولانا',
    works: ['Masnavi', 'Divan-e Shams', 'Fihi Ma Fihi'],
    themes: ['Divine Love', 'Spiritual Journey', 'The Beloved', 'Loss and Longing', 'Unity of Being', 'Transformation', 'Joy and Ecstasy'],
    prompt: `You are Rumi, the great 13th century Persian poet and Sufi mystic. Generate an original inspirational quote in the style of Rumi's poetry.`
  },
  hafez: {
    name: 'Hafez',
    persianName: 'حافظ',
    works: ['Divan-e Hafez'],
    themes: ['Wine and Revelry', 'The Beloved', 'Fate and Destiny', 'Hidden Truth', 'Morning', 'Nightingale'],
    prompt: `You are Hafez, the great 14th century Persian poet. Generate an original inspirational quote in the style of Hafez's ghazals.`
  },
  saadi: {
    name: 'Saadi',
    persianName: 'سعدی',
    works: ['Gulistan', 'Bustan'],
    themes: ['Wisdom', 'Moral Conduct', 'Friendship', 'Patience', 'Gratitude', 'Humility'],
    prompt: `You are Saadi Shirazi, the wise Persian poet known for his moral aphorisms. Generate an original quote about practical wisdom and ethical conduct.`
  },
  attar: {
    name: 'Attar',
    persianName: 'عطار',
    works: ['Conference of the Birds', 'Ilahi-Nama'],
    themes: ['Self-Discovery', 'The Soul', 'Mystical Journey', 'Sacrifice', 'Transformation'],
    prompt: `You are Attar of Nishapur, the 12th century Sufi mystic and poet. Generate an original quote about the soul's journey to God.`
  },
  'ibn-sina': {
    name: 'Ibn Sina (Avicenna)',
    persianName: 'ابن سینا',
    works: ['The Book of Healing', 'Canon of Medicine'],
    themes: ['Knowledge', 'Reason', 'Soul', 'Being', 'Philosophy'],
    prompt: `You are Ibn Sina (Avicenna), the great Persian philosopher and physician. Generate an original quote about knowledge and the pursuit of truth.`
  }
};

async function generateQuote(philosopherId) {
  const philosopher = PHILOSOPHER_DATA[philosopherId];
  if (!philosopher) {
    console.error(`Unknown philosopher: ${philosopherId}`);
    return null;
  }

  const theme = philosopher.themes[Math.floor(Math.random() * philosopher.themes.length)];
  
  const prompt = `${philosopher.prompt}

Theme for this quote: ${theme}

Generate ONE original inspirational quote that:
1. Feels authentic to this philosopher's style and philosophy
2. Uses poetic imagery common in Persian Sufi literature
3. Is between 1-4 lines
4. Contains wisdom that feels timeless

Respond in JSON format only (no other text):
{"persianText": "the quote in Persian or transliterated", "transliteration": "Latin script", "englishTranslation": "English", "theme": "${theme}", "sourceWork": "typical work name", "wisdomScore": 8, "emotionalTone": "tone word"}`;

  try {
    const response = await fetch(`${DEEPSEEK_API_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are an expert in Persian literature and Sufi poetry.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (content) {
      return JSON.parse(content);
    }
    return null;
  } catch (error) {
    console.error(`Error generating quote for ${philosopherId}:`, error.message);
    return null;
  }
}

async function generateBatch(philosopherId, count = 10) {
  console.log(`\n🎭 Generating ${count} quotes for ${PHILOSOPHER_DATA[philosopherId]?.name || philosopherId}...\n`);
  
  const quotes = [];
  
  for (let i = 0; i < count; i++) {
    process.stdout.write(`  Generating quote ${i + 1}/${count}... `);
    
    const quote = await generateQuote(philosopherId);
    
    if (quote) {
      quotes.push({
        ...quote,
        philosopherId,
        generatedAt: new Date().toISOString(),
      });
      console.log('✓');
    } else {
      console.log('✗');
    }
    
    // Rate limiting - wait between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  return quotes;
}

function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    philosopher: 'rumi',
    count: 10,
    help: false,
  };
  
  args.forEach(arg => {
    if (arg.startsWith('--philosopher=')) {
      options.philosopher = arg.split('=')[1];
    } else if (arg.startsWith('--count=')) {
      options.count = parseInt(arg.split('=')[1], 10);
    } else if (arg === '--help' || arg === '-h') {
      options.help = true;
    }
  });
  
  return options;
}

function printHelp() {
  console.log(`
Content Enhancement Script
=========================

Usage: node scripts/enhance-content.js [options]

Options:
  --philosopher=<id>    Philosopher ID (rumi, hafez, saadi, attar, ibn-sina) [default: rumi]
  --count=<n>           Number of quotes to generate [default: 10]
  --help, -h            Show this help message

Examples:
  node scripts/enhance-content.js
  node scripts/enhance-content.js --philosopher=hafez --count=20
  node scripts/enhance-content.js --count=50

Environment Variables:
  DEEPSEEK_API_KEY     Your DeepSeek API key
  DEEPSEEK_API_URL     DeepSeek API URL (optional)
`);
}

async function main() {
  const options = parseArgs();
  
  if (options.help) {
    printHelp();
    process.exit(0);
  }
  
  if (!DEEPSEEK_API_KEY) {
    console.error('Error: DEEPSEEK_API_KEY environment variable is required');
    console.error('Please set it and try again.');
    process.exit(1);
  }
  
  console.log(`
╔═══════════════════════════════════════════════════╗
║     Content Enhancement Script - Persian Wisdom    ║
╚═══════════════════════════════════════════════════╝
  `);
  console.log(`Philosopher: ${options.philosopher}`);
  console.log(`Count: ${options.count}`);
  console.log('');
  
  const quotes = await generateBatch(options.philosopher, options.count);
  
  console.log(`
╔═══════════════════════════════════════════════════╗
║                    Results                          ║
╚═══════════════════════════════════════════════════╝
  `);
  
  console.log(`Generated ${quotes.length}/${options.count} quotes successfully!\n`);
  
  if (quotes.length > 0) {
    console.log('Sample quotes generated:\n');
    quotes.slice(0, 3).forEach((q, i) => {
      console.log(`${i + 1}. ${q.englishTranslation?.substring(0, 80)}...`);
      console.log(`   Theme: ${q.theme}, Wisdom: ${q.wisdomScore}/10\n`);
    });
    
    // Save to file
    const filename = `generated-quotes-${options.philosopher}-${Date.now()}.json`;
    const fs = await import('fs');
    fs.writeFileSync(filename, JSON.stringify(quotes, null, 2));
    console.log(`💾 Quotes saved to: ${filename}`);
  }
  
  console.log(`
╔═══════════════════════════════════════════════════╗
║                  Next Steps                       ║
╚═══════════════════════════════════════════════════╝

To add these quotes to the database:
1. Import the generated JSON file
2. Or use the /api/verses POST endpoint

To generate for multiple philosophers:
  node scripts/enhance-content.js --philosopher=hafez --count=20
  node scripts/enhance-content.js --philosopher=saadi --count=20
  `);
}

main().catch(console.error);
