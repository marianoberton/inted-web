"use client";

import React from 'react';
import { motion } from 'framer-motion';  // Importamos framer-motion
import { Button } from "./ui/button";
import { FileText, PenTool, FileCheck } from 'lucide-react';

export default function ServicesSummary() {
  const services = [
    { icon: FileText, title: 'Asesoramiento en Licitaciones', description: 'Guía experta en cada etapa del proceso de licitación pública y privada.' },
    { icon: PenTool, title: 'Preparación de Ofertas', description: 'Desarrollo de propuestas competitivas y completas que destacan en el mercado.' },
    { icon: FileCheck, title: 'Gestión de Contratos', description: 'Administración eficiente de contratos adjudicados para garantizar el cumplimiento.' },
  ];

  // Variantes para las animaciones de framer-motion
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,  // Retardo entre la aparición de los elementos
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-[#1b293f] mb-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Nuestros Servicios
        </motion.h2>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-[#f4f3f1] p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105 flex flex-col items-center text-center"
            >
              <div className="bg-[#1b293f] p-4 rounded-full mb-4">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1b293f] mb-3">{service.title}</h3>
              <p className="text-[#1b293f] mb-4">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}  // Botón aparece con un pequeño retraso
        >
          <Button className="bg-[#1b293f] text-white hover:bg-[#bfbfbf] hover:text-[#1b293f] transition-colors duration-200">
            Ver todos los servicios
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
