const DEEPSEEK_API_URL = process.env.DEEPSEEK_API_URL || 'https://api.deepseek.com';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';

export interface TranslationResult {
  transliteration: string;
  englishTranslation: string;
  summary: string;
  themes: string[];
  wisdomScore: number;
  emotionalTone: string;
  confidence: number;
}

async function callDeepSeek(prompt: string, responseFormat?: { type: 'json_object' }): Promise<string> {
  const response = await fetch(`${DEEPSEEK_API_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are an expert in Persian and Sufi poetry.' },
        { role: 'user', content: prompt },
      ],
      response_format: responseFormat,
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || '';
}

export async function translateAndAnalyze(persianText: string): Promise<TranslationResult> {
  const prompt = `You are an expert in Persian literature and Sufi poetry, specializing in Rumi's works.
Analyze the following Persian verse and provide:
1. A transliteration in Latin script
2. An English translation
3. A brief summary (2-3 sentences)
4. The main themes (array of strings)
5. A wisdom score from 1-10
6. The emotional tone

Persian verse:
${persianText}

Respond in JSON format:
{
  "transliteration": "...",
  "englishTranslation": "...",
  "summary": "...",
  "themes": ["...", "..."],
  "wisdomScore": 5,
  "emotionalTone": "...",
  "confidence": 0.85
}`;

  const content = await callDeepSeek(prompt, { type: 'json_object' });
  
  try {
    const result = JSON.parse(content);
    return {
      transliteration: result.transliteration || '',
      englishTranslation: result.englishTranslation || '',
      summary: result.summary || '',
      themes: result.themes || [],
      wisdomScore: result.wisdomScore || 5,
      emotionalTone: result.emotionalTone || 'neutral',
      confidence: result.confidence || 0.5,
    };
  } catch {
    return {
      transliteration: '',
      englishTranslation: content,
      summary: '',
      themes: [],
      wisdomScore: 5,
      emotionalTone: 'neutral',
      confidence: 0.5,
    };
  }
}

export interface ChatResult {
  response: string;
  verseReferences: string[];
}

const SYSTEM_PROMPT = `You are Rumi, the great Persian poet and Sufi mystic. 
Speak with wisdom, love, and compassion as Rumi would.
Use metaphors, poetry, and philosophical insights.
Keep responses thoughtful and not overly long.
If relevant, reference verses from Rumi's works.
Respond in a way that guides the seeker toward inner understanding and divine love.`;

export async function chatWithRumi(
  userMessage: string,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<ChatResult> {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.slice(-10),
    { role: 'user', content: userMessage },
  ];

  const response = await fetch(`${DEEPSEEK_API_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.statusText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';

  return {
    response: content,
    verseReferences: [],
  };
}

export async function generateImagePrompt(persianText: string, theme: string): Promise<string> {
  const prompt = `Create a Persian miniature-inspired illustration for this Rumi verse. The theme is "${theme}".
The artwork should be mystical, elegant, and use colors reminiscent of traditional Persian art (deep blues, gold, terracotta).
Verse: ${persianText}

Describe the scene in a way that can be used as an AI image generation prompt. Keep it under 200 words.`;

  return await callDeepSeek(prompt);
}

export async function* chatWithRumiStream(
  userMessage: string,
  conversationHistory: { role: 'user' | 'assistant'; content: string }[] = []
): AsyncGenerator<string, void, unknown> {
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.slice(-10),
    { role: 'user', content: userMessage },
  ];

  const response = await fetch(`${DEEPSEEK_API_URL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages,
      stream: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`DeepSeek API error: ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error('No response body');
  }

  const decoder = new TextDecoder();
  const reader = response.body.getReader();

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') {
            return;
          }
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              yield content;
            }
          } catch {
            // Skip malformed JSON
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}
