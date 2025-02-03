"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, TrendingUp, ShieldCheck, Lightbulb } from 'lucide-react';
import RecurringJobsCarousel from '../components/RecurringJobsCarousel';

// 1. Importar useTranslation
import { useTranslation } from "../TranslationProvider";

export default function SobreNosotros() {
  // 2. Extraemos t() y el idioma actual si hace falta
  const { t } = useTranslation();

  // 3. Obtenemos del diccionario los features
  //    (Podemos mapear su icono aquí, o usar la data del diccionario "features" + lo local)
  const dictionaryFeatures = t("quienesSomos", "features");

  // 4. Creamos un array local que combine la traducción con tus íconos:
  const companyFeatures = [
    {
      icon: Users,
      title: dictionaryFeatures[0].title,
      description: dictionaryFeatures[0].description,
    },
    {
      icon: TrendingUp,
      title: dictionaryFeatures[1].title,
      description: dictionaryFeatures[1].description,
    },
    {
      icon: ShieldCheck,
      title: dictionaryFeatures[2].title,
      description: dictionaryFeatures[2].description,
    },
    {
      icon: Lightbulb,
      title: dictionaryFeatures[3].title,
      description: dictionaryFeatures[3].description,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-24">
        {/* Imagen de portada */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-xl shadow-2xl overflow-hidden mb-24"
        >
          <div className="relative w-full h-[400px]">
            <Image
              src="/images/empresa.jpg"
              alt="Fondo corporativo"
              fill
              className="absolute inset-0 object-cover"
            />
            <div className="absolute inset-0 bg-[#1b293f] bg-opacity-70 flex items-center px-8 lg:px-16">
              <div className="text-left max-w-xl">
                {/* Título y párrafo del Hero */}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24 text-center"
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-[#1b293f]">
            {t("quienesSomos", "missionTitle")}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {t("quienesSomos", "missionParagraph")}
          </p>
        </motion.div>

        {/* Fortalezas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-[#1b293f]">
            {t("quienesSomos", "strengthsTitle")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {companyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 flex items-start space-x-4 transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-[#1b293f] p-3 rounded-full">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1b293f] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Carrusel */}
        <RecurringJobsCarousel />

        {/* Compromiso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-[#1b293f] text-white p-12 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6">
            {t("quienesSomos", "commitmentTitle")}
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            {t("quienesSomos", "commitmentParagraph")}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
