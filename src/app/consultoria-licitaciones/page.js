"use client";

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import IconShowcaseLicitaciones from "../components/IconShowcaseLicitaciones";

// 1. Importamos useTranslation
import { useTranslation } from "../TranslationProvider";

// Mapeo de iconos (por nombre a componente). 
// Viene de lucide-react, adaptado a tus necesidades.
import {
  FileEdit,
  Briefcase,
  FileText,
  ClipboardList,
} from "lucide-react";

// Creamos un objeto que asocia string -> Componente
const IconsMap = {
  FileEdit,
  Briefcase,
  FileText,
  ClipboardList,
};

export default function ConsultoriaLicitaciones() {
  // 2. Extraemos la función t() 
  const { t } = useTranslation();

  // 3. Leemos los datos de la sección consultoriaLicitaciones
  const headerTitle = t("consultoriaLicitaciones", "headerTitle");
  const headerParagraph = t("consultoriaLicitaciones", "headerParagraph");
  const headerImage = t("consultoriaLicitaciones", "headerImage");
  const servicesTitle = t("consultoriaLicitaciones", "servicesTitle");

  // servicesArray es el array con icon/title/details
  const servicios = t("consultoriaLicitaciones", "servicesArray");

  return (
    <>
      {/* Head SEO Optimizado */}
      <Head>
        {/* Título optimizado con palabras clave */}
        <title>Consultoría en Licitaciones Públicas y Privadas | INTED</title>

        {/* Meta descripción SEO */}
        <meta name="description" content="Asesoramos en todas las etapas de una licitación pública o privada: inscripción de proveedores, análisis de pliegos, elaboración de ofertas, impugnaciones y ejecución de proyectos adjudicados." />

        {/* Palabras clave SEO */}
        <meta name="keywords" content="
          consultoría en licitaciones, licitaciones públicas, licitaciones privadas, 
          ejecución de proyectos licitados, análisis de pliegos, inscripción de proveedores, 
          confección de documentación licitatoria, elaboración de ofertas, impugnaciones, 
          dictámenes de evaluación de ofertas, gestión de contrataciones, representación técnica, 
          adecuaciones de precios en contratos, evaluación de ofertas, contratación gubernamental, 
          contrataciones del estado, asesoría en compras públicas, licitaciones en Argentina, 
          confección de anteproyectos de obra, administración de contratos públicos
        " />

        {/* Autor */}
        <meta name="author" content="Inted" />

        {/* Meta robots */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Open Graph para redes sociales */}
        <meta property="og:title" content="Consultoría en Licitaciones Públicas y Privadas | INTED" />
        <meta property="og:description" content="Asesoramos en todas las etapas de una licitación pública o privada: inscripción de proveedores, análisis de pliegos, elaboración de ofertas, impugnaciones y ejecución de proyectos adjudicados." />
        <meta property="og:image" content="https://inted.com.ar/images/azul1.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://inted.com.ar/consultoria-licitaciones" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Consultoría en Licitaciones Públicas y Privadas | INTED" />
        <meta name="twitter:description" content="Asesoramos en todas las etapas de una licitación pública o privada: inscripción de proveedores, análisis de pliegos, elaboración de ofertas, impugnaciones y ejecución de proyectos adjudicados." />
        <meta name="twitter:image" content="https://inted.com.ar/images/azul1.png" />
        <meta name="twitter:image:alt" content="Consultoría en licitaciones públicas y privadas" />

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
        <IconShowcaseLicitaciones />

        {/* Services Section */}
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#1b293f]">
            {servicesTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {Array.isArray(servicios) &&
              servicios.map((item, index) => {
                // 4. Tomamos el icon string y buscamos el componente
                const IconComponent = IconsMap[item.icon] || FileText;

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
                    <div className="p-6 flex items-center justify-center min-h-[160px]">
                      <ul className="space-y-2">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
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
    </>
  );
}
