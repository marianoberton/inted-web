'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, PenTool, FileCheck, HardHat, FileEdit, Briefcase, ClipboardList } from 'lucide-react'

const Icons = {
  FileText,
  PenTool,
  FileCheck,
  HardHat,
  FileEdit,
  Briefcase,
  ClipboardList,
}

const licitacionesServices = [  
  {
    icon: 'FileEdit',
    title: "Elaboración de Ofertas e Impugnaciones",
    content:
      "Análisis de pliegos de bases y condiciones licitatorios, inscripción ante Registros de Proveedores, confección de documentación administrativa, técnica y oferta económica, confección de anteproyectos de obra y memorias descriptivas, análisis de ofertas de competidores y formulación de observaciones, elaboración de impugnaciones a dictámenes de evaluación de ofertas.",
  },
  {
    icon: 'Briefcase',
    title: "Ejecución del Proyecto Licitado",
    content:
      "Confección de cuadros de seguimiento de evolución de índices, presentación de solicitudes de adecuaciones de precios, presentación de documentación requerida por pliegos, solicitudes de reconocimiento de mayores costos por inversiones adicionales, representación técnica y administrativa ante los organismos correspondientes.",
  },
  {
    icon: 'FileText',
    title: "Confección de Documentación Licitatoria",
    content:
      "Pliegos de bases y condiciones generales y particulares, especificaciones técnicas, circulares aclaratorias y/o modificatorias, dictámenes de evaluación de ofertas, contratos administrativos y/o comerciales, actas de recepción y certificados de liquidación final.",
  },
  {
    icon: 'ClipboardList',
    title: "Gestión de Procedimientos Licitatorios",
    content:
      "Gestión de invitaciones a potenciales oferentes, análisis de consultas y elaboración de respuestas, gestión del acto de apertura de ofertas, evaluación de ofertas y solicitud de aclaraciones, asesoramiento durante la ejecución contractual.",
  },
]

export default function LicitacionesServiceShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % licitacionesServices.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  const getIconPosition = (index) => {
    const totalItems = licitacionesServices.length
    const angle = (index / totalItems) * 2 * Math.PI - Math.PI / 2
    const radius = isMobile ? 140 : 280
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    }
  }

  return (
    <div className="relative container mx-auto py-16 flex flex-col items-center bg-gradient-to-b from-gray-50 to-white px-4">
      <h2 className="text-4xl font-bold mb-12 text-center text-[#1b293f]">Nuestros Servicios</h2>
      
      <div
        className={`relative flex items-center justify-center ${
          isMobile ? 'w-[300px] h-[300px]' : 'w-[640px] h-[640px]'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Círculo exterior decorativo */}
        <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
        <div className="absolute inset-[20px] rounded-full border border-gray-100"></div>
        
        {/* Círculos de navegación */}
        {licitacionesServices.map((service, index) => {
          const { x, y } = getIconPosition(index)
          const Icon = Icons[service.icon]

          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`absolute flex items-center justify-center rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-[#1B293F] text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-[#1B293F] hover:text-white'
              }`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                width: isMobile ? '42px' : '64px',
                height: isMobile ? '42px' : '64px',
                border: isMobile ? '2px solid #E5E7EB' : 'none',
              }}
            >
              {Icon && (
                <Icon
                  className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} transition-colors`}
                />
              )}
            </button>
          )
        })}

        {/* Contenido Central */}
        <div className={`absolute rounded-full bg-[#1B293F] shadow-lg flex items-center justify-center overflow-hidden text-white ${
          isMobile ? 'inset-[40px]' : 'inset-[80px]'
        }`} style={{ zIndex: 1 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center text-center p-4 md:p-6"
            >
              <h3 className={`${isMobile ? 'text-base' : 'text-xl'} font-semibold mb-2 md:mb-4`}>
                {licitacionesServices[currentIndex].title}
              </h3>
              {!isMobile && (
                <p className="text-sm">
                  {licitacionesServices[currentIndex].content}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
