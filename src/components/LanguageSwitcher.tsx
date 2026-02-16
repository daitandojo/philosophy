'use client';
import { useState, useEffect } from 'react';
import { Box, Button, Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

type Locale = 'en' | 'es' | 'nl';

export default function LanguageSwitcher() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale) {
      setLocale(savedLocale);
    }
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    handleClose();
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  ];

  const currentLang = languages.find(l => l.code === locale);

  return (
    <>
      <Button
        onClick={handleClick}
        startIcon={<LanguageIcon />}
        sx={{
          color: 'text.primary',
          textTransform: 'none',
          fontWeight: 500,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span>{currentLang?.flag}</span>
          <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
            {currentLang?.name}
          </Box>
        </Box>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleSelect(lang.code as Locale)}
            selected={locale === lang.code}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
