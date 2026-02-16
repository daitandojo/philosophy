'use client';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  CircularProgress,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';

interface ResearchResult {
  type: 'verse' | 'work' | 'philosopher' | 'concept';
  title: string;
  content: string;
  philosopher?: string;
  relevance: number;
}

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ResearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleResearch = async () => {
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setResults(data.results || []);
      } else {
        setResults([
          {
            type: 'concept',
            title: 'Search Results',
            content: 'Research functionality is being initialized. Please try again in a moment.',
            relevance: 100,
          },
        ]);
      }
    } catch (error) {
      console.error('Research error:', error);
      setResults([
        {
          type: 'concept',
          title: 'Research Results',
          content: 'An error occurred during research. Please try again.',
          relevance: 100,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const researchTopics = [
    { title: 'Sufi Mysticism', description: 'Explore the mystical tradition of Islamic spirituality' },
    { title: 'Divine Love', description: 'Understanding love as the fundamental force in Sufi philosophy' },
    { title: 'Fana and Baqa', description: 'Annihilation in God and subsistence through God' },
    { title: 'Unity of Being', description: 'The concept of Wahdat al-Wujud in Islamic philosophy' },
    { title: 'The Masnavi', description: 'Rumi\'s masterwork of spiritual poetry' },
    { title: 'Persian Ghazal', description: 'The poetic form used by Hafez and other Persian poets' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
          Research Assistant
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Premium Feature: Deep research into Persian philosophy
        </Typography>
        
        <Paper
          elevation={0}
          sx={{ 
            p: 2, 
            display: 'flex', 
            gap: 2, 
            maxWidth: 700, 
            mx: 'auto',
            bgcolor: 'rgba(46, 74, 61, 0.05)',
            borderRadius: 3,
          }}
        >
          <TextField
            fullWidth
            placeholder="Enter your research question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleResearch()}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper',
                borderRadius: 2,
              },
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleResearch}
            disabled={loading || !query.trim()}
            sx={{ px: 4, borderRadius: 2 }}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
          >
            Research
          </Button>
        </Paper>
      </Box>

      {hasSearched && results.length > 0 ? (
        <Box>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Research Results
          </Typography>
          <Stack spacing={3}>
            {results.map((result, index) => (
              <Card key={index} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Chip 
                      size="small" 
                      icon={
                        result.type === 'verse' ? <AutoStoriesIcon /> : 
                        result.type === 'work' ? <MenuBookIcon /> :
                        result.type === 'philosopher' ? <HistoryEduIcon /> : <SearchIcon />
                      }
                      label={result.type} 
                      color={
                        result.type === 'verse' ? 'primary' :
                        result.type === 'work' ? 'secondary' :
                        result.type === 'philosopher' ? 'success' : 'default'
                      }
                    />
                    <Typography variant="h6">
                      {result.title}
                    </Typography>
                    {result.philosopher && (
                      <Chip size="small" label={result.philosopher} variant="outlined" />
                    )}
                  </Box>
                  <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                    {result.content}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="caption" color="text.secondary">
                    Relevance: {result.relevance}% • Premium Research Result
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Box>
      ) : hasSearched ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No results found. Try a different query.
          </Typography>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Suggested Research Topics
          </Typography>
          <Grid container spacing={3}>
            {researchTopics.map((topic, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
                  }}
                  onClick={() => {
                    setQuery(topic.title);
                    handleResearch();
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {topic.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {topic.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ mt: 6, p: 4, bgcolor: 'rgba(46, 74, 61, 0.08)', borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Premium Research Features
            </Typography>
            <Grid container spacing={2}>
              {[
                'Cross-philosopher analysis',
                'Academic citations',
                'Comparison tools',
                'Deep dive essays',
                'Historical context',
                'Philosophical frameworks',
              ].map((feature, i) => (
                <Grid size={{ xs: 12, sm: 6 }} key={i}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip size="small" label="Premium" color="warning" />
                    <Typography variant="body2">{feature}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Container>
  );
}
