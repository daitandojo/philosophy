export interface Verse {
  _id: string;
  persianText: string;
  transliteration: string;
  englishTranslation: string;
  summary: string;
  sourceWork: string;
  philosopher: string;
  themes: string[];
  wisdomScore: number;
  complexity: number;
  emotionalTone?: string;
  tags: string[];
  imageUrl?: string;
  calligraphyUrl?: string;
  audioUrl?: string;
  versions: VerseVersion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Philosopher {
  id: string;
  name: {
    persian: string;
    english: string;
    alternative?: string[];
    latin?: string;
  };
  life: {
    birth: number;
    death: number;
    birthPlace: string;
    deathPlace: string;
    era: 'ancient' | 'classical' | 'golden-age' | 'modern';
  };
  school: string[];
  description: string;
  image?: string;
  quoteCount: number;
  influence: number;
  verified: boolean;
  influences?: string[];
  influenced?: string[];
  teachers?: string[];
  students?: string[];
}

export interface Work {
  id: string;
  philosopherId: string;
  title: {
    persian: string;
    english: string;
    originalScript: string;
  };
  type: 'poetry' | 'prose' | 'treatise' | 'correspondence' | 'compilation';
  year: number;
  description: string;
  significance: string;
  structure?: {
    books?: number;
    chapters?: number;
    verses?: number;
  };
  quoteCount: number;
}

export interface VerseVersion {
  version: number;
  persianText: string;
  transliteration: string;
  englishTranslation: string;
  summary: string;
  source: 'human' | 'ai' | 'hybrid';
  confidence?: number;
  updatedAt: Date;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'admin' | 'moderator';
  preferences: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  fontSize: 'small' | 'medium' | 'large';
  layout: 'default' | 'compact';
  dailyNudge: boolean;
}

export interface Annotation {
  _id: string;
  userId: string;
  verseId: string;
  content: string;
  visibility: 'private' | 'public';
  highlightedText?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  _id: string;
  userId: string;
  verseId: string;
  parentCommentId?: string;
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  _id: string;
  userId: string;
  title: string;
  content: string;
  linkedVerseIds: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LearningPath {
  _id: string;
  title: string;
  description: string;
  verses: string[];
  lessons: Lesson[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: number;
}

export interface Lesson {
  _id: string;
  title: string;
  content: string;
  verseIds: string[];
  quiz?: Quiz;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  verseReferences?: string[];
  createdAt: Date;
}

export interface SearchResult {
  verses: Verse[];
  total: number;
  page: number;
  pageSize: number;
}
