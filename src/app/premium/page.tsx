'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Alert,
  Paper
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SchoolIcon from '@mui/icons-material/School';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import GroupsIcon from '@mui/icons-material/Groups';
import ChatIcon from '@mui/icons-material/Chat';
import StarIcon from '@mui/icons-material/Star';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SecurityIcon from '@mui/icons-material/Security';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { motion } from 'framer-motion';
import IlluminatedCard from '@/components/IlluminatedCard';
import NastaliqReveal from '@/components/NastaliqReveal';

const plans = [
  {
    name: 'The Seeker',
    price: 'Free',
    period: 'forever',
    description: 'For those beginning their journey',
    color: 'secondary',
    features: [
      'Daily wisdom verse',
      'Basic reading access',
      'Limited chat (5 turns/day)',
      'Community access',
      'Basic search'
    ],
    cta: 'Continue Free',
    popular: false
  },
  {
    name: 'The Dervish',
    price: '$5',
    period: 'per month',
    description: 'For dedicated students of wisdom',
    color: 'primary',
    features: [
      'Unlimited philosophical chat',
      'Full audio library',
      'Unlimited collections',
      'Advanced search filters',
      'Download for offline reading',
      'Priority support',
      'Ad-free experience'
    ],
    cta: 'Become a Dervish',
    popular: true
  },
  {
    name: 'The Patron',
    price: '$20',
    period: 'per month',
    description: 'For those who wish to sustain wisdom',
    color: 'accent',
    features: [
      'Everything in Dervish',
      'Sponsor a verse (your name in credits)',
      'Early access to new features',
      'Scholar verification priority',
      'Personalized curriculum',
      'Monthly wisdom report',
      'Founder recognition'
    ],
    cta: 'Become a Patron',
    popular: false
  }
];

const benefits = [
  {
    icon: <AutoStoriesIcon />,
    title: 'Unlimited Access',
    description: 'Full library of 2,500 years of Persian philosophy'
  },
  {
    icon: <VolumeUpIcon />,
    title: 'Audio Immersion',
    description: 'Professional narration of verses with ambient soundscapes'
  },
  {
    icon: <GroupsIcon />,
    title: 'Community Wisdom',
    description: 'Join discussions with fellow seekers worldwide'
  },
  {
    icon: <SchoolIcon />,
    title: 'Guided Learning',
    description: 'Personalized curriculum based on your interests'
  },
  {
    icon: <FavoriteIcon />,
    title: 'Support Preservation',
    description: 'Your subscription helps digitize rare manuscripts'
  },
  {
    icon: <SecurityIcon />,
    title: 'Ad-Free Sanctuary',
    description: 'A pure space for contemplation without distractions'
  }
];

export default function PremiumPage() {
  const [selectedPlan, setSelectedPlan] = useState('dervish');

  const handleSubscribe = (plan: string) => {
    // In production, this would redirect to Stripe checkout
    console.log(`Subscribing to ${plan} plan`);
    // window.location.href = `/api/stripe/checkout?plan=${plan}`;
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a3a2a 0%, #2e4a3d 50%, #3d6b52 100%)',
          py: { xs: 4, md: 6 },
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
        <Container maxWidth="lg">
          <NastaliqReveal text="The Patron's Gate" />
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 300, mb: 2, mt: 2 }}>
            Sustain Wisdom, Support Preservation
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', maxWidth: 600, mx: 'auto', mb: 3 }}>
            Your subscription directly supports the digitization of rare Persian manuscripts and the development of this sanctuary for wisdom seekers worldwide.
          </Typography>
          
          <Alert 
            severity="info" 
            sx={{ 
              maxWidth: 600, 
              mx: 'auto', 
              bgcolor: 'rgba(255,255,255,0.1)',
              color: 'white',
              borderColor: 'rgba(255,255,255,0.2)'
            }}
          >
            <Typography variant="body2">
              <strong>Soft Paywall:</strong> Enjoy 5 free chat turns daily. The paywall appears gently, inviting support rather than demanding payment.
            </Typography>
          </Alert>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6, flex: 1, overflow: 'auto' }}>
        {/* Pricing Cards */}
        <Grid container spacing={4} justifyContent="center" mb={8}>
          {plans.map((plan) => (
            <Grid size={{ xs: 12, md: 4 }} key={plan.name}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <IlluminatedCard borderStyle="gold-lapis">
                  <Card sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    border: plan.popular ? '2px solid' : 'none',
                    borderColor: plan.popular ? 'primary.main' : 'transparent'
                  }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h5" component="h2">
                          {plan.name}
                        </Typography>
                        {plan.popular && (
                          <Chip 
                            icon={<StarIcon />} 
                            label="Most Popular" 
                            color="primary" 
                            size="small" 
                          />
                        )}
                      </Box>
                      
                      <Box mb={3}>
                        <Typography variant="h3" component="div" color="primary">
                          {plan.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {plan.period}
                        </Typography>
                      </Box>

                      <Typography variant="body2" color="text.secondary" mb={3}>
                        {plan.description}
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <List dense>
                        {plan.features.map((feature, index) => (
                          <ListItem key={index} disableGutters>
                            <ListItemIcon sx={{ minWidth: 36 }}>
                              <CheckCircleIcon color="success" fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={feature} />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>

                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        fullWidth
                        variant={plan.popular ? 'contained' : 'outlined'}
                        size="large"
                        onClick={() => handleSubscribe(plan.name.toLowerCase().replace(' ', '-'))}
                        startIcon={plan.name === 'The Patron' ? <FavoriteIcon /> : undefined}
                      >
                        {plan.cta}
                      </Button>
                    </CardActions>
                  </Card>
                </IlluminatedCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Benefits Section */}
        <Box mb={8}>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Why Become a Patron?
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" mb={6} sx={{ maxWidth: 800, mx: 'auto' }}>
            Your support goes beyond access—it becomes part of a living tradition of wisdom preservation.
          </Typography>

          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
               <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'primary.main',
                      boxShadow: 2
                    }
                  }}
                >
                  <Box color="primary.main" mb={2}>
                    {benefit.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* FAQ Section */}
        <Box mb={8}>
          <Typography variant="h4" component="h2" textAlign="center" gutterBottom>
            Frequently Asked Questions
          </Typography>
          
          <Grid container spacing={3} sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
            {[
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, you can cancel your subscription at any time. Your access will continue until the end of your billing period.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, Apple Pay, Google Pay, and PayPal through our secure Stripe integration.'
              },
              {
                q: 'Is there a free trial?',
                a: 'The free tier (The Seeker) is our permanent free trial. You can experience core features before deciding to upgrade.'
              },
              {
                q: 'How does "Sponsor a Verse" work?',
                a: 'As a Patron, you can sponsor the digitization of a specific verse. Your name will appear in the credits of that verse forever.'
              },
              {
                q: 'Can I switch plans?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.'
              },
              {
                q: 'Is my payment information secure?',
                a: 'We use Stripe for payment processing. Your payment information is encrypted and never stored on our servers.'
              }
            ].map((faq, index) => (
               <Grid size={{ xs: 12 }} key={index}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {faq.q}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {faq.a}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Final CTA */}
        <Box textAlign="center" sx={{ py: 6, borderTop: 1, borderColor: 'divider' }}>
          <WorkspacePremiumIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Join the Circle of Wisdom Keepers
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            Your subscription sustains not just an app, but a living tradition of Persian philosophy for generations to come.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => handleSubscribe('dervish')}
            sx={{ px: 6 }}
          >
            Begin Your Journey
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
