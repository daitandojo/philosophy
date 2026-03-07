'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Paper
} from '@mui/material';
import {
  Close,
  Download,
  PhoneAndroid,
  LaptopMac,
  TabletMac
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after 5 seconds of user interaction
      setTimeout(() => {
        if (!localStorage.getItem('pwaPromptDismissed')) {
          setShowPrompt(true);
        }
      }, 5000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if user has already dismissed the prompt
    const dismissed = localStorage.getItem('pwaPromptDismissed');
    if (dismissed) {
      const dismissTime = parseInt(dismissed);
      const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      if (dismissTime > oneWeekAgo) {
        setShowPrompt(false);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setIsInstalled(true);
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
    localStorage.setItem('pwaPromptDismissed', Date.now().toString());
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwaPromptDismissed', Date.now().toString());
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <AnimatePresence>
      {showPrompt && (
        <Dialog
          open={showPrompt}
          onClose={handleDismiss}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            component: motion.div,
            initial: { y: 50, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 50, opacity: 0 },
            transition: { type: 'spring', damping: 25, stiffness: 300 }
          }}
        >
          <DialogTitle>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">
                Install Hikmatia
              </Typography>
              <IconButton onClick={handleDismiss} size="small">
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>

          <DialogContent>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                mb: 3, 
                bgcolor: 'primary.light', 
                color: 'primary.contrastText',
                borderRadius: 2,
                textAlign: 'center'
              }}
            >
              <Typography variant="h5" gutterBottom>
                حکمت
              </Typography>
              <Typography variant="body2">
                Your Pocket Sanctuary of Persian Wisdom
              </Typography>
            </Paper>

            <Typography variant="body1" paragraph>
              Install Hikmatia on your device for a seamless, app-like experience:
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3 }}>
              <Box sx={{ textAlign: 'center' }}>
                <PhoneAndroid sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="caption">Phone</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <TabletMac sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="caption">Tablet</Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <LaptopMac sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="caption">Desktop</Typography>
              </Box>
            </Box>

            <Box sx={{ bgcolor: 'action.hover', p: 2, borderRadius: 1, mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Offline Access:</strong> Read saved verses without internet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <strong>Push Notifications:</strong> Daily wisdom delivered to your home screen
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <strong>Fast Loading:</strong> Instant access from your home screen
              </Typography>
            </Box>

            <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
              Works on iOS (via Safari Share), Android, and Desktop
            </Typography>
          </DialogContent>

          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button onClick={handleDismiss} color="inherit">
              Not Now
            </Button>
            <Button
              variant="contained"
              onClick={handleInstall}
              startIcon={<Download />}
              sx={{ minWidth: 120 }}
            >
              Install
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </AnimatePresence>
  );
}