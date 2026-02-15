import type { Metadata } from 'next';
import ThemeRegistry from '@/theme/ThemeRegistry';
import Navbar from '@/components/Navbar';
import { Box } from '@mui/material';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rumi | رومی - The Definitive Digital Experience',
  description: 'Explore Rumi\'s poetry with AI-powered translations, transliterations, and interactive learning. Experience the wisdom of the great Sufi poet.',
  keywords: ['Rumi', 'Poetry', 'Sufi', 'Persian', 'Masnavi', 'Divan', 'Philosophy'],
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
