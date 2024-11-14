"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cog, CheckSquare, FileText, MapPin, Building2, HardHat, Shield, Home, Layers } from 'lucide-react'

const Icons = {
  Cog,
  CheckSquare,
  FileText,
  MapPin,
  Building2,
  HardHat,
  Shield,
  Home,
  Layers,
}

const services = [
  {
    icon: 'Cog',
    title: "Asesoramiento Técnico",
    content:
      "Nuestro Estudio cuenta con profesionales especializados en la puesta en código de los proyectos y/o finales de obra e instalaciones, realizando estudios de factibilidad de construcción previos a la compra del terreno, o asesoramiento técnico en la etapa del proyecto y/o final, verificando e investigando en las reparticiones del G.C.B.A. las posibles restricciones o el mejor desarrollo de las propuestas.",
  },
  {
    icon: 'CheckSquare',
    title: "Análisis de Factibilidad del Proyecto Constructivo",
    content:
      "Análisis integral de aspectos morfológicos e interiorismo, evaluación de usos requeridos, verificación de disposiciones del Código Urbanístico y de Edificación. Informe de factibilidad del proyecto constructivo y análisis integral del anteproyecto desde el punto de vista morfológico, de interiorismo y de usos requeridos, conforme al Código Urbanístico y de Edificación.",
  },
  {
    icon: 'MapPin',
    title: "Plano de Mensura y Unificación",
    content:
      "Adecuación del plano a formato municipal, tramitación de informes de dominio y seguimiento del trámite con informes semanales. Informe de subsanaciones y adecuaciones correspondientes, seguimiento continuo del trámite con informes de situación semanal para mantener al cliente informado.",
  },
  {
    icon: 'Building2',
    title: "Plano de Demolición",
    content:
      "Elaboración del plano de demolición con antecedentes de cada parcela, mediciones correspondientes (si se requieren), adecuación del plano a formato municipal. Seguimiento del trámite e informes de subsanaciones, gestoría de la totalidad del trámite y mediciones garantizadas con acceso al inmueble.",
  },
  {
    icon: 'FileText',
    title: "Plano de Etapa de Proyecto y Permiso de Obra Civil",
    content:
      "Adecuación de planos de instalaciones al formato municipal, tramitación de informes de dominio, seguimiento del trámite e informes de subsanaciones. Gestión de planos de instalaciones (incendios, sanitaria, eléctrica, etc.) y gestoría de la totalidad de los trámites para adecuación y permisos.",
  },
  {
    icon: 'HardHat',
    title: "Pedidos de Excavaciones y AVO",
    content:
      "Gestión de la totalidad de los trámites de excavaciones, solicitud de AVO (Alta de Obra y Ejecución en TAD). Seguimiento del trámite y reportes semanales, gestión completa de la documentación y seguimiento continuo.",
  },
  {
    icon: 'Shield',
    title: "Conforme a Obra (AVO 4)",
    content:
      "Regularización de obra en contravención o ajuste de obra, adecuación de planos de arquitectura de obra ejecutada, tramitación de informes de dominio. Seguimiento del trámite y reportes semanales, gestoría completa para la regularización de obra conforme a la normativa vigente.",
  },
  {
    icon: 'Home',
    title: "Inicio y Final de Demolición",
    content:
      "Adecuación del plano de arquitectura a formato municipal, modificaciones de proyecto, tramitación de informes de dominio y certificado de aptitud ambiental. Seguimiento del trámite con informes semanales, gestoría integral de los trámites de inicio y final de demolición.",
  },
  {
    icon: 'Layers',
    title: "División en Propiedad Horizontal (MH)",
    content:
      "Adecuación del plano a formato municipal, tramitación de informes de dominio, seguimiento del trámite e informes de subsanaciones. Gestoría completa de la división y adecuación del plano.",
  },
  {
    icon: 'FileText',
    title: "Planos de Instalaciones (Incendios, Sanitaria, Eléctrica, etc.)",
    content:
      "Adecuación de los planos de instalaciones al formato municipal, tramitación de informes de dominio, seguimiento del trámite e informes de subsanaciones. Gestión de planos de instalaciones específicos y adecuación normativa.",
  },
]

export default function CircularServiceShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(interval)
  }, [])

  const handleIconClick = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative container mx-auto py-16 flex flex-col items-center">
      {/* Título principal en color visible */}
      <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">Nuestros Servicios</h2>

      {/* Línea vertical superior */}
      <div className="h-24 w-0.5 bg-gray-300 mb-8"></div>
      
      <div className="relative w-[640px] h-[640px] flex items-center justify-center">
        {/* Navegación Circular */}
        <div className="absolute inset-0 rounded-full border-2 border-gray-300"></div>
        {services.map((service, index) => {
          const angle = (index / services.length) * 2 * Math.PI - Math.PI / 2
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
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">{services[currentIndex].title}</h3>
              <p className="text-muted-foreground">{services[currentIndex].content}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Línea vertical inferior */}
      <div className="h-24 w-0.5 bg-gray-300 mt-8"></div>
    </div>
  )
}
