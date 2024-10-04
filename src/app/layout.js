// src/app/layout.js
import './globals.css'; // Importa los estilos globales de Tailwind

import Header from "./components/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Navbar from './components/Navbar.jsx';

export default function Layout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Inted</title>
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
