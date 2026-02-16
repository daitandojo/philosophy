'use client';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Button,
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ExploreIcon from '@mui/icons-material/Explore';
import Link from 'next/link';

const philosophers = [
  { name: 'Rumi', years: '1207-1273', role: 'Mystical Poet' },
  { name: 'Hafez', years: '1315-1390', role: 'Poet of Vision' },
  { name: 'Saadi', years: '1210-1291', role: 'Moral Philosopher' },
  { name: 'Attar', years: '1145-1232', role: 'Mystic Poet' },
  { name: 'Ibn Sina', years: '980-1037', role: 'Physician-Philosopher' },
  { name: 'Mulla Sadra', years: '1571-1640', role: 'Transcendent Theosophy' },
];

const coreValues = [
  { title: 'Timeless Wisdom', description: 'Explore insights from centuries of Persian philosophical thought.' },
  { title: 'Accessible Learning', description: 'AI-powered translations make ancient wisdom understandable to everyone.' },
  { title: 'Living Tradition', description: 'Connect these teachings to modern life and personal growth.' },
  { title: 'Inclusive Philosophy', description: 'All seekers welcome, regardless of background or belief.' },
];

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          mb: 6,
          p: 6,
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(46, 74, 61, 0.1) 100%)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Vazir", serif',
            mb: 2,
            color: 'primary.main',
          }}
        >
          حکمت
        </Typography>
        <Typography variant="h4" sx={{ color: 'text.secondary', mb: 2 }}>
          Persian Philosophy Platform
        </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
            Discover the timeless wisdom of Persia&apos;s greatest philosophers — Rumi, Hafez, Saadi, and more
          </Typography>
      </Box>

      {/* Core Values */}
      <Typography variant="h4" sx={{ mb: 3 }}>Our Mission</Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {coreValues.map((value, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Philosophers Overview */}
      <Typography variant="h4" sx={{ mb: 3 }}>The Philosophers</Typography>
      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
        Hikmat brings together wisdom from over a thousand years of Persian philosophical tradition:
      </Typography>
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {philosophers.map((philosopher, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PsychologyIcon />
                </Box>
                <Box>
                  <Typography variant="h6">{philosopher.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {philosopher.years} · {philosopher.role}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Call to Action */}
      <Box
        sx={{
          p: 6,
          textAlign: 'center',
          bgcolor: 'rgba(46, 74, 61, 0.05)',
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Begin Your Journey
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
          Explore verses, chat with AI-powered philosopher personas, or take our quiz to discover which philosopher resonates with you.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap>
          <Button variant="contained" size="large" component={Link} href="/philosophers" startIcon={<ExploreIcon />}>
            Explore Philosophers
          </Button>
          <Button variant="outlined" size="large" component={Link} href="/chat" startIcon={<AutoStoriesIcon />}>
            Chat with a Philosopher
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
