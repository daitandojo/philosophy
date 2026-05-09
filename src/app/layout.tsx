import type { Metadata, Viewport } from 'next';
import ClientLayout from '@/components/ClientLayout';
import JsonLd, { websiteSchema, organizationSchema } from '@/components/JsonLd';
import { SkipToContent } from '@/components/Accessibility';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#1a3a2a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://hikmatia.com'),
  title: {
    default: 'Hikmatia | حکمت - Persian Philosophy & Wisdom',
    template: '%s | Hikmatia',
  },
  description: 'Explore 2,500 years of wisdom from Persia\'s greatest philosophers. Discover Rumi, Hafez, Saadi, Ibn Sina, and the rich tradition of Persian philosophical thought through AI-powered conversations, guided learning, and timeless verses.',
  keywords: [
    'Persian Philosophy',
    'Sufi',
    'Sufism',
    'Rumi',
    'Hafez',
    'Saadi',
    'Ibn Sina',
    'Avicenna',
    'Islamic Philosophy',
    'Persian Poetry',
    'Masnavi',
    'Divan',
    'Gulistan',
    'Wisdom',
    'Spirituality',
    'Mysticism',
    'Persian Mystics',
    'Iranian Philosophy',
    'Tehran',
    'Persian Literature',
  ],
  authors: [{ name: 'Hikmatia' }],
  creator: 'Hikmatia',
  publisher: 'Hikmatia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Hikmatia',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hikmatia.com',
    siteName: 'Hikmatia',
    title: 'Hikmatia | Persian Philosophy & Wisdom',
    description: 'Explore 2,500 years of wisdom from Persia\'s greatest philosophers. Discover Rumi, Hafez, Saadi, and the rich tradition of Persian philosophical thought.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Hikmatia - Persian Philosophy & Wisdom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hikmatia | Persian Philosophy & Wisdom',
    description: 'Explore 2,500 years of wisdom from Persia\'s greatest philosophers.',
    images: ['/images/og-image.png'],
    creator: '@hikmatia',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://hikmatia.com',
    languages: {
      'en': 'https://hikmatia.com',
      'fa': 'https://hikmatia.com/fa',
    },
  },
  category: 'education',
  classification: 'Philosophy, Spirituality, Education',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preload" href="/splash_screen.jpg" as="image" />
      </head>
      <body style={{ backgroundColor: '#0d1f18', margin: 0 }}>
        <SkipToContent />
        <JsonLd data={websiteSchema} />
        <JsonLd data={organizationSchema} />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
