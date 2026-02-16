'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Box,
  IconButton,
  Slider,
  Typography,
  Stack,
  Paper,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import SpeedIcon from '@mui/icons-material/Speed';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

interface AudioPlayerProps {
  src?: string;
  title?: string;
  philosopher?: string;
  persianText?: string;
  onEnded?: () => void;
}

export default function AudioPlayer({ 
  src, 
  title = 'Daily Wisdom', 
  philosopher = 'Rumi',
  persianText,
  onEnded 
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onEnded]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (_: Event, value: number | number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value as number;
    setProgress(value as number);
  };

  const handleVolumeChange = (_: Event, value: number | number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const vol = (value as number) / 100;
    audio.volume = vol;
    setVolume(value as number);
  };

  const togglePlaybackRate = () => {
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const newRate = rates[nextIndex];
    
    if (audioRef.current) {
      audioRef.current.playbackRate = newRate;
    }
    setPlaybackRate(newRate);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="metadata" />
      
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderRadius: 0,
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(46, 74, 61, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          color: 'white',
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Progress bar */}
          <Slider
            value={progress}
            max={duration || 100}
            onChange={handleSeek}
            sx={{
              color: '#c9a962',
              height: 4,
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
                '&:hover': {
                  boxShadow: '0 0 10px rgba(201, 169, 98, 0.5)',
                },
              },
              '& .MuiSlider-track': {
                border: 'none',
              },
            }}
          />

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* Track info */}
            <Stack direction="row" alignItems="center" sx={{ maxWidth: '40%' }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: 'rgba(201, 169, 98, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 1,
                  fontFamily: '"Vazir", serif',
                  fontSize: '1.5rem',
                }}
              >
                {philosopher[0]}
              </Box>
              <Box sx={{ overflow: 'hidden' }}>
                <Typography 
                  variant="body2" 
                  noWrap 
                  sx={{ fontWeight: 600 }}
                >
                  {title}
                </Typography>
                <Typography variant="caption" noWrap sx={{ opacity: 0.8 }}>
                  {philosopher}
                </Typography>
              </Box>
            </Stack>

            {/* Controls */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton size="small" sx={{ color: 'white' }}>
                <SkipPreviousIcon />
              </IconButton>
              <IconButton
                onClick={togglePlay}
                sx={{
                  bgcolor: '#c9a962',
                  color: '#1a1a1a',
                  width: 48,
                  height: 48,
                  '&:hover': {
                    bgcolor: '#d4bc7d',
                  },
                }}
              >
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton size="small" sx={{ color: 'white' }}>
                <SkipNextIcon />
              </IconButton>
            </Stack>

            {/* Volume & Speed */}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ maxWidth: '30%', justifyContent: 'flex-end' }}>
              <Typography variant="caption" sx={{ opacity: 0.8, minWidth: 35 }}>
                {formatTime(progress)}/{formatTime(duration)}
              </Typography>
              <IconButton size="small" onClick={togglePlaybackRate} sx={{ color: 'white' }}>
                <SpeedIcon />
                <Typography variant="caption" sx={{ ml: 0.5 }}>
                  {playbackRate}x
                </Typography>
              </IconButton>
              <IconButton size="small" sx={{ color: 'white' }}>
                {volume === 0 ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                sx={{
                  width: 80,
                  color: '#c9a962',
                }}
              />
              <IconButton 
                size="small" 
                onClick={() => setIsExpanded(!isExpanded)}
                sx={{ color: 'white' }}
              >
                <FullscreenIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </>
  );
}
