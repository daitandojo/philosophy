'use client';
import { useState, useRef, useEffect } from 'react';
import { useI18n } from '@/i18n';
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
import StopIcon from '@mui/icons-material/Stop';
import { philosophers } from '@/lib/philosophers';
import ReactMarkdown from 'react-markdown';

export default function DiscoursePage() {
  const { t, locale } = useI18n();
  const [philosopher, setPhilosopher] = useState('rumi');
  const [type, setType] = useState<'fable' | 'discourse'>('fable');
  const [title, setTitle] = useState('');
  const [discourse, setDiscourse] = useState('');
  const [displayedDiscourse, setDisplayedDiscourse] = useState('');
  const [theme, setTheme] = useState<{ name: string; description: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [streamComplete, setStreamComplete] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (streamComplete && discourse) {
      setDisplayedDiscourse(discourse);
    }
  }, [streamComplete, discourse]);

  const generateDiscourse = async () => {
    if (abortRef.current) {
      abortRef.current.abort();
    }
    
    setLoading(true);
    setStreamComplete(false);
    setTitle('');
    setDiscourse('');
    setDisplayedDiscourse('');
    setTheme(null);
    
    abortRef.current = new AbortController();

    try {
      const response = await fetch('/api/discourse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ philosopher, type, language: locale }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to generate discourse');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';
      let themeData: { name: string; description: string } | null = null;
      let titleData = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter((line) => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              break;
            }
            try {
              const parsed = JSON.parse(data);
              
              if (parsed.title && !titleData) {
                titleData = parsed.title;
                setTitle(parsed.title);
              }
              
              if (parsed.theme && !themeData) {
                themeData = parsed.theme;
                setTheme(parsed.theme);
              }
              
              if (parsed.content) {
                fullContent += parsed.content;
                setDiscourse(fullContent);
                setDisplayedDiscourse(fullContent);
              }
              
              if (parsed.done) {
                setStreamComplete(true);
                setLoading(false);
                return;
              }
              
              if (parsed.error) {
                throw new Error(parsed.error);
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }

      setStreamComplete(true);
      setDiscourse(fullContent);
      setDisplayedDiscourse(fullContent);
    } catch (error) {
      if ((error as Error).name === 'AbortError') {
        return;
      }
      console.error('Error generating discourse:', error);
    } finally {
      setLoading(false);
      setStreamComplete(true);
      abortRef.current = null;
    }
  };

  const handleStop = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      setLoading(false);
      setStreamComplete(true);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <AutoStoriesIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Typography variant="h3" component="h1">
            {t.discourse.title}
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary">
          {t.discourse.subtitle}
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
                  onChange={(e) => setType(e.target.value as 'fable' | 'discourse')}
                >
                  <MenuItem value="fable">Fable</MenuItem>
                  <MenuItem value="discourse">Discourse</MenuItem>
                </Select>
              </FormControl>

              {loading ? (
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  size="large"
                  onClick={handleStop}
                  startIcon={<StopIcon />}
                >
                  Stop
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={generateDiscourse}
                  startIcon={<RefreshIcon />}
                >
                  Generate {type === 'discourse' ? 'Discourse' : 'Fable'}
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          {loading && !displayedDiscourse && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          )}

          {(displayedDiscourse || (loading && discourse)) && (
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <LightbulbIcon color="primary" />
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    {title || theme?.name || 'A Wisdom Tale'}
                  </Typography>
                </Box>
                
                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  <Chip 
                    label={philosophers.find(p => p.id === philosopher)?.name.english || philosopher} 
                    color="primary" 
                    variant="outlined"
                  />
                  <Chip label={type} variant="outlined" />
                  <Chip label={locale.toUpperCase()} variant="outlined" size="small" />
                  {loading && <Chip label="Streaming..." color="secondary" size="small" />}
                </Stack>

                {theme && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
                    {theme.description}
                  </Typography>
                )}

                <Divider sx={{ my: 2 }} />

                <Box 
                  ref={contentRef}
                  sx={{ 
                    maxHeight: 500, 
                    overflowY: 'auto',
                    pr: 2,
                    '&::-webkit-scrollbar': {
                      width: 8,
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: 'grey.100',
                      borderRadius: 4,
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: 'grey.400',
                      borderRadius: 4,
                      '&:hover': {
                        backgroundColor: 'grey.500',
                      },
                    },
                  }}
                >
                  <Box 
                    sx={{ 
                      lineHeight: 2,
                      fontSize: '1.05rem',
                      '& p': { mb: 2 },
                      '& strong': { fontWeight: 'bold', color: 'primary.main' },
                      '& em': { fontStyle: 'italic' },
                    }}
                  >
                    <ReactMarkdown>
                      {displayedDiscourse + (loading ? '▊' : '')}
                    </ReactMarkdown>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Button
                  variant="outlined"
                  onClick={generateDiscourse}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <RefreshIcon />}
                >
                  {loading ? 'Generating...' : 'Generate Another'}
                </Button>
              </CardContent>
            </Card>
          )}

          {!loading && !displayedDiscourse && !discourse && (
            <Box sx={{ textAlign: 'center', py: 8, bgcolor: 'grey.50', borderRadius: 2 }}>
              <LightbulbIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                No discourse yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Select a philosopher and type, then click generate to create a wisdom tale
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
