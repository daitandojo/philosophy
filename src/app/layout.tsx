import type { Metadata } from 'next';
import ClientLayout from '@/components/ClientLayout';
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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
