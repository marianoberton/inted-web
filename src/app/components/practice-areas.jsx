'use client'

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FileText, PenTool, FileCheck, Building, Ruler, Clipboard, ArrowRight } from 'lucide-react'
import { Button } from "./ui/button"

const PracticeArea = ({ title, image, link, services }) => (
  <motion.div
    className="relative overflow-hidden rounded-2xl shadow-2xl group"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative h-96 w-full">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
    </div>
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-300 group-hover:justify-end">
      <h3 className="text-3xl font-bold text-white mb-4 text-center transition-all duration-300 group-hover:mb-8">{title}</h3>
      <AnimatePresence>
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="hidden group-hover:block"
          >
            <ServiceIcon {...service} />
          </motion.div>
        ))}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: services.length * 0.1 }}
        className="hidden group-hover:block mt-6"
      >
        <Link href={link} passHref>
          <Button className="bg-white text-black hover:bg-gray-200 transition-colors duration-300">
            Explorar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </div>
  </motion.div>
)

const ServiceIcon = ({ icon: Icon, title }) => (
  <div className="flex items-center text-white mb-3">
    <div className="bg-white/20 p-2 rounded-full mr-3">
      {Icon && <Icon className="w-5 h-5" />}
    </div>
    <span className="text-sm">{title}</span>
  </div>
)

export default function PracticeAreas() {
  const practiceAreas = [
    {
      title: "Licitaciones Públicas y/o Privadas",
      image: "/images/1678385453066.jpg",
      link: "/consultoria-licitaciones",
      services: [
        { icon: FileText, title: "Confección de Documentación Licitatoria" },
        { icon: PenTool, title: "Gestión de Procedimientos Licitatorios" },
        { icon: FileCheck, title: "Elaboración de Ofertas" }
      ]
    },
    {
      title: "Desarrollo de Proyectos Constructivos",
      image: "/images/pexels-photo-3525541.jpeg",
      link: "/proyectos-constructivos",
      services: [
        { icon: Building, title: "Análisis de Factibilidad del Proyecto Constructivo" },
        { icon: Ruler, title: "Plano de Mensura y Unificación" },
        { icon: Clipboard, title: "Plano de Demolición" }
      ]
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Áreas de Práctica
        </motion.h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {practiceAreas.map((area, index) => (
            <PracticeArea key={index} {...area} />
          ))}
        </div>
      </div>
    </section>
  )
}