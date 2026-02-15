'use client';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PlaceIcon from '@mui/icons-material/Place';

const timeline = [
  { year: '1207', event: 'Born in Balkh, Khorasan (modern-day Afghanistan)' },
  { year: '1215', event: 'Family flees the Mongol invasion eastwards' },
  { year: '1220', event: 'Settles in Konya, Anatolia (modern-day Turkey)' },
  { year: '1228', event: 'Meets his spiritual teacher, Shams-e Tabrizi' },
  { year: '1244', event: 'Profound spiritual awakening after meeting Shams' },
  { year: '1247', event: 'Begins composing the Masnavi' },
  { year: '1273', event: 'Passes away in Konya, enters the "Union"' },
];

const keyConcepts = [
  { title: 'Divine Love', description: 'The force that drives all existence, the longing between the soul and the Divine.' },
  { title: 'The Unity of Being', description: 'All existence is a manifestation of the One Divine, there is no separation.' },
  { title: 'The Spiritual Journey', description: 'The path of the seeker from ego-death (fana) to eternal life in God (baqa).' },
  { title: 'Music & Poetry', description: 'The Sama (whirling) as meditation, poetry as prayer, song as remembrance.' },
  { title: 'The Beloved', description: 'God as the eternal Beloved whom the soul longs for, through all loves on earth.' },
  { title: 'Annihilation & Union', description: 'The ego must die to self to be reborn in the Divine presence.' },
];

export default function AboutPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          mb: 6,
          p: 6,
          borderRadius: 4,
          background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(46, 74, 61, 0.1) 100%)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: '"Vazir", serif',
            mb: 2,
            color: 'primary.main',
          }}
        >
          جلال‌الدین محمد رومی
        </Typography>
        <Typography variant="h4" sx={{ color: 'text.secondary', mb: 2 }}>
          Jalāl ad-Dīn Muhammad Rūmī
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
          The greatest mystical poet in history, whose words continue to illuminate the path of seekers around the world
        </Typography>
      </Box>

      {/* Quick Facts */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <CalendarTodayIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6">1207 - 1273</Typography>
            <Typography variant="body2" color="text.secondary">67 years of mortal life</Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <PlaceIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
            <Typography variant="h6">Balkh → Konya</Typography>
            <Typography variant="body2" color="text.secondary">From Afghanistan to Turkey</Typography>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
            <AutoStoriesIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
            <Typography variant="h6">25,000+ verses</Typography>
            <Typography variant="body2" color="text.secondary">The Masnavi alone</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Biography */}
      <Typography variant="h4" sx={{ mb: 3 }}>The Story of Rumi</Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="body1" paragraph>
                Born in 1207 in the ancient city of Balkh (present-day Afghanistan), Rumi was destined to become 
                one of humanity's most profound spiritual teachers. His family, prominent scholars and theologians, 
                fled the Mongol invasions and eventually settled in the city of Konya in Anatolia (modern-day Turkey).
              </Typography>
              <Typography variant="body1" paragraph>
                For the first half of his life, Rumi was a conventional Islamic scholar and jurist, respected for 
                his knowledge of law and theology. But everything changed in 1244 when he encountered a wandering 
                dervish named Shams-e Tabrizi. This meeting sparked a profound spiritual transformation.
              </Typography>
              <Typography variant="body1" paragraph>
                After Shams mysteriously disappeared (tradition says he was murdered), Rumi's grief transformed 
                into an explosion of poetry and spiritual insight. He began composing the <em>Masnavi</em>, 
                considered the "Koran in Persian" — a 25,000-verse spiritual epic that guides seekers through 
                the mysteries of divine love.
              </Typography>
              <Typography variant="body1" paragraph>
                Rumi founded the Mevlevi order, known today as the Whirling Dervishes. Their practice of 
                <em>sema</em> — the sacred whirling — is a meditation on the soul's journey toward union 
                with the Divine. Rumi passed away in 1273, but his legacy continues to inspire millions 
                worldwide.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ height: '100%', bgcolor: 'primary.main', color: 'primary.contrastText' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>Legacy in Numbers</Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="h4">800+</Typography>
                  <Typography variant="body2">Years since his passing</Typography>
                </Box>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Box>
                  <Typography variant="h4">50,000+</Typography>
                  <Typography variant="body2">Verses of poetry</Typography>
                </Box>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Box>
                  <Typography variant="h4">#1</Typography>
                  <Typography variant="body2">Most translated poet in USA</Typography>
                </Box>
                <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)' }} />
                <Box>
                  <Typography variant="h4">Millions</Typography>
                  <Typography variant="body2">Seekers touched by his words</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Timeline */}
      <Typography variant="h4" sx={{ mb: 3 }}>Timeline</Typography>
      <Card sx={{ mb: 6 }}>
        <CardContent>
          <Stack spacing={2}>
            {timeline.map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Chip label={item.year} color="primary" sx={{ minWidth: 80 }} />
                <Typography variant="body1">{item.event}</Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Key Concepts */}
      <Typography variant="h4" sx={{ mb: 3 }}>Key Concepts in Rumi's Teachings</Typography>
      <Grid container spacing={3}>
        {keyConcepts.map((concept, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  {concept.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {concept.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quote */}
      <Box
        sx={{
          mt: 8,
          p: 6,
          textAlign: 'center',
          bgcolor: 'rgba(46, 74, 61, 0.05)',
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Vazir", serif',
            mb: 2,
            color: 'secondary.main',
          }}
        >
          "Come, come, whoever you are, come."
        </Typography>
        <Typography variant="body1" color="text.secondary">
          — Rumi's invitation to all seekers
        </Typography>
      </Box>
    </Container>
  );
}
