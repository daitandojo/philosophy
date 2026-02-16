import mongoose, { Schema, Document } from 'mongoose';

export interface IDiscussion extends Document {
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  category: 'general' | 'philosopher' | 'theme' | 'study-group' | 'book-club' | 'qa';
  philosopherId?: string;
  theme?: string;
  tags: string[];
  isPinned: boolean;
  isResolved: boolean;
  likes: number;
  views: number;
  replyCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const DiscussionSchema = new Schema<IDiscussion>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: String, required: true },
  authorName: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['general', 'philosopher', 'theme', 'study-group', 'book-club', 'qa'], 
    default: 'general' 
  },
  philosopherId: { type: String },
  theme: { type: String },
  tags: [{ type: String }],
  isPinned: { type: Boolean, default: false },
  isResolved: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  replyCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Discussion = mongoose.models.Discussion || mongoose.model<IDiscussion>('Discussion', DiscussionSchema);
