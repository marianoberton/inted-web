'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cog, ClipboardCheck, MapPin, HardHat, Building2, Layers, Shield, Home, FileText, Zap } from 'lucide-react'

const Icons = {
  Cog,
  ClipboardCheck,
  MapPin,
  HardHat,
  Building2,
  Layers,
  Shield,
  Home,
  FileText,
  Zap,
}

const services = [
  {
    icon: 'Cog',
    title: "Asesoramiento Técnico",
    content:
      "Nuestro Estudio cuenta con profesionales especializados en la puesta en código de los proyectos y/o finales de obra e instalaciones...",
  },
  {
    icon: 'ClipboardCheck',
    title: "Análisis de Factibilidad del Proyecto Constructivo",
    content:
      "Análisis integral de aspectos morfológicos e interiorismo, evaluación de usos requeridos...",
  },
  {
    icon: 'MapPin',
    title: "Plano de Mensura y Unificación",
    content:
      "Adecuación del plano a formato municipal, tramitación de informes de dominio y seguimiento del trámite...",
  },
  {
    icon: 'HardHat',
    title: "Plano de Demolición",
    content:
      "Elaboración del plano de demolición con antecedentes de cada parcela...",
  },
  {
    icon: 'Building2',
    title: "Plano de Etapa de Proyecto y Permiso de Obra Civil",
    content:
      "Adecuación de planos de instalaciones al formato municipal, tramitación de informes de dominio...",
  },
  {
    icon: 'Layers',
    title: "Pedidos de Excavaciones y AVO",
    content:
      "Gestión de la totalidad de los trámites de excavaciones, solicitud de AVO (Alta de Obra y Ejecución en TAD)...",
  },
  {
    icon: 'Shield',
    title: "Conforme a Obra (AVO 4)",
    content:
      "Regularización de obra en contravención o ajuste de obra, adecuación de planos de arquitectura...",
  },
  {
    icon: 'Home',
    title: "Inicio y Final de Demolición",
    content:
      "Adecuación del plano de arquitectura a formato municipal, modificaciones de proyecto...",
  },
  {
    icon: 'FileText',
    title: "División en Propiedad Horizontal (MH)",
    content:
      "Adecuación del plano a formato municipal, tramitación de informes de dominio...",
  },
  {
    icon: 'Zap',
    title: "Planos de Instalaciones (Incendios, Sanitaria, Eléctrica, etc.)",
    content:
      "Adecuación de los planos de instalaciones al formato municipal, tramitación de informes...",
  },
]

export default function CircularServiceShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  const handleIconClick = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative container mx-auto py-16 flex flex-col items-center bg-gradient-to-b from-gray-50 to-white">
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Nuestros Servicios</h2>
      
      <div
        className="relative w-full max-w-[640px] h-[640px] flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute inset-0 rounded-full border-2 border-gray-200"></div>
        <div className="absolute inset-[20px] rounded-full border border-gray-100"></div>

        {services.map((service, index) => {
          const angle = (index / services.length) * 2 * Math.PI - Math.PI / 2
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
              <h3 className="text-xl font-semibold mb-2 md:mb-4">{services[currentIndex].title}</h3>
              <p className="hidden md:block text-sm">{services[currentIndex].content}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
