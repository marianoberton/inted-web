"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ClipboardList, Edit, Gavel, CheckCircle2, Layers, Briefcase, ClipboardCheck, TrendingUp, DollarSign } from 'lucide-react'

const Icons = {
  FileText,
  ClipboardList,
  Edit,
  Gavel,
  CheckCircle2,
  Layers,
  Briefcase,
  ClipboardCheck,
  TrendingUp,
  DollarSign,
}

const licitacionesServices = [
  {
    icon: 'FileText',
    title: "Confección de Documentación Licitatoria",
    content:
      "Elaboración de pliegos de bases y condiciones generales y particulares, especificaciones técnicas, circulares aclaratorias y/o modificatorias, dictámenes de evaluación de ofertas, contratos administrativos y/o comerciales, actas de recepción y certificados de liquidación final.",
  },
  {
    icon: 'ClipboardList',
    title: "Gestión de Procedimientos Licitatorios",
    content:
      "Gestión de invitaciones a potenciales oferentes, análisis de consultas y elaboración de respuestas, gestión del acto de apertura de ofertas, evaluación de ofertas y solicitud de aclaraciones, asesoramiento durante la ejecución contractual.",
  },
  {
    icon: 'Edit',
    title: "Elaboración de Ofertas",
    content:
      "Análisis de pliegos de bases y condiciones licitatorios, inscripción ante registros de proveedores, confección de documentación administrativa, técnica y oferta económica, confección de anteproyectos de obra y memorias descriptivas, análisis de ofertas de competidores y formulación de observaciones.",
  },
  {
    icon: 'Gavel',
    title: "Elaboración de Impugnaciones a Dictámenes de Evaluación de Ofertas",
    content:
      "Asesoría para la elaboración de impugnaciones fundamentadas, evaluación de dictámenes y formulación de objeciones basadas en el análisis detallado de las ofertas.",
  },
  {
    icon: 'TrendingUp',
    title: "Ejecución del Proyecto Licitado",
    content:
      "Confección de cuadros de seguimiento de evolución de índices, presentación de solicitudes de adecuaciones de precios, presentación de documentación requerida por pliegos, y solicitudes de reconocimiento de mayores costos por inversiones adicionales.",
  },
]

export default function LicitacionesServiceShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % licitacionesServices.length)
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  const handleIconClick = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative container mx-auto py-16 flex flex-col items-center">
      {/* Título principal en color visible */}
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Área de Licitaciones</h2>

      {/* Línea vertical superior */}
      <div className="h-24 w-0.5 bg-gray-300 mb-8"></div>
      
      <div className="relative w-[640px] h-[640px] flex items-center justify-center">
        {/* Navegación Circular */}
        <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
        {licitacionesServices.map((service, index) => {
          const angle = (index / licitacionesServices.length) * 2 * Math.PI - Math.PI / 2
          const x = Math.cos(angle) * 300
          const y = Math.sin(angle) * 300
          const Icon = Icons[service.icon]
          return (
            <button
              key={index}
              onClick={() => handleIconClick(index)}
              className={`absolute w-20 h-20 flex items-center justify-center rounded-full transition duration-200 ${
                currentIndex === index 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {Icon && <Icon className="w-10 h-10" />}
            </button>
          )
        })}

        {/* Contenido Central */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="absolute flex flex-col items-center justify-center text-center max-w-md p-6"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">{licitacionesServices[currentIndex].title}</h3>
              <p className="text-muted-foreground">{licitacionesServices[currentIndex].content}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Línea vertical inferior */}
      <div className="h-24 w-0.5 bg-gray-300 mt-8"></div>
    </div>
  )
}
