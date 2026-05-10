'use client';
import { Box, Typography, Chip, Stack } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PublicIcon from '@mui/icons-material/Public';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import type { Philosopher } from '@/types';

interface ExternalLinksProps {
  philosopher: Philosopher;
}

const linkConfig: Record<string, { label: string; icon: typeof LanguageIcon; color: string }> = {
  wikipedia: { label: 'Wikipedia', icon: PublicIcon, color: '#000000' },
  britannica: { label: 'Britannica', icon: MenuBookIcon, color: '#1a5276' },
  iranica: { label: 'Encyclopædia Iranica', icon: AutoStoriesIcon, color: '#8b4513' },
  sep: { label: 'Stanford Encyclopedia', icon: SchoolIcon, color: '#2e4a3d' },
  iep: { label: 'Internet Encyclopedia', icon: SchoolIcon, color: '#4a235a' },
  website: { label: 'Official Website', icon: LanguageIcon, color: '#1a5276' },
};

export default function ExternalLinks({ philosopher }: ExternalLinksProps) {
  const links = philosopher.externalLinks;
  if (!links) return null;

  const entries = Object.entries(links).filter(([, url]) => url) as [string, string][];
  if (entries.length === 0) return null;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="subtitle2" sx={{ color: '#c9a962', mb: 1.5, fontWeight: 600, letterSpacing: '0.03em', fontSize: '0.85rem' }}>
        External Resources
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
        {entries.map(([key, url]) => {
          const config = linkConfig[key];
          if (!config) return null;
          const Icon = config.icon;
          return (
            <Chip
              key={key}
              component="a"
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              icon={<Icon sx={{ fontSize: '0.9rem !important' }} />}
              label={config.label}
              variant="outlined"
              clickable
              sx={{
                color: 'rgba(255,255,255,0.85)',
                borderColor: 'rgba(201,169,98,0.3)',
                '&:hover': {
                  borderColor: '#c9a962',
                  backgroundColor: 'rgba(201,169,98,0.1)',
                  color: '#c9a962',
                },
                '& .MuiChip-icon': { color: 'inherit' },
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
}
