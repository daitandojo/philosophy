'use client';
import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  LinearProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ChatIcon from '@mui/icons-material/Chat';
import Stack from '@mui/material/Stack';
import { Verse, BlogPost } from '@/types';
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

export default function AdminPage() {
  const [tab, setTab] = useState(0);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [healthCheck, setHealthCheck] = useState<any>(null);
  
  // Analytics data
  const analytics = {
    totalUsers: 12543,
    activeUsers: 3245,
    totalVerses: 2450,
    totalPhilosophers: philosophers.length,
    dailyActiveUsers: 1245,
    weeklyGrowth: 12.5,
    avgSessionDuration: '8m 24s',
    topPhilosophers: [
      { name: 'Rumi', views: 45000 },
      { name: 'Hafez', views: 32000 },
      { name: 'Saadi', views: 28000 },
      { name: 'Attar', views: 15000 },
      { name: 'Ibn Sina', views: 12000 },
    ],
  };

  useEffect(() => {
    fetchData();
    runHealthCheck();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [versesRes, blogsRes] = await Promise.all([
        fetch('/api/verses?limit=100'),
        fetch('/api/blogs'),
      ]);
      const versesData = await versesRes.json();
      const blogsData = await blogsRes.json();
      setVerses(versesData.verses || []);
      setBlogs(blogsData || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const runHealthCheck = async () => {
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setHealthCheck(data);
    } catch (error) {
      console.error('Health check error:', error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ mb: 4 }}>
        Admin Dashboard
      </Typography>

      {/* Analytics Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ bgcolor: 'primary.main', borderRadius: 2, p: 1.5 }}>
                  <PeopleIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h4">{analytics.totalUsers.toLocaleString()}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Users</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ bgcolor: 'success.main', borderRadius: 2, p: 1.5 }}>
                  <TrendingUpIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h4">{analytics.activeUsers.toLocaleString()}</Typography>
                  <Typography variant="body2" color="text.secondary">Active Users</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ bgcolor: 'secondary.main', borderRadius: 2, p: 1.5 }}>
                  <AutoStoriesIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h4">{analytics.totalVerses.toLocaleString()}</Typography>
                  <Typography variant="body2" color="text.secondary">Total Verses</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{ bgcolor: 'success.main', borderRadius: 2, p: 1.5 }}>
                  <PeopleIcon sx={{ color: 'white' }} />
                </Box>
                <Box>
                  <Typography variant="h4">{analytics.activeUsers.toLocaleString()}</Typography>
                  <Typography variant="body2" color="text.secondary">Active Users</Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Top Philosophers */}
      <Card sx={{ mb: 4 }}>
        <CardHeader title="Most Viewed Philosophers" />
        <CardContent>
          <Stack spacing={2}>
            {analytics.topPhilosophers.map((philosopher, index) => (
              <Box key={philosopher.name}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                  <Typography variant="body2">
                    {index + 1}. {philosopher.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {philosopher.views.toLocaleString()} views
                  </Typography>
                </Stack>
                <LinearProgress 
                  variant="determinate" 
                  value={(philosopher.views / analytics.topPhilosophers[0].views) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>

      {/* Health Check Section */}
      <Card sx={{ mb: 4 }}>
        <CardHeader 
          title="System Health" 
          action={
            <IconButton onClick={runHealthCheck}>
              <RefreshIcon />
            </IconButton>
          }
        />
        <CardContent>
          {healthCheck ? (
            <Grid container spacing={2}>
              {healthCheck.health?.checks?.map((check: any, index: number) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  <Alert 
                    severity={check.healthy ? 'success' : 'error'}
                    sx={{ height: '100%' }}
                  >
                    <Typography variant="subtitle2">{check.service}</Typography>
                    <Typography variant="body2">{check.message}</Typography>
                  </Alert>
                </Grid>
              ))}
            </Grid>
          ) : (
            <CircularProgress />
          )}
        </CardContent>
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label={`Verses (${verses.length})`} />
          <Tab label={`Blog Posts (${blogs.length})`} />
        </Tabs>
      </Box>

      {/* Verses Tab */}
      <TabPanel value={tab} index={0}>
        <Card>
          <CardHeader 
            title="Manage Verses" 
            action={
              <Button startIcon={<AddIcon />} variant="contained">
                Add Verse
              </Button>
            }
          />
          <CardContent>
            {loading ? (
              <CircularProgress />
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Persian Text</TableCell>
                      <TableCell>Source</TableCell>
                      <TableCell>Themes</TableCell>
                      <TableCell>Wisdom</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {verses.map((verse) => (
                      <TableRow key={verse._id}>
                        <TableCell sx={{ maxWidth: 300 }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              overflow: 'hidden', 
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              fontFamily: '"Vazir", serif',
                              direction: 'rtl',
                              textAlign: 'right'
                            }}
                          >
                            {verse.persianText}
                          </Typography>
                        </TableCell>
                        <TableCell>{verse.sourceWork}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {verse.themes.slice(0, 2).map(t => (
                              <Chip key={t} label={t} size="small" />
                            ))}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={`${verse.wisdomScore}/10`} 
                            color={verse.wisdomScore >= 8 ? 'success' : verse.wisdomScore >= 5 ? 'warning' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </TabPanel>

      {/* Blog Tab */}
      <TabPanel value={tab} index={1}>
        <Card>
          <CardHeader 
            title="Manage Blog Posts" 
            action={
              <Button startIcon={<AddIcon />} variant="contained">
                Create Post
              </Button>
            }
          />
          <CardContent>
            {loading ? (
              <CircularProgress />
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Author</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {blogs.map((blog) => (
                      <TableRow key={blog._id}>
                        <TableCell>{blog.title}</TableCell>
                        <TableCell>{blog.userId}</TableCell>
                        <TableCell>
                          <Chip 
                            label={blog.published ? 'Published' : 'Draft'} 
                            color={blog.published ? 'success' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small">
                            <EditIcon />
                          </IconButton>
                          <IconButton size="small" color="error">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </TabPanel>
    </Container>
  );
}
