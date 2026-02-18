import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IComment extends Document {
  userId: string;
  verseId?: string;
  discussionId?: string;
  parentCommentId?: string;
  content: string;
  likes: string[];
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    userId: { type: String, required: true },
    verseId: { type: String },
    discussionId: { type: String },
    parentCommentId: { type: String },
    content: { type: String, required: true },
    likes: [{ type: String }],
    isEdited: { type: Boolean, default: false },
  },
  { timestamps: true }
);

CommentSchema.index({ verseId: 1, createdAt: -1 });
CommentSchema.index({ discussionId: 1, createdAt: -1 });
CommentSchema.index({ parentCommentId: 1 });
CommentSchema.index({ userId: 1 });

export const CommentModel = mongoose.models.Comment || mongoose.model<IComment>('Comment', CommentSchema);
