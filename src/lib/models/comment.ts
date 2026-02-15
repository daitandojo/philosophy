import mongoose, { Schema, Document, Types } from 'mongoose';
import type { Comment } from '@/types';

export interface CommentDocument extends Omit<Comment, '_id' | 'userId' | 'verseId' | 'parentCommentId'>, Document {
  userId: Types.ObjectId;
  verseId: Types.ObjectId;
  parentCommentId?: Types.ObjectId;
}

const CommentSchema = new Schema<CommentDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    verseId: { type: Schema.Types.ObjectId, ref: 'Verse', required: true },
    parentCommentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CommentSchema.index({ verseId: 1 });
CommentSchema.index({ userId: 1 });

export const CommentModel = mongoose.models.Comment || mongoose.model<CommentDocument>('Comment', CommentSchema);
