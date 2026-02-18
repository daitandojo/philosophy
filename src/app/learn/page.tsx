'use client';
import { useState } from 'react';
import Link from 'next/link';
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
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import TimerIcon from '@mui/icons-material/Timer';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HistoryIcon from '@mui/icons-material/History';
import PsychologyIcon from '@mui/icons-material/Psychology';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TempleBuddhistIcon from '@mui/icons-material/TempleBuddhist';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Image from 'next/image';
import { useI18n } from '@/i18n';
import { 
  HeroPattern, 
  FloatingMotif, 
  SectionDivider,
  CornerDecoration,
} from '@/components/SVGDecorations';

interface Lesson {
  _id: string;
  title: string;
  content: string;
  verseIds: string[];
}

interface LearningPath {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  philosopher?: string;
  era: string;
  verses: any[];
  lessons: Lesson[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
  image?: string;
}

const learningPaths: LearningPath[] = [
  // Part 1: Ancient Iranian Thought
  {
    _id: 'ancient-iranian',
    subtitle: 'Part I: The Dawn of Wisdom',
    title: 'Ancient Iranian Philosophy',
    description: 'Explore the origins of Persian philosophical thought, from Zoroastrian cosmology to the Achaemenid ethical empire.',
    philosopher: 'Zarathustra',
    era: 'ancient',
    verses: [],
    lessons: [
      { _id: '1', title: 'The World of Zarathustra', content: 'The Iranian plateau in the second millennium BCE, where a distinct way of seeing the world was born.', verseIds: [] },
      { _id: '2', title: 'Ahura Mazda and the Cosmic Order', content: 'The revolutionary idea of a universe defined by ethical choice and cosmic order (Asha).', verseIds: [] },
      { _id: '3', title: 'The Gathas as Metaphysics', content: 'Understanding the Gathas as philosophical poetry that interrogates the cosmos.', verseIds: [] },
      { _id: '4', title: 'Cyrus the Great: Power as Stewardship', content: 'How the Achaemenid dynasty built an empire on ethical principles.', verseIds: [] },
      { _id: '5', title: 'Darius and the Moral Empire', content: 'The political philosophy of the Behistun inscription.', verseIds: [] },
    ],
    difficulty: 'beginner',
    image: '/images/learn-ancient.png',
    estimatedTime: 60,
  },
  // Part 2: Revelation and Reason
  {
    _id: 'islamic-golden-age',
    subtitle: 'Part II: Revelation and Reason',
    title: 'The Islamic Golden Age',
    description: 'Discover how Persian scholars translated, preserved, and advanced Greek philosophy while creating new schools of thought.',
    philosopher: 'Al-Farabi',
    era: 'classical',
    verses: [],
    lessons: [
      { _id: '1', title: 'The Translation Movement', content: 'How Persian scholars preserved Greek philosophy and created a new synthesis.', verseIds: [] },
      { _id: '2', title: 'Al-Farabi: The Second Teacher', content: 'Logic, music, and the ideal city in Farabi\'s philosophy.', verseIds: [] },
      { _id: '3', title: 'Ibn Sina (Avicenna): The Healing of the Soul', content: 'The Book of Healing and the floating man argument.', verseIds: [] },
      { _id: '4', title: 'Al-Ghazali: The Reviver', content: 'The Incoherence of the Philosophers and the renovation of Islamic thought.', verseIds: [] },
    ],
    difficulty: 'intermediate',
    estimatedTime: 90,
    image: '/images/learn-islamic.png',
  },
  // Part 3: Illumination and Mysticism
  {
    _id: 'illuminationist',
    subtitle: 'Part III: Illumination and Ecstasy',
    title: 'The Illuminationist School',
    description: 'Enter the mystical dimension of Persian philosophy with Suhrawardi\'s wisdom of illumination.',
    philosopher: 'Suhrawardi',
    era: 'medieval',
    verses: [],
    lessons: [
      { _id: '1', title: 'Suhrawardi and the Light Theory', content: 'The philosophy of illumination (Ishraq) and the nature of light.', verseIds: [] },
      { _id: '2', title: 'The Realm of Light', content: 'The cosmological hierarchy of lights beyond the material world.', verseIds: [] },
      { _id: '3', title: 'Active Intelligence', content: 'The role of celestial intellects in mystical knowledge.', verseIds: [] },
    ],
    difficulty: 'advanced',
    estimatedTime: 60,
    image: '/images/learn-illumination.png',
  },
  {
    _id: 'rumi-mysticism',
    subtitle: 'Part III: Illumination and Ecstasy',
    title: 'Rumi: The Poet of Divine Love',
    description: 'Journey through Rumi\'s mystical poetry and the spiritual path of the whirling dervishes.',
    philosopher: 'Rumi',
    era: 'golden-age',
    verses: [],
    lessons: [
      { _id: '1', title: 'Life of Rumi', content: 'From scholar to mystic: the transformation of Jalal al-Din Muhammad.', verseIds: [] },
      { _id: '2', title: 'The Masnavi: The Soul\'s Journey', content: 'The masterwork of spiritual poetry and its philosophical depths.', verseIds: [] },
      { _id: '3', title: 'The Spiritual Path', content: 'The stations of the soul from separation to union.', verseIds: [] },
      { _id: '4', title: 'Love as the Fundamental Force', content: 'Rumi\'s radical teaching that love is the only reality.', verseIds: [] },
    ],
    difficulty: 'beginner',
    estimatedTime: 75,
    image: '/images/learn-wisdom-love.png',
  },
  {
    _id: 'ibn-arabi',
    subtitle: 'Part III: Illumination and Ecstasy',
    title: 'Ibn Arabi: The Great Master',
    description: 'Explore the philosophy of the Unity of Being (Wahdat al-Wujud) with the greatest Sufi metaphysician.',
    philosopher: 'Ibn Arabi',
    era: 'medieval',
    verses: [],
    lessons: [
      { _id: '1', title: 'The Concept of Unity', content: 'All existence is one; the infinite manifestations of the Divine.', verseIds: [] },
      { _id: '2', title: 'The Perfect Human', content: 'The Adam Kadmon concept and cosmic consciousness.', verseIds: [] },
      { _id: '3', title: 'The Divine Names', content: 'How God knows Himself through creation.', verseIds: [] },
    ],
    difficulty: 'advanced',
    estimatedTime: 60,
    image: '/images/learn-wisdom-love.png',
  },
  // Part 4: The Great Synthesis
  {
    _id: 'mulla-sadra',
    subtitle: 'Part IV: The Great Synthesis',
    title: 'Mulla Sadra: Transcendent Theosophy',
    description: 'The final synthesis of Iranian philosophy that transformed Islamic metaphysics.',
    philosopher: 'Mulla Sadra',
    era: 'safavid',
    verses: [],
    lessons: [
      { _id: '1', title: 'The Transcendent Philosophy', content: 'How Sadra synthesized peripatetic and illuminationist traditions.', verseIds: [] },
      { _id: '2', title: 'The Journey of the Soul', content: 'Barzakh, death, and the soul\'s progression toward God.', verseIds: [] },
      { _id: '3', title: 'Actualization and Existence', content: 'The primacy of existence over essence.', verseIds: [] },
    ],
    difficulty: 'advanced',
    estimatedTime: 75,
    image: '/images/learn-illumination.png',
  },
  // Part 5: Poetry and Ethics
  {
    _id: 'saadi-wisdom',
    subtitle: 'Part V: Poetry and Ethics',
    title: 'Saadi: The Master of Moral Wisdom',
    description: 'Learn from Saadi\'s practical philosophy of ethics, friendship, and human dignity.',
    philosopher: 'Saadi',
    era: 'golden-age',
    verses: [],
    lessons: [
      { _id: '1', title: 'The Gulistan: Garden of Roses', content: 'The masterpiece of moral prose and poetry.', verseIds: [] },
      { _id: '2', title: 'Practical Ethics', content: 'Saadi\'s teachings on kindness, patience, and gratitude.', verseIds: [] },
      { _id: '3', title: 'Human Dignity', content: '"Human beings are members of a whole" - the brotherhood of humanity.', verseIds: [] },
    ],
    difficulty: 'beginner',
    estimatedTime: 45,
    image: '/images/learn-wisdom-love.png',
  },
  {
    _id: 'hafez-mysticism',
    subtitle: 'Part V: Poetry and Ethics',
    title: 'Hafez: The Tongue of the Unseen',
    description: 'Unlock the mystical meanings in Hafez\'s ghazals and the secrets of the Divan.',
    philosopher: 'Hafez',
    era: 'golden-age',
    verses: [],
    lessons: [
      { _id: '1', title: 'The Divan of Hafez', content: 'The collection of ghazals that contains hidden truths.', verseIds: [] },
      { _id: '2', title: 'The Wine of Divine Love', content: 'Understanding the symbolism of wine and the tavern.', verseIds: [] },
      { _id: '3', title: 'Fate and Free Will', content: 'The mystery of destiny in Hafez\'s poetry.', verseIds: [] },
      { _id: '4', title: 'The Art of Interpretation', content: 'How to read Hafez: layers of meaning in the ghazals.', verseIds: [] },
    ],
    difficulty: 'intermediate',
    estimatedTime: 60,
    image: '/images/learn-wisdom-love.png',
  },
  {
    _id: 'ferdowsi-epic',
    subtitle: 'Part V: Poetry and Ethics',
    title: 'Ferdowsi: The Epic of Iran',
    description: 'Journey through the Shahnameh, the epic that preserved Persian identity and wisdom.',
    philosopher: 'Ferdowsi',
    era: 'golden-age',
    verses: [],
    lessons: [
      { _id: '1', title: 'The Shahnameh', content: 'The epic poem that contains the soul of Persian culture.', verseIds: [] },
      { _id: '2', title: 'Kings and Heroes', content: 'The wisdom of kingship and heroic virtue.', verseIds: [] },
      { _id: '3', title: 'Tragedy and Fate', content: 'The tragic heroes and the question of destiny.', verseIds: [] },
    ],
    difficulty: 'beginner',
    estimatedTime: 50,
  },
  // Part 6: Modern Voices
  {
    _id: 'modern-philosophy',
    subtitle: 'Part VI: Modern Voices',
    title: 'Modern Persian Philosophy',
    description: 'Explore how Iranian philosophers engaged with modernity while preserving their heritage.',
    philosopher: 'Ali Shariati',
    era: 'modern',
    verses: [],
    lessons: [
      { _id: '1', title: 'Ali Shariati: Islam and Modernity', content: 'Reinterpreting Islam for the modern age.', verseIds: [] },
      { _id: '2', title: 'Ahmad Fardid: Westoxication', content: 'The critique of Western materialism.', verseIds: [] },
      { _id: '3', title: 'Abdolkarim Soroush: Religious Knowledge', content: 'The evolution of religious understanding.', verseIds: [] },
    ],
    difficulty: 'advanced',
    estimatedTime: 90,
  },
];

export default function LearnPage() {
  const [selectedEra, setSelectedEra] = useState('all');
  const [expandedPath, setExpandedPath] = useState<string | false>(false);
  const { t } = useI18n();

  const eras = [
    { id: 'all', label: t.learn.allEras, icon: <SchoolIcon /> },
    { id: 'ancient', label: t.learn.ancient, icon: <HistoryIcon /> },
    { id: 'classical', label: t.learn.classical, icon: <MenuBookIcon /> },
    { id: 'medieval', label: t.learn.medieval, icon: <TempleBuddhistIcon /> },
    { id: 'golden-age', label: t.learn.goldenAge, icon: <LocalFireDepartmentIcon /> },
    { id: 'safavid', label: t.learn.safavid, icon: <PsychologyIcon /> },
    { id: 'modern', label: t.learn.modern, icon: <AutoStoriesIcon /> },
  ];

  const filteredPaths = selectedEra === 'all' 
    ? learningPaths 
    : learningPaths.filter(p => p.era === selectedEra);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'success';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'default';
    }
  };

  const getEraLabel = (era: string) => {
    const eraData = eras.find(e => e.id === era);
    return eraData?.label || era;
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a3a2a 0%, #2e4a3d 50%, #3d6b52 100%)',
          py: { xs: 2, md: 3 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <HeroPattern color="#c9a962" opacity={0.06} />
        <FloatingMotif variant="arcs" color="#c9a962" size={80} top="10%" left="5%" opacity={0.1} />
        <FloatingMotif variant="celestial" color="#c9a962" size={60} bottom="15%" right="10%" opacity={0.1} />
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ color: 'rgba(201, 169, 98, 0.9)', letterSpacing: 4, mb: 0.5, display: 'block' }}>
            {t.learn.journey}
          </Typography>
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 300, mb: 1 }}>
            {t.learn.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            {t.learn.subtitle}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 2, flex: 1, overflow: 'hidden' }}>
        <Box sx={{ height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Era Filter Tabs */}
        <Box sx={{ mb: 4, borderBottom: 1, borderColor: 'rgba(201, 169, 98, 0.15)' }}>
          <Tabs 
            value={selectedEra} 
            onChange={(_, v) => setSelectedEra(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                bgcolor: '#c9a962',
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
              '& .MuiTab-root': {
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: '#c9a962',
                },
              },
            }}
          >
            {eras.map((era) => (
              <Tab 
                key={era.id} 
                value={era.id} 
                label={era.label}
                icon={era.icon}
                iconPosition="start"
                sx={{ minHeight: 48 }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Learning Paths */}
        <Grid container spacing={3}>
          {filteredPaths.map((path) => (
            <Grid size={{ xs: 12, md: 6 }} key={path._id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  background: 'linear-gradient(180deg, rgba(26, 58, 42, 0.02) 0%, rgba(255,255,255,1) 100%)',
                  border: '1px solid rgba(201, 169, 98, 0.15)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(139, 69, 19, 0.15)',
                    borderColor: 'rgba(201, 169, 98, 0.4)',
                  },
                }}
              >
                {/* Path Image Header */}
                {path.image && (
                  <Box
                    sx={{
                      position: 'relative',
                      height: 120,
                      overflow: 'hidden',
                    }}
                  >
                    <Image
                      src={path.image}
                      alt={path.title}
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
                        background: 'linear-gradient(180deg, rgba(26,58,42,0.3) 0%, rgba(26,58,42,0) 100%)',
                      }}
                    />
                  </Box>
                )}
                <CardContent sx={{ flex: 1 }}>
                  {path.subtitle && (
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontWeight: 600, 
                        letterSpacing: 1,
                        color: '#c9a962',
                        textTransform: 'uppercase',
                      }}
                    >
                      {path.subtitle}
                    </Typography>
                  )}
                  <Typography variant="h5" component="div" sx={{ mt: 1, mb: 1, fontWeight: 600 }}>
                    {path.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {path.description}
                  </Typography>
                  
                  <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                    <Chip 
                      size="small" 
                      label={path.difficulty.charAt(0).toUpperCase() + path.difficulty.slice(1)} 
                      sx={{
                        bgcolor: path.difficulty === 'beginner' ? 'rgba(46, 74, 61, 0.1)' : path.difficulty === 'intermediate' ? 'rgba(201, 169, 98, 0.1)' : 'rgba(114, 47, 55, 0.1)',
                        color: path.difficulty === 'beginner' ? '#2e4a3d' : path.difficulty === 'intermediate' ? '#8b4513' : '#722F37',
                        fontWeight: 500,
                      }}
                    />
                    <Chip 
                      size="small" 
                      icon={<TimerIcon sx={{ fontSize: '1rem !important' }} />}
                      label={`${path.estimatedTime} ${t.learn.minutes}`}
                      variant="outlined"
                      sx={{ borderColor: 'rgba(201, 169, 98, 0.2)', color: 'text.secondary' }}
                    />
                    <Chip 
                      size="small" 
                      label={getEraLabel(path.era)}
                      variant="outlined"
                      sx={{ borderColor: 'rgba(201, 169, 98, 0.2)', color: 'text.secondary' }}
                    />
                  </Stack>

                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    {path.lessons.length} {t.learn.lessons}
                  </Typography>
                </CardContent>

                <Accordion 
                  expanded={expandedPath === path._id}
                  onChange={() => setExpandedPath(expandedPath === path._id ? false : path._id)}
                  sx={{ boxShadow: 'none' }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body2">{t.learn.viewCurriculum}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack spacing={1}>
                      {path.lessons.map((lesson, index) => (
                        <Box 
                          key={lesson._id}
                          sx={{
                            p: 1.5,
                            bgcolor: 'rgba(46, 74, 61, 0.05)',
                            borderRadius: 1,
                            cursor: 'pointer',
                            '&:hover': { bgcolor: 'rgba(46, 74, 61, 0.1)' },
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Chip 
                              size="small" 
                              label={index + 1} 
                              sx={{ width: 24, height: 24, fontSize: '0.7rem' }}
                            />
                            <Typography variant="body2">
                              {lesson.title}
                            </Typography>
                          </Stack>
                        </Box>
                      ))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button 
                    variant="contained" 
                    fullWidth
                    component={Link}
                    href={`/learn/${path._id}`}
                    startIcon={<SchoolIcon />}
                  >
                    Start Learning
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredPaths.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No learning paths found for this era.
            </Typography>
          </Box>
        )}

        {/* Progress Overview */}
        <Box sx={{ mt: 6, p: 4, bgcolor: 'rgba(46, 74, 61, 0.08)', borderRadius: 3 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Your Learning Journey
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h3" color="primary">{learningPaths.length}</Typography>
                <Typography variant="body2" color="text.secondary">Learning Paths</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h3" color="primary">
                  {learningPaths.reduce((sum, p) => sum + p.lessons.length, 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">Total Lessons</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ textAlign: 'center', p: 2 }}>
                <Typography variant="h3" color="primary">
                  {Math.round(learningPaths.reduce((sum, p) => sum + p.estimatedTime, 0) / 60)}h
                </Typography>
                <Typography variant="body2" color="text.secondary">Total Content</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        </Box>
      </Container>
    </Box>
  );
}
