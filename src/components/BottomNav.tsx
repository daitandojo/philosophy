'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Box,
  Paper,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ChatIcon from '@mui/icons-material/Chat';
import SchoolIcon from '@mui/icons-material/School';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const primaryTabs = [
  { label: 'Home', href: '/', icon: HomeIcon },
  { label: 'Explore', href: '/explore', icon: ExploreIcon },
  { label: 'Chat', href: '/chat', icon: ChatIcon },
  { label: 'Learn', href: '/learn', icon: SchoolIcon },
];

const moreItems = [
  { label: 'Philosophers', href: '/philosophers' },
  { label: 'Read', href: '/read' },
  { label: 'Timeline', href: '/timeline' },
  { label: 'Discourses', href: '/discourse' },
  { label: 'Community', href: '/community' },
  { label: 'Media', href: '/media' },
  { label: 'Slideshow', href: '/slideshow' },
  { label: 'Quiz', href: '/quiz' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const TAB_LABELS: Record<string, string> = {
  '/': 'Home',
  '/explore': 'Explore',
  '/chat': 'Chat',
  '/learn': 'Learn',
};

export default function BottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const currentTab = primaryTabs.find((t) => {
    if (t.href === '/') return pathname === '/';
    return pathname.startsWith(t.href);
  });

  return (
    <>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          paddingBottom: 'var(--sab, 0px)',
        }}
      >
        <Paper
          elevation={8}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            height: 56,
            background: 'linear-gradient(180deg, rgba(20,20,20,0.98) 0%, rgba(10,10,10,0.99) 100%)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(201,169,98,0.2)',
            borderRadius: 0,
            px: 1,
          }}
        >
          {primaryTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.href === currentTab?.href;
            return (
              <IconButton
                key={tab.href}
                component={Link}
                href={tab.href}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 0.25,
                  width: 56,
                  height: 48,
                  borderRadius: 2,
                  color: isActive ? '#c9a962' : 'rgba(255,255,255,0.5)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#c9a962',
                    backgroundColor: 'rgba(201,169,98,0.1)',
                  },
                }}
              >
                <Icon sx={{ fontSize: '1.35rem' }} />
                <Typography
                  sx={{
                    fontSize: '0.6rem',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: '0.02em',
                    lineHeight: 1,
                    color: 'inherit',
                  }}
                >
                  {tab.label}
                </Typography>
              </IconButton>
            );
          })}

          <IconButton
            onClick={() => setMoreOpen(true)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.25,
              width: 56,
              height: 48,
              borderRadius: 2,
              color: !currentTab ? '#c9a962' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.2s ease',
              '&:hover': {
                color: '#c9a962',
                backgroundColor: 'rgba(201,169,98,0.1)',
              },
            }}
          >
            <MoreHorizIcon sx={{ fontSize: '1.35rem' }} />
            <Typography
              sx={{
                fontSize: '0.6rem',
                fontWeight: 400,
                letterSpacing: '0.02em',
                lineHeight: 1,
                color: 'inherit',
              }}
            >
              More
            </Typography>
          </IconButton>
        </Paper>
      </Box>

      <Drawer
        anchor="bottom"
        open={moreOpen}
        onClose={() => setMoreOpen(false)}
        PaperProps={{
          sx: {
            background: 'linear-gradient(165deg, #0e0b08 0%, #110d09 50%, #090705 100%)',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            borderTop: '2px solid rgba(201,169,98,0.3)',
            maxHeight: '70vh',
            paddingBottom: 'var(--sab, 0px)',
          },
        }}
      >
        <Box sx={{ px: 2, pt: 2, pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography sx={{ color: '#c9a962', fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.04em' }}>
            All Sections
          </Typography>
          <IconButton onClick={() => setMoreOpen(false)} size="small" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            <MoreHorizIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(201,169,98,0.1)' }} />
        <List sx={{ py: 1 }}>
          {moreItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <ListItemButton
                key={item.href}
                component={Link}
                href={item.href}
                onClick={() => setMoreOpen(false)}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  mb: 0.25,
                  color: isActive ? '#e8c97a' : 'rgba(210,185,140,0.75)',
                  fontWeight: isActive ? 600 : 400,
                  backgroundColor: isActive ? 'rgba(201,169,98,0.08)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(201,169,98,0.12)',
                    color: '#e8c97a',
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    letterSpacing: '0.03em',
                    fontFamily: 'system-ui, sans-serif',
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
