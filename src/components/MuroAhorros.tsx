'use client';

import { useApp } from '@/contexts/AppContext';

interface Testimonio {
  id: string;
  usuario: string;
  handle: string;
  avatar: string;
  textoEs: string;
  textoEn: string;
  ahorro: string;
  fechaEs: string;
  fechaEn: string;
}

const testimonios: Testimonio[] = [
  {
    id: '1',
    usuario: 'Maria Garcia',
    handle: '@mariadev_',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria&backgroundColor=ffdfbf',
    textoEs: '"Tenia 3 suscripciones a gimnasios que no usaba. Literal, 3. Gracias CancelaYa"',
    textoEn: '"I had 3 gym subscriptions I wasnt using. Literally, 3. Thanks CancelaYa"',
    ahorro: '1,440',
    fechaEs: 'hace 2 dias',
    fechaEn: '2 days ago',
  },
  {
    id: '2',
    usuario: 'Carlos Ruiz',
    handle: '@carlosruiz',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos&backgroundColor=c0aede',
    textoEs: '"Encontre un seguro duplicado del coche que llevaba pagando 8 meses"',
    textoEn: '"Found a duplicate car insurance I had been paying for 8 months"',
    ahorro: '680',
    fechaEs: 'hace 5 dias',
    fechaEn: '5 days ago',
  },
  {
    id: '3',
    usuario: 'Ana Martinez',
    handle: '@anamartinez',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana&backgroundColor=b6e3f4',
    textoEs: '"Netflix, HBO, Disney+, Amazon Prime, Filmin... madre mia lo que estaba gastando en streaming"',
    textoEn: '"Netflix, HBO, Disney+, Amazon Prime, Filmin... I couldnt believe how much I was spending on streaming"',
    ahorro: '890',
    fechaEs: 'hace 1 semana',
    fechaEn: '1 week ago',
  },
  {
    id: '4',
    usuario: 'Pablo Sanchez',
    handle: '@pablosdev',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pablo&backgroundColor=ffd5dc',
    textoEs: '"Lo mejor es que te da el enlace directo para cancelar. Sin buscar en ajustes"',
    textoEn: '"The best part is it gives you the direct link to cancel. No searching through settings"',
    ahorro: '2,100',
    fechaEs: 'hace 3 dias',
    fechaEn: '3 days ago',
  },
  {
    id: '5',
    usuario: 'Laura Fernandez',
    handle: '@laurafz',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=laura&backgroundColor=d1d4f9',
    textoEs: '"Subi el PDF de Openbank y en 30 segundos tenia todas mis suscripciones"',
    textoEn: '"Uploaded my Openbank PDF and in 30 seconds I had all my subscriptions"',
    ahorro: '540',
    fechaEs: 'hace 1 dia',
    fechaEn: '1 day ago',
  },
  {
    id: '6',
    usuario: 'David Lopez',
    handle: '@davidlopez_',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david&backgroundColor=c1f0c1',
    textoEs: '"wat. Llevaba 2 anos pagando un antivirus que ni sabia que tenia"',
    textoEn: '"wat. I had been paying for an antivirus for 2 years that I didnt even know I had"',
    ahorro: '120',
    fechaEs: 'hace 4 dias',
    fechaEn: '4 days ago',
  },
];

export default function MuroAhorros() {
  const { t, language } = useApp();

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-display text-4xl md:text-5xl text-[var(--foreground)] mb-3">
            {t('savingsWall')}
          </h2>
          <p className="text-[var(--muted)] text-lg">
            {t('realSavings')}
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
                {language === 'es' ? testimonio.textoEs : testimonio.textoEn}
              </p>

              {/* Footer con ahorro */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                <span className="font-display text-2xl text-[var(--accent)]">
                  {testimonio.ahorro}€/{t('year')}
                </span>
                <span className="text-xs text-[var(--muted)]">
                  {language === 'es' ? testimonio.fechaEs : testimonio.fechaEn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
