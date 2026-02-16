'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import PublicIcon from '@mui/icons-material/Public';
import { philosophers, eraLabels, eraColors } from '@/lib/philosophers';
import { useI18n } from '@/i18n';

type ZoomLevel = 'millennium' | 'century' | 'decade' | 'year';

interface TimelineEvent {
  year: number;
  philosopher: typeof philosophers[0];
  type: 'birth' | 'death' | 'work';
  description: string;
}

interface WorldEvent {
  year: number;
  title: string;
  description: string;
  region: string;
}

const worldEvents: WorldEvent[] = [
  { year: 570, title: 'Birth of Prophet Muhammad', description: 'The beginning of Islamic era', region: 'Arabia' },
  { year: 632, title: 'Death of Prophet Muhammad', description: 'End of Rashidun Caliphate begins', region: 'Arabia' },
  { year: 750, title: 'Abbasid Caliphate', description: 'Golden age of Islamic civilization begins', region: 'Baghdad' },
  { year: 1055, title: 'Seljuk Empire', description: 'Turco-Persian empire rises', region: 'Persia' },
  { year: 1258, title: 'Mongol Invasion', description: 'Destruction of Baghdad', region: 'Baghdad' },
  { year: 1501, title: 'Safavid Dynasty', description: 'Shia Islamic empire established', region: 'Persia' },
  { year: 1736, title: 'Afsharid Dynasty', description: 'Nader Shah\'s reign', region: 'Persia' },
  { year: 1794, title: 'Qajar Dynasty', description: 'Modern Iranian state emerges', region: 'Persia' },
  { year: 1925, title: 'Pahlavi Dynasty', description: 'Modernization of Iran', region: 'Iran' },
];

export default function TimelinePage() {
  const { t } = useI18n();
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [zoomLevel, setZoomLevel] = useState<ZoomLevel>('century');
  const [showWorldEvents, setShowWorldEvents] = useState(true);

  const timelineEvents: TimelineEvent[] = philosophers.flatMap(p => [
    {
      year: p.life.birth,
      philosopher: p,
      type: 'birth' as const,
      description: `Born in ${p.life.birthPlace}`,
    },
    {
      year: p.life.death,
      philosopher: p,
      type: 'death' as const,
      description: `Passed away in ${p.life.deathPlace}`,
    },
  ]).sort((a, b) => a.year - b.year);

  const filteredEvents = selectedEra === 'all' 
    ? timelineEvents 
    : timelineEvents.filter(e => e.philosopher.life.era === selectedEra);

  const getYearRange = () => {
    const years = timelineEvents.map(e => e.year);
    const min = Math.min(...years);
    const max = Math.max(...years);
    
    switch (zoomLevel) {
      case 'millennium':
        return { start: -1000, end: 2000, step: 500 };
      case 'century':
        return { start: 800, end: 2000, step: 100 };
      case 'decade':
        return { start: 1000, end: 2000, step: 25 };
      case 'year':
        return { start: 1900, end: 2000, step: 5 };
      default:
        return { start: 800, end: 2000, step: 100 };
    }
  };

  const yearRange = getYearRange();

  const filteredWorldEvents = showWorldEvents 
    ? worldEvents.filter(e => e.year >= yearRange.start && e.year <= yearRange.end)
    : [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          {t.timeline.title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {t.timeline.subtitle}
        </Typography>
      </Box>

      {/* Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        {/* Zoom Controls */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="body2" color="text.secondary">Zoom:</Typography>
          <ToggleButtonGroup
            value={zoomLevel}
            exclusive
            onChange={(_, v) => v && setZoomLevel(v)}
            size="small"
          >
            <ToggleButton value="millennium"><Typography variant="caption">Millennium</Typography></ToggleButton>
            <ToggleButton value="century"><Typography variant="caption">Century</Typography></ToggleButton>
            <ToggleButton value="decade"><Typography variant="caption">Decade</Typography></ToggleButton>
            <ToggleButton value="year"><Typography variant="caption">Year</Typography></ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        {/* World Events Toggle */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <PublicIcon fontSize="small" color={showWorldEvents ? 'primary' : 'disabled'} />
          <Chip 
            label="World Events" 
            onClick={() => setShowWorldEvents(!showWorldEvents)}
            color={showWorldEvents ? 'primary' : 'default'}
            variant={showWorldEvents ? 'filled' : 'outlined'}
            clickable
          />
        </Stack>
      </Box>

      {/* Era Filters */}
      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}>
        <Chip 
          label="All Eras" 
          onClick={() => setSelectedEra('all')}
          color={selectedEra === 'all' ? 'primary' : 'default'}
          clickable
        />
        {Object.entries(eraLabels).map(([key, label]) => (
          <Chip 
            key={key}
            label={label}
            onClick={() => setSelectedEra(key)}
            color={selectedEra === key ? eraColors[key] : 'default'}
            variant={selectedEra === key ? 'filled' : 'outlined'}
            clickable
          />
        ))}
      </Stack>

      {/* World Events Context Layer */}
      {showWorldEvents && filteredWorldEvents.length > 0 && (
        <Box sx={{ mb: 4, p: 3, bgcolor: 'rgba(46, 74, 61, 0.08)', borderRadius: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Historical Context
          </Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {filteredWorldEvents.map((event, index) => (
              <Chip 
                key={index}
                label={`${event.year}: ${event.title}`}
                title={event.description}
                color="secondary"
                variant="outlined"
                sx={{ maxWidth: 200 }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Timeline */}
      <Box sx={{ position: 'relative', '&::before': {
        content: '""',
        position: 'absolute',
        left: '50%',
        top: 0,
        bottom: 0,
        width: 4,
        bgcolor: 'divider',
        transform: 'translateX(-50%)',
        display: { xs: 'none', md: 'block' },
      }}}>
        <Grid container spacing={2}>
          {filteredEvents.map((event, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index} sx={{
              display: 'flex',
              justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
              pr: index % 2 === 0 ? { md: 4 } : 0,
              pl: index % 2 !== 0 ? { md: 4 } : 0,
            }}>
              <Card 
                sx={{ 
                  width: '100%', 
                  maxWidth: 400,
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    width: 16,
                    height: 16,
                    borderRadius: '50%',
                    bgcolor: event.type === 'birth' ? 'primary.main' : 'secondary.main',
                    border: '3px solid white',
                    boxShadow: 2,
                    display: { xs: 'none', md: 'block' },
                    ...(index % 2 === 0 
                      ? { right: -32, transform: 'translateY(-50%)' }
                      : { left: -32, transform: 'translateY(-50%)' }
                    ),
                  },
                }}
                component={Link}
                href={`/philosophers/${event.philosopher.id}`}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                    <Chip 
                      label={event.year} 
                      size="small" 
                      color={event.type === 'birth' ? 'primary' : 'secondary'}
                    />
                    <Chip 
                      label={event.type === 'birth' ? 'Born' : 'Died'} 
                      size="small" 
                      variant="outlined"
                    />
                  </Stack>
                  <Typography variant="h6" sx={{ mb: 0.5 }}>
                    {event.philosopher.name.english}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontFamily: '"Vazir", serif',
                      direction: 'rtl',
                      color: 'text.secondary',
                      mb: 1,
                    }}
                  >
                    {event.philosopher.name.persian}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {filteredEvents.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No events found for this era.
          </Typography>
        </Box>
      )}
    </Container>
  );
}
