'use client';
import { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  IconButton,
  Typography,
  Chip,
  Stack,
  Fade,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface VideoPlayerModalProps {
  open: boolean;
  onClose: () => void;
  video: {
    _id: string;
    youtubeId: string;
    title: string;
    description: string;
    category: string;
    philosopher?: string;
  } | null;
}

const categoryColors: Record<string, string> = {
  poetry: '#8b4513',
  history: '#2e4a3d',
  music: '#722F37',
  documentary: '#3d6b52',
  educational: '#1a3a2a',
  sufi: '#6b4423',
  philosophy: '#c9a962',
};

export default function VideoPlayerModal({ open, onClose, video }: VideoPlayerModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  if (!video) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={300}
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          borderRadius: 2,
          overflow: 'hidden',
          maxHeight: '90vh',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 10,
          bgcolor: 'rgba(0,0,0,0.5)',
          color: 'white',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.7)',
          },
        }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        sx={{
          position: 'relative',
          paddingTop: '56.25%',
          bgcolor: '#000',
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: '#1a3a2a',
            lineHeight: 1.3,
          }}
        >
          {video.title}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
          {video.philosopher && (
            <Chip
              label={video.philosopher}
              sx={{
                bgcolor: 'rgba(26, 58, 42, 0.1)',
                color: '#1a3a2a',
                fontWeight: 500,
              }}
            />
          )}
          <Chip
            label={video.category}
            sx={{
              bgcolor: `${categoryColors[video.category] || '#1a3a2a'}15`,
              color: categoryColors[video.category] || '#1a3a2a',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}
          />
        </Stack>

        {video.description && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              lineHeight: 1.8,
            }}
          >
            {video.description}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}
