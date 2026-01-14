'use client';

import { Scissors, Mail, MessageCircle, Moon, Sun, Globe, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useApp } from '@/contexts/AppContext';

export default function Contacto() {
  const { language, setLanguage, isDark, toggleTheme, t } = useApp();

  const content = {
    es: {
      title: 'Contacto',
      subtitle: 'Tienes alguna pregunta, sugerencia o problema? Estamos aqui para ayudarte.',
      email: {
        title: 'Email',
        description: 'Para consultas generales o soporte',
      },
      social: {
        title: 'Redes Sociales',
        description: 'Siguenos para novedades',
      },
      faqTitle: 'Preguntas frecuentes',
      faqs: [
        {
          q: 'Es seguro subir mi extracto bancario?',
          a: 'Si. Tus archivos se procesan en tiempo real y se eliminan inmediatamente despues del analisis. No almacenamos ningun dato bancario.',
        },
        {
          q: 'Puedo obtener un reembolso?',
          a: 'Si. Si no estas satisfecho con el servicio, puedes solicitar un reembolso completo en los primeros 7 dias. Contactanos por email.',
        },
        {
          q: 'Que bancos son compatibles?',
          a: 'CancelaYa es compatible con todos los bancos españoles: Openbank, BBVA, Santander, CaixaBank, ING, Sabadell, Bankinter, y mas. Solo necesitas descargar tu extracto en PDF o Excel.',
        },
        {
          q: 'Por que no detecta alguna suscripcion?',
          a: 'El analisis se basa en patrones de pagos recurrentes. Si una suscripcion aparece solo una vez en el extracto o tiene importes muy variables, puede no ser detectada. Te recomendamos subir extractos de 2-3 meses.',
        },
      ],
      legalInfo: 'Informacion legal',
      operatedBy: 'Servicio operado por Javier Navarro Rodriguez',
      privacyPolicy: 'Politica de Privacidad',
      termsConditions: 'Terminos y Condiciones',
    },
    en: {
      title: 'Contact',
      subtitle: 'Have a question, suggestion, or problem? We are here to help.',
      email: {
        title: 'Email',
        description: 'For general inquiries or support',
      },
      social: {
        title: 'Social Media',
        description: 'Follow us for updates',
      },
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          q: 'Is it safe to upload my bank statement?',
          a: 'Yes. Your files are processed in real-time and deleted immediately after analysis. We do not store any banking data.',
        },
        {
          q: 'Can I get a refund?',
          a: 'Yes. If you are not satisfied with the service, you can request a full refund within the first 7 days. Contact us by email.',
        },
        {
          q: 'Which banks are compatible?',
          a: 'CancelaYa is compatible with all Spanish banks: Openbank, BBVA, Santander, CaixaBank, ING, Sabadell, Bankinter, and more. You just need to download your statement in PDF or Excel.',
        },
        {
          q: 'Why doesnt it detect some subscriptions?',
          a: 'The analysis is based on recurring payment patterns. If a subscription appears only once in the statement or has highly variable amounts, it may not be detected. We recommend uploading 2-3 months of statements.',
        },
      ],
      legalInfo: 'Legal Information',
      operatedBy: 'Service operated by Javier Navarro Rodriguez',
      privacyPolicy: 'Privacy Policy',
      termsConditions: 'Terms and Conditions',
    },
  };

  const c = content[language];

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-[var(--accent)]" />
            <span className="font-display text-xl">CancelaYa</span>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setLanguage(language === 'es' ? 'en' : 'es')} className="lang-toggle">
              <Globe className="w-4 h-4 mr-1" />
              {language.toUpperCase()}
            </button>
            <button onClick={toggleTheme} className="theme-toggle">
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'es' ? 'Volver al inicio' : 'Back to home'}</span>
          </Link>
          <div className="text-center">
            <h1 className="font-display text-4xl mb-4">{c.title}</h1>
          <p className="text-[var(--muted)] mb-12">{c.subtitle}</p>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <div className="card text-center">
              <Mail className="w-10 h-10 text-[var(--accent)] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{c.email.title}</h3>
              <p className="text-[var(--muted)] text-sm mb-4">{c.email.description}</p>
              <a href="mailto:contacto@cancelaya.es" className="text-[var(--accent)] hover:underline font-medium">
                contacto@cancelaya.es
              </a>
            </div>

            <div className="card text-center">
              <MessageCircle className="w-10 h-10 text-[var(--accent)] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{c.social.title}</h3>
              <p className="text-[var(--muted)] text-sm mb-4">{c.social.description}</p>
              <a
                href="https://twitter.com/cancelaya"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline font-medium"
              >
                @cancelaya
              </a>
            </div>
          </div>

          <div className="card text-left">
            <h2 className="font-display text-2xl mb-4">{c.faqTitle}</h2>
            <div className="space-y-6">
              {c.faqs.map((faq, idx) => (
                <div key={idx}>
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-[var(--muted)] text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 p-6 bg-[var(--card)] rounded-xl border border-[var(--border)]">
            <h2 className="font-display text-xl mb-2">{c.legalInfo}</h2>
            <p className="text-[var(--muted)] text-sm mb-4">{c.operatedBy}</p>
            <div className="flex justify-center gap-4 text-sm">
              <Link href="/privacidad" className="text-[var(--accent)] hover:underline">
                {c.privacyPolicy}
              </Link>
              <span className="text-[var(--border)]">·</span>
              <Link href="/terminos" className="text-[var(--accent)] hover:underline">
                {c.termsConditions}
              </Link>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-[var(--accent)]" />
            <span className="font-display">CancelaYa</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-[var(--muted)]">
            <Link href="/privacidad" className="hover:text-[var(--foreground)] transition-colors">{t('privacy')}</Link>
            <Link href="/terminos" className="hover:text-[var(--foreground)] transition-colors">{t('terms')}</Link>
            <Link href="/contacto" className="hover:text-[var(--foreground)] transition-colors">{t('contact')}</Link>
          </div>
          <p className="text-sm text-[var(--muted)]">© 2025 Javier Navarro Rodriguez</p>
        </div>
      </footer>
    </main>
  );
}
