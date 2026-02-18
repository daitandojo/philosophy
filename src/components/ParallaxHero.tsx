'use client';
import { useRef, type ReactNode } from 'react';
import { Box, type BoxProps } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxHeroProps extends BoxProps {
  children: ReactNode;
  backgroundImage?: string;
  parallaxStrength?: number;
}

export default function ParallaxHero({
  children,
  backgroundImage,
  parallaxStrength = 0.3,
  sx,
  ...props
}: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${parallaxStrength * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 400, md: 500 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
      {...props}
    >
      {backgroundImage && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            y,
            opacity,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />
      )}
      
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: backgroundImage 
            ? 'linear-gradient(to bottom, rgba(26, 58, 42, 0.85), rgba(26, 58, 42, 0.7))'
            : 'linear-gradient(135deg, rgba(26, 58, 42, 0.08) 0%, rgba(46, 74, 61, 0.05) 100%)',
          zIndex: 1,
        }}
      />
      
      <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
}

export function ParallaxSection({
  children,
  offset = 50,
}: {
  children: ReactNode;
  offset?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${offset}%`, `${offset}%`]);

  return (
    <motion.div style={{ y }}>
      <div ref={ref}>{children}</div>
    </motion.div>
  );
}
