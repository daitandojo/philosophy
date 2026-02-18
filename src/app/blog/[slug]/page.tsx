import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container, Typography, Box, Chip, Stack, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ShareIcon from '@mui/icons-material/Share';
import { HeroPattern, FloatingMotif, SectionDivider, CornerDecoration } from '@/components/SVGDecorations';
import RichTextRenderer from '@/components/RichTextRenderer';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author?: string;
  category?: string;
  tags?: string[];
  readingTime?: number;
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/blogs?slug=${slug}`, {
      cache: 'no-store',
    });
    const posts = await res.json();
    return posts.length > 0 ? posts[0] : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  
  if (!post) {
    return { title: 'Blog Post Not Found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.author || 'The Sages of Persia'],
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const categoryColors: Record<string, string> = {
    politics: '#8b4513',
    technology: '#2e4a3d',
    spirituality: '#722F37',
    society: '#3d6b52',
    philosophy: '#1a3a2a',
    ethics: '#c9a962',
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section with Cover Image */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '50vh', md: '60vh' },
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* Cover Image */}
        {post.coverImage && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 0,
            }}
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(26,58,42,0.3) 0%, rgba(26,58,42,0.7) 60%, rgba(26,58,42,0.95) 100%)',
              }}
            />
          </Box>
        )}

        {/* Background Decorations */}
        {!post.coverImage && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #1a3a2a 0%, #2e4a3d 50%, #3d6b52 100%)',
              zIndex: 0,
            }}
          />
        )}
        
        <HeroPattern color="#c9a962" opacity={0.1} />
        <CornerDecoration position="top-left" color="#c9a962" size={100} />

        <Container 
          maxWidth="md" 
          sx={{ 
            position: 'relative', 
            zIndex: 1, 
            pb: { xs: 6, md: 8 },
            pt: { xs: 16, md: 20 },
          }}
        >
          <Button
            component={Link}
            href="/blog"
            startIcon={<ArrowBackIcon />}
            sx={{ 
              color: 'rgba(255,255,255,0.8)', 
              mb: 3,
              '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            Back to Reflections
          </Button>

          <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
            {post.category && (
              <Chip 
                label={post.category}
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}
              />
            )}
            {post.readingTime && (
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: 'rgba(255,255,255,0.8)' }}>
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                <Typography variant="body2">
                  {post.readingTime} min read
                </Typography>
              </Stack>
            )}
          </Stack>

          <Typography 
            variant="h2" 
            sx={{ 
              color: 'white', 
              fontWeight: 700, 
              mb: 3,
              fontSize: { xs: '2rem', md: '3rem' },
              lineHeight: 1.2,
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            {post.title}
          </Typography>

          <Typography 
            variant="h6" 
            sx={{ 
              color: 'rgba(255,255,255,0.9)', 
              fontWeight: 300,
              maxWidth: 600,
              lineHeight: 1.6,
            }}
          >
            {post.excerpt}
          </Typography>
        </Container>
      </Box>

      <SectionDivider color="#c9a962" height={50} />

      {/* Content */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        {/* Author & Date */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 6,
            pb: 4,
            borderBottom: '1px solid rgba(139, 69, 19, 0.15)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: '#1a3a2a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c9a962',
                fontWeight: 700,
                fontSize: '1.25rem',
              }}
            >
              {post.author?.charAt(0) || 'S'}
            </Box>
            <Box>
              <Typography variant="subtitle1" fontWeight={600} color="#1a3a2a">
                {post.author || 'The Sages of Persia'}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {post.publishedAt 
                  ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                }
              </Typography>
            </Box>
          </Box>

          <Button 
            startIcon={<ShareIcon />}
            sx={{ color: '#8b4513' }}
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: post.title,
                  text: post.excerpt,
                  url: window.location.href,
                });
              }
            }}
          >
            Share
          </Button>
        </Box>

        {/* Rich Content */}
        <Box sx={{ 
          '& blockquote': {
            borderLeft: '4px solid #c9a962',
            paddingLeft: '1.5rem',
            margin: '2rem 0',
            fontStyle: 'italic',
            color: '#5a4a3a',
            background: 'rgba(201, 169, 98, 0.05)',
            padding: '1.5rem',
            borderRadius: '0 8px 8px 0',
          },
        }}>
          <RichTextRenderer content={post.content} />
        </Box>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(139, 69, 19, 0.15)' }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Related Topics
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {post.tags.map((tag, i) => (
                <Chip 
                  key={i} 
                  label={tag} 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(26, 58, 42, 0.08)',
                    color: '#1a3a2a',
                    '&:hover': { bgcolor: 'rgba(26, 58, 42, 0.15)' }
                  }}
                />
              ))}
            </Stack>
          </Box>
        )}

        {/* Footer Navigation */}
        <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid rgba(139, 69, 19, 0.15)', textAlign: 'center' }}>
          <Button 
            component={Link}
            href="/blog"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{ 
              borderColor: '#8b4513',
              color: '#8b4513',
              px: 4,
              '&:hover': {
                borderColor: '#1a3a2a',
                bgcolor: 'rgba(26, 58, 42, 0.05)',
              }
            }}
          >
            More Reflections
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
