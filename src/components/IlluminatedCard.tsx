'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';

type BorderStyle = 'gold-lapis' | 'turquoise-sand' | 'black-gold' | 'white-silver';

interface IlluminatedProps {
  children: ReactNode;
  borderStyle?: BorderStyle;
  padding?: number | string;
}

const borderImages: Record<BorderStyle, string> = {
  'gold-lapis': '/assets/borders/gold-lapis.svg',
  'turquoise-sand': '/assets/borders/turquoise-sand.svg',
  'black-gold': '/assets/borders/black-gold.svg',
  'white-silver': '/assets/borders/white-silver.svg',
};

const borderStyles: Record<BorderStyle, {
  borderImageSource: string;
  borderImageSlice: number;
  borderImageRepeat: 'round' | 'stretch' | 'repeat';
}> = {
  'gold-lapis': {
    borderImageSource: borderImages['gold-lapis'],
    borderImageSlice: 30,
    borderImageRepeat: 'round',
  },
  'turquoise-sand': {
    borderImageSource: borderImages['turquoise-sand'],
    borderImageSlice: 30,
    borderImageRepeat: 'round',
  },
  'black-gold': {
    borderImageSource: borderImages['black-gold'],
    borderImageSlice: 30,
    borderImageRepeat: 'round',
  },
  'white-silver': {
    borderImageSource: borderImages['white-silver'],
    borderImageSlice: 30,
    borderImageRepeat: 'round',
  },
};

export function withIllumination<P extends object>(
  Component: React.ComponentType<P>,
  borderStyle: BorderStyle = 'gold-lapis',
  padding: number | string = 3
) {
  return function IlluminatedComponent(props: P) {
    const style = borderStyles[borderStyle];
    
    return (
      <Box
        sx={{
          borderImageSource: `url(${style.borderImageSource})`,
          borderImageSlice: style.borderImageSlice,
          borderImageRepeat: style.borderImageRepeat,
          borderWidth: '30px',
          borderStyle: 'solid',
          p: padding,
        }}
      >
        <Component {...props} />
      </Box>
    );
  };
}

export function IlluminatedCard({ 
  children, 
  borderStyle = 'gold-lapis',
  padding = 3,
}: IlluminatedProps) {
  const style = borderStyles[borderStyle];
  
  return (
    <Box
      sx={{
        borderImageSource: `url(${style.borderImageSource})`,
        borderImageSlice: style.borderImageSlice,
        borderImageRepeat: style.borderImageRepeat,
        borderWidth: '30px',
        borderStyle: 'solid',
        p: padding,
        background: 'rgba(5, 15, 10, 0.4)',
        backdropFilter: 'blur(8px)',
        borderRadius: 1,
      }}
    >
      {children}
    </Box>
  );
}

export default IlluminatedCard;
