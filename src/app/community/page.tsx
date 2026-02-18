'use client';
import { useState, useEffect } from 'react';
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
import Image from 'next/image';
import { 
  HeroPattern, 
  FloatingMotif, 
  SectionDivider,
  CornerDecoration,
} from '@/components/SVGDecorations';

interface Collection {
  id: string;
  title: string;
  description: string;
  philosopher: string;
  theme?: string;
  quoteCount: number;
  author: string;
  likes: number;
  coverColor: string;
  image: string;
}

interface Discussion {
  id: string;
  title: string;
  category: string;
  author: string;
  replies: number;
  lastActivity: string;
  isPinned: boolean;
  likes: number;
}

const featuredCollections: Collection[] = [
  {
    id: '1',
    title: 'Divine Love Quotes',
    description: 'The most beautiful expressions of divine love from Rumi, Hafez, and the great mystics',
    philosopher: 'Rumi, Hafez',
    theme: 'Love',
    quoteCount: 45,
    author: 'WisdomSeeker',
    likes: 234,
    coverColor: '#722F37',
    image: '/images/divine-love-quotes.png',
  },
  {
    id: '2',
    title: 'Wisdom for Hard Times',
    description: 'Finding peace and guidance during difficult periods of life',
    philosopher: 'Rumi',
    theme: 'Wisdom',
    quoteCount: 32,
    author: 'SpiritualJourney',
    likes: 189,
    coverColor: '#2e4a3d',
    image: '/images/wisdom-for-hard-times.png',
  },
  {
    id: '3',
    title: 'The Path of Sufism',
    description: 'Essential teachings on the Sufi mystical path to divine realization',
    philosopher: 'Attar, Rumi',
    theme: 'Divine',
    quoteCount: 28,
    author: 'MysticMind',
    likes: 156,
    coverColor: '#8b4513',
    image: '/images/path-of-sufism.png',
  },
  {
    id: '4',
    title: 'Persian Poetry Masterpieces',
    description: 'The finest verses from Ferdowsi, Nizami, and Jami',
    philosopher: 'Ferdowsi, Nizami',
    theme: 'Poetry',
    quoteCount: 50,
    author: 'PoetryLover',
    likes: 142,
    coverColor: '#3d6b52',
    image: '/images/persian-poetry-masterpieces.png',
  },
  {
    id: '5',
    title: 'The Garden of Wisdom',
    description: 'Metaphors of gardens and roses in Persian philosophical poetry',
    philosopher: 'Saadi, Hafez',
    theme: 'Wisdom',
    quoteCount: 38,
    author: 'GardenSoul',
    likes: 198,
    coverColor: '#c9a962',
    image: '/images/garden-of-wisdom.png',
  },
  {
    id: '6',
    title: 'Light & Darkness',
    description: 'The eternal struggle between light and shadow in Persian mysticism',
    philosopher: 'Suhrawardi',
    theme: 'Divine',
    quoteCount: 24,
    author: 'Illuminist',
    likes: 112,
    coverColor: '#1a3a2a',
    image: '/images/light-and-darkness.png',
  },
];

const recentDiscussions: Discussion[] = [
  {
    id: '1',
    title: 'What does "Fana" (self-annihilation) truly mean in Sufism?',
    category: 'Philosophy',
    author: 'MysticSeeker_72',
    replies: 47,
    lastActivity: '12 minutes ago',
    isPinned: true,
    likes: 128,
  },
  {
    id: '2',
    title: 'Which translation of Rumi\'s Masnavi captures the poetry best?',
    category: 'Resources',
    author: 'PersianScholar',
    replies: 31,
    lastActivity: '2 hours ago',
    isPinned: false,
    likes: 89,
  },
  {
    id: '3',
    title: 'The mystery of Shams-e Tabrizi - did he really disappear?',
    category: 'History',
    author: 'RumiEnthusiast',
    replies: 56,
    lastActivity: '4 hours ago',
    isPinned: false,
    likes: 167,
  },
  {
    id: '4',
    title: 'Understanding Hafez\'s "The Tavern" - is it literal or mystical?',
    category: 'Poetry',
    author: 'HafezLover',
    replies: 28,
    lastActivity: '6 hours ago',
    isPinned: false,
    likes: 94,
  },
  {
    id: '5',
    title: 'Saadi vs Hafez - different approaches to wisdom',
    category: 'Comparison',
    author: 'WisdomCollector',
    replies: 42,
    lastActivity: '1 day ago',
    isPinned: false,
    likes: 112,
  },
  {
    id: '6',
    title: 'How to start reading the Shahnameh - which translation?',
    category: 'Resources',
    author: 'NewToPersian',
    replies: 19,
    lastActivity: '1 day ago',
    isPinned: false,
    likes: 45,
  },
  {
    id: '7',
    title: 'The concept of "Wali" (saint) in Persian Sufism',
    category: 'Philosophy',
    author: 'SufiStudent',
    replies: 23,
    lastActivity: '2 days ago',
    isPinned: false,
    likes: 67,
  },
  {
    id: '8',
    title: 'Attar\'s Conference of the Birds - the final interpretation',
    category: 'Poetry',
    author: 'BirdSeeker',
    replies: 38,
    lastActivity: '2 days ago',
    isPinned: false,
    likes: 103,
  },
];

interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  quotes: number;
  collections: number;
  joined: string;
}

const communityMembers: CommunityMember[] = [];

interface TrendingTopic {
  id: string;
  title: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
}

const trendingTopics: TrendingTopic[] = [];

const topPhilosophers: { id: string; name: string; views: number; quotes: number }[] = [];

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
  const [communityMembers, setCommunityMembers] = useState<CommunityMember[]>([]);
  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([]);
  const [topPhilosophers, setTopPhilosophers] = useState<{ id: string; name: string; views: number; quotes: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, membersRes] = await Promise.all([
          fetch('/api/community/stats'),
          fetch('/api/community/members'),
        ]);
        
        const statsData = await statsRes.json();
        const membersData = await membersRes.json();
        
        const philosopherNames: Record<string, string> = {
          'rumi': 'Rumi',
          'hafez': 'Hafez',
          'saadi': 'Saadi',
          'attar': 'Attar',
          'ferdowsi': 'Ferdowsi',
          'ibn-sina': 'Ibn Sina',
        };
        
        const defaultPhilosophers = [
          { id: 'rumi', name: 'Rumi', views: 45231, quotes: 234 },
          { id: 'hafez', name: 'Hafez', views: 38456, quotes: 189 },
          { id: 'saadi', name: 'Saadi', views: 28934, quotes: 156 },
          { id: 'attar', name: 'Attar', views: 18721, quotes: 98 },
          { id: 'ferdowsi', name: 'Ferdowsi', views: 15632, quotes: 87 },
          { id: 'ibn-sina', name: 'Ibn Sina', views: 12453, quotes: 45 },
        ];
        
        const defaultTrending = [
          { id: '1', title: 'Divine Love in Rumi\'s Poetry', count: 1247, trend: 'up' as const },
          { id: '2', title: 'The Path of Sufism', count: 892, trend: 'up' as const },
          { id: '3', title: 'Hafez\'s Oracle Readings', count: 756, trend: 'stable' as const },
          { id: '4', title: 'Saadi\'s Practical Wisdom', count: 634, trend: 'up' as const },
          { id: '5', title: 'Persian Garden Symbolism', count: 521, trend: 'down' as const },
          { id: '6', title: 'The Illumination Philosophy', count: 412, trend: 'stable' as const },
        ];
        
        const defaultMembers = [
          { id: '1', name: 'RumiDreamer', avatar: 'ر', bio: 'Seeker of divine love through poetry', quotes: 234, collections: 8, joined: '2024' },
          { id: '2', name: 'PersianSage', avatar: 'ص', bio: 'Scholar of Islamic philosophy', quotes: 189, collections: 12, joined: '2023' },
          { id: '3', name: 'GardenPoet', avatar: 'گ', bio: 'Finding wisdom in Saadi\'s gardens', quotes: 156, collections: 5, joined: '2024' },
          { id: '4', name: 'NightOwl', avatar: 'ب', bio: 'Midnight reader of mystical verses', quotes: 298, collections: 15, joined: '2023' },
          { id: '5', name: 'RoseNightingale', avatar: 'ن', bio: 'Following the path of the beloved', quotes: 445, collections: 22, joined: '2022' },
          { id: '6', name: 'FlameSeeker', avatar: 'ش', bio: 'In search of the eternal light', quotes: 167, collections: 7, joined: '2024' },
        ];
        
        if (statsData.philosopherStats && statsData.philosopherStats.length > 0) {
          setTopPhilosophers(statsData.philosopherStats.map((p: any) => ({
            id: p.id,
            name: philosopherNames[p.id] || p.id,
            views: p.views,
            quotes: p.quoteCount,
          })));
        } else {
          setTopPhilosophers(defaultPhilosophers);
        }
        
        if (statsData.trendingTopics && statsData.trendingTopics.length > 0) {
          setTrendingTopics(statsData.trendingTopics);
        } else {
          setTrendingTopics(defaultTrending);
        }
        
        if (membersData.members && membersData.members.length > 0) {
          setCommunityMembers(membersData.members);
        } else {
          setCommunityMembers(defaultMembers);
        }
      } catch (error) {
        console.error('Error fetching community data:', error);
        setTopPhilosophers([
          { id: 'rumi', name: 'Rumi', views: 45231, quotes: 234 },
          { id: 'hafez', name: 'Hafez', views: 38456, quotes: 189 },
          { id: 'saadi', name: 'Saadi', views: 28934, quotes: 156 },
          { id: 'attar', name: 'Attar', views: 18721, quotes: 98 },
          { id: 'ferdowsi', name: 'Ferdowsi', views: 15632, quotes: 87 },
          { id: 'ibn-sina', name: 'Ibn Sina', views: 12453, quotes: 45 },
        ]);
        setTrendingTopics([
          { id: '1', title: 'Divine Love in Rumi\'s Poetry', count: 1247, trend: 'up' },
          { id: '2', title: 'The Path of Sufism', count: 892, trend: 'up' },
          { id: '3', title: 'Hafez\'s Oracle Readings', count: 756, trend: 'stable' },
          { id: '4', title: 'Saadi\'s Practical Wisdom', count: 634, trend: 'up' },
          { id: '5', title: 'Persian Garden Symbolism', count: 521, trend: 'down' },
          { id: '6', title: 'The Illumination Philosophy', count: 412, trend: 'stable' },
        ]);
        setCommunityMembers([
          { id: '1', name: 'RumiDreamer', avatar: 'ر', bio: 'Seeker of divine love through poetry', quotes: 234, collections: 8, joined: '2024' },
          { id: '2', name: 'PersianSage', avatar: 'ص', bio: 'Scholar of Islamic philosophy', quotes: 189, collections: 12, joined: '2023' },
          { id: '3', name: 'GardenPoet', avatar: 'گ', bio: 'Finding wisdom in Saadi\'s gardens', quotes: 156, collections: 5, joined: '2024' },
          { id: '4', name: 'NightOwl', avatar: 'ب', bio: 'Midnight reader of mystical verses', quotes: 298, collections: 15, joined: '2023' },
          { id: '5', name: 'RoseNightingale', avatar: 'ن', bio: 'Following the path of the beloved', quotes: 445, collections: 22, joined: '2022' },
          { id: '6', name: 'FlameSeeker', avatar: 'ش', bio: 'In search of the eternal light', quotes: 167, collections: 7, joined: '2024' },
        ]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a3a2a 0%, #2e4a3d 50%, #3d6b52 100%)',
          py: { xs: 4, md: 6 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <HeroPattern color="#c9a962" opacity={0.08} />
        <CornerDecoration position="top-left" color="#c9a962" size={100} />
        <CornerDecoration position="bottom-right" color="#c9a962" size={100} />
        <FloatingMotif variant="floral" color="#c9a962" size={70} top="20%" left="5%" opacity={0.1} />
        <FloatingMotif variant="waves" color="#c9a962" size={80} bottom="10%" right="8%" opacity={0.1} />
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
          }}
        >
          <Image
            src="/images/home-hero.png"
            alt="Persian wisdom"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="overline" sx={{ color: 'rgba(201, 169, 98, 0.9)', letterSpacing: 4, mb: 0.5, display: 'block' }}>
            Connect
          </Typography>
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 300, mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}>
            {t.community.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            {t.community.subtitle}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 2, flex: 1, overflow: 'auto' }}>
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
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={collection.id}>
                <Card
                  component={Link}
                  href={collection.theme ? `/explore?theme=${collection.theme}` : '/explore'}
                  sx={{
                    height: '100%',
                    textDecoration: 'none',
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: 3,
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: `0 16px 40px ${collection.coverColor}40`,
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      border: `1px solid ${collection.coverColor}20`,
                      borderRadius: 'inherit',
                      pointerEvents: 'none',
                      zIndex: 1,
                    },
                  }}
                >
                  {/* Background Image */}
                  <Box sx={{ position: 'relative', height: 150 }}>
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: `linear-gradient(180deg, ${collection.coverColor}30 0%, ${collection.coverColor}60 100%)`,
                      }}
                    />
                  </Box>
                  
                  <CardContent sx={{ p: 2.5 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {collection.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40, lineHeight: 1.5 }}>
                      {collection.description}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip 
                        label={collection.philosopher} 
                        size="small" 
                        variant="outlined"
                        sx={{ borderColor: `${collection.coverColor}50`, color: collection.coverColor }}
                      />
                      <Chip 
                        label={`${collection.quoteCount} quotes`} 
                        size="small" 
                        variant="outlined"
                        sx={{ borderColor: 'rgba(139, 69, 19, 0.2)' }}
                      />
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="caption" color="text.secondary">
                        by {collection.author}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AutoStoriesIcon sx={{ fontSize: 14, color: '#c9a962' }} />
                        <Typography variant="caption" color="text.secondary">
                          {collection.likes}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Discussions Tab */}
      {tabValue === 1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 0.5 }}>Discussions</Typography>
              <Typography variant="body2" color="text.secondary">Join the conversation with fellow seekers</Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              sx={{ bgcolor: '#8b4513', '&:hover': { bgcolor: '#a0522d' } }}
            >
              Start Discussion
            </Button>
          </Box>

          {/* Decorative SVG */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <svg width="200" height="40" viewBox="0 0 200 40">
              <path d="M0,20 Q50,0 100,20 T200,20" stroke="#c9a962" strokeWidth="2" fill="none" opacity="0.3"/>
              <circle cx="100" cy="20" r="4" fill="#c9a962" opacity="0.5"/>
              <circle cx="50" cy="10" r="2" fill="#c9a962" opacity="0.3"/>
              <circle cx="150" cy="10" r="2" fill="#c9a962" opacity="0.3"/>
            </svg>
          </Box>

          <Stack spacing={2}>
            {recentDiscussions.map((discussion) => (
              <Card 
                key={discussion.id}
                sx={{ 
                  borderRadius: 2,
                  border: '1px solid rgba(139, 69, 19, 0.1)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'rgba(139, 69, 19, 0.3)',
                    transform: 'translateX(4px)',
                    boxShadow: '0 4px 16px rgba(139, 69, 19, 0.1)',
                  }
                }}
              >
                <CardActionArea>
                  <CardContent sx={{ py: 2 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      {discussion.isPinned && (
                        <Box sx={{ 
                          bgcolor: '#c9a962', 
                          color: 'white', 
                          px: 1.5, 
                          py: 0.5, 
                          borderRadius: 1,
                          fontSize: '0.7rem',
                          fontWeight: 600,
                        }}>
                          ✦ Pinned
                        </Box>
                      )}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
                          {discussion.title}
                        </Typography>
                        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ flexWrap: 'wrap', gap: 1 }}>
                          <Chip 
                            label={discussion.category} 
                            size="small" 
                            sx={{ 
                              bgcolor: 'rgba(139, 69, 19, 0.08)', 
                              color: '#8b4513',
                              fontSize: '0.7rem',
                            }} 
                          />
                          <Typography variant="caption" color="text.secondary">
                            by {discussion.author}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            •
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {discussion.lastActivity}
                          </Typography>
                        </Stack>
                      </Box>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ textAlign: 'center', px: 2 }}>
                          <Typography variant="h6" sx={{ color: '#8b4513', fontWeight: 600 }}>
                            {discussion.replies}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">replies</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'center', px: 2 }}>
                          <Typography variant="h6" sx={{ color: '#722F37', fontWeight: 600 }}>
                            {discussion.likes}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">likes</Typography>
                        </Box>
                      </Stack>
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
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              Community of Seekers
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
              Join thousands of wisdom seekers exploring Persian philosophy together
            </Typography>
          </Box>

          {/* Decorative SVG */}
          <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}>
            <svg width="300" height="60" viewBox="0 0 300 60">
              <circle cx="150" cy="30" r="20" stroke="#c9a962" strokeWidth="2" fill="none" opacity="0.3"/>
              <circle cx="80" cy="30" r="12" stroke="#c9a962" strokeWidth="1.5" fill="none" opacity="0.2"/>
              <circle cx="220" cy="30" r="12" stroke="#c9a962" strokeWidth="1.5" fill="none" opacity="0.2"/>
              <path d="M95,30 Q122,15 130,30" stroke="#c9a962" strokeWidth="1" fill="none" opacity="0.2"/>
              <path d="M205,30 Q178,45 170,30" stroke="#c9a962" strokeWidth="1" fill="none" opacity="0.2"/>
            </svg>
          </Box>

          <Grid container spacing={3} sx={{ mb: 5 }}>
            {communityMembers.map((member) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={member.id}>
                <Card 
                  sx={{ 
                    borderRadius: 3,
                    border: '1px solid rgba(139, 69, 19, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 32px rgba(139, 69, 19, 0.15)',
                      borderColor: 'rgba(139, 69, 19, 0.3)',
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Avatar 
                      sx={{ 
                        width: 72, 
                        height: 72, 
                        mx: 'auto', 
                        mb: 2,
                        bgcolor: '#8b4513',
                        fontSize: '1.8rem',
                        boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3)',
                      }}
                    >
                      {member.avatar}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      @{member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                      {member.bio}
                    </Typography>
                    <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#8b4513', fontWeight: 600 }}>
                          {member.quotes}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">quotes</Typography>
                      </Box>
                      <Box sx={{ width: 1, bgcolor: 'divider' }} />
                      <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ color: '#2e4a3d', fontWeight: 600 }}>
                          {member.collections}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">collections</Typography>
                      </Box>
                    </Stack>
                    <Chip 
                      label={`Joined ${member.joined}`} 
                      size="small" 
                      sx={{ bgcolor: 'rgba(201, 169, 98, 0.15)', color: '#8b4513' }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Button 
              variant="contained" 
              size="large"
              sx={{ 
                bgcolor: '#8b4513', 
                px: 5,
                py: 1.5,
                '&:hover': { bgcolor: '#a0522d' }
              }}
            >
              Sign In to Join the Community
            </Button>
          </Box>
        </Box>
      )}

      {/* Trending Tab */}
      {tabValue === 3 && (
        <Box>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              Trending Now
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Discover what the community is exploring
            </Typography>
          </Box>

          {/* Decorative SVG */}
          <Box sx={{ mb: 5, display: 'flex', justifyContent: 'center' }}>
            <svg width="250" height="50" viewBox="0 0 250 50">
              <path d="M0,40 L50,35 L100,25 L150,30 L200,15 L250,10" stroke="#2e4a3d" strokeWidth="2" fill="none"/>
              <circle cx="50" cy="35" r="3" fill="#8b4513"/>
              <circle cx="100" cy="25" r="3" fill="#8b4513"/>
              <circle cx="150" cy="30" r="3" fill="#8b4513"/>
              <circle cx="200" cy="15" r="3" fill="#c9a962"/>
              <circle cx="250" cy="10" r="3" fill="#722F37"/>
            </svg>
          </Box>

          <Grid container spacing={4}>
            {/* Top Philosophers */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ borderRadius: 3, border: '1px solid rgba(139, 69, 19, 0.15)' }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                    <AutoStoriesIcon sx={{ color: '#8b4513' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Most Explored Philosophers</Typography>
                  </Stack>
                  <Stack spacing={2}>
                    {topPhilosophers.map((philosopher, index) => (
                      <Box 
                        key={philosopher.id}
                        component={Link}
                        href={`/explore?philosopher=${philosopher.id}`}
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 2,
                          p: 1.5,
                          borderRadius: 2,
                          textDecoration: 'none',
                          color: 'inherit',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: 'rgba(139, 69, 19, 0.05)',
                          }
                        }}
                      >
                        <Box sx={{ 
                          width: 32, 
                          height: 32, 
                          borderRadius: '50%', 
                          bgcolor: index < 3 ? '#c9a962' : 'rgba(139, 69, 19, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          color: index < 3 ? 'white' : '#8b4513',
                        }}>
                          {index + 1}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {philosopher.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {philosopher.quotes} quotes
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#8b4513', fontWeight: 600 }}>
                          {philosopher.views.toLocaleString()}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Trending Topics */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Card sx={{ borderRadius: 3, border: '1px solid rgba(139, 69, 19, 0.15)' }}>
                <CardContent>
                  <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
                    <TrendingUpIcon sx={{ color: '#2e4a3d' }} />
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>Hot Topics</Typography>
                  </Stack>
                  <Stack spacing={2}>
                    {trendingTopics.map((topic) => (
                      <Box 
                        key={topic.id}
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 2,
                          p: 1.5,
                          borderRadius: 2,
                          border: '1px solid',
                          borderColor: 'rgba(139, 69, 19, 0.1)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            borderColor: 'rgba(139, 69, 19, 0.3)',
                            bgcolor: 'rgba(139, 69, 19, 0.02)',
                          }
                        }}
                      >
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {topic.title}
                          </Typography>
                        </Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#2e4a3d' }}>
                            {topic.count}
                          </Typography>
                          {topic.trend === 'up' && (
                            <Typography sx={{ color: '#2e7d32', fontSize: '1.2rem' }}>↑</Typography>
                          )}
                          {topic.trend === 'down' && (
                            <Typography sx={{ color: '#c62828', fontSize: '1.2rem' }}>↓</Typography>
                          )}
                          {topic.trend === 'stable' && (
                            <Typography sx={{ color: '#8b4513', fontSize: '1.2rem' }}>→</Typography>
                          )}
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Popular Themes */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="h6" sx={{ mb: 3, textAlign: 'center', fontWeight: 600 }}>
              Popular Themes
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, justifyContent: 'center' }}>
              {['Divine Love', 'Mystical Journey', 'Self-Knowledge', 'Transformation', 'Wisdom', 'Peace', 'Friendship', 'The Beloved', 'Garden of Roses', 'Light & Shadow', 'Poetry', 'Sacred Texts'].map((theme) => (
                <Chip 
                  key={theme}
                  label={theme}
                  component={Link}
                  href={`/explore?theme=${theme}`}
                  clickable
                  sx={{ 
                    px: 2,
                    py: 2.5,
                    borderRadius: 3,
                    bgcolor: 'rgba(139, 69, 19, 0.08)',
                    color: '#8b4513',
                    fontWeight: 500,
                    '&:hover': {
                      bgcolor: 'rgba(139, 69, 19, 0.15)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Container>
    </Box>
  );
}
