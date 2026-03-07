'use client';

import { Suspense, lazy, ReactNode } from 'react';
import { Box, CircularProgress } from '@mui/material';

interface LazyLoaderProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
}

export function LazyLoader({ 
  children, 
  fallback = <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>,
  threshold = 0.1,
  rootMargin = '200px'
}: LazyLoaderProps) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

// Lazy-loaded heavy components
export const LazyPhilosophyGraph = lazy(() => import('./PhilosophyGraph'));
export const LazyArtifactInspector = lazy(() => import('./ArtifactInspector'));
export const LazyAudioMixer = lazy(() => import('@/lib/audio/useAudioMixer').then(module => ({ default: () => null })));