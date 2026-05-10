import mongoose, { Schema, Document } from 'mongoose';

export interface Visitor extends Document {
  ip: string;
  userAgent?: string;
  path?: string;
  firstSeen: Date;
  lastSeen: Date;
  visitCount: number;
}

const VisitorSchema = new Schema<Visitor>({
  ip: { type: String, required: true, index: true },
  userAgent: { type: String },
  path: { type: String },
  firstSeen: { type: Date, default: Date.now },
  lastSeen: { type: Date, default: Date.now },
  visitCount: { type: Number, default: 1 },
});

VisitorSchema.index({ lastSeen: -1 });

export const VisitorModel = mongoose.models.Visitor || mongoose.model<Visitor>('Visitor', VisitorSchema);
