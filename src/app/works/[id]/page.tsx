'use client';
import { use } from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  CircularProgress,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HistoryIcon from '@mui/icons-material/History';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { philosophers } from '@/lib/philosophers';
import type { Work, Chapter } from '@/lib/models/work';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const [work, setWork] = useState<Work | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await fetch(`/api/works/${id}`);
        if (response.ok) {
          const data = await response.json();
          setWork(data);
        }
      } catch (error) {
        console.error('Error fetching work:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWork();
    }
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!work) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button component={Link} href="/philosophers" startIcon={<ArrowBackIcon />} sx={{ mb: 3 }}>
          Back to Philosophers
        </Button>
        <Typography variant="h4">Work not found</Typography>
      </Container>
    );
  }

  const philosopher = philosophers.find(p => p.id === work.philosopherId);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(46, 74, 61, 0.1) 100%)',
          py: 6,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Button
            component={Link}
            href="/philosophers"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 3 }}
          >
            Back to Philosophers
          </Button>

          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                <Chip label={work.type} color="primary" />
                {work.year && <Chip label={work.year} variant="outlined" />}
              </Stack>

              <Typography variant="h2" sx={{ mb: 1 }}>
                {work.title}
              </Typography>
              {work.titlePersian && (
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Vazir", serif',
                    direction: 'rtl',
                    color: 'text.secondary',
                    mb: 2,
                  }}
                >
                  {work.titlePersian}
                </Typography>
              )}

              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                by <Link href={`/philosophers/${philosopher?.id || work.philosopherId}`} style={{ color: 'inherit' }}>{philosopher?.name.english || work.philosopherId}</Link>
              </Typography>

              <Typography variant="body1" sx={{ mb: 3, maxWidth: 600 }}>
                {work.description}
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<AutoStoriesIcon />}
                  component={Link}
                  href={`/explore?philosopher=${work.philosopherId}`}
                >
                  Read Quotes
                </Button>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    <HistoryIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Tags
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {work.tags?.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Chapters Section */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Chapters</Typography>
        
        {work.chapters && work.chapters.length > 0 ? (
          <Stack spacing={2}>
            {work.chapters.map((chapter, index) => (
              <Accordion key={index} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                    <Chip label={chapter.order} size="small" color="primary" />
                    <Typography variant="h6">
                      {chapter.title}
                    </Typography>
                    {chapter.titlePersian && (
                      <Typography variant="body2" sx={{ fontFamily: '"Vazir", serif', color: 'text.secondary' }}>
                        {chapter.titlePersian}
                      </Typography>
                    )}
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {chapter.summary && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontStyle: 'italic' }}>
                      {chapter.summary}
                    </Typography>
                  )}
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1" sx={{ lineHeight: 2, whiteSpace: 'pre-wrap' }}>
                    {chapter.content}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No chapters available yet.
          </Typography>
        )}
      </Container>
    </Box>
  );
}
