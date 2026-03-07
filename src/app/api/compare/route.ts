import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GLOBAL_CONNECTIONS: Record<string, { 
  western: string[]; 
  eastern: string[]; 
  sufi: string[];
}> = {
  'love': {
    western: ['Plato - Eros/the soul\'s longing for beauty', 'Dante - Beatrice as divine conduit', 'Schopenhauer - Will as cosmic desire'],
    eastern: ['Buddhism - Compassion (Karuna) as liberation', 'Taoism - Wu wei as flowing love', 'Vedanta - Brahman as the beloved within'],
    sufi: ['Rumi - Eshq as divine madness', 'Hafez - Wine as intoxication with the divine', 'Ibn Arabi - Wahdat al-Wujud as cosmic love'],
  },
  'unity': {
    western: ['Spinoza - Substance as one', 'Hegel - Absolute Spirit unfolding', 'Plotinus - The One beyond being'],
    eastern: ['Advaita Vedanta - Brahman/Atman non-duality', 'Buddhism - Śūnyatā interbeing', 'Taoism - Tao as underlying unity'],
    sufi: ['Ibn Arabi - Unity of Being', 'Mulla Sadra - Transcendent theosophy', 'Rumi - Beyond good/bad lies the whole'],
  },
  'wisdom': {
    western: ['Socrates - Know thyself', 'Plato - Philosophy as death practice', 'Aristotle - Eudaimonia through virtue'],
    eastern: ['Confucius - Rectification of names', 'Lao Tzu - Knowing by not knowing', 'Bodhidharma - Direct transmission outside scriptures'],
    sufi: ['Al-Ghazali - Knowledge without heart is worthless', 'Al-Farabi - Theoretical happiness', 'Ibn Sina - The philosopher-king'],
  },
  'truth': {
    western: ['Descartes - Clear and distinct ideas', 'Kant - Categories of understanding', 'Nietzsche - Will to power as truth'],
    eastern: ['Buddhism - Middle way between extremes', 'Confucius - Rectification through ritual', 'Sufism - Fana as truth realized'],
    sufi: ['Hallaj - Ana al-Haq (I am the Truth)', 'Rumi - Beyond concepts lies truth', 'Attar - The Conference of the Birds'],
  },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const verseTheme = searchParams.get('theme');
    const philosopher = searchParams.get('philosopher');

    // If specific theme provided, return its connections
    if (verseTheme) {
      const theme = verseTheme.toLowerCase();
      const connections = GLOBAL_CONNECTIONS[theme] || GLOBAL_CONNECTIONS[Object.keys(GLOBAL_CONNECTIONS).find(
        k => k.includes(theme) || theme.includes(k)
      ) || ''];

      if (!connections) {
        return NextResponse.json({ 
          connections: null,
          message: 'No direct connections found - custom analysis required',
        });
      }

      return NextResponse.json({
        theme: verseTheme,
        connections,
      });
    }

    // Return all connections
    return NextResponse.json({
      themes: Object.keys(GLOBAL_CONNECTIONS),
      connections: GLOBAL_CONNECTIONS,
    });
  } catch (error: any) {
    console.error('Compare error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to get connections' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { verseText, themes, philosopher } = body;

    if (!verseText) {
      return NextResponse.json({ 
        error: 'verseText is required' 
      }, { status: 400 });
    }

    // Use LLM to analyze connections
    const response = await fetch(`${process.env.DEEPSEEK_API_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `You are a comparative philosopher. Map this Persian verse to global philosophical traditions.

Find:
1. Western parallels (Greek, European philosophers)
2. Eastern parallels (Buddhist, Taoist, Hindu, Confucian)
3. Sufi/Persian connections

Return in JSON format:
{
  "connections": {
    "western": ["parallel 1", "parallel 2"],
    "eastern": ["parallel 1", "parallel 2"],
    "sufi": ["parallel 1", "parallel 2"]
  },
  "explanation": "Brief explanation of the connections",
  "themes": ["theme1", "theme2"]
}`
          },
          {
            role: 'user',
            content: `Persian verse: ${verseText}\nPhilosopher: ${philosopher || 'Unknown'}\nThemes: ${(themes || []).join(', ')}`
          }
        ],
        response_format: { type: 'json_object' },
      }),
    });

    const data = await response.json();
    const analysis = JSON.parse(data.choices?.[0]?.message?.content || '{}');

    return NextResponse.json({
      success: true,
      verseText,
      philosopher,
      ...analysis,
    });
  } catch (error: any) {
    console.error('Compare error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to analyze connections' 
    }, { status: 500 });
  }
}
