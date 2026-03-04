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
  ListItemButton,
  Container,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Image from 'next/image';
import { useThemeMode } from '@/theme/ThemeRegistry';

const navItems = [
  { label: 'Intro', href: '/' },
  { label: 'History', href: '/read' },
  { label: 'Timeline', href: '/timeline' },
  { label: 'Philosophers', href: '/philosophers' },
  { label: 'Explore', href: '/explore' },
  { label: 'Slideshow', href: '/slideshow' },
  { label: 'Learn', href: '/learn' },
  { label: 'Discourses', href: '/discourse' },
  { label: 'Community', href: '/community' },
  { label: 'Chat', href: '/chat' },
  { label: 'Media', href: '/media' },
  { label: 'About', href: '/about' },
];

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box 
      onClick={handleDrawerToggle} 
      sx={{ 
        py: 4,
        px: 3,
        height: '100%',
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, pl: 1 }}>
        <Typography
          sx={{
            fontFamily: '"Vazir", serif',
            fontSize: '1.5rem',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #c9a962 0%, #8b4513 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          حکمت
        </Typography>
        <Typography
          sx={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#f5f5f5',
            letterSpacing: '0.02em',
          }}
        >
          Hikmatia
        </Typography>
      </Box>
      <Box sx={{ width: 40, height: 1, background: 'linear-gradient(90deg, #c9a962 0%, transparent 100%)', mb: 3 }} />
      <List sx={{ p: 0 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.href}
            component={Link}
            href={item.href}
            selected={pathname === item.href}
            sx={{ 
              borderRadius: 2,
              mb: 0.5,
              py: 1.5,
              '&:hover': {
                backgroundColor: 'rgba(201, 169, 98, 0.1)',
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(201, 169, 98, 0.15)',
                borderLeft: '3px solid #c9a962',
              }
            }}
          >
            <Typography 
              sx={{ 
                fontFamily: 'system-ui, sans-serif',
                fontWeight: pathname === item.href ? 600 : 400,
                fontSize: '0.95rem',
                color: pathname === item.href ? '#c9a962' : '#b0b0b0',
              }}
            >
              {item.label}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(180deg, rgba(20, 20, 20, 0.97) 0%, rgba(30, 30, 30, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201, 169, 98, 0.15)',
        }}
      >
        <Container maxWidth={false} disableGutters>
          <Toolbar 
            sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              minHeight: '56px !important',
              px: { xs: 2, sm: 3, md: 4 },
            }}
          >
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open menu"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: '#f5f5f5' }}
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
              }}
            >
              <Typography
                sx={{
                  fontFamily: '"Vazir", serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #c9a962 0%, #8b4513 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                حکمت
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: '#f5f5f5',
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
                gap: 0.5, 
                justifyContent: 'center',
                flex: 1,
                px: 3,
              }}>
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    sx={{
                      color: pathname === item.href ? '#c9a962' : '#a0a0a0',
                      fontWeight: pathname === item.href ? 600 : 400,
                      fontSize: '0.8rem',
                      px: 2,
                      py: 1,
                      minWidth: 'auto',
                      whiteSpace: 'nowrap',
                      fontFamily: 'system-ui, sans-serif',
                      letterSpacing: '0.02em',
                      borderRadius: 1,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        width: pathname === item.href ? '60%' : '0%',
                        height: 2,
                        background: 'linear-gradient(90deg, transparent, #c9a962, transparent)',
                        transform: 'translateX(-50%)',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover': {
                        color: '#c9a962',
                        backgroundColor: 'transparent',
                        transform: 'translateY(-2px)',
                        textShadow: '0 0 20px rgba(201, 169, 98, 0.5)',
                        '&::before': {
                          width: '80%',
                        },
                      },
                      '& .MuiButton-startIcon': {
                        display: 'none',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton
                onClick={toggleTheme}
                size="small"
                sx={{ 
                  color: '#a0a0a0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#c9a962',
                    transform: 'rotate(15deg)',
                    backgroundColor: 'transparent',
                  }
                }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <Button
                component={Link}
                href="/account"
                size="small"
                sx={{ 
                  color: '#f5f5f5',
                  backgroundColor: 'rgba(201, 169, 98, 0.15)',
                  border: '1px solid rgba(201, 169, 98, 0.3)',
                  borderRadius: 1.5,
                  px: 2,
                  py: 0.5,
                  fontSize: '0.75rem',
                  fontFamily: 'system-ui, sans-serif',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(201, 169, 98, 0.25)',
                    borderColor: '#c9a962',
                    transform: 'scale(1.02)',
                    boxShadow: '0 0 20px rgba(201, 169, 98, 0.2)',
                  }
                }}
              >
                Sign In
              </Button>
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
            background: 'linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)',
            borderRight: '1px solid rgba(201, 169, 98, 0.15)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
