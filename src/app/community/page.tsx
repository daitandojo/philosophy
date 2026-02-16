'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/i18n';
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
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Avatar,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CollectionsIcon from '@mui/icons-material/Collections';
import ForumIcon from '@mui/icons-material/Forum';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AddIcon from '@mui/icons-material/Add';

interface Collection {
  id: string;
  title: string;
  description: string;
  philosopher: string;
  quoteCount: number;
  author: string;
  likes: number;
  coverColor: string;
}

interface Discussion {
  id: string;
  title: string;
  category: string;
  author: string;
  replies: number;
  lastActivity: string;
  isPinned: boolean;
}

const featuredCollections: Collection[] = [
  {
    id: '1',
    title: 'Divine Love Quotes',
    description: 'A collection of the most beautiful expressions of divine love from Rumi, Hafez, and others.',
    philosopher: 'Multiple',
    quoteCount: 45,
    author: 'WisdomSeeker',
    likes: 234,
    coverColor: '#8b4513',
  },
  {
    id: '2',
    title: 'Wisdom for Hard Times',
    description: 'Finding peace and guidance during difficult periods of life.',
    philosopher: 'Rumi',
    quoteCount: 32,
    author: 'SpiritualJourney',
    likes: 189,
    coverColor: '#2e4a3d',
  },
  {
    id: '3',
    title: 'The Path of Sufism',
    description: 'Essential teachings on the Sufi mystical path.',
    philosopher: 'Attar',
    quoteCount: 28,
    author: 'MysticMind',
    likes: 156,
    coverColor: '#c9a962',
  },
  {
    id: '4',
    title: 'Persian Poetry Masterpieces',
    description: 'The finest verses from Ferdowsi, Nizami, and Jami.',
    philosopher: 'Multiple',
    quoteCount: 50,
    author: 'PoetryLover',
    likes: 142,
    coverColor: '#6b4423',
  },
];

const recentDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'What does "Fana" really mean?',
    category: 'philosopher',
    author: 'Seeker123',
    replies: 24,
    lastActivity: '2 hours ago',
    isPinned: true,
  },
  {
    id: '2',
    title: 'Best translation of the Masnavi?',
    category: 'qa',
    author: 'ScholarWannabe',
    replies: 18,
    lastActivity: '5 hours ago',
    isPinned: false,
  },
  {
    id: '3',
    title: 'Rumi and the concept of the Beloved',
    category: 'theme',
    author: 'LoveSeeker',
    replies: 32,
    lastActivity: '1 day ago',
    isPinned: false,
  },
  {
    id: '4',
    title: 'Starting a study group - anyone interested?',
    category: 'study-group',
    author: 'GroupLeader',
    replies: 15,
    lastActivity: '2 days ago',
    isPinned: false,
  },
];

const discussionCategories = [
  { value: 'all', label: 'All Discussions' },
  { value: 'general', label: 'General' },
  { value: 'philosopher', label: 'By Philosopher' },
  { value: 'theme', label: 'By Theme' },
  { value: 'qa', label: 'Q&A' },
  { value: 'study-group', label: 'Study Groups' },
];

export default function CommunityPage() {
  const { t } = useI18n();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [discussionCategory, setDiscussionCategory] = useState('all');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {t.community.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {t.community.subtitle}
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} variant="scrollable" scrollButtons="auto">
          <Tab icon={<CollectionsIcon />} iconPosition="start" label="Collections" />
          <Tab icon={<ForumIcon />} iconPosition="start" label="Discussions" />
          <Tab icon={<PeopleIcon />} iconPosition="start" label="Members" />
          <Tab icon={<TrendingUpIcon />} iconPosition="start" label="Trending" />
        </Tabs>
      </Box>

      {/* Collections Tab */}
      {tabValue === 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">Featured Collections</Typography>
            <Button variant="contained" startIcon={<AddIcon />}>
              Create Collection
            </Button>
          </Box>

          <TextField
            fullWidth
            placeholder="Search collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 4 }}
          />

          <Grid container spacing={3}>
            {featuredCollections.map((collection) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={collection.id}>
                <Card
                  sx={{
                    height: '100%',
                    background: `linear-gradient(135deg, ${collection.coverColor}20 0%, ${collection.coverColor}40 100%)`,
                    border: `1px solid ${collection.coverColor}30`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 24px ${collection.coverColor}30`,
                    },
                  }}
                >
                  <CardActionArea sx={{ height: '100%' }}>
                    <CardContent>
                      <Box
                        sx={{
                          height: 8,
                          bgcolor: collection.coverColor,
                          borderRadius: 1,
                          mb: 2,
                        }}
                      />
                      <Typography variant="h6" gutterBottom noWrap>
                        {collection.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                        {collection.description}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                        <Chip label={collection.philosopher} size="small" variant="outlined" />
                        <Chip label={`${collection.quoteCount} quotes`} size="small" variant="outlined" />
                      </Stack>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          by {collection.author}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ❤️ {collection.likes}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Discussions Tab */}
      {tabValue === 1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">Discussions</Typography>
            <Button variant="contained" startIcon={<AddIcon />}>
              Start Discussion
            </Button>
          </Box>

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <TextField
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ flex: 1 }}
            />
          </Stack>

          <Stack spacing={2}>
            {recentDiscussions.map((discussion) => (
              <Card key={discussion.id}>
                <CardActionArea>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      {discussion.isPinned && (
                        <Chip label="Pinned" color="primary" size="small" />
                      )}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6">{discussion.title}</Typography>
                        <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 1 }}>
                          <Chip label={discussion.category} size="small" variant="outlined" />
                          <Typography variant="caption" color="text.secondary">
                            by {discussion.author}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {discussion.lastActivity}
                          </Typography>
                        </Stack>
                      </Box>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6">{discussion.replies}</Typography>
                        <Typography variant="caption" color="text.secondary">replies</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        </Box>
      )}

      {/* Members Tab */}
      {tabValue === 2 && (
        <Box>
          <Typography variant="h4" sx={{ mb: 3 }}>Community Members</Typography>
          <Typography variant="body1" color="text.secondary">
            Join our community of wisdom seekers! Sign in to follow other members, create collections, and participate in discussions.
          </Typography>
          
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>Featured Members</Typography>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
              {['Scholar123', 'PoetryLover', 'WisdomSeeker', 'MysticMind'].map((name) => (
                <Box key={name} sx={{ textAlign: 'center' }}>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mx: 'auto', mb: 1 }}>
                    {name[0]}
                  </Avatar>
                  <Typography variant="body2">{name}</Typography>
                </Box>
              ))}
            </Stack>
            <Button variant="contained" size="large">
              Sign In to Join
            </Button>
          </Box>
        </Box>
      )}

      {/* Trending Tab */}
      {tabValue === 3 && (
        <Box>
          <Typography variant="h4" sx={{ mb: 3 }}>Trending Now</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Most Viewed Philosophers</Typography>
                  <Stack spacing={1}>
                    {['Rumi', 'Hafez', 'Saadi', 'Ibn Arabi', 'Attar'].map((p, i) => (
                      <Box key={p} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography variant="h6" color="primary">{i + 1}</Typography>
                          <Typography>{p}</Typography>
                        </Stack>
                        <Chip label={`#${1000 - i * 150}`} size="small" variant="outlined" />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Popular Themes</Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {['Love', 'Divine', 'Wisdom', 'Journey', 'Peace', 'Transformation', 'Self-knowledge', 'Friendship'].map((theme) => (
                      <Chip key={theme} label={theme} clickable />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}
