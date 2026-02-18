'use client';
import { useState, useEffect } from 'react';
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
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import TimelineIcon from '@mui/icons-material/Timeline';
import GroupsIcon from '@mui/icons-material/Groups';
import SchoolIcon from '@mui/icons-material/School';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Image from 'next/image';
import { useThemeMode } from '@/theme/ThemeRegistry';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const { mode, toggleTheme } = useThemeMode();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < theme.breakpoints.values.md);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [theme]);

  const navItems = [
    { label: 'Explore', href: '/explore', icon: <AutoStoriesIcon /> },
    { label: 'History', href: '/read', icon: <MenuBookIcon /> },
    { label: 'Philosophers', href: '/philosophers', icon: <PeopleIcon /> },
    { label: 'Timeline', href: '/timeline', icon: <TimelineIcon /> },
    { label: 'Learn', href: '/learn', icon: <SchoolIcon /> },
    { label: 'Discourses', href: '/discourse', icon: <LightbulbIcon /> },
    { label: 'Community', href: '/community', icon: <GroupsIcon /> },
    { label: 'Chat', href: '/chat', icon: <ChatIcon /> },
    { label: 'About', href: '/about', icon: <InfoIcon /> },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box 
      onClick={handleDrawerToggle} 
      sx={{ 
        textAlign: 'center', 
        py: 3,
        background: 'linear-gradient(180deg, #faf9f7 0%, #f0ebe3 100%)',
        height: '100%',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 60,
          height: 60,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid',
          borderColor: 'secondary.main',
          mx: 'auto',
          mb: 1,
        }}
      >
        <Image
          src="/images/navbar-logo.png"
          alt="Hikmatia"
          fill
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Typography 
        variant="h5" 
        sx={{ 
          fontFamily: '"Vazir", serif', 
          fontWeight: 700,
          color: '#8b4513',
          mb: 1,
        }}
      >
        Hikmatia
      </Typography>
      <Box sx={{ width: 80, height: 2, mx: 'auto', mb: 2, background: '#c9a962', borderRadius: 1 }} />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === item.href}
              sx={{ 
                textAlign: 'center',
                py: 1.5,
                mx: 2,
                my: 0.5,
                borderRadius: 2,
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: 'rgba(139, 69, 19, 0.08)',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(139, 69, 19, 0.12)',
                  borderRight: '3px solid #c9a962',
                }
              }}
            >
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{
                  sx: { 
                    fontFamily: '"Vazir", serif',
                    fontWeight: pathname === item.href ? 600 : 400,
                  }
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/account"
            selected={pathname === '/account'}
            sx={{ 
              textAlign: 'center',
              py: 1.5,
              mx: 2,
              my: 2,
              borderRadius: 2,
              border: '1px solid #c9a962',
            }}
          >
            <ListItemText 
              primary="Account" 
              primaryTypographyProps={{
                sx: { 
                  fontFamily: '"Vazir", serif',
                  fontWeight: 500,
                  color: '#8b4513',
                }
              }} 
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={1}
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'background.paper',
          backdropFilter: 'blur(10px)',
          borderBottom: '2px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth={false} disableGutters>
          <Toolbar 
            sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              minHeight: '64px !important',
              px: { xs: 1, sm: 2, md: 3 },
            }}
          >
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
                flexShrink: 0,
                gap: 1,
                ml: 1,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid',
                  borderColor: 'secondary.main',
                }}
              >
                <Image
                  src="/images/navbar-logo.png"
                  alt="Hikmatia"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontFamily: '"Vazir", serif',
                  fontWeight: 700,
                  color: 'primary.main',
                  letterSpacing: '0.02em',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Hikmatia
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ 
                display: 'flex', 
                gap: 1, 
                justifyContent: 'center',
                flex: 1,
                px: 2,
                overflow: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': { display: 'none' },
              }}>
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    startIcon={item.icon}
                    sx={{
                      color: pathname === item.href ? 'primary.main' : 'text.secondary',
                      fontWeight: pathname === item.href ? 600 : 400,
                      fontSize: '0.75rem',
                      px: 1.25,
                      py: 0.75,
                      minWidth: 'auto',
                      whiteSpace: 'nowrap',
                      fontFamily: '"Vazir", serif',
                      borderRadius: 1,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'action.hover',
                      },
                      '& .MuiButton-startIcon': {
                        color: 'inherit',
                        mr: 0.25,
                        fontSize: '1rem',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0, mr: 1 }}>
              <Box sx={{ width: 1, height: 24, bgcolor: 'divider', mx: 0.5 }} />
              <IconButton
                onClick={toggleTheme}
                size="small"
                sx={{ 
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  }
                }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <IconButton
                component={Link}
                href="/account"
                size="small"
                sx={{ 
                  color: 'primary.contrastText',
                  backgroundColor: 'primary.main',
                  borderRadius: 1.5,
                  p: 0.75,
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  }
                }}
              >
                <PersonIcon fontSize="small" />
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
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
