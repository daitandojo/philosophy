import { NextRequest, NextResponse } from 'next/server';

const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';

interface DiscourseTheme {
  name: string;
  description: string;
}

const discourseThemes: DiscourseTheme[] = [
  { name: 'The Merchant and the Dervish', description: 'A story exploring the relationship between wealth and spirituality' },
  { name: 'The King and the Sage', description: 'A ruler seeks wisdom from a humble teacher' },
  { name: 'The Three Friends', description: 'Friendship tested by adversity' },
  { name: 'The Garden of Truth', description: 'A seeker finds a mystical garden that holds spiritual truths' },
  { name: 'The Shipwrecked Soul', description: 'A survivor discovers inner treasure after losing everything' },
  { name: 'The Blind Men and the Elephant', description: 'Different perspectives on the same truth' },
  { name: 'The Wine and the Cup', description: 'The vessel and its contents as a spiritual metaphor' },
  { name: 'The Mirror and the Face', description: 'Self-reflection and divine recognition' },
  { name: 'The Bird and the Cage', description: 'Freedom and confinement in the spiritual journey' },
  { name: 'The River and the Ocean', description: 'The individual soul merging with the divine' },
  { name: 'The Rose and the Nightingale', description: 'The eternal love between the beloved and the lover' },
  { name: 'The Candle and the Moth', description: 'The soul drawn to divine light' },
  { name: 'The Palm Tree and the Date', description: 'Patience and sweetness of spiritual growth' },
  { name: 'The Desert and the Oasis', description: 'Finding spiritual refreshment in life\'s trials' },
  { name: 'The Pearl and the Oyster', description: 'Wisdom hidden within hardship' },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { philosopher, themes, type = 'fable' } = body;

    if (!philosopher) {
      return NextResponse.json({ error: 'Philosopher is required' }, { status: 400 });
    }

    const selectedTheme = discourseThemes[Math.floor(Math.random() * discourseThemes.length)];
    
    const philosopherContext = getPhilosopherContext(philosopher);
    
    const prompt = `Create a short ${type === 'discourse' ? 'spiritual discourse' : 'fable'} in the style of ${philosopher}, the Persian Sufi philosopher. 

${philosopherContext}

The story should:
- Be 400-600 words
- Include a clear moral or spiritual lesson
- Feature ${selectedTheme.name}: ${selectedTheme.description}
- Use elevated, poetic language appropriate to ${philosopher}'s style
- Include dialogue between characters
- End with a philosophical insight or wisdom teaching

Write in English, but you may include occasional Persian words with translations.`;

    const response = await fetch(`${DEEPSEEK_API_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-reasoner',
        messages: [
          {
            role: 'system',
            content: 'You are a master storyteller specializing in Persian Sufi wisdom traditions. Create evocative fables and discourses that capture the mystical and philosophical spirit of ancient Persian poets like Rumi, Hafez, Saadi, Attar, and Sanai.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('DeepSeek API error:', error);
      return NextResponse.json({ error: 'Failed to generate discourse' }, { status: 500 });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    return NextResponse.json({
      discourse: content,
      theme: selectedTheme,
      philosopher,
      type,
    });
  } catch (error) {
    console.error('Error generating discourse:', error);
    return NextResponse.json({ error: 'Failed to generate discourse' }, { status: 500 });
  }
}

function getPhilosopherContext(philosopher: string): string {
  const contexts: Record<string, string> = {
    'rumi': 'Rumi (1207-1273) was a Persian poet, Sufi mystic, and Islamic scholar whose poetry emphasizes divine love, self-knowledge, and spiritual transformation. His famous themes include: the reed flute longing for its reed bed, the wine of divine love, the journey of the soul to God, and the concept of "die before you die" (fana). His style is passionate, mystical, and filled with metaphors of wine, beloved, dancing, and light.',
    
    'hafez': 'Hafez (1315-1390) was a Persian poet whose Divan contains profound mystical ghazals. His poetry is known for: the themes of wine and the tavern as spiritual metaphors, the "cupbearer" as a divine messenger, fortune-telling through his Divan, and the concept of "khosh gozar" (being well-pleased). His style is elegant, cryptic, and deeply mystical with themes of love, wine, and spiritual longing.',
    
    'saadi': 'Saadi Shirazi (1210-1291) was a Persian poet and moralist known for his practical wisdom. His famous works Gulistan (The Rose Garden) and Bustan (The Orchard) contain: practical ethical teachings, fables with animals teaching human lessons, guidance for kings and rulers, and themes of gratitude, patience, and kindness. His style is clear, didactic, and accessible.',
    
    'attar': 'Attar of Nishapur (1145-1221) was a Persian poet and Sufi mystic best known for "The Conference of the Birds" (Mantiq al-Tayr). His work explores: the soul\'s journey to God symbolized by birds seeking the Simurgh, the stages of the Sufi path, the theme of self-annihilation (fana), and mystical allegory. His style is allegorical, mystical, and deeply symbolic.',
    
    'sanai': 'Sanai (1080-1131) was a pioneering Persian Sufi poet whose "Walled Garden of Truth" (Hadiqat al-Haqiqa) influenced Rumi. His work features: the use of romantic imagery for spiritual themes, the journey from worldly to spiritual, the metaphor of the walled garden, and didactic moral teachings. His style is romantic, mystical, and influential.',
    
    'jami': 'Nur al-Din Abd al-Rahman Jami (1414-1492) was the last great master of classical Persian Sufi poetry. His famous work "Yusuf and Zulaikha" is a mystical romance. His style combines: romantic narrative with spiritual allegory, beautiful descriptions of divine love, and classical Persian poetic conventions.',
  };
  
  return contexts[philosopher] || '';
}

export async function GET() {
  return NextResponse.json({
    themes: discourseThemes,
  });
}
