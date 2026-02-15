const PINECONE_API_KEY = process.env.PINECONE_API_KEY || '';
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME || 'rumi';
const PINECONE_ENV = process.env.PINECONE_ENV || 'us-east-1';

interface VectorMatch {
  id: string;
  score: number;
  metadata: {
    persianText?: string;
    englishTranslation?: string;
    theme?: string;
    sourceWork?: string;
  };
}

export async function upsertVectors(
  vectors: { id: string; values: number[]; metadata: Record<string, any> }[]
): Promise<void> {
  if (!PINECONE_API_KEY) {
    throw new Error('Pinecone API key not configured');
  }
  
  const response = await fetch(
    `https://${PINECONE_INDEX_NAME}-${PINECONE_ENV}.svc.pinecone.io/vectors/upsert`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': PINECONE_API_KEY,
      },
      body: JSON.stringify({
        vectors,
        namespace: 'verses',
      }),
    }
  ).catch((err) => {
    throw new Error(`Pinecone fetch failed: ${err.message}`);
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Pinecone upsert error: ${response.status} - ${errorText}`);
  }
}

export async function queryVectors(
  embedding: number[],
  topK: number = 5,
  filter?: Record<string, any>
): Promise<VectorMatch[]> {
  const response = await fetch(
    `https://${PINECONE_INDEX_NAME}-${PINECONE_ENV}.svc.pinecone.io/query`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': PINECONE_API_KEY,
      },
      body: JSON.stringify({
        vector: embedding,
        topK,
        namespace: 'verses',
        includeMetadata: true,
        filter,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Pinecone query error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.matches || [];
}

export async function deleteVectors(ids: string[]): Promise<void> {
  const response = await fetch(
    `https://${PINECONE_INDEX_NAME}-${PINECONE_ENV}.svc.pinecone.io/vectors/delete`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': PINECONE_API_KEY,
      },
      body: JSON.stringify({
        ids,
        namespace: 'verses',
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Pinecone delete error: ${response.statusText}`);
  }
}

export async function checkPineconeHealth(): Promise<{ healthy: boolean; message: string }> {
  try {
    const response = await fetch(
      `https://${PINECONE_INDEX_NAME}-${PINECONE_ENV}.svc.pinecone.io/describe_index`,
      {
        headers: {
          'Api-Key': PINECONE_API_KEY,
        },
      }
    );
    
    if (response.ok) {
      return { healthy: true, message: 'Pinecone connected' };
    }
    return { healthy: false, message: `Pinecone error: ${response.statusText}` };
  } catch (error) {
    return { healthy: false, message: `Pinecone error: ${error instanceof Error ? error.message : 'Unknown'}` };
  }
}
