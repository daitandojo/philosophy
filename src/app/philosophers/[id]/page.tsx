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
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { useState } from 'react';
import { getPhilosopherById, eraLabels, eraColors } from '@/lib/philosophers';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function PhilosopherDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const philosopher = getPhilosopherById(id);
  const [tabValue, setTabValue] = useState(0);

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

  const biography = {
    earlyLife: `Born in 1207 in the ancient city of Balkh (in present-day Afghanistan), ${philosopher.name.english} came from a family of prominent scholars.`,
    majorEvents: 'A transformative meeting with a wandering dervish sparked a profound spiritual awakening.',
    legacy: `His teachings have influenced millions across the centuries and continue to resonate with seekers today.`,
  };

  const influences = {
    influencedBy: ['Sanai', 'Attar of Nishapur', 'Ibn Arabi'],
    influenced: ['Hafez', 'Jami', 'All subsequent Persian mystics'],
  };

  const sampleQuotes = [
    { text: 'بیا تا برایت ببینیم', translation: 'Come, let us see for you...', source: 'Masnavi' },
    { text: 'اینکه می‌جویی، تو خودی', translation: 'What you seek is you yourself', source: 'Masnavi' },
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

      {/* Tabs Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} variant="scrollable" scrollButtons="auto">
            <Tab icon={<HistoryEduIcon />} iconPosition="start" label="Overview" />
            <Tab icon={<ArticleIcon />} iconPosition="start" label="Biography" />
            <Tab icon={<MenuBookIcon />} iconPosition="start" label="Works" />
            <Tab icon={<AutoStoriesIcon />} iconPosition="start" label="Quotes" />
            <Tab icon={<PeopleIcon />} iconPosition="start" label="Relationships" />
          </Tabs>
        </Box>

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
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
        </TabPanel>

        {/* Biography Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Early Life</Typography>
              <Typography variant="body1" paragraph>
                {biography.earlyLife}
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>Major Events</Typography>
              <Typography variant="body1" paragraph>
                {biography.majorEvents}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Legacy</Typography>
              <Typography variant="body1" paragraph>
                {biography.legacy}
              </Typography>
              <Card sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Timeline</Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Chip label={philosopher.life.birth} size="small" color="primary" />
                      <Typography variant="body2">Born in {philosopher.life.birthPlace}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Chip label={philosopher.life.death} size="small" color="secondary" />
                      <Typography variant="body2">Passed in {philosopher.life.deathPlace}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Works Tab */}
        <TabPanel value={tabValue} index={2}>
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
        </TabPanel>

        {/* Quotes Tab */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h4" sx={{ mb: 2 }}>Featured Quotes</Typography>
          <Stack spacing={2}>
            {sampleQuotes.map((quote, index) => (
              <Card key={index}>
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
                    {quote.text}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    "{quote.translation}"
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    — {quote.source}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
          <Button
            component={Link}
            href={`/explore?philosopher=${philosopher.id}`}
            startIcon={<AutoStoriesIcon />}
            sx={{ mt: 2 }}
          >
            View All Quotes
          </Button>
        </TabPanel>

        {/* Relationships Tab */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Influenced By</Typography>
              <Stack spacing={1}>
                {influences.influencedBy.map((name) => (
                  <Card key={name}>
                    <CardContent sx={{ py: 1.5 }}>
                      <Stack direction="row" alignItems="center" gap={2}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.875rem',
                          }}
                        >
                          {name.charAt(0)}
                        </Box>
                        <Button variant="text" component={Link} href={`/philosophers/${name.toLowerCase().replace(/[^a-z]/g, '-')}`}>
                          {name}
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Influenced</Typography>
              <Stack spacing={1}>
                {influences.influenced.map((name) => (
                  <Card key={name}>
                    <CardContent sx={{ py: 1.5 }}>
                      <Stack direction="row" alignItems="center" gap={2}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: 'secondary.main',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.875rem',
                          }}
                        >
                          {name.charAt(0)}
                        </Box>
                        <Button variant="text" component={Link} href={`/philosophers/${name.toLowerCase().replace(/[^a-z]/g, '-')}`}>
                          {name}
                        </Button>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Box>
  );
}
