import mongoose, { Schema, Document } from 'mongoose';

export interface IFollow extends Document {
  followerId: string;
  followingId: string;
  createdAt: Date;
}

const FollowSchema = new Schema<IFollow>(
  {
    followerId: { type: String, required: true },
    followingId: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

FollowSchema.index({ followerId: 1, followingId: 1 }, { unique: true });
FollowSchema.index({ followingId: 1, createdAt: -1 });

export const FollowModel = mongoose.models.Follow || mongoose.model<IFollow>('Follow', FollowSchema);
