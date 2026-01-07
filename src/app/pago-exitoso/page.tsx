'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Scissors, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { getDeviceId } from '@/lib/firebase';

type PaymentStatus = 'verifying' | 'success' | 'error';

function PaymentVerification() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<PaymentStatus>('verifying');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    async function verifyPayment() {
      const sessionId = searchParams.get('session_id');

      // Si no hay session_id, es un acceso directo no autorizado
      if (!sessionId) {
        setStatus('error');
        setErrorMessage('Acceso no autorizado. No se encontró información del pago.');
        return;
      }

      try {
        // Get deviceId from localStorage
        const deviceId = getDeviceId();

        // Verificar el pago y marcar como pagado (server-side seguro)
        const response = await fetch('/api/mark-paid', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, deviceId }),
        });

        const data = await response.json();

        if (data.success) {
          setStatus('success');

          // Redirigir después de 2 segundos
          setTimeout(() => {
            router.push('/');
          }, 2000);
        } else {
          setStatus('error');
          setErrorMessage(data.error || 'No se pudo verificar el pago.');
        }
      } catch (error) {
        console.error('Error verificando pago:', error);
        setStatus('error');
        setErrorMessage('Error al verificar el pago. Contacta con soporte si el cargo fue realizado.');
      }
    }

    verifyPayment();
  }, [searchParams, router]);

  return (
    <div className="text-center max-w-md">
      {status === 'verifying' && (
        <>
          <div className="mb-8">
            <Loader2 className="w-20 h-20 text-[var(--accent)] mx-auto animate-spin" />
          </div>
          <h1 className="font-display text-4xl mb-4">Verificando pago...</h1>
          <p className="text-[var(--muted)]">
            Estamos confirmando tu pago con Stripe.
          </p>
        </>
      )}

      {status === 'success' && (
        <>
          <div className="mb-8 animate-bounce">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </div>
          <h1 className="font-display text-4xl mb-4">¡Pago completado!</h1>
          <p className="text-[var(--muted)] mb-8">
            Gracias por tu compra. Ya puedes ver todas tus suscripciones sin límites.
          </p>
          <p className="text-sm text-[var(--muted)]">
            Redirigiendo automáticamente...
          </p>
        </>
      )}

      {status === 'error' && (
        <>
          <div className="mb-8">
            <XCircle className="w-20 h-20 text-red-500 mx-auto" />
          </div>
          <h1 className="font-display text-4xl mb-4">Error de verificación</h1>
          <p className="text-[var(--muted)] mb-8">
            {errorMessage}
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-[var(--accent)] text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Volver al inicio
          </button>
        </>
      )}

      <div className="flex items-center justify-center gap-2 text-[var(--accent)] mt-8">
        <Scissors className="w-5 h-5" />
        <span className="font-display">CancelaYa</span>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="text-center max-w-md">
      <div className="mb-8">
        <Loader2 className="w-20 h-20 text-[var(--accent)] mx-auto animate-spin" />
      </div>
      <h1 className="font-display text-4xl mb-4">Cargando...</h1>
      <div className="flex items-center justify-center gap-2 text-[var(--accent)] mt-8">
        <Scissors className="w-5 h-5" />
        <span className="font-display">CancelaYa</span>
      </div>
    </div>
  );
}

export default function PagoExitoso() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Suspense fallback={<LoadingFallback />}>
        <PaymentVerification />
      </Suspense>
    </main>
  );
}
