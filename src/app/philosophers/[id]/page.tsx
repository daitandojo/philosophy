'use client';
import { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Tabs,
  Tab,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import GroupIcon from '@mui/icons-material/Group';
import { useState } from 'react';
import { getPhilosopherById, getWorksByPhilosopher, eraLabels, eraColors } from '@/lib/philosophers';

interface PageProps {
  params: Promise<{ id: string }>;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function PhilosopherDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const philosopher = getPhilosopherById(id);
  const works = getWorksByPhilosopher(id);
  const [tabValue, setTabValue] = useState(0);

  if (!philosopher) {
    notFound();
  }

  const sampleQuotes = [
    { text: 'بیا تا برایت ببینیم', translation: 'Come, let us see for you...', source: 'Masnavi' },
    { text: 'اینکه می‌جویی، تو خودی', translation: 'What you seek is you yourself', source: 'Masnavi' },
  ];

  const keyTeachings = [
    'Divine Love as the fundamental force of existence',
    'The spiritual journey of the soul toward God',
    'The concept of annihilation (fana) and subsistence (baqa)',
    'The unity of all religions and paths to God',
    'Music and poetry as vehicles for spiritual transformation',
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(46, 74, 61, 0.1) 100%)',
          py: 6,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Button
            component={Link}
            href="/philosophers"
            startIcon={<ArrowBackIcon />}
            sx={{ mb: 3 }}
          >
            Back to Philosophers
          </Button>

          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #8b4513 0%, #c9a962 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: '"Vazir", serif',
                    fontSize: '3rem',
                    color: 'white',
                  }}
                >
                  {philosopher.name.persian.slice(0, 1)}
                </Box>
                <Box>
                  <Typography variant="h2" sx={{ mb: 0.5 }}>
                    {philosopher.name.english}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Vazir", serif',
                      direction: 'rtl',
                      color: 'text.secondary',
                    }}
                  >
                    {philosopher.name.persian}
                  </Typography>
                </Box>
              </Box>

              <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Chip label={eraLabels[philosopher.life.era]} color={eraColors[philosopher.life.era]} />
                {philosopher.school.map((s) => (
                  <Chip key={s} label={s} variant="outlined" />
                ))}
                {philosopher.verified && (
                  <Chip label="Verified" color="success" size="small" />
                )}
              </Stack>

              <Typography variant="body1" sx={{ mb: 3, maxWidth: 600 }}>
                {philosopher.description}
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ChatIcon />}
                  component={Link}
                  href={`/chat?philosopher=${philosopher.id}`}
                >
                  Chat with {philosopher.name.english.split(' ')[0]}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<AutoStoriesIcon />}
                  component={Link}
                  href={`/explore?philosopher=${philosopher.id}`}
                >
                  Browse Quotes
                </Button>
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Quick Facts</Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Born</Typography>
                      <Typography variant="body1">{philosopher.life.birth}</Typography>
                      <Typography variant="body2" color="text.secondary">{philosopher.life.birthPlace}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Died</Typography>
                      <Typography variant="body1">{philosopher.life.death ?? 'Present'}</Typography>
                      <Typography variant="body2" color="text.secondary">{philosopher.life.death ? philosopher.life.deathPlace : 'Still living'}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Quotes</Typography>
                      <Typography variant="h5">{philosopher.quoteCount}+</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">Influence Score</Typography>
                      <Typography variant="h5">{philosopher.influence}/100</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Tabs Section - 6 Tabs as per EPIC0 */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} variant="scrollable" scrollButtons="auto">
            <Tab icon={<HistoryEduIcon />} iconPosition="start" label="Overview" />
            <Tab icon={<ArticleIcon />} iconPosition="start" label="Biography" />
            <Tab icon={<MenuBookIcon />} iconPosition="start" label={`Works (${works.length})`} />
            <Tab icon={<AutoStoriesIcon />} iconPosition="start" label="Quotes" />
            <Tab icon={<PeopleIcon />} iconPosition="start" label="Relationships" />
            <Tab icon={<GroupIcon />} iconPosition="start" label="Community" />
          </Tabs>
        </Box>

        {/* Tab 1: Overview */}
        <TabPanel value={tabValue} index={0}>
          <Typography variant="h4" sx={{ mb: 2 }}>Key Teachings</Typography>
          <Stack spacing={2} sx={{ mb: 4 }}>
            {keyTeachings.map((teaching, index) => (
              <Card key={index}>
                <CardContent>
                  <Typography variant="body1">{teaching}</Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
          
          <Typography variant="h4" sx={{ mb: 2 }}>Why They Matter Today</Typography>
          <Card>
            <CardContent>
              <Typography variant="body1">
                {philosopher.name.english}'s teachings continue to resonate with millions around the world. 
                Their insights into love, spirituality, and the human condition offer timeless wisdom 
                for modern seekers. Whether you're looking for guidance on personal growth, 
                spiritual enlightenment, or simply beautiful poetry, {philosopher.name.english.split(' ')[0]}'s 
                works provide a rich source of inspiration.
              </Typography>
            </CardContent>
          </Card>
        </TabPanel>

        {/* Tab 2: Biography */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Life Journey</Typography>
              <Typography variant="body1" paragraph>
                Born in {philosopher.life.birth} in {philosopher.life.birthPlace}, 
                {philosopher.name.english} lived during the {eraLabels[philosopher.life.era].toLowerCase()}. 
                {philosopher.description}
              </Typography>
              <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>Historical Context</Typography>
              <Typography variant="body1" paragraph>
                This was a pivotal period in Persian and Islamic intellectual history, 
                marked by significant developments in philosophy, mysticism, and literature.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Timeline</Typography>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Chip label={philosopher.life.birth} size="small" color="primary" />
                      <Typography variant="body2">Born in {philosopher.life.birthPlace}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Chip label={philosopher.life.death?.toString() ?? 'Present'} size="small" color="secondary" />
                      <Typography variant="body2">Passed in {philosopher.life.deathPlace}</Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
              
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Schools of Thought</Typography>
                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {philosopher.school.map((s) => (
                      <Chip key={s} label={s} variant="outlined" />
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 3: Works */}
        <TabPanel value={tabValue} index={2}>
          <Typography variant="h4" sx={{ mb: 2 }}>Major Works</Typography>
          {works.length > 0 ? (
            <Grid container spacing={2}>
              {works.map((work) => (
                <Grid size={{ xs: 12, sm: 6 }} key={work.id}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                        <Typography variant="h6">{work.title.english}</Typography>
                        <Chip label={work.type} size="small" />
                      </Stack>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontFamily: '"Vazir", serif', 
                          direction: 'rtl', 
                          mb: 1,
                          color: 'text.secondary'
                        }}
                      >
                        {work.title.persian}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {work.year}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {work.description}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {work.significance}
                      </Typography>
                      {work.structure && (
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            {work.structure.books && `Books: ${work.structure.books} | `}
                            {work.structure.chapters && `Chapters: ${work.structure.chapters} | `}
                            {work.structure.verses && `Verses: ${work.structure.verses?.toLocaleString()}`}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Works data coming soon. Check back for detailed information about {philosopher.name.english}'s writings.
            </Typography>
          )}
        </TabPanel>

        {/* Tab 4: Quotes */}
        <TabPanel value={tabValue} index={3}>
          <Typography variant="h4" sx={{ mb: 2 }}>Featured Quotes</Typography>
          <Stack spacing={2}>
            {sampleQuotes.map((quote, index) => (
              <Card key={index}>
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: '"Vazir", serif',
                      direction: 'rtl',
                      fontSize: '1.2rem',
                      mb: 2,
                    }}
                  >
                    {quote.text}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    "{quote.translation}"
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    — {quote.source}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
          <Button
            component={Link}
            href={`/explore?philosopher=${philosopher.id}`}
            startIcon={<AutoStoriesIcon />}
            sx={{ mt: 2 }}
          >
            View All Quotes
          </Button>
        </TabPanel>

        {/* Tab 5: Relationships */}
        <TabPanel value={tabValue} index={4}>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Influenced By</Typography>
              <Stack spacing={1}>
                {(philosopher.influences || []).length > 0 ? (
                  philosopher.influences?.map((infId) => {
                    const infPhilosopher = getPhilosopherById(infId);
                    return infPhilosopher ? (
                      <Card key={infId}>
                        <CardContent sx={{ py: 1.5 }}>
                          <Button variant="text" component={Link} href={`/philosophers/${infId}`}>
                            {infPhilosopher.name.english}
                          </Button>
                        </CardContent>
                      </Card>
                    ) : null;
                  })
                ) : (
                  <Card>
                    <CardContent sx={{ py: 1.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        No recorded influences
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>Influenced</Typography>
              <Stack spacing={1}>
                {(philosopher.influenced || []).length > 0 ? (
                  philosopher.influenced?.map((infId) => {
                    const infPhilosopher = getPhilosopherById(infId);
                    return infPhilosopher ? (
                      <Card key={infId}>
                        <CardContent sx={{ py: 1.5 }}>
                          <Button variant="text" component={Link} href={`/philosophers/${infId}`}>
                            {infPhilosopher.name.english}
                          </Button>
                        </CardContent>
                      </Card>
                    ) : null;
                  })
                ) : (
                  <Card>
                    <CardContent sx={{ py: 1.5 }}>
                      <Typography variant="body2" color="text.secondary">
                        No recorded followers
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Stack>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab 6: Community */}
        <TabPanel value={tabValue} index={5}>
          <Typography variant="h4" sx={{ mb: 2 }}>Community</Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Recent Annotations</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Community annotations will appear here. Be the first to add an annotation!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2 }}>Popular Discussions</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Join the discussion about {philosopher.name.english}'s philosophy.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Container>
    </Box>
  );
}
