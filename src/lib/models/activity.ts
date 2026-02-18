import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  userId: string;
  type: 'joined' | 'commented' | 'liked' | 'created_discussion' | 'followed' | 'achievement' | 'created_collection' | 'shared';
  targetType?: 'verse' | 'discussion' | 'user' | 'collection' | 'achievement';
  targetId?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId: { type: String, required: true },
    type: {
      type: String,
      enum: ['joined', 'commented', 'liked', 'created_discussion', 'followed', 'achievement', 'created_collection', 'shared'],
      required: true,
    },
    targetType: {
      type: String,
      enum: ['verse', 'discussion', 'user', 'collection', 'achievement'],
    },
    targetId: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

ActivitySchema.index({ userId: 1, createdAt: -1 });
ActivitySchema.index({ targetType: 1, targetId: 1 });

export const ActivityModel = mongoose.models.Activity || mongoose.model<IActivity>('Activity', ActivitySchema);
