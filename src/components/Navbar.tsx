'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Container,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import CloseIcon from '@mui/icons-material/Close'
import { useThemeMode } from '@/theme/ThemeRegistry'
import { triggerHaptic } from '@/lib/haptic'
import { useSession, signIn, signOut } from 'next-auth/react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

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
  { label: 'Debate', href: '/debate' },
  { label: 'Media', href: '/media' },
  { label: 'About', href: '/about' },
]

const KEYFRAMES = `
  @keyframes drawerSlideIn {
    from { transform: translateX(-100%); }
    to   { transform: translateX(0); }
  }
  @keyframes drawerSlideOut {
    from { transform: translateX(0); }
    to   { transform: translateX(-100%); }
  }
  @keyframes backdropFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes backdropFadeOut {
    from { opacity: 1; }
    to   { opacity: 0; }
  }
  @keyframes persianBreath {
    0%, 100% { box-shadow: 4px 0 50px rgba(201,169,98,0.12), 4px 0 100px rgba(139,69,19,0.07); }
    50%       { box-shadow: 4px 0 70px rgba(201,169,98,0.28), 4px 0 140px rgba(139,69,19,0.15); }
  }
  @keyframes itemSlideIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }
`

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [animateItems, setAnimateItems] = useState(false)
  const pathname = usePathname()
  const { mode, toggleTheme } = useThemeMode()
  const { data: session } = useSession()

  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById('navbar-keyframes')) {
      const style = document.createElement('style')
      style.id = 'navbar-keyframes'
      style.textContent = KEYFRAMES
      document.head.appendChild(style)
    }
  }, [])

  const handleOpen = () => {
    triggerHaptic(10)
    setIsClosing(false)
    setAnimateItems(false)
    setMobileOpen(true)
    setTimeout(() => setAnimateItems(true), 80)
  }

  const handleClose = () => {
    triggerHaptic(5)
    setIsClosing(true)
    setAnimateItems(false)
    setTimeout(() => {
      setMobileOpen(false)
      setIsClosing(false)
    }, 430)
  }

  const handleDrawerToggle = () => {
    if (mobileOpen && !isClosing) handleClose()
    else handleOpen()
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background:
            'linear-gradient(180deg, rgba(20,20,20,0.97) 0%, rgba(30,30,30,0.95) 100%)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201,169,98,0.15)',
          paddingTop: 'var(--sat, 0px)',
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
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: '#f5f5f5', display: { xs: 'flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

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

            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0,
                justifyContent: 'flex-start',
                flex: 1,
                mx: 2,
                overflow: 'auto',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
                maskImage: 'linear-gradient(to right, black 90%, transparent 100%)',
              }}
            >
              {navItems.map((item) => (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    sx={{
                      color: pathname === item.href ? '#c9a962' : '#a0a0a0',
                      fontWeight: pathname === item.href ? 600 : 400,
                      fontSize: '0.78rem',
                      px: 1.25,
                      py: 1,
                      minWidth: 'auto',
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                      fontFamily: 'system-ui, sans-serif',
                      letterSpacing: '0.02em',
                      borderRadius: 1,
                      position: 'relative',
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        width: pathname === item.href ? '60%' : '0%',
                        height: 2,
                        background:
                          'linear-gradient(90deg, transparent, #c9a962, transparent)',
                        transform: 'translateX(-50%)',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover': {
                        color: '#c9a962',
                        backgroundColor: 'transparent',
                        transform: 'translateY(-2px)',
                        textShadow: '0 0 20px rgba(201,169,98,0.5)',
                        '&::before': { width: '80%' },
                      },
                      '& .MuiButton-startIcon': { display: 'none' },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
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
                  },
                }}
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              {session?.user ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Button
                    component={Link}
                    href="/account"
                    size="small"
                    startIcon={
                      session.user.image ? (
                        <Box
                          component="img"
                          src={session.user.image}
                          alt=""
                          sx={{ width: 22, height: 22, borderRadius: '50%' }}
                        />
                      ) : (
                        <AccountCircleIcon sx={{ fontSize: 20 }} />
                      )
                    }
                    sx={{
                      color: '#f5f5f5',
                      backgroundColor: 'rgba(201,169,98,0.15)',
                      border: '1px solid rgba(201,169,98,0.3)',
                      borderRadius: 1.5,
                      px: 2,
                      py: 0.5,
                      fontSize: '0.75rem',
                      fontFamily: 'system-ui, sans-serif',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(201,169,98,0.25)',
                        borderColor: '#c9a962',
                        transform: 'scale(1.02)',
                        boxShadow: '0 0 20px rgba(201,169,98,0.2)',
                      },
                    }}
                  >
                    {session.user.name?.split(' ')[0] || 'Account'}
                  </Button>
                  <IconButton
                    onClick={() => signOut()}
                    size="small"
                    sx={{
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '0.65rem',
                      '&:hover': { color: '#c9a962' },
                    }}
                  >
                    <Typography sx={{ fontSize: '0.65rem', letterSpacing: '0.04em' }}>
                      Sign Out
                    </Typography>
                  </IconButton>
                </Box>
              ) : (
                <Button
                  onClick={() => signIn('google')}
                  size="small"
                  sx={{
                    color: '#f5f5f5',
                    backgroundColor: 'rgba(201,169,98,0.15)',
                    border: '1px solid rgba(201,169,98,0.3)',
                    borderRadius: 1.5,
                    px: 2,
                    py: 0.5,
                    fontSize: '0.75rem',
                    fontFamily: 'system-ui, sans-serif',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(201,169,98,0.25)',
                      borderColor: '#c9a962',
                      transform: 'scale(1.02)',
                      boxShadow: '0 0 20px rgba(201,169,98,0.2)',
                    },
                  }}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Backdrop */}
      {mobileOpen && (
        <Box
          onClick={handleClose}
          sx={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 1199,
            animation: isClosing
              ? 'backdropFadeOut 0.4s ease forwards'
              : 'backdropFadeIn 0.4s ease forwards',
          }}
        />
      )}

      {/* Drawer */}
      {mobileOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 265,
            height: '100vh',
            zIndex: 1200,
            display: 'flex',
            flexDirection: 'column',
            background: `
              radial-gradient(ellipse at 15% 20%, rgba(139,69,19,0.25) 0%, transparent 55%),
              radial-gradient(ellipse at 80% 80%, rgba(201,169,98,0.12) 0%, transparent 50%),
              linear-gradient(165deg, #0e0b08 0%, #110d09 50%, #090705 100%)
            `,
            borderRight: '1px solid rgba(201,169,98,0.22)',
            animation: isClosing
              ? 'drawerSlideOut 0.43s cubic-bezier(0.4,0,0.2,1) forwards'
              : 'drawerSlideIn 0.43s cubic-bezier(0.16,1,0.3,1) forwards, persianBreath 5s ease-in-out 0.6s infinite',
          }}
        >
          {/* Top gold bar */}
          <Box
            sx={{
              height: 3,
              flexShrink: 0,
              background:
                'linear-gradient(90deg, transparent, #6b3410 15%, #c9a962 50%, #6b3410 85%, transparent)',
              boxShadow: '0 0 16px rgba(201,169,98,0.7)',
            }}
          />

          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2.5,
              py: 1.5,
              flexShrink: 0,
              borderBottom: '1px solid rgba(201,169,98,0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                sx={{
                  fontFamily: '"Vazir", serif',
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  background:
                    'linear-gradient(135deg, #edd88a 0%, #c9a962 45%, #8b4513 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 10px rgba(201,169,98,0.5))',
                }}
              >
                حکمت
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#c9a962',
                  letterSpacing: '0.06em',
                  textShadow: '0 0 18px rgba(201,169,98,0.4)',
                }}
              >
                Hikmatia
              </Typography>
            </Box>
            <IconButton
              onClick={handleClose}
              size="small"
              sx={{
                color: 'rgba(201,169,98,0.5)',
                border: '1px solid rgba(201,169,98,0.18)',
                borderRadius: '50%',
                width: 28,
                height: 28,
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#c9a962',
                  borderColor: 'rgba(201,169,98,0.5)',
                  backgroundColor: 'rgba(201,169,98,0.08)',
                  boxShadow: '0 0 14px rgba(201,169,98,0.3)',
                },
              }}
            >
              <CloseIcon sx={{ fontSize: '0.9rem' }} />
            </IconButton>
          </Box>

          {/* Nav items — always visible; stagger animation is purely cosmetic */}
          <Box sx={{ overflowY: 'auto', flex: 1, px: 1.5, py: 1.5 }}>
            {navItems.map((item, i) => (
              <Button
                key={item.href}
                component={Link}
                href={item.href}
                onClick={handleClose}
                sx={{
                  width: '100%',
                  borderRadius: 1.5,
                  py: 0.85,
                  px: 2,
                  mb: 0.25,
                  justifyContent: 'flex-start',
                  color: pathname === item.href ? '#e8c97a' : 'rgba(210,185,140,0.75)',
                  fontWeight: pathname === item.href ? 600 : 400,
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '0.9rem',
                  letterSpacing: '0.04em',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease',
                  backgroundColor:
                    pathname === item.href ? 'rgba(201,169,98,0.08)' : 'transparent',
                  ...(pathname === item.href && {
                    textShadow: '0 0 18px rgba(201,169,98,0.5)',
                  }),
                  // Active left bar
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '15%',
                    height: '70%',
                    width: pathname === item.href ? 2 : 0,
                    background:
                      'linear-gradient(180deg, transparent, #c9a962, transparent)',
                    borderRadius: 1,
                    boxShadow: '0 0 8px rgba(201,169,98,0.8)',
                    transition: 'width 0.2s ease',
                  },
                  '&:hover': {
                    color: '#e8c97a',
                    backgroundColor: 'rgba(201,169,98,0.07)',
                    textShadow: '0 0 20px rgba(201,169,98,0.4)',
                    transform: 'translateX(4px)',
                    '&::before': { width: 2 },
                  },
                  // Stagger slide-in when animateItems becomes true
                  ...(animateItems && {
                    animation: `itemSlideIn 0.35s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s both`,
                  }),
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Bottom gold bar */}
          <Box
            sx={{
              height: 3,
              flexShrink: 0,
              background:
                'linear-gradient(90deg, transparent, #6b3410 15%, #c9a962 50%, #6b3410 85%, transparent)',
              boxShadow: '0 0 14px rgba(201,169,98,0.5)',
            }}
          />
        </Box>
      )}
    </>
  )
}
