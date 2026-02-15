'use client';
import { Box } from '@mui/material';

const DEFAULT_HERO_IMAGE = '/hero.jpg';

interface HeroImageProps {
  src?: string;
  alt?: string;
}

export default function HeroImage({ src, alt = 'Rumi illustration' }: HeroImageProps) {
  const imageSrc = src || DEFAULT_HERO_IMAGE;
  
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        height: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: 4,
        background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.08) 0%, rgba(46, 74, 61, 0.08) 100%)',
        border: '3px solid rgba(139, 69, 19, 0.15)',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'inset 0 0 60px rgba(139, 69, 19, 0.05)',
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

      {/* White Edge Effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          boxShadow: 'inset 0 0 40px 25px rgba(250, 249, 247, 0.95)',
          pointerEvents: 'none',
          borderRadius: 4,
        }}
      />
    </Box>
  );
}
