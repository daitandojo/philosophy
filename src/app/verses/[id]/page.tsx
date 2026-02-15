'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
  CircularProgress,
  Grid,
  Button,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Link from 'next/link';
import type { Verse } from '@/types';

export default function VersePage() {
  const params = useParams();
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioLanguage, setAudioLanguage] = useState<'english' | 'persian'>('english');
  const [audioError, setAudioError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const response = await fetch(`/api/verses/${params.id}`);
        const data = await response.json();
        setVerse(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchVerse();
    }
  }, [params.id]);

  const handlePlayAudio = async () => {
    if (!verse) return;
    
    setPlaying(true);
    setAudioError(null);
    try {
      const textToSpeak = audioLanguage === 'persian' ? verse.persianText : verse.englishTranslation;
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, voiceType: audioLanguage }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        audio.onended = () => setPlaying(false);
        audio.onerror = () => {
          setAudioError('Failed to play audio');
          setPlaying(false);
        };
      } else {
        const errorData = await response.json();
        setAudioError(errorData.error || 'Failed to generate speech');
        setPlaying(false);
      }
    } catch (error) {
      console.error('Audio error:', error);
      setAudioError('Network error - check console');
      setPlaying(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!verse) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5">Verse not found</Typography>
        <Button component={Link} href="/explore" sx={{ mt: 2 }}>
          Back to Explore
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        component={Link}
        href="/explore"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Explore
      </Button>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Persian Text */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Vazir", serif',
                direction: 'rtl',
                textAlign: 'right',
                mb: 2,
                lineHeight: 2,
              }}
            >
              {verse.persianText}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontStyle: 'italic',
                color: 'text.secondary',
                textAlign: 'right',
              }}
            >
              {verse.transliteration}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Translation & Actions */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" gutterBottom color="primary">
                English Translation
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                {verse.englishTranslation}
              </Typography>

              <Typography variant="h6" gutterBottom color="secondary">
                Summary
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {verse.summary}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                {/* Language Toggle */}
                <ToggleButtonGroup
                  value={audioLanguage}
                  exclusive
                  onChange={(_, value) => value && setAudioLanguage(value)}
                  size="small"
                  aria-label="audio language"
                >
                  <ToggleButton value="english" aria-label="English">
                    English
                  </ToggleButton>
                  <ToggleButton value="persian" aria-label="Persian">
                    فارسی
                  </ToggleButton>
                </ToggleButtonGroup>

                {/* Play Button */}
                <IconButton
                  onClick={handlePlayAudio}
                  disabled={playing}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                    width: 56,
                    height: 56,
                  }}
                >
                  {playing ? <CircularProgress size={24} color="inherit" /> : <PlayArrowIcon />}
                </IconButton>

                {/* Error Display */}
                {audioError && (
                  <Typography variant="caption" color="error" sx={{ textAlign: 'center' }}>
                    {audioError}
                  </Typography>
                )}

                <IconButton onClick={() => setLiked(!liked)}>
                  {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>

                <IconButton>
                  <ShareIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Source</Typography>
              <Typography variant="h6">{verse.sourceWork}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Wisdom Score</Typography>
              <Typography variant="h6" color="warning.main">{verse.wisdomScore}/10</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Complexity</Typography>
              <Typography variant="h6">{verse.complexity}/10</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Emotional Tone</Typography>
              <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>{verse.emotionalTone}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Themes */}
      <Typography variant="h6" gutterBottom>Themes</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
        {verse.themes.map((theme) => (
          <Chip
            key={theme}
            label={theme}
            component={Link}
            href={`/explore?theme=${theme}`}
            clickable
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>

      {/* Tags */}
      <Typography variant="h6" gutterBottom>Tags</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {verse.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            variant="outlined"
          />
        ))}
      </Box>
    </Container>
  );
}
