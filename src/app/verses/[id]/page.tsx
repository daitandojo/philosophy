'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
  CircularProgress,
  Grid,
  Button,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CommentIcon from '@mui/icons-material/Comment';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import SendIcon from '@mui/icons-material/Send';
import Link from 'next/link';
import type { Verse } from '@/types';

export default function VersePage() {
  const params = useParams();
  const [verse, setVerse] = useState<Verse | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [audioLanguage, setAudioLanguage] = useState<'english' | 'persian'>('english');
  const [audioError, setAudioError] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [newAnnotation, setNewAnnotation] = useState('');
  const [annotationVisibility, setAnnotationVisibility] = useState<'private' | 'public'>('private');

  useEffect(() => {
    const fetchVerse = async () => {
      try {
        const response = await fetch(`/api/verses/${params.id}`);
        const data = await response.json();
        setVerse(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?verseId=${params.id}`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchAnnotations = async () => {
      try {
        const response = await fetch(`/api/annotations?verseId=${params.id}&visibility=public`);
        const data = await response.json();
        setAnnotations(data);
      } catch (error) {
        console.error('Error fetching annotations:', error);
      }
    };

    if (params.id) {
      fetchVerse();
      fetchComments();
      fetchAnnotations();
    }
  }, [params.id]);

  const handlePlayAudio = async () => {
    if (!verse) return;
    
    setPlaying(true);
    setAudioError(null);
    try {
      const textToSpeak = audioLanguage === 'persian' ? verse.persianText : verse.englishTranslation;
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, voiceType: audioLanguage }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
        audio.onended = () => setPlaying(false);
        audio.onerror = () => {
          setAudioError('Failed to play audio');
          setPlaying(false);
        };
      } else {
        const errorData = await response.json();
        setAudioError(errorData.error || 'Failed to generate speech');
        setPlaying(false);
      }
    } catch (error) {
      console.error('Audio error:', error);
      setAudioError('Network error - check console');
      setPlaying(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !verse) return;
    
    setCommentsLoading(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          verseId: verse._id, 
          content: newComment 
        }),
      });
      
      if (response.ok) {
        const comment = await response.json();
        setComments([comment, ...comments]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleSubmitAnnotation = async () => {
    if (!newAnnotation.trim() || !verse) return;
    
    setCommentsLoading(true);
    try {
      const response = await fetch('/api/annotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          verseId: verse._id, 
          content: newAnnotation,
          visibility: annotationVisibility,
        }),
      });
      
      if (response.ok) {
        const annotation = await response.json();
        setAnnotations([annotation, ...annotations]);
        setNewAnnotation('');
      }
    } catch (error) {
      console.error('Error posting annotation:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!verse) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="h5">Verse not found</Typography>
        <Button component={Link} href="/explore" sx={{ mt: 2 }}>
          Back to Explore
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        component={Link}
        href="/explore"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Explore
      </Button>

      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Persian Text */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Vazir", serif',
                direction: 'rtl',
                textAlign: 'right',
                mb: 2,
                lineHeight: 2,
              }}
            >
              {verse.persianText}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontStyle: 'italic',
                color: 'text.secondary',
                textAlign: 'right',
              }}
            >
              {verse.transliteration}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Translation & Actions */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" gutterBottom color="primary">
                English Translation
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                {verse.englishTranslation}
              </Typography>

              <Typography variant="h6" gutterBottom color="secondary">
                Summary
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {verse.summary}
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                {/* Language Toggle */}
                <ToggleButtonGroup
                  value={audioLanguage}
                  exclusive
                  onChange={(_, value) => value && setAudioLanguage(value)}
                  size="small"
                  aria-label="audio language"
                >
                  <ToggleButton value="english" aria-label="English">
                    English
                  </ToggleButton>
                  <ToggleButton value="persian" aria-label="Persian">
                    فارسی
                  </ToggleButton>
                </ToggleButtonGroup>

                {/* Play Button */}
                <IconButton
                  onClick={handlePlayAudio}
                  disabled={playing}
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'primary.dark' },
                    width: 56,
                    height: 56,
                  }}
                >
                  {playing ? <CircularProgress size={24} color="inherit" /> : <PlayArrowIcon />}
                </IconButton>

                {/* Error Display */}
                {audioError && (
                  <Typography variant="caption" color="error" sx={{ textAlign: 'center' }}>
                    {audioError}
                  </Typography>
                )}

                <IconButton onClick={() => setLiked(!liked)}>
                  {liked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                </IconButton>

                <IconButton>
                  <ShareIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Source</Typography>
              <Typography variant="h6">{verse.sourceWork}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Wisdom Score</Typography>
              <Typography variant="h6" color="warning.main">{verse.wisdomScore}/10</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Complexity</Typography>
              <Typography variant="h6">{verse.complexity}/10</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">Emotional Tone</Typography>
              <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>{verse.emotionalTone}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Themes */}
      <Typography variant="h6" gutterBottom>Themes</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
        {verse.themes.map((theme) => (
          <Chip
            key={theme}
            label={theme}
            component={Link}
            href={`/explore?theme=${theme}`}
            clickable
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>

      {/* Annotations Section */}
      {annotations.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <NoteAltIcon color="secondary" />
            <Typography variant="h6">
              Community Notes ({annotations.length})
            </Typography>
          </Box>
          <Stack spacing={2}>
            {annotations.map((annotation: any) => (
              <Card key={annotation._id} variant="outlined">
                <CardContent>
                  {annotation.highlightedText && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontStyle: 'italic',
                        borderLeft: '3px solid',
                        borderColor: 'secondary.main',
                        pl: 2,
                        mb: 1,
                        color: 'text.secondary',
                      }}
                    >
                      "{annotation.highlightedText}"
                    </Typography>
                  )}
                  <Typography variant="body1">{annotation.content}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    — {annotation.userId?.name || 'Anonymous'}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      )}

      {/* Add Annotation */}
      <Card sx={{ mb: 4, bgcolor: 'grey.50' }}>
        <CardContent>
          <Typography variant="subtitle2" gutterBottom>
            Add a Note
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={2}
            placeholder="Add your insight or note about this verse..."
            value={newAnnotation}
            onChange={(e) => setNewAnnotation(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="caption" color="text.secondary">
              Visibility: 
            </Typography>
            <ToggleButtonGroup
              value={annotationVisibility}
              exclusive
              onChange={(_, value) => value && setAnnotationVisibility(value)}
              size="small"
            >
              <ToggleButton value="private">Private</ToggleButton>
              <ToggleButton value="public">Public</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleSubmitAnnotation}
              disabled={!newAnnotation.trim() || commentsLoading}
            >
              Save Note
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Tags */}
      <Typography variant="h6" gutterBottom>Tags</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 4 }}>
        {verse.tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            variant="outlined"
          />
        ))}
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Comments Section */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <CommentIcon color="primary" />
          <Typography variant="h5">
            Discussion ({comments.length})
          </Typography>
        </Box>

        {/* Comment Input */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Share your thoughts on this verse..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || commentsLoading}
              >
                {commentsLoading ? 'Posting...' : 'Post Comment'}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Comments List */}
        {comments.length === 0 ? (
          <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
            No comments yet. Be the first to share your thoughts!
          </Typography>
        ) : (
          <List>
            {comments.map((comment: any) => (
              <ListItem
                key={comment._id}
                alignItems="flex-start"
                sx={{ px: 0 }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {comment.userId?.name?.charAt(0) || '?'}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {comment.userId?.name || 'Anonymous'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  }
                  secondary={comment.content}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}
