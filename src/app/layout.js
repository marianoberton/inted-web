"use client";

import './globals.css';
import { Open_Sans } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"
import Navbar from './components/Navbar.jsx';
import Footer from "./components/layout/Footer.jsx";
import WhatsAppButton from './components/WhatsAppButton';
// 1. Importamos nuestro provider
import TranslationProvider from "./TranslationProvider";

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-open-sans',
});

export default function Layout({ children }) {
  return (
    <html lang="es" className={openSans.variable}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Inted - Consultoría y Gestión de Proyectos</title>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="font-sans">
        <Analytics/>
        {/* 2. Envolvemos todo en TranslationProvider */}
        <TranslationProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton
            phoneNumber="1234567890"
            message="Hola, me gustaría obtener más información sobre Inted."
          />
        </TranslationProvider>
      </body>
    </html>
  );
}
