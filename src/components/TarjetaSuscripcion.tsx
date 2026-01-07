'use client';

import { ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { Suscripcion } from '@/types';

interface TarjetaSuscripcionProps {
  suscripcion: Suscripcion;
  index: number;
}

const categoriasIconos: Record<string, string> = {
  streaming: '🎬',
  gimnasio: '💪',
  software: '💻',
  telefonia: '📱',
  seguros: '🛡️',
  banca: '🏦',
  otros: '📦',
};

const frecuenciaTexto: Record<string, string> = {
  mensual: '/mes',
  anual: '/año',
  semanal: '/semana',
  trimestral: '/trimestre',
};

export default function TarjetaSuscripcion({ suscripcion, index }: TarjetaSuscripcionProps) {
  const confianzaColor = {
    alta: 'text-[var(--success)]',
    media: 'text-amber-500',
    baja: 'text-[var(--accent)]',
  };

  return (
    <div
      className="card group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Info principal */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          {/* Icono categoría */}
          <div className="w-12 h-12 rounded-xl bg-[var(--background)] flex items-center justify-center text-2xl shrink-0">
            {categoriasIconos[suscripcion.categoria] || '📦'}
          </div>

          {/* Detalles */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-[var(--foreground)] truncate">
                {suscripcion.nombre}
              </h3>
              {suscripcion.confianza === 'baja' && (
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" title="Confianza baja" />
              )}
            </div>

            <div className="flex items-center gap-3 text-sm">
              <span className="text-[var(--muted)] capitalize">
                {suscripcion.categoria}
              </span>
              <span className="text-[var(--border)]">·</span>
              <span className={`flex items-center gap-1 ${confianzaColor[suscripcion.confianza]}`}>
                <CheckCircle2 className="w-3 h-3" />
                {suscripcion.confianza}
              </span>
            </div>
          </div>
        </div>

        {/* Precio */}
        <div className="text-right shrink-0">
          <p className="font-display text-2xl text-[var(--foreground)]">
            {suscripcion.cantidad.toFixed(2)}€
            <span className="text-sm text-[var(--muted)] font-body">
              {frecuenciaTexto[suscripcion.frecuencia]}
            </span>
          </p>
          <p className="text-sm text-[var(--muted)]">
            {suscripcion.gastoAnual.toFixed(2)}€/año
          </p>
        </div>
      </div>

      {/* Botón de cancelar */}
      {suscripcion.urlCancelacion && (
        <div className="mt-4 pt-4 border-t border-[var(--border)]">
          <a
            href={suscripcion.urlCancelacion}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:underline transition-colors"
          >
            Cancelar suscripción
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
}
