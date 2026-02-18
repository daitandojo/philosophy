'use client';
import { useState, useEffect } from 'react';
import { Box, Typography, useTheme } from '@mui/material';

interface SplashScreenProps {
  onComplete: () => void;
  duration?: number;
}

export default function SplashScreen({ onComplete, duration = 1500 }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const theme = useTheme();

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
        background: theme.palette.mode === 'dark' 
          ? 'linear-gradient(135deg, #1a1a1a 0%, #121212 100%)'
          : 'linear-gradient(135deg, #faf9f7 0%, #f5f4f1 100%)',
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
          opacity: 0.15,
          backgroundImage: 'url(/splash_screen.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '50px solid white',
          boxSizing: 'border-box',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
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
            ح
          </Box>
        </Box>

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
            حکمت
          </Box>
          <Typography
            sx={{
              fontSize: { xs: '1.2rem', md: '1.5rem' },
              color: 'text.secondary',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Hikmatia
          </Typography>
        </Box>

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
