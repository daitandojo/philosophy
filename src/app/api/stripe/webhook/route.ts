import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      console.log('Stripe webhook received but Stripe is not configured');
      return NextResponse.json({ 
        demo: true,
        message: 'Stripe webhook received in demo mode. In production, this would process real payments.'
      });
    }

    // In demo mode, just acknowledge receipt
    if (process.env.NODE_ENV === 'development' || process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      const body = await request.text();
      console.log('Demo webhook received:', body.substring(0, 200));
      
      return NextResponse.json({ 
        demo: true,
        received: true,
        message: 'Webhook processed in demo mode'
      });
    }

    // Real Stripe webhook processing would go here
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    //   apiVersion: '2026-02-25.clover',
    // });
    
    // const signature = request.headers.get('stripe-signature')!;
    // const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    
    // let event: Stripe.Event;
    // try {
    //   event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    // } catch (err: any) {
    //   console.error('Webhook signature verification failed:', err.message);
    //   return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    // }
    
    // Process different event types...
    
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    return NextResponse.json({ 
      error: error.message || 'Webhook handler failed' 
    }, { status: 500 });
  }
}