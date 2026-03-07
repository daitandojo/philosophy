'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProgress {
  wordsRead: number;
  timeSpentContemplating: number; // in seconds
  philosophersVisited: string[];
  versesSaved: number;
  annotationsWritten: number;
  collectionsCreated: number;
  discussionsStarted: number;
  lastActiveDate: string;
  currentStreak: number;
  longestStreak: number;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: (progress: UserProgress) => boolean;
  tier: 'bronze' | 'silver' | 'gold';
}

const BADGES: Badge[] = [
  // Bronze badges
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Begin your journey of wisdom',
    icon: '👣',
    requirement: (p) => p.wordsRead >= 100,
    tier: 'bronze',
  },
  {
    id: 'seeker',
    name: 'The Seeker',
    description: 'Visit 3 different philosophers',
    icon: '🔍',
    requirement: (p) => p.philosophersVisited.length >= 3,
    tier: 'bronze',
  },
  {
    id: 'collector',
    name: 'The Collector',
    description: 'Save your first verse to a collection',
    icon: '📚',
    requirement: (p) => p.versesSaved >= 1,
    tier: 'bronze',
  },
  // Silver badges
  {
    id: 'peripatetic',
    name: 'The Peripatetic',
    description: 'Read 50 pages of Avicenna/Farabi',
    icon: '🚶',
    requirement: (p) => p.philosophersVisited.includes('ibn-sina') && p.philosophersVisited.includes('al-farabi') && p.wordsRead >= 5000,
    tier: 'silver',
  },
  {
    id: 'illuminationist',
    name: 'The Illuminationist',
    description: 'Read 50 pages of Suhrawardi',
    icon: '💡',
    requirement: (p) => p.philosophersVisited.includes('suhrawardi') && p.wordsRead >= 5000,
    tier: 'silver',
  },
  {
    id: 'nightingale',
    name: 'The Nightingale',
    description: 'Share 10 verses with the community',
    icon: '🌹',
    requirement: (p) => p.versesSaved >= 10,
    tier: 'silver',
  },
  {
    id: 'annotator',
    name: 'The Annotator',
    description: 'Write 5 scholarly annotations',
    icon: '✍️',
    requirement: (p) => p.annotationsWritten >= 5,
    tier: 'silver',
  },
  // Gold badges
  {
    id: 'scholar',
    name: 'The Scholar',
    description: 'Accumulate 10,000 words of wisdom',
    icon: '📖',
    requirement: (p) => p.wordsRead >= 10000,
    tier: 'gold',
  },
  {
    id: 'custodian',
    name: 'The Custodian',
    description: 'Create 5 collections for the community',
    icon: '🏛️',
    requirement: (p) => p.collectionsCreated >= 5,
    tier: 'gold',
  },
  {
    id: 'dialogue-starter',
    name: 'Dialogue Starter',
    description: 'Start 3 meaningful discussions',
    icon: '💬',
    requirement: (p) => p.discussionsStarted >= 3,
    tier: 'gold',
  },
  {
    id: 'monthly-seeker',
    name: 'Monthly Seeker',
    description: 'Maintain a 30-day streak',
    icon: '🏆',
    requirement: (p) => p.longestStreak >= 30,
    tier: 'gold',
  },
];

interface GamificationState extends UserProgress {
  unlockedBadges: string[];
  recentBadgeUnlock?: string;
  
  // Actions
  addWordsRead: (count: number) => void;
  addContemplationTime: (seconds: number) => void;
  visitPhilosopher: (philosopherId: string) => void;
  saveVerse: () => void;
  writeAnnotation: () => void;
  createCollection: () => void;
  startDiscussion: () => void;
  checkAndUnlockBadges: () => string[];
  getBadges: () => Badge[];
  getUnlockedBadges: () => Badge[];
}

const getInitialProgress = (): UserProgress => ({
  wordsRead: 0,
  timeSpentContemplating: 0,
  philosophersVisited: [],
  versesSaved: 0,
  annotationsWritten: 0,
  collectionsCreated: 0,
  discussionsStarted: 0,
  lastActiveDate: new Date().toISOString().split('T')[0],
  currentStreak: 0,
  longestStreak: 0,
});

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      ...getInitialProgress(),
      unlockedBadges: [],
      recentBadgeUnlock: undefined,

      addWordsRead: (count) => {
        set((state) => ({ wordsRead: state.wordsRead + count }));
        get().checkAndUnlockBadges();
      },

      addContemplationTime: (seconds) => {
        set((state) => ({ 
          timeSpentContemplating: state.timeSpentContemplating + seconds 
        }));
        get().checkAndUnlockBadges();
      },

      visitPhilosopher: (philosopherId) => {
        set((state) => {
          if (state.philosophersVisited.includes(philosopherId)) {
            return state;
          }
          return { 
            philosophersVisited: [...state.philosophersVisited, philosopherId] 
          };
        });
        get().checkAndUnlockBadges();
      },

      saveVerse: () => {
        set((state) => ({ versesSaved: state.versesSaved + 1 }));
        get().checkAndUnlockBadges();
      },

      writeAnnotation: () => {
        set((state) => ({ annotationsWritten: state.annotationsWritten + 1 }));
        get().checkAndUnlockBadges();
      },

      createCollection: () => {
        set((state) => ({ collectionsCreated: state.collectionsCreated + 1 }));
        get().checkAndUnlockBadges();
      },

      startDiscussion: () => {
        set((state) => ({ discussionsStarted: state.discussionsStarted + 1 }));
        get().checkAndUnlockBadges();
      },

      checkAndUnlockBadges: () => {
        const state = get();
        const newlyUnlocked: string[] = [];
        
        BADGES.forEach((badge) => {
          if (!state.unlockedBadges.includes(badge.id) && badge.requirement(state)) {
            newlyUnlocked.push(badge.id);
          }
        });
        
        if (newlyUnlocked.length > 0) {
          set((state) => ({
            unlockedBadges: [...state.unlockedBadges, ...newlyUnlocked],
            recentBadgeUnlock: newlyUnlocked[newlyUnlocked.length - 1],
          }));
        }
        
        // Update streak
        const today = new Date().toISOString().split('T')[0];
        if (state.lastActiveDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          
          let newStreak = 1;
          if (state.lastActiveDate === yesterdayStr) {
            newStreak = state.currentStreak + 1;
          }
          
          set({
            lastActiveDate: today,
            currentStreak: newStreak,
            longestStreak: Math.max(state.longestStreak, newStreak),
          });
        }
        
        return newlyUnlocked;
      },

      getBadges: () => BADGES,

      getUnlockedBadges: () => {
        const state = get();
        return BADGES.filter((b) => state.unlockedBadges.includes(b.id));
      },
    }),
    {
      name: 'hikmatia-gamification',
    }
  )
);

export default useGamificationStore;
