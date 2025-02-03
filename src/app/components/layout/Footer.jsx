"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, MapPin } from "lucide-react";
// 1. Importamos el hook de traducción
import { useTranslation } from "../../TranslationProvider";

export default function Footer() {
  // 2. Extraemos la función t() del context
  const { t } = useTranslation();

  // 3. Reemplazamos los textos en duro por t("footer","...")
  return (
    <footer className="bg-[#1b293f] text-[#f4f3f1] py-12">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-8">
          {/* Logo */}
          <div className="flex justify-center order-2 md:order-2">
            <Image
              src="/images/blanco1.png"
              alt="Logo Inted"
              width={150}
              height={80}
              className="w-30 md:w-36 lg:w-44 h-auto"
            />
          </div>

          {/* Enlaces rápidos */}
          <div className="text-center md:text-left order-1 md:order-1">
            <h4 className="font-bold text-lg mb-4">
              {t("footer", "quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/consultoria-licitaciones"
                  className="hover:text-[#bfbfbf] transition-colors duration-200"
                >
                  {t("footer", "link1")}
                </Link>
              </li>
              <li>
                <Link
                  href="/proyectos-constructivos"
                  className="hover:text-[#bfbfbf] transition-colors duration-200"
                >
                  {t("footer", "link2")}
                </Link>
              </li>
              <li>
                <Link
                  href="/licitaciones"
                  className="hover:text-[#bfbfbf] transition-colors duration-200"
                >
                  {t("footer", "link3")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="hover:text-[#bfbfbf] transition-colors duration-200"
                >
                  {t("footer", "link4")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Ubicación */}
          <div className="text-center md:text-right flex flex-col items-center md:items-end order-3">
            <div className="mb-6">
              <h4 className="font-bold text-lg mb-2">
                {t("footer", "location")}
              </h4>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-[#f4f3f1] mr-3" />
                <div className="text-left">
                  <p>Av. Juramento 1475</p>
                  <p>CABA, Argentina</p>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="flex justify-center md:justify-end space-x-6 mt-4">
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
            {t("footer", "yearRights").replace(
              "{year}",
              new Date().getFullYear()
            )}
          </p>
          <p className="text-sm text-[#bfbfbf] text-center">
            {t("footer", "developedBy")}
          </p>
        </div>
      </div>
    </footer>
  );
}
