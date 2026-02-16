'use client';
import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  CircularProgress,
  Divider,
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import RefreshIcon from '@mui/icons-material/Refresh';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import { philosophers } from '@/lib/philosophers';

export default function DiscoursePage() {
  const [philosopher, setPhilosopher] = useState('rumi');
  const [type, setType] = useState('fable');
  const [discourse, setDiscourse] = useState('');
  const [theme, setTheme] = useState<{ name: string; description: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const generateDiscourse = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/discourse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ philosopher, type }),
      });

      if (response.ok) {
        const data = await response.json();
        setDiscourse(data.discourse);
        setTheme(data.theme);
      }
    } catch (error) {
      console.error('Error generating discourse:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <AutoStoriesIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h3" component="h1">
            Wisdom Discourses
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary">
          Generate philosophical fables and discourses in the style of Persian mystics
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3 }}>
                Generate New Discourse
              </Typography>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Philosopher</InputLabel>
                <Select
                  value={philosopher}
                  label="Philosopher"
                  onChange={(e) => setPhilosopher(e.target.value)}
                >
                  {philosophers.slice(0, 10).map((p) => (
                    <MenuItem key={p.id} value={p.id}>{p.name.english}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={type}
                  label="Type"
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value="fable">Fable</MenuItem>
                  <MenuItem value="discourse">Discourse</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={generateDiscourse}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
              >
                {loading ? 'Generating...' : 'Generate Discourse'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          {loading && !discourse && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {discourse && (
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <LightbulbIcon color="primary" />
                  <Typography variant="h6">
                    {theme?.name || 'A Wisdom Tale'}
                  </Typography>
                </Box>
                
                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  <Chip 
                    label={philosophers.find(p => p.id === philosopher)?.name.english || philosopher} 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip label={type} variant="outlined" />
                </Stack>

                {theme && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
                    {theme.description}
                  </Typography>
                )}

                <Divider sx={{ my: 2 }} />

                <Typography 
                  variant="body1" 
                  sx={{ 
                    lineHeight: 2, 
                    whiteSpace: 'pre-wrap',
                    fontSize: '1.05rem',
                  }}
                >
                  {discourse}
                </Typography>

                <Divider sx={{ my: 3 }} />

                <Button
                  variant="outlined"
                  onClick={generateDiscourse}
                  disabled={loading}
                  startIcon={<RefreshIcon />}
                >
                  Generate Another
                </Button>
              </CardContent>
            </Card>
          )}

          {!loading && !discourse && (
            <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'grey.50', borderRadius: 2 }}>
              <LightbulbIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                No discourse yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Select a philosopher and click generate to create a wisdom tale
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
