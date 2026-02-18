'use client';
import { type ReactNode } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';

interface PremiumButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  disabled?: boolean;
  fullWidth?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  sx?: object;
}

const variantStyles = {
  primary: {
    background: 'linear-gradient(135deg, #8b4513 0%, #a0522d 100%)',
    color: '#fff',
    boxShadow: '0 4px 14px rgba(139, 69, 19, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #a0522d 0%, #8b4513 100%)',
      boxShadow: '0 6px 20px rgba(139, 69, 19, 0.4)',
      transform: 'translateY(-2px)',
    },
  },
  secondary: {
    background: 'linear-gradient(135deg, #2e4a3d 0%, #3d6b52 100%)',
    color: '#fff',
    boxShadow: '0 4px 14px rgba(46, 74, 61, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #3d6b52 0%, #2e4a3d 100%)',
      boxShadow: '0 6px 20px rgba(46, 74, 61, 0.4)',
      transform: 'translateY(-2px)',
    },
  },
  outline: {
    background: 'transparent',
    color: '#8b4513',
    border: '2px solid rgba(139, 69, 19, 0.3)',
    '&:hover': {
      border: '2px solid #8b4513',
      background: 'rgba(139, 69, 19, 0.05)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(139, 69, 19, 0.15)',
    },
  },
  ghost: {
    background: 'transparent',
    color: 'text.primary',
    '&:hover': {
      background: 'rgba(139, 69, 19, 0.08)',
      transform: 'translateY(-1px)',
    },
  },
};

export default function PremiumButton({
  children,
  variant = 'primary',
  disabled,
  fullWidth,
  startIcon,
  endIcon,
  onClick,
  type = 'button',
  href,
  sx,
}: PremiumButtonProps) {
  return (
    <motion.div
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Button
        variant={variant === 'ghost' ? 'text' : variant === 'outline' ? 'outlined' : 'contained'}
        disabled={disabled}
        fullWidth={fullWidth}
        startIcon={startIcon}
        endIcon={endIcon}
        onClick={onClick}
        type={type}
        href={href}
        sx={{
          ...variantStyles[variant],
          borderRadius: 2,
          textTransform: 'none' as const,
          fontWeight: 600,
          px: 3,
          py: 1.25,
          minHeight: 44,
          transition: 'all 0.2s ease',
          ...sx,
        }}
      >
        {children}
      </Button>
    </motion.div>
  );
}
