'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import theme, { darkTheme } from '@/theme/theme';

interface ThemeContextType {
  mode: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useThemeMode() {
  const context = useContext(ThemeContext);
  // Return default values during SSR
  if (!context) {
    return { mode: 'light' as const, toggleTheme: () => {} };
  }
  return context;
}

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('theme-mode') as 'light' | 'dark' | null;
    if (savedMode) {
      setMode(savedMode);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', newMode);
      document.documentElement.setAttribute('data-theme', newMode);
      return newMode;
    });
  }, []);

  const currentTheme = mode === 'dark' ? darkTheme : theme;

  if (!mounted) {
    return (
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    );
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={currentTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
