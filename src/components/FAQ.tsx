'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Es seguro subir mi extracto bancario?",
    answer: "Sí, 100%. Tus archivos se procesan en memoria y se eliminan inmediatamente después del análisis. No guardamos ningún dato personal ni financiero. Puedes verificar nuestro código en GitHub."
  },
  {
    question: "¿Qué bancos españoles son compatibles?",
    answer: "CancelaYa funciona con todos los bancos españoles: Openbank, BBVA, Santander, CaixaBank, ING, Sabadell, Bankinter, Unicaja, Ibercaja, Kutxabank, y cualquier otro que permita exportar extractos en PDF o Excel."
  },
  {
    question: "¿Cómo descargo mi extracto bancario?",
    answer: "Entra en la app o web de tu banco → Busca 'Movimientos' o 'Extractos' → Selecciona los últimos 3-6 meses → Descarga en PDF o Excel. Si tienes dudas, busca en Google: 'descargar extracto [tu banco]'."
  },
  {
    question: "¿Por qué tengo que pagar 2,99€?",
    answer: "El primer análisis es gratis y completo. Si te resulta útil y quieres analizar más extractos o desbloquear todos los resultados, el pago único de 2,99€ te da acceso de por vida. Sin suscripciones ni pagos recurrentes."
  },
  {
    question: "¿CancelaYa cancela las suscripciones por mí?",
    answer: "No automáticamente. Te proporcionamos el enlace directo a la página de cancelación de cada servicio. Tú decides qué cancelar y mantienes el control total del proceso."
  },
  {
    question: "¿Qué pasa si no encuentra todas mis suscripciones?",
    answer: "La IA detecta patrones de pagos recurrentes. Si una suscripción solo aparece una vez en el extracto o tiene un nombre muy genérico, podría no detectarse. Para mejores resultados, sube extractos de 3-6 meses."
  },
  {
    question: "¿Puedo obtener un reembolso?",
    answer: "Si no estás satisfecho, contacta con nosotros en las primeras 24 horas tras el pago y te devolvemos el importe íntegro. Sin preguntas."
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-4xl text-center mb-4">
          Preguntas frecuentes
        </h2>
        <p className="text-center text-[var(--muted)] mb-12">
          Todo lo que necesitas saber sobre CancelaYa
        </p>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="card cursor-pointer transition-all duration-200 hover:shadow-md"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-medium text-left">{faq.question}</h3>
                <ChevronDown 
                  className={`w-5 h-5 text-[var(--muted)] shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <div 
                className={`overflow-hidden transition-all duration-200 ${
                  openIndex === index ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
              >
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

