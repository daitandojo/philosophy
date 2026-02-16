'use client';
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Stack,
  Avatar,
  Fade,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    philosopherIds: string[];
    weight: number;
  }[];
}

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "When you face a difficult situation, what's your first instinct?",
    options: [
      { text: "Transform the difficulty into growth and learning", philosopherIds: ["rumi"], weight: 3 },
      { text: "Seek patience and acceptance", philosopherIds: ["saadi"], weight: 2 },
      { text: "Question the nature of reality itself", philosopherIds: ["mulla-sadra"], weight: 2 },
      { text: "Find practical wisdom to navigate it", philosopherIds: ["ibn-sina"], weight: 2 },
    ],
  },
  {
    id: 2,
    question: "What concept resonates most deeply with you?",
    options: [
      { text: "Divine Love - the longing for the Beloved", philosopherIds: ["rumi", "hafez"], weight: 3 },
      { text: "Unity of Existence - all is One", philosopherIds: ["rumi", "ibn-arabi"], weight: 2 },
      { text: "Self-knowledge - know thyself", philosopherIds: ["attar", "sanai"], weight: 2 },
      { text: "Practical ethics in daily life", philosopherIds: ["saadi", "ghazali"], weight: 2 },
    ],
  },
  {
    id: 3,
    question: "How do you prefer to receive wisdom?",
    options: [
      { text: "Through beautiful poetry and metaphors", philosopherIds: ["rumi", "hafez"], weight: 3 },
      { text: "Through stories and allegories", philosopherIds: ["attar", "saadi"], weight: 2 },
      { text: "Through logical philosophical argument", philosopherIds: ["ibn-sina", "farabi"], weight: 2 },
      { text: "Through practical aphorisms", philosopherIds: ["saadi"], weight: 2 },
    ],
  },
  {
    id: 4,
    question: "What do you believe is life's greatest purpose?",
    options: [
      { text: "To love and be united with the Divine", philosopherIds: ["rumi", "hafez"], weight: 3 },
      { text: "To know and understand truth", philosopherIds: ["ibn-sina", "mulla-sadra"], weight: 2 },
      { text: "To serve others and cultivate virtue", philosopherIds: ["saadi", "ghazali"], weight: 2 },
      { text: "To realize our true nature", philosopherIds: ["attar", "bayazid"], weight: 2 },
    ],
  },
  {
    id: 5,
    question: "When you think of paradise, what do you imagine?",
    options: [
      { text: "A garden of eternal love and union", philosopherIds: ["rumi", "hafez"], weight: 3 },
      { text: "The ocean of divine wisdom", philosopherIds: ["ibn-sina", "mulla-sadra"], weight: 2 },
      { text: "A state of perfect peace and contentment", philosopherIds: ["saadi", "ghazali"], weight: 2 },
      { text: "The presence of the Beloved everywhere", philosopherIds: ["rumi", "ibn-arabi"], weight: 2 },
    ],
  },
  {
    id: 6,
    question: "What's your approach to problems in relationships?",
    options: [
      { text: "Love transforms everything - embrace it fully", philosopherIds: ["rumi"], weight: 3 },
      { text: "Seek understanding and common ground", philosopherIds: ["saadi"], weight: 2 },
      { text: "Look for the wisdom in the challenge", philosopherIds: ["ghazali"], weight: 2 },
      { text: "The other person is a mirror - look within", philosopherIds: ["rumi", "attar"], weight: 2 },
    ],
  },
  {
    id: 7,
    question: "What quality do you most admire in a person?",
    options: [
      { text: "Compassion and openness of heart", philosopherIds: ["rumi", "hafez"], weight: 3 },
      { text: "Wisdom and insight", philosopherIds: ["ibn-sina", "mulla-sadra"], weight: 2 },
      { text: "Integrity and practical virtue", philosopherIds: ["saadi"], weight: 2 },
      { text: "Courage to question everything", philosopherIds: ["attar", "hallaj"], weight: 2 },
    ],
  },
  {
    id: 8,
    question: "How do you find peace when troubled?",
    options: [
      { text: "Through music, poetry, and beauty", philosopherIds: ["rumi", "hafez"], weight: 3 },
      { text: "Through reflection and contemplation", philosopherIds: ["ghazali", "mulla-sadra"], weight: 2 },
      { text: "Through connecting with nature", philosopherIds: ["saadi"], weight: 2 },
      { text: "Through surrender and letting go", philosopherIds: ["rumi", "bayazid"], weight: 2 },
    ],
  },
  {
    id: 9,
    question: "What role does reason play in your life?",
    options: [
      { text: "Important, but love transcends reason", philosopherIds: ["rumi", "hafez"], weight: 2 },
      { text: "Essential - it leads to truth", philosopherIds: ["ibn-sina", "farabi"], weight: 3 },
      { text: "A tool to serve spiritual goals", philosopherIds: ["ghazali", "mulla-sadra"], weight: 2 },
      { text: "Useful but limited - experience is deeper", philosopherIds: ["attar", "bayazid"], weight: 2 },
    ],
  },
  {
    id: 10,
    question: "What brings you deepest joy?",
    options: [
      { text: "Loving connection with others and the Divine", philosopherIds: ["rumi", "hafez"], weight: 3 },
      { text: "Understanding life's deepest truths", philosopherIds: ["ibn-sina", "mulla-sadra"], weight: 2 },
      { text: "Living with virtue and helping others", philosopherIds: ["saadi"], weight: 2 },
      { text: "Losing myself in something greater", philosopherIds: ["rumi", "attar"], weight: 2 },
    ],
  },
];

interface PhilosopherResult {
  id: string;
  name: string;
  description: string;
  image: string;
  matchScore: number;
}

const philosopherDatabase: Record<string, { name: string; description: string; emoji: string }> = {
  rumi: { name: "Rumi", description: "The mystical poet of divine love who teaches that love is the path to transcendence.", emoji: "💜" },
  hafez: { name: "Hafez", description: "The master of the ghazal who speaks of wine, love, and the hidden wisdom of the heart.", emoji: "🍷" },
  saadi: { name: "Saadi", description: "The wise teacher of practical virtue and ethical conduct in everyday life.", emoji: "🌳" },
  attar: { name: "Attar", description: "The visionary mystic whose Conference of the Birds explores the journey of the soul.", emoji: "🦅" },
  sanai: { name: "Sanai", description: "The early Sufi poet who pioneered the use of romantic imagery for spiritual themes.", emoji: "🌹" },
  "ibn-sina": { name: "Ibn Sina (Avicenna)", description: "The great philosopher-physician who unified reason and wisdom in the Islamic tradition.", emoji: "📜" },
  "mulla-sadra": { name: "Mulla Sadra", description: "The transcendent philosopher who taught that being is a dynamic, living reality.", emoji: "✨" },
  "ibn-arabi": { name: "Ibn Arabi", description: "The great theorist of Sufism who articulated the wisdom of divine love and unity.", emoji: "🌅" },
  ghazali: { name: "Al-Ghazali", description: "The spiritual reformer who sought to reconcile philosophy, theology, and mysticism.", emoji: "🔮" },
  farabi: { name: "Al-Farabi", description: "The Second Teacher who laid foundations for political philosophy in the Islamic world.", emoji: "👑" },
  bayazid: { name: "Bayazid Bastami", description: "The early Sufi master known for his ecstatic utterances and teachings on divine intoxication.", emoji: "😇" },
  hallaj: { name: "Hallaj", description: "The martyr-saint who proclaimed Ana al-Haqq (I am the Truth) and symbolized divine love.", emoji: "🔥" },
};

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ philosopherId: string; score: number }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<PhilosopherResult[]>([]);

  const handleAnswer = (option: QuizQuestion['options'][0]) => {
    const newAnswers = [
      ...answers,
      ...option.philosopherIds.map((id) => ({ philosopherId: id, score: option.weight })),
    ];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: { philosopherId: string; score: number }[]) => {
    const scores: Record<string, number> = {};
    
    finalAnswers.forEach((answer) => {
      scores[answer.philosopherId] = (scores[answer.philosopherId] || 0) + answer.score;
    });

    const sortedPhilosophers = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([id, score], index) => {
        const philosopher = philosopherDatabase[id] || { name: id, description: "A wise Persian philosopher", emoji: "📚" };
        return {
          id,
          name: philosopher.name,
          description: philosopher.description,
          image: philosopher.emoji,
          matchScore: Math.round((score / (questions.length * 3)) * 100),
        };
      });

    setResults(sortedPhilosophers);
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResults([]);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Fade in>
          <Box sx={{ textAlign: 'center' }}>
            <AutoAwesomeIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h3" sx={{ mb: 2 }}>
              Your Philosophical Soulmate
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
              Based on your answers, these philosophers resonate most with your spirit
            </Typography>

            <Stack spacing={3} sx={{ mb: 4 }}>
              {results.map((result, index) => (
                <Card
                  key={result.id}
                  sx={{
                    maxWidth: 500,
                    mx: 'auto',
                    background: index === 0 
                      ? 'linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(201, 169, 98, 0.1) 100%)'
                      : 'white',
                    border: index === 0 ? '2px solid' : '1px solid',
                    borderColor: index === 0 ? 'primary.main' : 'divider',
                  }}
                >
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      width: 64, 
                      height: 64, 
                      bgcolor: index === 0 ? 'primary.main' : 'grey.300',
                      fontSize: 32,
                    }}>
                      {result.image}
                    </Avatar>
                    <Box sx={{ flex: 1, textAlign: 'left' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Typography variant="h5">
                          {result.name}
                        </Typography>
                        {index === 0 && (
                          <Chip 
                            icon={<CheckCircleIcon />} 
                            label="Best Match" 
                            color="primary" 
                            size="small" 
                          />
                        )}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {result.description}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary.main" fontWeight="bold">
                        {result.matchScore}%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Match
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Stack>

            <Button 
              variant="contained" 
              size="large"
              onClick={resetQuiz}
              sx={{ mt: 2 }}
            >
              Take Quiz Again
            </Button>
          </Box>
        </Fade>
      </Container>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Which Persian Philosopher Are You?
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Answer 10 questions to discover your philosophical soulmate
        </Typography>
      </Box>

      <Card sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Question {currentQuestion + 1} of {questions.length}
            </Typography>
            <Chip 
              label={`${Math.round(progress)}%`} 
              size="small" 
              color="primary" 
              variant="outlined" 
            />
          </Box>
          
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              mb: 4, 
              height: 8, 
              borderRadius: 4,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
              }
            }} 
          />

          <Fade in key={currentQuestion}>
            <Box>
              <Typography variant="h5" sx={{ mb: 4, minHeight: 60 }}>
                {question.question}
              </Typography>

              <Stack spacing={1.5}>
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    onClick={() => handleAnswer(option)}
                    sx={{
                      py: 2,
                      px: 3,
                      justifyContent: 'flex-start',
                      textAlign: 'left',
                      borderColor: 'divider',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'rgba(139, 69, 19, 0.05)',
                      },
                    }}
                  >
                    <Typography variant="body1">
                      {option.text}
                    </Typography>
                  </Button>
                ))}
              </Stack>
            </Box>
          </Fade>
        </CardContent>
      </Card>
    </Container>
  );
}
