"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export default function TenderPreview() {
  const [tenderData, setTenderData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

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
    const fetchTenderData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "procesos-bac-dashboard"));
        const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const groupedData = documents.reduce((acc, doc) => {
          const category = doc.categoria_general || "Sin Clasificación";

          // Excluir la categoría "Sin Clasificación"
          if (category === "Sin Clasificación") return acc;

          // Parseo de informacion_basica y monto_duracion
          let nombreProceso = "Nombre no disponible";
          let monto = 0;

          try {
            const informacionBasica = JSON.parse(doc.informacion_basica || "{}");
            nombreProceso = informacionBasica.nombre_proceso
              ? toTitleCase(informacionBasica.nombre_proceso) // Normalizar nombre
              : "Nombre no disponible";
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

          if (!acc[category]) {
            acc[category] = {
              categoria: category,
              descripcion: `Licitaciones en la categoría ${category}`,
              licitaciones: [],
              cantidadTotal: 0,
              montoTotal: 0,
            };
          }

          acc[category].licitaciones.push({
            nombre: nombreProceso,
            fechaApertura,
            monto,
          });

          acc[category].cantidadTotal += 1;
          acc[category].montoTotal += monto;

          return acc;
        }, {});

        setTenderData(Object.values(groupedData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTenderData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const tenderPreviewElement = document.getElementById("tender-preview");
      const elementPosition = tenderPreviewElement.getBoundingClientRect().top;
      const viewportHeight = window.innerHeight;

      if (elementPosition < viewportHeight * 0.75) {
        setHasScrolled(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="tender-preview" className="bg-white py-16">
      <div className="container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-[#1b293f] mb-8 text-center">  Licitaciones Activas</h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            {tenderData.length > 0 && (
              <motion.div
                key={currentCategory}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-50 rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Parte izquierda del componente */}
                  <motion.div
                    className="md:w-1/2 p-6 bg-white"
                    initial={{ x: hasScrolled ? 0 : -200, opacity: hasScrolled ? 1 : 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: hasScrolled ? 0.5 : 1.75, delay: hasScrolled ? 0 : 0.5 }}
                  >
                    <h3 className="text-2xl font-semibold text-[#1b293f] mb-4">
                      {tenderData[currentCategory].categoria}
                    </h3>
                    <p className="text-md text-gray-600 mb-4">
                      {tenderData[currentCategory].descripcion}
                    </p>
                    <p className="text-md text-gray-600">
                      <span className="font-medium">Total de Procesos de Compra:</span> {tenderData[currentCategory].cantidadTotal}
                    </p>
                    <p className="text-md text-gray-600">
                      <span className="font-medium">Monto total de Procesos de Compra:</span> ${tenderData[currentCategory].montoTotal.toLocaleString("es-AR")}
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/licitaciones"
                        className="inline-flex items-center bg-[#1b293f] text-white hover:bg-[#bfbfbf] hover:text-[#1b293f] transition-colors duration-200 px-4 py-2 rounded"
                      >
                        Ver licitaciones Activas <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>

                  {/* Parte derecha del componente */}
                  <motion.div
                    className="md:w-1/2 p-6 bg-[#1b293f] text-white"
                    initial={{ x: hasScrolled ? 0 : 200, opacity: hasScrolled ? 1 : 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: hasScrolled ? 0.5 : 1.5, delay: hasScrolled ? 0 : 0.5 }}
                  >
                    <h4 className="text-xl font-semibold mb-4">Licitaciones Recientes</h4>
                    <ul className="space-y-4">
                      {tenderData[currentCategory].licitaciones.slice(0, 3).map((licitacion, index) => (
                        <li key={index} className="border-b border-gray-700 pb-2">
                          <p className="font-medium">{licitacion.nombre}</p>
                          <p className="text-sm text-gray-300">
                            Apertura: {licitacion.fechaApertura} - Monto: ${licitacion.monto.toLocaleString("es-AR")}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Paginación del carrusel */}
          <div className="flex justify-center mt-8">
            {tenderData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCategory(index)}
                className={`w-3 h-3 rounded-full mx-1 ${currentCategory === index ? "bg-[#1b293f]" : "bg-gray-300"}`}
                aria-label={`Ver licitaciones de la categoría ${tenderData[index].categoria}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
