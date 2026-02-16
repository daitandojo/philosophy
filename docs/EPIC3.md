# EPIC 3: AI Enhancement - Streaming, Personalization & Intelligence

## Objective
Revolutionize the AI experience with streaming responses, perfect chat scrolling, deep personalization, and philosopher-specific conversational agents—creating the most sophisticated philosophical AI companion available.

---

## Vision
Create an AI that doesn't just answer questions but engages in genuine philosophical dialogue—streaming thoughts as they form, remembering context across sessions, adapting to individual users, and channeling the authentic voice of any Persian philosopher.

---

## Critical Fixes (User Requirements)

### 1. Chat Scrolling Fix

**Current Issue:** New answers scroll out of view
**Solution:** Auto-scroll to latest message

**Implementation:**
```typescript
// hooks/useChatScroll.ts
export function useChatScroll(messages: Message[]) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'end' 
      });
    }
  }, [messages, autoScroll]);
  
  // Detect if user manually scrolled up
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      setAutoScroll(isAtBottom);
    }
  };
  
  return { messagesEndRef, containerRef, handleScroll };
}
```

**Visual Indicator:**
- "New message" button appears when scrolled up
- Click to jump to bottom
- Smooth scrolling animation
- Never auto-scroll if user is reading old messages

### 2. Streaming Response Implementation

**Current Issue:** AI waits for full response before displaying
**Solution:** Stream tokens in real-time

**Backend Implementation:**
```typescript
// api/chat/stream/route.ts
export async function POST(req: Request) {
  const { philosopherId, message, history } = await req.json();
  
  const stream = new ReadableStream({
    async start(controller) {
      const philosopher = await getPhilosopher(philosopherId);
      
      // Use streaming-compatible LLM call
      const response = await deepSeek.chat.completions.create({
        model: 'deepseek-chat',
        messages: buildPrompt(philosopher, history, message),
        stream: true,
        temperature: 0.8,
      });
      
      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || '';
        controller.enqueue(`data: ${JSON.stringify({ content })}\n\n`);
      }
      
      controller.enqueue(`data: ${JSON.stringify({ done: true })}\n\n`);
      controller.close();
    },
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
```

**Frontend Implementation:**
```typescript
// components/StreamingChat.tsx
export function StreamingChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streamingContent, setStreamingContent] = useState('');
  const { messagesEndRef, containerRef, handleScroll } = useChatScroll(messages);
  
  const sendMessage = async (userMessage: string) => {
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setStreamingContent('');
    
    // Start streaming
    const response = await fetch('/api/chat/stream', {
      method: 'POST',
      body: JSON.stringify({ message: userMessage, history: messages }),
    });
    
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    
    while (reader) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      const lines = chunk.split('\n\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6));
          if (data.done) {
            setMessages(prev => [...prev, { role: 'assistant', content: streamingContent }]);
            setStreamingContent('');
          } else {
            setStreamingContent(prev => prev + data.content);
          }
        }
      }
    }
  };
  
  return (
    <div ref={containerRef} onScroll={handleScroll} className="chat-container">
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}
      {streamingContent && (
        <MessageBubble 
          message={{ role: 'assistant', content: streamingContent }} 
          isStreaming 
        />
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}
```

**Visual Enhancements for Streaming:**
- Typing indicator (pulsing cursor)
- Gradient fade on streaming text
- "Thinking..." animation during initial latency
- Smooth text appearance (no jarring jumps)

---

## Advanced AI Features

### 3. Multi-Philosopher Chat System

**Architecture:**
```typescript
interface PhilosopherPersona {
  id: string;
  name: string;
  systemPrompt: string;
  voice: {
    tone: string;
    style: string;
    vocabulary: string[];
    avoid: string[];
  };
  knowledge: {
    works: string[];
    coreTeachings: string[];
    quotes: string[];
    historicalContext: string;
  };
  responseStyle: {
    length: 'concise' | 'medium' | 'expansive';
    useMetaphors: boolean;
    usePoetry: boolean;
    citeSources: boolean;
  };
}

// Persona for Rumi
const RUMI_PERSONA: PhilosopherPersona = {
  id: 'rumi',
  name: 'Rumi',
  systemPrompt: `
    You are Rumi (Jalal ad-Din Muhammad Balkhi), the 13th-century Persian poet, 
    Sufi mystic, and theologian. You write with passion, metaphor, and deep spiritual 
    insight. Your responses should:
    
    - Use poetic language and imagery
    - Reference love, wine, the Beloved, the reed flute, and Sufi concepts
    - Be warm, inviting, yet profound
    - Occasionally quote your own poetry
    - Speak of the spiritual journey and divine love
    - Use metaphors from nature and everyday life
    - End with a question or invitation to reflection
    
    Your tone is ecstatic, loving, and wise. You see the divine in all things.
    You believe in the unity of existence (wahdat al-wujud).
  `,
  voice: {
    tone: 'warm, ecstatic, loving',
    style: 'poetic, metaphorical, Sufi',
    vocabulary: ['beloved', 'wine', 'drunk', 'flute', 'reed', 'ocean', 'drop', 'mirror', 'soul'],
    avoid: ['modern slang', 'technical jargon', 'cynicism'],
  },
  knowledge: {
    works: ['Masnavi', 'Divan-e Shams', 'Fihi Ma Fihi'],
    coreTeachings: ['Divine love', 'Unity of existence', 'Spiritual journey'],
    quotes: [...], // 100 key quotes for in-context learning
    historicalContext: '13th century Konya, after meeting Shams Tabrizi',
  },
  responseStyle: {
    length: 'expansive',
    useMetaphors: true,
    usePoetry: true,
    citeSources: true,
  },
};
```

**Persona Creation Process:**
1. Research philosopher's writing style
2. Extract common metaphors and themes
3. Define voice characteristics
4. Create system prompt
5. Fine-tune with examples
6. Test and iterate
7. Deploy as conversational agent

### 4. Session Memory & Context

**Multi-Session Memory:**
```typescript
interface UserAIContext {
  userId: string;
  philosopherId: string;
  conversationHistory: ChatMessage[];
  userPreferences: {
    interests: string[];
    depth: 'introductory' | 'intermediate' | 'advanced';
    topicsExplored: string[];
    favoriteThemes: string[];
  };
  insights: {
    recurringQuestions: string[];
    emotionalPatterns: string[];
    growthAreas: string[];
  };
  lastSession: Date;
  totalSessions: number;
  totalMessages: number;
}
```

**Memory Features:**
- **Long-term memory:** Persist conversations across sessions
- **User model:** Track interests, depth preference, growth
- **Contextual recall:** "You asked about love three weeks ago..."
- **Personalized recommendations:** "Based on your interest in divine love..."
- **Progress tracking:** "We've explored 5 themes together"

**Context Window Management:**
- Keep last 10 messages in full
- Summarize older conversations
- Extract key insights for long-term storage
- Retrieve relevant past discussions

### 5. Intelligent Recommendations

**Personalized Quote Suggestions:**
```typescript
// AI generates personalized daily quote
async function generateDailyWisdom(userId: string) {
  const context = await getUserContext(userId);
  
  const prompt = `
    Based on this user's profile:
    - Interests: ${context.preferences.interests.join(', ')}
    - Recent themes: ${context.preferences.topicsExplored.slice(-3).join(', ')}
    - Emotional state: ${analyzeRecentMood(context)}
    - Depth level: ${context.preferences.depth}
    
    Select the most relevant quote from the database and explain 
    why it's perfect for them today.
  `;
  
  return await deepSeek.generate(prompt);
}
```

**Recommendation Triggers:**
- Time of day (morning reflection vs. evening wisdom)
- User's current learning path
- Recent search history
- Emotional keywords in chat
- Season/occasion (Nowruz, Ramadan, etc.)
- Weather (cozy rainy day wisdom)

**Recommendation Channels:**
- In-app "Today's Wisdom" widget
- Push notifications (opt-in)
- Email digest (daily/weekly)
- Chat proactive suggestions

### 6. Philosophy Comparison Tool

**Multi-Philosopher Dialogue:**
```typescript
interface ComparisonRequest {
  philosophers: string[]; // 2-3 philosophers
  topic: string; // e.g., "divine love", "suffering", "knowledge"
  perspective: 'differences' | 'similarities' | 'debate';
}

// Example: Compare Rumi and Hafez on love
GET /api/philosophy/compare?philosophers=rumi,hafez&topic=love&perspective=similarities

Response: {
  comparison: {
    similarities: string[];
    differences: string[];
    synthesis: string;
  };
  quotes: {
    philosopherId: string;
    quote: Quote;
    relevance: string;
  }[];
  aiAnalysis: string;
}
```

**Comparison Visualizations:**
- Side-by-side quote comparison
- Venn diagram of shared concepts
- Timeline showing influence
- Word cloud of each philosopher's vocabulary
- "Spectrum" view (e.g., ascetic vs. ecstatic Sufism)

### 7. AI-Generated Learning Paths

**Adaptive Learning:**
```typescript
interface LearningPath {
  id: string;
  title: string;
  description: string;
  userId: string;
  modules: LearningModule[];
  createdBy: 'ai' | 'user' | 'scholar';
  adaptive: boolean; // AI adjusts based on progress
}

// AI generates custom path
async function generateLearningPath(userId: string, goal: string) {
  const profile = await getUserProfile(userId);
  
  const prompt = `
    Create a 7-day learning path for a user with this profile:
    - Current level: ${profile.level}
    - Interests: ${profile.interests.join(', ')}
    - Goal: ${goal}
    - Time available: ${profile.timePerDay} minutes/day
    - Preferred philosophers: ${profile.favoritePhilosophers.join(', ')}
    
    Each day should include:
    - 1-2 quotes
    - A reflection question
    - A practical exercise
    - Connection to modern life
  `;
  
  return await deepSeek.generate(prompt);
}
```

**Path Types:**
- Beginner's Journey (introduction to Persian philosophy)
- Spiritual Path (focus on mysticism)
- Intellectual Path (focus on philosophy)
- Healing Journey (wisdom for difficult times)
- Leadership Path (practical wisdom)
- Creative Path (inspiration for artists)
- Custom (user-defined goal)

### 8. Sentiment-Aware Responses

**Emotional Intelligence:**
```typescript
interface SentimentAnalysis {
  primary: 'joy' | 'sadness' | 'anger' | 'fear' | 'confusion' | 'curiosity';
  intensity: number; // 0-1
  keywords: string[];
  suggestedApproach: 'comfort' | 'challenge' | 'inspire' | 'teach' | 'listen';
}

// Adjust philosopher persona based on user emotion
function adjustResponseTone(
  basePersona: PhilosopherPersona, 
  sentiment: SentimentAnalysis
): PhilosopherPersona {
  if (sentiment.primary === 'sadness') {
    return {
      ...basePersona,
      voice: {
        ...basePersona.voice,
        tone: 'gentle, comforting, hopeful',
      },
      responseStyle: {
        ...basePersona.responseStyle,
        length: 'medium',
      },
    };
  }
  // ... other emotions
}
```

**Response Adaptations:**
- **Sad/Grieving:** Gentle, comforting, hope-focused
- **Angry:** Calming, perspective-shifting, wisdom on patience
- **Confused:** Clarifying, educational, step-by-step
- **Joyful:** Celebratory, deepening the joy, sharing enthusiasm
- **Curious:** Expansive, full of connections, "what if?"

### 9. Voice Interface

**Voice Chat Mode:**
```typescript
// Voice-to-voice conversation
interface VoiceChat {
  userSpeech: Blob; // Audio input
  philosopherVoice: string; // Voice ID (ElevenLabs)
  response: {
    text: string;
    audio: Blob;
    duration: number;
  };
}

// Supported voices
const VOICES = {
  rumi: 'rumi-mystic-warm', // Custom trained on Rumi poetry readings
  hafez: 'hafez-poetic-dreamy',
  sadi: 'sadi-wise-gentle',
  generic: 'persian-scholar-neutral',
};
```

**Voice Features:**
- Hands-free conversation
- Car mode (driving-friendly)
- Walking mode (earbuds)
- Sleep stories (gentle philosophical narratives)
- Voice notes (record your reflections)

### 10. AI Research Assistant

**Scholar Mode:**
```typescript
// For Sage/Premium users
interface ResearchQuery {
  question: string;
  philosophers?: string[]; // Specific or all
  sources?: 'primary' | 'secondary' | 'both';
  depth: 'overview' | 'detailed' | 'scholarly';
}

// Example queries:
"How do Rumi and Ibn Arabi's concepts of divine love differ?"
"Trace the concept of 'fana' through Persian Sufi literature"
"What did Persian philosophers write about free will?"

// Response includes:
{
  answer: string;
  sources: {
    philosopher: string;
    work: string;
    passage: string;
    relevance: string;
  }[];
  relatedThemes: string[];
  suggestedReading: Work[];
  confidence: number;
}
```

**Research Features:**
- Citation generation
- Source verification
- Contradiction highlighting
- Synthesis of multiple sources
- Export research notes

---

## UI/UX Enhancements

### Chat Interface Redesign

**Modern Chat UI:**
```
┌────────────────────────────────────────────┐
│ Chat with Rumi              [History] [⚙️] │
├────────────────────────────────────────────┤
│                                            │
│  [Rumi Avatar]                             │
│  Welcome, seeker. What brings you          │
│  to this conversation today?               │
│                                            │
│            [User Avatar]                   │
│            I'm feeling lost...             │
│                                            │
│  [Rumi Avatar]                             │
│  Like the reed flute that longs for        │
│  the reed bed, your longing is the         │
│  very proof of belonging...                │
│                                            │
│                    ▼ New messages          │
│                                            │
├────────────────────────────────────────────┤
│ [🎙️] What would you like to ask?    [➤]  │
└────────────────────────────────────────────┘
```

**Features:**
- Avatar for each philosopher
- Message bubbles with distinct styling
- Timestamp on hover
- Edit/delete own messages
- Regenerate response button
- Copy message text
- Share conversation

### Philosopher Selection

**Visual Selector:**
- Grid of philosopher avatars
- Recently chatted (quick access)
- Favorites section
- "Surprise me" (random philosopher)
- Search by name
- Filter by era/theme

**Pre-Chat Screen:**
- Philosopher intro
- Topics they're great for
- Example questions
- Recent conversation summary (if returning)
- "Start New Conversation" button

---

## Technical Architecture

### LLM Strategy

**Primary:** DeepSeek (cost-effective, good quality)
**Fallback:** OpenAI GPT-4 (complex queries)
**Specialized:** Fine-tuned models per philosopher (future)

**Prompt Engineering:**
- Dynamic persona injection
- Context window optimization
- Few-shot examples per philosopher
- Temperature tuning (0.7-0.9 for creativity)

### Caching Strategy

**Response Caching:**
- Cache common questions
- TTL: 1 week
- Invalidate on content updates
- Save 60% on API costs

**Similar Question Detection:**
- Vector similarity search
- "I've been asked this before..."
- Slightly vary response to avoid robotic feel

### Rate Limiting & Quotas

**Free Tier:**
- 5 messages/day
- No streaming
- Standard response time

**Premium:**
- Unlimited messages
- Streaming enabled
- Priority queue
- Faster response time

**Implementation:**
```typescript
// middleware/rateLimit.ts
const rateLimits = {
  free: { messages: 5, window: '24h' },
  seeker: { messages: Infinity },
  sage: { messages: Infinity, priority: true },
};
```

---

## Success Metrics

**Engagement:**
- Avg. messages per session: 8+
- Return rate: 60% within 7 days
- Session duration: 10+ minutes
- Conversation completion rate: 85%

**Quality:**
- User satisfaction rating: 4.5/5
- "Helpful" rate on responses: 80%+
- Quote accuracy: 95%+
- Response relevance: 90%+

**Technical:**
- Time to first token: <2s
- Streaming latency: <100ms between tokens
- Uptime: 99.9%
- Error rate: <1%

---

## Acceptance Criteria

- [ ] Chat auto-scrolls to latest message
- [ ] Streaming responses implemented
- [ ] Multi-philosopher chat system
- [ ] Session memory across logins
- [ ] Personalized recommendations
- [ ] Philosophy comparison tool
- [ ] AI-generated learning paths
- [ ] Sentiment-aware responses
- [ ] Voice interface (Phase 2)
- [ ] Research assistant (Premium)
- [ ] Modern chat UI
- [ ] Rate limiting and quotas
- [ ] Response caching

---

## Timeline

**Week 1-2:** Fix scrolling, implement streaming
**Week 3-4:** Multi-philosopher personas, memory system
**Week 5-6:** Recommendations, sentiment analysis
**Week 7-8:** Comparison tool, learning paths
**Week 9-10:** Voice interface, research assistant
**Week 11-12:** UI polish, testing, optimization

---

This EPIC creates an AI companion that feels truly alive—streaming thoughts, remembering conversations, and adapting to each user's unique journey through Persian wisdom.
