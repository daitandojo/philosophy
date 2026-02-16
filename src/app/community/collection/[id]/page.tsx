'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  Avatar,
  IconButton,
  Breadcrumbs,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface CollectionQuote {
  id: string;
  text: string;
  author: string;
}

interface Collection {
  id: string;
  title: string;
  description: string;
  philosopher: string;
  quotes: CollectionQuote[];
  author: string;
  authorAvatar: string;
  likes: number;
  views: number;
  coverColor: string;
}

const collectionsData: Record<string, Collection> = {
  'divine-love': {
    id: 'divine-love',
    title: 'Divine Love Quotes',
    description: 'The most beautiful expressions of divine love from Rumi, Hafez, and other mystics.',
    philosopher: 'Multiple',
    quotes: [
      { id: '1', text: 'Love is the bridge between all things, both between those who are separated and between those who will be separated.', author: 'Rumi' },
      { id: '2', text: 'The wound is the place where the Light enters you.', author: 'Rumi' },
      { id: '3', text: 'Your task is not to seek for love, but to seek and find all the barriers within yourself that you have built against it.', author: 'Rumi' },
      { id: '4', text: 'Let yourself be silently drawn by the strange pull of what you really love. It will not lead you astray.', author: 'Rumi' },
      { id: '5', text: 'Wherever you are, be all there. Otherwise, you will just be a ghost everywhere.', author: 'Rumi' },
      { id: '6', text: 'The heart has its reasons which reason knows nothing of.', author: 'Hafez' },
      { id: '7', text: 'I wish I could show you, when you are lonely, the astonishing light of your own being.', author: 'Hafez' },
    ],
    author: 'WisdomSeeker',
    authorAvatar: 'W',
    likes: 234,
    views: 1523,
    coverColor: '#8b4513',
  },
  'wisdom-times': {
    id: 'wisdom-times',
    title: 'Wisdom for Hard Times',
    description: 'Finding peace and guidance during difficult periods of life.',
    philosopher: 'Rumi',
    quotes: [
      { id: '1', text: 'The pain you feel today will be the strength you feel tomorrow.', author: 'Rumi' },
      { id: '2', text: 'What you seek is seeking you.', author: 'Rumi' },
      { id: '3', text: 'Don\'t grieve. Anything you lose comes round in another form.', author: 'Rumi' },
      { id: '4', text: 'Set your life on fire. Seek those who fan your flames.', author: 'Rumi' },
      { id: '5', text: 'The darker the night, the brighter the stars.', author: 'Rumi' },
      { id: '6', text: 'Perhaps the deepest truth is that love is not a going toward, but a coming from.', author: 'Rumi' },
    ],
    author: 'SpiritualJourney',
    authorAvatar: 'S',
    likes: 189,
    views: 987,
    coverColor: '#2e4a3d',
  },
  'sufi-path': {
    id: 'sufi-path',
    title: 'The Path of Sufism',
    description: 'Essential teachings on the Sufi mystical path.',
    philosopher: 'Attar',
    quotes: [
      { id: '1', text: 'The bird has wings, but only the wind can lift it.', author: 'Attar' },
      { id: '2', text: 'Every heart that has not tasted the wine of love remains empty.', author: 'Attar' },
      { id: '3', text: 'The journey of the soul is from the limited to the unlimited.', author: 'Attar' },
      { id: '4', text: 'Die before you die, so that when you die, you don\'t die.', author: 'Attar' },
      { id: '5', text: 'He who knows himself knows his Lord.', author: 'Attar' },
    ],
    author: 'MysticMind',
    authorAvatar: 'M',
    likes: 156,
    views: 743,
    coverColor: '#c9a962',
  },
  'persian-masterpieces': {
    id: 'persian-masterpieces',
    title: 'Persian Poetry Masterpieces',
    description: 'The finest verses from Ferdowsi, Nizami, and Jami.',
    philosopher: 'Multiple',
    quotes: [
      { id: '1', text: 'Knowledge is the lamp that lights the darkness.', author: 'Ferdowsi' },
      { id: '2', text: 'A king is great not by his wealth, but by his wisdom.', author: 'Ferdowsi' },
      { id: '3', text: 'The rose and the nightingale are one soul in two bodies.', author: 'Nizami' },
      { id: '4', text: 'Beauty is the revealing of the soul through form.', author: 'Jami' },
      { id: '5', text: 'He who conquers himself is greater than he who conquers cities.', author: 'Ferdowsi' },
    ],
    author: 'PoetryLover',
    authorAvatar: 'P',
    likes: 142,
    views: 621,
    coverColor: '#6b4423',
  },
};

export default function CollectionPage() {
  const params = useParams();
  const router = useRouter();
  const collectionId = params.id as string;
  const collection = collectionsData[collectionId];
  const [savedQuotes, setSavedQuotes] = useState<string[]>([]);

  if (!collection) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Collection Not Found</Typography>
        <Button component={Link} href="/community" startIcon={<ArrowBackIcon />}>
          Back to Community
        </Button>
      </Container>
    );
  }

  const toggleSave = (quoteId: string) => {
    if (savedQuotes.includes(quoteId)) {
      setSavedQuotes(savedQuotes.filter(id => id !== quoteId));
    } else {
      setSavedQuotes([...savedQuotes, quoteId]);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Box sx={{ bgcolor: collection.coverColor, color: 'white', py: 6 }}>
        <Container maxWidth="lg">
          <Breadcrumbs sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
            <Link href="/community" style={{ color: 'rgba(255,255,255,0.7)' }}>Community</Link>
            <Link href="/community#collections" style={{ color: 'rgba(255,255,255,0.7)' }}>Collections</Link>
            <Typography color="white">{collection.title}</Typography>
          </Breadcrumbs>
          
          <Typography variant="h3" sx={{ fontWeight: 300, mb: 2 }}>
            {collection.title}
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 3, maxWidth: 600 }}>
            {collection.description}
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: 'white', color: collection.coverColor }}>
              {collection.authorAvatar}
            </Avatar>
            <Box>
              <Typography variant="subtitle1">{collection.author}</Typography>
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                {collection.likes} likes • {collection.views} views • {collection.quotes.length} pearls
              </Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
          <Button variant="contained" startIcon={<FavoriteIcon />}>
            Like Collection
          </Button>
          <Button variant="outlined" startIcon={<ShareIcon />}>
            Share
          </Button>
        </Stack>

        <Typography variant="h5" sx={{ mb: 3 }}>
          Pearls in this Collection
        </Typography>

        <Grid container spacing={3}>
          {collection.quotes.map((quote) => (
            <Grid size={{ xs: 12, md: 6 }} key={quote.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderLeft: `4px solid ${collection.coverColor}`,
                }}
              >
                <CardContent>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontFamily: '"Vazir", serif',
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                      mb: 2,
                      fontStyle: 'italic',
                    }}
                  >
                    "{quote.text}"
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Chip 
                      label={quote.author} 
                      size="small" 
                      variant="outlined"
                      sx={{ borderColor: collection.coverColor, color: collection.coverColor }}
                    />
                    <IconButton 
                      size="small" 
                      onClick={() => toggleSave(quote.id)}
                      color={savedQuotes.includes(quote.id) ? 'primary' : 'default'}
                    >
                      <BookmarkIcon />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
