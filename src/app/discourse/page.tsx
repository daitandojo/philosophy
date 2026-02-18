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
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import RefreshIcon from '@mui/icons-material/Refresh';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import StopIcon from '@mui/icons-material/Stop';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { philosophers } from '@/lib/philosophers';
import ReactMarkdown from 'react-markdown';

const predefinedThemes = [
  { name: 'Random Theme', description: 'Let the philosopher choose a theme for you' },
  { name: 'The Merchant and the Dervish', description: 'A story exploring the relationship between wealth and spirituality' },
  { name: 'The King and the Sage', description: 'A ruler seeks wisdom from a humble teacher' },
  { name: 'The Three Friends', description: 'Friendship tested by adversity' },
  { name: 'The Garden of Truth', description: 'A seeker finds a mystical garden that holds spiritual truths' },
  { name: 'The Shipwrecked Soul', description: 'A survivor discovers inner treasure after losing everything' },
  { name: 'The Blind Men and the Elephant', description: 'Different perspectives on the same truth' },
  { name: 'The Wine and the Cup', description: 'The vessel and its contents as a spiritual metaphor' },
  { name: 'The Mirror and the Face', description: 'Self-reflection and divine recognition' },
  { name: 'The Bird and the Cage', description: 'Freedom and confinement in the spiritual journey' },
  { name: 'The River and the Ocean', description: 'The individual soul merging with the divine' },
  { name: 'The Rose and the Nightingale', description: 'The eternal love between the beloved and the lover' },
  { name: 'The Candle and the Moth', description: 'The soul drawn to divine light' },
  { name: 'The Palm Tree and the Date', description: 'Patience and sweetness of spiritual growth' },
  { name: 'The Desert and the Oasis', description: 'Finding spiritual refreshment in life\'s trials' },
  { name: 'The Pearl and the Oyster', description: 'Wisdom hidden within hardship' },
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
  const [selectedTheme, setSelectedTheme] = useState('Random Theme');
  const [customIdea, setCustomIdea] = useState('');
  const [useCustomIdea, setUseCustomIdea] = useState(false);
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

      if (useCustomIdea && customIdea.trim()) {
        requestBody.customIdea = customIdea.trim();
      } else if (selectedTheme && selectedTheme !== 'Random Theme') {
        requestBody.selectedTheme = selectedTheme;
      }

      const response = await fetch('/api/discourse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
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

  if (!mounted) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: 'background.default' 
      }}>
        <CircularProgress sx={{ color: '#c9a962' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a3a2a 0%, #2e4a3d 50%, #3d6b52 100%)',
          py: { xs: 2, md: 3 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%23c9a962' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          },
        }}
      >
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ color: 'rgba(201, 169, 98, 0.9)', letterSpacing: 4, mb: 0.5, display: 'block' }}>
            Philosophical Tales
          </Typography>
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 300, mb: 1 }}>
            {t.discourse?.title || 'Philosophical Tales'}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', fontWeight: 300 }}>
            {t.discourse?.subtitle || 'Deep philosophical discussions and essays'}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 2, flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={2} sx={{ flex: 1, overflow: 'hidden' }}>
          <Grid size={{ xs: 12, md: 3.5 }}>
            <Card sx={{ 
              height: '100%',
              maxHeight: 'calc(100vh - 180px)',
              overflow: 'auto',
              border: '1px solid rgba(201, 169, 98, 0.15)',
              bgcolor: 'rgba(26, 58, 42, 0.02)',
            }}>
              <CardContent sx={{ pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <AutoStoriesIcon sx={{ color: '#c9a962' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    Create Your Tale
                  </Typography>
                </Box>

                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Philosopher</InputLabel>
                  <Select
                    value={philosopher}
                    label="Philosopher"
                    onChange={(e) => setPhilosopher(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(201, 169, 98, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(201, 169, 98, 0.4)' },
                        '&.Mui-focused fieldset': { borderColor: '#c9a962' },
                      },
                    }}
                  >
                    {philosophers.slice(0, 10).map((p) => (
                      <MenuItem key={p.id} value={p.id}>{p.name.english}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={type}
                    label="Type"
                    onChange={(e) => setType(e.target.value as 'fable' | 'discourse')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: 'rgba(201, 169, 98, 0.2)' },
                        '&:hover fieldset': { borderColor: 'rgba(201, 169, 98, 0.4)' },
                        '&.Mui-focused fieldset': { borderColor: '#c9a962' },
                      },
                    }}
                  >
                    <MenuItem value="fable">Fable</MenuItem>
                    <MenuItem value="discourse">Discourse</MenuItem>
                  </Select>
                </FormControl>

                <Accordion 
                  sx={{ 
                    mb: 2,
                    boxShadow: 'none',
                    border: '1px solid rgba(201, 169, 98, 0.15)',
                    '&:before': { display: 'none' },
                    '&.Mui-expanded': { margin: 0 },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PsychologyIcon sx={{ fontSize: 18, color: '#c9a962' }} />
                      <Typography variant="body2">
                        {useCustomIdea ? 'Your Idea' : 'Choose Theme'}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 1 }}>
                    <Stack spacing={1.5}>
                      <FormControl fullWidth size="small">
                        <InputLabel>Theme</InputLabel>
                        <Select
                          value={useCustomIdea ? 'Custom' : selectedTheme}
                          label="Theme"
                          onChange={(e) => {
                            if (e.target.value === 'Custom') {
                              setUseCustomIdea(true);
                            } else {
                              setUseCustomIdea(false);
                              setSelectedTheme(e.target.value);
                            }
                          }}
                        >
                          {predefinedThemes.map((theme) => (
                            <MenuItem key={theme.name} value={theme.name}>
                              {theme.name}
                            </MenuItem>
                          ))}
                          <MenuItem value="Custom">
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <EditIcon sx={{ fontSize: 14, color: '#c9a962' }} />
                              Write your own...
                            </Box>
                          </MenuItem>
                        </Select>
                      </FormControl>

                      {useCustomIdea && (
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          size="small"
                          placeholder="E.g., A frog crossing a river..."
                          value={customIdea}
                          onChange={(e) => setCustomIdea(e.target.value)}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': { borderColor: 'rgba(201, 169, 98, 0.2)' },
                              '&:hover fieldset': { borderColor: 'rgba(201, 169, 98, 0.4)' },
                              '&.Mui-focused fieldset': { borderColor: '#c9a962' },
                            },
                          }}
                        />
                      )}
                    </Stack>
                  </AccordionDetails>
                </Accordion>

                <Divider sx={{ my: 1.5 }} />

                {loading ? (
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    size="small"
                    onClick={handleStop}
                    startIcon={<StopIcon />}
                  >
                    Stop
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    size="small"
                    onClick={generateDiscourse}
                    startIcon={<RefreshIcon />}
                    sx={{
                      bgcolor: '#c9a962',
                      color: '#1a3a2a',
                      fontWeight: 600,
                      '&:hover': { bgcolor: '#d4bc7d' },
                    }}
                  >
                    Generate
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 8.5 }}>
            {loading && !displayedDiscourse && (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <CircularProgress sx={{ color: '#c9a962', mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                  {useCustomIdea ? 'Weaving your idea...' : 'Crafting wisdom...'}
                </Typography>
              </Box>
            )}

            {(displayedDiscourse || (loading && discourse)) && (
              <Card sx={{ 
                height: '100%',
                maxHeight: 'calc(100vh - 180px)',
                display: 'flex', 
                flexDirection: 'column',
                border: '1px solid rgba(201, 169, 98, 0.15)',
                bgcolor: 'rgba(26, 58, 42, 0.02)',
              }}>
                <CardContent sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', p: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, flexShrink: 0 }}>
                    <LightbulbIcon sx={{ color: '#c9a962', fontSize: 20 }} />
                    <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
                      {title || theme?.name || 'A Wisdom Tale'}
                    </Typography>
                  </Box>
                  
                  <Stack direction="row" spacing={0.5} sx={{ mb: 1.5, flexWrap: 'wrap', flexShrink: 0 }}>
                    <Chip 
                      label={philosophers.find(p => p.id === philosopher)?.name.english || philosopher} 
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(201, 169, 98, 0.1)', 
                        color: '#8b4513',
                        height: 22,
                        fontSize: '0.7rem',
                      }}
                    />
                    <Chip 
                      label={type} 
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(201, 169, 98, 0.1)', 
                        color: '#c9a962',
                        height: 22,
                        fontSize: '0.7rem',
                      }}
                    />
                    {loading && (
                      <Chip 
                        label="Writing..." 
                        size="small"
                        icon={<AutoAwesomeIcon sx={{ fontSize: 12 }} />}
                        sx={{ 
                          bgcolor: 'rgba(201, 169, 98, 0.15)', 
                          color: '#c9a962',
                          height: 22,
                          fontSize: '0.7rem',
                        }}
                      />
                    )}
                  </Stack>

                  {theme && (
                    <Box sx={{ 
                      p: 1.5, 
                      bgcolor: 'rgba(201, 169, 98, 0.08)', 
                      borderRadius: 1.5, 
                      mb: 1.5,
                      borderLeft: '3px solid #c9a962',
                      flexShrink: 0,
                    }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', fontSize: '0.8rem' }}>
                        {theme.description}
                      </Typography>
                    </Box>
                  )}

                  <Divider sx={{ my: 1 }} />

                  <Box 
                    sx={{ 
                      flex: 1, 
                      overflow: 'auto',
                      pr: 1,
                      mr: 0.5,
                      '&::-webkit-scrollbar': {
                        width: 6,
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: 'rgba(201, 169, 98, 0.05)',
                        borderRadius: 3,
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(201, 169, 98, 0.3)',
                        borderRadius: 3,
                      },
                    }}
                  >
                    <Box 
                      sx={{ 
                        lineHeight: 1.8,
                        fontSize: '0.95rem',
                        '& p': { mb: 1.5 },
                        '& strong': { fontWeight: 'bold', color: '#722F37' },
                        '& em': { fontStyle: 'italic', color: '#8b4513' },
                      }}
                    >
                      <ReactMarkdown>
                        {displayedDiscourse + (loading ? '▊' : '')}
                      </ReactMarkdown>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  <Button
                    variant="outlined"
                    size="small"
                    onClick={generateDiscourse}
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={16} /> : <RefreshIcon />}
                    sx={{
                      borderColor: 'rgba(201, 169, 98, 0.5)',
                      color: '#c9a962',
                      alignSelf: 'flex-start',
                      '&:hover': { 
                        borderColor: '#c9a962',
                        bgcolor: 'rgba(201, 169, 98, 0.1)',
                      },
                    }}
                  >
                    Another
                  </Button>
                </CardContent>
              </Card>
            )}

            {!loading && !displayedDiscourse && !discourse && (
              <Card sx={{ 
                height: '100%',
                textAlign: 'center', 
                bgcolor: 'rgba(26, 58, 42, 0.02)',
                border: '1px solid rgba(201, 169, 98, 0.15)',
                borderRadius: 3,
              }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', py: 4 }}>
                  <Box 
                    sx={{ 
                      width: 64, 
                      height: 64, 
                      borderRadius: '50%', 
                      bgcolor: 'rgba(201, 169, 98, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <AutoStoriesIcon sx={{ fontSize: 32, color: '#c9a962' }} />
                  </Box>
                  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 0.5 }}>
                    Create a wisdom tale
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 250, mb: 2, fontSize: '0.8rem' }}>
                    Select options and click generate
                  </Typography>
                  
                  <Stack direction="row" spacing={0.5} flexWrap="wrap" justifyContent="center">
                    <Chip 
                      label="Custom" 
                      size="small"
                      icon={<EditIcon sx={{ fontSize: 12 }} />}
                      sx={{ bgcolor: 'rgba(201, 169, 98, 0.1)', color: '#8b4513', height: 22 }}
                    />
                    <Chip 
                      label="Themes" 
                      size="small"
                      sx={{ bgcolor: 'rgba(201, 169, 98, 0.1)', color: '#8b4513', height: 22 }}
                    />
                  </Stack>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
