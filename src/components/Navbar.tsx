'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ChatIcon from '@mui/icons-material/Chat';
import BlogIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import QuizIcon from '@mui/icons-material/Quiz';
import PeopleIcon from '@mui/icons-material/People';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import TimelineIcon from '@mui/icons-material/Timeline';

const navItems = [
  { label: 'Explore', href: '/explore', icon: <AutoStoriesIcon /> },
  { label: 'Philosophers', href: '/philosophers', icon: <PeopleIcon /> },
  { label: 'Timeline', href: '/timeline', icon: <TimelineIcon /> },
  { label: 'Quiz', href: '/quiz', icon: <QuizIcon /> },
  { label: 'Chat', href: '/chat', icon: <ChatIcon /> },
  { label: 'Premium', href: '/premium', icon: <WorkspacePremiumIcon /> },
  { label: 'About', href: '/about', icon: <InfoIcon /> },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
      <Typography variant="h6" sx={{ fontFamily: '"Vazir", serif', mb: 2, color: 'primary.main' }}>
        حکمت | Hikmatia
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/account"
            selected={pathname === '/account'}
            sx={{ textAlign: 'center' }}
          >
            <ListItemText primary="Account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={1}
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'rgba(250, 249, 247, 0.95)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Box
              component={Link}
              href="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                flexGrow: isMobile ? 1 : 0,
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontFamily: '"Vazir", serif',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #8b4513 0%, #c9a962 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '0.05em',
                }}
              >
                حکمت
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  ml: 1,
                  color: 'text.secondary',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Rumi
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    startIcon={item.icon}
                    sx={{
                      color: pathname === item.href ? 'primary.main' : 'text.primary',
                      fontWeight: pathname === item.href ? 600 : 400,
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                component={Link}
                href="/account"
                sx={{ color: 'text.primary' }}
              >
                <PersonIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
