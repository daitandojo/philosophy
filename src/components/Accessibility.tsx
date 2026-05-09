'use client';
import { Box, Link } from '@mui/material';

export function SkipToContent() {
  return (
    <Link
      href="#main-content"
      sx={{
        position: 'absolute',
        top: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        bgcolor: 'primary.main',
        color: 'white',
        px: 3,
        py: 1,
        borderRadius: '0 0 8px 8px',
        zIndex: 10001,
        transition: 'top 0.2s ease',
        fontWeight: 600,
        textDecoration: 'none',
        '&:focus': {
          top: 0,
          outline: 'none',
        },
      }}
    >
      Skip to main content
    </Link>
  );
}

export function FocusVisibleDemo() {
  return (
    <Box
      sx={{
        '& *:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '2px',
        },
        '& button:focus-visible, & a:focus-visible, & input:focus-visible, & select:focus-visible, & textarea:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '2px',
        },
      }}
    />
  );
}

interface KeyboardNavigationProps {
  children: React.ReactNode;
}

export function KeyboardNavigationProvider({ children }: KeyboardNavigationProps) {
  return (
    <Box
      sx={{
        '& *:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '2px',
        },
        '& *:focus:not(:focus-visible)': {
          outline: 'none',
        },
      }}
    >
      {children}
    </Box>
  );
}
