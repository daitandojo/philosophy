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
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ChatIcon from '@mui/icons-material/Chat';
import { philosophers, eraColors, eraLabels } from '@/lib/philosophers';
import type { Philosopher } from '@/types';

export default function PhilosophersPage() {
  const [search, setSearch] = useState('');
  const [era, setEra] = useState('');
  const [school, setSchool] = useState('');

  const filteredPhilosophers = philosophers.filter((p) => {
    const matchesSearch = p.name.english.toLowerCase().includes(search.toLowerCase()) ||
      p.name.persian.includes(search) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesEra = !era || p.era === era;
    const matchesSchool = !school || p.school.some(s => s.toLowerCase().includes(school.toLowerCase()));
    return matchesSearch && matchesEra && matchesSchool;
  });

  const schools = [...new Set(philosophers.flatMap(p => p.school))];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Persian Philosophers
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Explore 2,500 years of wisdom from Persia's greatest minds
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
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
            <InputLabel>Era</InputLabel>
            <Select value={era} label="Era" onChange={(e) => setEra(e.target.value)}>
              <MenuItem value="">All Eras</MenuItem>
              {Object.entries(eraLabels).map(([key, label]) => (
                <MenuItem key={key} value={key}>{label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel>School</InputLabel>
            <Select value={school} label="School" onChange={(e) => setSchool(e.target.value)}>
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
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={philosopher.id}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(180deg, #ffffff 0%, #faf9f7 100%)',
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
                    <Chip
                      label={eraLabels[philosopher.era]}
                      size="small"
                      color={eraColors[philosopher.era]}
                      variant="outlined"
                    />
                  </Box>

                  <Typography variant="h5" sx={{ mb: 0.5 }}>
                    {philosopher.name.english}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: '"Vazir", serif',
                      direction: 'rtl',
                      color: 'text.secondary',
                      mb: 2,
                    }}
                  >
                    {philosopher.name.persian}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {philosopher.life.birth} - {philosopher.life.death}
                  </Typography>

                  <Typography variant="body2" sx={{ mb: 2, minHeight: 60 }}>
                    {philosopher.description}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {philosopher.school.map((s) => (
                      <Chip key={s} label={s} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </CardContent>

                <Box sx={{ p: 2, pt: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AutoStoriesIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {philosopher.quoteCount} quotes
                  </Typography>
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
  );
}
