'use client';
import { Box, Skeleton, type SkeletonProps as MuiSkeletonProps } from '@mui/material';

export function PulseSkeleton({ 
  variant = 'rectangular', 
  width = '100%', 
  height,
  animation = 'pulse',
  sx
}: MuiSkeletonProps) {
  return (
    <Skeleton
      variant={variant}
      width={width}
      height={height}
      animation={animation}
      sx={{ 
        bgcolor: 'rgba(139, 69, 19, 0.08)',
        '&::after': {
          background: 'linear-gradient(90deg, transparent, rgba(201, 169, 98, 0.08), transparent)',
        },
        ...sx,
      }}
    />
  );
}

export function VerseCardSkeleton() {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'rgba(139, 69, 19, 0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <PulseSkeleton variant="text" width={40} height={32} />
        <PulseSkeleton variant="rounded" width={80} height={24} />
      </Box>
      
      <PulseSkeleton variant="text" width="90%" height={24} sx={{ mb: 1 }} />
      <PulseSkeleton variant="text" width="75%" height={24} sx={{ mb: 2 }} />
      
      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <PulseSkeleton variant="rounded" width={60} height={24} />
        <PulseSkeleton variant="rounded" width={60} height={24} />
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <PulseSkeleton variant="circular" width={32} height={32} />
          <PulseSkeleton variant="circular" width={32} height={32} />
          <PulseSkeleton variant="circular" width={32} height={32} />
        </Box>
        <PulseSkeleton variant="circular" width={32} height={32} />
      </Box>
    </Box>
  );
}

export function PhilosopherCardSkeleton() {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'rgba(139, 69, 19, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <PulseSkeleton variant="circular" width={80} height={80} sx={{ mb: 2 }} />
      <PulseSkeleton variant="text" width={120} height={24} sx={{ mb: 1 }} />
      <PulseSkeleton variant="text" width={80} height={18} sx={{ mb: 2 }} />
      <PulseSkeleton variant="text" width="100%" height={60} />
      <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
        <PulseSkeleton variant="rounded" width={60} height={24} />
        <PulseSkeleton variant="rounded" width={60} height={24} />
      </Box>
    </Box>
  );
}

export function QuoteSkeleton() {
  return (
    <Box sx={{ p: 3, position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 8, left: 8, opacity: 0.3 }}>
        <PulseSkeleton variant="text" width={24} height={24} />
      </Box>
      <Box sx={{ pl: 4 }}>
        <PulseSkeleton variant="text" width="95%" height={22} sx={{ mb: 1.5 }} />
        <PulseSkeleton variant="text" width="85%" height={22} sx={{ mb: 1.5 }} />
        <PulseSkeleton variant="text" width="70%" height={22} sx={{ mb: 2 }} />
        <PulseSkeleton variant="text" width={100} height={16} />
      </Box>
    </Box>
  );
}

export function HeroSkeleton() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        p: 4,
        alignItems: 'center',
      }}
    >
      <Box sx={{ flex: 1, width: '100%' }}>
        <PulseSkeleton variant="text" width="30%" height={20} sx={{ mb: 2 }} />
        <PulseSkeleton variant="text" width="90%" height={48} sx={{ mb: 1 }} />
        <PulseSkeleton variant="text" width="70%" height={48} sx={{ mb: 3 }} />
        <PulseSkeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
        <PulseSkeleton variant="text" width="85%" height={20} sx={{ mb: 1 }} />
        <PulseSkeleton variant="text" width="60%" height={20} sx={{ mb: 4 }} />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <PulseSkeleton variant="rounded" width={120} height={44} />
          <PulseSkeleton variant="rounded" width={120} height={44} />
        </Box>
      </Box>
      <Box sx={{ flex: 1, width: '100%', maxWidth: 450 }}>
        <PulseSkeleton variant="rounded" width="100%" height={350} />
      </Box>
    </Box>
  );
}

export function ListItemSkeleton() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
      <PulseSkeleton variant="circular" width={48} height={48} />
      <Box sx={{ flex: 1 }}>
        <PulseSkeleton variant="text" width="60%" height={20} sx={{ mb: 0.5 }} />
        <PulseSkeleton variant="text" width="40%" height={16} />
      </Box>
      <PulseSkeleton variant="rounded" width={60} height={24} />
    </Box>
  );
}

export function CardSkeleton() {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'rgba(139, 69, 19, 0.1)',
      }}
    >
      <PulseSkeleton variant="rounded" width="100%" height={160} sx={{ mb: 2 }} />
      <PulseSkeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} />
      <PulseSkeleton variant="text" width="60%" height={18} sx={{ mb: 2 }} />
      <PulseSkeleton variant="text" width="100%" height={60} />
    </Box>
  );
}
