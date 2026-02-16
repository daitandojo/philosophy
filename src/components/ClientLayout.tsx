'use client';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/Navbar';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
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
          sx={{
            minHeight: '100vh',
            pb: 8,
          }}
        >
          {children}
        </Box>
      </I18nProvider>
    </ThemeRegistry>
  );
}
