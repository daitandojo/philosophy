'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';

interface VideoSubmissionFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isAuthenticated: boolean;
}

const categories = [
  { value: 'poetry', label: 'Poetry' },
  { value: 'history', label: 'History' },
  { value: 'music', label: 'Music' },
  { value: 'documentary', label: 'Documentary' },
  { value: 'educational', label: 'Educational' },
  { value: 'sufism', label: 'Sufism' },
  { value: 'philosophy', label: 'Philosophy' },
];

const philosophers = [
  'Rumi',
  'Hafez',
  'Saadi',
  'Ibn Arabi',
  'Farabi',
  'Avicenna',
  'Mulla Sadra',
  'Seyyed Hossein Nasr',
  'Attar',
  'Sanai',
  'Jami',
  'Nizami',
  'Multiple',
  'Other',
];

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export default function VideoSubmissionForm({ open, onClose, onSuccess, isAuthenticated }: VideoSubmissionFormProps) {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('educational');
  const [philosopher, setPhilosopher] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleUrlChange = (url: string) => {
    setYoutubeUrl(url);
    const videoId = extractYouTubeId(url);
    if (videoId) {
      setTitle(`YouTube Video (${videoId})`);
    }
  };

  const handleSubmit = async () => {
    if (!isAuthenticated) {
      setError('Please sign in to submit videos');
      return;
    }

    if (!youtubeUrl || !title) {
      setError('YouTube URL and title are required');
      return;
    }

    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      setError('Invalid YouTube URL');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/videos/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          youtubeUrl,
          title,
          description,
          category,
          philosopher: philosopher || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit video');
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        handleClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setYoutubeUrl('');
    setTitle('');
    setDescription('');
    setCategory('educational');
    setPhilosopher('');
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: 'background.paper',
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(139, 69, 19, 0.1)',
        pb: 2,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AddCircleIcon sx={{ color: '#c9a962' }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#1a3a2a' }}>
            Add New Video
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3 }}>
        {!isAuthenticated && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            Please sign in to submit videos to the library.
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Video submitted successfully! It is now available in the library.
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="YouTube URL"
            fullWidth
            value={youtubeUrl}
            onChange={(e) => handleUrlChange(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            disabled={loading}
            helperText="Paste the full YouTube video URL"
          />

          <TextField
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Video title"
            disabled={loading}
            required
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the video"
            disabled={loading}
          />

          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Philosopher (Optional)</InputLabel>
            <Select
              value={philosopher}
              label="Philosopher (Optional)"
              onChange={(e) => setPhilosopher(e.target.value)}
              disabled={loading}
            >
              {philosophers.map((phil) => (
                <MenuItem key={phil} value={phil}>
                  {phil}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2, borderTop: '1px solid rgba(139, 69, 19, 0.1)' }}>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !isAuthenticated}
          sx={{
            bgcolor: '#1a3a2a',
            '&:hover': {
              bgcolor: '#2e4a3d',
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit Video'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export { extractYouTubeId };
