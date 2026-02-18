import mongoose, { Schema, Document, Types } from 'mongoose';
import type { BlogPost } from '@/types';

export interface BlogPostDocument extends Omit<BlogPost, '_id' | 'userId' | 'linkedVerseIds'>, Document {
  userId: Types.ObjectId;
  linkedVerseIds: Types.ObjectId[];
}

const BlogPostSchema = new Schema<BlogPostDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    author: { type: String, default: 'The Sages of Persia' },
    category: { 
      type: String, 
      enum: ['politics', 'technology', 'spirituality', 'society', 'philosophy', 'ethics'],
      default: 'philosophy'
    },
    tags: [{ type: String }],
    readingTime: { type: Number },
    linkedVerseIds: [{ type: Schema.Types.ObjectId, ref: 'Verse' }],
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    seo: {
      title: String,
      description: String,
      keywords: [String],
    },
  },
  { timestamps: true }
);

BlogPostSchema.index({ published: 1, publishedAt: -1 });
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ category: 1 });

export const BlogPostModel = mongoose.models.BlogPost || mongoose.model<BlogPostDocument>('BlogPost', BlogPostSchema);
