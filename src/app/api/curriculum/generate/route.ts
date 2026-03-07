import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface CurriculumModule {
  title: string;
  philosopher_id: string;
  philosopher_name: string;
  complexity_score: number;
  verses_to_study: string[];
  description: string;
  estimated_time: string;
}

interface Curriculum {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  modules: CurriculumModule[];
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { topic, userLevel = 'beginner', interests = [] } = body;

    if (!topic) {
      return NextResponse.json({ 
        error: 'Topic is required' 
      }, { status: 400 });
    }

    const prompt = `Generate a structured learning curriculum about: "${topic}"

The user's level is: ${userLevel}
Their interests include: ${interests.join(', ') || 'general philosophy'}

Create a curriculum in this exact JSON format:
{
  "title": "Learning Path Title",
  "description": "Brief description of what the learner will achieve",
  "difficulty": "beginner" | "intermediate" | "advanced",
  "modules": [
    {
      "title": "Module Title",
      "philosopher_id": "philosopher-id",
      "philosopher_name": "Philosopher Name",
      "complexity_score": 1-5,
      "verses_to_study": ["verse_id_1", "verse_id_2"],
      "description": "What this module covers",
      "estimated_time": "e.g., 30 minutes"
    }
  ]
}

IMPORTANT: 
- Generate 4-6 modules maximum
- Ensure complexity_score increases progressively
- Use these philosopher IDs: rumi, hafez, saadi, attar, ibn-sina, ferdowsi, al-ghazali, mulla-sadra, ibn-arabi, suhrawardi
- verses_to_study should be placeholder IDs (actual verses would be looked up later)
- Return ONLY valid JSON, no other text
- Do NOT mention specific religious figures, prophets, or use superstitious language`;

    const response = await fetch(`${process.env.DEEPSEEK_API_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: 'You are an expert curriculum designer for Persian philosophy. Generate structured learning paths in exact JSON format.' },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek error: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    let curriculum: Curriculum;
    try {
      curriculum = JSON.parse(content);
    } catch {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        curriculum = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse curriculum JSON');
      }
    }

    return NextResponse.json(curriculum);
  } catch (error: any) {
    console.error('Curriculum generation error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to generate curriculum' 
    }, { status: 500 });
  }
}
