'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { philosophers, eraLabels, eraColors } from '@/lib/philosophers';
import { useI18n } from '@/i18n';
import Image from 'next/image';
import { 
  HeroPattern, 
  FloatingMotif, 
  SectionDivider,
  CornerDecoration,
} from '@/components/SVGDecorations';

const philosopherImages: Record<string, string> = {
  rumi: '/images/philosopher-rumi.png',
  hafez: '/images/philosopher-hafez.png',
  saadi: '/images/philosopher-saadi.png',
  attar: '/images/philosopher-attar.png',
  sanai: '/images/philosopher-sanai.png',
  jami: '/images/philosopher-jami.png',
  nizami: '/images/philosopher-nizami.png',
  ferdowsi: '/images/philosopher-ferdowsi.png',
  'ibn-sina': '/images/philosopher-ibn-sina.png',
  'al-farabi': '/images/philosopher-al-farabi.png',
  'al-kindi': '/images/philosopher-al-kindi.png',
  'al-ghazali': '/images/philosopher-al-ghazali.png',
  suhrawardi: '/images/philosopher-suhrawardi.png',
  'mulla-sadra': '/images/philosopher-mulla-sadra.png',
  'nasir-tusi': '/images/philosopher-nasir-tusi.png',
  'ibn-rushd': '/images/philosopher-ibn-rushd.png',
  'ibn-arabi': '/images/philosopher-ibn-arabi.png',
  'bayazid-bastami': '/images/philosopher-bayazid-bastami.png',
  hallaj: '/images/philosopher-hallaj.png',
  'junayd-baghdadi': '/images/philosopher-junayd-baghdadi.png',
  'abdul-qadir-gilani': '/images/philosopher-abdul-qadir-gilani.png',
  'najm-kubra': '/images/philosopher-najm-kubra.png',
  'seyyed-hossein-nasr': '/images/philosopher-seyyed-hossein-nasr.png',
  'allama-tabatabai': '/images/philosopher-allama-tabatabai.png',
  'morteza-motahhari': '/images/philosopher-morteza-motahhari.png',
  'abdolkarim-soroush': '/images/philosopher-abdolkarim-soroush.png',
  'Dariush-shayegan': '/images/philosopher-dariush-shayegan.png',
  zoroaster: '/images/philosopher-zoroaster.png',
  mazdak: '/images/philosopher-mazdak.png',
  mani: '/images/philosopher-mani.png',
};

const sortedPhilosophers = [...philosophers].sort((a, b) => a.life.birth - b.life.birth);

const worldEvents = [
  { year: 570, title: 'Prophet Muhammad born' },
  { year: 632, title: 'Islamic era begins' },
  { year: 750, title: 'Abbasid Caliphate' },
  { year: 1055, title: 'Seljuk Empire' },
  { year: 1258, title: 'Mongol Invasion' },
  { year: 1501, title: 'Safavid Dynasty' },
];

export default function TimelinePage() {
  const { t } = useI18n();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentPhilosopher = sortedPhilosophers[selectedIndex];
  const prevPhilosopher = selectedIndex > 0 ? sortedPhilosophers[selectedIndex - 1] : null;
  const nextPhilosopher = selectedIndex < sortedPhilosophers.length - 1 ? sortedPhilosophers[selectedIndex + 1] : null;

  const getPhilosopherImage = (id: string): string | null => {
    return philosopherImages[id] || null;
  };

  const getEraColor = (era: string): string => {
    return eraColors[era] || '#8b4513';
  };

  const handlePrev = () => {
    setSelectedIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex(prev => Math.min(sortedPhilosophers.length - 1, prev + 1));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0f1f18', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 3, md: 5 },
          textAlign: 'center',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <HeroPattern color="#c9a962" opacity={0.08} />
        <FloatingMotif variant="stars" color="#c9a962" size={70} top="10%" right="10%" opacity={0.1} />
        <FloatingMotif variant="waves" color="#c9a962" size={60} bottom="15%" left="10%" opacity={0.1} />
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
            src="/images/explore-hero.png"
            alt="Persian wisdom"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>

        {/* Decorative SVG River */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            opacity: 0.2,
          }}
        >
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M0,60 C150,120 350,0 600,60 C850,120 1050,0 1200,60 L1200,120 L0,120 Z" fill="url(#riverGradient)" />
            <defs>
              <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a3a2a" />
                <stop offset="50%" stopColor="#2e4a3d" />
                <stop offset="100%" stopColor="#1a3a2a" />
              </linearGradient>
            </defs>
          </svg>
        </Box>

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="overline" sx={{ color: 'rgba(201, 169, 98, 0.9)', letterSpacing: 4, mb: 1, display: 'block' }}>
            Historical Journey
          </Typography>
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 300, mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}>
            {t.timeline.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            {t.timeline.subtitle}
          </Typography>
        </Container>
      </Box>

      {/* Journey Timeline */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* SVG River Background */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
          }}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c9a962" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#c9a962" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#c9a962" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Flowing river path */}
            <path 
              d="M0,50 Q25,30 50,50 T100,50" 
              stroke="url(#waterGradient)" 
              strokeWidth="8" 
              fill="none"
              strokeLinecap="round"
            />
            {/* Decorative waves - using deterministic values */}
            {[...Array(20)].map((_, i) => (
              <circle 
                key={i}
                cx={`${i * 5 + 2}`} 
                cy={50 + Math.sin(i * 0.8) * 3} 
                r="1" 
                fill="#c9a962"
                opacity={0.4}
              />
            ))}
          </svg>
        </Box>

        {/* Navigation */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 3, py: 2 }}>
          <IconButton 
            onClick={handlePrev} 
            disabled={selectedIndex === 0}
            sx={{ color: 'white', bgcolor: 'rgba(139,69,19,0.3)', '&:hover': { bgcolor: 'rgba(139,69,19,0.5)' } }}
          >
            <ChevronLeftIcon />
          </IconButton>
          
          <Stack direction="row" spacing={1} alignItems="center">
            {sortedPhilosophers.slice(Math.max(0, selectedIndex - 2), selectedIndex + 3).map((p, idx) => {
              const actualIdx = Math.max(0, selectedIndex - 2) + idx;
              return (
                <Box
                  key={p.id}
                  onClick={() => setSelectedIndex(actualIdx)}
                  sx={{
                    width: actualIdx === selectedIndex ? 12 : 8,
                    height: actualIdx === selectedIndex ? 12 : 8,
                    borderRadius: '50%',
                    bgcolor: actualIdx === selectedIndex ? '#c9a962' : 'rgba(201,169,98,0.3)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              );
            })}
          </Stack>

          <IconButton 
            onClick={handleNext}
            disabled={selectedIndex === sortedPhilosophers.length - 1}
            sx={{ color: 'white', bgcolor: 'rgba(139,69,19,0.3)', '&:hover': { bgcolor: 'rgba(139,69,19,0.5)' } }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Stack>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', alignItems: 'center', py: 4 }}>
          <Box sx={{ width: '100%' }}>
            {/* Current Philosopher Card */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'center' }}>
              
              {/* Philosopher Portrait */}
              <Box 
                component={Link}
                href={`/philosophers/${currentPhilosopher.id}`}
                sx={{ 
                  position: 'relative',
                  width: { xs: 200, md: 280 },
                  height: { xs: 200, md: 280 },
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    border: '4px solid',
                    borderColor: getEraColor(currentPhilosopher.life.era),
                    overflow: 'hidden',
                    boxShadow: `0 0 40px ${getEraColor(currentPhilosopher.life.era)}40`,
                  }}
                >
                  {getPhilosopherImage(currentPhilosopher.id) ? (
                    <Image
                      src={getPhilosopherImage(currentPhilosopher.id)!}
                      alt={currentPhilosopher.name.english}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        bgcolor: getEraColor(currentPhilosopher.life.era),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '4rem',
                        color: 'white',
                      }}
                    >
                      {currentPhilosopher.name.persian[0]}
                    </Box>
                  )}
                </Box>
                {/* Chat button overlay */}
                <Box
                  component={Link}
                  href={`/chat?philosopher=${currentPhilosopher.id}`}
                  onClick={(e) => e.stopPropagation()}
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: '#8b4513',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    '&:hover': { bgcolor: '#a0522d' },
                  }}
                >
                  <AutoStoriesIcon />
                </Box>
              </Box>

              {/* Philosopher Info */}
              <Card
                sx={{
                  flex: 1,
                  background: 'rgba(26, 58, 42, 0.4)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(201, 169, 98, 0.2)',
                  borderRadius: 3,
                  maxWidth: 600,
                  minHeight: 380,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Chip 
                      label={eraLabels[currentPhilosopher.life.era] || currentPhilosopher.life.era}
                      size="small"
                      sx={{ 
                        bgcolor: getEraColor(currentPhilosopher.life.era),
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                    <Chip 
                      label={`${currentPhilosopher.life.birth} - ${currentPhilosopher.life.death}`}
                      size="small"
                      variant="outlined"
                      sx={{ borderColor: 'rgba(201, 169, 98, 0.5)', color: '#c9a962' }}
                    />
                  </Stack>

                  <Typography variant="h3" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                    {currentPhilosopher.name.english}
                  </Typography>
                  
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontFamily: '"Vazir", serif',
                      direction: 'rtl', 
                      color: 'rgba(201, 169, 98, 0.9)',
                      mb: 3,
                    }}
                  >
                    {currentPhilosopher.name.persian}
                  </Typography>

                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.8, mb: 3, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
                    {currentPhilosopher.description}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1, mt: 'auto' }}>
                    {currentPhilosopher.school.slice(0, 3).map((s) => (
                      <Chip 
                        key={s}
                        label={s}
                        size="small"
                        variant="outlined"
                        sx={{ borderColor: 'rgba(201, 169, 98, 0.3)', color: 'rgba(255,255,255,0.7)' }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Box>

            {/* Prev/Next Preview */}
            <Stack direction="row" justifyContent="space-between" sx={{ mt: 4, px: { md: 8 } }}>
              {prevPhilosopher && (
                <Box 
                  onClick={() => setSelectedIndex(selectedIndex - 1)}
                  sx={{ cursor: 'pointer', opacity: 0.6, '&:hover': { opacity: 1 } }}
                >
                  <Typography variant="caption" sx={{ color: 'rgba(201,169,98,0.7)' }}>
                    ← Previous
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    {prevPhilosopher.name.english}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    {prevPhilosopher.life.birth}
                  </Typography>
                </Box>
              )}
              
              {nextPhilosopher && (
                <Box 
                  onClick={() => setSelectedIndex(selectedIndex + 1)}
                  sx={{ cursor: 'pointer', opacity: 0.6, textAlign: 'right', '&:hover': { opacity: 1 } }}
                >
                  <Typography variant="caption" sx={{ color: 'rgba(201,169,98,0.7)' }}>
                    Next →
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'white' }}>
                    {nextPhilosopher.name.english}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                    {nextPhilosopher.life.birth}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
        </Container>

        {/* World Events Timeline */}
        <Box sx={{ py: 3, borderTop: '1px solid rgba(201,169,98,0.1)' }}>
          <Container maxWidth="lg">
            <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 1, '&::-webkit-scrollbar': { height: 4 }, '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(201,169,98,0.3)', borderRadius: 2 } }}>
              {worldEvents.map((event, idx) => (
                <Box 
                  key={idx}
                  sx={{ 
                    flexShrink: 0,
                    px: 2,
                    py: 1,
                    borderLeft: '2px solid',
                    borderColor: 'rgba(201,169,98,0.3)',
                  }}
                >
                  <Typography variant="caption" sx={{ color: '#c9a962', fontWeight: 600 }}>
                    {event.year}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                    {event.title}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
