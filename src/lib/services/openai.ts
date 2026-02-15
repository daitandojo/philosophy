const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';

export interface EmbeddingResult {
  embedding: number[];
  tokenCount: number;
}

export async function generateEmbedding(text: string): Promise<EmbeddingResult> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
    }),
  }).catch((err) => {
    throw new Error(`fetch failed: ${err.message}`);
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const data = await response.json();
  return {
    embedding: data.data[0].embedding,
    tokenCount: data.usage?.prompt_tokens || 0,
  };
}

export async function generateImage(prompt: string): Promise<string> {
  // Consistent 13th century Persian miniature style for Rumi
  const styleGuide = `13th century Persian miniature painting, Ilkhanate era art style, Rumi's mystical poetry illustration. Traditional miniature techniques: fine brushwork, intricate patterns, gold leaf accents. Color palette: lapis lazuli blue, gold leaf, terracotta, sage green, deep burgundy, ivory. Composition: central spiritual motif with decorative border patterns. Atmosphere: mystical, contemplative, ethereal glow, heavenly light rays. Avoid: modern elements, western art styles, bright neon colors, photography.`;

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
      size: '1024x1024',
      quality: 'standard',
    }),
  }).catch((err) => {
    throw new Error(`Image fetch failed: ${err.message}`);
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI image error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  return data.data[0].url;
}

export async function generateSpeech(text: string, voice: string = 'alloy'): Promise<ArrayBuffer> {
  const response = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'tts-1-hd',
      voice: voice,
      input: text,
      response_format: 'mp3',
    }),
  }).catch((err) => {
    throw new Error(`OpenAI TTS fetch failed: ${err.message}`);
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI TTS error: ${response.status} - ${errorText}`);
  }

  return response.arrayBuffer();
}

export async function checkOpenAIHealth(): Promise<{ healthy: boolean; message: string }> {
  try {
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
    });
    
    if (response.ok) {
      return { healthy: true, message: 'OpenAI API connected' };
    }
    return { healthy: false, message: `OpenAI API error: ${response.statusText}` };
  } catch (error) {
    return { healthy: false, message: `OpenAI error: ${error instanceof Error ? error.message : 'Unknown'}` };
  }
}
