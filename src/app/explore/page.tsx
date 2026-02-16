'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Typography as Typo,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  Stack,
  Pagination,
  CircularProgress,
  FormControlLabel,
  Switch,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import VerseCard from '@/components/VerseCard';
import { philosophers } from '@/lib/philosophers';
import type { Verse } from '@/types';

function ExploreContent() {
  const searchParams = useSearchParams();
  const philosopherParam = searchParams.get('philosopher');
  
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [theme, setTheme] = useState('');
  const [source, setSource] = useState('');
  const [philosopher, setPhilosopher] = useState(philosopherParam || '');
  const [wisdomRange, setWisdomRange] = useState<number[]>([1, 10]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [semanticSearch, setSemanticSearch] = useState(false);

  useEffect(() => {
    const fetchVerses = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (theme) params.set('theme', theme);
        if (source) params.set('source', source);
        if (philosopher) params.set('philosopher', philosopher);
        params.set('minWisdom', wisdomRange[0].toString());
        params.set('maxWisdom', wisdomRange[1].toString());
        params.set('page', page.toString());
        params.set('limit', '10');
        if (semanticSearch) params.set('semantic', 'true');

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
  }, [search, theme, source, philosopher, wisdomRange, page, semanticSearch]);

  const themes = ['Love', 'Wisdom', 'Divine', 'Self-knowledge', 'Journey', 'Friendship', 'Peace', 'Transformation'];
  const sources = ['Masnavi', 'Divan-e Shams', 'Fihi Ma Fihi', 'Mawlana Letters', 'Gulistan', 'Bustan', 'Divan-e Hafez', 'Shahnameh', 'Conference of the Birds', 'Ilahi-Nama', 'Walled Garden of Truth'];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typo variant="h3" sx={{ mb: 4 }}>
        Explore Persian Wisdom
      </Typo>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            fullWidth
            placeholder="Search verses..."
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
            <InputLabel>Philosopher</InputLabel>
            <Select
              value={philosopher}
              label="Philosopher"
              onChange={(e) => setPhilosopher(e.target.value)}
            >
              <MenuItem value="">All Philosophers</MenuItem>
              {philosophers.map((p) => (
                <MenuItem key={p.id} value={p.id}>{p.name.english}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Theme</InputLabel>
            <Select
              value={theme}
              label="Theme"
              onChange={(e) => setTheme(e.target.value)}
            >
              <MenuItem value="">All Themes</MenuItem>
              {themes.map((t) => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Source</InputLabel>
            <Select
              value={source}
              label="Source"
              onChange={(e) => setSource(e.target.value)}
            >
              <MenuItem value="">All Sources</MenuItem>
              {sources.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typo gutterBottom>Wisdom Score Range: {wisdomRange[0]} - {wisdomRange[1]}</Typo>
          <Slider
            value={wisdomRange}
            onChange={(_, newValue) => setWisdomRange(newValue as number[])}
            valueLabelDisplay="auto"
            min={1}
            max={10}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <FormControlLabel
            control={
              <Switch
                checked={semanticSearch}
                onChange={(e) => setSemanticSearch(e.target.checked)}
                icon={<AutoAwesomeIcon />}
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AutoAwesomeIcon color="primary" fontSize="small" />
                <Typo>AI Semantic Search (finds conceptually similar verses)</Typo>
              </Box>
            }
          />
        </Grid>
      </Grid>

      <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {philosopher && (
          <Chip
            label={`Philosopher: ${philosophers.find(p => p.id === philosopher)?.name.english}`}
            onDelete={() => setPhilosopher('')}
            color="primary"
          />
        )}
        {theme && (
          <Chip
            label={`Theme: ${theme}`}
            onDelete={() => setTheme('')}
            color="secondary"
          />
        )}
        {source && (
          <Chip
            label={`Source: ${source}`}
            onDelete={() => setSource('')}
            color="warning"
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
          <Stack spacing={2}>
            {verses.map((verse) => (
              <VerseCard key={verse._id} verse={verse} />
            ))}
          </Stack>
          
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, newPage) => setPage(newPage)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
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
