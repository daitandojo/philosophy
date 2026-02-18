'use client';
import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 1500 }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 1500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d0d0d 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        transition: 'opacity 1.5s ease-out',
        opacity: fadeOut ? 0 : 1,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.12,
          backgroundImage: 'url(/splash_screen.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              fontFamily: '"Vazir", serif',
              fontSize: { xs: '3rem', md: '5rem' },
              background: 'linear-gradient(135deg, #c9a962 0%, #8b4513 50%, #2e4a3d 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.05em',
              mb: 1,
            }}
          >
            حکمت
          </Box>
          <Typography
            sx={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              color: 'rgba(255, 255, 255, 0.75)',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 300,
            }}
          >
            Hikmatia
          </Typography>
        </Box>

        <Box sx={{ maxWidth: 400, mx: 'auto', mb: 4 }}>
          <Typography
            sx={{
              fontFamily: '"Vazir", serif',
              fontSize: '1.2rem',
              color: 'rgba(201, 169, 98, 0.85)',
              direction: 'rtl',
              mb: 1,
            }}
          >
            بیا تا برایت ببینیم
          </Typography>
          <Typography
            sx={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '0.9rem',
              color: 'rgba(255, 255, 255, 0.5)',
              fontStyle: 'italic',
              letterSpacing: '0.05em',
            }}
          >
            "Come, let us see for you..."
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          right: 20,
          bottom: 20,
          border: '1px solid',
          borderColor: 'rgba(139, 69, 19, 0.2)',
          borderRadius: 4,
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
}
