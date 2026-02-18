'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { IconButton, Tooltip, Box, Slider, Popover, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';

interface VoiceSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice: SpeechSynthesisVoice | null;
}

interface VoiceOutputProps {
  text: string;
  language?: string;
  autoPlay?: boolean;
}

export default function VoiceOutput({ 
  text, 
  language = 'en-US',
  autoPlay = false 
}: VoiceOutputProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [settingsAnchor, setSettingsAnchor] = useState<HTMLElement | null>(null);
  const [settings, setSettings] = useState<VoiceSettings>({
    rate: 0.9,
    pitch: 1,
    volume: 1,
    voice: null,
  });
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const isSpeechSupported = 'speechSynthesis' in window;
    setIsSupported(isSpeechSupported);

    if (isSpeechSupported) {
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        const defaultVoice = availableVoices.find(v => v.lang.startsWith(language.split('-')[0])) 
          || availableVoices[0];
        if (defaultVoice && !settings.voice) {
          setSettings(prev => ({ ...prev, voice: defaultVoice }));
        }
      };

      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;

      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, [language]);

  const speak = useCallback(() => {
    if (!isSupported || !text) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;
    
    if (settings.voice) {
      utterance.voice = settings.voice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported, text, settings]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, [isSupported]);

  const togglePause = useCallback(() => {
    if (!isSupported) return;
    
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSupported, isPaused]);

  useEffect(() => {
    if (autoPlay && text && isSupported && !isSpeaking) {
      speak();
    }
  }, [text, autoPlay, isSupported, isSpeaking, speak]);

  const handleSettingsChange = (key: keyof VoiceSettings, value: number | SpeechSynthesisVoice | null) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (!isSupported) {
    return null;
  }

  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
      {isSpeaking ? (
        <>
          {isPaused ? (
            <Tooltip title="Resume">
              <IconButton onClick={togglePause} size="small" color="primary">
                <PlayArrowIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Pause">
              <IconButton onClick={togglePause} size="small" color="primary">
                <PauseIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Stop">
            <IconButton onClick={stop} size="small" color="error">
              <VolumeOffIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Read aloud">
          <IconButton onClick={speak} size="small" color="default">
            <VolumeUpIcon />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title="Voice settings">
        <IconButton 
          onClick={(e) => setSettingsAnchor(e.currentTarget)} 
          size="small"
          sx={{ ml: 0.5 }}
        >
          <SettingsIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Popover
        open={Boolean(settingsAnchor)}
        anchorEl={settingsAnchor}
        onClose={() => setSettingsAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Box sx={{ p: 2, width: 250 }}>
          <Typography variant="subtitle2" gutterBottom>Voice Settings</Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Speed: {settings.rate.toFixed(1)}x
            </Typography>
            <Slider
              value={settings.rate}
              min={0.5}
              max={1.5}
              step={0.1}
              onChange={(_, value) => handleSettingsChange('rate', value as number)}
              size="small"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="caption" color="text.secondary">
              Volume: {Math.round(settings.volume * 100)}%
            </Typography>
            <Slider
              value={settings.volume}
              min={0}
              max={1}
              step={0.1}
              onChange={(_, value) => handleSettingsChange('volume', value as number)}
              size="small"
            />
          </Box>

          {voices.length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Voice
              </Typography>
              <select
                value={settings.voice?.name || ''}
                onChange={(e) => {
                  const voice = voices.find(v => v.name === e.target.value);
                  handleSettingsChange('voice', voice || null);
                }}
                style={{ width: '100%', padding: '4px', marginTop: '4px' }}
              >
                {voices.map(voice => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </Box>
          )}
        </Box>
      </Popover>
    </Box>
  );
}
