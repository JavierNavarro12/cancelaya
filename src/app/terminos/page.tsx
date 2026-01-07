import { Scissors } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Términos y Condiciones - CancelaYa',
  description: 'Términos y condiciones de uso de CancelaYa',
};

export default function Terminos() {
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
          <h1 className="font-display text-4xl mb-8">Términos y Condiciones</h1>
          <p className="text-[var(--muted)] mb-4">Última actualización: Enero 2025</p>

          <h2 className="font-display text-2xl mt-8 mb-4">1. Aceptación de los términos</h2>
          <p>
            Al acceder y utilizar CancelaYa (el "Servicio"), aceptas estos términos y condiciones.
            Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar el servicio.
          </p>

          <h2 className="font-display text-2xl mt-8 mb-4">2. Descripción del servicio</h2>
          <p>
            CancelaYa es un servicio que analiza extractos bancarios para detectar suscripciones
            recurrentes y proporciona información sobre cómo cancelarlas. El servicio:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Analiza extractos bancarios en formato PDF, CSV o Excel</li>
            <li>Identifica patrones de pagos recurrentes</li>
            <li>Proporciona enlaces a páginas de cancelación de servicios conocidos</li>
          </ul>

          <h2 className="font-display text-2xl mt-8 mb-4">3. Uso del servicio</h2>
          <p>Te comprometes a:</p>
          <ul className="list-disc pl-6 my-4">
            <li>Proporcionar únicamente extractos bancarios de cuentas de tu titularidad</li>
            <li>No utilizar el servicio para fines ilegales o no autorizados</li>
            <li>No intentar acceder a datos de otros usuarios</li>
            <li>No interferir con el funcionamiento normal del servicio</li>
          </ul>

          <h2 className="font-display text-2xl mt-8 mb-4">4. Pagos y reembolsos</h2>
          <p>
            El servicio ofrece un análisis inicial gratuito que muestra las primeras suscripciones
            detectadas. Para ver todas las suscripciones, se requiere un pago único de 2,99€.
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>Los pagos se procesan de forma segura a través de Stripe</li>
            <li>El pago da acceso inmediato a todas las suscripciones detectadas</li>
            <li>Ofrecemos reembolso completo en los primeros 7 días si no estás satisfecho</li>
          </ul>

          <h2 className="font-display text-2xl mt-8 mb-4">5. Limitación de responsabilidad</h2>
          <p>
            CancelaYa proporciona información basada en el análisis automatizado de extractos
            bancarios. Ten en cuenta que:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li>El análisis se basa en inteligencia artificial y puede no detectar todas las
            suscripciones o puede incluir falsos positivos</li>
            <li>Los enlaces de cancelación son informativos y pueden cambiar sin previo aviso</li>
            <li>No somos responsables de las acciones que tomes basándote en la información
            proporcionada</li>
            <li>No garantizamos que la cancelación de suscripciones sea exitosa</li>
          </ul>

          <h2 className="font-display text-2xl mt-8 mb-4">6. Propiedad intelectual</h2>
          <p>
            Todo el contenido del servicio, incluyendo pero no limitado a textos, gráficos,
            logos, y software, es propiedad de Javier Navarro Rodriguez y está protegido por
            las leyes de propiedad intelectual.
          </p>

          <h2 className="font-display text-2xl mt-8 mb-4">7. Privacidad</h2>
          <p>
            El tratamiento de tus datos personales se rige por nuestra{' '}
            <Link href="/privacidad" className="text-[var(--accent)] hover:underline">
              Política de Privacidad
            </Link>
            , que forma parte integral de estos términos.
          </p>

          <h2 className="font-display text-2xl mt-8 mb-4">8. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento.
            Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
          </p>

          <h2 className="font-display text-2xl mt-8 mb-4">9. Ley aplicable</h2>
          <p>
            Estos términos se rigen por las leyes de España. Cualquier disputa se someterá
            a los tribunales de Granada.
          </p>

          <h2 className="font-display text-2xl mt-8 mb-4">10. Contacto</h2>
          <p>
            Para cualquier consulta sobre estos términos:
          </p>
          <ul className="list-disc pl-6 my-4">
            <li><strong>Email:</strong> contacto@cancelaya.es</li>
            <li><strong>Responsable:</strong> Javier Navarro Rodriguez</li>
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
