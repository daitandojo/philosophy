'use client';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/Navbar';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import PageTransition from '@/components/PageTransition';
import { Box } from '@mui/material';
import { I18nProvider } from '@/i18n';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeRegistry>
      <I18nProvider>
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
