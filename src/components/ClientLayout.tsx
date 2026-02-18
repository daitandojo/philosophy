'use client';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/Navbar';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import PageTransition from '@/components/PageTransition';
import SplashScreen from '@/components/SplashScreen';
import { Box } from '@mui/material';
import { I18nProvider } from '@/i18n';
import { useState, useEffect } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeRegistry>
      <I18nProvider>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        <ServiceWorkerRegistration />
        <Navbar />
        <Box
          component="main"
          id="main-content"
          sx={{
            minHeight: '100vh',
            pb: 8,
          }}
        >
          <PageTransition>
            {children}
          </PageTransition>
        </Box>
      </I18nProvider>
    </ThemeRegistry>
  );
}
