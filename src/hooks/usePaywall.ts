'use client';

import { useState, useEffect, useCallback } from 'react';
import { getDeviceId } from '@/lib/firebase';

interface PaywallState {
  scanCount: number;
  isPaid: boolean;
  isLoading: boolean;
  isFirstScan: boolean;
}

export function usePaywall() {
  const [state, setState] = useState<PaywallState>({
    scanCount: 0,
    isPaid: false,
    isLoading: true,
    isFirstScan: true,
  });

  // Cargar estado desde el servidor
  useEffect(() => {
    async function loadUsage() {
      try {
        const deviceId = getDeviceId();
        const response = await fetch(`/api/register-scan?deviceId=${deviceId}`);
        const data = await response.json();

        setState({
          scanCount: data.scanCount || 0,
          isPaid: data.paid || false,
          isLoading: false,
          isFirstScan: (data.scanCount || 0) === 0,
        });
      } catch (error) {
        console.error('Error loading usage:', error);
        // En caso de error, permitir uso sin restricciones
        setState({
          scanCount: 0,
          isPaid: false,
          isLoading: false,
          isFirstScan: true,
        });
      }
    }

    loadUsage();
  }, []);

  // Registrar un nuevo escaneo (server-side)
  const registerScan = useCallback(async () => {
    try {
      const deviceId = getDeviceId();
      const response = await fetch('/api/register-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId }),
      });
      const data = await response.json();

      if (data.success) {
        setState(prev => ({
          ...prev,
          scanCount: data.scanCount,
          isFirstScan: false,
        }));
        return data.scanCount;
      }
      return state.scanCount;
    } catch (error) {
      console.error('Error registering scan:', error);
      return state.scanCount;
    }
  }, [state.scanCount]);

  // Marcar como pagado (ya no se usa desde cliente - se hace en /pago-exitoso)
  const markAsPaid = useCallback(async () => {
    setState(prev => ({
      ...prev,
      isPaid: true,
    }));
    return true;
  }, []);

  // Filtrar suscripciones según estado de pago
  const filterSubscriptions = useCallback(<T extends { nombre: string }>(
    suscripciones: T[]
  ): { visible: T[]; blocked: T[] } => {
    console.log('[Paywall] filterSubscriptions called with:', {
      isPaid: state.isPaid,
      scanCount: state.scanCount,
      numSubs: suscripciones.length,
    });

    // Si ya pagó, mostrar todo
    if (state.isPaid) {
      console.log('[Paywall] User paid, showing all');
      return { visible: suscripciones, blocked: [] };
    }

    // Primer escaneo gratis (scanCount = 1 después de registrar)
    // Bloquear a partir del segundo escaneo (scanCount >= 2)
    if (state.scanCount <= 1) {
      console.log('[Paywall] First scan free, showing all');
      return { visible: suscripciones, blocked: [] };
    }

    // A partir del segundo escaneo, bloquear mitad
    console.log('[Paywall] Blocking half subscriptions');
    const mitad = Math.ceil(suscripciones.length / 2);
    return {
      visible: suscripciones.slice(0, mitad),
      blocked: suscripciones.slice(mitad),
    };
  }, [state.isPaid, state.scanCount]);

  return {
    ...state,
    registerScan,
    markAsPaid,
    filterSubscriptions,
  };
}
