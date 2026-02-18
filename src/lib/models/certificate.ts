import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  userId: string;
  learningPathId: string;
  learningPathTitle: string;
  userName: string;
  completedAt: Date;
  certificateUrl?: string;
  verificationCode: string;
}

const CertificateSchema = new Schema<ICertificate>({
  userId: { type: String, required: true },
  learningPathId: { type: String, required: true },
  learningPathTitle: { type: String, required: true },
  userName: { type: String, required: true },
  completedAt: { type: Date, default: Date.now },
  certificateUrl: { type: String },
  verificationCode: { type: String, required: true, unique: true },
});

CertificateSchema.index({ userId: 1 });
CertificateSchema.index({ verificationCode: 1 });

export const CertificateModel = mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);
