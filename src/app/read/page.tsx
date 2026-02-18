'use client';

import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';
import { bookContent, bookMeta } from '@/lib/book-content';
import { getBookImage } from '@/lib/book-images';
import { useThemeMode } from '@/theme/ThemeRegistry';
import { useI18n } from '@/i18n';

export default function BookOverviewPage() {
  const { t } = useI18n();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const colors = {
    bg: isDark ? '#121212' : '#faf9f6',
    text: isDark ? '#f5f5f5' : '#2c2c2c',
    textSecondary: isDark ? '#b0b0b0' : '#666666',
    primary: '#8b4513',
    secondary: '#c9a962',
  };

  const parts = [
    { id: 'part1', title: 'Part I', subtitle: 'The Dawn of Wisdom', range: '1-4' },
    { id: 'part2', title: 'Part II', subtitle: 'Revelation and Reason', range: '5-7' },
    { id: 'part3', title: 'Part III', subtitle: 'Illumination and Ecstasy', range: '8-10' },
    { id: 'part4', title: 'Part IV', subtitle: 'The Great Synthesis', range: '11-12' },
    { id: 'part5', title: 'Part V', subtitle: 'Poetry and Ethics', range: '13-15' },
    { id: 'part6', title: 'Part VI', subtitle: 'Modern Voices', range: '16-19' },
  ];

  const sectionGroups = bookContent.reduce((acc, section) => {
    const partMatch = section.id.match(/^part(\d+)/);
    if (partMatch) {
      const partNum = partMatch[1];
      if (!acc[partNum]) acc[partNum] = [];
      acc[partNum].push(section);
    } else if (section.id.startsWith('part1-')) {
      if (!acc['1']) acc['1'] = [];
      acc['1'].push(section);
    } else if (section.id === 'epilogue') {
      if (!acc['epilogue']) acc['epilogue'] = [];
      acc['epilogue'].push(section);
    } else if (section.id === 'closing') {
      if (!acc['closing']) acc['closing'] = [];
      acc['closing'].push(section);
    }
    return acc;
  }, {} as Record<string, typeof bookContent>);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.bg, display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: 150, md: 200 },
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1a3a2a 0%, #2e4a3d 50%, #3d6b52 100%)',
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
          }}
        >
          <Image
            src="/images/explore-hero.png"
            alt="Persian wisdom"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: { xs: 3, md: 4 } }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left: Title and description */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="overline"
                sx={{ color: colors.secondary, letterSpacing: 4, mb: 1, display: 'block' }}
              >
                {t.work.title}
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  color: 'white',
                  fontWeight: 300,
                  mb: 1,
                }}
              >
                {t.work.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: 'rgba(255,255,255,0.85)', fontWeight: 300, mb: 2, lineHeight: 1.6 }}
              >
                {t.work.subtitle}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.7)', maxWidth: 450 }}
              >
                {bookMeta.description}
              </Typography>
            </Grid>

            {/* Right: Buttons stacked */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  href="/read/part1"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    bgcolor: 'rgba(201, 169, 98, 0.9)',
                    color: '#1a3a2a',
                    px: 4,
                    py: 1.5,
                    minWidth: 200,
                    '&:hover': { bgcolor: 'rgba(201, 169, 98, 1)' },
                  }}
                >
                  Start Reading
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  href="/api/book/pdf"
                  target="_blank"
                  startIcon={<PictureAsPdfIcon />}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    minWidth: 200,
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                  }}
                >
                  Download PDF
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Table of Contents */}
      <Box sx={{ bgcolor: colors.bg, py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 600, color: colors.text }}>
            Table of Contents
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: colors.textSecondary }}>
            {bookContent.length} sections • A journey through 2,500 years of wisdom
          </Typography>

          <Grid container spacing={3}>
            {parts.map((part, index) => {
            const sectionKey = part.id.replace('part', '');
            const sections = bookContent.filter(s => 
              s.id.startsWith(`part${sectionKey}`) || 
              s.id.startsWith(`part${sectionKey}-`)
            );
            const imageUrl = getBookImage(part.id);

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={part.id}>
                <Card
                  component={Link}
                  href={`/read/part${index + 1}`}
                  sx={{
                    height: '100%',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 40px rgba(139, 69, 19, 0.15)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={imageUrl}
                    alt={part.title}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Chip
                      label={part.title}
                      size="small"
                      sx={{
                        bgcolor: '#8b4513',
                        color: 'white',
                        mb: 1,
                      }}
                    />
                    <Typography variant="h6" gutterBottom sx={{ color: colors.text }}>
                      {part.subtitle}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                      {sections.length} sections
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}

          </Grid>

          {/* Epilogue and Closing - centered row */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 1 }}>
            <Box sx={{ width: { xs: '100%', sm: '48%', md: 'calc(33.333% - 16px)' } }}>
              <Card
                component={Link}
                href="/read/epilogue"
                sx={{
                  height: '100%',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(201, 169, 98, 0.3)',
                  },
                }}
              >
                <Box sx={{ position: 'relative', height: 140 }}>
                  <Image
                    src="/images/read-epilogue.png"
                    alt="Epilogue"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, rgba(201,169,98,0.4) 0%, rgba(201,169,98,0.8) 100%)',
                    }}
                  />
                </Box>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="h5" gutterBottom sx={{ color: colors.text }}>
                    Epilogue
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                    The Light That Endures
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ width: { xs: '100%', sm: '48%', md: 'calc(33.333% - 16px)' } }}>
              <Card
                component={Link}
                href="/read/closing"
                sx={{
                  height: '100%',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(46, 74, 61, 0.3)',
                  },
                }}
              >
                <Box sx={{ position: 'relative', height: 140 }}>
                  <Image
                    src="/images/read-closing.png"
                    alt="Closing"
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, rgba(46,74,61,0.4) 0%, rgba(46,74,61,0.8) 100%)',
                    }}
                  />
                </Box>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Typography variant="h5" gutterBottom sx={{ color: colors.text }}>
                    Closing
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.textSecondary }}>
                    The Garden
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Quote Preview */}
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box
          sx={{
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 3,
            border: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: '"Vazir", serif',
              fontSize: '1.8rem',
              color: colors.primary,
              mb: 2,
              direction: 'rtl',
            }}
          >
            بنی آدم اعضای یک پیکرند
          </Typography>
          <Typography variant="body1" sx={{ fontStyle: 'italic', color: colors.textSecondary }}>
            "Human beings are members of a whole, in creation of one essence and soul."
          </Typography>
          <Typography variant="caption" sx={{ color: colors.textSecondary, mt: 1, display: 'block' }}>
            — Saadi, Gulistan
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
