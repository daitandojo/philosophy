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
  {
    _id: '5',
    title: '30 Days with Rumi',
    description: 'A daily journey through Rumi\'s wisdom. One quote, one reflection, one day at a time.',
    verses: [],
    lessons: Array.from({ length: 30 }, (_, i) => ({
      _id: String(i + 1),
      title: `Day ${i + 1}`,
      content: '',
      verseIds: [],
    })),
    difficulty: 'beginner',
    estimatedTime: 15,
  },
  {
    _id: '6',
    title: 'Sufism 101',
    description: 'Learn the fundamentals of Sufism - the mystical dimension of Islam that produced some of history\'s greatest philosophers.',
    verses: [],
    lessons: [
      { _id: '1', title: 'What is Sufism?', content: '', verseIds: [] },
      { _id: '2', title: 'The Sufi Path', content: '', verseIds: [] },
      { _id: '3', title: 'Fana and Baqa', content: '', verseIds: [] },
      { _id: '4', title: 'The Role of the Teacher', content: '', verseIds: [] },
      { _id: '5', title: 'Sufi Poetry and Music', content: '', verseIds: [] },
    ],
    difficulty: 'beginner',
    estimatedTime: 50,
  },
  {
    _id: '7',
    title: 'Persian Philosophy Through the Ages',
    description: 'Trace the development of Persian philosophical thought from ancient times to the modern era.',
    verses: [],
    lessons: [
      { _id: '1', title: 'Ancient Persian Wisdom', content: '', verseIds: [] },
      { _id: '2', title: 'The Islamic Golden Age', content: '', verseIds: [] },
      { _id: '3', title: 'The Sufi Masters', content: '', verseIds: [] },
      { _id: '4', title: 'Philosophy vs Mysticism', content: '', verseIds: [] },
      { _id: '5', title: 'Modern Persian Thought', content: '', verseIds: [] },
    ],
    difficulty: 'intermediate',
    estimatedTime: 60,
  },
  {
    _id: '8',
    title: 'Love in Persian Poetry',
    description: 'Explore how Persian poets from Rumi to Hafez to Saadi expressed the many dimensions of love.',
    verses: [],
    lessons: [
      { _id: '1', title: 'Divine Love in Rumi', content: '', verseIds: [] },
      { _id: '2', title: 'Mystical Love in Hafez', content: '', verseIds: [] },
      { _id: '3', title: 'Earthly Wisdom in Saadi', content: '', verseIds: [] },
      { _id: '4', title: 'Romantic Epics', content: '', verseIds: [] },
    ],
    difficulty: 'intermediate',
    estimatedTime: 45,
  },
  {
    _id: '9',
    title: 'Wisdom for Difficult Times',
    description: 'Find solace and guidance in Persian philosophy during challenging periods of life.',
    verses: [],
    lessons: [
      { _id: '1', title: 'Embracing Change', content: '', verseIds: [] },
      { _id: '2', title: 'Finding Peace', content: '', verseIds: [] },
      { _id: '3', title: 'Healing and Renewal', content: '', verseIds: [] },
      { _id: '4', title: 'The Power of Surrender', content: '', verseIds: [] },
    ],
    difficulty: 'beginner',
    estimatedTime: 40,
  },
  {
    _id: '10',
    title: 'The Essential Seven',
    description: 'Get introduced to the seven most influential Persian philosophers and poets.',
    verses: [],
    lessons: [
      { _id: '1', title: 'Rumi - The Master of Love', content: '', verseIds: [] },
      { _id: '2', title: 'Hafez - The Interpreter', content: '', verseIds: [] },
      { _id: '3', title: 'Saadi - The Wise Teacher', content: '', verseIds: [] },
      { _id: '4', title: 'Attar - The Visionary', content: '', verseIds: [] },
      { _id: '5', title: 'Ferdowsi - The Preserver', content: '', verseIds: [] },
      { _id: '6', title: 'Ibn Sina - The Physician', content: '', verseIds: [] },
      { _id: '7', title: 'Al-Ghazali - The Reviver', content: '', verseIds: [] },
    ],
    difficulty: 'beginner',
    estimatedTime: 70,
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
