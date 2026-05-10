'use client';
import Image from 'next/image';
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
import { 
  HeroPattern, 
  FloatingMotif,
  CornerDecoration,
} from '@/components/SVGDecorations';

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
    color: '#c9a962',
  },
  { 
    icon: <PsychologyIcon />,
    title: 'Accessible Learning', 
    description: 'AI-powered translations and interpretations make ancient wisdom understandable to everyone, regardless of background.',
    color: '#c9a962',
  },
  { 
    icon: <ExploreIcon />,
    title: 'Living Tradition', 
    description: 'Connect these timeless teachings to modern life and personal growth through interactive learning experiences.',
    color: '#c9a962',
  },
  { 
    icon: <GroupsIcon />,
    title: 'Inclusive Community', 
    description: 'All seekers welcome, regardless of background or belief. Wisdom transcends boundaries.',
    color: '#c9a962',
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
    <Box sx={{ minHeight: '100vh', bgcolor: "background.default", color: '#f5f5f5' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0d1f18 0%, #1a3a2a 50%, #2e4a3d 100%)',
          minHeight: { xs: 200, md: 280 },
          py: { xs: 4, md: 6 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <HeroPattern color="#c9a962" opacity={0.1} />
        <CornerDecoration position="top-left" color="#c9a962" size={100} />
        <CornerDecoration position="bottom-right" color="#c9a962" size={100} />
        <FloatingMotif variant="celestial" color="#c9a962" size={60} top="15%" left="10%" opacity={0.15} />
        <FloatingMotif variant="geometric" color="#c9a962" size={50} top="20%" right="15%" opacity={0.1} />
        <FloatingMotif variant="waves" color="#c9a962" size={70} bottom="10%" right="5%" opacity={0.08} />
        
        {/* Background Image */}
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
          <Image src="/images/hero-main.png" alt="About Hikmatia" fill style={{ objectFit: 'cover' }} priority />
        </Box>
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="overline" sx={{ color: '#c9a962', letterSpacing: 6, mb: 1, display: 'block', fontSize: '0.75rem', fontWeight: 500 }}>
            Our Mission
          </Typography>
          <Typography variant="h3" sx={{ color: '#ffffff', fontWeight: 300, mb: 1, fontSize: { xs: '1.75rem', md: '2.5rem' }, letterSpacing: '-0.02em' }}>
            {t.about.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300, maxWidth: 500, mx: 'auto', lineHeight: 1.6, fontSize: '0.95rem' }}>
            {t.about.subtitle}
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, md: 4 } }}>
        {/* Hikmatia Title */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Vazir", serif',
              fontSize: { xs: '3rem', md: '5rem' },
              mb: 2,
              background: 'linear-gradient(135deg, #c9a962 0%, #d4bc7d 50%, #e8d5a3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            حکمتیا
          </Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>
            Hikmatia
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' }}>
            Derived from the Persian word &quot;Hikmat&quot; (حکمت) meaning wisdom, philosophy, and the art of living well. 
            Our platform is dedicated to preserving and sharing the profound philosophical traditions of Persia.
          </Typography>
        </Box>

        {/* Core Values */}
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#ffffff', fontWeight: 400 }}>
          Our Core Values
        </Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {coreValues.map((value, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  bgcolor: 'rgba(26, 58, 42, 0.3)', 
                  border: '1px solid rgba(201, 169, 98, 0.15)',
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: 'rgba(201, 169, 98, 0.4)',
                    boxShadow: '0 8px 24px rgba(201, 169, 98, 0.15)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: 'rgba(201, 169, 98, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: value.color,
                      mb: 2,
                    }}
                  >
                    {value.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, color: '#ffffff' }}>
                    {value.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Featured Philosophers */}
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', color: '#ffffff', fontWeight: 400 }}>
          The Great Philosophers
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', maxWidth: 600, mx: 'auto', color: 'rgba(255,255,255,0.7)' }}>
          For over two millennia, Persian philosophers have shaped human thought. 
          From Zoroaster&apos;s cosmic ethics to Mulla Sadra&apos;s transcendent philosophy, 
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
                  bgcolor: 'rgba(26, 58, 42, 0.3)', 
                  border: '1px solid rgba(201, 169, 98, 0.15)',
                  borderRadius: 3,
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 24px rgba(201, 169, 98, 0.15)',
                    borderColor: 'rgba(201, 169, 98, 0.4)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #c9a962 0%, #d4bc7d 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: '#0d1f18',
                    fontFamily: '"Vazir", serif',
                    fontSize: '1.5rem',
                    boxShadow: '0 4px 12px rgba(201, 169, 98, 0.25)',
                  }}
                >
                  {philosopher.name[0]}
                </Box>
                <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#ffffff' }}>
                  {philosopher.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block' }}>
                  {philosopher.years}
                </Typography>
                <Typography variant="caption" sx={{ color: '#c9a962', fontWeight: 500, display: 'block' }}>
                  {philosopher.role}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Features */}
        <Box sx={{ 
          bgcolor: 'rgba(26, 58, 42, 0.3)', 
          borderRadius: 3, 
          p: 4, 
          mb: 8,
          border: '1px solid rgba(201, 169, 98, 0.15)',
          backdropFilter: 'blur(10px)',
        }}>
          <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 400, color: '#ffffff' }}>
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
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 500, color: '#ffffff' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    {feature.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: '#ffffff', fontWeight: 400 }}>
            Begin Your Journey
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 500, mx: 'auto', color: 'rgba(255,255,255,0.7)' }}>
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
                color: '#0d1f18',
                fontWeight: 600,
                px: 4,
                borderRadius: 3,
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
                borderRadius: 3,
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
