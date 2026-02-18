import mongoose, { Schema, Document } from 'mongoose';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  tokens?: number;
  verseReferences?: string[];
}

export interface Conversation extends Document {
  userId: string;
  philosopherId: string;
  title: string;
  messages: ChatMessage[];
  isArchived: boolean;
  isShared: boolean;
  sharedToken?: string;
  shareExpiresAt?: Date;
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const ChatMessageSchema = new Schema<ChatMessage>(
  {
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true,
    },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    tokens: { type: Number },
    verseReferences: [{ type: String }],
  },
  { _id: false }
);

const ConversationSchema = new Schema<Conversation>(
  {
    userId: { type: String, required: true },
    philosopherId: { type: String, required: true },
    title: { type: String, default: 'New Conversation' },
    messages: [ChatMessageSchema],
    isArchived: { type: Boolean, default: false },
    isShared: { type: Boolean, default: false },
    sharedToken: { type: String },
    shareExpiresAt: { type: Date },
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ConversationSchema.index({ userId: 1, updatedAt: -1 });
ConversationSchema.index({ philosopherId: 1 });
ConversationSchema.index({ sharedToken: 1 });
ConversationSchema.index({ title: 'text', 'messages.content': 'text' });

export const ConversationModel = mongoose.models.Conversation || mongoose.model<Conversation>('Conversation', ConversationSchema);
