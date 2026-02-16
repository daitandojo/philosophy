'use client';
import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Tabs,
  Tab,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getPhilosopherById, eraLabels, eraColors } from '@/lib/philosophers';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PhilosopherDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const philosopher = getPhilosopherById(id);

  if (!philosopher) {
    notFound();
  }

  const works = [
    { title: 'The Masnavi', year: '1260-1273', type: 'Poetry', description: 'The spiritual masterpiece of 25,000 verses' },
    { title: 'Divan-e Shams', year: '1240s', type: 'Poetry', description: 'Collection of ghazals dedicated to Shams Tabrizi' },
    { title: 'Fihi Ma Fihi', year: '1240s', type: 'Prose', description: 'Discourses on spiritual matters' },
    { title: 'Maktubat', year: '1240s', type: 'Letters', description: 'Letters to disciples' },
  ];

  const keyTeachings = [
    'Divine Love as the fundamental force of existence',
    'The spiritual journey of the soul toward God',
    'The concept of annihilation (fana) and subsistence (baqa)',
    'The unity of all religions and paths to God',
    'Music and poetry as vehicles for spiritual transformation',
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(46, 74, 61, 0.1) 100%)',
          py: 6,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Button
            component={Link}
            href="/philosophers"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 3 }}
          >
            Back to Philosophers
          </Button>

          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8b4513 0%, #c9a962 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: '"Vazir", serif',
                    fontSize: '3rem',
                    color: 'white',
                  }}
                >
                  {philosopher.name.persian.slice(0, 1)}
                </Box>
                <Box>
                  <Typography variant="h2" sx={{ mb: 0.5 }}>
                    {philosopher.name.english}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Vazir", serif',
                      direction: 'rtl',
                      color: 'text.secondary',
                    }}
                  >
                    {philosopher.name.persian}
                  </Typography>
                </Box>
              </Box>

              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Chip label={eraLabels[philosopher.era]} color={eraColors[philosopher.era]} />
                {philosopher.school.map((s) => (
                  <Chip key={s} label={s} variant="outlined" />
                ))}
              </Stack>

              <Typography variant="body1" sx={{ mb: 3, maxWidth: 600 }}>
                {philosopher.description}
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ChatIcon />}
                  component={Link}
                  href={`/chat?philosopher=${philosopher.id}`}
                >
                  Chat with {philosopher.name.english.split(' ')[0]}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<AutoStoriesIcon />}
                  component={Link}
                  href={`/explore?philosopher=${philosopher.id}`}
                >
                  Browse Quotes
                </Button>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Quick Facts</Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Born</Typography>
                      <Typography variant="body1">{philosopher.life.birth}</Typography>
                      <Typography variant="body2" color="text.secondary">{philosopher.life.birthPlace}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Died</Typography>
                      <Typography variant="body1">{philosopher.life.death}</Typography>
                      <Typography variant="body2" color="text.secondary">{philosopher.life.deathPlace}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Quotes</Typography>
                      <Typography variant="h5">{philosopher.quoteCount}+</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Content Tabs */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            {/* Key Teachings */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>Key Teachings</Typography>
              <Stack spacing={2}>
                {keyTeachings.map((teaching, index) => (
                  <Card key={index}>
                    <CardContent>
                      <Typography variant="body1">{teaching}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Box>

            {/* Works */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ mb: 2 }}>Major Works</Typography>
              <Grid container spacing={2}>
                {works.map((work, index) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={index}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                          <Typography variant="h6">{work.title}</Typography>
                          <Chip label={work.type} size="small" />
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {work.year}
                        </Typography>
                        <Typography variant="body2">
                          {work.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Quotes Preview */}
            <Box>
              <Typography variant="h4" sx={{ mb: 2 }}>Popular Quotes</Typography>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: '"Vazir", serif',
                      direction: 'rtl',
                      fontSize: '1.2rem',
                      mb: 2,
                    }}
                  >
                    بیا تا برایت ببینیم
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    "Come, let us see for you..."
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    — Masnavi
                  </Typography>
                </CardContent>
              </Card>
              <Button
                component={Link}
                href={`/explore?philosopher=${philosopher.id}`}
                endIcon={<AutoStoriesIcon />}
              >
                View All Quotes
              </Button>
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  <PeopleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Influence
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Influenced by: Sanai, Attar
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Influenced: Hafez, Jami, all subsequent Persian mystics
                </Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  <ArticleIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Related
                </Typography>
                <Stack spacing={1}>
                  <Button variant="text" component={Link} href="/philosophers/hafez" size="small">
                    Hafez
                  </Button>
                  <Button variant="text" component={Link} href="/philosophers/saadi" size="small">
                    Saadi
                  </Button>
                  <Button variant="text" component={Link} href="/philosophers/attar" size="small">
                    Attar
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
