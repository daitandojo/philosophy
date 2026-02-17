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
import LanguageSwitcher from './LanguageSwitcher';
import { useThemeMode } from '@/theme/ThemeRegistry';
import { useI18n } from '@/i18n';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useI18n();
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
    { label: t.navigation.explore, href: '/explore', icon: <AutoStoriesIcon /> },
    { label: t.navigation.history, href: '/read', icon: <MenuBookIcon /> },
    { label: t.navigation.philosophers, href: '/philosophers', icon: <PeopleIcon /> },
    { label: t.navigation.timeline, href: '/timeline', icon: <TimelineIcon /> },
    { label: t.navigation.learn, href: '/learn', icon: <SchoolIcon /> },
    { label: 'Discourses', href: '/discourse', icon: <LightbulbIcon /> },
    { label: t.navigation.community, href: '/community', icon: <GroupsIcon /> },
    { label: t.navigation.chat, href: '/chat', icon: <ChatIcon /> },
    { label: t.navigation.premium, href: '/premium', icon: <WorkspacePremiumIcon /> },
    { label: t.navigation.about, href: '/about', icon: <InfoIcon /> },
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
              primary={t.navigation.account} 
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
          background: 'rgba(252, 251, 249, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '2px solid #c9a962',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar 
            disableGutters 
            sx={{ 
              justifyContent: 'space-between', 
              minHeight: '64px !important',
            }}
          >
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: '#8b4513' }}
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
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', mr: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: '"Vazir", serif',
                    fontWeight: 700,
                    color: '#8b4513',
                    letterSpacing: '0.05em',
                    lineHeight: 1.1,
                    fontSize: '0.7rem',
                  }}
                >
                  حکمتیا
                </Typography>
                <Box sx={{ width: 20, height: 1.5, background: '#c9a962', borderRadius: 0.5, mt: 0.3 }} />
              </Box>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  fontFamily: '"Vazir", serif',
                  fontWeight: 700,
                  color: '#8b4513',
                  letterSpacing: '0.02em',
                }}
              >
                Hikmatia
              </Typography>
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: '#c9a962',
                  ml: 1,
                }}
              />
            </Box>

            {!isMobile && (
              <Box sx={{ 
                display: 'flex', 
                gap: 0.5, 
                overflow: 'auto',
                ml: 3,
                mr: 2,
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
                      color: pathname === item.href ? '#8b4513' : 'text.primary',
                      fontWeight: pathname === item.href ? 600 : 400,
                      fontSize: '0.85rem',
                      px: 1.5,
                      minWidth: 'auto',
                      whiteSpace: 'nowrap',
                      fontFamily: '"Vazir", serif',
                      borderRadius: 1,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        color: '#8b4513',
                        backgroundColor: 'rgba(139, 69, 19, 0.06)',
                      },
                      '& .MuiButton-startIcon': {
                        color: 'inherit',
                        mr: 0.5,
                        fontSize: '1.1rem',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
              <LanguageSwitcher />
              <IconButton
                onClick={toggleTheme}
                sx={{ 
                  color: '#8b4513',
                  '&:hover': {
                    backgroundColor: 'rgba(139, 69, 19, 0.08)',
                  }
                }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <IconButton
                component={Link}
                href="/account"
                sx={{ 
                  color: '#fff',
                  backgroundColor: '#8b4513',
                  borderRadius: 2,
                  p: 1,
                  '&:hover': {
                    backgroundColor: '#a0522d',
                  }
                }}
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
