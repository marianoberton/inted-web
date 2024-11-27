"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [language, setLanguage] = useState("es");
  const pathname = usePathname();
  const isTransparentPage = [
    "/",
    "/consultoria-licitaciones",
    "/proyectos-constructivos",
  ].includes(pathname);

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
        if (window.scrollY > 50) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setScrolled(true);
    }
  }, [isTransparentPage]);

  const navItems = [
    { name: "Quiénes Somos", path: "/quienes-somos" },
    {
      name: "Áreas de Práctica",
      dropdown: [
        {
          name: "Licitaciones Públicas y/o Privadas",
          path: "/consultoria-licitaciones",
        },
        {
          name: "Desarrollo de Proyectos Constructivos",
          path: "/proyectos-constructivos",
        },
      ],
    },
    { name: "Licitaciones", path: "/licitaciones" },
    { name: "Contacto", path: "/contacto" },
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
        <div className={`${isMobile ? "w-24" : "w-28 md:w-36"}`}>
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
              width={isMobile ? 80 : 180}
              height={isMobile ? 40 : 90}
            />
          </Link>
        </div>
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
                  <Link href={item.path}>
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
        <div className="hidden md:flex items-center space-x-4">
        {/* Language Switcher */}
        <div className="flex items-center space-x-2">
          <button
            className={`text-sm font-medium ${
              scrolled
                ? language === "es"
                  ? "font-bold underline text-[#1b293f]" // Estilo seleccionado en color sólido
                  : "text-[#1b293f] hover:opacity-70"
                : language === "es"
                ? "font-bold underline text-white" // Estilo seleccionado en fondo transparente
                : "text-white hover:opacity-70"
            }`}
            onClick={() => setLanguage("es")}
          >
            ES
          </button>
          <span
            className={`w-px h-4 ${
              scrolled ? "bg-gray-400" : "bg-white" // Cambia el separador según el scroll
            }`}
          ></span>
          <button
            className={`text-sm font-medium ${
              scrolled
                ? language === "en"
                  ? "font-bold underline text-[#1b293f]" // Estilo seleccionado en color sólido
                  : "text-[#1b293f] hover:opacity-70"
                : language === "en"
                ? "font-bold underline text-white" // Estilo seleccionado en fondo transparente
                : "text-white hover:opacity-70"
            }`}
            onClick={() => setLanguage("en")}
          >
            EN
          </button>
        </div>
      </div>
        <button
          className={`md:hidden ${scrolled ? "text-[#1b293f]" : "text-white"}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>
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
                          <Link href={dropdownItem.path} passHref>
                            <span className="text-sm text-[#1b293f] hover:text-[#bfbfbf] transition-colors duration-200 cursor-pointer">
                              {dropdownItem.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link href={item.path}>
                    <span className="text-sm font-medium text-[#1b293f] hover:text-[#bfbfbf] transition-colors duration-200">
                      {item.name}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
          {/* Language Switcher in Mobile */}
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button
              className={`text-sm font-medium ${
                language === "es" 
                  ? "font-bold underline text-[#1b293f]" 
                  : "text-[#1b293f] hover:opacity-70"
              }`}
              onClick={() => setLanguage("es")}
            >
              ES
            </button>
            <span className="w-px h-4 bg-gray-400"></span>
            <button
              className={`text-sm font-medium ${
                language === "en" 
                  ? "font-bold underline text-[#1b293f]" 
                  : "text-[#1b293f] hover:opacity-70"
              }`}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>

        </div>
      )}
    </header>
  );
}
