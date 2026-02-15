'use client';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  LinearProgress,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import TimerIcon from '@mui/icons-material/Timer';
import { LearningPath } from '@/types';

const learningPaths: LearningPath[] = [
  {
    _id: '1',
    title: 'Introduction to Rumi',
    description: 'Begin your journey into the mystical world of Rumi. Learn about his life, his poetry, and the spiritual traditions that shaped his work.',
    verses: [],
    lessons: [
      { _id: '1', title: 'Who Was Rumi?', content: '', verseIds: [] },
      { _id: '2', title: 'The Masnavi', content: '', verseIds: [] },
      { _id: '3', title: 'The Spiritual Path', content: '', verseIds: [] },
    ],
    difficulty: 'beginner',
    estimatedTime: 30,
  },
  {
    _id: '2',
    title: 'The Poetry of Divine Love',
    description: 'Explore Rumi\'s beautiful expressions of divine love and the longing of the soul for the Beloved.',
    verses: [],
    lessons: [
      { _id: '1', title: 'The Nature of Love', content: '', verseIds: [] },
      { _id: '2', title: 'Longing and Ecstasy', content: '', verseIds: [] },
      { _id: '3', title: 'The Beloved and the Lover', content: '', verseIds: [] },
    ],
    difficulty: 'intermediate',
    estimatedTime: 45,
  },
  {
    _id: '3',
    title: 'Wisdom for Daily Life',
    description: 'Apply Rumi\'s timeless wisdom to everyday challenges. Find guidance for relationships, work, and spiritual growth.',
    verses: [],
    lessons: [
      { _id: '1', title: 'Transforming Difficulty', content: '', verseIds: [] },
      { _id: '2', title: 'The Power of Gratitude', content: '', verseIds: [] },
      { _id: '3', title: 'Living with Purpose', content: '', verseIds: [] },
    ],
    difficulty: 'beginner',
    estimatedTime: 40,
  },
  {
    _id: '4',
    title: 'Advanced Studies in Sufism',
    description: 'Deep dive into the philosophical and mystical dimensions of Rumi\'s work for advanced students.',
    verses: [],
    lessons: [
      { _id: '1', title: 'The Concept of Wahdat al-Wujud', content: '', verseIds: [] },
      { _id: '2', title: 'The Spiritual States', content: '', verseIds: [] },
      { _id: '3', title: 'The Maqam of the Sufi', content: '', verseIds: [] },
    ],
    difficulty: 'advanced',
    estimatedTime: 60,
  },
];

const difficultyColors = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'error',
};

export default function LearnPage() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Guided Learning
      </Typography>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
        Structured paths to understand Rumi's wisdom
      </Typography>

      <Grid container spacing={4}>
        {learningPaths.map((path) => (
          <Grid size={{ xs: 12, md: 6 }} key={path._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Chip
                    icon={<SchoolIcon />}
                    label={path.difficulty}
                    color={difficultyColors[path.difficulty] as any}
                    size="small"
                  />
                  <Chip
                    icon={<TimerIcon />}
                    label={`${path.estimatedTime} min`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Typography variant="h5" gutterBottom>
                  {path.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {path.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {path.lessons.length} lessons
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={0}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button variant="contained" fullWidth>
                  Start Learning
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h4" sx={{ mt: 8, mb: 4 }}>
        Lesson Topics
      </Typography>

      <Stack spacing={2}>
        {learningPaths.map((path) => (
          <Accordion
            key={path._id}
            expanded={expanded === path._id}
            onChange={handleChange(path._id)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{path.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                {path.lessons.map((lesson, index) => (
                  <Box
                    key={lesson._id}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                      bgcolor: 'background.default',
                      borderRadius: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle1">
                        {index + 1}. {lesson.title}
                      </Typography>
                    </Box>
                    <Button size="small">Start</Button>
                  </Box>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Container>
  );
}
