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
import GroupsIcon from '@mui/icons-material/Groups';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Link from 'next/link';
import { useI18n } from '@/i18n';

const philosophers = [
  { name: 'Rumi', years: '1207-1273', role: 'Mystical Poet' },
  { name: 'Hafez', years: '1315-1390', role: 'Poet of Vision' },
  { name: 'Saadi', years: '1210-1291', role: 'Moral Philosopher' },
  { name: 'Attar', years: '1145-1232', role: 'Mystic Poet' },
  { name: 'Ibn Sina', years: '980-1037', role: 'Physician-Philosopher' },
  { name: 'Mulla Sadra', years: '1571-1640', role: 'Transcendent Theosophy' },
];

const coreValues = [
  { 
    icon: <AutoStoriesIcon />,
    title: 'Timeless Wisdom', 
    description: 'Explore insights from over 2,500 years of Persian philosophical thought, from ancient Zoroastrian cosmology to modern Islamic philosophy.',
    color: '#722F37',
  },
  { 
    icon: <PsychologyIcon />,
    title: 'Accessible Learning', 
    description: 'AI-powered translations and interpretations make ancient wisdom understandable to everyone, regardless of background.',
    color: '#8b4513',
  },
  { 
    icon: <ExploreIcon />,
    title: 'Living Tradition', 
    description: 'Connect these timeless teachings to modern life and personal growth through interactive learning experiences.',
    color: '#2e4a3d',
  },
  { 
    icon: <GroupsIcon />,
    title: 'Inclusive Community', 
    description: 'All seekers welcome, regardless of background or belief. Wisdom transcends boundaries.',
    color: '#3d6b52',
  },
];

const features = [
  { title: '10,000+ Verses', description: 'Comprehensive collection of Persian poetry and philosophical quotes' },
  { title: 'AI Conversations', description: 'Chat with AI representations of historical philosophers' },
  { title: 'Learning Paths', description: 'Structured courses from beginner to advanced' },
  { title: 'Community', description: 'Connect with fellow seekers of wisdom' },
];

export default function AboutPage() {
  const { t } = useI18n();
  
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a3a2a 0%, #2e4a3d 50%, #3d6b52 100%)',
          py: { xs: 2, md: 3 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%23c9a962' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          },
        }}
      >
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ color: 'rgba(201, 169, 98, 0.9)', letterSpacing: 4, mb: 0.5, display: 'block' }}>
            Our Mission
          </Typography>
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 300, mb: 1 }}>
            {t.about.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            {t.about.subtitle}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 3, flex: 1, overflow: 'auto' }}>
        {/* Hikmatia Title */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Vazir", serif',
              fontSize: { xs: '3rem', md: '5rem' },
              mb: 2,
              background: 'linear-gradient(135deg, #722F37 0%, #8b4513 50%, #c9a962 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            حکمتیا
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
            Hikmatia
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.8 }}>
            Derived from the Persian word "Hikmat" (حکمت) meaning wisdom, philosophy, and the art of living well. 
            Our platform is dedicated to preserving and sharing the profound philosophical traditions of Persia.
          </Typography>
        </Box>

        {/* Core Values */}
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Our Core Values
        </Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {coreValues.map((value, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  border: '1px solid rgba(201, 169, 98, 0.15)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: 'rgba(201, 169, 98, 0.4)',
                    boxShadow: '0 8px 24px rgba(139, 69, 19, 0.1)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: `${value.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: value.color,
                      mb: 2,
                    }}
                  >
                    {value.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Featured Philosophers */}
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          The Great Philosophers
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
          For over two millennia, Persian philosophers have shaped human thought. 
          From Zoroaster's cosmic ethics to Mulla Sadra's transcendent philosophy, 
          Persia has been a cradle of wisdom.
        </Typography>
        
        <Grid container spacing={2} sx={{ mb: 8 }}>
          {philosophers.map((philosopher, index) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={index}>
              <Card 
                component={Link}
                href="/philosophers"
                sx={{
                  height: '100%',
                  textDecoration: 'none',
                  textAlign: 'center',
                  p: 2,
                  border: '1px solid rgba(201, 169, 98, 0.15)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(139, 69, 19, 0.15)',
                    borderColor: 'rgba(201, 169, 98, 0.4)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8b4513 0%, #c9a962 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: 'white',
                    fontFamily: '"Vazir", serif',
                    fontSize: '1.5rem',
                    boxShadow: '0 4px 12px rgba(139, 69, 19, 0.25)',
                  }}
                >
                  {philosopher.name[0]}
                </Box>
                <Typography variant="subtitle1" fontWeight={600}>
                  {philosopher.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block">
                  {philosopher.years}
                </Typography>
                <Typography variant="caption" sx={{ color: '#c9a962', fontWeight: 500 }} display="block">
                  {philosopher.role}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Features */}
        <Box sx={{ 
          bgcolor: 'rgba(26, 58, 42, 0.05)', 
          borderRadius: 4, 
          p: 4, 
          mb: 8,
          border: '1px solid rgba(201, 169, 98, 0.1)',
        }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 500 }}>
            What We Offer
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    p: 2,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'rgba(201, 169, 98, 0.05)',
                    },
                  }}
                >
                  <MenuBookIcon sx={{ fontSize: 40, color: '#c9a962', mb: 1 }} />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" gutterBottom>
            Begin Your Journey
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
            Join thousands of seekers exploring the depths of Persian wisdom.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap>
            <Button 
              variant="contained" 
              size="large" 
              component={Link}
              href="/explore"
              sx={{
                bgcolor: '#c9a962',
                color: '#1a3a2a',
                fontWeight: 600,
                px: 4,
                '&:hover': { bgcolor: '#d4bc7d' },
              }}
            >
              Explore Verses
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              component={Link}
              href="/learn"
              sx={{
                borderColor: 'rgba(201, 169, 98, 0.5)',
                color: '#c9a962',
                px: 4,
                '&:hover': { 
                  borderColor: '#c9a962',
                  bgcolor: 'rgba(201, 169, 98, 0.1)',
                },
              }}
            >
              Start Learning
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
