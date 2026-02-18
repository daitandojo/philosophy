import mongoose, { Schema, Document } from 'mongoose';

export interface IAchievement extends Document {
  code: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'engagement' | 'social' | 'exploration';
  requirement: {
    type: string;
    count: number;
  };
  points: number;
}

const AchievementSchema = new Schema<IAchievement>({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['learning', 'engagement', 'social', 'exploration'], 
    required: true 
  },
  requirement: {
    type: { type: String, required: true },
    count: { type: Number, required: true },
  },
  points: { type: Number, default: 0 },
});

export const AchievementModel = mongoose.models.Achievement || mongoose.model<IAchievement>('Achievement', AchievementSchema);

export const DEFAULT_ACHIEVEMENTS = [
  {
    code: 'first_verse',
    name: 'First Step',
    description: 'Like your first verse',
    icon: 'favorite',
    category: 'exploration',
    requirement: { type: 'verses_liked', count: 1 },
    points: 10,
  },
  {
    code: 'verse_lover',
    name: 'Verse Lover',
    description: 'Like 10 verses',
    icon: 'favorite_border',
    category: 'exploration',
    requirement: { type: 'verses_liked', count: 10 },
    points: 50,
  },
  {
    code: 'first_chat',
    name: 'First Conversation',
    description: 'Have your first chat with a philosopher',
    icon: 'chat',
    category: 'engagement',
    requirement: { type: 'chats_started', count: 1 },
    points: 10,
  },
  {
    code: 'chatty',
    name: 'Chatty Seeker',
    description: 'Have 10 conversations with philosophers',
    icon: 'forum',
    category: 'engagement',
    requirement: { type: 'chats_started', count: 10 },
    points: 50,
  },
  {
    code: 'streak_3',
    name: 'Getting Started',
    description: 'Visit for 3 days in a row',
    icon: 'local_fire_department',
    category: 'engagement',
    requirement: { type: 'streak_days', count: 3 },
    points: 25,
  },
  {
    code: 'streak_7',
    name: 'Week Warrior',
    description: 'Visit for 7 days in a row',
    icon: 'local_fire_department',
    category: 'engagement',
    requirement: { type: 'streak_days', count: 7 },
    points: 50,
  },
  {
    code: 'streak_30',
    name: 'Monthly Master',
    description: 'Visit for 30 days in a row',
    icon: 'whatshot',
    category: 'engagement',
    requirement: { type: 'streak_days', count: 30 },
    points: 200,
  },
  {
    code: 'first_path',
    name: 'First Learning Path',
    description: 'Start your first learning path',
    icon: 'school',
    category: 'learning',
    requirement: { type: 'learning_paths_started', count: 1 },
    points: 15,
  },
  {
    code: 'path_complete',
    name: 'Path Completer',
    description: 'Complete your first learning path',
    icon: 'emoji_events',
    category: 'learning',
    requirement: { type: 'learning_paths_completed', count: 1 },
    points: 100,
  },
  {
    code: 'quiz_master',
    name: 'Quiz Master',
    description: 'Score 100% on 5 quizzes',
    icon: 'military_tech',
    category: 'learning',
    requirement: { type: 'perfect_quizzes', count: 5 },
    points: 75,
  },
  {
    code: 'first_follow',
    name: 'Social Butterfly',
    description: 'Follow your first user',
    icon: 'person_add',
    category: 'social',
    requirement: { type: 'users_followed', count: 1 },
    points: 10,
  },
  {
    code: 'community',
    name: 'Community Member',
    description: 'Join 3 users in following each other',
    icon: 'groups',
    category: 'social',
    requirement: { type: 'users_followed', count: 3 },
    points: 30,
  },
];
