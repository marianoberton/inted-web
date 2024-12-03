"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Users, TrendingUp, ShieldCheck, Lightbulb } from 'lucide-react';

const companyFeatures = [
  {
    icon: Users,
    title: "Equipo Multidisciplinario",
    description:
      "Contamos con un equipo de profesionales que combina habilidades técnicas, legales y constructivas para ofrecer soluciones integrales.",
  },
  {
    icon: TrendingUp,
    title: "Orientación al Crecimiento",
    description:
      "Nos enfocamos en potenciar el desarrollo de nuestros clientes, ofreciendo consultoría estratégica y eficiente.",
  },
  {
    icon: ShieldCheck,
    title: "Compromiso con la Calidad",
    description:
      "Priorizamos la excelencia en cada proyecto, asegurando cumplimiento normativo y estándares de calidad en cada proceso.",
  },
  {
    icon: Lightbulb,
    title: "Innovación Constante",
    description:
      "Implementamos tecnologías avanzadas y enfoques innovadores para optimizar nuestras soluciones y servicios.",
  },
];

const projectImages = [
  { src: "/images/gruas.jpg", caption: "Licitaciones de Gruas" },
  { src: "/images/obras.jpg", caption: "Obras de infraestructura" },
  { src: "/images/celebra.jpeg", caption: "Servicios de organización de eventos masivos" },
  { src: "/images/viandas.jpg", caption: "Servicios de alimentos" },
];

export default function SobreNosotros() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-24">
        {/* Company Description with Fixed Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-xl shadow-2xl overflow-hidden mb-24"
        >
          {/* Contenedor de la imagen */}
          <div className="relative w-full h-[400px]">
            <Image
              src="/images/empresa.jpg"
              alt="Fondo corporativo"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
            />
            {/* Capa de superposición */}
            <div className="absolute inset-0 bg-[#1b293f] bg-opacity-70 flex items-center px-8 lg:px-16">
              <div className="text-left max-w-xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                  Inted
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-200 max-w-3xl leading-tight">
                  Somos una consultora innovadora que brinda un asesoramiento integral en el ámbito de proyectos constructivos y licitaciones públicas y/o privadas, garantizando el cumplimiento normativo en cada etapa del proceso.
                </p>

              </div>
            </div>
          </div>
        </motion.div>


        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-24 text-center"
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-[#1b293f]">Nuestra Misión</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Acompañar a nuestros clientes a lo largo de las diversas instancias de su proyecto, desde la planificación hasta la ejecución, ofreciendo soluciones que se adapten a sus necesidades.
          </p>
        </motion.div>

        {/* Company Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-[#1b293f]">Nuestras Fortalezas</h2>
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
                  <h3 className="text-xl font-semibold text-[#1b293f] mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Project Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold mb-12 text-center text-[#1b293f]">Proyectos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectImages.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative w-full h-[300px] rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <Image
                  src={project.src}
                  alt={project.caption}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1b293f] to-transparent p-4">
                  <p className="text-white text-lg font-semibold">{project.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Commitment Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center bg-[#1b293f] text-white p-12 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold mb-6">Nuestro Compromiso</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Estamos comprometidos con el crecimiento y el éxito de nuestros clientes, aportando un enfoque centrado en la calidad y la eficiencia.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
