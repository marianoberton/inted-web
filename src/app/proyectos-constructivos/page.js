"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import CircularServiceShowcase from "../components/IconShowcase";


// Importa useTranslation
import { useTranslation } from "../TranslationProvider";

// Mapeo de íconos
import {
  Building,
  Ruler,
  Briefcase,
  HardHat,
  Home,
  FileCheck,
  Hammer,
  Layers,
  PenLine,
} from "lucide-react";

// Diccionario local de iconos:
const IconsMap = {
  Building,
  Ruler,
  Briefcase,
  HardHat,
  Home,
  FileCheck,
  Hammer,
  Layers,
  PenLine,
};

export default function ConsultoriaProyectosConstructivos() {
  // 1. Extraemos t()
  const { t } = useTranslation();

  // 2. Leemos datos del diccionario
  const headerTitle = t("proyectosConstructivos", "headerTitle");
  const headerParagraph = t("proyectosConstructivos", "headerParagraph");
  const headerImage = t("proyectosConstructivos", "headerImage");
  const servicesTitle = t("proyectosConstructivos", "servicesTitle");

  // 3. Array de servicios
  const servicios = t("proyectosConstructivos", "servicesArray");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col md:flex-row items-center bg-[#1b293f] text-white py-40 px-8 sm:px-12 lg:px-16 relative"
      >
        <div className="flex-1 max-w-md z-10 md:mr-8">
          <h1 className="text-5xl font-bold mb-6">{headerTitle}</h1>
          <p className="text-lg mb-6">{headerParagraph}</p>
        </div>
        <div className="flex-1 w-full h-full md:h-auto">
          <div
            className="w-full h-80 bg-cover bg-center rounded-lg shadow-lg"
            style={{ backgroundImage: `url('${headerImage}')` }}
          ></div>
        </div>
      </motion.div>

      {/* Icon Showcase Section (componente circular) */}
      {/* Reemplaza tu import "import IconShowcase from..." por el real */}
      {/* O usa <CircularServiceShowcase /> si así se llama tu componente */}
      {/* <IconShowcase /> o <CircularServiceShowcase /> */}
      <CircularServiceShowcase />
      

      {/* Services Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center text-[#1b293f]">
          {servicesTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-content-center">
          {Array.isArray(servicios) &&
            servicios.map((item, index) => {
              // Tomamos el string "icon" y buscamos en IconsMap
              const IconComponent = IconsMap[item.icon] || FileCheck;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
                >
                  <div className="bg-[#1b293f] p-6 flex flex-col items-center justify-center min-h-[200px]">
                    <div className="bg-white p-3 rounded-full mb-4 flex items-center justify-center">
                      <IconComponent className="w-10 h-10 text-[#1b293f]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white text-center">
                      {item.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-2">
                      {item.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="flex items-start"
                        >
                          <ArrowRight className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 text-sm">
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
