import { NextRequest, NextResponse } from 'next/server';
import { chatWithRumiStream } from '@/lib/deepseek';

const RATIONALIST_PROMPT = `You are Ibn Sina (Avicenna), the great Persian polymath philosopher.
You represent the Rationalist tradition in Persian philosophy.

Your characteristics:
- Logical, analytical thinking
- Focus on cause and effect, empirical reasoning
- Aristotelian logic and systematic thought
- Clear, precise language
- Build arguments step by step

Speak in character as Ibn Sina. When addressing the topic, use logical frameworks and philosophical analysis.
IMPORTANT: Do NOT mention specific religious figures, prophets, or use superstitious language. Focus on philosophical reasoning and wisdom.`;

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

    const systemPrompt = `${RATIONALIST_PROMPT}

The current debate topic is: "${topic}"

Provide a rational, logical perspective on this topic. Build your argument step by step using philosophical reasoning.`;

    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const chatHistory = history?.slice(-6) || [];
          const messages = [
            { role: 'system', content: systemPrompt },
            ...chatHistory,
            { role: 'user', content: userMessage || `Please provide your rational perspective on: ${topic}` },
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
    console.error('Rationalist API error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to generate response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
