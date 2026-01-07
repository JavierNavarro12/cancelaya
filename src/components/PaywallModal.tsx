'use client';

import { useState } from 'react';

interface PaywallModalProps {
  blockedCount: number;
  blockedTotal: number;
  onUnlock: () => void | Promise<void>;
  onClose: () => void;
}

export function PaywallModal({ blockedCount, blockedTotal, onUnlock, onClose }: PaywallModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/create-checkout', { method: 'POST' });
      const data = await response.json();
      
      if (data.url) {
        // Redirigir a Stripe Checkout
        window.location.href = data.url;
      } else if (data.error?.includes('no está configurado')) {
        // Stripe no configurado - modo demo
        console.log('Modo demo: Stripe no configurado');
        await new Promise(resolve => setTimeout(resolve, 1000));
        onUnlock();
      } else {
        throw new Error(data.error || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error en el pago:', error);
      // En modo desarrollo sin Stripe, desbloquear directamente
      onUnlock();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white text-center">
          <div className="text-5xl mb-3">🔒</div>
          <h2 className="text-2xl font-bold mb-2">
            {blockedCount} suscripciones ocultas
          </h2>
          <p className="text-blue-100">
            Podrías estar perdiendo {blockedTotal.toFixed(0)}€/año
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-700">Ver todas tus suscripciones</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-700">Enlaces directos para cancelar</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-gray-700">Escaneos ilimitados de por vida</span>
            </div>
          </div>

          {/* Precio */}
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-900">2,99€</div>
            <div className="text-gray-500 text-sm">Pago único · Sin suscripción</div>
          </div>

          {/* Botones */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-xl transition-colors mb-3 flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Procesando...
              </>
            ) : (
              <>
                🔓 Desbloquear — 2,99€
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors"
          >
            Continuar con resultados limitados
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 text-center">
          <p className="text-xs text-gray-400">
            🔒 Pago seguro con Stripe · Sin almacenar datos de tarjeta
          </p>
        </div>
      </div>
    </div>
  );
}

