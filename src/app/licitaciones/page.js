"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

const licitacionesPorJurisdiccion = [
  {
    jurisdiccion: "Gobierno Nacional",
    licitaciones: [
      { nombre: "Construcción de Hospital Nacional", fechaApertura: "15/10/2024", monto: "$500,000,000" },
      { nombre: "Compra de Equipos Informáticos", fechaApertura: "20/10/2024", monto: "$120,000,000" },
      { nombre: "Mantenimiento de Rutas Nacionales", fechaApertura: "25/10/2024", monto: "$300,000,000" },
    ],
  },
  {
    jurisdiccion: "Provincia de Buenos Aires",
    licitaciones: [
      { nombre: "Construcción de Escuelas Primarias", fechaApertura: "18/10/2024", monto: "$200,000,000" },
      { nombre: "Adquisición de Mobiliario Urbano", fechaApertura: "22/10/2024", monto: "$80,000,000" },
      { nombre: "Servicio de Recolección de Residuos", fechaApertura: "28/10/2024", monto: "$150,000,000" },
    ],
  },
  {
    jurisdiccion: "Ciudad Autónoma de Buenos Aires",
    licitaciones: [
      { nombre: "Renovación de Alumbrado Público", fechaApertura: "17/10/2024", monto: "$90,000,000" },
      { nombre: "Implementación de Sistema de Transporte", fechaApertura: "23/10/2024", monto: "$250,000,000" },
      { nombre: "Mantenimiento de Espacios Verdes", fechaApertura: "29/10/2024", monto: "$110,000,000" },
    ],
  },
];

const licitacionesPorRubro = [
  {
    rubro: "Salud",
    licitaciones: [
      { nombre: "Compra de Equipamiento Médico", fechaApertura: "16/10/2024", monto: "$70,000,000", jurisdiccion: "Gobierno Nacional" },
      { nombre: "Construcción de Centros de Salud", fechaApertura: "21/10/2024", monto: "$220,000,000", jurisdiccion: "Provincia de Buenos Aires" },
    ],
  },
  {
    rubro: "Infraestructura",
    licitaciones: [
      { nombre: "Ampliación de Red de Gas", fechaApertura: "19/10/2024", monto: "$130,000,000", jurisdiccion: "Ciudad Autónoma de Buenos Aires" },
      { nombre: "Mejoramiento de Caminos Rurales", fechaApertura: "24/10/2024", monto: "$180,000,000", jurisdiccion: "Provincia de Buenos Aires" },
    ],
  },
  {
    rubro: "Tecnología",
    licitaciones: [
      { nombre: "Desarrollo de Plataforma Digital", fechaApertura: "26/10/2024", monto: "$60,000,000", jurisdiccion: "Gobierno Nacional" },
      { nombre: "Implementación de Red 5G", fechaApertura: "30/10/2024", monto: "$400,000,000", jurisdiccion: "Gobierno Nacional" },
    ],
  },
];

export default function LicitacionesPage() {
  const [activeTab, setActiveTab] = useState('jurisdiccion');

  return (
    <div className="bg-gray-100 pt-[calc(80px+2rem)] pb-16">
        <div className="container mx-auto px-4">
        {/* Título */}
        <h1 className="text-4xl font-bold text-[#1b293f] mb-8 text-center">Próximas Licitaciones</h1>

        {/* Pestañas */}
        <div className="flex justify-center mb-8">
          <button
            className={`px-4 py-2 mx-2 font-semibold rounded shadow ${
              activeTab === 'jurisdiccion' ? 'bg-[#1b293f] text-white' : 'bg-white text-[#1b293f]'
            }`}
            onClick={() => setActiveTab('jurisdiccion')}
          >
            Por Jurisdicción
          </button>
          <button
            className={`px-4 py-2 mx-2 font-semibold rounded shadow ${
              activeTab === 'rubro' ? 'bg-[#1b293f] text-white' : 'bg-white text-[#1b293f]'
            }`}
            onClick={() => setActiveTab('rubro')}
          >
            Por Rubro
          </button>
        </div>

        {/* Contenido */}
        <div>
          {activeTab === 'jurisdiccion' && (
            <motion.div
              key="jurisdiccion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {licitacionesPorJurisdiccion.map((jurisdiccionData, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-[#1b293f] mb-4">{jurisdiccionData.jurisdiccion}</h2>
                    <ul className="space-y-4">
                      {jurisdiccionData.licitaciones.map((licitacion, idx) => (
                        <li key={idx} className="border-b border-gray-200 pb-2">
                          <p className="font-medium text-[#1b293f]">{licitacion.nombre}</p>
                          <p className="text-sm text-gray-600">Apertura: {licitacion.fechaApertura}</p>
                          <p className="text-sm text-gray-600">Monto: {licitacion.monto}</p>
                          {/* Botón "Ver Detalles" para cada licitación */}
                          <div className="mt-2">
                            <Link href="/detalle-licitacion" className="text-[#1b293f] hover:underline font-semibold">
                              Ver Detalles <ChevronRight className="inline h-4 w-4" />
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {/* Botón "Ver Todas" para cada jurisdicción */}
                    <div className="mt-4 text-right">
                      <Link
                        href={`/licitaciones/jurisdiccion/${jurisdiccionData.jurisdiccion.toLowerCase().replace(/ /g, '-')}`}
                        className="text-[#1b293f] hover:underline font-semibold"
                      >
                        Ver Todas <ChevronRight className="inline h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'rubro' && (
            <motion.div
              key="rubro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {licitacionesPorRubro.map((rubroData, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-[#1b293f] mb-4">{rubroData.rubro}</h2>
                    <ul className="space-y-4">
                      {rubroData.licitaciones.map((licitacion, idx) => (
                        <li key={idx} className="border-b border-gray-200 pb-2">
                          <p className="font-medium text-[#1b293f]">{licitacion.nombre}</p>
                          <p className="text-sm text-gray-600">Apertura: {licitacion.fechaApertura}</p>
                          <p className="text-sm text-gray-600">Monto: {licitacion.monto}</p>
                          <p className="text-sm text-gray-600">Jurisdicción: {licitacion.jurisdiccion}</p>
                          {/* Botón "Ver Detalles" para cada licitación */}
                          <div className="mt-2">
                            <Link href="/detalle-licitacion" className="text-[#1b293f] hover:underline font-semibold">
                              Ver Detalles <ChevronRight className="inline h-4 w-4" />
                            </Link>
                          </div>
                        </li>
                      ))}
                    </ul>
                    {/* Botón "Ver Todas" para cada rubro */}
                    <div className="mt-4 text-right">
                      <Link
                        href={`/licitaciones/rubro/${rubroData.rubro.toLowerCase()}`}
                        className="text-[#1b293f] hover:underline font-semibold"
                      >
                        Ver Todas <ChevronRight className="inline h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
