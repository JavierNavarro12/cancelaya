import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe no está configurado', verified: false },
      { status: 500 }
    );
  }

  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID requerido', verified: false },
        { status: 400 }
      );
    }

    // Verificar la sesión con Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Solo marcar como pagado si el pago fue exitoso
    if (session.payment_status === 'paid') {
      return NextResponse.json({
        verified: true,
        email: session.customer_details?.email,
        amount: session.amount_total,
      });
    } else {
      return NextResponse.json({
        verified: false,
        error: 'El pago no se ha completado',
        status: session.payment_status,
      });
    }
  } catch (error) {
    console.error('Error verificando pago:', error);
    return NextResponse.json(
      { error: 'Error al verificar el pago', verified: false },
      { status: 500 }
    );
  }
}
