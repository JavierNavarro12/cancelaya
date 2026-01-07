import { Scissors, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Contacto - CancelaYa',
  description: 'Contacta con CancelaYa para cualquier duda o sugerencia',
};

export default function Contacto() {
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
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-display text-4xl mb-4">Contacto</h1>
          <p className="text-[var(--muted)] mb-12">
            ¿Tienes alguna pregunta, sugerencia o problema? Estamos aquí para ayudarte.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mb-12">
            <div className="card text-center">
              <Mail className="w-10 h-10 text-[var(--accent)] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-[var(--muted)] text-sm mb-4">
                Para consultas generales o soporte
              </p>
              <a
                href="mailto:contacto@cancelaya.es"
                className="text-[var(--accent)] hover:underline font-medium"
              >
                contacto@cancelaya.es
              </a>
            </div>

            <div className="card text-center">
              <MessageCircle className="w-10 h-10 text-[var(--accent)] mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Redes Sociales</h3>
              <p className="text-[var(--muted)] text-sm mb-4">
                Síguenos para novedades
              </p>
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
            <h2 className="font-display text-2xl mb-4">Preguntas frecuentes</h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">¿Es seguro subir mi extracto bancario?</h3>
                <p className="text-[var(--muted)] text-sm">
                  Sí. Tus archivos se procesan en tiempo real y se eliminan inmediatamente
                  después del análisis. No almacenamos ningún dato bancario.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">¿Puedo obtener un reembolso?</h3>
                <p className="text-[var(--muted)] text-sm">
                  Sí. Si no estás satisfecho con el servicio, puedes solicitar un reembolso
                  completo en los primeros 7 días. Contáctanos por email.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">¿Qué bancos son compatibles?</h3>
                <p className="text-[var(--muted)] text-sm">
                  CancelaYa es compatible con todos los bancos españoles: Openbank, BBVA,
                  Santander, CaixaBank, ING, Sabadell, Bankinter, y más. Solo necesitas
                  descargar tu extracto en PDF o Excel.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">¿Por qué no detecta alguna suscripción?</h3>
                <p className="text-[var(--muted)] text-sm">
                  El análisis se basa en patrones de pagos recurrentes. Si una suscripción
                  aparece solo una vez en el extracto o tiene importes muy variables,
                  puede no ser detectada. Te recomendamos subir extractos de 2-3 meses.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-[var(--card)] rounded-xl border border-[var(--border)]">
            <h2 className="font-display text-xl mb-2">Información legal</h2>
            <p className="text-[var(--muted)] text-sm mb-4">
              Servicio operado por Javier Navarro Rodriguez
            </p>
            <div className="flex justify-center gap-4 text-sm">
              <Link href="/privacidad" className="text-[var(--accent)] hover:underline">
                Política de Privacidad
              </Link>
              <span className="text-[var(--border)]">·</span>
              <Link href="/terminos" className="text-[var(--accent)] hover:underline">
                Términos y Condiciones
              </Link>
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
