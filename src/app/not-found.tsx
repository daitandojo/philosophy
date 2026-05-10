import Link from 'next/link';
import { Box, Typography, Button } from '@mui/material';

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#0d1f18',
        color: '#f5f5f5',
        textAlign: 'center',
        px: 3,
      }}
    >
      <Typography
        sx={{
          fontFamily: '"Vazir", serif',
          fontSize: { xs: '4rem', md: '6rem' },
          fontWeight: 700,
          background: 'linear-gradient(135deg, #c9a962 0%, #8b4513 50%, #2e4a3d 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 2,
        }}
      >
        ۴۰۴
      </Typography>
      <Typography variant="h4" sx={{ color: '#c9a962', fontWeight: 300, mb: 2 }}>
        Not Found
      </Typography>
      <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', maxWidth: 400, mb: 4 }}>
        The page you are seeking has dissolved into the mist of non-existence. Perhaps it was never meant to be found.
      </Typography>
      <Link href="/" passHref legacyBehavior>
        <Button
          variant="outlined"
          sx={{
            color: '#c9a962',
            borderColor: 'rgba(201,169,98,0.4)',
            '&:hover': {
              borderColor: '#c9a962',
              backgroundColor: 'rgba(201,169,98,0.1)',
            },
          }}
        >
          Return to the Garden
        </Button>
      </Link>
    </Box>
  );
}
