'use client';
export const dynamic = 'force-dynamic';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Chip,
  CircularProgress,
  Stack,
  Container,
} from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SendIcon from '@mui/icons-material/Send';
import { HeroPattern, CornerDecoration, FloatingMotif } from '@/components/SVGDecorations';
import { triggerHaptic } from '@/lib/haptic';

interface DebateMessage {
  role: 'user' | 'rationalist' | 'mystic';
  content: string;
}

const DEBATE_TOPICS = [
  'What is the nature of truth?',
  'Does love transcend reason?',
  'What is the purpose of human existence?',
  'Can knowledge and faith coexist?',
  'What is the relationship between the self and the divine?',
  'Is suffering necessary for spiritual growth?',
  'What is the nature of free will?',
  'Can beauty be rationally understood?',
];

const RATIONALIST_COLOR = '#4a90d9';
const MYSTIC_COLOR = '#c9a962';

export default function DebatePage() {
  const [topic, setTopic] = useState('');
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [loading, setLoading] = useState<'rationalist' | 'mystic' | null>(null);
  const [streamingRationalist, setStreamingRationalist] = useState('');
  const [streamingMystic, setStreamingMystic] = useState('');
  const [phase, setPhase] = useState<'topic' | 'debating'>('topic');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages, streamingRationalist, streamingMystic, scrollToBottom]);

  const startDebate = () => {
    if (!topic.trim()) return;
    triggerHaptic(10);
    setPhase('debating');
    setMessages([
      { role: 'rationalist', content: `Let us examine this question through the lens of reason and logic. The topic "${topic}" invites systematic analysis.` },
      { role: 'mystic', content: `Ah, beloved seeker! This question calls not to the mind alone, but to the heart that burns with longing.` },
    ]);
  };

  const getHistory = (): { role: string; content: string }[] =>
    messages.map(m => ({ role: m.role, content: m.content }));

  const callDebater = async (side: 'rationalist' | 'mystic') => {
    if (loading) return;
    setLoading(side);
    if (side === 'rationalist') setStreamingRationalist('');
    else setStreamingMystic('');

    try {
      const res = await fetch(`/api/debate/${side}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, history: getHistory(), userMessage: '' }),
      });

      if (!res.ok || !res.body) throw new Error('Debate request failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let content = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(l => l.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]' || JSON.parse(data).done) break;
            const parsed = JSON.parse(data);
            if (parsed.content) {
              content += parsed.content;
              if (side === 'rationalist') setStreamingRationalist(content);
              else setStreamingMystic(content);
            }
          }
        }
      }

      setMessages(prev => [...prev, { role: side, content }]);
    } catch (err) {
      console.error(`Debate ${side} error:`, err);
    } finally {
      setLoading(null);
      setStreamingRationalist('');
      setStreamingMystic('');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#0d1f18', color: '#f5f5f5' }}>
      <Box sx={{ position: 'relative', bgcolor: '#0d1f18', borderBottom: '1px solid rgba(201,169,98,0.12)', py: 3 }}>
        <HeroPattern color="#c9a962" opacity={0.06} />
        <CornerDecoration position="top-left" color="#c9a962" size={60} />
        <CornerDecoration position="bottom-right" color="#c9a962" size={60} />
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
            <AutoFixHighIcon sx={{ color: '#c9a962', fontSize: '1.5rem' }} />
            <Box>
              <Typography variant="overline" sx={{ color: '#c9a962', letterSpacing: 3, fontSize: '0.65rem', fontWeight: 500 }}>
                Hikmatia Debate
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 300, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                Reason vs. Mysticism
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {phase === 'topic' ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.6)', mb: 3, maxWidth: 500, mx: 'auto' }}>
              Choose a topic or write your own, then watch Ibn Sina (Rationalist) and Rumi (Mystic) debate it.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 4 }}>
              {DEBATE_TOPICS.map(t => (
                <Chip
                  key={t}
                  label={t}
                  onClick={() => setTopic(t)}
                  variant="outlined"
                  sx={{
                    color: topic === t ? '#c9a962' : 'rgba(255,255,255,0.6)',
                    borderColor: topic === t ? '#c9a962' : 'rgba(255,255,255,0.15)',
                    bgcolor: topic === t ? 'rgba(201,169,98,0.1)' : 'transparent',
                    '&:hover': { borderColor: '#c9a962', color: '#c9a962' },
                  }}
                />
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <TextField
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="Or type your own debate topic..."
                sx={{
                  minWidth: 300,
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255,255,255,0.05)',
                    color: '#f5f5f5',
                    borderRadius: 2,
                    '& fieldset': { borderColor: 'rgba(201,169,98,0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(201,169,98,0.4)' },
                    '&.Mui-focused fieldset': { borderColor: '#c9a962' },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={startDebate}
                disabled={!topic.trim()}
                endIcon={<AutoFixHighIcon />}
                sx={{
                  bgcolor: '#c9a962', color: '#0d1f18', px: 4,
                  '&:hover': { bgcolor: '#d4bc7d' },
                  '&.Mui-disabled': { bgcolor: 'rgba(201,169,98,0.2)', color: 'rgba(0,0,0,0.3)' },
                }}
              >
                Begin Debate
              </Button>
            </Box>
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Chip label={`Topic: ${topic}`} onDelete={() => { setPhase('topic'); setMessages([]); }} sx={{ color: '#c9a962', borderColor: 'rgba(201,169,98,0.3)' }} />
              <Box sx={{ flex: 1 }} />
              <Button size="small" onClick={() => callDebater('rationalist')} disabled={!!loading}
                startIcon={<PsychologyIcon />}
                sx={{ color: RATIONALIST_COLOR, borderColor: RATIONALIST_COLOR, '&:hover': { bgcolor: 'rgba(74,144,217,0.1)' } }}
                variant="outlined">
                Prompt Rationalist
              </Button>
              <Button size="small" onClick={() => callDebater('mystic')} disabled={!!loading}
                startIcon={<AutoStoriesIcon />}
                sx={{ color: MYSTIC_COLOR, borderColor: MYSTIC_COLOR, '&:hover': { bgcolor: 'rgba(201,169,98,0.1)' } }}
                variant="outlined">
                Prompt Mystic
              </Button>
            </Box>

            <Stack spacing={2}>
              {messages.map((msg, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 1.5, justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <Paper sx={{
                    p: 2, maxWidth: '80%',
                    bgcolor: msg.role === 'rationalist' ? 'rgba(74,144,217,0.12)' : msg.role === 'mystic' ? 'rgba(201,169,98,0.12)' : 'rgba(255,255,255,0.08)',
                    borderLeft: `3px solid ${msg.role === 'rationalist' ? RATIONALIST_COLOR : msg.role === 'mystic' ? MYSTIC_COLOR : 'transparent'}`,
                    borderRadius: 2,
                  }}>
                    <Typography variant="caption" sx={{
                      color: msg.role === 'rationalist' ? RATIONALIST_COLOR : msg.role === 'mystic' ? MYSTIC_COLOR : 'rgba(255,255,255,0.4)',
                      fontWeight: 600, display: 'block', mb: 0.5,
                    }}>
                      {msg.role === 'rationalist' ? '🧠 Ibn Sina (Rationalist)' : msg.role === 'mystic' ? '🌹 Rumi (Mystic)' : 'You'}
                    </Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                      {msg.content}
                    </Typography>
                  </Paper>
                </Box>
              ))}

              {loading === 'rationalist' && (
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Paper sx={{ p: 2, bgcolor: 'rgba(74,144,217,0.12)', borderLeft: `3px solid ${RATIONALIST_COLOR}`, borderRadius: 2, maxWidth: '80%' }}>
                    <Typography variant="caption" sx={{ color: RATIONALIST_COLOR, fontWeight: 600, display: 'block', mb: 0.5 }}>
                      🧠 Ibn Sina (Rationalist) ...
                    </Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                      {streamingRationalist || <CircularProgress size={14} sx={{ color: RATIONALIST_COLOR }} />}
                    </Typography>
                  </Paper>
                </Box>
              )}

              {loading === 'mystic' && (
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Paper sx={{ p: 2, bgcolor: 'rgba(201,169,98,0.12)', borderLeft: `3px solid ${MYSTIC_COLOR}`, borderRadius: 2, maxWidth: '80%' }}>
                    <Typography variant="caption" sx={{ color: MYSTIC_COLOR, fontWeight: 600, display: 'block', mb: 0.5 }}>
                      🌹 Rumi (Mystic) ...
                    </Typography>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                      {streamingMystic || <CircularProgress size={14} sx={{ color: MYSTIC_COLOR }} />}
                    </Typography>
                  </Paper>
                </Box>
              )}

              <div ref={messagesEndRef} />
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}
