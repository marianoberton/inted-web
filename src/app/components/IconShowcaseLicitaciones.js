'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ClipboardList, Edit, Gavel, TrendingUp } from 'lucide-react'

const Icons = {
  FileText,
  ClipboardList,
  Edit,
  Gavel,
  TrendingUp,
}

const licitacionesServices = [
  {
    icon: 'FileText',
    title: "Confección de Documentación Licitatoria",
    content: "Elaboración de pliegos de bases y condiciones generales y particulares, especificaciones técnicas, circulares aclaratorias y/o modificatorias, dictámenes de evaluación de ofertas, contratos administrativos y/o comerciales, actas de recepción y certificados de liquidación final.",
  },
  {
    icon: 'ClipboardList',
    title: "Gestión de Procedimientos Licitatorios",
    content: "Gestión de invitaciones a potenciales oferentes, análisis de consultas y elaboración de respuestas, gestión del acto de apertura de ofertas, evaluación de ofertas y solicitud de aclaraciones, asesoramiento durante la ejecución contractual.",
  },
  {
    icon: 'Edit',
    title: "Elaboración de Ofertas",
    content: "Análisis de pliegos de bases y condiciones licitatorios, inscripción ante registros de proveedores, confección de documentación administrativa, técnica y oferta económica, confección de anteproyectos de obra y memorias descriptivas, análisis de ofertas de competidores y formulación de observaciones.",
  },
  {
    icon: 'Gavel',
    title: "Elaboración de Impugnaciones",
    content: "Asesoría para la elaboración de impugnaciones fundamentadas, evaluación de dictámenes y formulación de objeciones basadas en el análisis detallado de las ofertas.",
  },
  {
    icon: 'TrendingUp',
    title: "Ejecución del Proyecto Licitado",
    content: "Confección de cuadros de seguimiento de evolución de índices, presentación de solicitudes de adecuaciones de precios, presentación de documentación requerida por pliegos, y solicitudes de reconocimiento de mayores costos por inversiones adicionales.",
  },
]

export default function LicitacionesServiceShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % licitacionesServices.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  const handleIconClick = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative container mx-auto py-16 flex flex-col items-center bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Área de Licitaciones</h2>
      
      <div
        className="relative w-full max-w-[640px] h-[640px] flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Círculo exterior decorativo */}
        <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
        <div className="absolute inset-[20px] rounded-full border border-gray-100"></div>
        
        {/* Círculos de navegación */}
        {licitacionesServices.map((service, index) => {
          const angle = (index / licitacionesServices.length) * 2 * Math.PI - Math.PI / 2
          const radius = 280
          const x = Math.cos(angle) * radius
          const y = Math.sin(angle) * radius
          const Icon = Icons[service.icon]
          
          return (
            <motion.button
              key={index}
              onClick={() => handleIconClick(index)}
              className={`absolute w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300 ${
                currentIndex === index 
                  ? 'bg-[#1B293F] text-white' 
                  : 'bg-white text-gray-600 hover:bg-[#1B293F] hover:text-white'
              }`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              {Icon && <Icon className="w-8 h-8" />}
            </motion.button>
          )
        })}

        {/* Contenido Central */}
        <div className="absolute inset-[80px] rounded-full bg-[#1B293F] shadow-lg flex items-center justify-center overflow-hidden text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center p-6 max-w-[300px]"
            >
              <h3 className="text-xl font-semibold mb-2 md:mb-4">{licitacionesServices[currentIndex].title}</h3>
              {/* Para desktop muestra título y contenido */}
              <p className="hidden md:block text-sm">{licitacionesServices[currentIndex].content}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
