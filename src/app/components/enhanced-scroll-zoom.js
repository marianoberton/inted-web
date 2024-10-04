"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { FileText, PenTool, FileCheck, Building, Ruler, Clipboard, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function EnhancedScrollZoom() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const scaleText = useTransform(smoothProgress, [0, 0.1], [1, 2]);
  const opacityText = useTransform(smoothProgress, [0, 0.1, 0.12], [1, 1, 0]);
  const yText = useTransform(smoothProgress, [0, 0.1, 0.12], ["0%", "-50%", "-100%"]);
  const opacityDivs = useTransform(smoothProgress, [0.12, 0.15], [0, 1]);
  const yDivs = useTransform(smoothProgress, [0.12, 0.15, 0.8, 0.9], ["20%", "0%", "0%", "-10%"]);

  const servicesLicitaciones = [
    { icon: FileText, title: 'Confección de Documentación Licitatoria', description: 'Elaboración de Pliegos, Especificaciones Técnicas y Dictámenes.' },
    { icon: PenTool, title: 'Gestión de Procedimientos Licitatorios', description: 'Gestión de invitaciones, apertura de ofertas y evaluación.' },
    { icon: FileCheck, title: 'Elaboración de Ofertas', description: 'Análisis de Pliegos y confección de propuestas competitivas.' }
  ];

  const servicesGestoria = [
    { icon: Building, title: 'Análisis de Factibilidad del Proyecto Constructivo', description: 'Evaluación de usos y verificación del Código Urbanístico.' },
    { icon: Ruler, title: 'Plano de Mensura y Unificación', description: 'Adecuación del plano a formato municipal e informes de dominio.' },
    { icon: Clipboard, title: 'Plano de Demolición', description: 'Elaboración del plano de demolición y seguimiento del trámite.' }
  ];

  const renderServiceSection = (title, description, services, buttonText, link, imageUrl, isReversed = false) => (
    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} w-full h-full`}>
      <div className="relative flex-1 flex items-center justify-center overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white text-center p-4 md:p-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4">{title}</h2>
          <p className="text-sm md:text-base lg:text-lg">{description}</p>
        </div>
      </div>
      <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1b293f] to-[#2a3b5a]">
        <div className="relative z-10 text-white p-4 md:p-8 w-full max-w-xl">
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <div className="bg-white p-1.5 rounded-full">
                  <service.icon className="w-4 h-4 text-[#1b293f]" />
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-semibold">{service.title}</h3>
                  <p className="text-xs md:text-sm text-gray-300">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href={link} passHref>
              <Button className="bg-white text-[#1b293f] hover:bg-gray-200 transition-colors duration-200 text-sm md:text-base">
                {buttonText}
                <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={containerRef} className="relative h-[400vh]">
      <div className="sticky top-[64px] h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-100 to-gray-300">
        <motion.div
          className="absolute text-4xl md:text-6xl font-bold text-center px-4 text-[#1b293f] z-20"
          style={{ scale: scaleText, opacity: opacityText, y: yText }}
        >
          Expertos en licitaciones<br />y proyectos constructivos
        </motion.div>

        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ opacity: opacityDivs, y: yDivs }}
        >
          {renderServiceSection(
            "Licitaciones Públicas y Privadas",
            "Consultoría integral en licitaciones para obras, servicios y suministros.",
            servicesLicitaciones,
            "Licitaciones públicas y/o privadas",
            "/consultoria-licitaciones",
            "/images/procesos.jpg"
          )}
          {renderServiceSection(
            "Proyectos Constructivos",
            "Asesoría completa para el desarrollo y gestión de proyectos constructivos.",
            servicesGestoria,
            "Ver Servicios de Gestoría",
            "/proyectos-constructivos",
            "/images/vega.jpg",
            true
          )}
        </motion.div>
      </div>
    </section>
  );
}
