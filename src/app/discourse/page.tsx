'use client';
import { useState, useRef } from 'react';
import { useI18n } from '@/i18n';
import Image from 'next/image';
import Link from 'next/link';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  CircularProgress,
  TextField,
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import RefreshIcon from '@mui/icons-material/Refresh';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import StopIcon from '@mui/icons-material/Stop';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { philosophers } from '@/lib/philosophers';
import ReactMarkdown from 'react-markdown';
import { 
  HeroPattern, 
  FloatingMotif,
  CornerDecoration,
  BackgroundCircles,
} from '@/components/SVGDecorations';

const predefinedThemes = [
  { name: 'Random Theme', description: 'Let the philosopher choose a theme for you' },
  { name: 'The Merchant and the Dervish', description: 'A story exploring the relationship between wealth and spirituality' },
  { name: 'The King and the Sage', description: 'A ruler seeks wisdom from a humble teacher' },
  { name: 'The Three Friends', description: 'Friendship tested by adversity' },
  { name: 'The Garden of Truth', description: 'A seeker finds a mystical garden that holds spiritual truths' },
  { name: 'The Shipwrecked Soul', description: 'A survivor discovers inner treasure after losing everything' },
  { name: 'The Blind Men and the Elephant', description: 'Different perspectives on the same truth' },
  { name: 'The Wine and the Cup', description: 'The vessel and its contents as a spiritual metaphor' },
];

const defaultTranslations = {
  discourse: {
    title: 'Philosophical Tales',
    subtitle: 'Deep philosophical discussions and essays',
  }
};

export default function DiscoursePage() {
  const { t: tFromHook, locale, mounted } = useI18n();
  const t = mounted ? tFromHook : defaultTranslations;
  
  const [philosopher, setPhilosopher] = useState('rumi');
  const [type, setType] = useState<'fable' | 'discourse'>('fable');
  const [title, setTitle] = useState('');
  const [discourse, setDiscourse] = useState('');
  const [displayedDiscourse, setDisplayedDiscourse] = useState('');
  const [theme, setTheme] = useState<{ name: string; description: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [streamComplete, setStreamComplete] = useState(false);
  const [customIdea, setCustomIdea] = useState('');
  const abortRef = useRef<AbortController | null>(null);

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
      const requestBody: Record<string, string> = { 
        philosopher, 
        type, 
        language: locale,
      };

      if (customIdea.trim()) {
        requestBody.customIdea = customIdea.trim();
      }

      const response = await fetch('/api/discourse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: abortRef.current.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error('Failed to generate discourse');
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
            if (data === '[DONE]') break;
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
      if ((error as Error).name !== 'AbortError') {
        console.error('Error generating discourse:', error);
      }
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

  if (!mounted) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0d1f18' }}>
        <CircularProgress sx={{ color: '#c9a962' }} />
      </Box>
    );
  }

  const selectedPhilosopher = philosophers.find(p => p.id === philosopher);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0d1f18', color: '#f5f5f5' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0d1f18 0%, #1a3a2a 50%, #2e4a3d 100%)',
          minHeight: { xs: 200, md: 280 },
          py: { xs: 4, md: 6 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <HeroPattern color="#c9a962" opacity={0.1} />
        <CornerDecoration position="top-left" color="#c9a962" size={100} />
        <CornerDecoration position="bottom-right" color="#c9a962" size={100} />
        <FloatingMotif variant="celestial" color="#c9a962" size={60} top="15%" left="10%" opacity={0.15} />
        <FloatingMotif variant="geometric" color="#c9a962" size={50} top="20%" right="15%" opacity={0.1} />
        <FloatingMotif variant="waves" color="#c9a962" size={70} bottom="10%" right="5%" opacity={0.08} />
        
        {/* Background Image */}
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
          <Image src="/images/explore-hero.png" alt="Persian wisdom" fill style={{ objectFit: 'cover' }} priority />
        </Box>
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="overline" sx={{ color: '#c9a962', letterSpacing: 6, mb: 1, display: 'block', fontSize: '0.75rem', fontWeight: 500 }}>
            Hikmatia Original
          </Typography>
          <Typography variant="h3" sx={{ color: '#ffffff', fontWeight: 300, mb: 1, fontSize: { xs: '1.75rem', md: '2.5rem' }, letterSpacing: '-0.02em' }}>
            Philosophical Tales
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', fontWeight: 300, maxWidth: 500, mx: 'auto', lineHeight: 1.6, fontSize: '0.95rem' }}>
            Timeless wisdom woven into original fables and discourses
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, md: 4 } }}>
        <Grid container spacing={4}>
          {/* Left Panel - Controls */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              {/* Philosopher Selection */}
              <Card sx={{ 
                bgcolor: 'rgba(26, 58, 42, 0.3)', 
                border: '1px solid rgba(201, 169, 98, 0.15)',
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
                mb: 3,
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                    <Box sx={{ 
                      width: 36, 
                      height: 36, 
                      borderRadius: '50%', 
                      bgcolor: 'rgba(201, 169, 98, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <PsychologyAltIcon sx={{ color: '#c9a962', fontSize: 20 }} />
                    </Box>
                    <Typography variant="subtitle2" sx={{ color: '#c9a962', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                      Philosopher
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {philosophers.slice(0, 8).map((p) => (
                      <Chip
                        key={p.id}
                        label={p.name.english.split(' ')[0]}
                        onClick={() => setPhilosopher(p.id)}
                        sx={{
                          bgcolor: philosopher === p.id ? '#c9a962' : 'rgba(201, 169, 98, 0.1)',
                          color: philosopher === p.id ? '#0d1f18' : 'rgba(255,255,255,0.8)',
                          fontWeight: philosopher === p.id ? 600 : 400,
                          fontSize: '0.75rem',
                          px: 1,
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: philosopher === p.id ? '#d4bc7d' : 'rgba(201, 169, 98, 0.2)',
                          },
                        }}
                      />
                    ))}
                  </Box>
                  
                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(201, 169, 98, 0.1)' }}>
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                      {selectedPhilosopher?.name.english}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Type Selection */}
              <Card sx={{ 
                bgcolor: 'rgba(26, 58, 42, 0.3)', 
                border: '1px solid rgba(201, 169, 98, 0.15)',
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
                mb: 3,
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box sx={{ 
                      width: 36, 
                      height: 36, 
                      borderRadius: '50%', 
                      bgcolor: 'rgba(201, 169, 98, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <MenuBookIcon sx={{ color: '#c9a962', fontSize: 20 }} />
                    </Box>
                    <Typography variant="subtitle2" sx={{ color: '#c9a962', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                      Type
                    </Typography>
                  </Box>
                  
                  <Stack direction="row" spacing={1.5}>
                    {(['fable', 'discourse'] as const).map((t) => (
                      <Chip
                        key={t}
                        label={t.charAt(0).toUpperCase() + t.slice(1)}
                        onClick={() => setType(t)}
                        sx={{
                          flex: 1,
                          bgcolor: type === t ? '#c9a962' : 'rgba(201, 169, 98, 0.1)',
                          color: type === t ? '#0d1f18' : 'rgba(255,255,255,0.8)',
                          fontWeight: type === t ? 600 : 400,
                          fontSize: '0.8rem',
                          py: 2,
                          transition: 'all 0.2s ease',
                          cursor: 'pointer',
                          '&:hover': {
                            bgcolor: type === t ? '#d4bc7d' : 'rgba(201, 169, 98, 0.2)',
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* Theme Input */}
              <Card sx={{ 
                bgcolor: 'rgba(26, 58, 42, 0.3)', 
                border: '1px solid rgba(201, 169, 98, 0.15)',
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
                mb: 3,
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <Box sx={{ 
                      width: 36, 
                      height: 36, 
                      borderRadius: '50%', 
                      bgcolor: 'rgba(201, 169, 98, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <FormatQuoteIcon sx={{ color: '#c9a962', fontSize: 20 }} />
                    </Box>
                    <Typography variant="subtitle2" sx={{ color: '#c9a962', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                      Your Theme
                    </Typography>
                  </Box>
                  
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    placeholder="Describe your theme... A dervish who discovers a hidden garden, A king who learns humility from a shepherd, Two strangers who meet at an oasis..."
                    value={customIdea}
                    onChange={(e) => setCustomIdea(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        bgcolor: 'rgba(0,0,0,0.2)',
                        color: '#f5f5f5',
                        fontSize: '0.85rem',
                        lineHeight: 1.6,
                        '& fieldset': { borderColor: 'rgba(201, 169, 98, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(201, 169, 98, 0.4)' },
                        '&.Mui-focused fieldset': { borderColor: '#c9a962' },
                      },
                      '& .MuiInputBase-input::placeholder': {
                        color: 'rgba(255,255,255,0.4)',
                        fontStyle: 'italic',
                      },
                    }}
                  />
                  
                  {customIdea && (
                    <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(201, 169, 98, 0.1)' }}>
                      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>
                        Your theme: "{customIdea.substring(0, 50)}{customIdea.length > 50 ? '...' : ''}"
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* Generate Button */}
              {loading ? (
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={handleStop}
                  startIcon={<StopIcon />}
                  sx={{
                    py: 2,
                    borderColor: 'rgba(255,255,255,0.2)',
                    color: '#f5f5f5',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    borderRadius: 3,
                    '&:hover': {
                      borderColor: '#f44336',
                      bgcolor: 'rgba(244, 67, 54, 0.1)',
                    },
                  }}
                >
                  Stop Generation
                </Button>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={generateDiscourse}
                  startIcon={<AutoAwesomeIcon />}
                  sx={{
                    py: 2,
                    bgcolor: '#c9a962',
                    color: '#0d1f18',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    boxShadow: '0 4px 20px rgba(201, 169, 98, 0.3)',
                    '&:hover': {
                      bgcolor: '#d4bc7d',
                      boxShadow: '0 6px 24px rgba(201, 169, 98, 0.4)',
                    },
                  }}
                >
                  Weave Your Tale
                </Button>
              )}
            </Box>
          </Grid>

          {/* Right Panel - Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            {loading && !displayedDiscourse && (
              <Card sx={{ 
                height: '100%',
                minHeight: 400,
                bgcolor: 'rgba(26, 58, 42, 0.3)', 
                border: '1px solid rgba(201, 169, 98, 0.15)',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Box sx={{ position: 'relative', mb: 3 }}>
                  <CircularProgress sx={{ color: '#c9a962', width: 48, height: 48 }} />
                  <AutoAwesomeIcon sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#c9a962', fontSize: 20, animation: 'pulse 1.5s infinite' }} />
                </Box>
                <Typography variant="h6" sx={{ color: '#f5f5f5', mb: 1, fontWeight: 400 }}>
                  Weaving wisdom...
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
                  {customIdea ? 'Crafting your unique tale' : 'Consulting the philosophical traditions'}
                </Typography>
              </Card>
            )}

            {(displayedDiscourse || (loading && discourse)) && (
              <Card sx={{ 
                bgcolor: 'rgba(26, 58, 42, 0.3)', 
                border: '1px solid rgba(201, 169, 98, 0.15)',
                borderRadius: 3,
                overflow: 'hidden',
              }}>
                {/* Header */}
                <Box sx={{ 
                  p: 3, 
                  borderBottom: '1px solid rgba(201, 169, 98, 0.15)',
                  background: 'linear-gradient(180deg, rgba(201, 169, 98, 0.08) 0%, transparent 100%)',
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ 
                      width: 44, 
                      height: 44, 
                      borderRadius: 2,
                      bgcolor: 'rgba(201, 169, 98, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <LightbulbIcon sx={{ color: '#c9a962', fontSize: 24 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h5" sx={{ color: '#ffffff', fontWeight: 500, mb: 0.5, fontSize: '1.4rem', lineHeight: 1.3 }}>
                        {title || theme?.name || 'A Wisdom Tale'}
                      </Typography>
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                        <Chip 
                          label={selectedPhilosopher?.name.english || philosopher}
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(201, 169, 98, 0.2)', 
                            color: '#c9a962',
                            fontSize: '0.7rem',
                            height: 24,
                          }}
                        />
                        <Chip 
                          label={type}
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(201, 169, 98, 0.15)', 
                            color: 'rgba(255,255,255,0.7)',
                            fontSize: '0.7rem',
                            height: 24,
                          }}
                        />
                        {loading && (
                          <Chip 
                            label="Writing"
                            size="small"
                            icon={<AutoAwesomeIcon sx={{ fontSize: '12px !important' }} />}
                            sx={{ 
                              bgcolor: 'rgba(201, 169, 98, 0.2)', 
                              color: '#c9a962',
                              fontSize: '0.7rem',
                              height: 24,
                              '& .MuiChip-icon': { color: '#c9a962' },
                            }}
                          />
                        )}
                      </Stack>
                    </Box>
                  </Box>
                  
                  {theme && (
                    <Box sx={{ 
                      mt: 2, 
                      p: 2, 
                      bgcolor: 'rgba(201, 169, 98, 0.08)', 
                      borderRadius: 2,
                      borderLeft: '3px solid #c9a962',
                    }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {theme.description}
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Content */}
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ 
                    '& p': { 
                      color: 'rgba(255,255,255,0.9)', 
                      fontSize: '1.05rem', 
                      lineHeight: 1.9, 
                      mb: 2.5,
                      fontFamily: '"Georgia", serif',
                    },
                    '& strong': { 
                      color: '#c9a962', 
                      fontWeight: 600,
                    },
                    '& em': { 
                      color: 'rgba(201, 169, 98, 0.8)', 
                      fontStyle: 'italic',
                    },
                  }}>
                    <ReactMarkdown>
                      {displayedDiscourse + (loading ? '▊' : '')}
                    </ReactMarkdown>
                  </Box>

                  {/* Actions */}
                  <Box sx={{ 
                    mt: 4, 
                    pt: 3, 
                    borderTop: '1px solid rgba(201, 169, 98, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                      {streamComplete ? 'Complete' : 'Generating...'} • {discourse.split(' ').length} words
                    </Typography>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={generateDiscourse}
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={14} /> : <RefreshIcon />}
                      sx={{
                        borderColor: 'rgba(201, 169, 98, 0.3)',
                        color: '#c9a962',
                        fontSize: '0.8rem',
                        '&:hover': { 
                          borderColor: '#c9a962',
                          bgcolor: 'rgba(201, 169, 98, 0.1)',
                        },
                      }}
                    >
                      Another Tale
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            )}

            {!loading && !displayedDiscourse && !discourse && (
              <Card sx={{ 
                height: '100%',
                minHeight: 500,
                bgcolor: 'rgba(26, 58, 42, 0.3)', 
                border: '1px solid rgba(201, 169, 98, 0.15)',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                p: 6,
              }}>
                <Box sx={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: '50%', 
                  bgcolor: 'rgba(201, 169, 98, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 3,
                }}>
                  <AutoStoriesIcon sx={{ fontSize: 40, color: '#c9a962' }} />
                </Box>
                <Typography variant="h5" sx={{ color: '#ffffff', mb: 1, fontWeight: 400 }}>
                  Begin Your Journey
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 360, mb: 3, lineHeight: 1.7 }}>
                  Select a philosopher, choose your preferred style, and share a theme—or let wisdom guide you.
                </Typography>
                <Stack direction="row" spacing={1.5}>
                  <Chip label="Fables" size="small" sx={{ bgcolor: 'rgba(201, 169, 98, 0.15)', color: 'rgba(255,255,255,0.7)' }} />
                  <Chip label="Discourses" size="small" sx={{ bgcolor: 'rgba(201, 169, 98, 0.15)', color: 'rgba(255,255,255,0.7)' }} />
                  <Chip label="Custom" size="small" sx={{ bgcolor: 'rgba(201, 169, 98, 0.15)', color: 'rgba(255,255,255,0.7)' }} />
                </Stack>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
