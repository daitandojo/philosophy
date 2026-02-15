'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ChatIcon from '@mui/icons-material/Chat';
import SchoolIcon from '@mui/icons-material/School';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VerseCard from '@/components/VerseCard';
import HeroImage from '@/components/HeroImage';
import SplashScreen from '@/components/SplashScreen';
import type { Verse } from '@/types';

const features = [
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 40 }} />,
    title: 'Explore the Poetry',
    description: 'Browse Rumi\'s timeless verses with Persian text, transliterations, and AI-powered translations.',
    href: '/explore',
  },
  {
    icon: <ChatIcon sx={{ fontSize: 40 }} />,
    title: 'Chat with Rumi',
    description: 'Experience an AI-powered conversation in the spirit of Rumi\'s wisdom and philosophy.',
    href: '/chat',
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    title: 'Guided Learning',
    description: 'Follow structured learning paths designed for beginners to advanced scholars.',
    href: '/learn',
  },
];

const sampleVerses: Verse[] = [
  {
    _id: '1',
    persianText: 'ای陌生人، تو خود را بشناس، خود را، آنجا که عشق آغاز می‌شود، تو را صدا می‌زنند.',
    transliteration: 'Ey Gharib, to khod ra beshnas, khod ra, anja ke ’eshq aghaz mishavad, to ra seda mizanand.',
    englishTranslation: 'O stranger, know yourself. Where love begins, there you will be called.',
    summary: 'Rumi speaks of self-knowledge as the pathway to divine love. The journey inward leads to the source of all being.',
    sourceWork: 'Masnavi',
    themes: ['Self-knowledge', 'Love', 'Divine'],
    wisdomScore: 9,
    complexity: 7,
    tags: ['wisdom', 'love', 'spiritual'],
    versions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '2',
    persianText: 'آنچه را می‌جویی، تو خودی. از خود بیرون نرو؛ درون خود فرورو و همه چیز را بیاب.',
    transliteration: 'Anj ra ke juyi, to khodi. Az khod biroon naro; darun khod fururo va hame chiz ra beyaab.',
    englishTranslation: 'What you seek is you yourself. Do not go outside; descend into yourself and find everything.',
    summary: 'Rumi emphasizes that true wisdom lies within us. The search for meaning should be an inward journey.',
    sourceWork: 'Masnavi',
    themes: ['Self-discovery', 'Inner journey', 'Wisdom'],
    wisdomScore: 10,
    complexity: 6,
    tags: ['wisdom', 'spiritual', 'journey'],
    versions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: '3',
    persianText: 'در طلبِ وصالِ یار، هر دم بکش جان را، که این نفس، تمامِ هستیِ من است.',
    transliteration: 'Dar talab-e visal-e yar, har dam bokash jan ra, ke in nafas, tamam-e hasti-e man ast.',
    englishTranslation: 'In longing for the beloved, sacrifice your soul each moment, for this breath is the entirety of my existence.',
    summary: 'Rumi expresses the intensity of divine longing, where each breath is an offering to the beloved.',
    sourceWork: 'Divan-e Shams',
    themes: ['Love', 'Longing', 'Sufism'],
    wisdomScore: 9,
    complexity: 8,
    tags: ['love', 'passion', 'divine'],
    versions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSplash, setShowSplash] = useState(true);

  return (
    <Box>
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 8, md: 12 },
          mb: 6,
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.05) 0%, rgba(201, 169, 98, 0.1) 100%)',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(135deg, #8b4513 0%, #2e4a3d 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Welcome to the World of Rumi
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                Explore the timeless wisdom of Jalāl ad-Din Muhammad Rūmī through AI-powered translations, 
                interactive learning, and deep philosophical conversations.
              </Typography>
              
              <TextField
                fullWidth
                placeholder="Search verses, themes, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(139, 69, 19, 0.2)',
                    },
                  },
                }}
                sx={{ mb: 3 }}
              />

              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/explore"
                  endIcon={<ArrowForwardIcon />}
                  sx={{ px: 4 }}
                >
                  Explore Verses
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  href="/chat"
                  startIcon={<ChatIcon />}
                  sx={{ px: 4 }}
                >
                  Chat with Rumi
                </Button>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <HeroImage />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
          Experience Rumi Like Never Before
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid size={{ xs: 12, md: 4 }} key={feature.href}>
              <Card
                component={Link}
                href={feature.href}
                sx={{
                  height: '100%',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 32px rgba(139, 69, 19, 0.15)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Verses */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3">
            Featured Verses
          </Typography>
          <Button
            component={Link}
            href="/explore"
            endIcon={<ArrowForwardIcon />}
          >
            View All
          </Button>
        </Box>
        
        <Stack spacing={2}>
          {sampleVerses.map((verse) => (
            <VerseCard key={verse._id} verse={verse} showDetails={false} />
          ))}
        </Stack>
      </Container>

      {/* Themes Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Explore by Theme
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Love', 'Wisdom', 'Divine', 'Self-knowledge', 'Journey', 'Friendship', 'Peace', 'Transformation'].map((theme) => (
            <Chip
              key={theme}
              label={theme}
              component={Link}
              href={`/explore?theme=${theme}`}
              clickable
              sx={{
                px: 2,
                py: 3,
                fontSize: '1rem',
                bgcolor: 'rgba(46, 74, 61, 0.1)',
                color: 'secondary.main',
                '&:hover': {
                  bgcolor: 'rgba(46, 74, 61, 0.2)',
                },
              }}
            />
          ))}
        </Box>
      </Container>

      {/* Call to Action */}
      <Box
        sx={{
          py: 8,
          background: 'linear-gradient(135deg, #2e4a3d 0%, #3d6b52 100%)',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ mb: 2, color: 'white' }}>
            Begin Your Journey
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, color: 'rgba(255,255,255,0.8)' }}>
            Join thousands of seekers exploring Rumi's timeless wisdom.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              component={Link}
              href="/explore"
              sx={{
                bgcolor: 'white',
                color: 'secondary.main',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.9)',
                },
              }}
            >
              Start Exploring
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
