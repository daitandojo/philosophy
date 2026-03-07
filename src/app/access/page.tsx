'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { 
  HeroPattern, 
  CornerDecoration, 
  FloatingMotif,
  SectionDivider,
} from '@/components/SVGDecorations';

// Separate component that uses useSearchParams
function AccessForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [accessCode, setAccessCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [redirectPath, setRedirectPath] = useState('/');

  useEffect(() => {
    // Get redirect path from query params
    const redirect = searchParams.get('redirect');
    if (redirect) {
      setRedirectPath(redirect);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: accessCode }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success - redirect to the intended page
        router.push(redirectPath);
      } else {
        setError(data.error || 'Invalid access code');
        setAccessCode('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Access code validation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <AccessFormContent 
      accessCode={accessCode}
      setAccessCode={setAccessCode}
      loading={loading}
      error={error}
      redirectPath={redirectPath}
      handleSubmit={handleSubmit}
      handleKeyPress={handleKeyPress}
    />
  );
}

// Main content component without useSearchParams
function AccessFormContent({
  accessCode,
  setAccessCode,
  loading,
  error,
  redirectPath,
  handleSubmit,
  handleKeyPress,
}: {
  accessCode: string;
  setAccessCode: (code: string) => void;
  loading: boolean;
  error: string;
  redirectPath: string;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleKeyPress: (e: React.KeyboardEvent) => void;
}) {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#0a1912',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Darker, more mysterious background */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 50%, rgba(26, 58, 42, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(201, 169, 98, 0.1) 0%, transparent 50%)',
        zIndex: 0,
      }} />
      
      {/* Subtle SVG Decorations - more mysterious */}
      <HeroPattern color="#c9a962" opacity={0.05} />
      <CornerDecoration position="top-left" color="#c9a962" size={80} />
      <CornerDecoration position="top-right" color="#c9a962" size={80} />
      <CornerDecoration position="bottom-left" color="#c9a962" size={80} />
      <CornerDecoration position="bottom-right" color="#c9a962" size={80} />
      
      <FloatingMotif 
        variant="celestial" 
        color="#c9a962" 
        size={60} 
        top="15%" 
        left="8%" 
        opacity={0.08} 
        animation={false}
      />
      <FloatingMotif 
        variant="geometric" 
        color="#c9a962" 
        size={50} 
        top="25%" 
        right="12%" 
        opacity={0.06} 
        animation={false}
      />
      <FloatingMotif 
        variant="floral" 
        color="#c9a962" 
        size={55} 
        bottom="20%" 
        left="12%" 
        opacity={0.07} 
        animation={false}
      />
      <FloatingMotif 
        variant="waves" 
        color="#c9a962" 
        size={60} 
        bottom="25%" 
        right="8%" 
        opacity={0.05} 
        animation={false}
      />

      {/* Mysterious floating particles */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(1px 1px at 20% 30%, rgba(201, 169, 98, 0.3) 1px, transparent 0), radial-gradient(1px 1px at 40% 70%, rgba(201, 169, 98, 0.2) 1px, transparent 0), radial-gradient(1px 1px at 60% 20%, rgba(201, 169, 98, 0.25) 1px, transparent 0), radial-gradient(1px 1px at 80% 50%, rgba(201, 169, 98, 0.15) 1px, transparent 0), radial-gradient(1px 1px at 30% 80%, rgba(201, 169, 98, 0.2) 1px, transparent 0)',
          backgroundSize: '200px 200px',
          animation: 'float 60s infinite linear',
          '@keyframes float': {
            '0%': { transform: 'translateY(0) translateX(0)' },
            '25%': { transform: 'translateY(-20px) translateX(10px)' },
            '50%': { transform: 'translateY(0) translateX(20px)' },
            '75%': { transform: 'translateY(20px) translateX(10px)' },
            '100%': { transform: 'translateY(0) translateX(0)' },
          },
        },
      }} />

      <Container maxWidth="sm" sx={{ 
        position: 'relative', 
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Changed from center to flex-start
        alignItems: 'center',
        pt: { xs: 12, md: 16 }, // Added top padding to lift content up
        pb: 8,
        px: 2,
      }}>
        {/* Mysterious Symbol/Logo */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 8,
          animation: 'fadeIn 1.2s ease-out',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(-30px) scale(0.9)' },
            to: { opacity: 1, transform: 'translateY(0) scale(1)' },
          },
        }}>
          {/* Ancient seal/symbol */}
          <Box sx={{
            position: 'relative',
            width: 120,
            height: 120,
            margin: '0 auto 24px',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: '2px solid rgba(201, 169, 98, 0.4)',
              borderRadius: '50%',
              animation: 'pulse 4s infinite ease-in-out',
              '@keyframes pulse': {
                '0%, 100%': { transform: 'scale(1)', opacity: 0.4 },
                '50%': { transform: 'scale(1.05)', opacity: 0.6 },
              },
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '20%',
              left: '20%',
              right: '20%',
              bottom: '20%',
              border: '1px solid rgba(201, 169, 98, 0.3)',
              borderRadius: '50%',
              animation: 'pulse 3s infinite ease-in-out 0.5s',
            },
          }}>
            <Typography
              sx={{
                fontFamily: '"Vazir", serif',
                fontSize: '3.5rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.9) 0%, rgba(139, 69, 19, 0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: '120px',
                letterSpacing: '0.1em',
                filter: 'drop-shadow(0 0 8px rgba(201, 169, 98, 0.3))',
              }}
            >
              ح
            </Typography>
          </Box>
          
          <Typography
            sx={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: { xs: '1.4rem', md: '1.6rem' },
              fontWeight: 300,
              color: 'rgba(245, 245, 245, 0.7)',
              letterSpacing: '0.1em',
              mb: 2,
              textTransform: 'uppercase',
              opacity: 0.8,
            }}
          >
            Portal
          </Typography>
          
          <Box sx={{ width: 100, mx: 'auto' }}>
            <SectionDivider color="rgba(201, 169, 98, 0.3)" height={20} />
          </Box>
        </Box>

        {/* Access Card */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: 'rgba(26, 58, 42, 0.7)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(201, 169, 98, 0.2)',
            borderRadius: 4,
            p: { xs: 3, md: 4 },
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            animation: 'slideUp 0.6s ease-out 0.2s both',
            '@keyframes slideUp': {
              from: { opacity: 0, transform: 'translateY(30px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          {/* Lock Icon */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 3,
            color: '#c9a962',
          }}>
            <LockIcon sx={{ fontSize: 48, opacity: 0.9 }} />
          </Box>

          {/* Mysterious Title */}
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontFamily: '"Vazir", serif',
              fontSize: '1.3rem',
              fontWeight: 400,
              textAlign: 'center',
              mb: 2,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              opacity: 0.9,
            }}
          >
            Access Sequence
          </Typography>
          
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'system-ui, sans-serif',
              fontSize: '0.85rem',
              textAlign: 'center',
              mb: 4,
              lineHeight: 1.6,
              fontStyle: 'italic',
              maxWidth: '80%',
              mx: 'auto',
            }}
          >
            Enter the numerical key to proceed
          </Typography>

          {/* Error Message */}
          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3, 
                bgcolor: 'rgba(211, 47, 47, 0.1)',
                border: '1px solid rgba(211, 47, 47, 0.3)',
                color: '#ff6b6b',
              }}
            >
              {error}
            </Alert>
          )}

           {/* Mysterious Code Input */}
          <TextField
            fullWidth
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
            onKeyPress={handleKeyPress}
            placeholder="••••"
            disabled={loading}
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(201, 169, 98, 0.2)',
                borderRadius: 1,
                color: '#ffffff',
                fontFamily: 'monospace',
                fontSize: '1.8rem',
                letterSpacing: '0.5em',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'rgba(201, 169, 98, 0.4)',
                  bgcolor: 'rgba(0,0,0,0.4)',
                },
                '&.Mui-focused': {
                  borderColor: 'rgba(201, 169, 98, 0.6)',
                  boxShadow: '0 0 0 1px rgba(201, 169, 98, 0.1)',
                  bgcolor: 'rgba(0,0,0,0.5)',
                },
                '& input': {
                  textAlign: 'center',
                  padding: '20px 14px',
                  letterSpacing: '0.5em',
                  '&::placeholder': {
                    color: 'rgba(255,255,255,0.2)',
                    opacity: 1,
                  },
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
            inputProps={{
              maxLength: 4,
              inputMode: 'numeric',
              pattern: '[0-9]*',
              autoComplete: 'off',
              autoCorrect: 'off',
              spellCheck: 'false',
            }}
          />

           {/* Submit Button - More Mysterious */}
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            disabled={loading || accessCode.length !== 4}
            sx={{
              border: '1px solid rgba(201, 169, 98, 0.3)',
              color: 'rgba(201, 169, 98, 0.9)',
              py: 1.8,
              borderRadius: 1,
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 400,
              fontSize: '0.95rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              transition: 'all 0.4s ease',
              background: 'linear-gradient(to right, rgba(201, 169, 98, 0.05), rgba(201, 169, 98, 0.02))',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(201, 169, 98, 0.1), transparent)',
                transition: 'left 0.7s ease',
              },
              '&:hover': {
                borderColor: 'rgba(201, 169, 98, 0.5)',
                color: 'rgba(201, 169, 98, 1)',
                background: 'linear-gradient(to right, rgba(201, 169, 98, 0.08), rgba(201, 169, 98, 0.04))',
                transform: 'translateY(-1px)',
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                '&::before': {
                  left: '100%',
                },
              },
              '&:disabled': {
                borderColor: 'rgba(201, 169, 98, 0.1)',
                color: 'rgba(255,255,255,0.2)',
                background: 'rgba(0,0,0,0.1)',
              },
            }}
          >
            {loading ? (
              <CircularProgress size={20} sx={{ color: 'rgba(201, 169, 98, 0.7)' }} />
            ) : (
              <>
                Verify & Proceed
                <ArrowForwardIcon sx={{ ml: 1.5, fontSize: 18, opacity: 0.8 }} />
              </>
            )}
          </Button>

          {/* Mysterious Hint */}
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.25)',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              textAlign: 'center',
              mt: 4,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Four digits • Numerical only
          </Typography>
        </Box>

        {/* Mysterious Footer */}
        <Box sx={{ 
          mt: 8, 
          textAlign: 'center',
          animation: 'fadeIn 1.5s ease-out 0.8s both',
          opacity: 0.6,
        }}>
          <Typography
            sx={{
              color: 'rgba(255,255,255,0.2)',
              fontFamily: 'monospace',
              fontSize: '0.7rem',
              maxWidth: 400,
              lineHeight: 1.8,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Restricted access • Authorized personnel only
          </Typography>
          <Box sx={{ 
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            opacity: 0.4,
          }}>
            <Box sx={{ width: 20, height: 1, bgcolor: 'rgba(201, 169, 98, 0.3)' }} />
            <Typography
              sx={{
                color: 'rgba(201, 169, 98, 0.3)',
                fontFamily: '"Vazir", serif',
                fontSize: '0.8rem',
              }}
            >
              حكمة
            </Typography>
            <Box sx={{ width: 20, height: 1, bgcolor: 'rgba(201, 169, 98, 0.3)' }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// Main page component with Suspense boundary
export default function AccessPage() {
  return (
    <Suspense fallback={
      <Box sx={{ 
        minHeight: '100vh', 
        bgcolor: '#0d1f18',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <CircularProgress sx={{ color: '#c9a962' }} />
      </Box>
    }>
      <AccessForm />
    </Suspense>
  );
}