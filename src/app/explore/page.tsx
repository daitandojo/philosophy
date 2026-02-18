'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useI18n } from '@/i18n';
import {
  Box,
  Container,
  Typography as Typo,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Pagination,
  CircularProgress,
  Card,
  CardContent,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerseCard from '@/components/VerseCard';
import { philosophers } from '@/lib/philosophers';
import type { Verse } from '@/types';
import Image from 'next/image';
import { 
  HeroPattern, 
  FloatingMotif, 
  SectionDivider,
  CornerDecoration,
} from '@/components/SVGDecorations';

const LIKED_VERSES_KEY = 'hikmatia_liked_verses';

function ExploreContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const philosopherParam = searchParams.get('philosopher');
  
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('');
  const [source, setSource] = useState('');
  const [philosopher, setPhilosopher] = useState(philosopherParam || '');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [likedVerses, setLikedVerses] = useState<Set<string>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LIKED_VERSES_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    }
    return new Set();
  });

  const toggleLike = (verseId: string) => {
    setLikedVerses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(verseId)) {
        newSet.delete(verseId);
      } else {
        newSet.add(verseId);
      }
      localStorage.setItem(LIKED_VERSES_KEY, JSON.stringify([...newSet]));
      return newSet;
    });
  };

  useEffect(() => {
    const fetchVerses = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (theme) params.set('theme', theme);
        if (source) params.set('source', source);
        if (philosopher) params.set('philosopher', philosopher);
        params.set('page', page.toString());
        params.set('limit', '20');

        const response = await fetch(`/api/verses?${params}`);
        const data = await response.json();
        
        setVerses(data.verses || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error('Error fetching verses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [search, theme, source, philosopher, page]);

  const themes = ['Love', 'Wisdom', 'Divine', 'Self-knowledge', 'Journey', 'Friendship', 'Peace', 'Transformation'];
  const sources = ['Masnavi', 'Divan-e Shams', 'Fihi Ma Fihi', 'Mawlana Letters', 'Gulistan', 'Bustan', 'Divan-e Hafez', 'Shahnameh', 'Conference of the Birds', 'Ilahi-Nama', 'Walled Garden of Truth'];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a3a2a 0%, #2e4a3d 50%, #3d6b52 100%)',
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 6, md: 8 },
          flexShrink: 0,
        }}
      >
        <HeroPattern color="#c9a962" opacity={0.08} />
        <CornerDecoration position="top-left" color="#c9a962" size={100} />
        <CornerDecoration position="bottom-right" color="#c9a962" size={100} />
        <FloatingMotif variant="geometric" color="#c9a962" size={70} top="15%" right="8%" opacity={0.1} />
        <FloatingMotif variant="celestial" color="#c9a962" size={60} bottom="20%" left="10%" opacity={0.1} />
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
            src="/images/explore-hero.png"
            alt="Persian wisdom"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ color: 'rgba(201, 169, 98, 0.9)', letterSpacing: 4, mb: 0.5, display: 'block' }}>
            Persian Wisdom
          </Typography>
          <Typography variant="h2" sx={{ color: 'white', fontWeight: 300, mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}>
            {t.explore.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            {t.explore.subtitle}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 2, flex: 1, overflow: 'hidden' }}>
        <Box sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            placeholder={t.explore.searchPlaceholder}
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
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>{t.verse.philosopher}</InputLabel>
            <Select
              value={philosopher}
              label={t.verse.philosopher}
              onChange={(e) => setPhilosopher(e.target.value)}
            >
              <MenuItem value="">{t.philosophers.viewAll} {t.verse.philosopher}</MenuItem>
              {philosophers.map((p) => (
                <MenuItem key={p.id} value={p.id}>{p.name.english}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>{t.explore.themes}</InputLabel>
            <Select
              value={theme}
              label={t.explore.themes}
              onChange={(e) => setTheme(e.target.value)}
            >
              <MenuItem value="">{t.explore.allThemes}</MenuItem>
              {themes.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>{t.verse.source}</InputLabel>
            <Select
              value={source}
              label={t.verse.source}
              onChange={(e) => setSource(e.target.value)}
            >
              <MenuItem value="">{t.common.viewAll} {t.verse.source}</MenuItem>
              {sources.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Liked filter toggle */}
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
        <ToggleButtonGroup
          value={showLikedOnly ? 'liked' : 'all'}
          exclusive
          onChange={(_, value) => setShowLikedOnly(value === 'liked')}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              border: '1px solid rgba(139, 69, 19, 0.3)',
              color: '#5a5a5a',
              '&.Mui-selected': {
                bgcolor: 'rgba(139, 69, 19, 0.1)',
                color: '#8b4513',
                borderColor: '#8b4513',
              },
            },
          }}
        >
          <ToggleButton value="all">
            All Verses
          </ToggleButton>
          <ToggleButton value="liked" sx={{ gap: 1 }}>
            <FavoriteIcon sx={{ fontSize: 16 }} />
            Liked Only
          </ToggleButton>
        </ToggleButtonGroup>

        {showLikedOnly && (
          <Typo variant="body2" sx={{ color: 'text.secondary' }}>
            {verses.filter(v => likedVerses.has(v._id)).length} liked verse{verses.filter(v => likedVerses.has(v._id)).length !== 1 ? 's' : ''}
          </Typo>
        )}
      </Box>

      <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {philosopher && (
          <Chip
            label={philosophers.find(p => p.id === philosopher)?.name.english}
            onDelete={() => setPhilosopher('')}
            sx={{
              bgcolor: 'rgba(26, 58, 42, 0.15)',
              color: '#1a3a2a',
              fontWeight: 500,
              border: '1px solid rgba(26, 58, 42, 0.3)',
            }}
          />
        )}
        {theme && (
          <Chip
            label={theme}
            onDelete={() => setTheme('')}
            sx={{
              bgcolor: 'rgba(139, 69, 19, 0.15)',
              color: '#8b4513',
              fontWeight: 500,
              border: '1px solid rgba(139, 69, 19, 0.3)',
            }}
          />
        )}
        {source && (
          <Chip
            label={source}
            onDelete={() => setSource('')}
            sx={{
              bgcolor: 'rgba(201, 169, 98, 0.2)',
              color: '#8b4513',
              fontWeight: 500,
              border: '1px solid rgba(201, 169, 98, 0.4)',
            }}
          />
        )}
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : verses.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typo variant="h6" color="text.secondary">
            No verses found. Try adjusting your filters.
          </Typo>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {verses
              .filter(verse => !showLikedOnly || likedVerses.has(verse._id))
              .map((verse) => (
                <Grid size={{ xs: 12, md: 6 }} key={verse._id}>
                  <VerseCard 
                    verse={verse} 
                    isLiked={likedVerses.has(verse._id)}
                    onToggleLike={() => toggleLike(verse._id)}
                  />
                </Grid>
              ))}
          </Grid>
          
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#8b4513',
                    borderColor: 'rgba(139, 69, 19, 0.2)',
                  },
                  '& .MuiPaginationItem-root.Mui-selected': {
                    bgcolor: 'rgba(139, 69, 19, 0.1)',
                  },
                }}
              />
            </Box>
          )}
        </>
      )}
        </Box>
      </Container>
    </Box>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    }>
      <ExploreContent />
    </Suspense>
  );
}
