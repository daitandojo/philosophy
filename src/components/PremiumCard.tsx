'use client';
import { type ReactNode } from 'react';
import { Box, Paper, type PaperProps } from '@mui/material';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface PremiumCardProps extends Omit<PaperProps, 'children'> {
  children: ReactNode;
  hoverEffect?: boolean;
  glowOnHover?: boolean;
  motionProps?: HTMLMotionProps<'div'>;
}

export default function PremiumCard({
  children,
  hoverEffect = true,
  glowOnHover = false,
  sx,
  motionProps,
  ...props
}: PremiumCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, boxShadow: '0 12px 40px rgba(139, 69, 19, 0.18)' } : undefined}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
      {...motionProps}
    >
      <Paper
        sx={{
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'rgba(139, 69, 19, 0.12)',
          boxShadow: '0 4px 20px rgba(26, 58, 42, 0.08)',
          transition: 'all 0.25s ease',
          overflow: 'hidden',
          position: 'relative',
          ...(hoverEffect && {
            '&:hover': {
              borderColor: 'rgba(201, 169, 98, 0.35)',
            },
          }),
          ...(glowOnHover && {
            '&:hover::before': {
              opacity: 1,
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: -1,
              borderRadius: 'inherit',
              padding: '1px',
              background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.4), rgba(139, 69, 19, 0.2), rgba(201, 169, 98, 0.4))',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              pointerEvents: 'none',
            },
          }),
          ...sx,
        }}
        {...props}
      >
        {children}
      </Paper>
    </motion.div>
  );
}
