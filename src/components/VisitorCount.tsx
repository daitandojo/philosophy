'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PublicIcon from '@mui/icons-material/Public';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

interface VisitorStats {
  totalVisitors: number;
  todayVisitors: number;
  totalVisits: number;
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

export default function VisitorCount() {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/visitors')
      .then(r => r.json())
      .then(data => setStats(data))
      .catch(() => setError(true));
  }, []);

  if (error || (!stats && typeof stats === 'object' && stats === null)) return null;

  if (!stats) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress size={24} sx={{ color: '#c9a962' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ mb: 8 }}>
      <Typography variant="h4" sx={{ mb: 2, textAlign: 'center', color: '#ffffff', fontWeight: 400 }}>
        By the Numbers
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', maxWidth: 500, mx: 'auto', color: 'rgba(255,255,255,0.7)' }}>
        Our growing community of wisdom seekers
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid size={{ xs: 4, md: 3 }}>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <PeopleIcon sx={{ fontSize: 40, color: '#c9a962', mb: 1 }} />
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 600 }}>
              {formatNumber(stats.totalVisitors)}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              Total Visitors
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 4, md: 3 }}>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <PublicIcon sx={{ fontSize: 40, color: '#c9a962', mb: 1 }} />
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 600 }}>
              {formatNumber(stats.todayVisitors)}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              Today
            </Typography>
          </Box>
        </Grid>
        <Grid size={{ xs: 4, md: 3 }}>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <TrendingUpIcon sx={{ fontSize: 40, color: '#c9a962', mb: 1 }} />
            <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 600 }}>
              {formatNumber(stats.totalVisits)}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              Total Page Views
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
