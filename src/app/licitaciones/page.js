"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Search, Calendar, DollarSign, Briefcase, Tag } from "lucide-react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

// Importamos useTranslation
import { useTranslation } from "../TranslationProvider";

export default function LicitacionesPage() {
  const [licitaciones, setLicitaciones] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroTipoContratacion, setFiltroTipoContratacion] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroJurisdiccion, setFiltroJurisdiccion] = useState("");

  // Extraemos t() y language
  const { t, language } = useTranslation();

  useEffect(() => {
    const fetchLicitaciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "procesos-bac-dashboard"));
        const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        // Procesar y setear las licitaciones aquí...
        setLicitaciones(documents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLicitaciones();
  }, [language]);

  return (
    <>
      {/* Head SEO Optimizado */}
      <Head>
        {/* Título optimizado con palabras clave */}
        <title>Portal de Licitaciones de CABA | INTED</title>

        {/* Meta descripción SEO */}
        <meta name="description" content="Consulta las licitaciones activas de la Ciudad Autónoma de Buenos Aires en tiempo real. Filtra por categoría, tipo de contratación y jurisdicción. Accede a información detallada sobre cada proceso." />

        {/* Palabras clave SEO */}
        <meta name="keywords" content="
          licitaciones caba, contrataciones públicas, licitaciones ciudad autónoma de buenos aires, 
          compras del estado, licitaciones abiertas, licitaciones vigentes, portal de licitaciones, 
          obras públicas en CABA, contrataciones gubernamentales, adjudicación de contratos, 
          licitaciones de infraestructura, servicios generales, tecnología en licitaciones, 
          compras estatales, contratación directa, licitación pública, proveedores del estado
        " />

        {/* Autor */}
        <meta name="author" content="Inted" />

        {/* Meta robots */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Open Graph para redes sociales */}
        <meta property="og:title" content="Portal de Licitaciones de CABA | INTED" />
        <meta property="og:description" content="Consulta las licitaciones activas de la Ciudad Autónoma de Buenos Aires en tiempo real. Filtra por categoría, tipo de contratación y jurisdicción. Accede a información detallada sobre cada proceso." />
        <meta property="og:image" content="https://inted.com.ar/images/licitaciones.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://inted.com.ar/licitaciones" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portal de Licitaciones de CABA | INTED" />
        <meta name="twitter:description" content="Consulta las licitaciones activas de la Ciudad Autónoma de Buenos Aires en tiempo real. Filtra por categoría, tipo de contratación y jurisdicción. Accede a información detallada sobre cada proceso." />
        <meta name="twitter:image" content="https://inted.com.ar/images/licitaciones.jpg" />
        <meta name="twitter:image:alt" content="Licitaciones activas en la Ciudad Autónoma de Buenos Aires" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Datos estructurados JSON-LD */}
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-[#1b293f] mb-6 text-center"
          >
            Portal de Licitaciones CABA
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-center text-gray-600 mb-12"
          >
            Explora las licitaciones activas y futuras de la Ciudad Autónoma de Buenos Aires.
          </motion.p>

          {/* Lista de licitaciones */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {licitaciones.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {licitaciones.map((licitacion, index) => (
                  <motion.div
                    key={licitacion.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                  >
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="text-xl font-bold text-[#1b293f] mb-2">
                        {licitacion.nombre}
                      </h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Tag size={16} className="mr-2" />
                        <span className="text-sm">{licitacion.categoria}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Briefcase size={16} className="mr-2" />
                        <span className="text-sm">{licitacion.tipoContratacion}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 text-xl">No hay licitaciones disponibles en este momento.</p>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
