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
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import type { Verse } from '@/types';

interface VerseCardProps {
  verse: Verse;
  showDetails?: boolean;
  isLiked?: boolean;
  onToggleLike?: () => void;
}

export default function VerseCard({ verse, showDetails = false, isLiked: externalIsLiked, onToggleLike }: VerseCardProps) {
  const [expanded, setExpanded] = useState(showDetails);
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isLiked = externalIsLiked ?? liked;
  const handleToggleLike = () => {
    if (onToggleLike) {
      onToggleLike();
    } else {
      setLiked(!liked);
    }
  };

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
        position: 'relative',
        background: 'linear-gradient(145deg, #faf9f7 0%, #f5f0e8 100%)',
        border: '1px solid rgba(139, 69, 19, 0.15)',
        borderRadius: 2,
        overflow: 'visible',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 24px rgba(139, 69, 19, 0.15)',
          borderColor: 'rgba(201, 169, 98, 0.4)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 8,
          left: 8,
          right: 8,
          bottom: 8,
          border: '1px solid rgba(201, 169, 98, 0.1)',
          borderRadius: 1,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Decorative corner */}
      <Box
        sx={{
          position: 'absolute',
          top: -1,
          left: 16,
          width: 24,
          height: 24,
          background: 'linear-gradient(135deg, #c9a962 0%, #8b4513 100%)',
          borderRadius: '0 0 8px 0',
          zIndex: 1,
        }}
      />

      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        {/* Quote icon and philosopher */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <FormatQuoteIcon sx={{ color: 'rgba(139, 69, 19, 0.2)', fontSize: 32 }} />
          <Chip
            label={verse.philosopher}
            size="small"
            sx={{
              bgcolor: 'rgba(26, 58, 42, 0.1)',
              color: '#1a3a2a',
              fontWeight: 500,
              fontSize: '0.7rem',
            }}
          />
        </Box>

        {/* English translation - main text */}
        <Collapse in={!expanded}>
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.8,
              color: 'text.primary',
              fontStyle: 'italic',
              fontSize: '1.05rem',
              mb: 2,
            }}
          >
            {verse.englishTranslation}
          </Typography>
        </Collapse>

        {/* Expanded view with Persian text */}
        <Collapse in={expanded}>
          <Box>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Vazir", "Tahoma", sans-serif',
                direction: 'rtl',
                textAlign: 'right',
                mb: 2,
                color: '#8b4513',
                lineHeight: 1.8,
                fontSize: '1.4rem',
                borderBottom: '1px solid rgba(201, 169, 98, 0.3)',
                pb: 2,
              }}
            >
              {verse.persianText}
            </Typography>
            
            {verse.transliteration && (
              <Typography
                variant="body2"
                sx={{
                  fontStyle: 'italic',
                  color: 'text.secondary',
                  mb: 2,
                  fontSize: '0.9rem',
                }}
              >
                {verse.transliteration}
              </Typography>
            )}
            
            <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 2 }}>
              {verse.englishTranslation}
            </Typography>
          </Box>
        </Collapse>

        {/* Footer with themes and actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
            {verse.themes.slice(0, 2).map((theme) => (
              <Chip
                key={theme}
                label={theme}
                size="small"
                sx={{
                  bgcolor: 'rgba(201, 169, 98, 0.15)',
                  color: '#8b4513',
                  fontSize: '0.7rem',
                  height: 24,
                }}
              />
            ))}
            {verse.themes.length > 2 && (
              <Chip
                label={`+${verse.themes.length - 2}`}
                size="small"
                sx={{
                  bgcolor: 'rgba(139, 69, 19, 0.1)',
                  color: 'text.secondary',
                  fontSize: '0.7rem',
                  height: 24,
                }}
              />
            )}
          </Stack>
          
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton 
              size="small" 
              onClick={handleToggleLike}
              sx={{ 
                color: isLiked ? '#722F37' : 'text.secondary',
                '&:hover': { color: '#722F37' },
              }}
            >
              {isLiked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
            </IconButton>
            <IconButton 
              size="small" 
              onClick={playAudio}
              sx={{ 
                color: 'text.secondary',
                '&:hover': { color: '#8b4513' },
              }}
            >
              {playing ? <CircularProgress size={18} color="primary" /> : <VolumeUpIcon fontSize="small" />}
            </IconButton>
            <IconButton
              size="small"
              onClick={() => setExpanded(!expanded)}
              sx={{ 
                color: 'text.secondary',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: '0.3s',
                '&:hover': { color: '#8b4513' },
              }}
            >
              <ExpandMoreIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Expanded details */}
        <Collapse in={expanded}>
          {verse.summary && (
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'rgba(201, 169, 98, 0.2)' }}>
              <Typography 
                variant="subtitle2" 
                sx={{ color: '#8b4513', fontWeight: 600, mb: 1 }}
              >
                Summary
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {verse.summary}
              </Typography>
            </Box>
          )}
        </Collapse>
      </CardContent>
    </Card>
  );
}
