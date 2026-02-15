'use client';
import { useState, useEffect, useRef } from 'react';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const WELCOME_TEXT_FARSI = 'سلام و درود. به جهان رومی خوش آمدید. بیا تا برایت ببینیم.';
const WELCOME_TEXT_ENGLISH = 'Peace be upon you. Welcome to the world of Rumi. Come, let us see for you.';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 3000 }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playWelcome = async () => {
    if (playing) return;
    
    setPlaying(true);
    setAudioError(null);
    
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: WELCOME_TEXT_FARSI, voiceType: 'persian' }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        audioRef.current = new Audio(url);
        audioRef.current.onended = () => {
          setPlaying(false);
          // Auto-advance after audio finishes
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onComplete, 800);
          }, 500);
        };
        audioRef.current.onerror = () => {
          setAudioError('Audio playback failed');
          setPlaying(false);
        };
        audioRef.current.play();
      } else {
        const error = await response.json();
        setAudioError(error.error || 'Failed to generate speech');
        setPlaying(false);
      }
    } catch (error: any) {
      console.error('Audio error:', error);
      setAudioError(error.message || 'Network error');
      setPlaying(false);
    }
  };

  useEffect(() => {
    // Auto-play welcome after a short delay
    const autoPlayTimer = setTimeout(() => {
      playWelcome();
    }, 1500);

    // Auto-advance if user doesn't click
    const autoAdvanceTimer = setTimeout(() => {
      if (!playing) {
        setFadeOut(true);
        setTimeout(onComplete, 800);
      }
    }, duration);

    return () => {
      clearTimeout(autoPlayTimer);
      clearTimeout(autoAdvanceTimer);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [duration, onComplete, playing]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #faf9f7 0%, #f5f4f1 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'opacity 0.8s ease-out',
        opacity: fadeOut ? 0 : 1,
      }}
    >
      {/* Background Image with White Edges */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.15,
          backgroundImage: 'url(/splash_screen.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '50px solid white',
          boxSizing: 'border-box',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        {/* Rumi Symbol / Logo */}
        <Box
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8b4513 0%, #c9a962 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 4,
            boxShadow: '0 8px 32px rgba(139, 69, 19, 0.3)',
          }}
        >
          <Box
            sx={{
              fontFamily: '"Vazir", serif',
              fontSize: '3rem',
              color: 'white',
              direction: 'rtl',
            }}
          >
            ر
          </Box>
        </Box>

        {/* Title */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              fontFamily: '"Vazir", serif',
              fontSize: { xs: '2.5rem', md: '4rem' },
              background: 'linear-gradient(135deg, #8b4513 0%, #2e4a3d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.05em',
            }}
          >
            رومی
          </Box>
          <Typography
            sx={{
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              color: 'text.secondary',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Rumi
          </Typography>
        </Box>

        {/* Tagline */}
        <Box sx={{ maxWidth: 400, mx: 'auto', mb: 4 }}>
          <Typography
            sx={{
              fontFamily: '"Vazir", serif',
              fontSize: '1.1rem',
              color: 'text.secondary',
              direction: 'rtl',
            }}
          >
            بیا تا برایت ببینیم
          </Typography>
          <Typography
            sx={{
              fontSize: '0.9rem',
              color: 'text.secondary',
              fontStyle: 'italic',
              mt: 1,
            }}
          >
            "Come, let us see for you..."
          </Typography>
        </Box>

        {/* Audio Controls */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={playWelcome}
            disabled={playing}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              width: 64,
              height: 64,
              '&:hover': { bgcolor: 'primary.dark' },
            }}
          >
            {playing ? <CircularProgress size={28} color="inherit" /> : <PlayArrowIcon sx={{ fontSize: 32 }} />}
          </IconButton>
          
          <Typography variant="body2" color="text.secondary">
            {playing ? 'Playing...' : 'Click to hear welcome'}
          </Typography>
          
          {audioError && (
            <Typography variant="caption" color="error">
              {audioError}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Decorative Border */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          right: 20,
          bottom: 20,
          border: '1px solid rgba(139, 69, 19, 0.2)',
          borderRadius: 4,
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
}
