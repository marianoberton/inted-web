"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, PenTool, FileCheck, Building, Briefcase, HardHat, Ruler, Clipboard, ArrowRight, Home } from 'lucide-react';
import { Button } from "../components/ui/button";


// Servicios de cada categoría
const servicios = [
  {
    title: "Consultoría en Licitaciones Públicas y/o Privadas",
    description: "Nuestro asesoramiento abarca todas las etapas de una licitación pública y/o privada, desde la confección de la documentación licitatoria hasta la ejecución del proyecto adjudicado.",
    items: [
      {
        icon: FileText,
        title: "Confección de Documentación Licitatoria",
        details: [
          "Pliegos de Bases y Condiciones Generales y Particulares",
          "Especificaciones Técnicas",
          "Circulares aclaratorias y/o modificatorias",
          "Dictámenes de Evaluación de Ofertas",
          "Contratos Administrativos y/o Comerciales",
          "Actas de Recepción y Certificados de Liquidación Final"
        ]
      },
      {
        icon: PenTool,
        title: "Gestión de Procedimientos Licitatorios",
        details: [
          "Gestión de invitaciones a potenciales oferentes",
          "Análisis de consultas y elaboración de respuestas",
          "Gestión del Acto de Apertura de Ofertas",
          "Evaluación de Ofertas y solicitud de aclaraciones",
          "Asesoramiento durante la ejecución contractual"
        ]
      },
      {
        icon: FileCheck,
        title: "Elaboración de Ofertas",
        details: [
          "Análisis de Pliegos de Bases y Condiciones Licitatorios",
          "Inscripción ante Registros de Proveedores",
          "Confección de documentación administrativa, técnica y oferta económica",
          "Confección de Anteproyectos de Obra y Memorias descriptivas",
          "Análisis de ofertas de competidores y formulación de observaciones",
          "Elaboración de Impugnaciones a Dictámenes de Evaluación de Ofertas"
        ]
      },
      {
        icon: HardHat,
        title: "Ejecución del Proyecto Licitado",
        details: [
          "Confección de cuadros de seguimiento de evolución de índices",
          "Presentación de solicitudes de Adecuaciones de Precios",
          "Presentación de documentación requerida por Pliegos",
          "Solicitudes de reconocimiento de mayores costos por inversiones adicionales"
        ]
      }
    ]
  },
  {
    title: "Consultoría en Desarrollo de Proyectos Constructivos",
    description: "Asesoramiento integral en la gestoría de trámites requeridos para la realización de proyectos constructivos, incluyendo planos de mensura, demolición, permisos de obra civil, entre otros.",
    items: [
      {
        icon: Building,
        title: "Análisis de Factibilidad del Proyecto Constructivo",
        details: [
          "Análisis integral de aspectos morfológicos e interiorismo",
          "Evaluación de usos requeridos",
          "Verificación de disposiciones del Código Urbanístico y de Edificación",
          "Informe de factibilidad de proyecto constructivo"
        ]
      },
      {
        icon: Ruler,
        title: "Plano de Mensura y Unificación",
        details: [
          "Adecuación del plano a formato municipal",
          "Tramitación de informes de dominio",
          "Seguimiento del trámite con informes semanales",
          "Informe de subsanaciones y adecuaciones correspondientes"
        ]
      },
      {
        icon: Clipboard,
        title: "Plano de Demolición",
        details: [
          "Elaboración del plano de demolición con antecedentes de cada parcela",
          "Mediciones correspondientes (si se requieren)",
          "Adecuación del plano a formato municipal",
          "Seguimiento del trámite e informes de subsanaciones"
        ]
      },
      {
        icon: Briefcase,
        title: "Plano de Etapa de Proyecto y Permiso de Obra Civil",
        details: [
          "Adecuación de planos de instalaciones al formato municipal",
          "Tramitación de informes de dominio",
          "Seguimiento del trámite e informes de subsanaciones",
          "Gestión de planos de instalaciones (incendios, sanitaria, eléctrica, etc.)"
        ]
      },
      {
        icon: HardHat,
        title: "Pedidos de Excavaciones y AVO",
        details: [
          "Gestión de la totalidad de los trámites de excavaciones",
          "Solicitud de AVO (Alta de Obra y Ejecución en TAD)",
          "Seguimiento del trámite y reportes semanales"
        ]
      },
      {
        icon: Home,
        title: "Conforme a Obra (AVO 4)",
        details: [
          "Regularización de Obra en Contravención / Ajuste de Obra",
          "Adecuación de planos de arquitectura de obra ejecutada",
          "Tramitación de informes de dominio",
          "Seguimiento del trámite y reportes semanales"
        ]
      },
      {
        icon: FileText,
        title: "Inicio y Final de Demolición",
        details: [
          "Adecuación del plano de arquitectura a formato municipal",
          "Modificaciones de proyecto",
          "Tramitación de informes de dominio y certificado de aptitud ambiental",
          "Seguimiento del trámite con informes semanales"
        ]
      },
      {
        icon: Clipboard,
        title: "División en Propiedad Horizontal (MH)",
        details: [
          "Adecuación del plano a formato municipal",
          "Tramitación de informes de dominio",
          "Seguimiento del trámite e informes de subsanaciones"
        ]
      },
      {
        icon: FileCheck,
        title: "Planos de Instalaciones (Incendios, Sanitaria, Eléctrica, etc.)",
        details: [
          "Adecuación de los planos de instalaciones al formato municipal",
          "Tramitación de informes de dominio",
          "Seguimiento del trámite e informes de subsanaciones",
          "Gestión de planos de instalaciones específicos"
        ]
      }
    ]
  }
];


// Componente para encabezado de cada categoría
const ServiceHeader = ({ title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mb-12 text-center"
  >
    <h2 className="text-4xl font-bold text-[#1b293f] mb-4">{title}</h2>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto">{description}</p>
  </motion.div>
);

// Componente para cada sección de servicios
const ServiceSection = ({ title, description, items }) => (
  <motion.section
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mb-16"
  >
    <ServiceHeader title={title} description={description} />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {items.map((item, index) => {
        const IconComponent = item.icon;

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center mb-4">
              <div className="bg-[#1b293f] p-3 rounded-full mr-4">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1b293f]">{item.title}</h3>
            </div>
            <ul className="space-y-2">
              {item.details.map((detail, idx) => (
                <li key={idx} className="flex items-start">
                  <ArrowRight className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{detail}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        );
      })}
    </div>
  </motion.section>
);

// Componente de Resumen de Servicios
const ServiceOverview = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    className="max-w-5xl mx-auto text-center my-16"
  >
    <h2 className="text-3xl font-bold text-[#1b293f] mb-6">Resumen de Nuestros Servicios</h2>
    <p className="text-lg text-gray-700">
      Ofrecemos una amplia gama de servicios tanto en el ámbito de las licitaciones públicas y privadas como en la gestoría de proyectos constructivos. Acompañamos a nuestros clientes en cada paso del proceso, asegurando una gestión eficiente y el cumplimiento de la normativa vigente.
    </p>
  </motion.div>
);

// Página de Servicios
export default function Servicios() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-[#1b293f] text-white py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Nuestros Servicios</h1>
          <p className="text-xl sm:text-2xl mb-8">Soluciones integrales en licitaciones y gestoría para proyectos constructivos</p>
        </div>
      </motion.div>

      {/* Overview Section */}
      <ServiceOverview />

      {/* Main Services Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {servicios.map((seccion, index) => (
          <ServiceSection key={index} {...seccion} />
        ))}
      </div>

      {/* Call to Action Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#1b293f] py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Listo para impulsar su próximo proyecto?</h2>
          <p className="text-xl text-gray-300 mb-8">Contáctenos hoy y descubra cómo podemos ayudarlo a alcanzar el éxito en sus licitaciones y proyectos constructivos.</p>
          <Button className="bg-white text-[#1b293f] hover:bg-gray-200 transition-colors duration-200">
            Solicitar una Consulta Gratuita
          </Button>
          <Button variant="outline" className="ml-4 border-white text-white hover:bg-white hover:text-[#1b293f] transition-colors duration-200">
            Más Información
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
