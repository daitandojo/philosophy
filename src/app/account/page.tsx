'use client';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
  Avatar,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Divider,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AccountPage() {
  const [tab, setTab] = useState(0);
  const [preferences, setPreferences] = useState({
    theme: 'light',
    fontSize: 'medium',
    dailyNudge: true,
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        My Account
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
            <Tab icon={<PersonIcon />} label="Profile" iconPosition="start" />
            <Tab icon={<SettingsIcon />} label="Preferences" iconPosition="start" />
            <Tab icon={<FavoriteIcon />} label="Saved" iconPosition="start" />
          </Tabs>
        </Box>

        <TabPanel value={tab} index={0}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar
                  sx={{ width: 80, height: 80, mr: 3, bgcolor: 'primary.main' }}
                >
                  R
                </Avatar>
                <Box>
                  <Typography variant="h5">Welcome, Seeker</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Join our community of Rumi enthusiasts
                  </Typography>
                </Box>
              </Box>
              <Button variant="contained" fullWidth>
                Sign in with Google
              </Button>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                Sign in to save favorites, track learning progress, and participate in discussions
              </Typography>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Display Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.theme === 'dark'}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            theme: e.target.checked ? 'dark' : 'light',
                          })
                        }
                      />
                    }
                    label="Dark Mode"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Font Size
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    {['small', 'medium', 'large'].map((size) => (
                      <Button
                        key={size}
                        variant={preferences.fontSize === size ? 'contained' : 'outlined'}
                        size="small"
                        onClick={() =>
                          setPreferences({ ...preferences, fontSize: size })
                        }
                      >
                        {size}
                      </Button>
                    ))}
                  </Box>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={preferences.dailyNudge}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            dailyNudge: e.target.checked,
                          })
                        }
                      />
                    }
                    label="Daily Rumi Quote"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tab} index={2}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Saved Verses
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign in to save your favorite verses
              </Typography>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Collections
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create and manage your personal collections
              </Typography>
            </CardContent>
          </Card>
        </TabPanel>
      </Box>
    </Container>
  );
}
