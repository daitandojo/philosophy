'use client';

import { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
  maxLife: number;
}

export default function MicroInteractions() {
  const theme = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const savedPreference = localStorage.getItem('particlesEnabled');
    
    if (savedPreference === 'false' || prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse movement handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
      
      if (isEnabled) {
        // Create subtle particles on mouse move
        if (Math.random() > 0.5) { // 50% chance per frame
          particlesRef.current.push({
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 1,
            speedY: (Math.random() - 0.5) * 1,
            color: theme.palette.primary.main,
            life: 60,
            maxLife: 60
          });
        }
      }
    };

    // Click handler for special effects
    const handleClick = (e: MouseEvent) => {
      if (!isEnabled) return;

      // Create subtle burst of particles on click
      for (let i = 0; i < 8; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 0.5;
        
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 3 + 1,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          color: theme.palette.secondary.main,
          life: 80,
          maxLife: 80
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Animation loop
    let animationFrameId: number;
    
    const animate = () => {
      if (!ctx || !canvas) return;

      // Clear with slight fade for trail effect
      ctx.fillStyle = 'rgba(10, 26, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.life -= 1;

        // Apply gravity
        particle.speedY += 0.05;

        // Draw particle
        if (particle.life > 0) {
          const alpha = particle.life / particle.maxLife;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
          ctx.fill();

          // Draw glow
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = particle.color.replace(')', `, ${alpha * 0.3})`).replace('rgb', 'rgba');
          ctx.fill();
          
          return true;
        }
        return false;
      });

      // Draw mouse trail
      if (isEnabled && particlesRef.current.length < 100) {
        const { x, y } = mousePositionRef.current;
        
        // Create subtle trail particles
        if (Math.random() > 0.7) {
          particlesRef.current.push({
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: theme.palette.accent.main,
            life: 50,
            maxLife: 50
          });
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isEnabled]);

  const toggleParticles = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    localStorage.setItem('particlesEnabled', newState.toString());
    
    if (!newState) {
      particlesRef.current = [];
    }
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: isEnabled ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      <button
        onClick={toggleParticles}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 9999,
          background: theme.palette.primary.main,
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: 40,
          height: 40,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
        }}
        title={isEnabled ? 'Disable particle effects' : 'Enable particle effects'}
        aria-label={isEnabled ? 'Disable particle effects' : 'Enable particle effects'}
      >
        {isEnabled ? '✨' : '🌟'}
      </button>
    </>
  );
}