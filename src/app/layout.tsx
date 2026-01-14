import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/contexts/AppContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CancelaYa - Detecta y cancela suscripciones olvidadas | Ahorra hasta 847€/año",
  description: "Sube tu extracto bancario y descubre en 90 segundos todas las suscripciones que estás pagando sin usar. Compatible con Openbank, BBVA, Santander, CaixaBank, ING y todos los bancos españoles.",
  keywords: ["cancelar suscripciones", "extracto bancario", "ahorrar dinero", "suscripciones olvidadas", "bancos españoles", "detector suscripciones", "gastos recurrentes"],
  authors: [{ name: "Javier Navarro" }],
  creator: "CancelaYa",
  publisher: "CancelaYa",
  metadataBase: new URL("https://cancela-ya.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CancelaYa - Detecta suscripciones olvidadas",
    description: "El español medio gasta 847€/año en suscripciones que no usa. Descubre las tuyas en 90 segundos.",
    type: "website",
    locale: "es_ES",
    url: "https://cancela-ya.vercel.app",
    siteName: "CancelaYa",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "CancelaYa - Detector de suscripciones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CancelaYa - Detecta suscripciones olvidadas",
    description: "El español medio gasta 847€/año en suscripciones que no usa. Descubre las tuyas.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "tu-codigo-de-verificacion", // Añadir después
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#C41E3A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CancelaYa" />
      </head>
      <body className={`${dmSans.variable} ${instrumentSerif.variable} antialiased`}>
        <AppProvider>
          <div className="grain-overlay" aria-hidden="true" />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
