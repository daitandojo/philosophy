'use client';
import { useState } from 'react';
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
import Image from 'next/image';
import TimelineIcon from '@mui/icons-material/Timeline';
import GroupsIcon from '@mui/icons-material/Groups';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ForumIcon from '@mui/icons-material/Forum';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useI18n } from '@/i18n';
import { 
  HeroPattern, 
  FloatingMotif, 
  BackgroundCircles,
  SectionDivider,
  CornerDecoration,
} from '@/components/SVGDecorations';

const features = [
  {
    icon: <AutoStoriesIcon sx={{ fontSize: 32 }} />,
    title: 'Explore Wisdom',
    description: 'Browse timeless verses from Rumi, Hafez, Saadi and other Persian philosophers',
    href: '/explore',
    color: '#722F37',
  },
  {
    icon: <ChatIcon sx={{ fontSize: 32 }} />,
    title: 'Chat with Philosophers',
    description: 'Have AI-powered conversations with the great minds of Persia',
    href: '/chat',
    color: '#8b4513',
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 32 }} />,
    title: 'Guided Learning',
    description: 'Follow structured paths from beginner to advanced scholar',
    href: '/learn',
    color: '#2e4a3d',
  },
  {
    icon: <TimelineIcon sx={{ fontSize: 32 }} />,
    title: 'Historical Timeline',
    description: 'Journey through 2,500 years of Persian philosophical history',
    href: '/timeline',
    color: '#c9a962',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 32 }} />,
    title: 'Community',
    description: 'Connect with fellow seekers of wisdom',
    href: '/community',
    color: '#3d6b52',
  },
  {
    icon: <MenuBookIcon sx={{ fontSize: 32 }} />,
    title: 'Read the Works',
    description: 'Explore complete texts of major philosophical works',
    href: '/read',
    color: '#722F37',
  },
];

const famousQuotes = [
  { text: 'The wound is the place where the Light enters you.', philosopher: 'Rumi', image: '/images/quote-wound-light.png' },
  { text: 'What you seek is seeking you.', philosopher: 'Rumi', image: '/images/quote-seek-seeking.png' },
  { text: 'When you do things from your soul, you feel a river moving in you, a joy.', philosopher: 'Rumi', image: '/images/quote-river-joy.png' },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useI18n();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a3a2a 0%, #2e4a3d 50%, #3d6b52 100%)',
          minHeight: { xs: 500, md: 600 },
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 6, md: 10 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <HeroPattern color="#c9a962" opacity={0.08} />
        <BackgroundCircles color="#c9a962" count={4} opacity={0.04} />
        <CornerDecoration position="top-left" color="#c9a962" size={120} />
        <CornerDecoration position="bottom-right" color="#c9a962" size={120} />
        <FloatingMotif variant="celestial" color="#c9a962" size={80} top="10%" left="5%" opacity={0.12} />
        <FloatingMotif variant="geometric" color="#c9a962" size={60} top="20%" right="10%" opacity={0.1} />
        <FloatingMotif variant="floral" color="#c9a962" size={70} bottom="15%" left="10%" opacity={0.1} />
        <FloatingMotif variant="waves" color="#c9a962" size={80} bottom="20%" right="5%" opacity={0.08} />
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.15,
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

        <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1400, mx: 'auto' }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', gap: 4, width: '100%', maxWidth: 1200, mx: 'auto' }}>
            <Box sx={{ flex: { md: '0 0 auto' }, width: { xs: '100%', md: '58.333333%' }, textAlign: 'left' }}>
              <Typography
                variant="overline"
                sx={{ 
                  color: 'rgba(201, 169, 98, 0.9)', 
                  letterSpacing: 4, 
                  mb: 2, 
                  display: 'block',
                  fontSize: '0.875rem',
                }}
              >
                Persian Philosophy & Wisdom
              </Typography>
              
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 300,
                  color: 'white',
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                Discover the
                <Box component="span" sx={{ display: 'block', fontWeight: 700, background: 'linear-gradient(135deg, rgba(201,169,98,0.85) 0%, rgba(201,169,98,0.5) 50%, rgba(201,169,98,0.75) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  Timeless Wisdom
                </Box>
                of Persia
                <Box component="span" sx={{ display: 'block', fontFamily: '"Vazir", serif', fontSize: '1.8rem', color: 'rgba(201, 169, 98, 0.7)', mt: 1 }}>
                  حکمت
                </Box>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontWeight: 300,
                  mb: 4,
                  maxWidth: 500,
                  lineHeight: 1.6,
                }}
              >
                {t.home.subtitle}
              </Typography>

              <TextField
                fullWidth
                placeholder="Search verses, philosophers, or themes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255,255,255,0.7)' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderRadius: 3,
                    color: 'white',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.2)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255,255,255,0.4)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#c9a962',
                    },
                    '& input::placeholder': {
                      color: 'rgba(255,255,255,0.7)',
                    },
                  },
                }}
                sx={{ mb: 3, maxWidth: 500 }}
              />

              {/* Subtle Navigation Buttons */}
              <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap sx={{ mb: 4 }}>
                {[
                  { label: 'Explore', href: '/explore' },
                  { label: 'Chat', href: '/chat' },
                  { label: 'Learn', href: '/learn' },
                  { label: 'Discourses', href: '/discourse' },
                  { label: 'Community', href: '/community' },
                ].map((item, idx) => (
                  <Button
                    key={idx}
                    component={Link}
                    href={item.href}
                    size="small"
                    sx={{
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '0.8rem',
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      '&:hover': {
                        color: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Stack>
            </Box>

            {/* Quote Tiles - Right Side */}
            <Box sx={{ flex: { md: '0 0 auto' }, width: { xs: '100%', md: '41.666667%' } }}>
              <Grid container spacing={1.5}>
                {[
                  { text: 'The wound is the place where the Light enters you.', philosopher: 'Rumi', image: '/images/quote-wound-light.png' },
                  { text: 'What you seek is seeking you.', philosopher: 'Rumi', image: '/images/quote-seek-seeking.png' },
                  { text: 'When you do things from your soul, you feel a river moving in you, a joy.', philosopher: 'Rumi', image: '/images/quote-river-joy.png' },
                ].map((quote, idx) => (
                  <Grid size={12} key={idx}>
                    <Box
                      sx={{
                        position: 'relative',
                        height: 120,
                        borderRadius: 2,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.02)' },
                      }}
                    >
                      <Box sx={{ position: 'absolute', inset: 0, opacity: 0.85 }}>
                        <Image src={quote.image} alt="" fill style={{ objectFit: 'cover' }} />
                      </Box>
                      <Box
                        sx={{
                          position: 'absolute',
                          inset: 0,
                          bgcolor: 'rgba(0,0,0,0.35)',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          p: 1.5,
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: 'system-ui, sans-serif',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            color: '#ffffff',
                            lineHeight: 1.4,
                            mb: 0.5,
                            textAlign: 'center',
                          }}
                        >
                          {quote.text}
                        </Typography>
                        <Typography sx={{ fontSize: '0.7rem', color: '#c9a962', fontWeight: 500, textAlign: 'center' }}>
                          {quote.philosopher}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Container>
        <SectionDivider color="#c9a962" height={50} />
      </Box>

      {/* Features Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={3}>
          {features.map((feature, idx) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
              <Card
                component={Link}
                href={feature.href}
                sx={{
                  height: '100%',
                  textDecoration: 'none',
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px ${feature.color}20`,
                    borderColor: feature.color,
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2,
                      bgcolor: `${feature.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      color: feature.color,
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
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

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'rgba(46, 74, 61, 0.08)', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {[
              { number: '2,500+', label: 'Years of Philosophy' },
              { number: '50+', label: 'Great Philosophers' },
              { number: '10,000+', label: 'Verses & Quotes' },
              { number: '∞', label: 'Wisdom to Discover' },
            ].map((stat, idx) => (
              <Grid size={{ xs: 6, md: 3 }} key={idx}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 1,
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Begin Your Journey
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Join thousands of seekers exploring the depths of Persian wisdom
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap>
          <Button
            variant="contained"
            size="large"
            component={Link}
            href="/learn"
            startIcon={<SchoolIcon />}
          >
            Start Learning
          </Button>
          <Button
            variant="outlined"
            size="large"
            component={Link}
            href="/philosophers"
            startIcon={<AutoAwesomeIcon />}
          >
            Meet the Philosophers
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
