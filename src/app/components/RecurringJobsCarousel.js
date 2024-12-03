'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const carouselItems = [
  {
    title: 'Contrataciones',
    items: ['Convenio marco', 'Concesiones', 'Obra pública', 'Servicios y suministros'],
    image: '/images/biblioratos1.jpeg',
    description: 'Nos encargamos de la gestión integral de contratos y licitaciones para servicios públicos y privados'
  },
  {
    title: 'Locales gastronómicos y comerciales',
    image: '/images/locales_comerciales.jpeg',
    description: 'Logramos la habilitacion de distintos locales gastronomicos y comerciales'
  },
  {
    title: 'Oficinas comerciales',
    image: '/images/oficina.jpeg',
    description: 'Nos encargamos de la gestión integral de proyectos de oficinas'
  },
  {
    title: 'Predios Deportivos',
    image: '/images/predios.jpeg',
    description: 'Participamos en procesos donde se logro la adjudicación de predios'
  },
  {
    title: 'Edificios de Vivienda',
    image: '/images/viviendas.jpeg',
    description: 'Lideramos proyectos desde su planificacion hasta su ejecución'
  },
  {
    title: 'Servicios de Limpieza y Mantenimiento',
    image: '/images/limpieza.jpeg',
    description: 'Logramos la adjudicación de licitaciones del servicio de Limpieza y Mantenimiento'
  }
]

const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute z-10 top-1/2 -translate-y-1/2 ${
      direction === 'left' ? 'left-4' : 'right-4'
    } bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110`}
    aria-label={direction === 'left' ? 'Anterior' : 'Siguiente'}
  >
    {direction === 'left' ? (
      <ChevronLeft className="w-6 h-6 text-[#1b293f]" />
    ) : (
      <ChevronRight className="w-6 h-6 text-[#1b293f]" />
    )}
  </button>
)

const RecurringJobsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (_, next) => setCurrentSlide(next),
    prevArrow: <CustomArrow direction="left" />,
    nextArrow: <CustomArrow direction="right" />,
    appendDots: dots => (
      <div className="bottom-5">
        <ul className="m-0 flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <button
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          i === currentSlide
            ? 'bg-white scale-125'
            : 'bg-white/50 hover:bg-white/70'
        }`}
      />
    ),
  }

  return (
    <div className="relative bg-gradient-to-b from-white to-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-12 text-center text-[#1b293f]"
        >
          Trabajos Recurrentes
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        >
          Experiencia comprobada en soluciones integrales para cada sector
        </motion.p>
        
        <div className="relative group">
          <Slider {...settings}>
            {carouselItems.map((item, index) => (
              <div key={index} className="outline-none px-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gray-200"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1b293f]/70 via-[#1b293f]/30 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-xl"
                      >
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                          {item.title}
                        </h3>
                        <p className="text-white/90 text-base mb-6">
                          {item.description}
                        </p>
                        {item.items && (
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {item.items.map((subItem, subIndex) => (
                              <li 
                                key={subIndex}
                                className="text-white/80 flex items-center space-x-2"
                              >
                                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                                <span>{subItem}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default RecurringJobsCarousel
