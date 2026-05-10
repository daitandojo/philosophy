'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useI18n } from '@/i18n';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Pagination,
  CircularProgress,
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
  const [likedVerses, setLikedVerses] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LIKED_VERSES_KEY);
      if (saved) {
        setLikedVerses(new Set(JSON.parse(saved)));
      }
    }
  }, []);

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
    <Box sx={{ minHeight: '100vh', bgcolor: "background.default", color: '#f5f5f5' }}>
      {/* Hero */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0d1f18 0%, #1a3a2a 50%, #2e4a3d 100%)',
          minHeight: { xs: 180, md: 220 },
          position: 'relative',
          overflow: 'hidden',
          py: { xs: 4, md: 5 },
        }}
      >
        <HeroPattern color="#c9a962" opacity={0.1} />
        <CornerDecoration position="top-left" color="#c9a962" size={100} />
        <CornerDecoration position="bottom-right" color="#c9a962" size={100} />
        <FloatingMotif variant="celestial" color="#c9a962" size={60} top="15%" left="8%" opacity={0.15} />
        <FloatingMotif variant="geometric" color="#c9a962" size={50} bottom="20%" right="10%" opacity={0.1} />
        
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
          <Image src="/images/explore-hero.png" alt="Persian wisdom" fill style={{ objectFit: 'cover' }} priority />
        </Box>
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="overline" sx={{ color: '#c9a962', letterSpacing: 6, mb: 1, display: 'block', fontSize: '0.75rem', fontWeight: 500 }}>
            Hikmatia
          </Typography>
          <Typography variant="h3" sx={{ color: '#ffffff', fontWeight: 300, mb: 1, fontSize: { xs: '1.75rem', md: '2.5rem' }, letterSpacing: '-0.02em' }}>
            {t.explore.title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300, maxWidth: 500, lineHeight: 1.6, fontSize: '0.95rem' }}>
            {t.explore.subtitle}
          </Typography>
        </Container>
      </Box>

      {/* Filters */}
      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 4 } }}>
        <Box sx={{ 
          bgcolor: 'rgba(26, 58, 42, 0.3)', 
          border: '1px solid rgba(201, 169, 98, 0.15)',
          borderRadius: 3,
          backdropFilter: 'blur(10px)',
          p: 3,
          mb: 4,
        }}>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <Box 
                onClick={() => setShowLikedOnly(!showLikedOnly)}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1.5, 
                  cursor: 'pointer',
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: showLikedOnly ? 'rgba(201, 169, 98, 0.15)' : 'transparent',
                  border: '1px solid',
                  borderColor: showLikedOnly ? '#c9a962' : 'rgba(201, 169, 98, 0.2)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: 'rgba(201, 169, 98, 0.1)',
                  },
                }}
              >
                <FavoriteIcon sx={{ color: showLikedOnly ? '#c9a962' : 'rgba(255,255,255,0.5)', fontSize: 20 }} />
                <Typography sx={{ color: showLikedOnly ? '#c9a962' : 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>
                  {showLikedOnly ? 'Showing Liked' : 'Show Liked'}
                </Typography>
              </Box>
            </Grid>
            
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                size="small"
                placeholder={t.explore.searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(0,0,0,0.2)',
                    color: '#f5f5f5',
                    '& fieldset': { borderColor: 'rgba(201, 169, 98, 0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(201, 169, 98, 0.4)' },
                    '&.Mui-focused fieldset': { borderColor: '#c9a962' },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'rgba(255,255,255,0.4)',
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255,255,255,0.4)' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid size={{ xs: 6, md: 2 }}>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {philosophers.slice(0, 4).map((p) => (
                  <Chip
                    key={p.id}
                    label={p.name.english.split(' ')[0]}
                    onClick={() => setPhilosopher(philosopher === p.id ? '' : p.id)}
                    sx={{
                      bgcolor: philosopher === p.id ? '#c9a962' : 'rgba(201, 169, 98, 0.1)',
                      color: philosopher === p.id ? '#0d1f18' : 'rgba(255,255,255,0.8)',
                      fontWeight: philosopher === p.id ? 600 : 400,
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: philosopher === p.id ? '#d4bc7d' : 'rgba(201, 169, 98, 0.2)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Grid>
            
            <Grid size={{ xs: 6, md: 2 }}>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {themes.slice(0, 4).map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    onClick={() => setTheme(theme === t ? '' : t)}
                    size="small"
                    sx={{
                      bgcolor: theme === t ? 'rgba(201, 169, 98, 0.3)' : 'transparent',
                      color: theme === t ? '#c9a962' : 'rgba(255,255,255,0.6)',
                      border: '1px solid',
                      borderColor: theme === t ? '#c9a962' : 'rgba(201, 169, 98, 0.2)',
                      fontSize: '0.65rem',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Box>
            </Grid>
            
            <Grid size={{ xs: 12, md: 2 }}>
              <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                {sources.slice(0, 4).map((s) => (
                  <Chip
                    key={s}
                    label={s.split(' ')[0]}
                    onClick={() => setSource(source === s ? '' : s)}
                    size="small"
                    sx={{
                      bgcolor: source === s ? 'rgba(201, 169, 98, 0.3)' : 'transparent',
                      color: source === s ? '#c9a962' : 'rgba(255,255,255,0.6)',
                      border: '1px solid',
                      borderColor: source === s ? '#c9a962' : 'rgba(201, 169, 98, 0.2)',
                      fontSize: '0.65rem',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Active Filters */}
          {(philosopher || theme || source) && (
            <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(201, 169, 98, 0.1)', display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {philosopher && (
                <Chip
                  label={philosophers.find(p => p.id === philosopher)?.name.english}
                  onDelete={() => setPhilosopher('')}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(201, 169, 98, 0.15)',
                    color: '#c9a962',
                    border: '1px solid rgba(201, 169, 98, 0.3)',
                  }}
                />
              )}
              {theme && (
                <Chip
                  label={theme}
                  onDelete={() => setTheme('')}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(201, 169, 98, 0.15)',
                    color: '#c9a962',
                    border: '1px solid rgba(201, 169, 98, 0.3)',
                  }}
                />
              )}
              {source && (
                <Chip
                  label={source}
                  onDelete={() => setSource('')}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(201, 169, 98, 0.15)',
                    color: '#c9a962',
                    border: '1px solid rgba(201, 169, 98, 0.3)',
                  }}
                />
              )}
            </Box>
          )}
        </Box>

        {/* Results */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: '#c9a962' }} />
          </Box>
        ) : verses.filter(v => !showLikedOnly || likedVerses.has(v._id)).length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 8,
            bgcolor: 'rgba(26, 58, 42, 0.3)', 
            borderRadius: 3,
            border: '1px solid rgba(201, 169, 98, 0.15)',
          }}>
            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.6)', mb: 1 }}>
              No verses found
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              Try adjusting your filters
            </Typography>
          </Box>
        ) : (
          <>
            <Grid container spacing={2}>
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
                      color: '#c9a962',
                      borderColor: 'rgba(201, 169, 98, 0.2)',
                    },
                    '& .MuiPaginationItem-root.Mui-selected': {
                      bgcolor: 'rgba(201, 169, 98, 0.15)',
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <Box sx={{ minHeight: '100vh', bgcolor: "background.default", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#c9a962' }} />
      </Box>
    }>
      <ExploreContent />
    </Suspense>
  );
}
