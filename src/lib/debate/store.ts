import { create } from 'zustand';

export type DebateParticipant = 'user' | 'rationalist' | 'mystic' | 'moderator';

export interface DebateMessage {
  id: string;
  role: DebateParticipant;
  content: string;
  timestamp: number;
}

export interface DebateState {
  messages: DebateMessage[];
  currentTurn: 'rationalist' | 'mystic' | 'user' | null;
  isLoading: boolean;
  debateTopic: string | null;
  
  // Actions
  setTopic: (topic: string) => void;
  addMessage: (message: Omit<DebateMessage, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  setCurrentTurn: (turn: DebateState['currentTurn']) => void;
  clearDebate: () => void;
}

export const useDebateStore = create<DebateState>((set) => ({
  messages: [],
  currentTurn: null,
  isLoading: false,
  debateTopic: null,
  
  setTopic: (topic) => set({ debateTopic: topic }),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    }],
  })),
  
  setLoading: (isLoading) => set({ isLoading }),
  
  setCurrentTurn: (currentTurn) => set({ currentTurn }),
  
  clearDebate: () => set({
    messages: [],
    currentTurn: null,
    isLoading: false,
    debateTopic: null,
  }),
}));
