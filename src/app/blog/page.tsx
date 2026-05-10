'use client';
import { useState, useEffect } from 'react';
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
  CircularProgress,
  Stack,
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { BlogPost } from '@/types';
import { HeroPattern, FloatingMotif, SectionDivider, CornerDecoration } from '@/components/SVGDecorations';
import Image from 'next/image';

const categoryColors: Record<string, string> = {
  politics: '#8b4513',
  technology: '#2e4a3d',
  spirituality: '#722F37',
  society: '#3d6b52',
  philosophy: '#1a3a2a',
  ethics: '#c9a962',
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs?published=true');
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a3a2a 0%, #2e4a3d 50%, #3d6b52 100%)',
          py: { xs: 8, md: 12 },
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
        <FloatingMotif variant="floral" color="#c9a962" size={60} top="20%" left="5%" opacity={0.1} />
        
        <Container maxWidth="md">
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
            Applied Wisdom for Today
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
            Reflections
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
            Ancient Persian wisdom meets modern challenges. Insights from 2,500 years of philosophy applied to today's pressing issues.
          </Typography>
        </Container>
      </Box>

      <SectionDivider color="#c9a962" height={60} />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={5}>
            {blogs.map((blog: BlogPost, index: number) => (
              <Grid size={{ xs: 12, md: index === 0 ? 12 : 6 }} key={blog._id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex',
                    flexDirection: index === 0 ? 'row' : 'column',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    background: index === 0 
                      ? 'linear-gradient(135deg, rgba(26,58,42,0.05) 0%, rgba(201,169,98,0.05) 100%)'
                      : 'background.paper',
                    border: '1px solid rgba(139, 69, 19, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-6px)',
                      boxShadow: '0 20px 50px rgba(26, 58, 42, 0.15)',
                      borderColor: 'rgba(139, 69, 19, 0.3)',
                    }
                  }}
                  component={Link}
                  href={`/blog/${blog.slug}`}
                >
                  {blog.coverImage && (
                    <CardMedia
                      sx={{
                        width: index === 0 ? 400 : '100%',
                        height: index === 0 ? '100%' : 220,
                        position: 'relative',
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={blog.coverImage}
                        alt={blog.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={index === 0}
                      />
                    </CardMedia>
                  )}
                  <CardContent sx={{ flex: 1, p: index === 0 ? 4 : 3, display: 'flex', flexDirection: 'column' }}>
                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                      <Chip 
                        label={blog.category} 
                        size="small"
                        sx={{ 
                          bgcolor: `${categoryColors[blog.category || 'philosophy']}15`,
                          color: categoryColors[blog.category || 'philosophy'],
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          fontSize: '0.7rem',
                        }}
                      />
                      {blog.readingTime && (
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {blog.readingTime} min read
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                    
                    <Typography 
                      variant="h5" 
                      gutterBottom 
                      sx={{ 
                        fontWeight: 700,
                        mb: 2,
                        fontSize: index === 0 ? '1.75rem' : '1.25rem',
                        color: 'text.primary',
                        lineHeight: 1.3,
                      }}
                    >
                      {blog.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 3,
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: index === 0 ? 4 : 3,
                        WebkitBoxOrient: 'vertical',
                        lineHeight: 1.7,
                      }}
                    >
                      {blog.excerpt}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </Typography>
                      <Button 
                        size="small"
                        sx={{ 
                          color: "primary.main",
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: 'rgba(139, 69, 19, 0.08)',
                          }
                        }}
                      >
                        Read Article →
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export const dynamic = "force-dynamic";
