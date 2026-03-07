import { NextRequest, NextResponse } from 'next/server';
import { generateEmbedding } from '@/lib/services/openai';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const GOOGLE_VISION_API_KEY = process.env.GOOGLE_VISION_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageUrl, imageBase64 } = body;

    if (!imageUrl && !imageBase64) {
      return NextResponse.json({ 
        error: 'imageUrl or imageBase64 is required' 
      }, { status: 400 });
    }

    let visionResult;
    
    if (imageBase64) {
      // Use Google Cloud Vision API for OCR
      const visionResponse = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requests: [{
              image: { content: imageBase64 },
              features: [{ type: 'TEXT_DETECTION', languageHints: ['fa', 'ar'] }],
            }],
          }),
        }
      );

      if (!visionResponse.ok) {
        throw new Error(`Vision API error: ${visionResponse.statusText}`);
      }

      visionResult = await visionResponse.json();
    } else {
      // Use URL-based Vision API
      const visionResponse = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requests: [{
              image: { source: { imageUri: imageUrl } },
              features: [{ type: 'TEXT_DETECTION', languageHints: ['fa', 'ar'] }],
            }],
          }),
        }
      );

      if (!visionResponse.ok) {
        throw new Error(`Vision API error: ${visionResponse.statusText}`);
      }

      visionResult = await visionResponse.json();
    }

    const rawPersianText = visionResult.responses?.[0]?.textAnnotations?.[0]?.description || '';

    if (!rawPersianText) {
      return NextResponse.json({ 
        error: 'No text detected in image' 
      }, { status: 400 });
    }

    // Use LLM to analyze and correct the text
    const analysisResponse = await fetch(`${process.env.DEEPSEEK_API_URL}/v1/chat/completions`, {
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
            content: `You are an expert in Persian literature and calligraphy. 
Analyze this extracted Persian text:
1. Correct any OCR errors
2. Identify the poet if possible
3. Translate to English
4. Extract key philosophical themes
5. Identify the source/work if known

Respond in this exact JSON format:
{
  "correctedPersian": "the corrected Persian text",
  "poet": "poet name or unknown",
  "englishTranslation": "English translation",
  "themes": ["theme1", "theme2"],
  "source": "source work or unknown",
  "confidence": 0.0-1.0
}`
          },
          {
            role: 'user',
            content: rawPersianText
          }
        ],
        response_format: { type: 'json_object' },
      }),
    });

    if (!analysisResponse.ok) {
      throw new Error(`Analysis error: ${analysisResponse.statusText}`);
    }

    const analysisData = await analysisResponse.json();
    const analysis = JSON.parse(analysisData.choices?.[0]?.message?.content || '{}');

    // Generate embedding for the corrected text
    const embedding = await generateEmbedding(analysis.correctedPersian || rawPersianText);

    return NextResponse.json({
      success: true,
      rawText: rawPersianText,
      analysis: {
        ...analysis,
        originalText: rawPersianText,
      },
      embedding,
      status: 'pending_verification',
    });
  } catch (error: any) {
    console.error('Image ingestion error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to process image' 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { verseData, action } = body; // action: 'approve', 'reject', 'edit'

    if (!verseData || !action) {
      return NextResponse.json({ 
        error: 'verseData and action are required' 
      }, { status: 400 });
    }

    if (action === 'reject') {
      return NextResponse.json({ success: true, message: 'Verse rejected' });
    }

    // Save to database
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection not established');
    }

    const verse = {
      persianText: verseData.correctedPersian || verseData.correctedText,
      englishTranslation: verseData.englishTranslation,
      philosopher: verseData.poet,
      sourceWork: verseData.source,
      themes: verseData.themes || [],
      wisdomScore: verseData.confidence * 10 || 5,
      emotionalTone: verseData.themes?.[0] || 'contemplative',
      tags: verseData.themes || [],
      status: 'verified',
      createdAt: new Date(),
      source: 'calligrapher-lens',
    };

    const result = await db.collection('verses').insertOne(verse);

    // Also save to Pinecone
    // (In production, you'd upsert to Pinecone here)

    return NextResponse.json({ 
      success: true, 
      verseId: result.insertedId,
      message: action === 'approve' ? 'Verse approved and saved' : 'Verse saved with edits'
    });
  } catch (error: any) {
    console.error('Save verse error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to save verse' 
    }, { status: 500 });
  }
}
