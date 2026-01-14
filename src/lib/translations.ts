export type Language = 'es' | 'en';

export const translations = {
  es: {
    // Header
    howItWorks: 'Cómo funciona',
    testimonials: 'Testimonios',
    star: 'Star',

    // Hero
    badge: '100% privado · Sin almacenamiento',
    titleLine1: 'Deja de pagar por lo que',
    titleLine2: 'no usas',
    subtitle: 'Sube tu extracto bancario y descubre todas las suscripciones que estás pagando. En menos de 90 segundos.',

    // Upload
    analyzeFiles: 'Analizar',
    file: 'archivo',
    files: 'archivos',
    analyzing: 'Analizando tus extractos...',
    analyzingTime: 'Esto puede tardar hasta 90 segundos',

    // Results
    foundSubscriptions: 'Encontramos',
    subscriptions: 'suscripciones',
    bankDetected: 'Banco detectado',
    monthlySpend: 'Gasto mensual',
    yearlySpend: 'Gasto anual',
    blocked: 'Bloqueado · Haz clic para desbloquear',
    unlock: 'Desbloquear',
    subscriptionsFor: 'suscripciones —',
    analyzeOther: 'Analizar otros extractos',
    noSubscriptions: 'No se encontraron suscripciones en los extractos proporcionados.',
    cancelSubscription: 'Cancelar suscripción',

    // How it works
    howItWorksTitle: 'Cómo funciona',
    step1Title: 'Sube tu extracto',
    step1Desc: 'PDF o Excel de los últimos 2-3 meses. Compatible con todos los bancos españoles.',
    step2Title: 'Analizamos con IA',
    step2Desc: 'Detectamos automáticamente todas tus suscripciones recurrentes.',
    step3Title: 'Cancela lo que no uses',
    step3Desc: 'Te damos el enlace directo para cancelar cada servicio.',

    // Features
    privateTitle: '100% Privado',
    privateDesc: 'Tus archivos se procesan y eliminan inmediatamente. No guardamos nada.',
    fastTitle: 'Menos de 90 segundos',
    fastDesc: 'Análisis rápido con inteligencia artificial avanzada.',
    directTitle: 'Enlaces directos',
    directDesc: 'Te llevamos a la página exacta para cancelar cada suscripción.',

    // CTA
    ctaTitle: '¿Listo para dejar de malgastar?',
    ctaSubtitle: 'El español medio gasta 847€ al año en suscripciones que no usa',
    ctaButton: 'Analizar mis extractos',

    // Footer
    privacy: 'Privacidad',
    terms: 'Términos',
    contact: 'Contacto',

    // Bancos
    compatibleBanks: 'Compatible con todos los bancos españoles',
    andMore: 'Y más...',

    // FAQ
    faqTitle: 'Preguntas frecuentes',
    faq1Q: '¿Es seguro subir mi extracto bancario?',
    faq1A: 'Sí, tus archivos se procesan en memoria y se eliminan inmediatamente. No guardamos ningún dato bancario.',
    faq2Q: '¿Con qué bancos es compatible?',
    faq2A: 'Funciona con todos los bancos españoles: Santander, BBVA, CaixaBank, Sabadell, ING, Openbank, N26, Revolut y más.',
    faq3Q: '¿Cómo detecta las suscripciones?',
    faq3A: 'Usamos inteligencia artificial para analizar los patrones de cobro recurrentes en tu extracto.',
    faq4Q: '¿Por qué tengo que pagar?',
    faq4A: 'El primer análisis es gratuito. El pago único de 2,99€ desbloquea análisis ilimitados para siempre.',

    // Muro de ahorros
    savingsWall: 'Muro de Ahorros',
    realSavings: 'Ahorros reales de personas reales',
    year: 'año',
    daysAgo: 'hace',
    days: 'días',
    week: 'semana',

    // FileUpload
    dropFiles: 'Arrastra tus extractos aquí',
    or: 'o',
    selectFiles: 'selecciona archivos',
    supportedFormats: 'PDF, Excel (.xlsx, .xls) o CSV',

    // Errors
    paymentError: 'Error al conectar con el sistema de pagos. Inténtalo de nuevo.',
    genericError: 'Error al procesar el pago. Inténtalo de nuevo más tarde.',
  },
  en: {
    // Header
    howItWorks: 'How it works',
    testimonials: 'Testimonials',
    star: 'Star',

    // Hero
    badge: '100% private · No storage',
    titleLine1: 'Stop paying for what you',
    titleLine2: "don't use",
    subtitle: 'Upload your bank statement and discover all the subscriptions you are paying for. In less than 90 seconds.',

    // Upload
    analyzeFiles: 'Analyze',
    file: 'file',
    files: 'files',
    analyzing: 'Analyzing your statements...',
    analyzingTime: 'This may take up to 90 seconds',

    // Results
    foundSubscriptions: 'We found',
    subscriptions: 'subscriptions',
    bankDetected: 'Bank detected',
    monthlySpend: 'Monthly spend',
    yearlySpend: 'Yearly spend',
    blocked: 'Blocked · Click to unlock',
    unlock: 'Unlock',
    subscriptionsFor: 'subscriptions —',
    analyzeOther: 'Analyze other statements',
    noSubscriptions: 'No subscriptions found in the provided statements.',
    cancelSubscription: 'Cancel subscription',

    // How it works
    howItWorksTitle: 'How it works',
    step1Title: 'Upload your statement',
    step1Desc: 'PDF or Excel from the last 2-3 months. Compatible with all Spanish banks.',
    step2Title: 'We analyze with AI',
    step2Desc: 'We automatically detect all your recurring subscriptions.',
    step3Title: "Cancel what you don't use",
    step3Desc: 'We give you the direct link to cancel each service.',

    // Features
    privateTitle: '100% Private',
    privateDesc: 'Your files are processed and deleted immediately. We store nothing.',
    fastTitle: 'Less than 90 seconds',
    fastDesc: 'Fast analysis with advanced artificial intelligence.',
    directTitle: 'Direct links',
    directDesc: 'We take you to the exact page to cancel each subscription.',

    // CTA
    ctaTitle: 'Ready to stop wasting money?',
    ctaSubtitle: 'The average Spaniard spends €847 per year on subscriptions they dont use',
    ctaButton: 'Analyze my statements',

    // Footer
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',

    // Bancos
    compatibleBanks: 'Compatible with all Spanish banks',
    andMore: 'And more...',

    // FAQ
    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'Is it safe to upload my bank statement?',
    faq1A: 'Yes, your files are processed in memory and deleted immediately. We do not store any banking data.',
    faq2Q: 'Which banks are compatible?',
    faq2A: 'It works with all Spanish banks: Santander, BBVA, CaixaBank, Sabadell, ING, Openbank, N26, Revolut and more.',
    faq3Q: 'How does it detect subscriptions?',
    faq3A: 'We use artificial intelligence to analyze recurring payment patterns in your statement.',
    faq4Q: 'Why do I have to pay?',
    faq4A: 'The first analysis is free. The one-time payment of €2.99 unlocks unlimited analyses forever.',

    // Muro de ahorros
    savingsWall: 'Savings Wall',
    realSavings: 'Real savings from real people',
    year: 'year',
    daysAgo: '',
    days: 'days ago',
    week: 'week ago',

    // FileUpload
    dropFiles: 'Drop your statements here',
    or: 'or',
    selectFiles: 'select files',
    supportedFormats: 'PDF, Excel (.xlsx, .xls) or CSV',

    // Errors
    paymentError: 'Error connecting to payment system. Please try again.',
    genericError: 'Error processing payment. Please try again later.',
  },
} as const;

export type TranslationKey = keyof typeof translations.es;
