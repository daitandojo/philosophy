import { NextRequest, NextResponse } from 'next/server';

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'rumi';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function getEmbedding(text: string): Promise<number[]> {
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
  });

  if (!response.ok) {
    throw new Error(`OpenAI embedding error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

async function queryPinecone(embedding: number[], topK: number = 3) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Api-Key': PINECONE_API_KEY || '',
  };
  
  const response = await fetch('https://rumi-pinecone-index.svc.us-east-1-aws.pinecone.io/query', {
    method: 'POST',
    headers: headers as any,
    body: JSON.stringify({
      vector: embedding,
      topK,
      includeMetadata: true,
      namespace: 'verses',
    }),
  });

  if (!response.ok) {
    throw new Error(`Pinecone query error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.matches || [];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userState, userQuery } = body;

    if (!userState && !userQuery) {
      return NextResponse.json({ 
        error: 'userState or userQuery is required' 
      }, { status: 400 });
    }

    const searchText = userQuery || userState;
    
    // Get embedding for the user's state/query
    const embedding = await getEmbedding(searchText);
    
    // Query Pinecone for relevant verses
    const matches = await queryPinecone(embedding, 3);
    
    // Extract relevant verses
    const verses = matches.map((match: any) => ({
      id: match.id,
      persianText: match.metadata?.persianText || '',
      englishTranslation: match.metadata?.englishTranslation || '',
      philosopher: match.metadata?.philosopher || '',
      source: match.metadata?.source || '',
      score: match.score,
    }));

    // Generate psychological analysis using LLM
    const analysisPrompt = `You are a wise philosophical counselor. The user has expressed: "${searchText}"

Based on the following verses from Persian philosophy, provide a thoughtful psychological reflection that helps the user see the wisdom in their current emotional state. DO NOT predict the future or mention specific religious figures. Focus on philosophical insight.

Relevant Verses:
${verses.map((v: any, i: number) => `${i + 1}. "${v.persianText}" - ${v.englishTranslation} (${v.philosopher})`).join('\n')}

Provide a brief reflection (2-3 sentences) that mirrors their state and offers philosophical perspective.`;

    const analysisResponse = await fetch(`${process.env.DEEPSEEK_API_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are a philosophical counselor specializing in Persian wisdom. Provide thoughtful, non-predictive reflections.' },
          { role: 'user', content: analysisPrompt },
        ],
        stream: false,
      }),
    });

    const analysisData = await analysisResponse.json();
    const reflection = analysisData.choices?.[0]?.message?.content || 
      'The wisdom of the philosophers meets you where you are.';

    return NextResponse.json({
      userState: searchText,
      verses,
      reflection,
    });
  } catch (error: any) {
    console.error('Reflection error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to generate reflection' 
    }, { status: 500 });
  }
}
