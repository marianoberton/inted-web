'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building,
  Briefcase,
  PenLine,
  Ruler,
  Hammer,
  HardHat,
  Home,
  Layers,
} from 'lucide-react'

const Icons = {
  Building,
  Briefcase,
  PenLine,
  Ruler,
  Hammer,
  HardHat,
  Home,
  Layers,
}

const services = [
  {
    icon: 'Briefcase',
    title: "Análisis de Factibilidad del Proyecto Constructivo",
    content:
      "Análisis integral de aspectos morfológicos e interiorismo del anteproyecto, evaluación de usos requeridos, verificación de disposiciones del Código Urbanístico y de Edificación, informe de factibilidad de proyecto constructivo.",
  },
  {
    icon: 'PenLine',
    title: "Plano de Etapa de Proyecto y Permiso de Obra Civil",
    content:
      "Adecuación de planos de arquitectura al formato municipal, tramitación de informes de dominio y certificados de aptitud ambiental, modificaciones de proyectos, seguimiento continuo del trámite con informes semanales.",
  },
  {
    icon: 'Building',
    title: "Planos de Instalaciones (Incendios, Sanitaria, Eléctrica, Ventilación, Mecánica/Electromecánica)",
    content:
      "Adecuación de los planos de instalaciones al formato municipal, tramitación de informes de dominio y certificados de aptitud ambiental, seguimiento continuo del trámite e informes de subsanaciones, conforme de obra de instalaciones.",
  },
  {
    icon: 'Ruler',
    title: "Plano de Mensura y Unificación Parcelaria",
    content:
      "Adecuación del plano a formato municipal, tramitación de informes de dominio, informe de subsanaciones y adecuaciones correspondientes, seguimiento continuo del trámite con informes de situación semanal.",
  },
  {
    icon: 'Hammer',
    title: "Plano de Demolición",
    content:
      "Elaboración del plano de demolición con antecedentes de cada parcela, mediciones correspondientes, adecuación del plano a formato municipal, seguimiento del trámite e informes de subsanaciones.",
  },
  {
    icon: 'HardHat',
    title: "Portal Director de Obra",
    content:
      "Gestión de trámites de solicitud de excavaciones, demoliciones, alta de obra, cartel de obra, AVO 1, 2 y 3, seguimiento continuo del trámite con informes semanales",
  },
  {
    icon: 'Home',
    title: "Conforme a Obra (AVO 4)",
    content:
      "Adecuación de planos de arquitectura de obra ejecutada a formato municipal, tramitación de informes de dominio y certificados de aptitud ambiental, regularización de obra en contravención y ajuste de obra, seguimiento continuo del trámite con reportes semanales.",
  },
  {
    icon: 'Layers',
    title: "División en Propiedad Horizontal (MH)",
    content:
      "Adecuación del plano a formato municipal, tramitación de informes de dominio, tramitación ante registro de la propiedad inmueble, seguimiento del trámite e informes de subsanaciones.",
  },
]

export default function CircularServiceShowcase() {
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
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  const getIconPosition = (index) => {
    const totalItems = services.length
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
        {services.map((service, index) => {
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
                {services[currentIndex].title}
              </h3>
              {!isMobile && (
                <p className="text-sm">
                  {services[currentIndex].content}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
