'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uIntensity;
  varying vec2 vUv;

  // Simplex noise functions
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    
    // Slow moving noise for divine light effect
    float noise1 = snoise(uv * 2.0 + uTime * 0.05) * 0.5 + 0.5;
    float noise2 = snoise(uv * 4.0 - uTime * 0.03) * 0.5 + 0.5;
    float noise3 = snoise(uv * 8.0 + uTime * 0.02) * 0.5 + 0.5;
    
    // Layer the noises
    float combinedNoise = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
    
    // Create rays of light
    float rays = sin(uv.x * 10.0 + combinedNoise * 3.0 + uTime * 0.1) * 0.5 + 0.5;
    rays *= combinedNoise;
    
    // Color palette - deep green/black with golden light
    vec3 darkColor = vec3(0.02, 0.04, 0.03);
    vec3 midColor = vec3(0.05, 0.08, 0.06);
    vec3 lightColor = vec3(0.79, 0.66, 0.38); // Gold
    
    // Mix colors based on noise
    vec3 color = mix(darkColor, midColor, combinedNoise * 0.5);
    color = mix(color, lightColor, rays * uIntensity * 0.15);
    
    // Add subtle dust motes
    float motes = snoise(uv * 50.0 + uTime * 0.2);
    motes = smoothstep(0.7, 0.9, motes) * uIntensity * 0.3;
    color += vec3(motes) * lightColor;
    
    // Vignette
    float vignette = 1.0 - length((uv - 0.5) * 1.5);
    vignette = smoothstep(0.0, 1.0, vignette);
    color *= vignette * 0.7 + 0.3;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function DivineLightPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(viewport.width, viewport.height) },
    uIntensity: { value: 1.0 },
  }), [viewport]);
  
  useFrame((state) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = state.clock.elapsedTime;
    }
  });
  
  return (
    <mesh ref={meshRef} scale={[viewport.width * 2, viewport.height * 2, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

function FloatingGeometry() {
  const count = 50;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return pos;
  }, []);
  
  const rotations = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * Math.PI,
      y: Math.random() * Math.PI,
      z: Math.random() * Math.PI,
    }));
  }, []);
  
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Float
          key={i}
          speed={0.5 + Math.random() * 0.5}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <mesh position={[
            positions[i * 3],
            positions[i * 3 + 1],
            positions[i * 3 + 2]
          ]}>
            <tetrahedronGeometry args={[0.08 + Math.random() * 0.06]} />
            <meshBasicMaterial
              color="#c9a962"
              transparent
              opacity={0.15 + Math.random() * 0.1}
              wireframe
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

interface IlluminatedBackgroundProps {
  intensity?: number;
}

export function IlluminatedBackground({ intensity = 1 }: IlluminatedBackgroundProps) {
  const [dpr, setDpr] = useState(1.5);
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      pointerEvents: 'none',
    }}>
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
        >
          <DivineLightPlane />
          <FloatingGeometry />
        </PerformanceMonitor>
      </Canvas>
    </div>
  );
}

export default IlluminatedBackground;
