import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { VideoModel } from '@/lib/models/video';

const curatedVideos = [
  {
    youtubeId: '7xcBDg2JYkg',
    title: 'Rumi - The Most Famous Sufi Poet in the World',
    description: 'An in-depth analysis of Rumi\'s life, poetic themes, literary contributions, and their significance in the context of Sufism and Persian literature.',
    category: 'sufism',
    philosopher: 'Rumi',
    duration: '58:00',
    featured: true,
    tags: ['Rumi', 'Sufism', 'Poetry', 'Mysticism', 'Persian Literature'],
  },
  {
    youtubeId: 'ieSn9zGXAmU',
    title: 'What Is Sufism? Islam and Mystical Experience',
    description: 'A comprehensive exploration of Sufism, the mystical dimension of Islam, and its philosophical foundations.',
    category: 'educational',
    philosopher: 'Multiple',
    duration: '1:23:59',
    featured: false,
    tags: ['Sufism', 'Islam', 'Mysticism', 'Philosophy', 'Religion'],
  },
  {
    youtubeId: '_xjD4uCReHA',
    title: 'The Heart of the Masnawi',
    description: 'Rumi scholar Feraidoon Mojadedi unlocks the profound wisdom of the Masnawi, Rumi\'s masterpiece.',
    category: 'educational',
    philosopher: 'Rumi',
    duration: '45:00',
    featured: false,
    tags: ['Rumi', 'Masnawi', 'Sufism', 'Education', 'Persian Poetry'],
  },
  {
    youtubeId: 'cNqJLisB4rE',
    title: 'At the Beloved\'s Court - Poem by Hafez of Shiraz',
    description: 'Maestro Mohammad Reza Shajarian performs this beautiful Tasnif based on Hafez\'s poetry.',
    category: 'poetry',
    philosopher: 'Hafez',
    duration: '8:30',
    featured: false,
    tags: ['Hafez', 'Poetry', 'Music', 'Persian Classical Music', 'Shajarian'],
  },
  {
    youtubeId: 'j2XAFDad1bE',
    title: 'Saadi Shirazi - Humanity (آدمیت)',
    description: 'A beautiful Persian poetry recitation with English subtitles showcasing Saadi\'s timeless wisdom on humanity.',
    category: 'poetry',
    philosopher: 'Saadi',
    duration: '4:15',
    featured: false,
    tags: ['Saadi', 'Poetry', 'Humanity', 'Persian Literature', 'Bilingual'],
  },
  {
    youtubeId: 'Wch6mm1R6u0',
    title: 'Saadi Shirazi - Omnipotent (پروردگار)',
    description: 'A profound Persian poem by Saadi about the divine, with English subtitles.',
    category: 'poetry',
    philosopher: 'Saadi',
    duration: '3:45',
    featured: false,
    tags: ['Saadi', 'Poetry', 'God', 'Persian Literature', 'Spirituality'],
  },
  {
    youtubeId: 'i6blXNVxF4w',
    title: 'Saadi\'s Bani Adam - Introduction',
    description: 'An introduction to one of the most famous poems of the Persian language, Bani Adam by Saadi.',
    category: 'poetry',
    philosopher: 'Saadi',
    duration: '28:43',
    featured: false,
    tags: ['Saadi', 'Bani Adam', 'Poetry', 'Persian Learning', 'Education'],
  },
  {
    youtubeId: 'zwyokoFO8oE',
    title: 'Bilingual Poem by Hafez in Farsi and English (Ghazal 17)',
    description: 'A beautiful ghazal by Hafez presented in both Persian and English for language learners.',
    category: 'poetry',
    philosopher: 'Hafez',
    duration: '5:30',
    featured: false,
    tags: ['Hafez', 'Ghazal', 'Persian', 'English', 'Translation'],
  },
  {
    youtubeId: 'Q749Pb8B-qU',
    title: 'Saadi - Death Alone Puts Out The Fire',
    description: 'A poignant Persian poetry reading by Saadi about mortality, with translation.',
    category: 'poetry',
    philosopher: 'Saadi',
    duration: '2:54',
    featured: false,
    tags: ['Saadi', 'Poetry', 'Death', 'Persian Literature', 'Philosophy'],
  },
  {
    youtubeId: 'BTzeGuHQV9I',
    title: 'A Persian Sonnet from Rumi - Read a Poem',
    description: 'A Persian sonnet from Rumi\'s Divan-I Kebir, performed by Iranian artists.',
    category: 'poetry',
    philosopher: 'Rumi',
    duration: '3:25',
    featured: false,
    tags: ['Rumi', 'Divan', 'Poetry', 'Persian', 'Classical'],
  },
  {
    youtubeId: 'h7snNFrl7cc',
    title: 'Hafez and Persian Poetry in Song',
    description: 'An exploration of how Hafez\'s poetry has been set to music throughout history, from the Oxford Lieder Festival.',
    category: 'music',
    philosopher: 'Hafez',
    duration: '45:00',
    featured: false,
    tags: ['Hafez', 'Music', 'Song', 'Persian Poetry', 'Classical'],
  },
  {
    youtubeId: 'wGgAtXdWkmM',
    title: 'The Sound of Persian Love Poetry',
    description: 'A collection of beautiful Persian love poetry recitations showcasing the lyrical nature of Persian literature.',
    category: 'poetry',
    philosopher: 'Multiple',
    duration: '10:00',
    featured: false,
    tags: ['Persian Poetry', 'Love', 'Rumi', 'Hafez', 'Saadi', 'Music'],
  },
];

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const results = [];
    for (const videoData of curatedVideos) {
      const existingVideo = await VideoModel.findOne({ youtubeId: videoData.youtubeId });
      
      if (!existingVideo) {
        const video = await VideoModel.create({
          ...videoData,
          thumbnailUrl: `https://img.youtube.com/vi/${videoData.youtubeId}/maxresdefault.jpg`,
          approved: true,
          views: 0,
          likes: 0,
        });
        results.push({ status: 'created', youtubeId: video.youtubeId });
      } else {
        results.push({ status: 'exists', youtubeId: videoData.youtubeId });
      }
    }

    return NextResponse.json({ 
      message: 'Videos seeded successfully', 
      results 
    });
  } catch (error) {
    console.error('Error seeding videos:', error);
    return NextResponse.json({ error: 'Failed to seed videos' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const count = await VideoModel.countDocuments();
    return NextResponse.json({ count });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to count videos' }, { status: 500 });
  }
}
