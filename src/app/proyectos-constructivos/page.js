"use client";

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import CircularServiceShowcase from "../components/IconShowcase";

// Importamos useTranslation
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
    <>
      {/* Head SEO Optimizado */}
      <Head>
        {/* Título optimizado con palabras clave */}
        <title>Consultoría en Proyectos Constructivos | INTED</title>

        {/* Meta descripción SEO */}
        <meta name="description" content="Asesoramos en el desarrollo y gestión de proyectos constructivos. Brindamos servicios de análisis de factibilidad, tramitación de permisos, planos de obra, gestión ambiental y división en propiedad horizontal." />

        {/* Palabras clave SEO */}
        <meta name="keywords" content="
          proyectos constructivos, consultoría en construcción, tramitación de permisos de obra, 
          análisis de factibilidad de proyectos, planos de arquitectura, planos de instalaciones, 
          permisos municipales, regularización de obras, división en propiedad horizontal, 
          cumplimiento del Código Urbanístico, gestión de excavaciones, conformidad de obra, 
          ajuste de obra en contravención, mensura y unificación parcelaria, evaluación de proyectos, 
          portal director de obra, permisos de demolición, certificaciones ambientales en construcción
        " />

        {/* Autor */}
        <meta name="author" content="Inted" />

        {/* Meta robots */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Open Graph para redes sociales (Facebook, LinkedIn, WhatsApp) */}
        <meta property="og:title" content="Consultoría en Proyectos Constructivos | INTED" />
        <meta property="og:description" content="Asesoramos en el desarrollo y gestión de proyectos constructivos. Brindamos servicios de análisis de factibilidad, tramitación de permisos, planos de obra, gestión ambiental y división en propiedad horizontal." />
        <meta property="og:image" content="https://inted.com.ar/images/azul1.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://inted.com.ar/proyectos-constructivos" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Consultoría en Proyectos Constructivos | INTED" />
        <meta name="twitter:description" content="Asesoramos en el desarrollo y gestión de proyectos constructivos. Brindamos servicios de análisis de factibilidad, tramitación de permisos, planos de obra, gestión ambiental y división en propiedad horizontal." />
        <meta name="twitter:image" content="https://inted.com.ar/images/azul1.png" />
        <meta name="twitter:image:alt" content="Consultoría en proyectos constructivos" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Datos estructurados JSON-LD para Google */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "INTED Consultoría",
            "url": "https://inted.com.ar",
            "logo": "https://inted.com.ar/logo.png",
            "description": "Consultoría en licitaciones, contrataciones con el Estado y Desarrollo de Proyectos Constructivos.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Juramento 1475",
              "addressLocality": "Ciudad Autónoma de Buenos Aires",
              "addressCountry": "Argentina"
            },
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+54-XXX-XXX-XXXX",
                "contactType": "Consultoría"
              }
            ],
            "sameAs": [
              "https://www.linkedin.com/company/inted",
              "https://twitter.com/inted",
              "https://www.facebook.com/inted"
            ]
          })}
        </script>
      </Head>

      {/* Contenido de la página */}
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

        {/* Icon Showcase Section */}
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
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
