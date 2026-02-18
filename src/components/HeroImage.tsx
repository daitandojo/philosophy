'use client';
import { Box } from '@mui/material';

const DEFAULT_HERO_IMAGE = '/images/hero/hero-main.png';

interface HeroImageProps {
  src?: string;
  alt?: string;
}

export default function HeroImage({ src, alt = 'Persian wisdom illustration' }: HeroImageProps) {
  const imageSrc = src || DEFAULT_HERO_IMAGE;
  
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 450,
        height: 350,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 3,
        background: 'linear-gradient(135deg, rgba(26, 58, 42, 0.05) 0%, rgba(61, 107, 82, 0.08) 100%)',
        border: '2px solid rgba(201, 169, 98, 0.2)',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(26, 58, 42, 0.15)',
      }}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={alt}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: 2,
        }}
      />
    </Box>
  );
}
