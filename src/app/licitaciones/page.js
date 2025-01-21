"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, DollarSign, Briefcase, Tag } from 'lucide-react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

export default function LicitacionesPage() {
  const [licitaciones, setLicitaciones] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroTipoContratacion, setFiltroTipoContratacion] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');

  const fechaReferencia = new Date("2024-11-01");

  const parseMonto = (montoStr) => {
    if (!montoStr || typeof montoStr !== "string") return "No disponible";
  
    try {
      let montoClean = montoStr.replace(/[^0-9,.-]/g, "").trim();
      montoClean = montoClean.replace(/\./g, "");
      montoClean = montoClean.replace(/,/g, ".");
      const monto = parseFloat(montoClean);
      return isNaN(monto) ? "No disponible" : monto;
    } catch (error) {
      console.error("Error al procesar el monto:", error);
      return "No disponible";
    }
  };
  
  

  const parseFecha = (fechaStr) => {
    if (!fechaStr) return "Fecha no disponible";
    const [datePart] = fechaStr.split(" ");
    const [day, month, year] = datePart.split("/");
    return `${day}/${month}/${year}`;
  };

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const fetchLicitaciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "procesos-bac-dashboard"));
        const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
        const licitacionesData = documents
          .filter((doc) => doc.categoria_general && doc.categoria_general !== "Sin Clasificación")
          .map((doc) => {
            let nombreProceso = "Nombre no disponible";
            let monto = 0;
            let tipoContratacion = "Sin Tipo de Contratación";
            let fechaApertura = "Fecha no disponible";
  
            try {
              const informacionBasica = JSON.parse(doc.informacion_basica || "{}");
              nombreProceso = informacionBasica.nombre_proceso
                ? toTitleCase(informacionBasica.nombre_proceso)
                : "Nombre no disponible";
              tipoContratacion = informacionBasica.procedimiento_seleccion || "Sin Tipo de Contratación";
            } catch (error) {
              console.error("Error al parsear informacion_basica:", error);
            }
  
            try {
              const montoDuracion = JSON.parse(doc.monto_duracion || "{}");
              console.log("Monto duracion original:", montoDuracion.monto);

              monto = parseMonto(montoDuracion.monto);
              console.log("Monto procesado:", monto);

            } catch (error) {
              console.error("Error al parsear monto_duracion:", error);
            }
  
            try {
              const cronograma = JSON.parse(doc.cronograma || "{}");
              if (cronograma.fecha_acto_apertura) {
                console.log("Fecha acto apertura original:", cronograma.fecha_acto_apertura);
                // Dividir fecha y hora
                const [datePart, timePart] = cronograma.fecha_acto_apertura.split(" ");
                let [day, month, year] = datePart.split("/");
            
                // Normalizar a dos dígitos
                day = day.padStart(2, "0");
                month = month.padStart(2, "0");
            
                // Crear fecha en formato ISO
                const formattedDate = `${year}-${month}-${day}T${timePart}`;
                console.log("Fecha formateada:", formattedDate);
            
                const dateObj = new Date(formattedDate);
                if (isNaN(dateObj.getTime())) {
                  console.warn("Fecha no válida procesada:", formattedDate);
                  fechaApertura = "Fecha no disponible";
                } else {
                  fechaApertura = dateObj;
                }
              }
            } catch (error) {
              console.error("Error al procesar cronograma:", error);
            }
            
  
            return {
              id: doc.id,
              nombre: nombreProceso,
              categoria: doc.categoria_general,
              tipoContratacion,
              fechaApertura,
              monto,
              estado: doc.estado || "Sin Estado",
            };
          });
  
        // Filtrar por fecha igual o posterior al día de hoy
        const today = new Date();
        const filteredLicitaciones = licitacionesData.filter((licitacion) => {
          return licitacion.fechaApertura instanceof Date && licitacion.fechaApertura >= today;
        });

        // Ordenar por fecha (más reciente primero)
        filteredLicitaciones.sort((a, b) => b.fechaApertura - a.fechaApertura);


  
        // Convertir fechas a formato legible después de ordenar
        const formattedLicitaciones = filteredLicitaciones.map((licitacion) => ({
          ...licitacion,
          fechaApertura: licitacion.fechaApertura instanceof Date
            ? licitacion.fechaApertura.toLocaleDateString("es-AR")
            : licitacion.fechaApertura,
        }));
  
        setLicitaciones(formattedLicitaciones);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchLicitaciones();
  }, []);
  
  
  
  
  

  const filtrarLicitaciones = () => {
    return licitaciones.filter((licitacion) => {
      const categoriaCoincide = filtroCategoria ? licitacion.categoria === filtroCategoria : true;
      const tipoContratacionCoincide = filtroTipoContratacion ? licitacion.tipoContratacion === filtroTipoContratacion : true;
      const nombreCoincide = filtroNombre
        ? licitacion.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
        : true;
  
      // Eliminar la validación de fechas
      return categoriaCoincide && tipoContratacionCoincide && nombreCoincide;
    });
  };
  

  const licitacionesFiltradas = filtrarLicitaciones();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-32 pb-16">
      <div className="container mx-auto px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-[#1b293f] mb-6 text-center"
        >
          Próximas Licitaciones
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-center text-gray-600 mb-12"
        >
          
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-semibold text-[#1b293f] mb-6">Filtros de Búsqueda</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                id="categoria"
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="w-full px-4 py-2 rounded-md shadow-sm text-[#1b293f] bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1b293f]"
              >
                <option value="">Todas las categorías</option>
                {[...new Set(licitaciones.map((data) => data.categoria))].map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="tipoContratacion" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Contratación</label>
              <select
                id="tipoContratacion"
                value={filtroTipoContratacion}
                onChange={(e) => setFiltroTipoContratacion(e.target.value)}
                className="w-full px-4 py-2 rounded-md shadow-sm text-[#1b293f] bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1b293f]"
              >
                <option value="">Todos los tipos</option>
                {[...new Set(licitaciones.map((data) => data.tipoContratacion))].map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Buscar por nombre</label>
              <div className="relative">
                <input
                  id="nombre"
                  type="text"
                  value={filtroNombre}
                  onChange={(e) => setFiltroNombre(e.target.value)}
                  placeholder="Nombre de la licitación"
                  className="w-full px-4 py-2 rounded-md shadow-sm text-[#1b293f] bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1b293f] pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {licitacionesFiltradas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {licitacionesFiltradas.map((licitacion, index) => (
                <motion.div
                  key={licitacion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-[#1b293f] mb-2">{licitacion.nombre}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Tag size={16} className="mr-2" />
                      <span className="text-sm">{licitacion.categoria}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Briefcase size={16} className="mr-2" />
                      <span className="text-sm">{licitacion.tipoContratacion}</span>
                    </div>
                  </div>
                  <div className="p-6 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center text-gray-600">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">Fecha de apertura: {licitacion.fechaApertura}</span>
                    </div>

                      <div className="flex items-center text-gray-600">
                        <DollarSign size={16} className="mr-2" />
                        <span className="text-sm font-semibold">
                          {licitacion.monto === "No disponible"
                            ? "No disponible"
                            : licitacion.monto.toLocaleString("es-AR")}
                        </span>
                      </div>

                    </div>
                  </div>

                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-xl">No se encontraron licitaciones para los filtros seleccionados.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}

