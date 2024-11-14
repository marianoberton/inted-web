// pages/ConsultoriaProyectosConstructivos.js

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Building, Ruler, Clipboard, Briefcase, HardHat, Home, FileText, CheckCircle, ArrowRight, FileCheck } from 'lucide-react';
import IconShowcase from '../components/IconShowcase'; // Asegúrate de la ruta correcta

const servicios = [
  {
    icon: Building,
    title: "Análisis de Factibilidad del Proyecto Constructivo",
    details: [
      "Análisis integral de aspectos morfológicos e interiorismo",
      "Evaluación de usos requeridos",
      "Verificación de disposiciones del Código Urbanístico y de Edificación",
      "Informe de factibilidad de proyecto constructivo",
      "Análisis integral del anteproyecto desde el punto de vista morfológico, de interiorismo y de usos requeridos, conforme al Código Urbanístico y de Edificación"
    ]
  },
  {
    icon: Ruler,
    title: "Plano de Mensura y Unificación",
    details: [
      "Adecuación del plano a formato municipal",
      "Tramitación de informes de dominio",
      "Seguimiento del trámite con informes semanales",
      "Informe de subsanaciones y adecuaciones correspondientes",
      "Seguimiento continuo del trámite, con informes de situación semanal para mantener al cliente informado"
    ]
  },
  {
    icon: Clipboard,
    title: "Plano de Demolición",
    details: [
      "Elaboración del plano de demolición con antecedentes de cada parcela",
      "Mediciones correspondientes (si se requieren)",
      "Adecuación del plano a formato municipal",
      "Seguimiento del trámite e informes de subsanaciones",
      "Gestoría de la totalidad del trámite y mediciones garantizadas con acceso al inmueble"
    ]
  },
  {
    icon: Briefcase,
    title: "Plano de Etapa de Proyecto y Permiso de Obra Civil",
    details: [
      "Adecuación de planos de instalaciones al formato municipal",
      "Tramitación de informes de dominio",
      "Seguimiento del trámite e informes de subsanaciones",
      "Gestión de planos de instalaciones (incendios, sanitaria, eléctrica, etc.)",
      "Gestoría de la totalidad de los trámites para adecuación y permisos"
    ]
  },
  {
    icon: HardHat,
    title: "Pedidos de Excavaciones y AVO",
    details: [
      "Gestión de la totalidad de los trámites de excavaciones",
      "Solicitud de AVO (Alta de Obra y Ejecución en TAD)",
      "Seguimiento del trámite y reportes semanales",
      "Gestión completa de la documentación y seguimiento continuo"
    ]
  },
  {
    icon: Home,
    title: "Conforme a Obra (AVO 4)",
    details: [
      "Regularización de Obra en Contravención / Ajuste de Obra",
      "Adecuación de planos de arquitectura de obra ejecutada",
      "Tramitación de informes de dominio",
      "Seguimiento del trámite y reportes semanales",
      "Gestoría completa para la regularización de obra conforme a la normativa vigente"
    ]
  },
  {
    icon: FileText,
    title: "Inicio y Final de Demolición",
    details: [
      "Adecuación del plano de arquitectura a formato municipal",
      "Modificaciones de proyecto",
      "Tramitación de informes de dominio y certificado de aptitud ambiental",
      "Seguimiento del trámite con informes semanales",
      "Gestoría integral de los trámites de inicio y final de demolición"
    ]
  },
  {
    icon: Clipboard,
    title: "División en Propiedad Horizontal (MH)",
    details: [
      "Adecuación del plano a formato municipal",
      "Tramitación de informes de dominio",
      "Seguimiento del trámite e informes de subsanaciones",
      "Gestoría completa de la división y adecuación del plano"
    ]
  },
  {
    icon: FileCheck,
    title: "Planos de Instalaciones (Incendios, Sanitaria, Eléctrica, etc.)",
    details: [
      "Adecuación de los planos de instalaciones al formato municipal",
      "Tramitación de informes de dominio",
      "Seguimiento del trámite e informes de subsanaciones",
      "Gestión de planos de instalaciones específicos y adecuación normativa"
    ]
  }
];

const beneficios = [
  "Asesoramiento integral y especializado en la realización de proyectos constructivos.",
  "Acompañamiento en todas las etapas del proyecto, asegurando el cumplimiento de la normativa vigente.",
  "Reducción de tiempos en la tramitación de permisos y licencias.",
  "Expertos en la gestión de planos, permisos y regularizaciones, facilitando el proceso constructivo.",
  "Flexibilidad en la contratación de servicios según las necesidades del cliente, ya sea de forma individual o grupal.",
  "Actualización continua mediante informes semanales, proporcionando transparencia y tranquilidad al cliente."
];



export default function ConsultoriaProyectosConstructivos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col md:flex-row items-center bg-[#1b293f] text-white py-40 px-8 sm:px-12 lg:px-16 relative"
      >
        <div className="flex-1 max-w-md z-10 md:mr-8">
          <h1 className="text-5xl font-bold mb-6">Consultoría en Desarrollo de Proyectos Constructivos</h1>
          <p className="text-lg mb-6">
            Asesoramiento integral en la gestoría de trámites requeridos para la realización de proyectos constructivos, incluyendo planos de mensura, demolición, permisos de obra civil, entre otros.
          </p>
        </div>
        <div className="flex-1 w-full h-full md:h-auto">
          <div className="w-full h-80 bg-cover bg-center rounded-lg shadow-lg" style={{ backgroundImage: "url('/images/proyectos.jpg')" }}></div>
        </div>
      </motion.div>

      {/* Icon Showcase Section */}
      <IconShowcase />

      {/* Services Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicios.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-[#1b293f] p-3 rounded-full mr-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1b293f]">{item.title}</h3>
                </div>
                <ul className="space-y-2">
                  {item.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start">
                      <ArrowRight className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-3xl font-bold text-[#1b293f] mb-8 text-center">Beneficios de Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {beneficios.map((beneficio, index) => (
            <div key={index} className="flex items-start p-6 bg-white rounded-lg shadow-md">
              <CheckCircle className="w-8 h-8 text-[#1b293f] mr-4 flex-shrink-0" />
              <span className="text-lg text-gray-700">{beneficio}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
