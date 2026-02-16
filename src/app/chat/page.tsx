'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Avatar,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatBubble from '@mui/icons-material/ChatBubble';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Philosopher {
  id: string;
  name: string;
  persianName: string;
  systemPrompt: string;
}

const philosophers: Philosopher[] = [
  {
    id: 'rumi',
    name: 'Rumi',
    persianName: 'مولانا',
    systemPrompt: `You are Rumi (Jalal ad-Din Muhammad Balkhi), the great 13th-century Persian poet, Sufi mystic, and theologian who lived in Konya. You are known for your ecstatic poetry about divine love, your meeting with Shams Tabrizi that transformed your life, and your masterpiece the Masnavi. You speak with passion, poetry, and profound spiritual insight. Use metaphors about the reed flute, wine, the Beloved, and the journey of the soul. Always point toward love as the ultimate truth.`,
  },
  {
    id: 'hafez',
    name: 'Hafez',
    persianName: 'حافظ',
    systemPrompt: `You are Hafez, the 14th-century Persian poet from Shiraz known as "The Interpreter." Your Divan contains some of the most beautiful ghazals in Persian literature. You speak in riddles and paradoxes about wine, the tavern, the beloved, and hidden knowledge. You are more enigmatic than Rumi, often speaking in double meanings. Always maintain an air of mystery while sharing wisdom.`,
  },
  {
    id: 'saadi',
    name: 'Saadi',
    persianName: 'سعدی',
    systemPrompt: `You are Saadi Shirazi, the wise Persian poet from the 13th century, author of the Gulistan (Rose Garden) and Bustan (Orchard). You are known for your practical wisdom, ethical teachings, and beautiful aphorisms. Unlike the mystics, you focus on worldly wisdom and moral conduct. Speak with warmth, practical advice, and stories that illustrate virtue.`,
  },
  {
    id: 'attar',
    name: 'Attar',
    persianName: 'عطار',
    systemPrompt: `You are Attar of Nishapur, the 12th-century Sufi mystic and poet, author of "The Conference of the Birds" which tells the allegory of the soul's journey to God. You are known for visionary, mystical poetry. Speak about self-annihilation (fana), the soul's journey, and the great chain of being. Your tone is profound and visionary.`,
  },
  {
    id: 'ibn-sina',
    name: 'Ibn Sina (Avicenna)',
    persianName: 'ابن سینا',
    systemPrompt: `You are Ibn Sina (Avicenna), the great 11th-century Persian philosopher, physician, and scientist. You are the author of "The Canon of Medicine" and "The Book of Healing." You represent the rationalist tradition of Islamic philosophy. Speak with logical precision about metaphysics, medicine, and the nature of being. Reference your philosophical works when appropriate.`,
  },
  {
    id: 'ghazali',
    name: 'Al-Ghazali',
    persianName: 'غزالی',
    systemPrompt: `You are Al-Ghazali, the 11th-century Persian theologian, philosopher, and Sufi mystic. You are known for your critique of philosophy, your revitalization of Sufi mysticism, and your work "The Revival of Religious Sciences." You teach the importance of both religious knowledge and spiritual practice. Speak with scholarly authority but also mystical depth.`,
  },
  {
    id: 'mulla-sadra',
    name: 'Mulla Sadra',
    persianName: 'ملاصدرا',
    systemPrompt: `You are Mulla Sadra (Sadr al-Din Shirazi), the 17th-century Persian philosopher who founded "Transcendent Theosophy" (Hikmat al-Mutaaliya). You synthesized philosophy, theology, and Sufi mysticism. Your central idea is that being is a dynamic, graded reality. Speak with profound metaphysical depth about the relationship between existence and essence, and the journey of the soul.`,
  },
  {
    id: 'ibn-arabi',
    name: 'Ibn Arabi',
    persianName: 'ابن عربی',
    systemPrompt: `You are Ibn Arabi, the 12th-century Spanish-born Sufi master known as "The Great Master." You are the philosopher of "Unity of Being" (Wahdat al-Wujud). You speak about the oneness of all existence, the divine names and attributes, and the infinite manifestations of God. Your tone is mystical, poetic, and profound.`,
  },
];

export default function ChatPage() {
  const [selectedPhilosopher, setSelectedPhilosopher] = useState(philosophers[0].id);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Peace be upon you, dear seeker. I am ${philosophers[0].name}. What questions stir in your heart and mind today?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef(true);

  const philosopher = philosophers.find(p => p.id === selectedPhilosopher) || philosophers[0];

  const scrollToBottom = useCallback(() => {
    if (autoScrollRef.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      autoScrollRef.current = isNearBottom;
    }
  }, []);

  const handlePhilosopherChange = (newId: string) => {
    setSelectedPhilosopher(newId);
    const newPhilosopher = philosophers.find(p => p.id === newId) || philosophers[0];
    setMessages([
      {
        role: 'assistant',
        content: `Peace be upon you. I am ${newPhilosopher.name}. ${newPhilosopher.name === 'Rumi' ? 'What questions stir in your heart today?' : 'What wisdom do you seek?'}`,
      },
    ]);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);
    setStreamingContent('');

    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    
    autoScrollRef.current = true;

    try {
      const history: { role: 'user' | 'assistant'; content: string }[] = messages.map((m) => ({ role: m.role, content: m.content }));
      
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage, 
          history,
          philosopherId: selectedPhilosopher,
          systemPrompt: philosopher.systemPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter((line) => line.trim() !== '');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              break;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.done) {
                break;
              }
              if (parsed.content) {
                fullContent += parsed.content;
                setStreamingContent(fullContent);
              }
              if (parsed.error) {
                throw new Error(parsed.error);
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: fullContent }]);
      setStreamingContent('');
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Forgive me, dear one. Please try again.' },
      ]);
    } finally {
      setLoading(false);
      setStreamingContent('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        py: 4, 
        height: 'calc(100vh - 64px)', 
        display: 'flex', 
        flexDirection: 'column',
        px: { xs: 1, sm: 2 },
      }}
    >
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h4">
          Chat with a Philosopher
        </Typography>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Select Philosopher</InputLabel>
          <Select
            value={selectedPhilosopher}
            label="Select Philosopher"
            onChange={(e) => handlePhilosopherChange(e.target.value)}
          >
            {philosophers.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {p.name} ({p.persianName})
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Paper
        elevation={0}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        <Box
          ref={containerRef}
          onScroll={handleScroll}
          sx={{
            flex: 1,
            overflow: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              {message.role === 'assistant' && (
                <Avatar sx={{ mr: 1, bgcolor: 'primary.main', width: 36, height: 36, fontSize: '0.9rem' }}>
                  {philosopher.persianName.slice(0, 1)}
                </Avatar>
              )}
              <Paper
                sx={{
                  p: 2,
                  maxWidth: '75%',
                  bgcolor: message.role === 'user' ? 'primary.main' : 'rgba(46, 74, 61, 0.08)',
                  color: message.role === 'user' ? 'white' : 'text.primary',
                  borderRadius: 3,
                  borderTopRightRadius: message.role === 'user' ? 4 : 16,
                  borderTopLeftRadius: message.role === 'assistant' ? 4 : 16,
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.7,
                  }}
                >
                  {message.content}
                </Typography>
              </Paper>
              {message.role === 'user' && (
                <Avatar sx={{ ml: 1, bgcolor: 'secondary.main', width: 36, height: 36 }}>
                  U
                </Avatar>
              )}
            </Box>
          ))}
          
          {streamingContent && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            >
              <Avatar sx={{ mr: 1, bgcolor: 'primary.main', width: 36, height: 36, fontSize: '0.9rem' }}>
                {philosopher.persianName.slice(0, 1)}
              </Avatar>
              <Paper
                sx={{
                  p: 2,
                  maxWidth: '75%',
                  bgcolor: 'rgba(46, 74, 61, 0.08)',
                  borderRadius: 3,
                  borderTopLeftRadius: 4,
                }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    whiteSpace: 'pre-wrap',
                    lineHeight: 1.7,
                  }}
                >
                  {streamingContent}
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-block',
                      width: 8,
                      height: 16,
                      bgcolor: 'primary.main',
                      ml: 0.5,
                      animation: 'blink 1s infinite',
                      '@keyframes blink': {
                        '0%, 50%': { opacity: 1 },
                        '51%, 100%': { opacity: 0 },
                      },
                    }}
                  />
                </Typography>
              </Paper>
            </Box>
          )}
          
          {loading && !streamingContent && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Avatar sx={{ mr: 1, bgcolor: 'primary.main', width: 36, height: 36, fontSize: '0.9rem' }}>
                {philosopher.persianName.slice(0, 1)}
              </Avatar>
              <Paper sx={{ p: 2, bgcolor: 'rgba(46, 74, 61, 0.08)', borderRadius: 3 }}>
                <CircularProgress size={20} />
              </Paper>
            </Box>
          )}
          
          <div ref={messagesEndRef} />
        </Box>

        <Box
          sx={{
            p: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
            bgcolor: 'background.default',
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="flex-end">
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder={`Ask ${philosopher.name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              disabled={loading || !input.trim()}
              sx={{ 
                minWidth: 56,
                height: 48,
                borderRadius: 3,
              }}
            >
              <SendIcon />
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}
