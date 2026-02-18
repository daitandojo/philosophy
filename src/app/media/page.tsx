'use client';
import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  CircularProgress,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import { HeroPattern, FloatingMotif, CornerDecoration } from '@/components/SVGDecorations';
import VideoTile from '@/components/VideoTile';
import VideoPlayerModal from '@/components/VideoPlayerModal';
import VideoSubmissionForm from '@/components/VideoSubmissionForm';

interface Video {
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
  featured?: boolean;
}

const categories = [
  { value: 'all', label: 'All' },
  { value: 'poetry', label: 'Poetry' },
  { value: 'history', label: 'History' },
  { value: 'music', label: 'Music' },
  { value: 'documentary', label: 'Documentaries' },
  { value: 'educational', label: 'Educational' },
  { value: 'sufism', label: 'Sufism' },
  { value: 'philosophy', label: 'Philosophy' },
];

export default function MediaPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [submissionOpen, setSubmissionOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [featuredVideo, setFeaturedVideo] = useState<Video | null>(null);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedVideoForMenu, setSelectedVideoForMenu] = useState<Video | null>(null);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      
      const response = await fetch(`/api/videos?${params.toString()}`);
      const data = await response.json();
      setVideos(data);
      
      const featured = data.find((v: Video) => v.featured);
      setFeaturedVideo(featured || data[0] || null);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const session = await res.json();
        setIsAuthenticated(!!session?.user);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handlePlayVideo = (video: Video) => {
    setSelectedVideo(video);
    setPlayerOpen(true);
  };

  const handleLikeVideo = async (videoId: string) => {
    try {
      await fetch(`/api/videos/${videoId}/like`, { method: 'POST' });
      fetchVideos();
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleDeleteVideo = async (videoId: string) => {
    try {
      const response = await fetch(`/api/videos/${videoId}`, { method: 'DELETE' });
      if (response.ok) {
        fetchVideos();
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
    setMenuAnchor(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, video: Video) => {
    event.stopPropagation();
    setMenuAnchor(event.currentTarget);
    setSelectedVideoForMenu(video);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a3a2a 0%, #2e4a3d 50%, #3d6b52 100%)',
          py: { xs: 6, md: 10 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <HeroPattern color="#c9a962" opacity={0.08} />
        <CornerDecoration position="top-left" color="#c9a962" size={120} />
        <CornerDecoration position="bottom-right" color="#c9a962" size={120} />
        <FloatingMotif variant="celestial" color="#c9a962" size={100} top="8%" right="8%" opacity={0.12} />
        <FloatingMotif variant="geometric" color="#c9a962" size={70} bottom="15%" left="10%" opacity={0.1} />
        <FloatingMotif variant="lamp" color="#c9a962" size={60} top="20%" left="5%" opacity={0.1} />
        
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.25,
          }}
        >
          <Image
            src="/images/home-hero.png"
            alt="Persian wisdom"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="overline" 
            sx={{ 
              color: 'rgba(201, 169, 98, 0.9)', 
              letterSpacing: 6, 
              mb: 2, 
              display: 'block',
              fontSize: '0.875rem',
            }}
          >
            Visual Wisdom
          </Typography>
          <Typography 
            variant="h2" 
            sx={{ 
              color: 'white', 
              fontWeight: 300, 
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              lineHeight: 1.2,
            }}
          >
            Multimedia Library
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255,255,255,0.8)', 
              fontWeight: 300, 
              maxWidth: 600, 
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Explore Persian wisdom through curated videos on philosophy, poetry, Sufism, and the rich cultural heritage of Persia.
          </Typography>
        </Container>
      </Box>

      {/* Featured Video */}
      {featuredVideo && (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1a3a2a' }}>
            Featured Video
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '56.25%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(26, 58, 42, 0.15)',
                }}
                onClick={() => handlePlayVideo(featuredVideo)}
              >
                <Box
                  component="img"
                  src={featuredVideo.thumbnailUrl}
                  alt={featuredVideo.title}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(26,58,42,0.4) 0%, rgba(201,169,98,0.3) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PlayCircleIcon sx={{ fontSize: 80, color: '#c9a962', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }} />
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1a3a2a' }}>
                  {featuredVideo.title}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                  {featuredVideo.philosopher && (
                    <Chip
                      label={featuredVideo.philosopher}
                      size="small"
                      sx={{ bgcolor: 'rgba(26, 58, 42, 0.1)', color: '#1a3a2a' }}
                    />
                  )}
                  <Chip
                    label={featuredVideo.category}
                    size="small"
                    sx={{ bgcolor: 'rgba(201, 169, 98, 0.2)', color: '#8b4513', textTransform: 'capitalize' }}
                  />
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {featuredVideo.description}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handlePlayVideo(featuredVideo)}
                  sx={{
                    bgcolor: '#1a3a2a',
                    '&:hover': { bgcolor: '#2e4a3d' },
                    alignSelf: 'flex-start',
                  }}
                >
                  Watch Now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}

      {/* Category Tabs and Search */}
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'stretch', md: 'center' }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {categories.map((cat) => (
              <Chip
                key={cat.value}
                label={cat.label}
                onClick={() => setSelectedCategory(cat.value)}
                sx={{
                  bgcolor: selectedCategory === cat.value ? '#1a3a2a' : 'transparent',
                  color: selectedCategory === cat.value ? 'white' : '#1a3a2a',
                  border: '1px solid',
                  borderColor: selectedCategory === cat.value ? '#1a3a2a' : 'rgba(26, 58, 42, 0.3)',
                  fontWeight: 500,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: selectedCategory === cat.value ? '#2e4a3d' : 'rgba(26, 58, 42, 0.05)',
                  },
                }}
              />
            ))}
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              size="small"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                minWidth: 200,
                '& .MuiOutlinedInput-root': {
                  bgcolor: 'background.paper',
                },
              }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setSubmissionOpen(true)}
              sx={{
                bgcolor: '#8b4513',
                '&:hover': { bgcolor: '#6b3410' },
              }}
            >
              Add Video
            </Button>
          </Stack>
        </Stack>

        {/* Video Grid */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : videos.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              No videos found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or category filter, or add a new video to the library.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {videos.map((video) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={video._id}>
                <Box sx={{ position: 'relative' }}>
                  <VideoTile video={video} onPlay={handlePlayVideo} onLike={handleLikeVideo} />
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, video)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'rgba(255,255,255,0.9)',
                      '&:hover': { bgcolor: 'white' },
                      zIndex: 5,
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Video Player Modal */}
      <VideoPlayerModal
        open={playerOpen}
        onClose={() => setPlayerOpen(false)}
        video={selectedVideo}
      />

      {/* Submission Form */}
      <VideoSubmissionForm
        open={submissionOpen}
        onClose={() => setSubmissionOpen(false)}
        onSuccess={fetchVideos}
        isAuthenticated={isAuthenticated}
      />

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={() => setMenuAnchor(null)}
      >
        <MenuItem onClick={() => handleDeleteVideo(selectedVideoForMenu?._id || '')}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete Video
        </MenuItem>
      </Menu>
    </Box>
  );
}
