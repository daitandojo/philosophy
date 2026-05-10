'use client';
import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Alert,
} from '@mui/material';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import ThreeDRotationIcon from '@mui/icons-material/ThreeDRotation';

interface ARModel {
  id: string;
  title: string;
  philosopher: string;
  description: string;
  type: 'statue' | 'manuscript' | 'calligraphy' | 'symbol';
}

const arModels: ARModel[] = [
  { id: 'rumi-statue', title: 'Rumi Statue', philosopher: 'Rumi', description: 'Bronze statue of Rumi in Konya', type: 'statue' },
  { id: 'hafez-bust', title: 'Hafez Bust', philosopher: 'Hafez', description: 'Bust of Hafez from Shiraz', type: 'statue' },
  { id: 'masnavi-ms', title: 'Masnavi Manuscript', philosopher: 'Rumi', description: 'Historical manuscript page', type: 'manuscript' },
  { id: 'divan-calligraphy', title: 'Divan Calligraphy', philosopher: 'Hafez', description: 'Handwritten ghazal', type: 'calligraphy' },
  { id: 'sun-symbol', title: 'Sun Symbol', philosopher: 'All', description: 'Universal Sufi symbol', type: 'symbol' },
];

export default function ARPage() {
  const [isARSupported, setIsARSupported] = useState<boolean | null>(null);
  const [selectedModel, setSelectedModel] = useState<ARModel | null>(null);
  const [isViewing, setIsViewing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkAR = async () => {
        const xr = (navigator as unknown as { xr?: unknown }).xr;
        if (xr) {
          try {
            const supported = await (xr as { isSessionSupported: (feature: string) => Promise<boolean> }).isSessionSupported('immersive-ar');
            setIsARSupported(supported);
          } catch {
            setIsARSupported(false);
          }
        } else {
          setIsARSupported(false);
        }
      };
      checkAR();
    }
  }, []);

  const startAR = async (model: ARModel) => {
    const xr = navigator as unknown as { xr?: { requestSession: (mode: string, options: object) => Promise<unknown> } };
    if (!xr.xr) {
      alert('WebXR not supported');
      return;
    }

    try {
      const session = await xr.xr.requestSession('immersive-ar', {
        requiredFeatures: ['local-floor'],
      });
      
      (session as { end: () => Promise<void> }).end();
      setSelectedModel(model);
      setIsViewing(true);
    } catch (error) {
      console.error('AR Error:', error);
      setSelectedModel(model);
      setIsViewing(true);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
          Augmented Reality Experience
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Explore Persian philosophy in augmented reality
        </Typography>

        {isARSupported === false && (
          <Alert severity="info" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
            AR is not directly supported on this device. Use the 3D viewer below for an immersive experience.
          </Alert>
        )}
      </Box>

      {isViewing && selectedModel ? (
        <Box>
          <Button 
            variant="outlined" 
            onClick={() => setIsViewing(false)}
            sx={{ mb: 3 }}
          >
            Back to AR Gallery
          </Button>
          
          <Card sx={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <ThreeDRotationIcon sx={{ fontSize: 100, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" sx={{ mb: 2 }}>
                {selectedModel.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {selectedModel.description}
              </Typography>
              <Chip label={selectedModel.philosopher} color="primary" sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                {isARSupported 
                  ? 'Point your camera at a flat surface to place this model'
                  : '3D viewer mode - rotate to explore'}
              </Typography>
              <Box sx={{ mt: 4, p: 4, bgcolor: 'rgba(46, 74, 61, 0.05)', borderRadius: 2 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Demo Mode
                </Typography>
                <Typography variant="body2">
                  In a production environment, this would display a 3D model using WebXR or model-viewer.
                  The {selectedModel.title} would appear in your space as an interactive 3D object.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {arModels.map((model) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={model.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 },
                }}
                onClick={() => startAR(model)}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <ViewInArIcon color="primary" />
                    <Chip size="small" label={model.type} />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {model.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {model.description}
                  </Typography>
                  <Chip size="small" label={model.philosopher} variant="outlined" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ mt: 6, p: 4, bgcolor: 'rgba(46, 74, 61, 0.08)', borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          How AR Works
        </Typography>
        <Grid container spacing={2}>
          {[
            'Select a 3D model from the gallery',
            'Point your device at a flat surface',
            'The model will appear in your space',
            'Walk around and explore from all angles',
            'Tap to interact with the model',
          ].map((step, i) => (
            <Grid size={{ xs: 12, sm: 6 }} key={i}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip label={i + 1} size="small" color="primary" />
                <Typography variant="body2">{step}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export const dynamic = "force-dynamic";
