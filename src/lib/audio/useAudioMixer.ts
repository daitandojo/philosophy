'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type AudioMood = 'mystical' | 'rational' | 'contemplative' | 'contemporary';

interface AudioMixerState {
  isPlaying: boolean;
  isLoaded: boolean;
  mood: AudioMood;
  volume: number;
}

// Note: Tone.js requires browser environment
let Tone: typeof import('tone') | null = null;

export function useAudioMixer() {
  const [state, setState] = useState<AudioMixerState>({
    isPlaying: false,
    isLoaded: false,
    mood: 'mystical',
    volume: -12,
  });
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const compressorRef = useRef<DynamicsCompressorNode | null>(null);
  const initializedRef = useRef(false);

  const initAudio = useCallback(async () => {
    if (initializedRef.current || typeof window === 'undefined') return;
    
    try {
      // Dynamically import Tone.js only on client
      const toneModule = await import('tone');
      Tone = toneModule;
      await Tone.start();
      
      // Create audio context
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create compressor for sidechain effect
      compressorRef.current = audioContextRef.current.createDynamicsCompressor();
      compressorRef.current.threshold.value = -24;
      compressorRef.current.ratio.value = 4;
      compressorRef.current.connect(audioContextRef.current.destination);
      
      // Create gain node
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = Tone.dbToGain(state.volume);
      gainNodeRef.current.connect(compressorRef.current);
      
      initializedRef.current = true;
      setState(s => ({ ...s, isLoaded: true }));
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  }, [state.volume]);

  const loadVoice = useCallback(async (audioUrl: string) => {
    await initAudio();
    
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current = null;
    }
    
    voiceAudioRef.current = new Audio(audioUrl);
    voiceAudioRef.current.crossOrigin = 'anonymous';
  }, [initAudio]);

  const loadBGM = useCallback(async (mood: AudioMood) => {
    await initAudio();
    
    if (bgmAudioRef.current) {
      bgmAudioRef.current.pause();
      bgmAudioRef.current = null;
    }
    
    // Map moods to BGM files
    const bgmFiles: Record<AudioMood, string> = {
      mystical: '/audio/bgm-ney-mood.mp3',
      rational: '/audio/bgm-soft-piano.mp3',
      contemplative: '/audio/bgm-ambient-strings.mp3',
      contemporary: '/audio/bgm-minimal-electronic.mp3',
    };
    
    // Create audio element for BGM
    bgmAudioRef.current = new Audio(bgmFiles[mood]);
    bgmAudioRef.current.crossOrigin = 'anonymous';
    bgmAudioRef.current.loop = true;
    
    // We'll connect through Tone.js when available
    setState(s => ({ ...s, mood }));
  }, [initAudio]);

  const playVoice = useCallback(async () => {
    if (!voiceAudioRef.current) return;
    
    // Start BGM with lower volume (ducking effect)
    if (bgmAudioRef.current) {
      bgmAudioRef.current.volume = 0.15;
      try {
        await bgmAudioRef.current.play();
      } catch (e) {
        console.log('BGM not available');
      }
    }
    
    try {
      await voiceAudioRef.current.play();
      
      voiceAudioRef.current.onended = () => {
        // Restore BGM volume
        if (bgmAudioRef.current) {
          bgmAudioRef.current.volume = 0.4;
        }
        setState(s => ({ ...s, isPlaying: false }));
      };
      
      setState(s => ({ ...s, isPlaying: true }));
    } catch (error) {
      console.error('Failed to play voice:', error);
    }
  }, []);

  const stopVoice = useCallback(() => {
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current.currentTime = 0;
    }
    if (bgmAudioRef.current) {
      bgmAudioRef.current.pause();
    }
    setState(s => ({ ...s, isPlaying: false }));
  }, []);

  const setVolume = useCallback((db: number) => {
    if (gainNodeRef.current) {
      const linearGain = Math.pow(10, db / 20);
      gainNodeRef.current.gain.value = linearGain;
    }
    setState(s => ({ ...s, volume: db }));
  }, []);

  const setMood = useCallback(async (mood: AudioMood) => {
    setState(s => ({ ...s, mood }));
    await loadBGM(mood);
  }, [loadBGM]);

  const togglePlay = useCallback(async () => {
    await initAudio();
    
    if (state.isPlaying) {
      stopVoice();
    } else {
      await playVoice();
    }
  }, [state.isPlaying, initAudio, playVoice, stopVoice]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
      }
      if (bgmAudioRef.current) {
        bgmAudioRef.current.pause();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    ...state,
    initAudio,
    loadVoice,
    loadBGM,
    playVoice,
    stopVoice,
    setVolume,
    setMood,
    togglePlay,
  };
}
