
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, TrendingUp, ShieldCheck, Lightbulb } from 'lucide-react';

const companyFeatures = [
  {
    icon: Users,
    title: "Equipo Multidisciplinario",
    description: "Contamos con un equipo de profesionales que combina habilidades técnicas, legales y constructivas para ofrecer soluciones integrales"
  },
  {
    icon: TrendingUp,
    title: "Orientación al Crecimiento",
    description: "Nos enfocamos en potenciar el desarrollo de nuestros clientes, ofreciendo consultoría estratégica y eficiente."
  },
  {
    icon: ShieldCheck,
    title: "Compromiso con la Calidad",
    description: "Priorizamos la excelencia en cada proyecto, asegurando cumplimiento normativo y estándares de calidad en cada proceso."
  },
  {
    icon: Lightbulb,
    title: "Innovación Constante",
    description: "Implementamos tecnologías avanzadas y enfoques innovadores para optimizar nuestras soluciones y servicios."
  }
];

const projectImages = [
  { src: "/images/gruas.jpg", caption: "Licitaciones de Gruas" },
  { src: "/images/obras.jpg", caption: "Obras de infraestructura" },
  { src: "/images/celebra.jpeg", caption: "Servicios de organizacion de eventos masivos" },
  { src: "/images/viandas.jpg", caption: "Servicios de alimentos" },
];



export default function SobreNosotros() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-32 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-7xl mx-auto"
      >
        {/* Company Description with Background Image */}
        <div className="relative rounded-lg shadow-xl overflow-hidden mb-16">
          <Image
            src="/images/empresa.jpg"
            alt="Fondo corporativo"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0"
          />
          <div className="relative bg-black bg-opacity-60 p-8 md:p-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">Inted</h1>
            <p className="text-xl text-gray-200 mb-6">
            Inted es una consultora innovadora que brinda un asesoramiento integral en el ámbito de proyectos constructivos y licitaciones públicas y/o privadas, garantizando el cumplimiento normativo en cada etapa del proceso.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <p className="text-2xl text-gray-700 mb-6 font-light leading-relaxed">
          Nuestra misión es acompañar a nuestros clientes en cada etapa de su proyecto, desde la planificación hasta la ejecución, ofreciendo soluciones que se adapten a sus necesidades.
          </p>
        </motion.div>

        {/* Company Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {companyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 flex items-start space-x-4"
            >
              <feature.icon className="w-12 h-12 text-[#1b293f] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-[#1b293f] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-[#1b293f] mb-8">Proyectos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectImages.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  src={project.src}
                  alt={project.caption}
                  layout="responsive"
                  width={700}
                  height={475}
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
                  <p className="text-white text-lg">{project.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Commitment Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="text-2xl text-gray-700 font-light leading-relaxed">
          Estamos comprometidos con el crecimiento y el éxito de nuestros clientes, aportando un enfoque centrado en la calidad y la eficiencia.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
