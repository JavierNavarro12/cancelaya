'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Scissors, CheckCircle } from 'lucide-react';
import { markAsPaid } from '@/lib/firebase';

export default function PagoExitoso() {
  const router = useRouter();
  const [saving, setSaving] = useState(true);

  useEffect(() => {
    async function savePaidStatus() {
      // Marcar como pagado en Firebase
      await markAsPaid();
      setSaving(false);
      
      // Redirigir después de 2 segundos
      const timer = setTimeout(() => {
        router.push('/');
      }, 2000);

      return () => clearTimeout(timer);
    }
    
    savePaidStatus();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8 animate-bounce">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
        </div>
        
        <h1 className="font-display text-4xl mb-4">¡Pago completado!</h1>
        
        <p className="text-[var(--muted)] mb-8">
          Gracias por tu compra. Ya puedes ver todas tus suscripciones sin límites.
        </p>
        
        <div className="flex items-center justify-center gap-2 text-[var(--accent)]">
          <Scissors className="w-5 h-5" />
          <span className="font-display">CancelaYa</span>
        </div>
        
        <p className="text-sm text-[var(--muted)] mt-8">
          Redirigiendo automáticamente...
        </p>
      </div>
    </main>
  );
}

