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
      default: '#c8d8d0',
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
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#faf9f7',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(139, 69, 19, 0.3)',
            borderWidth: 1,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(139, 69, 19, 0.5)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#8b4513',
            borderWidth: 2,
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 8,
          border: '1px solid rgba(139, 69, 19, 0.2)',
          boxShadow: '0 4px 20px rgba(139, 69, 19, 0.15)',
          backgroundImage: 'none',
          backgroundColor: '#faf9f7',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: '"IBM Plex Sans", sans-serif',
          '&:hover': {
            backgroundColor: 'rgba(139, 69, 19, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(139, 69, 19, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(139, 69, 19, 0.2)',
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#faf9f7',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(139, 69, 19, 0.3)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(139, 69, 19, 0.5)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#8b4513',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#8b4513',
          },
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
      default: '#0d1f18',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#f5f5f5',
      secondary: '#b0b0b0',
    },
  },
  components: {
    ...theme.components,
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
            boxShadow: '0 4px 12px rgba(201, 169, 98, 0.3)',
          },
        },
        outlined: {
          minHeight: 44,
          borderColor: 'rgba(201, 169, 98, 0.4)',
          '&:hover': {
            borderColor: '#c9a962',
            backgroundColor: 'rgba(201, 169, 98, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          border: '1px solid rgba(201, 169, 98, 0.1)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
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
          backgroundColor: '#1a1a1a',
          color: '#f5f5f5',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(201, 169, 98, 0.3)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(201, 169, 98, 0.5)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#c9a962',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: '#c9a962',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: '2px solid #c9a962',
            outlineOffset: '2px',
          },
        },
      },
    },
  },
});

export default theme;
