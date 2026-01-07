import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inicializar Stripe solo si la clave está configurada
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe no está configurado. Añade STRIPE_SECRET_KEY a .env.local' },
      { status: 500 }
    );
  }

  try {
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!priceId) {
      return NextResponse.json(
        { error: 'STRIPE_PRICE_ID no está configurado' },
        { status: 500 }
      );
    }

    // Get deviceId from request body
    const { deviceId } = await request.json().catch(() => ({ deviceId: undefined }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`,
      // Store deviceId in metadata for secure verification later
      metadata: deviceId ? { deviceId } : undefined,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creando sesión de Stripe:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { error: 'Error al procesar el pago', details: errorMessage },
      { status: 500 }
    );
  }
}

