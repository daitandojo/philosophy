'use client';

import { useEffect, useRef } from 'react';

type SoundEffect = 'pageTurn' | 'bell' | 'success' | 'error' | 'click' | 'hover';

class SoundManager {
  private audioContext: AudioContext | null = null;
  private isEnabled = true;
  private volume = 0.3;

  constructor() {
    if (typeof window !== 'undefined') {
      // Check user preference
      const saved = localStorage.getItem('soundEffectsEnabled');
      this.isEnabled = saved !== 'false';
      
      // Check reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        this.isEnabled = false;
      }
    }
  }

  getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    return this.audioContext;
  }

  private createOscillator(frequency: number, type: OscillatorType = 'sine') {
    const audioContext = this.getAudioContext();
    if (!audioContext || !this.isEnabled) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;

    // Envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
  }

  private createNoise(duration: number = 0.2) {
    const audioContext = this.getAudioContext();
    if (!audioContext || !this.isEnabled) return;

    const bufferSize = audioContext.sampleRate * duration;
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const source = audioContext.createBufferSource();
    const gainNode = audioContext.createGain();

    source.buffer = buffer;
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Envelope
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.5, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);

    source.start();
    source.stop(audioContext.currentTime + duration);
  }

  play(effect: SoundEffect) {
    if (!this.isEnabled) return;

    const audioContext = this.getAudioContext();
    if (!audioContext) return;

    // Resume audio context if suspended (browser policy)
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    switch (effect) {
      case 'pageTurn':
        this.createNoise(0.3);
        this.createOscillator(150, 'sawtooth');
        break;
      
      case 'bell':
        this.createOscillator(880, 'sine');
        setTimeout(() => {
          this.createOscillator(660, 'sine');
        }, 100);
        setTimeout(() => {
          this.createOscillator(440, 'sine');
        }, 200);
        break;
      
      case 'success':
        this.createOscillator(523.25, 'triangle'); // C5
        setTimeout(() => {
          this.createOscillator(659.25, 'triangle'); // E5
        }, 100);
        setTimeout(() => {
          this.createOscillator(783.99, 'triangle'); // G5
        }, 200);
        break;
      
      case 'error':
        this.createOscillator(220, 'square');
        setTimeout(() => {
          this.createOscillator(165, 'square');
        }, 150);
        break;
      
      case 'click':
        this.createOscillator(330, 'sine');
        break;
      
      case 'hover':
        this.createOscillator(440, 'sine');
        break;
    }
  }

  toggle(enabled?: boolean) {
    if (enabled !== undefined) {
      this.isEnabled = enabled;
    } else {
      this.isEnabled = !this.isEnabled;
    }
    
    localStorage.setItem('soundEffectsEnabled', this.isEnabled.toString());
    return this.isEnabled;
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  getStatus() {
    return {
      enabled: this.isEnabled,
      volume: this.volume
    };
  }
}

// Singleton instance
const soundManager = new SoundManager();

// React hook
export function useSoundEffects() {
  const managerRef = useRef(soundManager);

  useEffect(() => {
    // Initialize audio context on user interaction (browser policy)
    const handleFirstInteraction = () => {
      managerRef.current.getAudioContext();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return {
    play: (effect: SoundEffect) => managerRef.current.play(effect),
    toggle: (enabled?: boolean) => managerRef.current.toggle(enabled),
    setVolume: (volume: number) => managerRef.current.setVolume(volume),
    getStatus: () => managerRef.current.getStatus()
  };
}

export default soundManager;