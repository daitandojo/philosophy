'use client';

import { useState, useEffect } from 'react';
import { 
  Box, 
  IconButton, 
  Tooltip, 
  Switch, 
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Slider,
  Divider
} from '@mui/material';
import {
  Accessibility,
  Contrast,
  TextIncrease,
  TextDecrease,
  Hearing,
  Keyboard,
  Close
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

export default function AccessibilityOverlay() {
  const [open, setOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    // Load saved preferences
    const savedContrast = localStorage.getItem('highContrast') === 'true';
    const savedFontSize = parseFloat(localStorage.getItem('fontSize') || '1');
    const savedMotion = localStorage.getItem('reducedMotion') === 'true';
    
    setHighContrast(savedContrast);
    setFontSize(savedFontSize);
    setReducedMotion(savedMotion);

    // Apply preferences
    if (savedContrast) {
      document.documentElement.style.setProperty('--contrast-mode', 'high');
    }
    if (savedFontSize !== 1) {
      document.documentElement.style.setProperty('--font-size-multiplier', savedFontSize.toString());
    }
    if (savedMotion) {
      document.documentElement.style.setProperty('--reduced-motion', 'reduce');
    }
  }, []);

  const handleHighContrastChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enabled = event.target.checked;
    setHighContrast(enabled);
    localStorage.setItem('highContrast', enabled.toString());
    if (enabled) {
      document.documentElement.style.setProperty('--contrast-mode', 'high');
    } else {
      document.documentElement.style.removeProperty('--contrast-mode');
    }
  };

  const handleFontSizeChange = (event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    setFontSize(value);
    localStorage.setItem('fontSize', value.toString());
    document.documentElement.style.setProperty('--font-size-multiplier', value.toString());
  };

  const handleReducedMotionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enabled = event.target.checked;
    setReducedMotion(enabled);
    localStorage.setItem('reducedMotion', enabled.toString());
    if (enabled) {
      document.documentElement.style.setProperty('--reduced-motion', 'reduce');
    } else {
      document.documentElement.style.removeProperty('--reduced-motion');
    }
  };

  const resetSettings = () => {
    setHighContrast(false);
    setFontSize(1);
    setReducedMotion(false);
    localStorage.removeItem('highContrast');
    localStorage.removeItem('fontSize');
    localStorage.removeItem('reducedMotion');
    document.documentElement.style.removeProperty('--contrast-mode');
    document.documentElement.style.removeProperty('--font-size-multiplier');
    document.documentElement.style.removeProperty('--reduced-motion');
  };

  return (
    <>
      <Tooltip title="Accessibility Settings">
        <IconButton
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 9999,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
            boxShadow: 3,
          }}
          onClick={() => setOpen(true)}
          aria-label="Open accessibility settings"
        >
          <Accessibility />
        </IconButton>
      </Tooltip>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        aria-labelledby="accessibility-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="accessibility-dialog-title">
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" component="span">
              Accessibility Settings
            </Typography>
            <IconButton onClick={() => setOpen(false)} aria-label="Close">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ py: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Visual Settings
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={highContrast}
                  onChange={handleHighContrastChange}
                  icon={<Contrast />}
                  checkedIcon={<Contrast />}
                />
              }
              label="High Contrast Mode"
              sx={{ mb: 2 }}
            />

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>
                Font Size: {fontSize.toFixed(1)}x
              </Typography>
              <Box display="flex" alignItems="center" gap={2}>
                <TextDecrease />
                <Slider
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  min={0.8}
                  max={1.5}
                  step={0.1}
                  aria-label="Font size"
                  sx={{ flex: 1 }}
                />
                <TextIncrease />
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" gutterBottom>
              Motion & Interaction
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={reducedMotion}
                  onChange={handleReducedMotionChange}
                />
              }
              label="Reduce Motion"
              sx={{ mb: 2 }}
            />

            <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <strong>Keyboard Navigation:</strong> Use Tab to navigate, Enter to select, and Escape to close dialogs.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                <strong>Screen Reader:</strong> All interactive elements include ARIA labels for screen reader compatibility.
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={resetSettings} color="secondary">
            Reset to Defaults
          </Button>
          <Button onClick={() => setOpen(false)} variant="contained">
            Apply Settings
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}