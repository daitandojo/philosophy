'use client';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Switch,
  Divider,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SchoolIcon from '@mui/icons-material/School';

interface PricingTier {
  id: string;
  name: string;
  price: { monthly: number; yearly: number };
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
}

const tiers: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for exploring Persian wisdom',
    icon: <AutoAwesomeIcon />,
    features: [
      'Access to 100+ Rumi quotes',
      'Basic search and filtering',
      'TTS in Persian',
      'Limited daily wisdom emails',
      'Community annotations (view)',
      'Basic chat with Rumi (5/day)',
    ],
  },
  {
    id: 'seeker',
    name: 'Seeker',
    price: { monthly: 9.99, yearly: 79.99 },
    description: 'For dedicated learners and enthusiasts',
    popular: true,
    icon: <SchoolIcon />,
    features: [
      'Everything in Free, plus:',
      'Access to 10,000+ quotes',
      'All 50+ philosophers',
      'Complete works library',
      'Unlimited AI chat',
      'Personalized recommendations',
      'All learning paths & quizzes',
      'Download audio for offline',
      'Write annotations & comments',
      'Create collections',
      'No advertisements',
    ],
  },
  {
    id: 'sage',
    name: 'Sage',
    price: { monthly: 19.99, yearly: 149.99 },
    description: 'For serious scholars and educators',
    icon: <WorkspacePremiumIcon />,
    features: [
      'Everything in Seeker, plus:',
      'Academic translations & commentaries',
      'Manuscript images (high-res)',
      'Citation tools (APA, MLA)',
      'Philosophy comparison tool',
      'AI research assistant',
      'Create & manage lessons',
      'Student progress tracking',
      '1-on-1 monthly coaching call',
      'Quarterly print collection',
      '20% off merchandise',
    ],
  },
];

export default function PremiumPage() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Choose Your Path
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Unlock the full depth of Persian philosophy
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Typography variant="body1" color={!isYearly ? 'primary' : 'text.secondary'}>
            Monthly
          </Typography>
          <Switch
            checked={isYearly}
            onChange={(e) => setIsYearly(e.target.checked)}
            color="primary"
          />
          <Typography variant="body1" color={isYearly ? 'primary' : 'text.secondary'}>
            Yearly
          </Typography>
          <Chip label="Save 33%" color="primary" size="small" />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
          alignItems: 'stretch',
        }}
      >
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              border: tier.popular ? '2px solid' : '1px solid',
              borderColor: tier.popular ? 'primary.main' : 'divider',
              transform: tier.popular ? 'scale(1.05)' : 'none',
              zIndex: tier.popular ? 1 : 0,
            }}
          >
            {tier.popular && (
              <Chip
                icon={<StarIcon />}
                label="Most Popular"
                color="primary"
                size="small"
                sx={{
                  position: 'absolute',
                  top: -12,
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />
            )}

            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Box sx={{ color: 'primary.main' }}>{tier.icon}</Box>
                <Typography variant="h5">{tier.name}</Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {tier.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h3" component="span">
                  ${isYearly ? Math.round(tier.price.yearly / 12) : tier.price.monthly}
                </Typography>
                <Typography variant="body2" color="text.secondary" component="span">
                  /month
                </Typography>
                {isYearly && tier.price.yearly > 0 && (
                  <Typography variant="caption" display="block" color="text.secondary">
                    ${tier.price.yearly} billed yearly
                  </Typography>
                )}
              </Box>

              <Divider sx={{ mb: 3 }} />

              <List sx={{ flex: 1 }}>
                {tier.features.map((feature, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleIcon color="primary" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={feature}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>

              <Button
                variant={tier.popular ? 'contained' : 'outlined'}
                fullWidth
                size="large"
                sx={{ mt: 3 }}
              >
                {tier.id === 'free' ? 'Get Started' : tier.price.monthly === 0 ? 'Downgrade' : 'Subscribe'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Need a custom plan?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          For universities, libraries, and organizations, we offer custom pricing and features.
        </Typography>
        <Button variant="outlined">Contact Us</Button>
      </Box>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          100% Satisfaction Guarantee
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try Premium risk-free. Cancel anytime within the first 30 days for a full refund.
        </Typography>
      </Box>
    </Container>
  );
}
