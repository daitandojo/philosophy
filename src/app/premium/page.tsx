'use client';
import { useI18n } from '@/i18n';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';

const features = [
  { icon: <AutoStoriesIcon />, title: 'Access to 10,000+ Quotes', description: 'Explore wisdom from Rumi, Hafez, Saadi, and 50+ philosophers' },
  { icon: <MenuBookIcon />, title: 'Complete Works Library', description: 'Read full texts of major Persian philosophical works' },
  { icon: <ChatIcon />, title: 'AI Chat with Philosophers', description: 'Have meaningful conversations with AI representations of ancient thinkers' },
  { icon: <SchoolIcon />, title: 'Learning Paths', description: 'Structured courses from beginner to advanced' },
  { icon: <GroupsIcon />, title: 'Community', description: 'Join discussions and connect with fellow seekers' },
  { icon: <AutoAwesomeIcon />, title: 'Text-to-Speech', description: 'Listen to Persian poetry with correct pronunciation' },
];

export default function PremiumPage() {
  const { t } = useI18n();

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
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='%23c9a962' fill-opacity='0.4'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          },
        }}
      >
        <Container maxWidth="md">
          <Typography variant="overline" sx={{ color: 'rgba(201, 169, 98, 0.9)', letterSpacing: 4, mb: 0.5, display: 'block' }}>
            Free Forever
          </Typography>
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 300, mb: 1 }}>
            {t.premium.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            {t.premium.subtitle}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 3, flex: 1, overflow: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Completely Free. No Payments. Ever.
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Hikmatia is dedicated to preserving and sharing Persian wisdom with the world. 
            We believe knowledge should be accessible to everyone.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {features.map((feature, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  border: '1px solid rgba(201, 169, 98, 0.15)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: 'rgba(201, 169, 98, 0.4)',
                    boxShadow: '0 8px 24px rgba(139, 69, 19, 0.1)',
                  },
                }}
              >
                <CardContent sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ 
                    color: '#c9a962', 
                    mt: 0.5,
                    bgcolor: 'rgba(201, 169, 98, 0.1)',
                    p: 1,
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {feature.icon}
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Card sx={{ bgcolor: 'rgba(46, 74, 61, 0.08)', border: 'none' }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h5" gutterBottom>
              Support Our Mission
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
              While our core features are completely free, your support helps us continue 
              maintaining and expanding this collection of Persian wisdom.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                size="large" 
                startIcon={<GroupsIcon />}
                sx={{
                  bgcolor: '#c9a962',
                  color: '#1a3a2a',
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#d4bc7d' },
                }}
              >
                Join Our Community
              </Button>
              <Button 
                variant="outlined" 
                size="large"
                sx={{
                  borderColor: 'rgba(201, 169, 98, 0.5)',
                  color: '#c9a962',
                  '&:hover': { 
                    borderColor: '#c9a962',
                    bgcolor: 'rgba(201, 169, 98, 0.1)',
                  },
                }}
              >
                Contribute Translations
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
            What Our Users Say
          </Typography>
          <Grid container spacing={3}>
            {[
              '"This platform has transformed how I study Persian philosophy. The AI discussions feel incredibly authentic."',
              '"Finally, a place where I can access these ancient texts without paywalls. Thank you for this gift."',
              '"The text-to-speech feature has helped me improve my Persian pronunciation significantly."',
            ].map((quote, idx) => (
              <Grid size={{ xs: 12, md: 4 }} key={idx}>
                <Card 
                  sx={{ 
                    height: '100%',
                    border: '1px solid rgba(201, 169, 98, 0.15)',
                    bgcolor: 'rgba(26, 58, 42, 0.02)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'rgba(201, 169, 98, 0.4)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontStyle: 'italic', 
                        mb: 2,
                        lineHeight: 1.7,
                        color: 'text.secondary',
                      }}
                    >
                      {quote}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 24, height: 2, bgcolor: '#c9a962', borderRadius: 1 }} />
                      <Typography variant="caption" color="text.secondary">
                        Community Member
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
