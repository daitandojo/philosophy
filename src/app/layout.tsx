import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/Navbar';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';
import { Box } from '@mui/material';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hikmatia | حکمت - Persian Philosophy',
  description: 'Explore 2,500 years of wisdom from Persia\'s greatest philosophers. Discover Rumi, Hafez, Saadi, Ibn Sina and more.',
  keywords: ['Persian Philosophy', 'Sufi', 'Rumi', 'Hafez', 'Wisdom', 'Masnavi', 'Philosophy'],
  manifest: '/manifest.json',
  themeColor: '#8b4513',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Hikmatia',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <ThemeRegistry>
          <ServiceWorkerRegistration />
          <Navbar />
          <Box
            component="main"
            sx={{
              minHeight: '100vh',
              background: 'linear-gradient(180deg, #faf9f7 0%, #f5f4f1 100%)',
              pb: 8,
            }}
          >
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
