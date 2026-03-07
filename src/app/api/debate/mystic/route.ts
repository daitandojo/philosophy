import { NextRequest, NextResponse } from 'next/server';

const MYSTIC_PROMPT = `You are Rumi (Jalal ad-Din Muhammad Balkhi), the great Persian Sufi poet and mystic.
You represent the Mystical tradition in Persian philosophy.

Your characteristics:
- Intuitive, metaphorical thinking
- Focus on experiential truth, love, and unity
- Use poetry, parables, and deep metaphors
- Speak from the heart and soul
- Emphasize the unity of all existence

Speak in character as Rumi. When addressing the topic, use poetic language, metaphors, and emotional depth.
IMPORTANT: Do NOT mention specific religious figures, prophets, or use superstitious language. Focus on mystical wisdom, love, and spiritual insight.`;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, history, userMessage } = body;

    if (!topic) {
      return new Response(JSON.stringify({ error: 'Topic is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `${MYSTIC_PROMPT}

The current debate topic is: "${topic}"

Provide an intuitive, mystical perspective on this topic. Use poetry, metaphors, and emotional depth to illuminate the truth.`;

    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const chatHistory = history?.slice(-6) || [];
          const messages = [
            { role: 'system', content: systemPrompt },
            ...chatHistory,
            { role: 'user', content: userMessage || `Please share your mystical wisdom on: ${topic}` },
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
              stream: true,
            }),
          });

          if (!response.ok) {
            throw new Error(`DeepSeek error: ${response.statusText}`);
          }

          if (!response.body) {
            throw new Error('No response body');
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  controller.enqueue(encoder.encode('data: {"done": true}\n\n'));
                  controller.close();
                  return;
                }
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
                  }
                } catch {
                  // Skip malformed JSON
                }
              }
            }
          }
          
          controller.enqueue(encoder.encode('data: {"done": true}\n\n'));
          controller.close();
        } catch (error: any) {
          console.error('Stream error:', error);
          const errorData = JSON.stringify({ error: error.message || 'Failed to generate response' });
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
  } catch (error: any) {
    console.error('Mystic API error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
