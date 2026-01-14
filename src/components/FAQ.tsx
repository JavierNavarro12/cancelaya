'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

interface FAQItem {
  questionKey: string;
  answerKey: string;
}

const faqKeys: FAQItem[] = [
  { questionKey: 'faq1Q', answerKey: 'faq1A' },
  { questionKey: 'faq2Q', answerKey: 'faq2A' },
  { questionKey: 'faq3Q', answerKey: 'faq3A' },
  { questionKey: 'faq4Q', answerKey: 'faq4A' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useApp();

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-4xl text-center mb-12">
          {t('faqTitle')}
        </h2>

        <div className="space-y-3">
          {faqKeys.map((faq, index) => (
            <div
              key={index}
              className="card cursor-pointer transition-all duration-200 hover:shadow-md"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-medium text-left">
                  {t(faq.questionKey as keyof typeof import('@/lib/translations').translations.es)}
                </h3>
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
                  {t(faq.answerKey as keyof typeof import('@/lib/translations').translations.es)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

