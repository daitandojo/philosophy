import { NextRequest, NextResponse } from 'next/server';

interface Affiliate {
  id: string;
  userId: string;
  code: string;
  commission: number;
  referrals: number;
  earnings: number;
  status: 'active' | 'pending' | 'paused';
  createdAt: Date;
}

const affiliates: Map<string, Affiliate> = new Map();

function generateAffiliateCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'HIKMATIA-';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, commission = 20 } = body;

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    const existingCode = Array.from(affiliates.values()).find(a => a.userId === userId);
    if (existingCode) {
      return NextResponse.json({ affiliate: existingCode });
    }

    const affiliate: Affiliate = {
      id: `aff_${Date.now()}`,
      userId,
      code: generateAffiliateCode(),
      commission,
      referrals: 0,
      earnings: 0,
      status: 'active',
      createdAt: new Date(),
    };

    affiliates.set(affiliate.id, affiliate);

    return NextResponse.json({ 
      message: 'Affiliate account created',
      affiliate 
    });
  } catch (error) {
    console.error('Affiliate creation error:', error);
    return NextResponse.json({ error: 'Failed to create affiliate account' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const code = searchParams.get('code');

    if (userId) {
      const affiliate = Array.from(affiliates.values()).find(a => a.userId === userId);
      if (!affiliate) {
        return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });
      }
      return NextResponse.json({ affiliate });
    }

    if (code) {
      const affiliate = Array.from(affiliates.values()).find(a => a.code === code);
      if (!affiliate) {
        return NextResponse.json({ error: 'Invalid affiliate code' }, { status: 404 });
      }
      return NextResponse.json({ affiliate });
    }

    const allAffiliates = Array.from(affiliates.values());
    const totalEarnings = allAffiliates.reduce((sum, a) => sum + a.earnings, 0);
    const totalReferrals = allAffiliates.reduce((sum, a) => sum + a.referrals, 0);

    return NextResponse.json({
      affiliates: allAffiliates,
      stats: {
        totalAffiliates: allAffiliates.length,
        totalEarnings,
        totalReferrals,
        averageCommission: allAffiliates.length > 0 
          ? allAffiliates.reduce((sum, a) => sum + a.commission, 0) / allAffiliates.length 
          : 0,
      },
    });
  } catch (error) {
    console.error('Affiliate fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch affiliate data' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { affiliateId, action, commission } = body;

    if (!affiliateId || !action) {
      return NextResponse.json({ error: 'affiliateId and action are required' }, { status: 400 });
    }

    const affiliate = affiliates.get(affiliateId);
    if (!affiliate) {
      return NextResponse.json({ error: 'Affiliate not found' }, { status: 404 });
    }

    if (action === 'pause') {
      affiliate.status = 'paused';
    } else if (action === 'activate') {
      affiliate.status = 'active';
    } else if (action === 'updateCommission' && commission) {
      affiliate.commission = commission;
    }

    affiliates.set(affiliateId, affiliate);

    return NextResponse.json({ 
      message: 'Affiliate updated',
      affiliate 
    });
  } catch (error) {
    console.error('Affiliate update error:', error);
    return NextResponse.json({ error: 'Failed to update affiliate' }, { status: 500 });
  }
}
