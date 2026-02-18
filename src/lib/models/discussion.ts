import mongoose, { Schema, Document } from 'mongoose';

export interface IDiscussion extends Document {
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage?: string;
  category: 'general' | 'philosopher' | 'theme' | 'study-group' | 'qa' | 'news';
  philosopherId?: string;
  theme?: string;
  tags: string[];
  isPinned: boolean;
  isLocked: boolean;
  isResolved: boolean;
  likes: string[];
  views: number;
  replyCount: number;
  lastReplyAt?: Date;
  lastReplyBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DiscussionSchema = new Schema<IDiscussion>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: String, required: true },
  authorName: { type: String, required: true },
  authorImage: { type: String },
  category: { 
    type: String, 
    enum: ['general', 'philosopher', 'theme', 'study-group', 'qa', 'news'], 
    default: 'general' 
  },
  philosopherId: { type: String },
  theme: { type: String },
  tags: [{ type: String }],
  isPinned: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: false },
  isResolved: { type: Boolean, default: false },
  likes: [{ type: String }],
  views: { type: Number, default: 0 },
  replyCount: { type: Number, default: 0 },
  lastReplyAt: { type: Date },
  lastReplyBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

DiscussionSchema.index({ category: 1, createdAt: -1 });
DiscussionSchema.index({ authorId: 1 });
DiscussionSchema.index({ philosopherId: 1 });
DiscussionSchema.index({ isPinned: -1, createdAt: -1 });
DiscussionSchema.index({ title: 'text', content: 'text' });

export const Discussion = mongoose.models.Discussion || mongoose.model<IDiscussion>('Discussion', DiscussionSchema);
