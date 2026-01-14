'use client';

import { Scissors, Moon, Sun, Globe, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useApp } from '@/contexts/AppContext';

export default function Privacidad() {
  const { language, setLanguage, isDark, toggleTheme, t } = useApp();

  const content = {
    es: {
      title: 'Politica de Privacidad',
      lastUpdate: 'Ultima actualizacion: Enero 2025',
      sections: [
        {
          title: '1. Responsable del tratamiento',
          content: 'El responsable del tratamiento de tus datos personales es:',
          list: [
            { label: 'Nombre', value: 'Javier Navarro Rodriguez' },
            { label: 'Email', value: 'contacto@cancelaya.es' },
            { label: 'Sitio web', value: 'https://cancela-ya.vercel.app' },
          ],
        },
        {
          title: '2. Datos que recopilamos',
          content: 'CancelaYa esta diseñado con la privacidad como prioridad. Recopilamos la minima informacion necesaria para proporcionar el servicio:',
          list: [
            { label: 'Archivos de extractos bancarios', value: 'Se procesan en tiempo real y se eliminan inmediatamente despues del analisis. NO almacenamos tus extractos bancarios.' },
            { label: 'Datos de pago', value: 'Procesados de forma segura por Stripe. No tenemos acceso a los datos completos de tu tarjeta.' },
            { label: 'Identificador anonimo', value: 'Utilizamos un identificador unico para gestionar el acceso al servicio, sin vincularlo a datos personales identificables.' },
          ],
        },
        {
          title: '3. Como usamos tus datos',
          content: 'Utilizamos la informacion exclusivamente para:',
          list: [
            { value: 'Analizar tus extractos bancarios y detectar suscripciones' },
            { value: 'Procesar pagos de forma segura' },
            { value: 'Mejorar el servicio' },
          ],
        },
        {
          title: '4. Comparticion de datos',
          content: 'NO vendemos, alquilamos ni compartimos tus datos personales con terceros, excepto los proveedores necesarios para el funcionamiento del servicio:',
          list: [
            { label: 'Stripe', value: 'Para procesar pagos de forma segura' },
            { label: 'OpenAI', value: 'Para el analisis de extractos (los datos se envian de forma anonima y no se almacenan)' },
            { label: 'Vercel', value: 'Hosting del servicio' },
          ],
        },
        {
          title: '5. Seguridad',
          content: 'Implementamos medidas de seguridad tecnicas y organizativas para proteger tus datos:',
          list: [
            { value: 'Conexiones cifradas (HTTPS)' },
            { value: 'No almacenamiento de extractos bancarios' },
            { value: 'Procesamiento en tiempo real sin persistencia' },
            { value: 'Pagos seguros a traves de Stripe (certificado PCI DSS)' },
          ],
        },
        {
          title: '6. Tus derechos',
          content: 'Conforme al RGPD, tienes derecho a:',
          list: [
            { value: 'Acceder a tus datos personales' },
            { value: 'Rectificar datos inexactos' },
            { value: 'Solicitar la eliminacion de tus datos' },
            { value: 'Oponerte al tratamiento' },
            { value: 'Portabilidad de datos' },
          ],
          footer: 'Para ejercer estos derechos, contacta con nosotros en contacto@cancelaya.es',
        },
        {
          title: '7. Cookies',
          content: 'Utilizamos cookies tecnicas esenciales para el funcionamiento del servicio. No utilizamos cookies de seguimiento ni publicidad.',
        },
        {
          title: '8. Cambios en esta politica',
          content: 'Podemos actualizar esta politica ocasionalmente. Te notificaremos cualquier cambio significativo publicando la nueva politica en esta pagina.',
        },
        {
          title: '9. Contacto',
          content: 'Si tienes preguntas sobre esta politica de privacidad, contacta con nosotros:',
          list: [{ label: 'Email', value: 'contacto@cancelaya.es' }],
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      lastUpdate: 'Last updated: January 2025',
      sections: [
        {
          title: '1. Data Controller',
          content: 'The data controller responsible for your personal data is:',
          list: [
            { label: 'Name', value: 'Javier Navarro Rodriguez' },
            { label: 'Email', value: 'contacto@cancelaya.es' },
            { label: 'Website', value: 'https://cancela-ya.vercel.app' },
          ],
        },
        {
          title: '2. Data We Collect',
          content: 'CancelaYa is designed with privacy as a priority. We collect the minimum information necessary to provide the service:',
          list: [
            { label: 'Bank statement files', value: 'Processed in real-time and deleted immediately after analysis. We do NOT store your bank statements.' },
            { label: 'Payment data', value: 'Securely processed by Stripe. We do not have access to your complete card details.' },
            { label: 'Anonymous identifier', value: 'We use a unique identifier to manage service access, without linking it to identifiable personal data.' },
          ],
        },
        {
          title: '3. How We Use Your Data',
          content: 'We use the information exclusively to:',
          list: [
            { value: 'Analyze your bank statements and detect subscriptions' },
            { value: 'Process payments securely' },
            { value: 'Improve the service' },
          ],
        },
        {
          title: '4. Data Sharing',
          content: 'We do NOT sell, rent, or share your personal data with third parties, except for providers necessary for the operation of the service:',
          list: [
            { label: 'Stripe', value: 'For secure payment processing' },
            { label: 'OpenAI', value: 'For statement analysis (data is sent anonymously and not stored)' },
            { label: 'Vercel', value: 'Service hosting' },
          ],
        },
        {
          title: '5. Security',
          content: 'We implement technical and organizational security measures to protect your data:',
          list: [
            { value: 'Encrypted connections (HTTPS)' },
            { value: 'No storage of bank statements' },
            { value: 'Real-time processing without persistence' },
            { value: 'Secure payments through Stripe (PCI DSS certified)' },
          ],
        },
        {
          title: '6. Your Rights',
          content: 'Under GDPR, you have the right to:',
          list: [
            { value: 'Access your personal data' },
            { value: 'Rectify inaccurate data' },
            { value: 'Request deletion of your data' },
            { value: 'Object to processing' },
            { value: 'Data portability' },
          ],
          footer: 'To exercise these rights, contact us at contacto@cancelaya.es',
        },
        {
          title: '7. Cookies',
          content: 'We use essential technical cookies for the operation of the service. We do not use tracking or advertising cookies.',
        },
        {
          title: '8. Changes to This Policy',
          content: 'We may update this policy occasionally. We will notify you of any significant changes by posting the new policy on this page.',
        },
        {
          title: '9. Contact',
          content: 'If you have questions about this privacy policy, contact us:',
          list: [{ label: 'Email', value: 'contacto@cancelaya.es' }],
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
                    <li key={i} className="text-[var(--muted)]">
                      {'label' in item && item.label ? <><strong>{item.label}:</strong> {item.value}</> : item.value}
                    </li>
                  ))}
                </ul>
              )}
              {section.footer && <p className="text-[var(--muted)] mt-4">{section.footer}</p>}
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
