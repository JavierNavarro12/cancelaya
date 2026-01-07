import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

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
  title: "CancelaYa - Encuentra y cancela suscripciones olvidadas",
  description: "Analiza tus extractos bancarios y descubre todas las suscripciones que estás pagando. Compatible con bancos españoles: Openbank, BBVA, Santander, CaixaBank, ING y más.",
  keywords: ["cancelar suscripciones", "extracto bancario", "ahorrar dinero", "suscripciones olvidadas", "bancos españoles"],
  authors: [{ name: "CancelaYa" }],
  openGraph: {
    title: "CancelaYa - Encuentra y cancela suscripciones olvidadas",
    description: "Analiza tus extractos bancarios y descubre todas las suscripciones que estás pagando.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${instrumentSerif.variable} antialiased`}>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
