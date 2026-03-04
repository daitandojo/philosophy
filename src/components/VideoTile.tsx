'use client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Stack,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Image from 'next/image';

interface VideoTileProps {
  video: {
    _id: string;
    youtubeId: string;
    title: string;
    description: string;
    category: string;
    philosopher?: string;
    duration: string;
    thumbnailUrl: string;
    views: number;
    likes: number;
  };
  onPlay: (video: any) => void;
  onLike: (videoId: string) => void;
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

export default function VideoTile({ video, onPlay, onLike }: VideoTileProps) {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: 'linear-gradient(145deg, rgba(26,58,42,0.02) 0%, rgba(201,169,98,0.02) 100%)',
        border: '1px solid rgba(139, 69, 19, 0.1)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 24px 50px rgba(26, 58, 42, 0.2), 0 0 0 1px rgba(201, 169, 98, 0.3)',
          borderColor: 'rgba(201, 169, 98, 0.4)',
          '& .play-overlay': {
            opacity: 1,
          },
          '& .corner-decor': {
            opacity: 0.4,
          },
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -1,
          left: -1,
          right: -1,
          bottom: -1,
          background: 'linear-gradient(135deg, #c9a962 0%, transparent 50%, #c9a962 100%)',
          opacity: 0,
          transition: 'opacity 0.4s ease',
          zIndex: -1,
          borderRadius: 'inherit',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          paddingTop: '56.25%',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
        onClick={() => onPlay(video)}
      >
        <Image
          src={video.thumbnailUrl}
          alt={video.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
        
        <Box
          className="play-overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(26,58,42,0.3) 0%, rgba(201,169,98,0.2) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.7,
            transition: 'opacity 0.3s ease',
          }}
        >
          <PlayCircleIcon
            sx={{
              fontSize: 72,
              color: '#c9a962',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          />
        </Box>

        {video.duration && video.duration !== '0:00' && (
          <Chip
            label={video.duration}
            size="small"
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.8)',
              color: 'white',
              fontWeight: 500,
              fontSize: '0.7rem',
            }}
          />
        )}

        <Box
          className="corner-decor"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 40,
            height: 40,
            opacity: 0.15,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path
              d="M0 0 Q20 20 40 0"
              stroke="#c9a962"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="8" cy="8" r="2" fill="#c9a962" />
          </svg>
        </Box>

        <Box
          className="corner-decor"
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 40,
            height: 40,
            opacity: 0.15,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none',
            transform: 'scaleX(-1)',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path
              d="M0 0 Q20 20 40 0"
              stroke="#c9a962"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="8" cy="8" r="2" fill="#c9a962" />
          </svg>
        </Box>
      </Box>

      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 1.5,
            fontSize: '1rem',
            lineHeight: 1.4,
            color: '#1a3a2a',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {video.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6,
          }}
        >
          {video.description}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}
        >
          {video.philosopher && (
            <Chip
              label={video.philosopher}
              size="small"
              sx={{
                bgcolor: 'rgba(26, 58, 42, 0.1)',
                color: '#1a3a2a',
                fontWeight: 500,
                fontSize: '0.7rem',
                border: '1px solid rgba(26, 58, 42, 0.2)',
              }}
            />
          )}
          <Chip
            label={video.category}
            size="small"
            sx={{
              bgcolor: `${categoryColors[video.category] || '#1a3a2a'}15`,
              color: categoryColors[video.category] || '#1a3a2a',
              fontWeight: 600,
              textTransform: 'capitalize',
              fontSize: '0.7rem',
              border: `1px solid ${categoryColors[video.category] || '#1a3a2a'}30`,
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 'auto' }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {video.views || 0}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={0.5}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onLike(video._id);
              }}
              sx={{
                color: '#8b4513',
                '&:hover': {
                  bgcolor: 'rgba(139, 69, 19, 0.1)',
                },
              }}
            >
              <FavoriteIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <Typography variant="caption" color="text.secondary">
              {video.likes || 0}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
