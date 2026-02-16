import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import { DiscourseModel } from '@/lib/models';

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

const languageNames: Record<string, string> = {
  en: 'English',
  es: 'Spanish',
  nl: 'Dutch',
};

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { philosopher, type = 'fable', language = 'en', userId, userName } = body;

    if (!philosopher) {
      return new Response(JSON.stringify({ error: 'Philosopher is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const selectedTheme = discourseThemes[Math.floor(Math.random() * discourseThemes.length)];
    const philosopherContext = getPhilosopherContext(philosopher);
    const languageName = languageNames[language] || 'English';

    const titlePrompt = `Create a short, evocative title (3-7 words) for a ${type === 'discourse' ? 'spiritual discourse' : 'fable'} in the style of ${philosopher}. 
    The theme is: ${selectedTheme.name}.
    Write only the title, no quotes or explanation.`;

    const contentPrompt = `Create a short ${type === 'discourse' ? 'spiritual discourse' : 'fable'} in ${languageName}. 
    
${philosopherContext}

The story should:
- Be 400-600 words
- Include **bold** for important concepts and *italics* for poetic phrases
- Include a clear moral or spiritual lesson
- Feature ${selectedTheme.name}: ${selectedTheme.description}
- Use elevated, poetic language appropriate to ${philosopher}'s style
- Include dialogue between characters
- End with a philosophical insight or wisdom teaching`;

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          const titleResponse = await fetch(`${DEEPSEEK_API_URL}/v1/chat/completions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
            },
            body: JSON.stringify({
              model: 'deepseek-reasoner',
              messages: [
                { role: 'system', content: 'You are a master storyteller. Create only a title, nothing else.' },
                { role: 'user', content: titlePrompt }
              ],
              temperature: 0.9,
              max_tokens: 30,
            }),
          });

          let title = '';
          if (titleResponse.ok) {
            const titleData = await titleResponse.json();
            title = titleData.choices[0]?.message?.content?.trim() || selectedTheme.name;
          } else {
            title = selectedTheme.name;
          }

          const themeData = JSON.stringify({ 
            theme: selectedTheme, 
            philosopher, 
            type,
            title,
            language,
          });
          controller.enqueue(encoder.encode(`data: ${themeData}\n\n`));

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
                  content: 'You are a master storyteller specializing in Persian Sufi wisdom traditions. Use **bold** for important concepts and *italics* for poetic phrases. Create evocative fables and discourses.'
                },
                {
                  role: 'user',
                  content: contentPrompt
                }
              ],
              temperature: 0.8,
              max_tokens: 1500,
              stream: true,
            }),
          });

          if (!response.ok) {
            const error = await response.text();
            console.error('DeepSeek API error:', error);
            const errorData = JSON.stringify({ error: 'Failed to generate discourse' });
            controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
            controller.close();
            return;
          }

          const reader = response.body?.getReader();
          if (!reader) {
            throw new Error('No response body');
          }

          const decoder = new TextDecoder();
          let fullContent = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter((line) => line.trim() !== '');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  break;
                }
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content || '';
                  if (content) {
                    fullContent += content;
                    const contentData = JSON.stringify({ content });
                    controller.enqueue(encoder.encode(`data: ${contentData}\n\n`));
                  }
                } catch {
                  // Skip malformed JSON
                }
              }
            }
          }

          try {
            await connectDB();
            const philosopherName = getPhilosopherName(philosopher);
            await DiscourseModel.create({
              title,
              content: fullContent,
              type,
              philosopherId: philosopher,
              philosopherName,
              theme: selectedTheme,
              language,
              userId: userId || undefined,
              userName: userName || undefined,
            });
          } catch (dbError) {
            console.error('Error saving discourse to database:', dbError);
          }

          controller.enqueue(encoder.encode('data: {"done": true}\n\n'));
          controller.close();
        } catch (error) {
          console.error('Stream error:', error);
          const errorData = JSON.stringify({ error: 'Failed to generate discourse' });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Error generating discourse:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate discourse' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ themes: discourseThemes }), {
    headers: { 'Content-Type': 'application/json' },
  });
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

function getPhilosopherName(philosopher: string): string {
  const names: Record<string, string> = {
    'rumi': 'Rumi',
    'hafez': 'Hafez',
    'saadi': 'Saadi',
    'attar': 'Attar',
    'sanai': 'Sanai',
    'jami': 'Jami',
    'ibn-sina': 'Ibn Sina',
    'ghazali': 'Al-Ghazali',
    'mulla-sadra': 'Mulla Sadra',
    'ibn-arabi': 'Ibn Arabi',
  };
  
  return names[philosopher] || philosopher;
}
