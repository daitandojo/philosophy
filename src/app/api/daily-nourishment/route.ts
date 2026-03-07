import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

async function generateDailyVerse(userInterests?: string[]) {
  // In production, this would query the database for relevant verses
  // based on user's reading history using Pinecone similarity search
  
  const sampleVerses = [
    {
      id: 'v1',
      persianText: 'ای صوفی، ببخشای و ببخش، که رحم تو بر غیر خود نیز گسترده شده است',
      englishTranslation: 'O Sufi, forgive and pardon, for your mercy extends beyond yourself',
      philosopher: 'Rumi',
      source: 'Masnavi',
    },
    {
      id: 'v2',
      persianText: 'هر که را به یقین رسیده‌ست، بی‌نیاز از کس شده‌ست',
      englishTranslation: 'Whoever has reached certainty has become independent of everyone',
      philosopher: 'Hafez',
      source: 'Divan-e Hafez',
    },
    {
      id: 'v3',
      persianText: 'دانش بی‌عمل، درختی است بی‌برگ',
      englishTranslation: 'Knowledge without action is a tree without leaves',
      philosopher: 'Saadi',
      source: 'Golestan',
    },
  ];

  const randomVerse = sampleVerses[Math.floor(Math.random() * sampleVerses.length)];

  // Generate philosophical context using LLM
  try {
    const response = await fetch(`${process.env.DEEPSEEK_API_URL}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { 
            role: 'system', 
            content: 'You are a wise philosophical counselor. Provide a brief, thoughtful reflection (2-3 sentences) on a verse from Persian philosophy. Do not mention prophets or religious figures. Focus on wisdom and insight.' 
          },
          { 
            role: 'user', 
            content: `Provide a reflection on this verse: "${randomVerse.persianText}" - ${randomVerse.englishTranslation}` 
          }
        ],
        stream: false,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const reflection = data.choices?.[0]?.message?.content;
      return { ...randomVerse, reflection };
    }
  } catch (error) {
    console.error('Failed to generate reflection:', error);
  }

  return { 
    ...randomVerse, 
    reflection: 'This verse invites us to contemplate the nature of mercy and forgiveness, extending beyond ourselves to all of existence.' 
  };
}

function generateEmailHTML(verse: any) {
  return `
<!DOCTYPE html>
<html dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Daily Nourishment from Hikmatia</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;700&display=swap');
    
    body {
      font-family: 'Vazirmatn', Tahoma, Arial, sans-serif;
      background: linear-gradient(135deg, #0d1f18 0%, #1a332a 100%);
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
    }
    .logo {
      font-size: 28px;
      font-weight: 300;
      color: #c9a962;
      letter-spacing: 4px;
    }
    .tagline {
      color: rgba(201, 169, 98, 0.6);
      font-size: 12px;
      letter-spacing: 2px;
      margin-top: 8px;
    }
    .verse-card {
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(201, 169, 98, 0.2);
      border-radius: 16px;
      padding: 32px;
      margin: 24px 0;
    }
    .persian-text {
      font-size: 24px;
      color: #c9a962;
      text-align: center;
      line-height: 2;
      margin-bottom: 20px;
      font-weight: 300;
    }
    .english-text {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.8);
      text-align: center;
      line-height: 1.8;
      font-style: italic;
    }
    .source {
      text-align: center;
      margin-top: 20px;
      color: rgba(201, 169, 98, 0.6);
      font-size: 14px;
    }
    .reflection {
      background: rgba(201, 169, 98, 0.05);
      border-left: 3px solid #c9a962;
      padding: 20px;
      margin-top: 24px;
      border-radius: 0 8px 8px 0;
    }
    .reflection-label {
      color: #c9a962;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .reflection-text {
      color: rgba(255, 255, 255, 0.85);
      font-size: 15px;
      line-height: 1.8;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #c9a962 0%, #a3864d 100%);
      color: #0d1f18;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 8px;
      font-weight: 500;
      margin-top: 32px;
    }
    .footer {
      text-align: center;
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid rgba(201, 169, 98, 0.1);
    }
    .footer-text {
      color: rgba(255, 255, 255, 0.4);
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">حکمتیا</div>
      <div class="tagline">DAILY NOURISHMENT</div>
    </div>

    <div class="verse-card">
      <div class="persian-text">${verse.persianText}</div>
      <div class="english-text">${verse.englishTranslation}</div>
      <div class="source">— ${verse.philosopher}, ${verse.source}</div>
    </div>

    <div class="reflection">
      <div class="reflection-label">Philosophical Reflection</div>
      <div class="reflection-text">${verse.reflection}</div>
    </div>

    <div style="text-align: center;">
      <a href="https://hikmatia.vercel.app" class="cta-button">Listen Now →</a>
    </div>

    <div class="footer">
      <div class="footer-text">
        Hikmatia — The Living Library of Persian Wisdom<br>
        Transforming the world, one verse at a time.
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userEmail, userInterests } = body;

    if (!userEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Generate daily verse
    const verse = await generateDailyVerse(userInterests);
    
    // Generate HTML email
    const emailHTML = generateEmailHTML(verse);

    // In production, this would send the email using a service like Resend, SendGrid, etc.
    // For now, we return the email content
    console.log(`Would send daily verse to: ${userEmail}`);

    return NextResponse.json({
      success: true,
      verse,
      previewHTML: emailHTML,
    });
  } catch (error) {
    console.error('Daily nourishment error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate daily nourishment' 
    }, { status: 500 });
  }
}

// This endpoint can be called by Vercel Cron
export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    
    // In production:
    // 1. Get all subscribed users from MongoDB
    // 2. For each user, get their reading history
    // 3. Generate personalized verse using Pinecone similarity
    // 4. Send email via Resend/SendGrid
    
    // For now, return success
    return NextResponse.json({
      success: true,
      message: 'Daily nourishment cron completed',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Daily nourishment cron error:', error);
    return NextResponse.json({ 
      error: 'Failed to run daily nourishment' 
    }, { status: 500 });
  }
}
