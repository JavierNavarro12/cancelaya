'use client';

import { useState, useEffect, useCallback } from 'react';
import { getUserUsage, registerScan as firebaseRegisterScan, markAsPaid as firebaseMarkAsPaid } from '@/lib/firebase';

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

  // Cargar estado desde Firebase
  useEffect(() => {
    async function loadUsage() {
      const usage = await getUserUsage();
      
      if (usage) {
        setState({
          scanCount: usage.scanCount,
          isPaid: usage.paid,
          isLoading: false,
          isFirstScan: usage.scanCount === 0,
        });
      } else {
        // Usuario nuevo
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

  // Registrar un nuevo escaneo
  const registerScan = useCallback(async () => {
    const newCount = await firebaseRegisterScan();
    setState(prev => ({
      ...prev,
      scanCount: newCount,
      isFirstScan: false,
    }));
    return newCount;
  }, []);

  // Marcar como pagado
  const markAsPaid = useCallback(async () => {
    const success = await firebaseMarkAsPaid();
    if (success) {
      setState(prev => ({
        ...prev,
        isPaid: true,
      }));
    }
    return success;
  }, []);

  // Filtrar suscripciones según estado de pago
  const filterSubscriptions = useCallback(<T extends { nombre: string }>(
    suscripciones: T[]
  ): { visible: T[]; blocked: T[] } => {
    // Si ya pagó, mostrar todo
    if (state.isPaid) {
      return { visible: suscripciones, blocked: [] };
    }
    
    // Si es el primer escaneo (scanCount = 0), mostrar todo
    if (state.isFirstScan || state.scanCount === 0) {
      return { visible: suscripciones, blocked: [] };
    }

    // Si ya escaneó antes, bloquear mitad
    const mitad = Math.ceil(suscripciones.length / 2);
    return {
      visible: suscripciones.slice(0, mitad),
      blocked: suscripciones.slice(mitad),
    };
  }, [state.isPaid, state.isFirstScan, state.scanCount]);

  return {
    ...state,
    registerScan,
    markAsPaid,
    filterSubscriptions,
  };
}
