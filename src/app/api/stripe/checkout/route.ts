import { NextRequest, NextResponse } from 'next/server';

const PLANS = {
  'the-dervish': {
    priceId: process.env.STRIPE_DERVISH_PRICE_ID!,
    name: 'The Dervish',
    description: 'Monthly subscription for dedicated students of wisdom'
  },
  'the-patron': {
    priceId: process.env.STRIPE_PATRON_PRICE_ID!,
    name: 'The Patron',
    description: 'Monthly subscription for wisdom sustainers'
  }
};

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      return NextResponse.json({ 
        error: 'Stripe payment system is not configured. Please contact support.',
        demo: true
      }, { status: 503 });
    }

    const body = await request.json();
    const { plan, userId, userEmail, successUrl, cancelUrl } = body;

    if (!plan || !PLANS[plan as keyof typeof PLANS]) {
      return NextResponse.json({ 
        error: 'Invalid plan selected' 
      }, { status: 400 });
    }

    const planData = PLANS[plan as keyof typeof PLANS];

    // In demo mode, return success without actual payment
    if (process.env.NODE_ENV === 'development' || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      return NextResponse.json({ 
        demo: true,
        message: 'Payment system is in demo mode. In production, this would redirect to Stripe checkout.',
        plan: planData.name,
        successUrl: successUrl || `${process.env.NEXTAUTH_URL}/premium/success?demo=true`,
      });
    }

    // Real Stripe integration would go here
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    //   apiVersion: '2026-02-25.clover',
    // });
    
    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ['card'],
    //   line_items: [{ price: planData.priceId, quantity: 1 }],
    //   mode: 'subscription',
    //   success_url: successUrl || `${process.env.NEXTAUTH_URL}/premium/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: cancelUrl || `${process.env.NEXTAUTH_URL}/premium`,
    //   customer_email: userEmail,
    //   metadata: { userId: userId || 'anonymous', plan },
    // });

    return NextResponse.json({ 
      sessionId: 'demo_session_id',
      url: `${process.env.NEXTAUTH_URL}/premium/success?demo=true`,
      demo: true
    });
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to create checkout session' 
    }, { status: 500 });
  }
}