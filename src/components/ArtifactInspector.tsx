'use client';

import { useState, Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Stage, 
  PresentationControls, 
  Html, 
  useProgress,
  Float,
  MeshDistortMaterial,
  Environment,
  ContactShadows,
} from '@react-three/drei';
import { Box, Typography, CircularProgress, IconButton, Chip } from '@mui/material';
import * as THREE from 'three';

interface Artifact {
  id: string;
  name: string;
  namePersian: string;
  description: string;
  quote?: string;
  year?: string;
}

const artifacts: Artifact[] = [
  {
    id: 'dervish-hat',
    name: 'Dervish Sikke',
    namePersian: 'سکه دراویش',
    description: 'The conical hat worn by whirling dervishes, symbolizing the tombstone of the ego and the crown of spiritual enlightenment. Made from folded cloth, it represents the shape of the cosmos.',
    quote: 'Die before you die.',
    year: '13th Century',
  },
  {
    id: 'astrolabe',
    name: 'Astrolabe',
    namePersian: 'اسطرلاب',
    description: 'An ancient astronomical instrument used to determine the positions of celestial bodies. Persian astronomers refined this device to map the heavens and guide seekers of knowledge.',
    quote: 'The universe is a mirror of the soul.',
    year: '11th Century',
  },
  {
    id: 'goblet',
    name: 'Turquoise Goblet',
    namePersian: 'جام فیروزه‌ای',
    description: 'The vessel of the heart, filled with the wine of divine love. The turquoise represents the color of heaven in Persian mysticism, symbolizing the soul\'s longing for the divine.',
    quote: 'The wound is the place where the Light enters you.',
    year: '16th Century',
  },
  {
    id: 'book',
    name: 'Divan of Hafez',
    namePersian: 'دیوان حافظ',
    description: 'The collected poems of Hafez, the great Persian poet. His ghazals speak of love, wine, and the divine, offering guidance to those who seek wisdom in the shadows.',
    quote: 'I am a lover of the shadow, for in the shadow I find my beloved.',
    year: '14th Century',
  },
];

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <Box sx={{ textAlign: 'center', color: '#c9a962' }}>
        <CircularProgress 
          size={50} 
          sx={{ color: '#c9a962', mb: 2 }}
          variant="determinate" 
          value={progress} 
        />
        <Typography variant="caption" sx={{ color: '#c9a962', fontFamily: '"Vazir", serif' }}>
          Loading Artifact...
        </Typography>
      </Box>
    </Html>
  );
}

function DervishHat({ }: { }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });
  
  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Main cone */}
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.9, 1.4, 32]} />
        <meshStandardMaterial 
          color="#d4a574" 
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      {/* Fold lines */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} position={[0, 0.8, 0]} rotation={[0, (i * Math.PI) / 3, 0]}>
          <planeGeometry args={[0.02, 1.3]} />
          <meshStandardMaterial color="#b8956a" roughness={0.9} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* Top flat disc */}
      <mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#c9a962" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Base ring */}
      <mesh position={[0, 0.05, 0]}>
        <torusGeometry args={[0.85, 0.08, 16, 32]} />
        <meshStandardMaterial color="#c9a962" roughness={0.4} metalness={0.4} />
      </mesh>
      {/* Decorative band */}
      <mesh position={[0, 0.4, 0]}>
        <torusGeometry args={[0.88, 0.03, 16, 32]} />
        <meshStandardMaterial color="#c9a962" roughness={0.5} metalness={0.3} />
      </mesh>
    </group>
  );
}

function Astrolabe({ }: { }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Main ring (mater) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.2, 0.12, 16, 64]} />
        <meshStandardMaterial color="#c9a962" roughness={0.3} metalness={0.6} />
      </mesh>
      
      {/* Inner ring -->
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.08, 16, 64]} />
        <meshStandardMaterial color="#d4af37" roughness={0.35} metalness={0.55} />
      </mesh>
      
      {/* Climate plate */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.02]}>
        <ringGeometry args={[0.5, 0.85, 64]} />
        <meshStandardMaterial color="#1a237e" roughness={0.6} metalness={0.2} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Rete (star pointer framework) */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <torusGeometry args={[0.7, 0.02, 8, 64]} />
          <meshStandardMaterial color="#c9a962" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.7, 0.02, 8, 64]} />
          <meshStandardMaterial color="#c9a962" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Ecliptic ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.015, 8, 32]} />
          <meshStandardMaterial color="#e53935" roughness={0.3} metalness={0.5} />
        </mesh>
      </group>
      
      {/* Center pin */}
      <mesh position={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 16]} />
        <meshStandardMaterial color="#c9a962" roughness={0.3} metalness={0.7} />
      </mesh>
      
      {/* Throne (attachment) */}
      <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.15, 0.04, 8, 16]} />
        <meshStandardMaterial color="#c9a962" roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

function TurquoiseGoblet({ }: { }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Cup body */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 1.2, 32, 1, true]} />
        <meshStandardMaterial 
          color="#40e0d0" 
          roughness={0.2} 
          metalness={0.4}
          side={THREE.DoubleSide}
          transparent
          opacity={0.85}
        />
      </mesh>
      
      {/* Base inside - wine */}
      <mesh position={[0, 0.4, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.45, 32]} />
        <meshStandardMaterial 
          color="#8b0000" 
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      
      {/* Stem */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.8, 16]} />
        <meshStandardMaterial color="#c9a962" roughness={0.3} metalness={0.6} />
      </mesh>
      
      {/* Base plate */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.5, 0.4, 0.1, 32]} />
        <meshStandardMaterial color="#c9a962" roughness={0.3} metalness={0.6} />
      </mesh>
      
      {/* Rim */}
      <mesh position={[0, 1.3, 0]}>
        <torusGeometry args={[0.5, 0.04, 16, 32]} />
        <meshStandardMaterial color="#c9a962" roughness={0.3} metalness={0.6} />
      </mesh>
      
      {/* Decorative bands on cup */}
      <mesh position={[0, 1.0, 0]}>
        <torusGeometry args={[0.6, 0.02, 8, 32]} />
        <meshStandardMaterial color="#c9a962" roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <torusGeometry args={[0.65, 0.02, 8, 32]} />
        <meshStandardMaterial color="#c9a962" roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
}

function AncientBook({ }: { }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Book cover - front */}
      <mesh position={[0, 0, 0.15]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.6, 2, 0.08]} />
        <meshStandardMaterial color="#5d4037" roughness={0.8} />
      </mesh>
      
      {/* Book cover - back */}
      <mesh position={[0, 0, -0.15]} rotation={[0, 0, 0]}>
        <boxGeometry args={[1.6, 2, 0.08]} />
        <meshStandardMaterial color="#4e342e" roughness={0.8} />
      </mesh>
      
      {/* Pages */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.4, 1.8, 0.25]} />
        <meshStandardMaterial color="#f5f5dc" roughness={0.9} />
      </mesh>
      
      {/* Spine */}
      <mesh position={[-0.8, 0, 0]}>
        <boxGeometry args={[0.08, 1.9, 0.35]} />
        <meshStandardMaterial color="#3e2723" roughness={0.8} />
      </mesh>
      
      {/* Gold corners */}
      {[
        [0.7, 0.9, 0.16],
        [-0.7, 0.9, 0.16],
        [0.7, -0.9, 0.16],
        [-0.7, -0.9, 0.16],
      ].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <boxGeometry args={[0.15, 0.15, 0.02]} />
          <meshStandardMaterial color="#c9a962" roughness={0.3} metalness={0.6} />
        </mesh>
      ))}
      
      {/* Decorative center piece */}
      <mesh position={[0, 0.3, 0.17]}>
        <circleGeometry args={[0.25, 32]} />
        <meshStandardMaterial color="#c9a962" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}

function ArtifactModel({ type }: { type: string }) {
  switch (type) {
    case 'dervish-hat':
      return <DervishHat />;
    case 'astrolabe':
      return <Astrolabe />;
    case 'goblet':
      return <TurquoiseGoblet />;
    case 'book':
      return <AncientBook />;
    default:
      return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh>
            <icosahedronGeometry args={[1, 1]} />
            <MeshDistortMaterial 
              color="#c9a962" 
              distort={0.3} 
              speed={2}
              metalness={0.5}
              roughness={0.3}
            />
          </mesh>
        </Float>
      );
  }
}

export function ArtifactInspector() {
  const [selectedArtifact, setSelectedArtifact] = useState(artifacts[0]);

  return (
    <Box sx={{ width: '100%', maxWidth: 1000, mx: 'auto' }}>
      {/* Artifact Selector */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        justifyContent: 'center', 
        mb: 4,
        flexWrap: 'wrap',
        px: 2,
      }}>
        {artifacts.map((artifact) => (
          <Box
            key={artifact.id}
            onClick={() => setSelectedArtifact(artifact)}
            sx={{
              p: 2,
              borderRadius: 2,
              cursor: 'pointer',
              background: selectedArtifact.id === artifact.id 
                ? 'rgba(201, 169, 98, 0.2)' 
                : 'rgba(0, 0, 0, 0.3)',
              border: selectedArtifact.id === artifact.id 
                ? '1px solid #c9a962' 
                : '1px solid rgba(201, 169, 98, 0.15)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(201, 169, 98, 0.15)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            <Typography 
              sx={{ 
                color: '#c9a962',
                fontFamily: '"Vazir", serif',
                fontSize: '1rem',
                fontWeight: selectedArtifact.id === artifact.id ? 600 : 400,
              }}
            >
              {artifact.name}
            </Typography>
            <Typography 
              sx={{ 
                color: 'rgba(201, 169, 98, 0.6)',
                fontFamily: '"Vazir", serif',
                fontSize: '0.75rem',
                direction: 'rtl',
              }}
            >
              {artifact.namePersian}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 3D Viewer */}
      <Box sx={{ 
        height: { xs: 350, md: 500 }, 
        borderRadius: 3,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%)',
        border: '1px solid rgba(201, 169, 98, 0.2)',
        position: 'relative',
      }}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 45 }}>
          <Suspense fallback={<Loader />}>
            <Environment preset="city" />
            <Stage environment="city" intensity={0.4} adjustCamera={false}>
              <PresentationControls
                speed={1.5}
                global
                polar={[-0.2, Math.PI / 3]}
                rotation={[Math.PI / 10, Math.PI / 4, 0]}
              >
                <ArtifactModel type={selectedArtifact.id} />
              </PresentationControls>
            </Stage>
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          </Suspense>
        </Canvas>
        
        {/* Year badge */}
        {selectedArtifact.year && (
          <Chip 
            label={selectedArtifact.year}
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              bgcolor: 'rgba(0,0,0,0.6)',
              color: '#c9a962',
              border: '1px solid rgba(201,169,98,0.3)',
              fontFamily: '"Vazir", serif',
            }}
          />
        )}
      </Box>

      {/* Artifact Info */}
      <Box sx={{ mt: 4, textAlign: 'center', px: 2 }}>
        <Typography 
          sx={{ 
            color: '#c9a962',
            fontFamily: '"Vazir", serif',
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 300,
            mb: 0.5,
          }}
        >
          {selectedArtifact.name}
        </Typography>
        <Typography 
          sx={{ 
            color: 'rgba(201, 169, 98, 0.7)',
            fontFamily: '"Vazir", serif',
            fontSize: '1.1rem',
            direction: 'rtl',
            mb: 3,
          }}
        >
          {selectedArtifact.namePersian}
        </Typography>
        <Typography 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.8)',
            fontFamily: '"Vazir", serif',
            fontSize: { xs: '0.9rem', md: '1rem' },
            lineHeight: 2,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          {selectedArtifact.description}
        </Typography>
        
        {selectedArtifact.quote && (
          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography 
              sx={{ 
                color: '#c9a962',
                fontFamily: '"Vazir", serif',
                fontSize: '1.2rem',
                fontStyle: 'italic',
                mb: 1,
              }}
            >
              "{selectedArtifact.quote}"
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ArtifactInspector;
