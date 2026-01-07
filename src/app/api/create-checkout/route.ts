import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Inicializar Stripe solo si la clave está configurada
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST() {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe no está configurado. Añade STRIPE_SECRET_KEY a .env.local' },
      { status: 500 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'CancelaYa - Desbloqueo completo',
              description: 'Acceso de por vida a todos los resultados de suscripciones',
            },
            unit_amount: 299, // 2.99€ en céntimos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/pago-exitoso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creando sesión de Stripe:', error);
    return NextResponse.json(
      { error: 'Error al procesar el pago' },
      { status: 500 }
    );
  }
}

