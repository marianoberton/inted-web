"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link'; // Importamos Link desde next/link
import { Button } from "./ui/button";

const rubros = [
  "Tecnología",
  "Infraestructura",
  "Salud"
];

const tenderData = [
  {
    rubro: "Tecnología",
    descripcion: "Licitaciones para la adquisición y mantenimiento de equipos informáticos y software para instituciones públicas.",
    licitaciones: [
      { nombre: "Actualización de sistemas informáticos hospitalarios", fechaApertura: "19/09/2024", jurisdiccion: "PBA" },
      { nombre: "Adquisición de equipos de videoconferencia", fechaApertura: "22/09/2024", jurisdiccion: "CABA" },
      { nombre: "Implementación de sistema de gestión documental", fechaApertura: "25/09/2024", jurisdiccion: "Nacional" },
      { nombre: "Renovación de licencias de software", fechaApertura: "28/09/2024", jurisdiccion: "PBA" },
    ],
    cantidadTotal: 12
  },
  {
    rubro: "Infraestructura",
    descripcion: "Proyectos de construcción, mantenimiento y mejora de infraestructuras públicas en las distintas jurisdicciones.",
    licitaciones: [
      { nombre: "Construcción de puente peatonal", fechaApertura: "20/09/2024", jurisdiccion: "CABA" },
      { nombre: "Repavimentación de avenidas principales", fechaApertura: "23/09/2024", jurisdiccion: "PBA" },
      { nombre: "Ampliación de red cloacal", fechaApertura: "26/09/2024", jurisdiccion: "Nacional" },
      { nombre: "Renovación de alumbrado público", fechaApertura: "29/09/2024", jurisdiccion: "PBA" },
    ],
    cantidadTotal: 15
  },
  {
    rubro: "Salud",
    descripcion: "Licitaciones relacionadas con la adquisición de equipamiento médico y servicios para el sistema de salud provincial y nacional.",
    licitaciones: [
      { nombre: "Compra de equipos de rayos X", fechaApertura: "21/09/2024", jurisdiccion: "Nacional" },
      { nombre: "Adquisición de ambulancias equipadas", fechaApertura: "24/09/2024", jurisdiccion: "PBA" },
      { nombre: "Suministro de medicamentos oncológicos", fechaApertura: "27/09/2024", jurisdiccion: "CABA" },
      { nombre: "Contratación de servicios de limpieza hospitalaria", fechaApertura: "30/09/2024", jurisdiccion: "Nacional" },
    ],
    cantidadTotal: 18
  }
];

export default function TenderPreview() {
  const [currentRubro, setCurrentRubro] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const tenderPreviewElement = document.getElementById('tender-preview');
      const elementPosition = tenderPreviewElement.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      if (elementPosition < viewportHeight * 0.75) {
        setHasScrolled(true);
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="tender-preview" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#1b293f] mb-8 text-center">Licitaciones por Rubro</h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRubro}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* Parte izquierda del componente */}
                <motion.div
                  className="md:w-1/2 p-6 bg-white"
                  initial={{ x: hasScrolled ? 0 : -200, opacity: hasScrolled ? 1 : 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: hasScrolled ? 0.5 : 1.75, delay: hasScrolled ? 0 : 0.5 }}
                >
                  <h3 className="text-2xl font-semibold text-[#1b293f] mb-4">{rubros[currentRubro]}</h3>
                  <p className="text-lg font-medium text-[#1b293f] mb-2">
                    Rubro: {tenderData[currentRubro].rubro}
                  </p>
                  <p className="text-md text-gray-600 mb-4">
                    {tenderData[currentRubro].descripcion}
                  </p>
                  <p className="text-md text-gray-600">
                    <span className="font-medium">Total de licitaciones activas:</span> {tenderData[currentRubro].cantidadTotal}
                  </p>
                  <div className="mt-6">
                    {/* Enlace al path /licitaciones */}
                    <Link
                      href="/licitaciones"
                      className="inline-flex items-center bg-[#1b293f] text-white hover:bg-[#bfbfbf] hover:text-[#1b293f] transition-colors duration-200 px-4 py-2 rounded"
                    >
                      Ver todas las licitaciones <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>

                {/* Parte derecha del componente */}
                <motion.div
                  className="md:w-1/2 p-6 bg-[#1b293f] text-white"
                  initial={{ x: hasScrolled ? 0 : 200, opacity: hasScrolled ? 1 : 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: hasScrolled ? 0.5 : 1.5, delay: hasScrolled ? 0 : 0.5 }}
                >
                  <h4 className="text-xl font-semibold mb-4">Licitaciones Recientes</h4>
                  <ul className="space-y-4">
                    {tenderData[currentRubro].licitaciones.map((licitacion, index) => (
                      <li key={index} className="border-b border-gray-700 pb-2">
                        <p className="font-medium">{licitacion.nombre}</p>
                        <p className="text-sm text-gray-300">
                          Apertura: {licitacion.fechaApertura} - <span className="font-semibold">{licitacion.jurisdiccion}</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Paginación del carrusel */}
          <div className="flex justify-center mt-8">
            {rubros.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentRubro(index)}
                className={`w-3 h-3 rounded-full mx-1 ${currentRubro === index ? 'bg-[#1b293f]' : 'bg-gray-300'}`}
                aria-label={`Ver licitaciones de ${rubros[index]}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
