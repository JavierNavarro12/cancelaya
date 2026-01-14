'use client';

import { useApp } from '@/contexts/AppContext';

const bancos = [
  { nombre: "Openbank", color: "#00A3E0" },
  { nombre: "BBVA", color: "#004481" },
  { nombre: "Santander", color: "#EC0000" },
  { nombre: "CaixaBank", color: "#007EAE" },
  { nombre: "ING", color: "#FF6200" },
  { nombre: "Sabadell", color: "#0099CC" },
  { nombre: "Bankinter", color: "#FF6600" },
  { nombre: "Unicaja", color: "#00A650" },
  { nombre: "Ibercaja", color: "#E30613" },
  { nombre: "Kutxabank", color: "#0066B3" },
  { nombre: "EVO Banco", color: "#00B2A9" },
  { nombre: "N26", color: "#36A18B" },
];

export default function BancosCompatibles() {
  const { t } = useApp();

  return (
    <section className="py-12 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-sm text-[var(--muted)] mb-6">
          {t('compatibleBanks')}
        </p>

        {/* Carrusel infinito */}
        <div className="relative">
          <div className="flex animate-scroll gap-8">
            {[...bancos, ...bancos].map((banco, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--card)] rounded-full border border-[var(--border)] shrink-0"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: banco.color }}
                />
                <span className="text-sm font-medium whitespace-nowrap">
                  {banco.nombre}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

