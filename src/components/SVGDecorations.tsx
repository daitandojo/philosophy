'use client';
import { Box } from '@mui/material';

interface SVGMotifProps {
  variant?: 'geometric' | 'floral' | 'celestial' | 'waves' | 'arcs' | 'stars' | 'lamp' | 'book' | 'moon' | 'sun' | 'arabesque';
  color?: string;
  opacity?: number;
  width?: number | string;
  height?: number | string;
}

export function HeroPattern({ 
  color = '#c9a962', 
  opacity = 0.1,
  width = '100%',
  height = '100%'
}: SVGMotifProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', opacity }}
      >
        <defs>
          <pattern id="persian-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="2" fill={color} />
            <path d="M0 30 Q15 15 30 30 T60 30" stroke={color} strokeWidth="0.5" fill="none" />
            <path d="M0 30 Q15 45 30 30 T60 30" stroke={color} strokeWidth="0.5" fill="none" />
            <circle cx="0" cy="0" r="1" fill={color} />
            <circle cx="60" cy="0" r="1" fill={color} />
            <circle cx="0" cy="60" r="1" fill={color} />
            <circle cx="60" cy="60" r="1" fill={color} />
          </pattern>
          <pattern id="diamond-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0 L40 20 L20 40 L0 20 Z" stroke={color} strokeWidth="0.3" fill="none" />
            <circle cx="20" cy="20" r="2" fill={color} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#persian-pattern)" />
      </svg>
    </Box>
  );
}

export function SectionDivider({ 
  color = '#c9a962', 
  height = 40 
}: { color?: string; height?: number }) {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: height / 8 }}>
      <svg width="200" height={height} viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M0 20 Q50 5 100 20 T200 20" 
          stroke={color} 
          strokeWidth="1" 
          fill="none" 
          opacity="0.6"
        />
        <circle cx="100" cy="20" r="4" fill={color} opacity="0.8" />
        <circle cx="50" cy="12" r="2" fill={color} opacity="0.5" />
        <circle cx="150" cy="12" r="2" fill={color} opacity="0.5" />
        <circle cx="0" cy="20" r="2" fill={color} opacity="0.4" />
        <circle cx="200" cy="20" r="2" fill={color} opacity="0.4" />
      </svg>
    </Box>
  );
}

export function CornerDecoration({ 
  position = 'bottom-right',
  color = '#c9a962',
  size = 100
}: { 
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color?: string;
  size?: number;
}) {
  const positions: Record<string, string> = {
    'top-left': 'translate(0, 0)',
    'top-right': `translate(${size}, 0) scale(-1, 1)`,
    'bottom-left': `translate(0, ${size}) scale(1, -1)`,
    'bottom-right': `translate(${size}, ${size}) scale(-1, -1)`,
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        [position.includes('top') ? 'top' : 'bottom']: 0,
        [position.includes('left') ? 'left' : 'right']: 0,
        width: size,
        height: size,
        opacity: 0.15,
        pointerEvents: 'none',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        <g transform={positions[position]}>
          <path 
            d="M0 0 Q50 20 100 0 L100 100 Q80 50 100 0" 
            stroke={color} 
            strokeWidth="1" 
            fill="none" 
          />
          <circle cx="50" cy="30" r="3" fill={color} />
          <circle cx="70" cy="15" r="2" fill={color} />
        </g>
      </svg>
    </Box>
  );
}

export function FloatingMotif({ 
  variant = 'geometric',
  color = '#c9a962',
  size = 60,
  top,
  left,
  right,
  bottom,
  opacity = 0.08,
  animation = true
}: {
  variant?: 'geometric' | 'floral' | 'celestial' | 'waves' | 'arcs' | 'stars' | 'lamp' | 'book' | 'moon' | 'sun' | 'arabesque';
  color?: string;
  size?: number;
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  opacity?: number;
  animation?: boolean;
}) {
  const variants: Record<string, string> = {
    geometric: `
      <polygon points="30,5 55,45 5,45" stroke="${color}" stroke-width="1" fill="none"/>
      <circle cx="30" cy="30" r="8" stroke="${color}" stroke-width="0.5" fill="none"/>
      <circle cx="30" cy="30" r="3" fill="${color}"/>
    `,
    floral: `
      <circle cx="30" cy="30" r="15" stroke="${color}" stroke-width="0.5" fill="none"/>
      <circle cx="30" cy="15" r="5" stroke="${color}" stroke-width="0.5" fill="none"/>
      <circle cx="42" cy="35" r="5" stroke="${color}" stroke-width="0.5" fill="none"/>
      <circle cx="18" cy="35" r="5" stroke="${color}" stroke-width="0.5" fill="none"/>
      <circle cx="30" cy="30" r="4" fill="${color}"/>
    `,
    celestial: `
      <circle cx="30" cy="30" r="12" stroke="${color}" stroke-width="0.5" fill="none"/>
      <path d="M30 10 L30 18 M30 42 L30 50 M10 30 L18 30 M42 30 L50 30" stroke="${color}" stroke-width="0.5"/>
      <circle cx="30" cy="30" r="3" fill="${color}"/>
      <circle cx="15" cy="15" r="2" fill="${color}" opacity="0.5"/>
      <circle cx="45" cy="45" r="2" fill="${color}" opacity="0.5"/>
    `,
    waves: `
      <path d="M5 25 Q15 15 25 25 T45 25 T65 25" stroke="${color}" stroke-width="1" fill="none"/>
      <path d="M5 35 Q15 25 25 35 T45 35 T65 35" stroke="${color}" stroke-width="0.5" fill="none" opacity="0.5"/>
    `,
    arcs: `
      <path d="M10 50 Q30 10 50 50" stroke="${color}" stroke-width="1" fill="none"/>
      <path d="M20 50 Q30 25 40 50" stroke="${color}" stroke-width="0.5" fill="none"/>
    `,
    stars: `
      <polygon points="30,5 35,20 50,20 38,30 43,45 30,35 17,45 22,30 10,20 25,20" fill="${color}" opacity="0.3"/>
    `,
    lamp: `
      <path d="M15 45 L25 45 L25 35 L20 30 L15 35 Z" fill="${color}" opacity="0.8"/>
      <path d="M20 30 L20 20" stroke="${color}" stroke-width="1"/>
      <path d="M15 45 Q20 50 25 45" stroke="${color}" stroke-width="0.5" fill="none"/>
      <ellipse cx="20" cy="20" rx="8" ry="3" stroke="${color}" stroke-width="0.5" fill="none"/>
      <path d="M12 35 Q20 25 28 35" stroke="${color}" stroke-width="0.5" fill="none"/>
    `,
    book: `
      <path d="M10 15 L30 15 L30 45 L10 45 L10 15 M10 15 L10 45 Q10 50 15 50 L30 45" stroke="${color}" stroke-width="0.8" fill="none"/>
      <line x1="20" y1="15" x2="20" y2="45" stroke="${color}" stroke-width="0.5"/>
      <line x1="12" y1="22" x2="18" y2="22" stroke="${color}" stroke-width="0.3"/>
      <line x1="12" y1="28" x2="18" y2="28" stroke="${color}" stroke-width="0.3"/>
      <line x1="22" y1="22" x2="28" y2="22" stroke="${color}" stroke-width="0.3"/>
      <line x1="22" y1="28" x2="28" y2="28" stroke="${color}" stroke-width="0.3"/>
    `,
    moon: `
      <path d="M20 10 A15 15 0 1 1 20 50 A10 10 0 1 0 20 10" fill="${color}" opacity="0.8"/>
      <circle cx="25" cy="18" r="1" fill="${color}"/>
      <circle cx="18" cy="40" r="1.5" fill="${color}" opacity="0.5"/>
    `,
    sun: `
      <circle cx="30" cy="30" r="10" stroke="${color}" stroke-width="0.5" fill="none"/>
      <line x1="30" y1="5" x2="30" y2="15" stroke="${color}" stroke-width="0.5"/>
      <line x1="30" y1="45" x2="30" y2="55" stroke="${color}" stroke-width="0.5"/>
      <line x1="5" y1="30" x2="15" y2="30" stroke="${color}" stroke-width="0.5"/>
      <line x1="45" y1="30" x2="55" y2="30" stroke="${color}" stroke-width="0.5"/>
      <line x1="12" y1="12" x2="20" y2="20" stroke="${color}" stroke-width="0.5"/>
      <line x1="40" y1="40" x2="48" y2="48" stroke="${color}" stroke-width="0.5"/>
      <line x1="12" y1="48" x2="20" y2="40" stroke="${color}" stroke-width="0.5"/>
      <line x1="40" y1="20" x2="48" y2="12" stroke="${color}" stroke-width="0.5"/>
    `,
    arabesque: `
      <path d="M10 30 Q15 15 30 15 Q45 15 50 30 Q45 45 30 45 Q15 45 10 30" stroke="${color}" stroke-width="0.5" fill="none"/>
      <path d="M20 30 Q25 22 30 22 Q35 22 40 30 Q35 38 30 38 Q25 38 20 30" stroke="${color}" stroke-width="0.3" fill="none"/>
      <circle cx="30" cy="30" r="3" fill="${color}" opacity="0.5"/>
      <path d="M30 15 L30 22" stroke="${color}" stroke-width="0.3"/>
      <path d="M30 38 L30 45" stroke="${color}" stroke-width="0.3"/>
    `,
  };

  return (
    <Box
        sx={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        opacity,
        pointerEvents: 'none',
        ...(animation && {
          animation: 'float 6s ease-in-out infinite',
          '@keyframes float': {
            '0%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
            '100%': { transform: 'translateY(0)' },
          },
        }),
      }}
    >
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 60 60"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: variants[variant] }}
      />
    </Box>
  );
}

export function OrnamentLine({ 
  color = '#c9a962',
  width = '100%',
  variant = 'dashed'
}: { 
  color?: string; 
  width?: string | number;
  variant?: 'dashed' | 'dotted' | 'solid' | 'ornate';
}) {
  if (variant === 'ornate') {
    return (
      <Box sx={{ width, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <svg width="30" height="20" viewBox="0 0 30 20">
          <circle cx="15" cy="10" r="3" fill={color} opacity="0.6" />
          <circle cx="5" cy="10" r="1.5" fill={color} opacity="0.4" />
          <circle cx="25" cy="10" r="1.5" fill={color} opacity="0.4" />
        </svg>
        <svg width="60" height="20" viewBox="0 0 60 20" style={{ flex: 1 }}>
          <path d="M0 10 L60 10" stroke={color} strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
        </svg>
        <svg width="30" height="20" viewBox="0 0 30 20">
          <circle cx="15" cy="10" r="3" fill={color} opacity="0.6" />
          <circle cx="5" cy="10" r="1.5" fill={color} opacity="0.4" />
          <circle cx="25" cy="10" r="1.5" fill={color} opacity="0.4" />
        </svg>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        width, 
        height: 2,
        background: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 4px, transparent 4px, transparent 8px)`,
        opacity: 0.2,
      }} 
    />
  );
}

export function CardDecoration({ 
  color = '#c9a962',
  variant = 'top-right'
}: { 
  color?: string;
  variant?: 'top-right' | 'top-left' | 'none';
}) {
  if (variant === 'none') return null;
  
  const transform = variant === 'top-right' ? 'scale(-1, 1)' : 'none';

  return (
    <Box
      sx={{
        position: 'absolute',
        top: -1,
        [variant === 'top-right' ? 'right' : 'left']: -1,
        width: 40,
        height: 40,
        opacity: 0.1,
        pointerEvents: 'none',
      }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40">
        <g transform={transform}>
          <path 
            d="M0 40 Q20 20 40 40" 
            stroke={color} 
            strokeWidth="1" 
            fill="none" 
          />
          <circle cx="20" cy="25" r="2" fill={color} />
        </g>
      </svg>
    </Box>
  );
}

export function QuoteDecoration({ 
  color = '#c9a962',
  size = 24,
  position = 'top-left'
}: { 
  color?: string;
  size?: number;
  position?: 'top-left' | 'top-right' | 'none';
}) {
  if (position === 'none') return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        [position.includes('top') ? 'top' : 'bottom']: size * 0.5,
        [position.includes('left') ? 'left' : 'right']: size * 0.5,
        opacity: 0.08,
        pointerEvents: 'none',
      }}
    >
      <svg width={size * 4} height={size * 4} viewBox="0 0 100 100">
        <path 
          d="M20 80 Q10 40 30 20 Q50 10 60 30 Q50 20 60 10 Q40 0 30 20 Q10 40 20 80" 
          fill={color}
        />
        <path 
          d="M60 80 Q50 40 70 20 Q90 10 100 30 Q90 20 100 10 Q80 0 70 20 Q50 40 60 80" 
          fill={color}
          opacity="0.5"
        />
      </svg>
    </Box>
  );
}

export function BackgroundCircles({ 
  color = '#c9a962',
  count = 5,
  opacity = 0.05
}: { 
  color?: string;
  count?: number;
  opacity?: number;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            border: `1px solid ${color}`,
            opacity,
            width: 100 + i * 80,
            height: 100 + i * 80,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            animation: `pulse ${4 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            '@keyframes pulse': {
              '0%, 100%': { opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' },
              '50%': { opacity: opacity * 2, transform: 'translate(-50%, -50%) scale(1)' },
            },
          }}
        />
      ))}
    </>
  );
}
