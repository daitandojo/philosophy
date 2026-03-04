import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://haelpers:Atlas15@haelpers-m0.lz3bcwm.mongodb.net/haelpers?retryWrites=true&w=1';

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

const videoSchema = new mongoose.Schema({
  youtubeId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  titleFa: { type: String },
  descriptionFa: { type: String },
  category: { type: String, default: 'educational' },
  philosopher: { type: String },
  duration: { type: String, default: '0:00' },
  thumbnailUrl: { type: String },
  submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  approved: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  tags: [{ type: String }],
}, { timestamps: true });

const Video = mongoose.models.Video || mongoose.model('Video', videoSchema);

async function seedVideos() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    let created = 0;
    let skipped = 0;

    for (const videoData of curatedVideos) {
      const existingVideo = await Video.findOne({ youtubeId: videoData.youtubeId });
      
      if (!existingVideo) {
        const video = new Video({
          ...videoData,
          thumbnailUrl: `https://img.youtube.com/vi/${videoData.youtubeId}/maxresdefault.jpg`,
        });
        await video.save();
        created++;
        console.log(`Created: ${videoData.title}`);
      } else {
        skipped++;
        console.log(`Skipped (exists): ${videoData.title}`);
      }
    }

    console.log(`\nSeeding complete! Created: ${created}, Skipped: ${skipped}`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding videos:', error);
    process.exit(1);
  }
}

seedVideos();
