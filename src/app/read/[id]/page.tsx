'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Button,
  Drawer,
  IconButton,
  useTheme as useMuiTheme,
  useMediaQuery,
  Chip,
  Divider,
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';
import { bookContent } from '@/lib/book-content';
import { getBookImage } from '@/lib/book-images';
import { useThemeMode } from '@/theme/ThemeRegistry';

export default function ReadingPage() {
  const params = useParams();
  const router = useRouter();
  const sectionId = params.id as string;
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const colors = {
    bg: isDark ? '#121212' : '#f5f5f0',
    bgPaper: isDark ? '#1e1e1e' : '#ffffff',
    text: isDark ? '#f0f0f0' : '#1a1a1a',
    textSecondary: isDark ? '#a0a0a0' : '#555555',
    primary: '#8b4513',
    primaryDark: '#5c2d0b',
    secondary: '#c9a962',
    border: isDark ? '#404040' : '#d0d0d0',
    activeBg: '#8b4513',
    activeText: '#ffffff',
    hoverBg: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(139, 69, 19, 0.1)',
  };

  useEffect(() => {
    const idx = bookContent.findIndex((s) => s.id === sectionId);
    if (idx >= 0) {
      setCurrentSectionIndex(idx);
    } else {
      router.push('/read/part1');
    }
  }, [sectionId, router]);

  const currentSection = bookContent[currentSectionIndex];
  const imageUrl = currentSection ? getBookImage(currentSection.id) : getBookImage('part1');

  const goToSection = (index: number) => {
    if (index >= 0 && index < bookContent.length) {
      setCurrentSectionIndex(index);
      setDrawerOpen(false);
    }
  };

  const nextSection = () => goToSection(currentSectionIndex + 1);
  const prevSection = () => goToSection(currentSectionIndex - 1);

  const tableOfContents = (
    <Box sx={{ p: 2, width: 300, bgcolor: colors.bg, minHeight: '100vh' }}>
      <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Vazir", serif', color: colors.text }}>
        فهرست مطالب
      </Typography>
      <Divider sx={{ mb: 2, borderColor: colors.border }} />
      {bookContent.map((section, index) => (
        <Box
          key={section.id}
          onClick={() => goToSection(index)}
          sx={{
            py: 1,
            px: 1.5,
            cursor: 'pointer',
            borderRadius: 1,
            mb: 0.5,
            bgcolor: index === currentSectionIndex ? colors.activeBg : 'transparent',
            color: index === currentSectionIndex ? colors.activeText : colors.text,
            fontWeight: index === currentSectionIndex ? 600 : 400,
            '&:hover': {
              bgcolor: index === currentSectionIndex ? colors.primaryDark : colors.hoverBg,
            },
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'inherit', color: 'inherit' }}>
            {section.title}
            {section.title}
          </Typography>
          {section.subtitle && (
            <Typography variant="caption" sx={{ opacity: 0.8, color: 'inherit' }}>
              {section.subtitle}
            </Typography>
          )}
        </Box>
      ))}
    </Box>
  );

  if (!currentSection) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: colors.bg,
        backgroundImage: isDark ? 'none' : `
          radial-gradient(ellipse at top left, rgba(139, 69, 19, 0.03) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(201, 169, 98, 0.05) 0%, transparent 50%)
        `,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          bgcolor: isDark ? 'rgba(30, 30, 30, 0.95)' : 'rgba(250, 249, 247, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${colors.border}`,
          py: 1,
          px: 2,
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: colors.text }}>
                <MenuIcon />
              </IconButton>
            )}
            <MenuBookIcon sx={{ color: colors.primary }} />
            <Typography variant="h6" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' }, color: colors.text }}>
              {currentSection.title}
            </Typography>
            {currentSection.subtitle && (
              <Chip
                label={currentSection.subtitle}
                size="small"
                sx={{
                  bgcolor: colors.secondary,
                  color: isDark ? '#1a1a1a' : '#2c2c2c',
                  display: { xs: 'none', md: 'inline-flex' },
                }}
              />
            )}
          </Box>
          <Button
            variant="outlined"
            size="small"
            startIcon={<PictureAsPdfIcon />}
            href="/api/book/pdf"
            target="_blank"
            sx={{ borderRadius: 3, borderColor: colors.primary, color: colors.primary }}
          >
            Download PDF
          </Button>
        </Container>
      </Box>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Drawer
          variant="permanent"
          sx={{
            width: 280,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 280,
              boxSizing: 'border-box',
              borderRight: `1px solid ${colors.border}`,
              bgcolor: 'transparent',
            },
          }}
        >
          <Box sx={{ p: 2, mt: 8 }}>
            <Typography variant="overline" sx={{ color: colors.textSecondary, letterSpacing: 2 }}>
              Table of Contents
            </Typography>
            <Divider sx={{ my: 1, mb: 3, borderColor: colors.border }} />
            {bookContent.map((section, index) => (
              <Box
                key={section.id}
                onClick={() => goToSection(index)}
                sx={{
                  py: 1,
                  px: 1.5,
                  cursor: 'pointer',
                  borderRadius: 1,
                  mb: 0.5,
                  bgcolor: index === currentSectionIndex ? colors.activeBg : 'transparent',
                  color: index === currentSectionIndex ? colors.activeText : colors.text,
                  fontWeight: index === currentSectionIndex ? 600 : 400,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: index === currentSectionIndex ? colors.primaryDark : colors.hoverBg,
                  },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'inherit', fontSize: '0.85rem', color: 'inherit' }}>
                  {section.title}
                </Typography>
              </Box>
            ))}
          </Box>
        </Drawer>
      )}

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': { width: 280, bgcolor: colors.bg },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: colors.text }}>Contents</Typography>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: colors.text }}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ borderColor: colors.border }} />
        {tableOfContents}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ ml: { xs: 0, md: '280px' }, transition: 'margin 0.3s ease' }}>
        {/* Hero Image */}
        <Box
          sx={{
            position: 'relative',
            height: { xs: 250, md: 400 },
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 150,
              background: `linear-gradient(to top, ${colors.bg}, transparent)`,
            },
          }}
        >
          <Box component="img" src={imageUrl} alt={currentSection.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>

        {/* Content */}
        <Container maxWidth="md" sx={{ py: 4, pb: 10 }}>
          <Typography variant="overline" sx={{ color: colors.primary, letterSpacing: 3, fontWeight: 600 }}>
            {currentSection.title}
          </Typography>

          {currentSection.subtitle && (
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 4,
                background: isDark ? 'linear-gradient(135deg, #c9a962 0%, #8b4513 100%)' : 'linear-gradient(135deg, #2e4a3d 0%, #8b4513 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              {currentSection.subtitle}
            </Typography>
          )}

          {/* Main Content */}
          <Box
            sx={{
              '& p': { fontSize: '1.15rem', lineHeight: 1.9, color: colors.text, mb: 3, fontFamily: '"Georgia", serif' },
              '& h2, & h3': { color: colors.primary, fontWeight: 600, mt: 4, mb: 2 },
              '& strong': { color: colors.secondary },
            }}
          >
            {currentSection.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('### ')) {
                return <h3 key={i} style={{ fontSize: '1.3rem', marginTop: '1.5rem' }}>{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <h2 key={i} style={{ fontSize: '1.4rem', marginTop: '1.5rem' }}>{paragraph.replace(/\*\*/g, '')}</h2>;
              }
              if (paragraph.includes('*') && !paragraph.startsWith('*')) {
                const parts = paragraph.split(/(\*.*?\*)/);
                return (
                  <p key={i}>
                    {parts.map((part, j) => {
                      if (part.startsWith('*') && part.endsWith('*')) {
                        return <strong key={j}>{part.replace(/\*/g, '')}</strong>;
                      }
                      return part;
                    })}
                  </p>
                );
              }
              if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
                const items = paragraph.split('\n').filter(Boolean);
                return (
                  <ul key={i} style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                    {items.map((item, k) => (
                      <li key={k} style={{ marginBottom: '0.5rem', lineHeight: 1.8 }}>{item.replace(/^-\s|\*\s/, '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={i}>{paragraph}</p>;
            })}
          </Box>

          {/* Persian Quotes */}
          {currentSection.quotes && currentSection.quotes.length > 0 && (
            <Box sx={{ mt: 6, p: 4, bgcolor: colors.bgPaper, borderRadius: 3, border: `1px solid ${colors.border}`, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <Typography variant="overline" sx={{ color: colors.secondary, letterSpacing: 2, fontWeight: 600, mb: 3, display: 'block' }}>
                Persian Terms & Quotations
              </Typography>
              {currentSection.quotes.map((quote, i) => (
                <Box key={i} sx={{ py: 2, borderBottom: i < currentSection.quotes.length - 1 ? `1px solid ${colors.border}` : 'none' }}>
                  <Typography sx={{ fontFamily: '"Vazir", "Tahoma", serif', fontSize: '1.5rem', color: colors.primary, mb: 1, textAlign: 'right', direction: 'rtl' }}>
                    {quote.text}
                  </Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: colors.textSecondary, mb: 0.5 }}>
                    {quote.transliteration}
                  </Typography>
                  <Typography variant="caption" sx={{ color: colors.textSecondary }}>
                    {quote.translation}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6, pt: 4, borderTop: `1px solid ${colors.border}` }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={prevSection}
              disabled={currentSectionIndex === 0}
              sx={{ borderRadius: 3, borderColor: colors.primary, color: colors.primary }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={nextSection}
              disabled={currentSectionIndex === bookContent.length - 1}
              sx={{ borderRadius: 3, bgcolor: colors.primary, '&:hover': { bgcolor: colors.primaryDark } }}
            >
              Next Section
            </Button>
          </Box>

          <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2, color: colors.textSecondary }}>
            Section {currentSectionIndex + 1} of {bookContent.length}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}
