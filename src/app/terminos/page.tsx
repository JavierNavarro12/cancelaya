'use client';

import { Scissors, Moon, Sun, Globe, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useApp } from '@/contexts/AppContext';

export default function Terminos() {
  const { language, setLanguage, isDark, toggleTheme, t } = useApp();

  const content = {
    es: {
      title: 'Terminos y Condiciones',
      lastUpdate: 'Ultima actualizacion: Enero 2025',
      sections: [
        {
          title: '1. Aceptacion de los terminos',
          content: 'Al acceder y utilizar CancelaYa (el "Servicio"), aceptas estos terminos y condiciones. Si no estas de acuerdo con alguna parte de estos terminos, no debes utilizar el servicio.',
        },
        {
          title: '2. Descripcion del servicio',
          content: 'CancelaYa es un servicio que analiza extractos bancarios para detectar suscripciones recurrentes y proporciona informacion sobre como cancelarlas. El servicio:',
          list: [
            'Analiza extractos bancarios en formato PDF, CSV o Excel',
            'Identifica patrones de pagos recurrentes',
            'Proporciona enlaces a paginas de cancelacion de servicios conocidos',
          ],
        },
        {
          title: '3. Uso del servicio',
          content: 'Te comprometes a:',
          list: [
            'Proporcionar unicamente extractos bancarios de cuentas de tu titularidad',
            'No utilizar el servicio para fines ilegales o no autorizados',
            'No intentar acceder a datos de otros usuarios',
            'No interferir con el funcionamiento normal del servicio',
          ],
        },
        {
          title: '4. Pagos y reembolsos',
          content: 'El servicio ofrece un analisis inicial gratuito que muestra las primeras suscripciones detectadas. Para ver todas las suscripciones, se requiere un pago unico de 2,99€.',
          list: [
            'Los pagos se procesan de forma segura a traves de Stripe',
            'El pago da acceso inmediato a todas las suscripciones detectadas',
            'Ofrecemos reembolso completo en los primeros 7 dias si no estas satisfecho',
          ],
        },
        {
          title: '5. Limitacion de responsabilidad',
          content: 'CancelaYa proporciona informacion basada en el analisis automatizado de extractos bancarios. Ten en cuenta que:',
          list: [
            'El analisis se basa en inteligencia artificial y puede no detectar todas las suscripciones o puede incluir falsos positivos',
            'Los enlaces de cancelacion son informativos y pueden cambiar sin previo aviso',
            'No somos responsables de las acciones que tomes basandote en la informacion proporcionada',
            'No garantizamos que la cancelacion de suscripciones sea exitosa',
          ],
        },
        {
          title: '6. Propiedad intelectual',
          content: 'Todo el contenido del servicio, incluyendo pero no limitado a textos, graficos, logos, y software, es propiedad de Javier Navarro Rodriguez y esta protegido por las leyes de propiedad intelectual.',
        },
        {
          title: '7. Privacidad',
          content: 'El tratamiento de tus datos personales se rige por nuestra Politica de Privacidad, que forma parte integral de estos terminos.',
          link: { text: 'Ver Politica de Privacidad', href: '/privacidad' },
        },
        {
          title: '8. Modificaciones',
          content: 'Nos reservamos el derecho de modificar estos terminos en cualquier momento. Los cambios entraran en vigor inmediatamente despues de su publicacion en el sitio web.',
        },
        {
          title: '9. Ley aplicable',
          content: 'Estos terminos se rigen por las leyes de España. Cualquier disputa se sometera a los tribunales de Granada.',
        },
        {
          title: '10. Contacto',
          content: 'Para cualquier consulta sobre estos terminos:',
          list: ['Email: contacto@cancelaya.es', 'Responsable: Javier Navarro Rodriguez'],
        },
      ],
    },
    en: {
      title: 'Terms and Conditions',
      lastUpdate: 'Last updated: January 2025',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: 'By accessing and using CancelaYa (the "Service"), you accept these terms and conditions. If you do not agree with any part of these terms, you should not use the service.',
        },
        {
          title: '2. Service Description',
          content: 'CancelaYa is a service that analyzes bank statements to detect recurring subscriptions and provides information on how to cancel them. The service:',
          list: [
            'Analyzes bank statements in PDF, CSV or Excel format',
            'Identifies recurring payment patterns',
            'Provides links to cancellation pages of known services',
          ],
        },
        {
          title: '3. Use of Service',
          content: 'You agree to:',
          list: [
            'Only provide bank statements from accounts you own',
            'Not use the service for illegal or unauthorized purposes',
            'Not attempt to access other users data',
            'Not interfere with the normal operation of the service',
          ],
        },
        {
          title: '4. Payments and Refunds',
          content: 'The service offers a free initial analysis that shows the first detected subscriptions. To see all subscriptions, a one-time payment of €2.99 is required.',
          list: [
            'Payments are processed securely through Stripe',
            'Payment gives immediate access to all detected subscriptions',
            'We offer a full refund within the first 7 days if you are not satisfied',
          ],
        },
        {
          title: '5. Limitation of Liability',
          content: 'CancelaYa provides information based on automated analysis of bank statements. Please note that:',
          list: [
            'The analysis is based on artificial intelligence and may not detect all subscriptions or may include false positives',
            'Cancellation links are informational and may change without notice',
            'We are not responsible for actions you take based on the information provided',
            'We do not guarantee that subscription cancellation will be successful',
          ],
        },
        {
          title: '6. Intellectual Property',
          content: 'All content of the service, including but not limited to texts, graphics, logos, and software, is the property of Javier Navarro Rodriguez and is protected by intellectual property laws.',
        },
        {
          title: '7. Privacy',
          content: 'The processing of your personal data is governed by our Privacy Policy, which forms an integral part of these terms.',
          link: { text: 'View Privacy Policy', href: '/privacidad' },
        },
        {
          title: '8. Modifications',
          content: 'We reserve the right to modify these terms at any time. Changes will take effect immediately after publication on the website.',
        },
        {
          title: '9. Applicable Law',
          content: 'These terms are governed by the laws of Spain. Any dispute will be submitted to the courts of Granada.',
        },
        {
          title: '10. Contact',
          content: 'For any questions about these terms:',
          list: ['Email: contacto@cancelaya.es', 'Responsible: Javier Navarro Rodriguez'],
        },
      ],
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
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'es' ? 'Volver al inicio' : 'Back to home'}</span>
          </Link>
          <h1 className="font-display text-4xl mb-4">{c.title}</h1>
          <p className="text-[var(--muted)] mb-8">{c.lastUpdate}</p>

          {c.sections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="font-display text-2xl mb-4">{section.title}</h2>
              <p className="text-[var(--muted)] mb-4">{section.content}</p>
              {section.list && (
                <ul className="list-disc pl-6 space-y-2">
                  {section.list.map((item, i) => (
                    <li key={i} className="text-[var(--muted)]">{item}</li>
                  ))}
                </ul>
              )}
              {section.link && (
                <Link href={section.link.href} className="text-[var(--accent)] hover:underline mt-2 inline-block">
                  {section.link.text}
                </Link>
              )}
            </div>
          ))}
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
