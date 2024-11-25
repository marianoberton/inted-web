"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, PenTool, FileCheck, HardHat, ArrowRight } from "lucide-react";
import IconShowcaseLicitaciones from "../components/IconShowcaseLicitaciones"; // Asegúrate de que el archivo exista y esté correctamente nombrado

const servicios = [
  {
    icon: FileText,
    title: "Confección de Documentación Licitatoria",
    details: [
      "Pliegos de Bases y Condiciones Generales y Particulares",
      "Especificaciones Técnicas",
      "Circulares aclaratorias y/o modificatorias",
      "Dictámenes de Evaluación de Ofertas",
      "Contratos Administrativos y/o Comerciales",
      "Actas de Recepción y Certificados de Liquidación Final",
    ],
  },
  {
    icon: PenTool,
    title: "Gestión de Procedimientos Licitatorios",
    details: [
      "Gestión de invitaciones a potenciales oferentes",
      "Análisis de consultas y elaboración de respuestas",
      "Gestión del Acto de Apertura de Ofertas",
      "Evaluación de Ofertas y solicitud de aclaraciones",
      "Asesoramiento durante la ejecución contractual",
    ],
  },
  {
    icon: FileCheck,
    title: "Elaboración de Ofertas",
    details: [
      "Análisis de Pliegos de Bases y Condiciones Licitatorios",
      "Inscripción ante Registros de Proveedores",
      "Confección de documentación administrativa, técnica y oferta económica",
      "Confección de Anteproyectos de Obra y Memorias descriptivas",
      "Análisis de ofertas de competidores y formulación de observaciones",
      "Elaboración de Impugnaciones a Dictámenes de Evaluación de Ofertas",
    ],
  },
  {
    icon: HardHat,
    title: "Ejecución del Proyecto Licitado",
    details: [
      "Confección de cuadros de seguimiento de evolución de índices",
      "Presentación de solicitudes de Adecuaciones de Precios",
      "Presentación de documentación requerida por Pliegos",
      "Solicitudes de reconocimiento de mayores costos por inversiones adicionales",
    ],
  },
];

export default function ConsultoriaLicitaciones() {
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
          <h1 className="text-5xl font-bold mb-6">Consultoría en Licitaciones Públicas y/o Privadas</h1>
          <p className="text-lg mb-6">
            Nuestro asesoramiento abarca todas las etapas de una licitación pública y/o privada, desde la confección de
            la documentación licitatoria hasta la ejecución del proyecto adjudicado.
          </p>
        </div>
        <div className="flex-1 w-full h-full md:h-auto">
          <div
            className="w-full h-80 bg-cover bg-center rounded-lg shadow-lg"
            style={{ backgroundImage: "url('/images/licitaciones.jpg')" }}
          ></div>
        </div>
      </motion.div>

      {/* Icon Showcase Section */}
      <IconShowcaseLicitaciones />

      {/* Services Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-12 text-center text-[#1b293f]">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {servicios.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-[#1b293f] p-6 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="bg-white p-3 rounded-full mb-4 flex items-center justify-center">
                    <IconComponent className="w-10 h-10 text-[#1b293f]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white text-center">{item.title}</h3>
                </div>
                <div className="p-6 flex items-center justify-center min-h-[160px]">
                  <ul className="space-y-2">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <ArrowRight className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
