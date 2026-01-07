'use client';

import type { Testimonio } from '@/types';

const testimonios: Testimonio[] = [
  {
    id: '1',
    usuario: 'María García',
    handle: '@mariadev_',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria&backgroundColor=ffdfbf',
    texto: '"Tenía 3 suscripciones a gimnasios que no usaba. Literal, 3. Gracias CancelaYa"',
    ahorro: '1.440€/año',
    fecha: 'hace 2 días',
  },
  {
    id: '2',
    usuario: 'Carlos Ruiz',
    handle: '@carlosruiz',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos&backgroundColor=c0aede',
    texto: '"Encontré un seguro duplicado del coche que llevaba pagando 8 meses"',
    ahorro: '680€/año',
    fecha: 'hace 5 días',
  },
  {
    id: '3',
    usuario: 'Ana Martínez',
    handle: '@anamartinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana&backgroundColor=b6e3f4',
    texto: '"Netflix, HBO, Disney+, Amazon Prime, Filmin... madre mía lo que estaba gastando en streaming"',
    ahorro: '890€/año',
    fecha: 'hace 1 semana',
  },
  {
    id: '4',
    usuario: 'Pablo Sánchez',
    handle: '@pablosdev',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pablo&backgroundColor=ffd5dc',
    texto: '"Lo mejor es que te da el enlace directo para cancelar. Sin buscar en ajustes"',
    ahorro: '2.100€/año',
    fecha: 'hace 3 días',
  },
  {
    id: '5',
    usuario: 'Laura Fernández',
    handle: '@laurafz',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=laura&backgroundColor=d1d4f9',
    texto: '"Subí el PDF de Openbank y en 30 segundos tenía todas mis suscripciones"',
    ahorro: '540€/año',
    fecha: 'hace 1 día',
  },
  {
    id: '6',
    usuario: 'David López',
    handle: '@davidlopez_',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david&backgroundColor=c1f0c1',
    texto: '"wat. Llevaba 2 años pagando un antivirus que ni sabía que tenía"',
    ahorro: '120€/año',
    fecha: 'hace 4 días',
  },
];

export default function MuroAhorros() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-display text-4xl md:text-5xl text-[var(--foreground)] mb-3">
            Muro de Ahorros
          </h2>
          <p className="text-[var(--muted)] text-lg">
            Ahorros reales de personas reales
          </p>
        </div>

        {/* Grid de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonios.map((testimonio, index) => (
            <div
              key={testimonio.id}
              className="testimonial-card animate-fade-in-up"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              {/* Header del testimonio */}
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={testimonio.avatar}
                  alt={testimonio.usuario}
                  className="w-10 h-10 rounded-full bg-[var(--border)]"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[var(--foreground)] text-sm truncate">
                    {testimonio.usuario}
                  </p>
                  <p className="text-[var(--muted)] text-xs">
                    {testimonio.handle}
                  </p>
                </div>
              </div>

              {/* Texto del testimonio */}
              <p className="text-[var(--foreground)] text-sm leading-relaxed mb-4">
                {testimonio.texto}
              </p>

              {/* Footer con ahorro */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <span className="font-display text-2xl text-[var(--accent)]">
                  {testimonio.ahorro}
                </span>
                <span className="text-xs text-[var(--muted)]">
                  {testimonio.fecha}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
