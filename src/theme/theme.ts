'use client';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

let theme = createTheme({
  palette: {
    primary: {
      main: '#8b4513',
      light: '#a0522d',
      dark: '#5c2d0b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#2e4a3d',
      light: '#3d6b52',
      dark: '#1e3329',
      contrastText: '#ffffff',
    },
    accent: {
      main: '#c9a962',
      light: '#d4bc7d',
      dark: '#b39a4f',
      contrastText: '#1a1a1a',
    },
    background: {
      default: '#faf9f7',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#5a5a5a',
    },
    error: {
      main: '#b71c1c',
    },
    success: {
      main: '#1b5e20',
    },
    warning: {
      main: '#c9a962',
    },
  },
  typography: {
    fontFamily: '"IBM Plex Sans", "Tahoma", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          fontWeight: 500,
          borderRadius: 8,
          padding: '10px 24px',
          minHeight: 44,
          minWidth: 44,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(139, 69, 19, 0.25)',
          },
        },
        outlined: {
          minHeight: 44,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1a1a1a',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            minHeight: 44,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          minHeight: 32,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 375,
      md: 768,
      lg: 1024,
      xl: 1440,
    },
  },
});

theme = responsiveFontSizes(theme);

export const darkTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    mode: 'dark',
    primary: {
      main: '#c9a962',
      light: '#d4bc7d',
      dark: '#a3864d',
      contrastText: '#1a1a1a',
    },
    secondary: {
      main: '#4a7c6a',
      light: '#5d9482',
      dark: '#3a6152',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#b0b0b0',
    },
  },
});

export default theme;
