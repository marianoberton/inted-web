"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

// 1. Importamos useTranslation
import { useTranslation } from '../TranslationProvider';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 2. Extraemos language y setLanguage del context + la función t
  const { language, setLanguage, t } = useTranslation();

  const pathname = usePathname();
  const isTransparentPage = ["/", "/consultoria-licitaciones", "/proyectos-constructivos"].includes(pathname);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isTransparentPage) {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setScrolled(true);
    }
  }, [isTransparentPage]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // 3. En lugar de strings en duro, usamos t("navbar","...").
  const navItems = [
    { name: t("navbar", "quienesSomos"), path: "/quienes-somos" },
    {
      name: t("navbar", "areasPractica"),
      dropdown: [
        {
          name: t("navbar", "licitacionesPublicasPrivadas"),
          path: "/consultoria-licitaciones",
        },
        {
          name: t("navbar", "proyectosConstructivos"),
          path: "/proyectos-constructivos",
        },
      ],
    },
    { name: t("navbar", "licitaciones"), path: "/licitaciones" },
    { name: t("navbar", "contacto"), path: "/contacto" },
  ];

  return (
    <header
      className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div
        className={`container mx-auto px-4 ${
          isMobile ? "py-1" : "py-2"
        } flex items-center justify-between`}
      >
        {/* Logo */}
        <div className="max-h-16">
          <Link href="/">
            <Image
              src={
                scrolled
                  ? isMobile
                    ? "/images/azul3.png"
                    : "/images/azul2.png"
                  : isMobile
                  ? "/images/blanco3.png"
                  : "/images/blanco2.png"
              }
              alt="Logo"
              width={isMobile ? 80 : 160}
              height={isMobile ? 40 : 60} // Ajusta tamaños
            />
          </Link>
        </div>

        {/* Navegación */}
        <nav className="hidden md:block flex-grow">
          <ul className="flex justify-center items-center space-x-6 relative">
            {navItems.map((item, index) => (
              <li key={index} className="relative group">
                {item.dropdown ? (
                  <div className="cursor-pointer flex items-center space-x-1 text-sm font-medium relative">
                    <span
                      className={`${
                        scrolled ? "text-[#1b293f]" : "text-white"
                      } group-hover:text-[#bfbfbf] transition-colors duration-200`}
                    >
                      {item.name}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`${
                        scrolled ? "text-[#1b293f]" : "text-white"
                      } group-hover:text-[#bfbfbf] transition-colors duration-200`}
                    />
                    <div
                      className={`absolute left-0 top-full mt-2 w-72 py-4 z-20 transition-all duration-300 ${
                        scrolled
                          ? "bg-white shadow-md"
                          : "bg-opacity-90 bg-[#1b293f]"
                      } rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible`}
                    >
                      {item.dropdown.map((dropdownItem, idx) => (
                        <Link key={idx} href={dropdownItem.path} passHref>
                          <span
                            className={`block px-6 py-3 text-sm ${
                              scrolled ? "text-[#1b293f]" : "text-white"
                            } hover:bg-gray-100 hover:bg-opacity-20 cursor-pointer transition-colors duration-200 whitespace-nowrap`}
                          >
                            {dropdownItem.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link href={item.path} onClick={handleLinkClick}>
                    <span
                      className={`text-sm font-medium ${
                        scrolled ? "text-[#1b293f]" : "text-white"
                      } hover:text-[#bfbfbf] transition-colors duration-200`}
                    >
                      {item.name}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Language Switcher y Menú móvil */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            <button
              className={`text-sm font-medium ${
                scrolled
                  ? language === "es"
                    ? "font-bold underline text-[#1b293f]"
                    : "text-[#1b293f] hover:opacity-70"
                  : language === "es"
                  ? "font-bold underline text-white"
                  : "text-white hover:opacity-70"
              }`}
              onClick={() => setLanguage("es")}
            >
              ES
            </button>
            <span
              className={`w-px h-4 ${
                scrolled ? "bg-gray-400" : "bg-white"
              }`}
            ></span>
            <button
              className={`text-sm font-medium ${
                scrolled
                  ? language === "en"
                    ? "font-bold underline text-[#1b293f]"
                    : "text-[#1b293f] hover:opacity-70"
                  : language === "en"
                  ? "font-bold underline text-white"
                  : "text-white hover:opacity-70"
              }`}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>
        </div>

        {/* Botón de menú móvil */}
        <button
          className={`md:hidden ${scrolled ? "text-[#1b293f]" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden bg-white p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.dropdown ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm font-medium text-[#1b293f] transition-colors duration-200">
                      {item.name}
                      <ChevronDown size={16} />
                    </div>
                    <ul className="pl-4 space-y-1">
                      {item.dropdown.map((dropdownItem, idx) => (
                        <li key={idx}>
                          <Link
                            href={dropdownItem.path}
                            onClick={handleLinkClick}
                          >
                            <span className="text-sm text-[#1b293f] hover:text-[#bfbfbf] transition-colors duration-200 cursor-pointer">
                              {dropdownItem.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link href={item.path} onClick={handleLinkClick}>
                    <span className="text-sm font-medium text-[#1b293f] hover:text-[#bfbfbf] transition-colors duration-200">
                      {item.name}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
