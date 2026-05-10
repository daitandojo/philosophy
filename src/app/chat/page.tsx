'use client';
// Chat with philosophers - DeepSeek powered
import { useState, useRef, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useI18n } from '@/i18n';
import { useSearchParams } from 'next/navigation';
import { philosophers as philosopherList } from '@/lib/philosophers';
import { philosopherConfigs } from '@/lib/philosopher-prompts';
import Image from 'next/image';

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Avatar,
  CircularProgress,
  Chip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { VoiceInput, VoiceOutput } from '@/components/chat';

const philosopherImages: Record<string, string> = {
  rumi: '/images/philosopher-rumi.png',
  hafez: '/images/philosopher-hafez.png',
  saadi: '/images/philosopher-saadi.png',
  attar: '/images/philosopher-attar.png',
  sanai: '/images/philosopher-sanai.png',
  jami: '/images/philosopher-jami.png',
  nizami: '/images/philosopher-nizami.png',
  ferdowsi: '/images/philosopher-ferdowsi.png',
  'ibn-sina': '/images/philosopher-ibn-sina.png',
  'al-farabi': '/images/philosopher-al-farabi.png',
  'al-kindi': '/images/philosopher-al-kindi.png',
  'al-ghazali': '/images/philosopher-al-ghazali.png',
  suhrawardi: '/images/philosopher-suhrawardi.png',
  'mulla-sadra': '/images/philosopher-mulla-sadra.png',
  'nasir-tusi': '/images/philosopher-nasir-tusi.png',
  'ibn-rushd': '/images/philosopher-ibn-rushd.png',
  'ibn-arabi': '/images/philosopher-ibn-arabi.png',
  'bayazid-bastami': '/images/philosopher-bayazid-bastami.png',
  hallaj: '/images/philosopher-hallaj.png',
  'junayd-baghdadi': '/images/philosopher-junayd-baghdadi.png',
  'abdul-qadir-gilani': '/images/philosopher-abdul-qadir-gilani.png',
  'najm-kubra': '/images/philosopher-najm-kubra.png',
  'seyyed-hossein-nasr': '/images/philosopher-seyyed-hossein-nasr.png',
  'allama-tabatabai': '/images/philosopher-allama-tabatabai.png',
  'morteza-motahhari': '/images/philosopher-morteza-motahhari.png',
  'abdolkarim-soroush': '/images/philosopher-abdolkarim-soroush.png',
  'Dariush-shayegan': '/images/philosopher-dariush-shayegan.png',
  zoroaster: '/images/philosopher-zoroaster.png',
  mazdak: '/images/philosopher-mazdak.png',
  mani: '/images/philosopher-mani.png',
};

function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

function generateDynamicGreeting(philosopherId: string, philosopherName: string, locale: string): string {
  const timeOfDay = getTimeOfDay();
  const randomIndex = Math.floor(Math.random() * 3);
  
  const timeGreetings: Record<string, Record<'morning' | 'afternoon' | 'evening' | 'night', string[]>> = {
    en: {
      morning: [
        "Good morning, dear seeker. The dawn brings new opportunities for wisdom. What questions shall we explore together this fine morning?",
        "Welcome, the morning light reveals the path before us. What wisdom shall we seek as the sun rises?",
        "A blessed morning to you. The day is young, and the journey of the soul awaits. What brings you here today?"
      ],
      afternoon: [
        "Good afternoon, traveler. The sun at its zenith illuminates the way. What insights do you seek in these daylight hours?",
        "Welcome, seeker of truth. The afternoon whispers of the wisdom gathered throughout the day. What questions burn in your heart?",
        "Good day to you. The hours pass, but the search for truth knows no time. What shall we discover together?"
      ],
      evening: [
        "Good evening, wanderer. The twilight hour brings reflection. What lessons from the day shall we contemplate?",
        "Welcome as the day draws to a close. The evening stars emerge to guide us. What wisdom do you seek in this gentle hour?",
        "Blessed evening, seeker. The world rests, but the soul's journey continues. What brings you here tonight?"
      ],
      night: [
        "Good evening, late seeker. The night reveals mysteries hidden by day. What secrets of the heart shall we explore?",
        "Welcome under the moonlight. The quiet hours are perfect for deep contemplation. What stirs in your soul?",
        "Good night, seeker. Even in darkness, the stars above guide our path. What wisdom calls to you in this hour?"
      ]
    },
    es: {
      morning: [
        "Buenos días, querido buscador. El amanecer trae nuevas oportunidades para la sabiduría. ¿Qué preguntas exploraremos esta mañana?",
        "Bienvenido, la luz del amanecer revela el camino. ¿Qué sabiduría buscaremos mientras sale el sol?",
        "Una mañana bendita a ti. El día es joven, y el alma espera. ¿Qué te trae hoy?"
      ],
      afternoon: [
        "Buenas tardes, viajero. El sol en su cenit ilumina el camino. ¿Qué ideas buscas en estas horas de luz?",
        "Bienvenido, buscador de verdad. La tarde susurra de la sabiduría reunida. ¿Qué preguntas arden en tu corazón?",
        "Buen día a ti. Las horas pasan, pero la búsqueda de la verdad no conoce tiempo. ¿Qué descubriremos juntos?"
      ],
      evening: [
        "Buenas noches, viajero. La hora del crepúsculo trae reflexión. ¿Qué lecciones del día contemplemos?",
        "Bienvenido mientras el día termina. Las estrellas de la tarde emergen para guiarnos. ¿Qué sabiduría buscas en esta hora gentil?",
        "Noche bendita, buscador. El mundo descansa, pero el viaje del alma continúa. ¿Qué te trae aquí esta noche?"
      ],
      night: [
        "Buenas noches, buscador tardío. La noche revela misterios ocultos por el día. ¿Qué secretos del corazón exploraremos?",
        "Bienvenido bajo la luz de la luna. Las horas quietas son perfectas para la contemplación profunda. ¿Qué agita en tu alma?",
        "Buenas noches, buscador. Incluso en la oscuridad, las estrellas guían nuestro camino. ¿Qué sabiduría te llama en esta hora?"
      ]
    },
    nl: {
      morning: [
        "Goede morgen, beste zoeker. De dageraad brengt nieuwe mogelijkheden voor wijsheid. Welke vragen zullen we deze prachtige ochtend verkennen?",
        "Welkom, het ochtendlicht onthult het pad voor ons. Welke wijsheid zoeken we terwijl de zon opkomt?",
        "Een gezegende morgen voor jou. De dag is jong, en de reis van de ziel wacht. Wat brengt je vandaag hier?"
      ],
      afternoon: [
        "Goede middag, reiziger. De zon op zijn hoogtepunt verlicht de weg. Welke inzichten zoek je in deze daglichturen?",
        "Welkom, zoeker van waarheid. De middag fluistert over de wijsheid die door de dag is verzameld. Welke vragen branden in je hart?",
        "Goede dag voor jou. De uren verstrijken, maar de zoektocht naar waarheid kent geen tijd. Wat zullen we samen ontdekken?"
      ],
      evening: [
        "Goede avond, wanderer. Het avonduur brengt reflectie. Welke lessen van de dag zullen we overwegen?",
        "Welkom terwijl de dag ten einde loopt. De avondsterren verschijnen om ons te leiden. Welke wijsheid zoek je dit uur?",
        "Gezegende avond, zoeker. De wereld rust, maar de reis van de ziel gaat door. Wat brengt je hier vanavond?"
      ],
      night: [
        "Goedenavond, late zoeker. De nacht onthult mysteries die overdag verborgen zijn. Welke geheimen van het hart zullen we verkennen?",
        "Welkom bij het maanlicht. De stille uren zijn perfect voor diepe contemplatie. Wat roert in je ziel?",
        "Goedenacht, zoeker. Zelfs in duisternis leiden de sterren ons pad. Welke wijsheid roept je in dit uur?"
      ]
    }
  };
  
  const langGreetings = timeGreetings[locale] || timeGreetings.en;
  const timeGreeting = langGreetings[timeOfDay][randomIndex];
  
  const philosopherIntros: Record<string, string> = {
    rumi: "I am Rumi, who dances to the song of divine love. ",
    hafez: "I am Hafez, interpreter of secrets. ",
    saadi: "I am Saadi, keeper of wisdom from the Rose Garden. ",
    attar: "I am Attar, who hears the voice of every creature. ",
    sanai: "I am Sanai, who first planted the seeds of divine love. ",
    jami: "I am Jami, singer of love's eternal song. ",
    nizami: "I am Nizami, weaver of love and legend. ",
    ferdowsi: "I am Ferdowsi, voice of ancient Persia's glory. ",
    'ibn-sina': "I am Avicenna, guide through the fields of medicine and philosophy. ",
    'al-farabi': "I am Al-Farabi, the Second Teacher. ",
    'al-ghazali': "I am Al-Ghazali, reviver of religious sciences. ",
    suhrawardi: "I am Suhrawardi, keeper of the Philosophy of Light. ",
    'mulla-sadra': "I am Mulla Sadra, guide through the ocean of existence. ",
    'nasir-tusi': "I am Nasir al-Din al-Tusi, builder of observatories. ",
    'ibn-rushd': "I am Ibn Rushd, defender of Aristotle's light. ",
    'al-kindi': "I am Al-Kindi, first light of Islamic thought. ",
    'ibn-arabi': "I am Ibn Arabi, voice of Unity of Being. ",
    'bayazid-bastami': "I am Bayazid, pioneer of annihilation. ",
    hallaj: "I am Hallaj, who danced to the song of union. ",
    'junayd-baghdadi': "I am Junayd, teacher of the middle way. ",
    'abdul-qadir-gilani': "I am Abdul-Qadir Gilani, guide of the righteous. ",
    'najm-kubra': "I am Najm al-Din Kubra, seer of mysteries. ",
    'seyyed-hossein-nasr': "I am Seyyed Hossein Nasr, voice of the Perennial Philosophy. ",
    'allama-tabatabai': "I am Allama Tabatabai, interpreter of sacred text. ",
    'morteza-motahhari': "I am Morteza Motahhari, builder of Islamic philosophy. ",
    'abdolkarim-soroush': "I am Abdolkarim Soroush, explorer of contraction and expansion. ",
    'Dariush-shayegan': "I am Dariush Shayegan, bridge between worlds. ",
    zoroaster: "I am Zoroaster, prophet of the eternal flame. ",
    mazdak: "I am Mazdak, voice of equality. ",
    mani: "I am Mani, apostle of the luminous path. "
  };
  
  return timeGreeting + " " + (philosopherIntros[philosopherId] || `I am ${philosopherName}. `) + "What wisdom shall we explore together?";
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatPhilosopher {
  id: string;
  name: string;
  persianName: string;
  systemPrompt: string;
  image: string;
}

const philosophers: ChatPhilosopher[] = philosopherList
  .filter(p => philosopherConfigs[p.id])
  .map(p => ({
    id: p.id,
    name: p.name.english,
    persianName: p.name.persian,
    systemPrompt: philosopherConfigs[p.id].systemPrompt,
    image: philosopherImages[p.id] || '',
  }));

export default function ChatPage() {
  return (
    <Suspense fallback={
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#0d1f18' }}>
        <CircularProgress sx={{ color: '#c9a962' }} />
      </Box>
    }>
      <ChatContent />
    </Suspense>
  );
}

function ChatContent() {
  const { locale, mounted } = useI18n();
  const searchParams = useSearchParams();
  const philosopherParam = searchParams?.get('philosopher');
  
  const initialPhilosopherId = philosopherParam || philosophers[0].id;
  
  const [selectedPhilosopher, setSelectedPhilosopher] = useState(initialPhilosopherId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef(true);

  const philosopher = useMemo(() => 
    philosophers.find(p => p.id === selectedPhilosopher) || philosophers[0], 
    [selectedPhilosopher]
  );

  const saveConversation = useCallback((philosopherId: string, msgs: Message[]) => {
    try {
      const key = `hikmatia-chat-${philosopherId}`;
      localStorage.setItem(key, JSON.stringify(msgs));
    } catch {
      // localStorage may be full or unavailable
    }
  }, []);

  const loadConversation = useCallback((philosopherId: string): Message[] | null => {
    try {
      const key = `hikmatia-chat-${philosopherId}`;
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Invalid JSON or localStorage unavailable
    }
    return null;
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const saved = loadConversation(selectedPhilosopher);
    if (saved && saved.length > 0) {
      setMessages(saved);
    } else {
      const initialPhilosopher = philosophers.find(p => p.id === selectedPhilosopher) || philosophers[0];
      const greeting = generateDynamicGreeting(selectedPhilosopher, initialPhilosopher.name, locale);
      const initialMsgs: Message[] = [{ role: 'assistant', content: greeting }];
      setMessages(initialMsgs);
      saveConversation(selectedPhilosopher, initialMsgs);
    }
  }, [mounted, selectedPhilosopher, locale, loadConversation, saveConversation]);

  const handleTranscript = useCallback((text: string) => {
    setInput(text);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (autoScrollRef.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent, scrollToBottom]);

  useEffect(() => {
    if (messages.length > 0) {
      saveConversation(selectedPhilosopher, messages);
    }
  }, [messages, selectedPhilosopher, saveConversation]);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      autoScrollRef.current = isNearBottom;
    }
  }, []);

  const handleNewChat = useCallback(() => {
    const newPhilosopher = philosophers.find(p => p.id === selectedPhilosopher) || philosophers[0];
    const greeting = generateDynamicGreeting(selectedPhilosopher, newPhilosopher.name, locale);
    const initialMsgs: Message[] = [{ role: 'assistant', content: greeting }];
    setMessages(initialMsgs);
    saveConversation(selectedPhilosopher, initialMsgs);
  }, [selectedPhilosopher, locale, saveConversation]);

  const handlePhilosopherChange = (newId: string) => {
    saveConversation(selectedPhilosopher, messages);
    setSelectedPhilosopher(newId);
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
        { role: 'assistant', content: locale === 'es' ? 'Perdóname, querido. Por favor, inténtalo de nuevo.' : locale === 'nl' ? 'Vergeef me, lieverd. Probeer het opnieuw.' : 'Forgive me, dear one. Please try again.' },
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
    <Box
      sx={{
        height: 'calc(100dvh - 56px)',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#0d1f18',
        color: '#f5f5f5',
        overflow: 'hidden',
      }}
    >
      {/* Philosopher Selector Bar */}
      <Box
        sx={{
          flexShrink: 0,
          bgcolor: 'rgba(0,0,0,0.4)',
          borderBottom: '1px solid rgba(201,169,98,0.15)',
          px: { xs: 1.5, md: 3 },
          py: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              position: 'relative',
              width: { xs: 40, md: 48 },
              height: { xs: 40, md: 48 },
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid #c9a962',
              flexShrink: 0,
            }}
          >
            <Image
              src={philosopher.image}
              alt={philosopher.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="subtitle2" sx={{ color: '#ffffff', fontWeight: 500, fontSize: '0.85rem', lineHeight: 1.2 }}>
              {philosopher.name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(201,169,98,0.7)', fontSize: '0.7rem' }}>
              {philosopher.persianName}
            </Typography>
          </Box>
          <Button
            onClick={handleNewChat}
            size="small"
            sx={{
              flexShrink: 0,
              color: 'rgba(201,169,98,0.7)',
              fontSize: '0.65rem',
              minWidth: 'auto',
              height: 28,
              px: 1.5,
              border: '1px solid rgba(201,169,98,0.2)',
              borderRadius: 1.5,
              '&:hover': {
                borderColor: '#c9a962',
                color: '#c9a962',
                backgroundColor: 'rgba(201,169,98,0.1)',
              },
            }}
          >
            New Chat
          </Button>
          <Box
            sx={{
              display: 'flex',
              gap: 0.5,
              flex: 1,
              overflow: 'auto',
              ml: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
              maskImage: 'linear-gradient(to right, transparent 0%, black 12px, black calc(100% - 12px), transparent 100%)',
            }}
          >
            {philosophers.slice(0, 30).map((p) => (
              <Chip
                key={p.id}
                label={p.name.split(' ')[0]}
                onClick={() => handlePhilosopherChange(p.id)}
                size="small"
                sx={{
                  flexShrink: 0,
                  bgcolor: selectedPhilosopher === p.id ? '#c9a962' : 'rgba(201,169,98,0.1)',
                  color: selectedPhilosopher === p.id ? '#0d1f18' : 'rgba(255,255,255,0.7)',
                  fontWeight: selectedPhilosopher === p.id ? 600 : 400,
                  fontSize: '0.7rem',
                  height: 28,
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: selectedPhilosopher === p.id ? '#d4bc7d' : 'rgba(201,169,98,0.2)',
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Messages Area */}
      <Box
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          flex: 1,
          overflow: 'auto',
          p: { xs: 2, md: 3 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {messages.length === 1 && !loading && !streamingContent && (
          <Box sx={{ textAlign: 'center', py: 4, opacity: 0.5 }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
              Ask a question to begin your conversation
            </Typography>
          </Box>
        )}
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
              alignItems: 'flex-start',
              gap: 1.5,
            }}
          >
            {message.role === 'assistant' && (
              <Box sx={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid #c9a962' }}>
                <Image
                  src={philosopher.image}
                  alt={philosopher.name}
                  width={36}
                  height={36}
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            )}
            <Paper
              sx={{
                p: 2,
                maxWidth: '75%',
                bgcolor: message.role === 'user' ? '#c9a962' : 'rgba(0, 0, 0, 0.2)',
                color: message.role === 'user' ? '#0d1f18' : 'rgba(255,255,255,0.9)',
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
                  fontSize: '0.95rem',
                }}
              >
                {message.content}
              </Typography>
            </Paper>
            {message.role === 'user' && (
              <Avatar sx={{ bgcolor: 'rgba(201, 169, 98, 0.3)', color: '#c9a962', width: 36, height: 36, flexShrink: 0 }}>
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
              gap: 1.5,
            }}
          >
            <Box sx={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid #c9a962' }}>
              <Image
                src={philosopher.image}
                alt={philosopher.name}
                width={36}
                height={36}
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Paper
              sx={{
                p: 2,
                maxWidth: '75%',
                bgcolor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: 3,
                borderTopLeftRadius: 4,
              }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  whiteSpace: 'pre-wrap',
                  lineHeight: 1.7,
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                {streamingContent}
                <Box
                  component="span"
                  sx={{
                    display: 'inline-block',
                    width: 8,
                    height: 16,
                    bgcolor: '#c9a962',
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 1.5 }}>
            <Box sx={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid #c9a962' }}>
              <Image
                src={philosopher.image}
                alt={philosopher.name}
                width={36}
                height={36}
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Paper sx={{ p: 2, bgcolor: 'rgba(0, 0, 0, 0.2)', borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <CircularProgress size={16} sx={{ color: '#c9a962' }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                  Thinking...
                </Typography>
              </Box>
            </Paper>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          flexShrink: 0,
          p: { xs: 1.5, md: 3 },
          borderTop: '1px solid rgba(201,169,98,0.15)',
          bgcolor: 'rgba(0,0,0,0.3)',
          paddingBottom: { xs: 'calc(var(--sab, 0px) + 64px)', md: 3 },
        }}
      >
        <Stack direction="row" spacing={1.5} alignItems="flex-end">
          <VoiceInput
            onTranscript={handleTranscript}
            disabled={loading}
          />
          <VoiceOutput
            text={messages[messages.length - 1]?.content || ''}
          />
          <TextField
            fullWidth
            multiline
            maxRows={4}
            placeholder="Ask your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'rgba(0, 0, 0, 0.2)',
                color: '#f5f5f5',
                borderRadius: 3,
                '& fieldset': { borderColor: 'rgba(201, 169, 98, 0.2)' },
                '&:hover fieldset': { borderColor: 'rgba(201, 169, 98, 0.4)' },
                '&.Mui-focused fieldset': { borderColor: '#c9a962' },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(255,255,255,0.4)',
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
              bgcolor: '#c9a962',
              color: '#0d1f18',
              '&:hover': {
                bgcolor: '#d4bc7d',
              },
              '&.Mui-disabled': {
                bgcolor: 'rgba(201, 169, 98, 0.2)',
                color: 'rgba(0, 0, 0, 0.3)',
              },
            }}
          >
            <SendIcon />
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
