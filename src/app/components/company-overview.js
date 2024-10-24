"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "./ui/button";

export default function CompanyOverview() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut", delay: 0.3 }
    }
  };

  return (
    <section className="py-16 bg-[#f4f3f1]">
      <motion.div
        className="container mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold text-[#1b293f] mb-6"
            variants={textVariants}
          >
            Innovación y Calidad en Consultoría
          </motion.h2>
          <motion.p
            className="text-lg text-[#1b293f] mb-6 leading-relaxed"
            variants={textVariants}
          >
            Inted es una consultora  innovadora que brinda un asesoramiento integral en el ámbito de  proyectos constructivos y licitaciones públicas y/o privadas, garantizando el cumplimiento normativo en cada etapa del proceso.
          </motion.p>
          <motion.p
            className="text-lg text-[#1b293f] mb-8 leading-relaxed"
            variants={textVariants}
          >
            
Ofrecemos un amplio rango de servicios, incluyendo la gestoría de trámites constructivos, habilitaciones comerciales y confección de ofertas para licitaciones públicas y privadas. Contamos con un equipo multidisciplinario que combina experiencia en el ámbito público/privado.
          </motion.p>
          <motion.div variants={textVariants}>
            <Button
              className="bg-[#1b293f] text-white hover:bg-[#bfbfbf] hover:text-[#1b293f]"
              onClick={() => window.location.href = '/quienes-somos'}
            >
              Ver más
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}