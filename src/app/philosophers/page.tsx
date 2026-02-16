'use client';
import { useState } from 'react';
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
import { Philosopher } from '@/types';

const philosophers: Philosopher[] = [
  {
    id: 'rumi',
    name: { persian: 'مولانا', english: 'Rumi' },
    life: { birth: 1207, death: 1273, birthPlace: 'Balkh (modern Afghanistan)', deathPlace: 'Konya, Turkey' },
    school: ['Sufi Mysticism', 'Poetry'],
    description: 'The mystical poet of divine love whose poetry has touched souls for centuries. His Masnavi is considered one of the greatest works of mystical poetry.',
    quoteCount: 450,
    era: 'golden-age',
  },
  {
    id: 'hafez',
    name: { persian: 'حافظ', english: 'Hafez' },
    life: { birth: 1315, death: 1390, birthPlace: 'Shiraz, Iran', deathPlace: 'Shiraz, Iran' },
    school: ['Sufi Mysticism', 'Lyric Poetry'],
    description: 'The immortal Persian poet whose Divan contains some of the most beautiful ghazals ever written. Known as "The Interpreter" for his profound mystical insights.',
    quoteCount: 380,
    era: 'golden-age',
  },
  {
    id: 'saadi',
    name: { persian: 'سعدی', english: 'Saadi Shirazi' },
    life: { birth: 1210, death: 1291, birthPlace: 'Shiraz, Iran', deathPlace: 'Shiraz, Iran' },
    school: ['Sufi Wisdom', 'Moral Philosophy'],
    description: 'The wise master of practical virtue. His Gulistan and Bustan are treasured for their ethical guidance and beautiful storytelling.',
    quoteCount: 320,
    era: 'golden-age',
  },
  {
    id: 'attar',
    name: { persian: 'عطار', english: 'Attar of Nishapur' },
    life: { birth: 1145, death: 1221, birthPlace: 'Nishapur, Iran', deathPlace: 'Nishapur, Iran' },
    school: ['Sufi Mysticism', 'Poetry'],
    description: 'The visionary mystic whose "Conference of the Birds" is a masterpiece of allegorical poetry exploring the soul\'s journey to God.',
    quoteCount: 180,
    era: 'classical',
  },
  {
    id: 'sanai',
    name: { persian: 'سنایی', english: 'Sanai' },
    life: { birth: 1080, death: 1131, birthPlace: 'Ghazni, Afghanistan', deathPlace: 'Ghazni, Afghanistan' },
    school: ['Sufi Poetry', 'Mystical Philosophy'],
    description: 'The pioneering Sufi poet who first used romantic imagery to express spiritual themes. His "Walled Garden of Truth" influenced Rumi.',
    quoteCount: 120,
    era: 'classical',
  },
  {
    id: 'ibn-sina',
    name: { persian: 'ابن سینا', english: 'Ibn Sina (Avicenna)' },
    life: { birth: 980, death: 1037, birthPlace: 'Bukhara, Uzbekistan', deathPlace: 'Hamadan, Iran' },
    school: ['Islamic Philosophy', 'Peripatetic', 'Medicine'],
    description: 'The greatest philosopher and physician of the Islamic Golden Age. His "Canon of Medicine" was the medical textbook in Europe for 600 years.',
    quoteCount: 150,
    era: 'classical',
  },
  {
    id: 'ghazali',
    name: { persian: 'غزالی', english: 'Al-Ghazali' },
    life: { birth: 1058, death: 1111, birthPlace: 'Tus, Iran', deathPlace: 'Tus, Iran' },
    school: ['Theology', 'Sufi Mysticism', 'Philosophy'],
    description: 'The reviver of religious thought who reconciled Sufi mysticism with orthodox Islam. His "Incoherence of the Philosophers" shaped Islamic intellectual history.',
    quoteCount: 140,
    era: 'classical',
  },
  {
    id: 'mulla-sadra',
    name: { persian: 'ملاصدرا', english: 'Mulla Sadra' },
    life: { birth: 1571, death: 1640, birthPlace: 'Shiraz, Iran', deathPlace: 'Shiraz, Iran' },
    school: ['Transcendent Theosophy', 'Illuminationist'],
    description: 'The revolutionary philosopher who founded the "Transcendent Theosophy" school, synthesizing philosophy, theology, and Sufi mysticism.',
    quoteCount: 90,
    era: 'modern',
  },
  {
    id: 'ibn-arabi',
    name: { persian: 'ابن عربی', english: 'Ibn Arabi' },
    life: { birth: 1165, death: 1240, birthPlace: 'Murcia, Spain', deathPlace: 'Damascus, Syria' },
    school: ['Sufi Mysticism', 'Theosophy'],
    description: 'The "Greatest Master" whose philosophical system of Wahdat al-Wujud (Unity of Being) profoundly influenced Sufi thought worldwide.',
    quoteCount: 110,
    era: 'classical',
  },
  {
    id: 'jami',
    name: { persian: 'جامی', english: 'Jami' },
    life: { birth: 1414, death: 1492, birthPlace: 'Jam, Iran', deathPlace: 'Herat, Afghanistan' },
    school: ['Sufi Poetry', 'Romantic Epic'],
    description: 'The last great master of classical Persian Sufi poetry, whose "Yusuf and Zulaikha" is a pinnacle of mystical romance.',
    quoteCount: 95,
    era: 'golden-age',
  },
  {
    id: 'nizami',
    name: { persian: 'نظامی', english: 'Nizami Ganjavi' },
    life: { birth: 1141, death: 1209, birthPlace: 'Ganja, Azerbaijan', deathPlace: 'Ganja, Azerbaijan' },
    school: ['Romantic Epic', 'Poetry'],
    description: 'The master of the Khamsa (Five Poems), whose romantic epics combined love stories with spiritual wisdom.',
    quoteCount: 85,
    era: 'classical',
  },
  {
    id: 'ferdowsi',
    name: { persian: 'فردوسی', english: 'Ferdowsi' },
    life: { birth: 940, death: 1020, birthPlace: 'Tus, Iran', deathPlace: 'Tus, Iran' },
    school: ['Epic Poetry', 'Persian Literature'],
    description: 'The immortal poet who preserved Persian language and culture through his Shahnameh, the Book of Kings.',
    quoteCount: 200,
    era: 'classical',
  },
];

const eraColors: Record<string, 'primary' | 'secondary' | 'success' | 'warning' | 'info'> = {
  ancient: 'info',
  classical: 'secondary',
  'golden-age': 'primary',
  modern: 'warning',
};

const eraLabels: Record<string, string> = {
  ancient: 'Ancient (Pre-Islamic)',
  classical: 'Classical (8th-13th c.)',
  'golden-age': 'Golden Age (13th-16th c.)',
  modern: 'Modern (16th-21st c.)',
};

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
              <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
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
