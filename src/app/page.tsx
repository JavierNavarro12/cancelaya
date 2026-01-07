'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Scissors, Shield, Zap, ArrowRight, Loader2, TrendingDown, Receipt, Lock } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import MuroAhorros from '@/components/MuroAhorros';
import TarjetaSuscripcion from '@/components/TarjetaSuscripcion';
import { usePaywall } from '@/hooks/usePaywall';
import type { ArchivoSubido, ResultadoAnalisis, EstadoApp, Suscripcion } from '@/types';

export default function Home() {
  const [archivos, setArchivos] = useState<ArchivoSubido[]>([]);
  const [estado, setEstado] = useState<EstadoApp>('inicio');
  const [resultado, setResultado] = useState<ResultadoAnalisis | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Recuperar último análisis si existe (para cuando vuelve de Stripe)
  useEffect(() => {
    const savedResult = sessionStorage.getItem('cancelaya_last_result');
    if (savedResult) {
      try {
        const parsed = JSON.parse(savedResult);
        setResultado(parsed);
        setEstado('resultados');
      } catch (e) {
        console.error('Error parsing saved result:', e);
      }
    }
  }, []);
  
  const paywall = usePaywall();
  
  // Suscripciones filtradas según estado de pago
  const [suscripcionesVisibles, setSuscripcionesVisibles] = useState<Suscripcion[]>([]);
  const [suscripcionesBloqueadas, setSuscripcionesBloqueadas] = useState<Suscripcion[]>([]);

  // Filtrar suscripciones cuando cambie el resultado o el estado de pago
  useEffect(() => {
    if (resultado) {
      const { visible, blocked } = paywall.filterSubscriptions(resultado.suscripciones);
      setSuscripcionesVisibles(visible);
      setSuscripcionesBloqueadas(blocked);
      // NO mostrar popup automáticamente - el usuario verá las suscripciones bloqueadas
      // y puede hacer clic en el botón de desbloquear cuando quiera
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultado, paywall.isPaid]);

  const handleFilesChange = useCallback((nuevosArchivos: ArchivoSubido[]) => {
    setArchivos(nuevosArchivos);
    setError(null);
  }, []);

  // Ir directamente a Stripe Checkout
  const goToStripeCheckout = async () => {
    try {
      const response = await fetch('/api/create-checkout', { method: 'POST' });
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        // Modo demo sin Stripe configurado
        await paywall.markAsPaid();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
      // Fallback: marcar como pagado en modo demo
      await paywall.markAsPaid();
      window.location.reload();
    }
  };

  const analizarArchivos = async () => {
    if (archivos.length === 0) return;

    setEstado('analizando');
    setError(null);

    try {
      // Crear FormData con los archivos reales guardados en el estado
      const formData = new FormData();

      archivos.forEach((archivo) => {
        formData.append('archivos', archivo.file);
      });

      const response = await fetch('/api/analizar', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al analizar los archivos');
      }

      setResultado(data);
      setEstado('resultados');
      // Guardar resultado para recuperarlo si vuelve de Stripe
      sessionStorage.setItem('cancelaya_last_result', JSON.stringify(data));
      await paywall.registerScan(); // Registrar el escaneo en Firebase
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setEstado('error');
    }
  };

  const reiniciar = () => {
    setArchivos([]);
    setEstado('inicio');
    setResultado(null);
    setError(null);
    sessionStorage.removeItem('cancelaya_last_result');
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="w-6 h-6 text-[var(--accent)]" />
            <span className="font-display text-xl">CancelaYa</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#como-funciona" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              Cómo funciona
            </a>
            <a href="#testimonios" className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              Testimonios
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 badge badge-outline mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
            100% privado · Sin almacenamiento
          </div>

          {/* Título */}
          <h1 className="font-display text-5xl md:text-7xl text-[var(--foreground)] mb-6 animate-fade-in-up delay-100 leading-[1.1]">
            Deja de pagar por lo que <span className="text-[var(--accent)] italic">no usas</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl text-[var(--muted)] mb-12 animate-fade-in-up delay-200 max-w-xl mx-auto">
            Sube tu extracto bancario y descubre todas las suscripciones que estás pagando. En menos de 90 segundos.
          </p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="pb-16 px-4">
        <div className="max-w-2xl mx-auto animate-fade-in-up delay-300">
          {estado === 'inicio' || estado === 'error' ? (
            <>
              <FileUpload
                onFilesChange={handleFilesChange}
                isProcessing={false}
              />

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm animate-fade-in">
                  {error}
                </div>
              )}

              {archivos.length > 0 && (
                <div className="mt-6 text-center animate-fade-in">
                  <button
                    onClick={analizarArchivos}
                    className="btn btn-accent"
                  >
                    Analizar {archivos.length} {archivos.length === 1 ? 'archivo' : 'archivos'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : estado === 'analizando' ? (
            <div className="text-center py-16 animate-fade-in">
              <Loader2 className="w-12 h-12 text-[var(--accent)] mx-auto mb-6 animate-spin" />
              <h2 className="font-display text-2xl mb-2">Analizando tus extractos...</h2>
              <p className="text-[var(--muted)]">
                Esto puede tardar hasta 90 segundos
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Resultados */}
      {estado === 'resultados' && resultado && (
        <section className="pb-16 px-4 animate-fade-in">
          <div className="max-w-4xl mx-auto">
            {/* Header de resultados */}
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl mb-4">
                Encontramos <span className="text-[var(--accent)]">{resultado.suscripciones.length}</span> suscripciones
              </h2>
              {resultado.bancoDetectado && (
                <p className="text-[var(--muted)]">
                  Banco detectado: <span className="font-medium">{resultado.bancoDetectado}</span>
                </p>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="card flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--muted)]">Gasto mensual</p>
                  <p className="font-display text-3xl">{resultado.gastoMensualTotal.toFixed(2)}€</p>
                </div>
              </div>
              <div className="card flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--muted)]">Gasto anual</p>
                  <p className="font-display text-3xl">{resultado.gastoAnualTotal.toFixed(2)}€</p>
                </div>
              </div>
            </div>

            {/* Lista de suscripciones */}
            {resultado.suscripciones.length > 0 ? (
              <div className="space-y-3 mb-8">
                {/* Suscripciones visibles */}
                {suscripcionesVisibles.map((suscripcion, index) => (
                  <TarjetaSuscripcion
                    key={suscripcion.id}
                    suscripcion={suscripcion}
                    index={index}
                  />
                ))}
                
                {/* Suscripciones bloqueadas */}
                {suscripcionesBloqueadas.length > 0 && (
                  <>
                    {suscripcionesBloqueadas.map((suscripcion) => (
                      <div
                        key={suscripcion.id}
                        className="card flex items-center justify-between opacity-60 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={goToStripeCheckout}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-400">████████████</span>
                              <Lock className="w-3 h-3 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-400">
                              Bloqueado · Haz clic para desbloquear
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-xl text-gray-400">██,██€/mes</p>
                          <p className="text-sm text-gray-400">███,██€/año</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* Botón de desbloquear - Va directo a Stripe */}
                    <button
                      onClick={goToStripeCheckout}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-4 h-4" />
                      Desbloquear {suscripcionesBloqueadas.length} suscripciones — 2,99€
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-12 card">
                <p className="text-[var(--muted)]">
                  No se encontraron suscripciones en los extractos proporcionados.
                </p>
              </div>
            )}

            {/* Botón reiniciar */}
            <div className="text-center">
              <button onClick={reiniciar} className="btn btn-outline">
                Analizar otros extractos
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Cómo funciona */}
      <section id="como-funciona" className="py-20 px-4 bg-[var(--card)] border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl text-center mb-12">
            Cómo funciona
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--background)] flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">Sube tu extracto</h3>
              <p className="text-[var(--muted)] text-sm">
                PDF o Excel de los últimos 2-3 meses. Compatible con todos los bancos españoles.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--background)] flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">Analizamos con IA</h3>
              <p className="text-[var(--muted)] text-sm">
                Detectamos automáticamente todas tus suscripciones recurrentes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--background)] flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">Cancela lo que no uses</h3>
              <p className="text-[var(--muted)] text-sm">
                Te damos el enlace directo para cancelar cada servicio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <Shield className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="font-semibold mb-2">100% Privado</h3>
              <p className="text-[var(--muted)] text-sm">
                Tus archivos se procesan y eliminan inmediatamente. No guardamos nada.
              </p>
            </div>

            <div className="card">
              <Zap className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="font-semibold mb-2">Menos de 90 segundos</h3>
              <p className="text-[var(--muted)] text-sm">
                Análisis rápido con inteligencia artificial avanzada.
              </p>
            </div>

            <div className="card">
              <Scissors className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="font-semibold mb-2">Enlaces directos</h3>
              <p className="text-[var(--muted)] text-sm">
                Te llevamos a la página exacta para cancelar cada suscripción.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="border-t border-[var(--border)]">
        <MuroAhorros />
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-[var(--foreground)] text-[var(--background)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            ¿Listo para dejar de malgastar?
          </h2>
          <p className="text-lg opacity-70 mb-8">
            El español medio gasta 847€ al año en suscripciones que no usa
          </p>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--border)]">
            Analizar mis extractos
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-[var(--border)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Scissors className="w-5 h-5 text-[var(--accent)]" />
            <span className="font-display">CancelaYa</span>
          </div>
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
