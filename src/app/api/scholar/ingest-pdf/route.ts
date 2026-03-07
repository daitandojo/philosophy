import { NextRequest, NextResponse } from 'next/server';
import { generateEmbedding } from '@/lib/services/openai';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface VerseChunk {
  id: string;
  persianText: string;
  englishTranslation?: string;
  themes?: string[];
  wisdomScore?: number;
  emotionalTone?: string;
}

async function analyzeChunk(text: string, chunkIndex: number, totalChunks: number): Promise<VerseChunk> {
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
          content: `You are an expert in Persian literature and Sufi poetry. 
Analyze this verse or passage:
1. Provide English translation
2. Identify key themes (max 3)
3. Assign wisdom score (1-10)
4. Identify emotional tone

Respond in JSON format:
{
  "englishTranslation": "translation",
  "themes": ["theme1", "theme2"],
  "wisdomScore": 8,
  "emotionalTone": "contemplative"
}`
        },
        {
          role: 'user',
          content: text
        }
      ],
      response_format: { type: 'json_object' },
    }),
  });

  const data = await response.json();
  const analysis = JSON.parse(data.choices?.[0]?.message?.content || '{}');

  return {
    id: `chunk-${chunkIndex}`,
    persianText: text,
    ...analysis,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pdfText, poet, sourceWork, chunkSize = 500 } = body;

    if (!pdfText) {
      return NextResponse.json({ 
        error: 'pdfText is required' 
      }, { status: 400 });
    }

    // Split text into chunks (by verses or paragraphs)
    // Simple splitting by newlines for now - in production use smarter chunking
    const rawChunks = pdfText
      .split(/\n\n+/)
      .map((c: string) => c.trim())
      .filter((c: string) => c.length > 20 && c.length < 2000);

    const analyzedChunks: VerseChunk[] = [];
    
    // Process chunks in batches to avoid rate limits
    const batchSize = 5;
    for (let i = 0; i < rawChunks.length; i += batchSize) {
      const batch = rawChunks.slice(i, i + batchSize);
      const results = await Promise.all(
        batch.map((chunk: string, idx: number) => analyzeChunk(chunk, i + idx, rawChunks.length))
      );
      analyzedChunks.push(...results);
      
      // Add small delay between batches
      if (i + batchSize < rawChunks.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Generate embeddings for each chunk
    const chunksWithEmbeddings = await Promise.all(
      analyzedChunks.map(async (chunk) => {
        const embedding = await generateEmbedding(chunk.persianText);
        return { ...chunk, embedding };
      })
    );

    // Save to database
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }

    const versesToInsert = chunksWithEmbeddings.map((chunk: VerseChunk) => ({
      persianText: chunk.persianText,
      englishTranslation: chunk.englishTranslation || '',
      philosopher: poet || 'Unknown',
      sourceWork: sourceWork || 'Unknown',
      themes: chunk.themes || [],
      wisdomScore: chunk.wisdomScore || 5,
      emotionalTone: chunk.emotionalTone || 'contemplative',
      tags: chunk.themes || [],
      status: 'pending_verification',
      createdAt: new Date(),
      source: 'manuscript-miner',
    }));

    const result = await db.collection('verses').insertMany(versesToInsert);

    return NextResponse.json({
      success: true,
      processedCount: result.insertedCount,
      totalChunks: rawChunks.length,
      message: `Successfully processed ${result.insertedCount} verses from the manuscript`,
    });
  } catch (error: any) {
    console.error('PDF ingestion error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to process PDF' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'pending_verification';
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');

    await connectDB();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }

    const verses = await db.collection('verses')
      .find({ status, source: { $in: ['manuscript-miner', 'calligrapher-lens'] } })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const total = await db.collection('verses').countDocuments({ 
      status,
      source: { $in: ['manuscript-miner', 'calligrapher-lens'] }
    });

    return NextResponse.json({
      verses,
      total,
      page,
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error('Get verses error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to fetch verses' 
    }, { status: 500 });
  }
}
