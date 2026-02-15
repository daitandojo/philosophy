import { NextRequest, NextResponse } from 'next/server';
import { generateSpeech } from '@/lib/services/openai';

const VOICE_MAP: Record<string, string> = {
  english: 'alloy',
  persian: 'onyx',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, voiceType = 'english' } = body;

    console.log('[TTS] Request:', { text: text?.substring(0, 50), voiceType });

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const voice = VOICE_MAP[voiceType] || 'alloy';
    console.log('[TTS] Using voice:', voice);
    
    const audioBuffer = await generateSpeech(text, voice);
    console.log('[TTS] Generated audio, size:', audioBuffer.byteLength);

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.byteLength.toString(),
        'Content-Disposition': 'inline; filename="speech.mp3"',
      },
    });
  } catch (error: any) {
    console.error('[TTS] Error:', error.message);
    return NextResponse.json({ error: error.message || 'Failed to generate speech' }, { status: 500 });
  }
}
