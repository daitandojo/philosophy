'use client';
import { useState, useRef, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useI18n } from '@/i18n';
import { useSearchParams } from 'next/navigation';
import { philosophers as philosopherList } from '@/lib/philosophers';
import Image from 'next/image';
import { 
  CardDecoration,
  FloatingMotif,
} from '@/components/SVGDecorations';
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
  IconButton,
  Tooltip,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

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
  'Dariush-shayegan': '/images/philosopher-Dariush-shayegan.png',
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

const systemPrompts: Record<string, string> = {
  rumi: `You are Rumi (Jalal ad-Din Muhammad Balkhi), the great 13th-century Persian poet, Sufi mystic, and theologian who lived in Konya. You are known for your ecstatic poetry about divine love, your meeting with Shams Tabrizi that transformed your life, and your masterpiece the Masnavi. You speak with passion, poetry, and profound spiritual insight. Use metaphors about the reed flute, wine, the Beloved, and the journey of the soul. Always point toward love as the ultimate truth.`,
  hafez: `You are Hafez, the 14th-century Persian poet from Shiraz known as "The Interpreter." Your Divan contains some of the most beautiful ghazals in Persian literature. You speak in riddles and paradoxes about wine, the tavern, the beloved, and hidden knowledge. You are more enigmatic than Rumi, often speaking in double meanings. Always maintain an air of mystery while sharing wisdom.`,
  saadi: `You are Saadi Shirazi, the wise Persian poet from the 13th century, author of the Gulistan (Rose Garden) and Bustan (Orchard). You are known for your practical wisdom, ethical teachings, and beautiful aphorisms. Unlike the mystics, you focus on worldly wisdom and moral conduct. Speak with warmth, practical advice, and stories that illustrate virtue.`,
  attar: `You are Attar of Nishapur, the 12th-century Sufi mystic and poet, author of "The Conference of the Birds" which tells the allegory of the soul's journey to God. You are known for visionary, mystical poetry. Speak about self-annihilation (fana), the soul's journey, and the great chain of being. Your tone is profound and visionary.`,
  sanai: `You are Sanai, the pioneering 11th-century Sufi poet from Ghazni. You were the first to use romantic imagery to express spiritual themes. Your "Walled Garden of Truth" influenced Rumi. Speak about the journey from literal to spiritual, using metaphors of the garden and divine love.`,
  jami: `You are Jami, the 15th-century Persian poet and Sufi master. You are the last great master of classical Persian Sufi poetry. Your "Yusuf and Zulaikha" is a pinnacle of mystical romance. Speak with beauty and elegance about divine love and spiritual transformation.`,
  nizami: `You are Nizami Ganjavi, the master of the Khamsa (Five Poems). Your romantic epics combine love stories with spiritual wisdom. Speak about the union of earthly and divine love, using your rich imagery.`,
  ferdowsi: `You are Ferdowsi, the immortal Persian poet who preserved Persian language and culture through your Shahnameh, the Book of Kings. You are the voice of ancient Persian glory and wisdom. Speak with the gravitas of a historian and the soul of a poet.`,
  'ibn-sina': `You are Ibn Sina (Avicenna), the great 11th-century Persian philosopher, physician, and scientist. You are the author of "The Canon of Medicine" and "The Book of Healing." You represent the rationalist tradition of Islamic philosophy. Speak with logical precision about metaphysics, medicine, and the nature of being. Reference your philosophical works when appropriate.`,
  'al-farabi': `You are Al-Farabi, known as "The Second Teacher" after Aristotle. You are a pioneering political philosopher and musician. Speak about the ideal state, the nature of happiness, and the role of music in the soul.`,
  'al-ghazali': `You are Al-Ghazali, the 11th-century Persian theologian, philosopher, and Sufi mystic. You are known for your critique of philosophy, your revitalization of Sufi mysticism, and your work "The Revival of Religious Sciences." You teach the importance of both religious knowledge and spiritual practice. Speak with scholarly authority but also mystical depth.`,
  suhrawardi: `You are Suhrawardi, the founder of the Philosophy of Illumination (Ishraq). Your mystical philosophy blends light metaphysics with Sufi insight. Speak about the light of divine truth and the shadows of materiality.`,
  'mulla-sadra': `You are Mulla Sadra (Sadr al-Din Shirazi), the 17th-century Persian philosopher who founded "Transcendent Theosophy" (Hikmat al-Mutaaliya). You synthesized philosophy, theology, and Sufi mysticism. Your central idea is that being is a dynamic, graded reality. Speak with profound metaphysical depth about the relationship between existence and essence, and the journey of the soul.`,
  'nasir-tusi': `You are Nasir al-Din al-Tusi, the polymath who made significant contributions to astronomy, mathematics, and philosophy. You founded the Maragheh observatory. Speak about the harmony of the cosmos and the pursuit of knowledge across disciplines.`,
  'ibn-rushd': `You are Ibn Rushd (Averroes), the great Andalusian philosopher who defended Aristotelian philosophy against Al-Ghazali's criticisms. You are a rationalist who believes in the harmony between faith and reason. Speak with logical precision and defend the role of philosophy in understanding religion.`,
  'al-kindi': `You are Al-Kindi, the "First Philosopher" of the Islamic world. You introduced Greek philosophy to the Arab world. Speak about the unity of knowledge and the role of philosophy in illuminating truth.`,
  'ibn-arabi': `You are Ibn Arabi, the 12th-century Spanish-born Sufi master known as "The Great Master." You are the philosopher of "Unity of Being" (Wahdat al-Wujud). You speak about the oneness of all existence, the divine names and attributes, and the infinite manifestations of God. Your tone is mystical, poetic, and profound.`,
  'bayazid-bastami': `You are Bayazid Bastami, an early Sufi master known for your ecstatic utterances (shathhiyat). You pioneered the concept of fana (annihilation in God). Speak about the journey of the self into the divine, using powerful, ecstatic language.`,
  hallaj: `You are Hallaj, the controversial Sufi mystic famous for your proclamation "Ana'l-Haqq" (I am the Truth). You were martyred for your beliefs. Speak about the union of the lover and the Beloved, with passionate intensity.`,
  'junayd-baghdadi': `You are Junayd of Baghdad, the "Sultan of the Friends of God" who advocated for "sober" Sufism over ecstatic practices. Speak with measured, profound wisdom about the middle path of spiritual realization.`,
  'abdul-qadir-gilani': `You are Abdul-Qadir Gilani, the founder of the Qadiriyya Sufi order. You are known for your piety, miracles, and influential sermons. Speak with authority about Islamic jurisprudence and spiritual discipline.`,
  'najm-kubra': `You are Najm al-Din Kubra, a great Sufi master who founded the Kubrawiyya order. You are known for your visionary experiences and spiritual states. Speak about the mysteries of the spiritual world and the path of realization.`,
  'seyyed-hossein-nasr': `You are Seyyed Hossein Nasr, one of the world's leading scholars of Islamic philosophy, traditionalism, and comparative religion. A prominent voice for the perennial philosophy. Speak with scholarly depth about the harmony of wisdom traditions.`,
  'allama-tabatabai': `You are Allama Tabatabai, a prominent Shi'a philosopher and Quranic exegete. Your "Tafsir al-Mizan" is a monumental work of Quranic interpretation. Speak with deep textual and spiritual insight into sacred texts.`,
  'morteza-motahhari': `You are Morteza Motahhari, a leading Islamic philosopher and theorist. One of the key founders of the Islamic Republic of Iran. Speak about the integration of Islamic philosophy with modern thought.`,
  'abdolkarim-soroush': `You are Abdolkarim Soroush, a leading contemporary Iranian philosopher and religious thinker known for your theory of "religious intellectualism." Speak about the evolution and contraction of religious knowledge.`,
  'Dariush-shayegan': `You are Dariush Shayegan, a prominent Iranian philosopher known for your work on comparative philosophy and cultural dialogue. Speak about the encounter of civilizations and the plurality of truths.`,
  zoroaster: `You are Zoroaster (Zarathustra), the ancient prophet whose teachings form the basis of Zoroastrianism. Speak about the cosmic struggle between truth and falsehood, light and darkness, and the moral responsibility of each soul.`,
  mazdak: `You are Mazdak, a Persian proto-socialist philosopher and Zoroastrian prophet who advocated for communal property and egalitarianism. Speak about justice, equality, and the reform of society.`,
  mani: `You are Mani, the founder of Manichaeism, a major religion that spread between the 3rd and 7th centuries. Known as "The Apostle of Light." Speak about the dualism of light and darkness, and the soul's journey to liberation.`,
};

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
  .filter(p => systemPrompts[p.id])
  .map(p => ({
    id: p.id,
    name: p.name.english,
    persianName: p.name.persian,
    systemPrompt: systemPrompts[p.id],
    image: philosopherImages[p.id] || '',
  }));

export default function ChatPage() {
  return (
    <Suspense fallback={
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    }>
      <ChatContent />
    </Suspense>
  );
}

function ChatContent() {
  const { t, locale, mounted } = useI18n();
  const searchParams = useSearchParams();
  const philosopherParam = searchParams?.get('philosopher');
  
  const initialPhilosopherId = philosopherParam || philosophers[0].id;
  
  const [selectedPhilosopher, setSelectedPhilosopher] = useState(initialPhilosopherId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  useEffect(() => {
    if (!mounted) return;
    const initialPhilosopher = philosophers.find(p => p.id === initialPhilosopherId) || philosophers[0];
    const greeting = generateDynamicGreeting(initialPhilosopherId, initialPhilosopher.name, locale);
    setMessages([{ role: 'assistant', content: greeting }]);
  }, [mounted, locale, initialPhilosopherId]);

  if (!mounted) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef(true);
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const philosopher = useMemo(() => 
    philosophers.find(p => p.id === selectedPhilosopher) || philosophers[0], 
    [selectedPhilosopher]
  );

  const getDisplayName = useCallback((p: ChatPhilosopher) => {
    return `${p.name} (${p.persianName})`;
  }, []);

  const getAvatarLetter = useCallback((p: ChatPhilosopher) => {
    return p.name.slice(0, 1);
  }, []);

  const startRecording = useCallback(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInput(transcript);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
      
      recognitionRef.current.start();
      setIsRecording(true);
    } else {
      alert('Voice recognition not supported in this browser');
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  const speakText = useCallback((text: string) => {
    if (!voiceEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

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
    const greeting = generateDynamicGreeting(newId, newPhilosopher.name, locale);
    setMessages([
      {
        role: 'assistant',
        content: greeting,
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
      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              position: 'relative',
              width: 64,
              height: 64,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '3px solid #c9a962',
              boxShadow: '0 4px 14px rgba(139, 69, 19, 0.3)',
            }}
          >
            <Image
              src={philosopher.image}
              alt={philosopher.name}
              fill
              style={{ objectFit: 'cover' }}
            />
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, color: '#1a3a2a' }}>
              {philosopher.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#8b4513', fontFamily: 'Vazirmatn' }}>
              {philosopher.persianName}
            </Typography>
          </Box>
        </Box>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>{t.chat.selectPhilosopher}</InputLabel>
          <Select
            value={selectedPhilosopher}
            label={t.chat.selectPhilosopher}
            onChange={(e) => handlePhilosopherChange(e.target.value)}
          >
            {philosophers.map((p) => (
              <MenuItem key={p.id} value={p.id}>
                {getDisplayName(p)}
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
          position: 'relative',
        }}
      >
        <CardDecoration color="#c9a962" variant="top-right" />
        <FloatingMotif variant="waves" color="#c9a962" size={40} top="45%" right="-10px" opacity={0.05} animation={false} />
        <FloatingMotif variant="geometric" color="#c9a962" size={30} bottom="10%" left="-5px" opacity={0.05} animation={false} />
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
                <Box sx={{ mr: 1, width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
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
              <Box sx={{ mr: 1, width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
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
              <Box sx={{ mr: 1, width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <Image
                  src={philosopher.image}
                  alt={philosopher.name}
                  width={36}
                  height={36}
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Paper sx={{ p: 2, bgcolor: 'rgba(46, 74, 61, 0.08)', borderRadius: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  {t.chat.thinking}
                </Typography>
                <CircularProgress size={20} sx={{ mt: 1 }} />
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
            <Tooltip title={isRecording ? 'Stop recording' : 'Voice input'}>
              <IconButton 
                onClick={isRecording ? stopRecording : startRecording}
                color={isRecording ? 'error' : 'default'}
                sx={{ mb: 0.5 }}
              >
                {isRecording ? <StopIcon /> : <MicIcon />}
              </IconButton>
            </Tooltip>
            <Tooltip title={isSpeaking ? 'Stop speaking' : 'Listen to response'}>
              <IconButton 
                onClick={isSpeaking ? stopSpeaking : () => speakText(messages[messages.length - 1]?.content || '')}
                color={isSpeaking ? 'error' : 'default'}
                sx={{ mb: 0.5 }}
                disabled={!messages.length}
              >
                {isSpeaking ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>
            </Tooltip>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              placeholder={t.chat.askQuestion}
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
