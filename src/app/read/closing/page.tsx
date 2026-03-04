'use client';

import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Image from 'next/image';
import { bookContent } from '@/lib/book-content';
import { useThemeMode } from '@/theme/ThemeRegistry';

export default function ClosingPage() {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

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
  };

  const closingSections = bookContent.filter(s => s.id === 'closing');
  
  const allParts = [
    { id: 'part1', title: 'Part I', subtitle: 'The Dawn of Wisdom' },
    { id: 'part2', title: 'Part II', subtitle: 'Revelation and Reason' },
    { id: 'part3', title: 'Part III', subtitle: 'Illumination and Ecstasy' },
    { id: 'part4', title: 'Part IV', subtitle: 'The Great Synthesis' },
    { id: 'part5', title: 'Part V', subtitle: 'Poetry and Ethics' },
    { id: 'part6', title: 'Part VI', subtitle: 'Modern Voices' },
  ];

  if (!closingSections.length) return null;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.bg }}>
      <Box sx={{ background: 'linear-gradient(135deg, #1a3a2a 0%, #2e4a3d 50%, #3d6b52 100%)', position: 'relative', overflow: 'hidden', py: 2 }}>
        <Box sx={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
          <Image src="/images/explore-hero.png" alt="Persian wisdom" fill style={{ objectFit: 'cover' }} />
        </Box>
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Button component={Link} href="/read" startIcon={<ArrowBackIcon />} sx={{ color: 'rgba(255,255,255,0.7)', '&:hover': { color: 'white' } }}>Back to Contents</Button>
        </Container>
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button variant="contained" href="/api/book/pdf" target="_blank" startIcon={<PictureAsPdfIcon />} sx={{ bgcolor: 'rgba(201, 169, 98, 0.9)', color: '#1a3a2a', '&:hover': { bgcolor: 'rgba(201, 169, 98, 1)' } }}>Download PDF</Button>
        </Container>
      </Box>

      <Container maxWidth={false} sx={{ py: 6 }}>
        <Grid container spacing={0}>
          <Grid size={{ xs: 12, md: 2 }}>
            <Box sx={{ position: 'sticky', top: 80, pr: 3 }}>
              <Paper elevation={0} sx={{ p: 2, bgcolor: colors.bgPaper, border: `1px solid ${colors.border}`, borderRadius: 2 }}>
                <Typography variant="overline" sx={{ color: colors.primary, letterSpacing: 2, fontWeight: 600, display: 'block', mb: 2 }}>Chapters</Typography>
                <List dense disablePadding>
                  {allParts.map((part) => (
                    <ListItem key={part.id} disablePadding>
                      <ListItemButton component={Link} href={`/read/${part.id}`} sx={{ borderRadius: 1, mb: 0.5 }}>
                        <ListItemText primary={part.title} secondary={part.subtitle} primaryTypographyProps={{ fontWeight: 400, fontSize: '0.85rem' }} secondaryTypographyProps={{ fontSize: '0.7rem', color: colors.textSecondary }} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <ListItem disablePadding>
                    <ListItemButton component={Link} href="/read/epilogue" sx={{ borderRadius: 1, mb: 0.5 }}>
                      <ListItemText primary="Epilogue" secondary="The Light That Endures" primaryTypographyProps={{ fontWeight: 400, fontSize: '0.85rem' }} secondaryTypographyProps={{ fontSize: '0.7rem', color: colors.textSecondary }} />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component={Link} href="/read/closing" selected sx={{ borderRadius: 1, mb: 0.5, '&.Mui-selected': { bgcolor: colors.activeBg, color: colors.activeText } }}>
                      <ListItemText primary="Closing" secondary="The Garden" primaryTypographyProps={{ fontWeight: 600, fontSize: '0.85rem' }} secondaryTypographyProps={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)' }} />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Paper>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 10 }}>
            <Grid container spacing={6}>
              <Grid size={{ xs: 12, md: 7 }}>
                <Typography variant="overline" sx={{ color: colors.primary, letterSpacing: 3, fontWeight: 600, display: 'block', mb: 1 }}>Closing Reflection</Typography>
                <Typography variant="h2" sx={{ fontWeight: 700, mb: 1, color: colors.text, fontSize: { xs: '2rem', md: '2.5rem' } }}>The Garden</Typography>
                <Typography variant="h5" sx={{ color: colors.primary, fontWeight: 400, mb: 4 }}>A meditation on wisdom</Typography>

                {closingSections.map((section) => (
                  <Paper key={section.id} id={section.id} elevation={0} sx={{ mb: 4, p: 4, bgcolor: colors.bgPaper, border: `1px solid ${colors.border}`, borderRadius: 2 }}>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: colors.text }}>{section.title}</Typography>
                    {section.subtitle && <Typography variant="h6" sx={{ fontWeight: 400, mb: 2, color: colors.primary }}>{section.subtitle}</Typography>}
                    <Divider sx={{ my: 2, borderColor: colors.border }} />
                    <Box sx={{ '& p': { fontSize: '1.05rem', lineHeight: 1.8, color: colors.text, mb: 2, fontFamily: '"Georgia", serif' } }}>
                      {section.content.split('\n\n').map((paragraph, i) => {
                        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                          return <Typography key={i} variant="h6" sx={{ color: colors.primary, fontWeight: 600, mt: 3, mb: 2 }}>{paragraph.replace(/\*\*/g, '')}</Typography>;
                        }
                        return <Typography key={i} variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>{paragraph}</Typography>;
                      })}
                    </Box>
                    {section.quotes && section.quotes.length > 0 && (
                      <Box sx={{ mt: 4, p: 3, bgcolor: isDark ? 'rgba(201, 169, 98, 0.1)' : 'rgba(201, 169, 98, 0.05)', borderRadius: 2, border: `1px solid ${colors.border}` }}>
                        <Typography variant="overline" sx={{ color: colors.secondary, letterSpacing: 2, fontWeight: 600, mb: 2, display: 'block' }}>Key Terms</Typography>
                        {section.quotes.map((quote, i) => (
                          <Box key={i} sx={{ mb: i < section.quotes.length - 1 ? 2 : 0 }}>
                            <Typography sx={{ fontFamily: '"Vazir", serif', fontSize: '1.3rem', color: colors.primary, textAlign: 'right', direction: 'rtl', mb: 0.5 }}>{quote.text}</Typography>
                            <Typography variant="body2" sx={{ fontStyle: 'italic', color: colors.textSecondary, mb: 0.5 }}>{quote.transliteration}</Typography>
                            <Typography variant="caption" sx={{ color: colors.textSecondary }}>{quote.translation}</Typography>
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Paper>
                ))}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6, pt: 4, borderTop: `1px solid ${colors.border}` }}>
                  <Button variant="outlined" startIcon={<ArrowBackIcon />} component={Link} href="/read/epilogue" sx={{ borderRadius: 3, borderColor: colors.primary, color: colors.primary }}>Epilogue</Button>
                  <Button variant="contained" startIcon={<HomeIcon />} component={Link} href="/read" sx={{ borderRadius: 3, bgcolor: colors.primary, '&:hover': { bgcolor: colors.primaryDark } }}>Back to Contents</Button>
                </Box>
              </Grid>

              <Grid size={{ xs: 12, md: 5 }}>
                <Box sx={{ position: 'sticky', top: 80 }}>
                  <Box sx={{ position: 'relative', width: '70%', aspectRatio: '4/7', borderRadius: 2, overflow: 'hidden', boxShadow: '0 12px 40px rgba(0,0,0,0.25)', border: '3px solid rgba(201, 169, 98, 0.4)' }}>
                    <Image src="/images/read/closing-garden.png" alt="The Garden" fill style={{ objectFit: 'cover' }} priority />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
