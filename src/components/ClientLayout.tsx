'use client';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/Navbar';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import PageTransition from '@/components/PageTransition';
import SplashScreen from '@/components/SplashScreen';
import IlluminatedBackground from '@/components/IlluminatedBackground';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import ScrollProgress from '@/components/ScrollProgress';
import { Box, CircularProgress } from '@mui/material';
import { I18nProvider } from '@/i18n';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

// Lazy load heavy components
const LazyPhilosophyGraph = dynamic(() => import('./PhilosophyGraph'), {
  ssr: false,
  loading: () => <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
});

const LazyArtifactInspector = dynamic(() => import('./ArtifactInspector'), {
  ssr: false,
  loading: () => <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
});

import MicroInteractions from '@/components/MicroInteractions';
import AccessibilityOverlay from '@/components/AccessibilityOverlay';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';
import BottomNav from '@/components/BottomNav';

function ClientLayoutContent({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const pathname = usePathname();
  const isAccessPage = pathname === '/access';

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => setShowContent(true), 800);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [showSplash]);

  return (
    <ThemeRegistry>
      <SmoothScrollProvider>
        <ScrollProgress />
        <I18nProvider>
          <IlluminatedBackground intensity={0.6} />
          {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
          <ServiceWorkerRegistration />
          {!isAccessPage && <Navbar />}
          <Box
            component="main"
            id="main-content"
            sx={{
              minHeight: '100vh',
              pb: { xs: 'calc(env(safe-area-inset-bottom, 0px) + 72px)', md: 8 },
              opacity: showContent ? 1 : 0,
              transition: 'opacity 1.5s ease-in',
            }}
          >
            <PageTransition>
              {children}
            </PageTransition>
           </Box>
           {!isAccessPage && <BottomNav />}
           <MicroInteractions />
           <AccessibilityOverlay />
           <PWAInstallPrompt />
         </I18nProvider>
        </SmoothScrollProvider>
      </ThemeRegistry>
    );
  }

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayoutContent>{children}</ClientLayoutContent>;
}
