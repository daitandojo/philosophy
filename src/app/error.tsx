'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { Box, Typography, Button } from '@mui/material';
import { triggerHaptic } from '@/lib/haptic';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#0d1f18',
        color: '#f5f5f5',
        textAlign: 'center',
        px: 3,
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Vazir", serif',
          fontSize: { xs: '3rem', md: '4rem' },
          fontWeight: 700,
          background: 'linear-gradient(135deg, #c9a962 0%, #8b4513 50%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
        }}
      >
        خطا
      </Typography>
      <Typography variant="h4" sx={{ color: '#c9a962', fontWeight: 300, mb: 2 }}>
        Something Went Wrong
      </Typography>
      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 400, mb: 4 }}>
        Like a broken reed, the harmony has been disrupted. Please try again.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          onClick={() => { triggerHaptic(5); reset(); }}
          variant="contained"
          sx={{
            bgcolor: '#c9a962',
            color: '#0d1f18',
            '&:hover': { bgcolor: '#d4bc7d' },
          }}
        >
          Try Again
        </Button>
        <Link href="/" passHref legacyBehavior>
          <Button
            variant="outlined"
            sx={{
              color: '#c9a962',
              borderColor: 'rgba(201,169,98,0.4)',
              '&:hover': {
                borderColor: '#c9a962',
                backgroundColor: 'rgba(201,169,98,0.1)',
              },
            }}
          >
            Go Home
          </Button>
        </Link>
      </Box>
      {error.digest && (
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.2)', mt: 4 }}>
          Error ID: {error.digest}
        </Typography>
      )}
    </Box>
  );
}
