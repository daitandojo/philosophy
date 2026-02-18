'use client';

import Script from 'next/script';

interface JsonLdProps {
  data: Record<string, any>;
}

export default function JsonLd({ data }: JsonLdProps) {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Hikmatia',
  url: 'https://hikmatia.com',
  description: 'Explore 2,500 years of wisdom from Persia\'s greatest philosophers',
  publisher: {
    '@type': 'Organization',
    name: 'Hikmatia',
    logo: {
      '@type': 'ImageObject',
      url: 'https://hikmatia.com/images/logo.png',
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://hikmatia.com/explore?search={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hikmatia',
  url: 'https://hikmatia.com',
  logo: 'https://hikmatia.com/images/logo.png',
  description: 'A digital platform for exploring Persian philosophy and wisdom',
  sameAs: [
    'https://twitter.com/hikmatia',
    'https://instagram.com/hikmatia',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@hikmatia.com',
    contactType: 'customer service',
  },
};

export const educationalResourceSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOccupationalCredential',
  name: 'Persian Philosophy Studies',
  description: 'Comprehensive courses on Rumi, Hafez, Saadi, and other Persian philosophers',
  provider: {
    '@type': 'Organization',
    name: 'Hikmatia',
    url: 'https://hikmatia.com',
  },
};

export const articleSchema = (title: string, description: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title,
  description: description,
  url: url,
  publisher: {
    '@type': 'Organization',
    name: 'Hikmatia',
  },
  datePublished: new Date().toISOString(),
});
