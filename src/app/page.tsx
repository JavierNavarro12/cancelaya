'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Scissors, Shield, Zap, ArrowRight, Loader2, TrendingDown, Receipt, Lock, Star, Moon, Sun, Globe } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import MuroAhorros from '@/components/MuroAhorros';
import TarjetaSuscripcion from '@/components/TarjetaSuscripcion';
import FAQ from '@/components/FAQ';
import BancosCompatibles from '@/components/BancosCompatibles';
import { useApp } from '@/contexts/AppContext';
import type { ArchivoSubido, ResultadoAnalisis, EstadoApp, Suscripcion } from '@/types';

// Obtener o crear deviceId
function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return 'server';

  let deviceId = localStorage.getItem('cancelaya_device_id');
  if (!deviceId) {
    deviceId = 'device_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('cancelaya_device_id', deviceId);
  }
  return deviceId;
}

export default function Home() {
  const { t, language, setLanguage, isDark, toggleTheme } = useApp();

  const [archivos, setArchivos] = useState<ArchivoSubido[]>([]);
  const [estado, setEstado] = useState<EstadoApp>('inicio');
  const [resultado, setResultado] = useState<ResultadoAnalisis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Estado del paywall
  const [scanCount, setScanCount] = useState<number>(0);
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [suscripcionesVisibles, setSuscripcionesVisibles] = useState<Suscripcion[]>([]);
  const [suscripcionesBloqueadas, setSuscripcionesBloqueadas] = useState<Suscripcion[]>([]);

  // Cargar estado inicial
  useEffect(() => {
    async function loadUserState() {
      try {
        const deviceId = getOrCreateDeviceId();
        const response = await fetch(`/api/register-scan?deviceId=${deviceId}`);
        const data = await response.json();

        setScanCount(data.scanCount || 0);
        setIsPaid(data.paid || false);
      } catch (error) {
        console.error('Error loading user state:', error);
      }
    }

    loadUserState();

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

  // Filtrar suscripciones
  useEffect(() => {
    if (!resultado) return;

    const subs = resultado.suscripciones;

    if (isPaid) {
      setSuscripcionesVisibles(subs);
      setSuscripcionesBloqueadas([]);
      return;
    }

    if (scanCount <= 1) {
      setSuscripcionesVisibles(subs);
      setSuscripcionesBloqueadas([]);
      return;
    }

    const mitad = Math.ceil(subs.length / 2);
    setSuscripcionesVisibles(subs.slice(0, mitad));
    setSuscripcionesBloqueadas(subs.slice(mitad));
  }, [resultado, scanCount, isPaid]);

  const handleFilesChange = useCallback((nuevosArchivos: ArchivoSubido[]) => {
    setArchivos(nuevosArchivos);
    setError(null);
  }, []);

  const goToStripeCheckout = async () => {
    setPaymentError(null);
    try {
      const deviceId = getOrCreateDeviceId();
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId }),
      });
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        setPaymentError(t('paymentError'));
      }
    } catch (error) {
      console.error('Error:', error);
      setPaymentError(t('genericError'));
    }
  };

  const analizarArchivos = async () => {
    if (archivos.length === 0) return;

    setEstado('analizando');
    setError(null);

    try {
      const deviceId = getOrCreateDeviceId();

      const scanResponse = await fetch('/api/register-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deviceId }),
      });
      const scanData = await scanResponse.json();

      const newScanCount = scanData.scanCount || 1;
      setScanCount(newScanCount);

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

      const subs = data.suscripciones as Suscripcion[];

      if (isPaid) {
        setSuscripcionesVisibles(subs);
        setSuscripcionesBloqueadas([]);
      } else if (newScanCount <= 1) {
        setSuscripcionesVisibles(subs);
        setSuscripcionesBloqueadas([]);
      } else {
        const mitad = Math.ceil(subs.length / 2);
        setSuscripcionesVisibles(subs.slice(0, mitad));
        setSuscripcionesBloqueadas(subs.slice(mitad));
      }

      setResultado(data);
      setEstado('resultados');
      sessionStorage.setItem('cancelaya_last_result', JSON.stringify(data));

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
          <nav className="flex items-center gap-4">
            <a href="#como-funciona" className="hidden sm:block text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              {t('howItWorks')}
            </a>
            <a href="#testimonios" className="hidden sm:block text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              {t('testimonials')}
            </a>

            {/* Language toggle */}
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="lang-toggle"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language.toUpperCase()}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <a
              href="https://github.com/JavierNavarro12/cancelaya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--foreground)] text-[var(--background)] rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <Star className="w-4 h-4" />
              {t('star')}
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
            {t('badge')}
          </div>

          {/* Título */}
          <h1 className="font-display text-5xl md:text-7xl text-[var(--foreground)] mb-6 animate-fade-in-up delay-100 leading-[1.1]">
            {t('titleLine1')}<br />
            <span className="text-[var(--accent)] italic">{t('titleLine2')}</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-xl text-[var(--muted)] mb-12 animate-fade-in-up delay-200 max-w-xl mx-auto">
            {t('subtitle')}
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
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm animate-fade-in">
                  {error}
                </div>
              )}

              {archivos.length > 0 && (
                <div className="mt-6 text-center animate-fade-in">
                  <button
                    onClick={analizarArchivos}
                    className="btn btn-accent"
                  >
                    {t('analyzeFiles')} {archivos.length} {archivos.length === 1 ? t('file') : t('files')}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : estado === 'analizando' ? (
            <div className="text-center py-16 animate-fade-in">
              <Loader2 className="w-12 h-12 text-[var(--accent)] mx-auto mb-6 animate-spin" />
              <h2 className="font-display text-2xl mb-2">{t('analyzing')}</h2>
              <p className="text-[var(--muted)]">
                {t('analyzingTime')}
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
                {t('foundSubscriptions')} <span className="text-[var(--accent)]">{resultado.suscripciones.length}</span> {t('subscriptions')}
              </h2>
              {resultado.bancoDetectado && (
                <p className="text-[var(--muted)]">
                  {t('bankDetected')}: <span className="font-medium">{resultado.bancoDetectado}</span>
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
                  <p className="text-sm text-[var(--muted)]">{t('monthlySpend')}</p>
                  <p className="font-display text-3xl">{resultado.gastoMensualTotal.toFixed(2)}€</p>
                </div>
              </div>
              <div className="card flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-sm text-[var(--muted)]">{t('yearlySpend')}</p>
                  <p className="font-display text-3xl">{resultado.gastoAnualTotal.toFixed(2)}€</p>
                </div>
              </div>
            </div>

            {/* Lista de suscripciones */}
            {resultado.suscripciones.length > 0 ? (
              <div className="space-y-3 mb-8">
                {suscripcionesVisibles.map((suscripcion, index) => (
                  <TarjetaSuscripcion
                    key={suscripcion.id}
                    suscripcion={suscripcion}
                    index={index}
                  />
                ))}

                {suscripcionesBloqueadas.length > 0 && (
                  <>
                    {suscripcionesBloqueadas.map((suscripcion) => (
                      <div
                        key={suscripcion.id}
                        className="card flex items-center justify-between opacity-60 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={goToStripeCheckout}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <Lock className="w-5 h-5 text-gray-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-400">████████████</span>
                              <Lock className="w-3 h-3 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-400">
                              {t('blocked')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-display text-xl text-gray-400">██,██€/mes</p>
                          <p className="text-sm text-gray-400">███,██€/año</p>
                        </div>
                      </div>
                    ))}

                    {paymentError && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                        {paymentError}
                      </div>
                    )}

                    <button
                      onClick={goToStripeCheckout}
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="w-4 h-4" />
                      {t('unlock')} {suscripcionesBloqueadas.length} {t('subscriptionsFor')} 2,99€
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="text-center py-12 card">
                <p className="text-[var(--muted)]">
                  {t('noSubscriptions')}
                </p>
              </div>
            )}

            <div className="text-center">
              <button onClick={reiniciar} className="btn btn-outline">
                {t('analyzeOther')}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Bancos compatibles */}
      <BancosCompatibles />

      {/* Cómo funciona */}
      <section id="como-funciona" className="py-20 px-4 bg-[var(--card)] border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl text-center mb-12">
            {t('howItWorksTitle')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--background)] flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl">1</span>
              </div>
              <h3 className="font-semibold mb-2">{t('step1Title')}</h3>
              <p className="text-[var(--muted)] text-sm">
                {t('step1Desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--background)] flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl">2</span>
              </div>
              <h3 className="font-semibold mb-2">{t('step2Title')}</h3>
              <p className="text-[var(--muted)] text-sm">
                {t('step2Desc')}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--background)] flex items-center justify-center mx-auto mb-4">
                <span className="font-display text-2xl">3</span>
              </div>
              <h3 className="font-semibold mb-2">{t('step3Title')}</h3>
              <p className="text-[var(--muted)] text-sm">
                {t('step3Desc')}
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
              <h3 className="font-semibold mb-2">{t('privateTitle')}</h3>
              <p className="text-[var(--muted)] text-sm">
                {t('privateDesc')}
              </p>
            </div>

            <div className="card">
              <Zap className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="font-semibold mb-2">{t('fastTitle')}</h3>
              <p className="text-[var(--muted)] text-sm">
                {t('fastDesc')}
              </p>
            </div>

            <div className="card">
              <Scissors className="w-8 h-8 text-[var(--accent)] mb-4" />
              <h3 className="font-semibold mb-2">{t('directTitle')}</h3>
              <p className="text-[var(--muted)] text-sm">
                {t('directDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section id="testimonios" className="border-t border-[var(--border)]">
        <MuroAhorros />
      </section>

      {/* FAQ */}
      <FAQ />

      {/* CTA Final */}
      <section className="py-20 px-4 bg-[var(--foreground)] text-[var(--background)]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg opacity-70 mb-8">
            {t('ctaSubtitle')}
          </p>
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--border)]">
            {t('ctaButton')}
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
            <Link href="/privacidad" className="hover:text-[var(--foreground)] transition-colors">{t('privacy')}</Link>
            <Link href="/terminos" className="hover:text-[var(--foreground)] transition-colors">{t('terms')}</Link>
            <Link href="/contacto" className="hover:text-[var(--foreground)] transition-colors">{t('contact')}</Link>
            <a
              href="https://github.com/JavierNavarro12/cancelaya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[var(--foreground)] transition-colors"
            >
              <Star className="w-4 h-4" />
              GitHub
            </a>
          </div>
          <p className="text-sm text-[var(--muted)]">
            © 2025 Javier Navarro Rodriguez
          </p>
        </div>
      </footer>
    </main>
  );
}
