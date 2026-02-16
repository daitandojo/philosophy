import { NextRequest, NextResponse } from 'next/server';

interface ScholarVerification {
  id: string;
  userId: string;
  name: string;
  credentials: string;
  institution: string;
  status: 'pending' | 'approved' | 'rejected';
  verifiedAt?: Date;
  submittedAt: Date;
}

const verifications: Map<string, ScholarVerification> = new Map();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, name, credentials, institution } = body;

    if (!userId || !name || !credentials) {
      return NextResponse.json({ error: 'userId, name, and credentials are required' }, { status: 400 });
    }

    const verification: ScholarVerification = {
      id: `scholar_${Date.now()}`,
      userId,
      name,
      credentials,
      institution: institution || '',
      status: 'pending',
      submittedAt: new Date(),
    };

    verifications.set(verification.id, verification);

    return NextResponse.json({ 
      message: 'Verification request submitted',
      verification 
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Failed to submit verification' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');

    if (userId) {
      const verification = Array.from(verifications.values()).find(v => v.userId === userId);
      if (!verification) {
        return NextResponse.json({ error: 'Verification not found' }, { status: 404 });
      }
      return NextResponse.json({ verification });
    }

    const filtered = status 
      ? Array.from(verifications.values()).filter(v => v.status === status)
      : Array.from(verifications.values());

    return NextResponse.json({ verifications: filtered });
  } catch (error) {
    console.error('Verification fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch verifications' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { verificationId, action, notes } = body;

    if (!verificationId || !action) {
      return NextResponse.json({ error: 'verificationId and action are required' }, { status: 400 });
    }

    const verification = verifications.get(verificationId);
    if (!verification) {
      return NextResponse.json({ error: 'Verification not found' }, { status: 404 });
    }

    if (action === 'approve') {
      verification.status = 'approved';
      verification.verifiedAt = new Date();
    } else if (action === 'reject') {
      verification.status = 'rejected';
      verification.verifiedAt = new Date();
    }

    verifications.set(verificationId, verification);

    return NextResponse.json({ 
      message: `Verification ${action}ed`,
      verification 
    });
  } catch (error) {
    console.error('Verification update error:', error);
    return NextResponse.json({ error: 'Failed to update verification' }, { status: 500 });
  }
}
