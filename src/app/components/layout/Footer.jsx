import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1b293f] text-[#f4f3f1] py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
          {/* Enlaces rápidos */}
          <div className="text-center md:text-left">
            <h4 className="font-bold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/consultoria-licitaciones"
                  className="hover:text-[#bfbfbf] transition-colors duration-200"
                >
                  Licitaciones Públicas y/o Privadas
                </Link>
              </li>
              <li>
                <Link
                  href="/proyectos-constructivos"
                  className="hover:text-[#bfbfbf] transition-colors duration-200"
                >
                  Desarrollo de Proyectos Constructivos
                </Link>
              </li>
              <li>
                <Link
                  href="/licitaciones"
                  className="hover:text-[#bfbfbf] transition-colors duration-200"
                >
                  Licitaciones Activas
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="hover:text-[#bfbfbf] transition-colors duration-200"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <Image
              src="/images/blanco1.png"
              alt="Logo Inted"
              width={150}
              height={80}
              className="w-auto h-auto"
            />
          </div>

          {/* Ubicación */}
          <div className="text-center md:text-right flex flex-col items-center md:items-end">
            <div className="mb-6"> {/* Espaciado extra aquí */}
              <h4 className="font-bold text-lg mb-2">Ubicación</h4>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-[#f4f3f1] mr-3" />
                <div className="text-left">
                  <p>Av. Juramento 1475</p>
                  <p>CABA, Argentina</p>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="flex justify-center md:justify-end space-x-6 mt-4"> {/* Separación adicional */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:opacity-75 transition-opacity duration-200"
              >
                <Facebook className="w-8 h-8" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:opacity-75 transition-opacity duration-200"
              >
                <Instagram className="w-8 h-8" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:opacity-75 transition-opacity duration-200"
              >
                <Linkedin className="w-8 h-8" />
              </a>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="border-t border-gray-700 pt-6 mt-8 flex flex-col items-center space-y-4">
          <p className="text-sm text-[#bfbfbf]">
            © {new Date().getFullYear()} Inted. Todos los derechos reservados.
          </p>
          <p className="text-sm text-[#bfbfbf] text-center">
            Sitio desarrollado por Inted para mejorar la experiencia en la
            gestión de proyectos y licitaciones.
          </p>
        </div>
      </div>
    </footer>
  );
}
