'use client';

import { useEffect, useState } from 'react';
import { Users, PiggyBank, FileSearch, TrendingUp } from 'lucide-react';

// Simular estadísticas que crecen gradualmente
function useAnimatedNumber(target: number, duration: number = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(target * eased));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration]);

  return value;
}

export default function Estadisticas() {
  // Base numbers + small random increment to simulate "live" data
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const baseUsers = 1247;
  const baseSavings = 89420;
  const baseScans = 3891;
  
  const users = useAnimatedNumber(mounted ? baseUsers : 0);
  const savings = useAnimatedNumber(mounted ? baseSavings : 0);
  const scans = useAnimatedNumber(mounted ? baseScans : 0);

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent to-[var(--card)]/50">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <p className="font-display text-3xl md:text-4xl mb-1">
              {users.toLocaleString('es-ES')}+
            </p>
            <p className="text-sm text-[var(--muted)]">Usuarios</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mx-auto mb-3">
              <PiggyBank className="w-6 h-6 text-green-500" />
            </div>
            <p className="font-display text-3xl md:text-4xl mb-1">
              {savings.toLocaleString('es-ES')}€
            </p>
            <p className="text-sm text-[var(--muted)]">Ahorrados</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
              <FileSearch className="w-6 h-6 text-blue-500" />
            </div>
            <p className="font-display text-3xl md:text-4xl mb-1">
              {scans.toLocaleString('es-ES')}+
            </p>
            <p className="text-sm text-[var(--muted)]">Análisis</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
            <p className="font-display text-3xl md:text-4xl mb-1">
              847€
            </p>
            <p className="text-sm text-[var(--muted)]">Ahorro medio/año</p>
          </div>
        </div>
      </div>
    </section>
  );
}


