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
  TextField,
  Grid,
  Avatar,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Divider,
  Stack,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PaletteIcon from '@mui/icons-material/Palette';
import LockIcon from '@mui/icons-material/Lock';
import { philosophers } from '@/lib/philosophers';

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
  const { t } = useI18n();
  const [tab, setTab] = useState(0);
  const [preferences, setPreferences] = useState({
    theme: 'light',
    fontSize: 'medium',
    dailyNudge: true,
  });
  const [profile, setProfile] = useState({
    bio: '',
    favoritePhilosophers: [] as string[],
    currentlyStudying: '',
    philosophicalStatement: '',
    themeColor: '#8b4513',
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showActivity: true,
    showCollections: true,
  });

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        {t.account.title}
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)}>
            <Tab icon={<PersonIcon />} label="Profile" iconPosition="start" />
            <Tab icon={<PaletteIcon />} label="Customize" iconPosition="start" />
            <Tab icon={<SettingsIcon />} label="Preferences" iconPosition="start" />
            <Tab icon={<LockIcon />} label="Privacy" iconPosition="start" />
            <Tab icon={<FavoriteIcon />} label="Saved" iconPosition="start" />
          </Tabs>
        </Box>

        <TabPanel value={tab} index={0}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar
                  sx={{ width: 80, height: 80, mr: 3, bgcolor: profile.themeColor }}
                >
                  S
                </Avatar>
                <Box>
                  <Typography variant="h5">Welcome, Seeker</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Join our community of wisdom seekers
                  </Typography>
                </Box>
              </Box>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Bio"
                    placeholder="Tell us about yourself..."
                    multiline
                    rows={3}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>Favorite Philosophers</InputLabel>
                    <Select
                      multiple
                      value={profile.favoritePhilosophers}
                      label="Favorite Philosophers"
                      onChange={(e) => setProfile({ ...profile, favoritePhilosophers: e.target.value as string[] })}
                      renderValue={(selected) => (
                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                          {selected.map((value) => (
                            <Chip key={value} label={philosophers.find(p => p.id === value)?.name.english} size="small" />
                          ))}
                        </Stack>
                      )}
                    >
                      {philosophers.slice(0, 15).map((p) => (
                        <MenuItem key={p.id} value={p.id}>{p.name.english}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Currently Studying"
                    placeholder="What are you exploring?"
                    value={profile.currentlyStudying}
                    onChange={(e) => setProfile({ ...profile, currentlyStudying: e.target.value })}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Philosophical Statement"
                    placeholder="Share your philosophical journey..."
                    multiline
                    rows={2}
                    value={profile.philosophicalStatement}
                    onChange={(e) => setProfile({ ...profile, philosophicalStatement: e.target.value })}
                  />
                </Grid>
              </Grid>

              <Button variant="contained" sx={{ mt: 3 }}>
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tab} index={1}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Customization
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Theme Color
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    {['#8b4513', '#2e4a3d', '#c9a962', '#6b4423', '#1a365d', '#553c9a'].map((color) => (
                      <Box
                        key={color}
                        onClick={() => setProfile({ ...profile, themeColor: color })}
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          bgcolor: color,
                          cursor: 'pointer',
                          border: profile.themeColor === color ? '3px solid' : 'none',
                          borderColor: 'primary.main',
                          transition: 'all 0.2s',
                          '&:hover': {
                            transform: 'scale(1.1)',
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Cover Image URL"
                    placeholder="https://..."
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
                    label="Daily Wisdom Email"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tab} index={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Privacy Settings
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel>Profile Visibility</InputLabel>
                    <Select
                      value={privacy.profileVisibility}
                      label="Profile Visibility"
                      onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.value })}
                    >
                      <MenuItem value="public">Public</MenuItem>
                      <MenuItem value="friends">Friends Only</MenuItem>
                      <MenuItem value="private">Private</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacy.showActivity}
                        onChange={(e) => setPrivacy({ ...privacy, showActivity: e.target.checked })}
                      />
                    }
                    label="Show Activity Status"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privacy.showCollections}
                        onChange={(e) => setPrivacy({ ...privacy, showCollections: e.target.checked })}
                      />
                    }
                    label="Show My Collections"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tab} index={4}>
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
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Learning Progress
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Track your progress through learning paths
              </Typography>
            </CardContent>
          </Card>
        </TabPanel>
      </Box>
    </Container>
  );
}
