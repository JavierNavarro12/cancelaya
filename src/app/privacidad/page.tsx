import { Scissors } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidad - CancelaYa',
  description: 'Política de privacidad de CancelaYa',
};

export default function Privacidad() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-[var(--accent)]" />
            <span className="font-display text-xl">CancelaYa</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h1 className="font-display text-4xl mb-8">Política de Privacidad</h1>
          <p className="text-[var(--muted)] mb-4">Última actualización: Enero 2025</p>

          <h2 className="font-display text-2xl mt-8 mb-4">1. Responsable del tratamiento</h2>
          <p>
            El responsable del tratamiento de tus datos personales es:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li><strong>Nombre:</strong> Javier Navarro Rodriguez</li>
            <li><strong>Email:</strong> contacto@cancelaya.es</li>
            <li><strong>Sitio web:</strong> https://cancela-ya.vercel.app</li>
          </ul>

          <h2 className="font-display text-2xl mt-8 mb-4">2. Datos que recopilamos</h2>
          <p>
            CancelaYa está diseñado con la privacidad como prioridad. Recopilamos la mínima
            información necesaria para proporcionar el servicio:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li><strong>Archivos de extractos bancarios:</strong> Se procesan en tiempo real y se eliminan
            inmediatamente después del análisis. NO almacenamos tus extractos bancarios.</li>
            <li><strong>Datos de pago:</strong> Procesados de forma segura por Stripe. No tenemos acceso
            a los datos completos de tu tarjeta.</li>
            <li><strong>Identificador anónimo:</strong> Utilizamos un identificador único para gestionar
            el acceso al servicio, sin vincularlo a datos personales identificables.</li>
          </ul>

          <h2 className="font-display text-2xl mt-8 mb-4">3. Cómo usamos tus datos</h2>
          <p>Utilizamos la información exclusivamente para:</p>
          <ul className="list-disc pl-6 my-4">
            <li>Analizar tus extractos bancarios y detectar suscripciones</li>
            <li>Procesar pagos de forma segura</li>
            <li>Mejorar el servicio</li>
          </ul>

          <h2 className="font-display text-2xl mt-8 mb-4">4. Compartición de datos</h2>
          <p>
            NO vendemos, alquilamos ni compartimos tus datos personales con terceros,
            excepto los proveedores necesarios para el funcionamiento del servicio:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li><strong>Stripe:</strong> Para procesar pagos de forma segura</li>
            <li><strong>OpenAI:</strong> Para el análisis de extractos (los datos se envían de forma
            anónima y no se almacenan)</li>
            <li><strong>Vercel:</strong> Hosting del servicio</li>
          </ul>

          <h2 className="font-display text-2xl mt-8 mb-4">5. Seguridad</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Conexiones cifradas (HTTPS)</li>
            <li>No almacenamiento de extractos bancarios</li>
            <li>Procesamiento en tiempo real sin persistencia</li>
            <li>Pagos seguros a través de Stripe (certificado PCI DSS)</li>
          </ul>

          <h2 className="font-display text-2xl mt-8 mb-4">6. Tus derechos</h2>
          <p>
            Conforme al RGPD, tienes derecho a:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Acceder a tus datos personales</li>
            <li>Rectificar datos inexactos</li>
            <li>Solicitar la eliminación de tus datos</li>
            <li>Oponerte al tratamiento</li>
            <li>Portabilidad de datos</li>
          </ul>
          <p>
            Para ejercer estos derechos, contacta con nosotros en contacto@cancelaya.es
          </p>

          <h2 className="font-display text-2xl mt-8 mb-4">7. Cookies</h2>
          <p>
            Utilizamos cookies técnicas esenciales para el funcionamiento del servicio.
            No utilizamos cookies de seguimiento ni publicidad.
          </p>

          <h2 className="font-display text-2xl mt-8 mb-4">8. Cambios en esta política</h2>
          <p>
            Podemos actualizar esta política ocasionalmente. Te notificaremos cualquier
            cambio significativo publicando la nueva política en esta página.
          </p>

          <h2 className="font-display text-2xl mt-8 mb-4">9. Contacto</h2>
          <p>
            Si tienes preguntas sobre esta política de privacidad, contacta con nosotros:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li><strong>Email:</strong> contacto@cancelaya.es</li>
          </ul>
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
            <Link href="/privacidad" className="hover:text-[var(--foreground)] transition-colors">Privacidad</Link>
            <Link href="/terminos" className="hover:text-[var(--foreground)] transition-colors">Términos</Link>
            <Link href="/contacto" className="hover:text-[var(--foreground)] transition-colors">Contacto</Link>
          </div>
          <p className="text-sm text-[var(--muted)]">
            © 2025 Javier Navarro Rodriguez
          </p>
        </div>
      </footer>
    </main>
  );
}
