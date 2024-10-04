"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function StateCarousel() {
  const logos = [
    "/images/caba.png",
    "/images/nacion.png",
    "/images/gobierno-pba.jpg",
    "/images/caba.png",
    "/images/nacion.png",
    "/images/gobierno-pba.jpg",
    "/images/caba.png",  // Se repiten las imágenes para fluidez en el loop
    "/images/nacion.png",
    "/images/gobierno-pba.jpg",
  ];

  const logoWidth = 128; // Ancho de cada logo
  const visibleLogos = 3; // Número de logos visibles a la vez
  const gap = 32; // Espacio entre logos
  const totalVisibleWidth = logoWidth * visibleLogos + gap * (visibleLogos - 1); // Ancho total visible

  const marqueeVariants = {
    animate: {
      x: [0, -(logoWidth + gap) * (logos.length / 2)],  // Desplazamiento necesario para un bucle
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 15,  // Ajusta la duración para controlar la velocidad
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-[#1b293f] mb-10">Estados con los que trabajamos</h2>
        <div className="overflow-hidden" style={{ width: `${totalVisibleWidth}px`, margin: '0 auto' }}>
          <motion.div
            className="flex space-x-8"
            variants={marqueeVariants}
            animate="animate"
          >
            {logos.map((logo, index) => (
              <div key={index} className="w-32 h-32 flex items-center justify-center">
                <Image src={logo} alt={`Logo Estado ${index % 3 + 1}`} width={logoWidth} height={logoWidth} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
