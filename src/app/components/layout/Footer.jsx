// src/app/components/layout/Footer.jsx
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1b293f] text-[#f4f3f1] p-8 mt-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Enlaces rápidos */}
          <div className="mb-6 md:mb-0">
            <h4 className="font-bold mb-4">Enlaces Rápidos</h4>
            <ul>
              <li className="mb-2">
                <Link href="/consultoria-licitaciones" passHref>
                  Licitaciones Públicas y/o Privadas
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/proyectos-constructivos" passHref>
                  Desarrollo de Proyectos Constructivos
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/novedades" passHref>
                  Novedades
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/contacto" passHref>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Imagen del logo */}
          <div className="mb-6 md:mb-0">
            <Image
              src="/images/blanco1.png"
              alt="Logo Inted"
              width={150}
              height={75}
            />
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="font-bold mb-4">Contáctanos</h4>
            <p>Email: info@inted.com.ar</p>
            <p>Teléfono: +54 11 5555 5555</p>
            <p>Dirección: Juramento 1475, CABA, Argentina</p>
          </div>
        </div>

        {/* Barra de redes sociales */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook className="w-6 h-6 text-[#bfbfbf] hover:text-[#f4f3f1] transition-colors duration-200" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram className="w-6 h-6 text-[#bfbfbf] hover:text-[#f4f3f1] transition-colors duration-200" />
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="w-6 h-6 text-[#bfbfbf] hover:text-[#f4f3f1] transition-colors duration-200" />
          </a>
        </div>

        {/* Derechos reservados */}
        <div className="text-center text-[#bfbfbf]">
          © {new Date().getFullYear()} Inted. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}