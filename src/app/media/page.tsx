'use client';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Chip,
  Stack,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  philosopher: string;
  thumbnail: string;
  category: 'lecture' | 'documentary' | 'short';
}

interface AudioItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  philosopher: string;
  type: 'tts' | 'podcast' | 'meditation';
}

const videos: VideoItem[] = [
  {
    id: '1',
    title: 'The Life of Rumi',
    description: 'A comprehensive documentary exploring the life and legacy of the great Sufi mystic.',
    duration: '45 min',
    philosopher: 'Rumi',
    thumbnail: '/images/rumi-doc.jpg',
    category: 'documentary',
  },
  {
    id: '2',
    title: 'Understanding Divine Love',
    description: 'Scholar Dr. Hussein Nasr explains the concept of divine love in Sufi philosophy.',
    duration: '25 min',
    philosopher: 'Seyyed Hossein Nasr',
    thumbnail: '/images/nasr-lecture.jpg',
    category: 'lecture',
  },
  {
    id: '3',
    title: 'The Poetry of Hafez',
    description: 'Exploring the mystical ghazals of Hafez and their hidden meanings.',
    duration: '15 min',
    philosopher: 'Hafez',
    thumbnail: '/images/hafez-short.jpg',
    category: 'short',
  },
  {
    id: '4',
    title: 'Introduction to Persian Philosophy',
    description: 'A lecture series covering the major philosophers of the Persian tradition.',
    duration: '60 min',
    philosopher: 'Multiple',
    thumbnail: '/images/philosophy-lecture.jpg',
    category: 'lecture',
  },
];

const audioItems: AudioItem[] = [
  {
    id: '1',
    title: 'Daily Wisdom - Love',
    description: 'A beautiful reading of Rumi quotes on divine love.',
    duration: '5 min',
    philosopher: 'Rumi',
    type: 'tts',
  },
  {
    id: '2',
    title: 'Philosopher of the Week: Hafez',
    description: 'Weekly podcast exploring the life and works of Hafez.',
    duration: '25 min',
    philosopher: 'Hafez',
    type: 'podcast',
  },
  {
    id: '3',
    title: 'Guided Meditation with Rumi',
    description: 'A peaceful meditation session inspired by Rumi\'s wisdom.',
    duration: '15 min',
    philosopher: 'Rumi',
    type: 'meditation',
  },
  {
    id: '4',
    title: 'Morning Reflection',
    description: 'Start your day with wisdom from Saadi.',
    duration: '8 min',
    philosopher: 'Saadi',
    type: 'tts',
  },
  {
    id: '5',
    title: 'Sufi Philosophy Explained',
    description: 'Deep dive into the philosophical concepts of Sufism.',
    duration: '30 min',
    philosopher: 'Ibn Arabi',
    type: 'podcast',
  },
];

export default function MediaPage() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Multimedia Library
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Experience Persian wisdom through audio and video
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} centered>
          <Tab icon={<OndemandVideoIcon />} iconPosition="start" label="Videos" />
          <Tab icon={<HeadphonesIcon />} iconPosition="start" label="Audio" />
          <Tab icon={<LibraryBooksIcon />} iconPosition="start" label="Immersive Reading" />
        </Tabs>
      </Box>

      {/* Videos Tab */}
      {tabValue === 0 && (
        <Box>
          <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
            <Chip label="All" color="primary" />
            <Chip label="Lectures" variant="outlined" />
            <Chip label="Documentaries" variant="outlined" />
            <Chip label="Short Videos" variant="outlined" />
          </Stack>

          <Grid container spacing={3}>
            {videos.map((video) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={video.id}>
                <Card sx={{ height: '100%' }}>
                  <CardActionArea>
                    <Box
                      sx={{
                        position: 'relative',
                        paddingTop: '56.25%',
                        bgcolor: 'grey.200',
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(135deg, #8b451320 0%, #2e4a3d20 100%)',
                        }}
                      >
                        <PlayCircleIcon sx={{ fontSize: 64, color: 'primary.main', opacity: 0.8 }} />
                      </Box>
                      <Chip
                        label={video.duration}
                        size="small"
                        sx={{ position: 'absolute', bottom: 8, right: 8, bgcolor: 'rgba(0,0,0,0.7)', color: 'white' }}
                      />
                    </Box>
                    <CardContent>
                      <Typography variant="h6" gutterBottom noWrap>
                        {video.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, minHeight: 40 }}>
                        {video.description}
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Chip label={video.philosopher} size="small" variant="outlined" />
                        <Chip label={video.category} size="small" />
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Audio Tab */}
      {tabValue === 1 && (
        <Box>
          <Stack direction="row" spacing={2} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
            <Chip label="All" color="primary" />
            <Chip label="TTS" variant="outlined" />
            <Chip label="Podcasts" variant="outlined" />
            <Chip label="Meditations" variant="outlined" />
          </Stack>

          <Grid container spacing={3}>
            {audioItems.map((audio) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={audio.id}>
                <Card sx={{ height: '100%' }}>
                  <CardActionArea>
                    <CardContent>
                      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <AudiotrackIcon sx={{ color: 'white', fontSize: 28 }} />
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" noWrap>
                            {audio.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {audio.duration} • {audio.philosopher}
                          </Typography>
                        </Box>
                        <IconButton color="primary">
                          <PlayCircleIcon />
                        </IconButton>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {audio.description}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <Chip label={audio.philosopher} size="small" variant="outlined" />
                        <Chip 
                          label={audio.type === 'tts' ? 'Text-to-Speech' : audio.type === 'podcast' ? 'Podcast' : 'Meditation'} 
                          size="small" 
                        />
                      </Stack>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Immersive Reading Tab */}
      {tabValue === 2 && (
        <Box>
          <Typography variant="h4" sx={{ mb: 3 }}>Immersive Reading Modes</Typography>
          
          <Grid container spacing={3}>
            {[
              {
                title: 'Focus Mode',
                description: 'Full-screen, distraction-free reading with customizable backgrounds.',
                icon: '📖',
              },
              {
                title: 'Bilingual View',
                description: 'Side-by-side Persian and English translation.',
                icon: '🌐',
              },
              {
                title: 'Trilingual View',
                description: 'Persian, transliteration, and English translation.',
                icon: '📚',
              },
              {
                title: 'Audio Sync',
                description: 'Text highlights as TTS plays, with word-by-word highlighting.',
                icon: '🎧',
              },
              {
                title: 'Atmospheric Reading',
                description: 'Ambient sounds like Persian gardens, meditation halls, or rain.',
                icon: '🌿',
              },
              {
                title: 'Study Mode',
                description: 'Text + commentary + annotations sidebar.',
                icon: '📝',
              },
            ].map((mode) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={mode.title}>
                <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)' } }}>
                  <CardContent sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h1" sx={{ mb: 2 }}>{mode.icon}</Typography>
                    <Typography variant="h6" gutterBottom>{mode.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {mode.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}
