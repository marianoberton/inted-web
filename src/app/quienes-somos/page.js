"use client";

import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, TrendingUp, ShieldCheck, Lightbulb } from 'lucide-react';
import RecurringJobsCarousel from '../components/RecurringJobsCarousel';

// Importamos la función de traducción
import { useTranslation } from "../TranslationProvider";

export default function SobreNosotros() {
  const { t } = useTranslation();

  const dictionaryFeatures = t("quienesSomos", "features");

  const companyFeatures = [
    { icon: Users, title: dictionaryFeatures[0].title, description: dictionaryFeatures[0].description },
    { icon: TrendingUp, title: dictionaryFeatures[1].title, description: dictionaryFeatures[1].description },
    { icon: ShieldCheck, title: dictionaryFeatures[2].title, description: dictionaryFeatures[2].description },
    { icon: Lightbulb, title: dictionaryFeatures[3].title, description: dictionaryFeatures[3].description },
  ];

  return (
    <>
      <Head>
        {/* Título optimizado con palabras clave */}
        <title>Quiénes Somos - INTED | Consultoría en Licitaciones y Proyectos Constructivos</title>

        {/* Meta descripción SEO */}
        <meta name="description" content="Conoce INTED, una consultora innovadora en proyectos constructivos y licitaciones públicas y privadas. Nuestro equipo multidisciplinario ofrece asesoría estratégica y gestión de contrataciones." />

        {/* Palabras clave SEO */}
        <meta name="keywords" content="
          consultoría en licitaciones, proyectos constructivos, gestión de contrataciones, 
          asesoría en compras públicas, normativa de licitaciones, concesiones estatales, 
          habilitaciones comerciales, planificación de obras, desarrollo de infraestructura, 
          compliance en construcción, gestión de contratos públicos, asesoramiento en licitaciones gubernamentales, 
          adjudicación de predios, planificación urbana, permisos de construcción, proyectos de inversión pública, 
          administración de obra pública, licitaciones ministeriales, consultoría en obras públicas
        " />

        {/* Autor */}
        <meta name="author" content="Inted" />

        {/* Meta robots */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Open Graph para redes sociales (Facebook, LinkedIn, WhatsApp) */}
        <meta property="og:title" content="Quiénes Somos - INTED | Consultoría en Licitaciones y Proyectos Constructivos" />
        <meta property="og:description" content="Conoce a INTED, una consultora líder en gestión de proyectos constructivos y contrataciones públicas y privadas." />
        <meta property="og:image" content="https://inted.com.ar/images/azul1.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://inted.com.ar/quienes-somos" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Quiénes Somos - INTED | Consultoría en Licitaciones y Proyectos Constructivos" />
        <meta name="twitter:description" content="Conoce a INTED, una consultora líder en gestión de proyectos constructivos y contrataciones públicas y privadas." />
        <meta name="twitter:image" content="https://inted.com.ar/images/azul1.png" />
        <meta name="twitter:image:alt" content="Equipo de trabajo de INTED Consultoría" />

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


      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 py-24">
          {/* Imagen de portada */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative rounded-xl shadow-2xl overflow-hidden mb-24">
            <div className="relative w-full h-[400px]">
              <Image src="/images/empresa.jpg" alt="Fondo corporativo" fill className="absolute inset-0 object-cover" />
              <div className="absolute inset-0 bg-[#1b293f] bg-opacity-70 flex items-center px-8 lg:px-16">
                <div className="text-left max-w-xl">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                    {t("quienesSomos", "heroTitle")}
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-3xl leading-tight">
                    {t("quienesSomos", "heroParagraph")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Misión */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-24 text-center">
            <h2 className="text-4xl font-bold mb-12 text-center text-[#1b293f]">
              {t("quienesSomos", "missionTitle")}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t("quienesSomos", "missionParagraph")}
            </p>
          </motion.div>

          {/* Fortalezas */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mb-24">
            <h2 className="text-4xl font-bold mb-12 text-center text-[#1b293f]">
              {t("quienesSomos", "strengthsTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {companyFeatures.map((feature, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4 transform transition-all duration-300 hover:scale-105">
                  <div className="bg-[#1b293f] p-3 rounded-full">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#1b293f] mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Carrusel de Trabajos */}
          <RecurringJobsCarousel />
        </div>
      </div>
    </>
  );
}
