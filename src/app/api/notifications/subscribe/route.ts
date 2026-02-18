import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

interface PushSubscriptionDocument extends Document {
  userId: string;
  subscription: PushSubscription;
  createdAt: Date;
}

const PushSubscriptionSchema = new mongoose.Schema<PushSubscriptionDocument>({
  userId: { type: String, required: true },
  subscription: {
    endpoint: { type: String, required: true },
    keys: {
      p256dh: { type: String, required: true },
      auth: { type: String, required: true },
    },
  },
  createdAt: { type: Date, default: Date.now },
});

const PushSubscriptionModel = mongoose.models.PushSubscription || mongoose.model<PushSubscriptionDocument>('PushSubscription', PushSubscriptionSchema);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, subscription } = body;

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: 'Valid push subscription required' }, { status: 400 });
    }

    await connectDB();

    await PushSubscriptionModel.findOneAndUpdate(
      { 'subscription.endpoint': subscription.endpoint },
      {
        userId: userId || 'anonymous',
        subscription,
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Push subscription error:', error);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) {
      return NextResponse.json({ error: 'Endpoint required' }, { status: 400 });
    }

    await connectDB();

    await PushSubscriptionModel.findOneAndDelete({ 'subscription.endpoint': endpoint });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Push unsubscription error:', error);
    return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 });
  }
}
