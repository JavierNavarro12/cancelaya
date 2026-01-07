import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { markDeviceAsPaid } from '@/lib/firebase-admin';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

// Track used session IDs to prevent replay attacks
const usedSessions = new Set<string>();

export async function POST(request: NextRequest) {
  if (!stripe) {
    return NextResponse.json(
      { error: 'Stripe no está configurado', success: false },
      { status: 500 }
    );
  }

  try {
    const { sessionId, deviceId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID requerido', success: false },
        { status: 400 }
      );
    }

    if (!deviceId) {
      return NextResponse.json(
        { error: 'Device ID requerido', success: false },
        { status: 400 }
      );
    }

    // Check if session was already used (in-memory, resets on deploy)
    // For production, you'd want to store this in a database
    if (usedSessions.has(sessionId)) {
      return NextResponse.json(
        { error: 'Esta sesión de pago ya fue procesada', success: false },
        { status: 400 }
      );
    }

    // Verify the session with Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check payment status
    if (session.payment_status !== 'paid') {
      return NextResponse.json({
        success: false,
        error: 'El pago no se ha completado',
        status: session.payment_status,
      });
    }

    // Verify metadata matches (if deviceId was stored at checkout)
    const storedDeviceId = session.metadata?.deviceId;
    if (storedDeviceId && storedDeviceId !== deviceId) {
      return NextResponse.json({
        success: false,
        error: 'El dispositivo no coincide con el pago',
      }, { status: 403 });
    }

    // Mark session as used
    usedSessions.add(sessionId);

    // Mark device as paid using Admin SDK (server-side, secure)
    const marked = await markDeviceAsPaid(deviceId);

    if (!marked) {
      return NextResponse.json({
        success: false,
        error: 'Error al guardar el estado de pago',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      email: session.customer_details?.email,
    });
  } catch (error) {
    console.error('Error procesando pago:', error);
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json(
      { error: 'Error al procesar el pago', details: message, success: false },
      { status: 500 }
    );
  }
}
