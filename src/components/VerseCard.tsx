'use client';
import { useState, useRef } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Collapse,
  Stack,
  CircularProgress,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import type { Verse } from '@/types';

interface VerseCardProps {
  verse: Verse;
  showDetails?: boolean;
}

export default function VerseCard({ verse, showDetails = false }: VerseCardProps) {
  const [expanded, setExpanded] = useState(showDetails);
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = async () => {
    if (playing) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPlaying(false);
      return;
    }

    setPlaying(true);
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: verse.persianText, voiceType: 'persian' }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        audioRef.current = new Audio(url);
        audioRef.current.onended = () => {
          setPlaying(false);
          URL.revokeObjectURL(url);
        };
        audioRef.current.onerror = () => {
          setPlaying(false);
        };
        await audioRef.current.play();
      } else {
        setPlaying(false);
      }
    } catch (error) {
      console.error('TTS error:', error);
      setPlaying(false);
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        background: 'linear-gradient(180deg, #ffffff 0%, #faf9f7 100%)',
        border: '1px solid rgba(139, 69, 19, 0.1)',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ flex: 1 }}>
            <Collapse in={!expanded}>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                {verse.englishTranslation}
              </Typography>
            </Collapse>
            
            <Collapse in={expanded}>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Vazir", "Tahoma", sans-serif',
                    direction: 'rtl',
                    textAlign: 'right',
                    mb: 1,
                    color: 'text.primary',
                    lineHeight: 1.8,
                  }}
                >
                  {verse.persianText}
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    fontStyle: 'italic',
                    color: 'text.secondary',
                    mb: 2,
                  }}
                >
                  {verse.transliteration}
                </Typography>
                
                <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                  {verse.englishTranslation}
                </Typography>
              </Box>
            </Collapse>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton size="small" onClick={() => setLiked(!liked)}>
              {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton size="small" onClick={playAudio}>
              {playing ? <CircularProgress size={20} color="primary" /> : <VolumeUpIcon />}
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setExpanded(!expanded)}
              sx={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>

        <Collapse in={expanded}>
          <Stack spacing={2} sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            {verse.summary && (
              <Box>
                <Typography variant="subtitle2" color="secondary" gutterBottom>
                  Summary
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {verse.summary}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {verse.themes.map((theme) => (
                <Chip
                  key={theme}
                  label={theme}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(46, 74, 61, 0.1)',
                    color: 'secondary.main',
                  }}
                />
              ))}
              {verse.wisdomScore && (
                <Chip
                  label={`Wisdom: ${verse.wisdomScore}/10`}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(201, 169, 98, 0.2)',
                    color: 'warning.main',
                    fontWeight: 600,
                  }}
                />
              )}
            </Box>
          </Stack>
        </Collapse>
      </CardContent>
    </Card>
  );
}
