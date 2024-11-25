// src/app/layout.js
import './globals.css'; // Importa los estilos globales de Tailwind
import { Open_Sans } from 'next/font/google';
import Header from "./components/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Navbar from './components/Navbar.jsx';

// Configuración de Open Sans con el módulo incorporado
const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Pesos necesarios
  variable: '--font-open-sans', // Variable CSS para la tipografía
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
