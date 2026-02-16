'use client';
import { use } from 'react';
import Link from 'next/link';
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
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HistoryIcon from '@mui/icons-material/History';

interface PageProps {
  params: Promise<{ id: string }>;
}

const worksData: Record<string, {
  id: string;
  title: string;
  persianTitle: string;
  philosopher: string;
  year: string;
  type: string;
  description: string;
  significance: string;
  chapters: { title: string; verses?: number }[];
}> = {
  'masnavi': {
    id: 'masnavi',
    title: 'Masnavi',
    persianTitle: ' مثنوی معنوی',
    philosopher: 'Rumi',
    year: '1260-1273',
    type: 'Poetry',
    description: 'The Masnavi is a poetic collection of spiritual lessons and mystical tales. It consists of six books containing approximately 25,000 verses.',
    significance: 'Considered the "Koran in Persian" - the most important work of Sufi literature',
    chapters: [
      { title: 'Book 1: The Man and the Bird', verses: 500 },
      { title: 'Book 2: The King and the Handmaiden', verses: 600 },
      { title: 'Book 3: The Mysterious House', verses: 400 },
      { title: 'Book 4: The Three Fish', verses: 450 },
      { title: 'Book 5: The Ascension', verses: 550 },
      { title: 'Book 6: The Epilogue', verses: 400 },
    ],
  },
  'divan-e-shams': {
    id: 'divan-e-shams',
    title: 'Divan-e Shams',
    persianTitle: 'دیوان شمس',
    philosopher: 'Rumi',
    year: '1240s',
    type: 'Poetry',
    description: 'A collection of ghazals written in honor of Shams Tabrizi, Rumi\'s spiritual teacher and beloved friend.',
    significance: 'Contains some of the most beautiful mystical poetry ever written',
    chapters: [
      { title: 'Ghazal 1-100' },
      { title: 'Ghazal 101-200' },
      { title: 'Ghazal 201-300' },
      { title: 'Ghazal 301-400' },
    ],
  },
  'gulistan': {
    id: 'gulistan',
    title: 'Gulistan',
    persianTitle: 'گلستان',
    philosopher: 'Saadi',
    year: '1258',
    type: 'Prose & Poetry',
    description: 'The Rose Garden - a collection of stories and poetry dealing with moral conduct, governance, and Sufi mysticism.',
    significance: 'One of the most influential works of Persian literature',
    chapters: [
      { title: 'Chapter 1: The Attributes of Kings' },
      { title: 'Chapter 2: On the Ethics of Dervishes' },
      { title: 'Chapter 3: On the Excellence of Contentment' },
      { title: 'Chapter 4: On the Advantages of Silence' },
      { title: 'Chapter 5: On Love and Youth' },
      { title: 'Chapter 6: On Old Age' },
      { title: 'Chapter 7: On the Education of Youth' },
      { title: 'Chapter 8: On the Methods of Guiding' },
    ],
  },
};

export default function WorkDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const work = worksData[id];

  if (!work) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button component={Link} href="/philosophers" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
          Back to Philosophers
        </Button>
        <Typography variant="h4">Work not found</Typography>
      </Container>
    );
  }

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

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label={work.type} color="primary" />
                <Chip label={work.year} variant="outlined" />
              </Stack>

              <Typography variant="h2" sx={{ mb: 1 }}>
                {work.title}
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Vazir", serif',
                  direction: 'rtl',
                  color: 'text.secondary',
                  mb: 2,
                }}
              >
                {work.persianTitle}
              </Typography>

              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                by <Link href={`/philosophers/${work.philosopher.toLowerCase()}`} style={{ color: 'inherit' }}>{work.philosopher}</Link>
              </Typography>

              <Typography variant="body1" sx={{ mb: 3, maxWidth: 600 }}>
                {work.description}
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AutoStoriesIcon />}
                  component={Link}
                  href={`/explore?work=${work.id}`}
                >
                  Read Quotes
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<MenuBookIcon />}
                >
                  Full Text (Premium)
                </Button>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    <HistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Significance
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {work.significance}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Chapters Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Chapters / Sections</Typography>
        <Grid container spacing={2}>
          {work.chapters.map((chapter, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {chapter.title}
                  </Typography>
                  {chapter.verses && (
                    <Typography variant="body2" color="text.secondary">
                      ~{chapter.verses} verses
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
