'use client';
import { useState } from 'react';
import { useI18n } from '@/i18n';
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
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MenuBookIcon from '@mui/icons-material/MenuBook';

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
  {
    id: 'institution',
    name: 'Institution',
    price: { monthly: 499, yearly: 4990 },
    description: 'For universities, libraries, and organizations',
    icon: <AccountBalanceIcon />,
    features: [
      'Everything in Sage, plus:',
      '10-1000+ user licenses',
      'Single Sign-On (SSO)',
      'Custom branding',
      'Analytics dashboard',
      'Bulk user management',
      'Generous API access',
      'Training sessions',
      'Dedicated account manager',
      'Custom content curation',
      'White-label options',
    ],
  },
];

export default function PremiumPage() {
  const [isYearly, setIsYearly] = useState(true);
  const { t } = useI18n();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          {t.premium.title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          {t.premium.subtitle}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 4 }}>
          <Typography variant="body1" color={!isYearly ? 'primary' : 'text.secondary'}>
            {t.premium.monthly}
          </Typography>
          <Switch
            checked={isYearly}
            onChange={(e) => setIsYearly(e.target.checked)}
            color="primary"
          />
          <Typography variant="body1" color={isYearly ? 'primary' : 'text.secondary'}>
            {t.premium.yearly}
          </Typography>
          <Chip label={t.premium.save} color="primary" size="small" />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
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
                label={t.premium.mostPopular}
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
                {tier.id === 'institution' ? (
                  <Typography variant="h4">
                    {t.premium.contactSales}
                  </Typography>
                ) : (
                  <>
                    <Typography variant="h3" component="span">
                      ${isYearly ? Math.round(tier.price.yearly / 12) : tier.price.monthly}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="span">
                      {t.premium.perMonth}
                    </Typography>
                    {isYearly && tier.price.yearly > 0 && (
                      <Typography variant="caption" display="block" color="text.secondary">
                        ${tier.price.yearly} {t.premium.perYear}
                      </Typography>
                    )}
                  </>
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
                variant={tier.popular ? 'contained' : tier.id === 'institution' ? 'outlined' : 'outlined'}
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                startIcon={tier.id === 'institution' ? <MenuBookIcon /> : undefined}
              >
                {tier.id === 'free' ? t.premium.getStarted : tier.price.monthly === 0 ? t.premium.free : tier.id === 'institution' ? t.premium.contactSales : t.premium.subscribe}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          {t.premium.contactSales}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {t.premium.institution}
        </Typography>
        <Button variant="outlined">{t.premium.contactSales}</Button>
      </Box>

      <Box sx={{ mt: 6, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          {t.premium.sage}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t.premium.subscribe}
        </Typography>
      </Box>
    </Container>
  );
}
