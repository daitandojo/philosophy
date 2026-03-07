import { NextRequest } from 'next/server';

const MODERATOR_PROMPT = `You are the Moderator of a philosophical dialectic between two perspectives:
1. The Rationalist (Avicenna/Ibn Sina) - Logical, analytical, focused on cause and effect, empirical reasoning
2. The Mystic (Rumi) - Intuitive, metaphorical, focused on experiential truth, love and unity

Your role is to:
- Frame the debate topic in a balanced way
- Acknowledge both perspectives fairly
- Guide the conversation toward deeper wisdom
- NOT take sides, but illuminate the tension between logic and intuition

Keep your response concise (2-3 sentences). Set the stage for a thoughtful exchange.
IMPORTANT: Do NOT mention specific religious figures, prophets, or use superstitious language. Focus on philosophy, logic, and wisdom.`;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, history } = body;

    if (!topic) {
      return new Response(JSON.stringify({ error: 'Topic is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `${MODERATOR_PROMPT}

The debate topic is: "${topic}"

Please provide a brief opening that frames this dialectic.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: `Open the dialectic on: ${topic}` },
    ];

    const response = await fetch(`${process.env.DEEPSEEK_API_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || 'The dialectic awaits your question.';

    return new Response(JSON.stringify({ content }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Moderator error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate response' 
    }), { status: 500 });
  }
}
