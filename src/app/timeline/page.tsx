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
} from '@mui/material';
import { philosophers, eraLabels, eraColors } from '@/lib/philosophers';

interface TimelineEvent {
  year: number;
  philosopher: typeof philosophers[0];
  type: 'birth' | 'death' | 'work';
  description: string;
}

export default function TimelinePage() {
  const [selectedEra, setSelectedEra] = useState<string>('all');

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

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          Timeline of Persian Philosophy
        </Typography>
        <Typography variant="h6" color="text.secondary">
          2,500 years of wisdom from ancient Persia to modern times
        </Typography>
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
