'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ChatIcon from '@mui/icons-material/Chat';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import { useI18n } from '@/i18n';
import { philosophers, eraColors, eraLabels } from '@/lib/philosophers';
import type { Philosopher } from '@/types';
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

const getPhilosopherImage = (id: string): string | null => {
  return philosopherImages[id] || null;
};

export default function PhilosophersPage() {
  const { t } = useI18n();
  const [search, setSearch] = useState('');
  const [era, setEra] = useState('');
  const [school, setSchool] = useState('');

  const filteredPhilosophers = philosophers.filter((p) => {
    const matchesSearch = p.name.english.toLowerCase().includes(search.toLowerCase()) ||
      p.name.persian.includes(search) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesEra = !era || p.life.era === era;
    const matchesSchool = !school || p.school.some(s => s.toLowerCase().includes(school.toLowerCase()));
    return matchesSearch && matchesEra && matchesSchool;
  });

  const schools = [...new Set(philosophers.flatMap(p => p.school))];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a3a2a 0%, #2e4a3d 50%, #3d6b52 100%)',
          minHeight: { xs: 280, md: 350 },
          py: { xs: 6, md: 10 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <HeroPattern color="#c9a962" opacity={0.08} />
        <CornerDecoration position="top-left" color="#c9a962" size={120} />
        <CornerDecoration position="bottom-right" color="#c9a962" size={120} />
        <FloatingMotif variant="stars" color="#c9a962" size={80} top="10%" right="10%" opacity={0.12} />
        <FloatingMotif variant="geometric" color="#c9a962" size={60} bottom="15%" left="15%" opacity={0.1} />
        <FloatingMotif variant="celestial" color="#c9a962" size={50} top="20%" left="20%" opacity={0.08} />
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
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="overline" sx={{ color: 'rgba(201, 169, 98, 0.9)', letterSpacing: 4, mb: 2, display: 'block', fontSize: '0.875rem' }}>
            {t.philosophers.subtitle}
          </Typography>
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 300, mb: 3, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            {t.philosophers.title}
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 300, maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
            {t.philosophers.subtitle}
          </Typography>
        </Container>
      </Box>

      <Box sx={{ position: 'relative', py: 4, px: { xs: 2, md: 4 }, bgcolor: 'background.default' }}>
        <HeroPattern color="#8b4513" opacity={0.04} />
        <CornerDecoration position="top-left" color="#8b4513" size={80} />
        <CornerDecoration position="bottom-right" color="#8b4513" size={80} />
        
        <Container maxWidth={false} sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={3} sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            placeholder="Search philosophers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>{t.philosophers.era}</InputLabel>
            <Select value={era} label={t.philosophers.era} onChange={(e) => setEra(e.target.value)}>
              <MenuItem value="">All Eras</MenuItem>
              {Object.entries(eraLabels).map(([key, label]) => (
                <MenuItem key={key} value={key}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>{t.philosophers.school}</InputLabel>
            <Select value={school} label={t.philosophers.school} onChange={(e) => setSchool(e.target.value)}>
              <MenuItem value="">All Schools</MenuItem>
              {schools.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {filteredPhilosophers.map((philosopher) => (
          <Grid size={{ xs: 12, sm: 6, md: 2 }} key={philosopher.id}>
            <Card
              sx={{
                height: '100%',
                  bgcolor: 'background.paper',
                border: '1px solid rgba(139, 69, 19, 0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 24px rgba(139, 69, 19, 0.15)',
                },
              }}
            >
              <CardActionArea 
                component={Link} 
                href={`/philosophers/${philosopher.id}`}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    {getPhilosopherImage(philosopher.id) ? (
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          overflow: 'hidden',
                          border: '2px solid',
                          borderColor: 'rgba(201, 169, 98, 0.5)',
                        }}
                      >
                        <Image
                          src={getPhilosopherImage(philosopher.id)!}
                          alt={philosopher.name.english}
                          width={56}
                          height={56}
                          style={{ objectFit: 'cover' }}
                        />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #8b4513 0%, #c9a962 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: '"Vazir", serif',
                          fontSize: '1.5rem',
                          color: 'white',
                        }}
                      >
                        {philosopher.name.persian.slice(0, 1)}
                      </Box>
                    )}
                    <Chip
                      label={eraLabels[philosopher.life.era]}
                      size="small"
                      color={eraColors[philosopher.life.era]}
                      variant="outlined"
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {philosopher.name.english}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: '"Vazir", serif',
                        direction: 'rtl',
                        color: 'text.secondary',
                      }}
                    >
                      {philosopher.name.persian}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {philosopher.life.birth} - {philosopher.life.death ?? 'Present'}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 2, minHeight: 40 }}>
                    {philosopher.description}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {philosopher.school.map((s) => (
                      <Chip key={s} label={s} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </CardContent>

                {/* Action Icons */}
                <Box sx={{ p: 2, pt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AutoStoriesIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {philosopher.quoteCount} {t.philosophers.quotes}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton 
                      size="small" 
                      onClick={() => window.location.href = `/philosophers/${philosopher.id}`}
                      sx={{ color: 'text.secondary', '&:hover': { color: '#8b4513' } }}
                    >
                      <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => window.location.href = `/chat?philosopher=${philosopher.id}`}
                      sx={{ color: 'text.secondary', '&:hover': { color: '#8b4513' } }}
                    >
                      <ChatIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small"
                      sx={{ color: 'text.secondary', '&:hover': { color: '#722F37' } }}
                    >
                      <FavoriteBorderIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredPhilosophers.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No philosophers found. Try adjusting your filters.
          </Typography>
        </Box>
      )}
      </Container>
      </Box>
    </Box>
  );
}
