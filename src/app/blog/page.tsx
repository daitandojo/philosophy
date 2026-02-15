'use client';
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
  CircularProgress,
  TextField,
} from '@mui/material';
import { BlogPost } from '@/types';

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

  const sampleBlogs: BlogPost[] = [
    {
      _id: '1',
      userId: '1',
      title: 'The Journey of the Sufi: Finding Love in the Heart of Being',
      content: 'Rumi teaches us that the path to divine love is not found in external pilgrimages, but in the journey within our own hearts...',
      linkedVerseIds: [],
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: '2',
      userId: '1',
      title: 'Understanding Rumi: A Guide for Beginners',
      content: 'For those new to Rumi\'s poetry, the depth and beauty can seem overwhelming. This guide will help you navigate his works...',
      linkedVerseIds: [],
      published: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3">
          Reflections & Blog
        </Typography>
        <Button variant="contained">
          Write a Post
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {(blogs.length > 0 ? blogs : sampleBlogs).map((blog) => (
            <Grid size={{ xs: 12, md: 6 }} key={blog._id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {blog.content}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip
                      label={new Date(blog.createdAt).toLocaleDateString()}
                      size="small"
                      variant="outlined"
                    />
                    <Button size="small">Read More</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
