"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

export default function LicitacionesPage() {
  const [licitaciones, setLicitaciones] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroTipoContratacion, setFiltroTipoContratacion] = useState('');
  const [filtroNombre, setFiltroNombre] = useState('');

  // Fecha de referencia para excluir licitaciones con estado "En curso/Terminada"
  const fechaReferencia = new Date("2024-11-01");

  // Función para procesar el monto en un número
  const parseMonto = (montoStr) => {
    if (!montoStr || typeof montoStr !== "string") return 0;
    let montoClean = montoStr.replace(/[^\d.,-]/g, "").trim();
    montoClean = montoClean.replace(/\./g, "");
    montoClean = montoClean.replace(/,/g, ".");
    const monto = parseFloat(montoClean);
    return isNaN(monto) ? 0 : monto;
  };

  // Función para procesar la fecha
  const parseFecha = (fechaStr) => {
    if (!fechaStr) return "Fecha no disponible";
    const [datePart] = fechaStr.split(" ");
    const [day, month, year] = datePart.split("/");
    return `${day}/${month}/${year}`;
  };

  // Función para convertir a formato Title Case
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
              monto = parseMonto(montoDuracion.monto);
            } catch (error) {
              console.error("Error al parsear monto_duracion:", error);
            }

            const fechaApertura = parseFecha(doc.cronograma ? JSON.parse(doc.cronograma).fecha_publicacion : "");

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

        setLicitaciones(licitacionesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLicitaciones();
  }, []);

  // Filtrado de licitaciones basado en los filtros seleccionados
  const filtrarLicitaciones = () => {
    return licitaciones.filter((licitacion) => {
      const categoriaCoincide = filtroCategoria ? licitacion.categoria === filtroCategoria : true;
      const tipoContratacionCoincide = filtroTipoContratacion ? licitacion.tipoContratacion === filtroTipoContratacion : true;
      const nombreCoincide = filtroNombre
        ? licitacion.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
        : true;
      return (
        licitacion.estado !== "En curso/Terminada" &&
        new Date(licitacion.fechaApertura.split("/").reverse().join("-")) >= fechaReferencia &&
        categoriaCoincide &&
        tipoContratacionCoincide &&
        nombreCoincide
      );
    });
  };

  const licitacionesFiltradas = filtrarLicitaciones();

  return (
    <div className="bg-gray-100 pt-[calc(80px+2rem)] pb-16">
      <div className="container mx-auto px-4">
        {/* Título */}
        <h1 className="text-4xl font-bold text-[#1b293f] mb-8 text-center">Próximas Licitaciones (datos 1/11/2024)</h1>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center mb-8 space-x-4">
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="px-4 py-2 rounded shadow text-[#1b293f] bg-white border border-gray-300"
          >
            <option value="">Filtrar por Categoría</option>
            {[...new Set(licitaciones.map((data) => data.categoria))].map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
          <select
            value={filtroTipoContratacion}
            onChange={(e) => setFiltroTipoContratacion(e.target.value)}
            className="px-4 py-2 rounded shadow text-[#1b293f] bg-white border border-gray-300"
          >
            <option value="">Filtrar por Tipo de Contratación</option>
            {[...new Set(licitaciones.map((data) => data.tipoContratacion))].map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            placeholder="Buscar por nombre"
            className="px-4 py-2 rounded shadow text-[#1b293f] bg-white border border-gray-300"
          />
        </div>

        {/* Contenido */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {licitacionesFiltradas.length > 0 ? (
              licitacionesFiltradas.map((licitacion) => (
                <div key={licitacion.id} className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-bold text-[#1b293f] mb-2">{licitacion.nombre}</h2>
                  <p className="text-sm text-gray-600">Categoría: {licitacion.categoria}</p>
                  <p className="text-sm text-gray-600">Tipo de Contratación: {licitacion.tipoContratacion}</p>
                  <p className="text-sm text-gray-600">Apertura: {licitacion.fechaApertura}</p>
                  <p className="text-sm text-gray-600">Monto: ${licitacion.monto.toLocaleString("es-AR")}</p>                  
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600 col-span-full">No se encontraron licitaciones para los filtros seleccionados.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
