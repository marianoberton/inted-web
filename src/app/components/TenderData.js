"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

// Importamos la traducción y el estado de idioma
import { useTranslation } from "../TranslationProvider";

// Mapeo de categorías conocidas ES -> EN
const categoryMap = {
  "Tecnología e Infraestructura IT": "IT Infrastructure and Technology",
  "Educación y Capacitación": "Education and Training",
  "Servicios Generales": "General Services",
  "Marketing y Comercialización": "Marketing and Commercialization",
  "Infraestructura y Construcción": "Infrastructure and Construction",
  "Gastronomía y Eventos": "Gastronomy and Events",
  "Concesiones y Predios": "Concessions and Properties",
  "Salud y Bienestar": "Health and Wellness",
};

export default function TenderPreview() {
  const [tenderData, setTenderData] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(0);

  // Obtenemos la función t() y el language
  const { t, language } = useTranslation();

  // Funciones auxiliares para parsear
  const parseMonto = (montoStr) => {
    if (!montoStr || typeof montoStr !== "string") return 0;
    let montoClean = montoStr.replace(/[^\d.,-]/g, "").trim();
    montoClean = montoClean.replace(/\./g, "");
    montoClean = montoClean.replace(/,/g, ".");
    const monto = parseFloat(montoClean);
    return isNaN(monto) ? 0 : monto;
  };

  const parseFecha = (fechaStr) => {
    if (!fechaStr) return null;
    const [datePart] = fechaStr.split(" ");
    const [day, month, year] = datePart.split("/");
    // Convertir los valores a números y restar 1 al mes (ya que los meses son 0-indexados)
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    const fetchTenderData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "procesos-bac-dashboard"));
        const documents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const today = new Date();

        // 1. Agrupamos en groupedData, donde cada categoría tendrá:
        //    { categoria, descripcion, licitaciones: [...], cantidadTotal, montoTotal, recent: [...] }
        const groupedData = documents.reduce((acc, doc) => {
          const category = doc.categoria_general || "Sin Clasificación";
          // Excluir "Sin Clasificación"
          if (category === "Sin Clasificación") return acc;

          let nombreProceso = "Nombre no disponible";
          let rawDate = null; // Guardamos la fecha como objeto Date
          let monto = 0;

          // Parse informacion_basica
          try {
            const info = JSON.parse(doc.informacion_basica || "{}");
            nombreProceso = info.nombre_proceso
              ? toTitleCase(info.nombre_proceso)
              : "Nombre no disponible";
          } catch (error) {
            console.error("Error al parsear informacion_basica:", error);
          }

          // Parse monto_duracion
          try {
            const montoDuracion = JSON.parse(doc.monto_duracion || "{}");
            monto = parseMonto(montoDuracion.monto);
          } catch (error) {
            console.error("Error al parsear monto_duracion:", error);
          }

          // Parse cronograma
          let fechaApertura = null;
          try {
            const cronograma = JSON.parse(doc.cronograma || "{}");
            if (cronograma.fecha_acto_apertura) {
              fechaApertura = parseFecha(cronograma.fecha_acto_apertura);
            }
          } catch (error) {
            console.error("Error al procesar cronograma:", error);
          }

          // Solo agregamos si la fecha >= hoy
          if (fechaApertura && fechaApertura >= today) {
            // Traducir la categoría si language === "en"
            let displayCategory = category;
            if (language === "en") {
              displayCategory = categoryMap[category] || category;
            }

            // Si no existe, la creamos
            if (!acc[displayCategory]) {
              acc[displayCategory] = {
                categoria: displayCategory,
                descripcion:
                  language === "en"
                    ? `Tenders in the category ${displayCategory}`
                    : `Licitaciones en la categoría ${displayCategory}`,
                licitaciones: [], // aquí guardaremos cada licitación
                cantidadTotal: 0,
                montoTotal: 0,
              };
            }

            // Añadir la licitación
            acc[displayCategory].licitaciones.push({
              nombre: nombreProceso,
              rawDate: fechaApertura, // para luego ordenar
              monto,
            });

            acc[displayCategory].cantidadTotal += 1;
            acc[displayCategory].montoTotal += monto;
          }

          return acc;
        }, {});

        // 2. Convertimos groupedData (obj) en un array para poder ordenarlo
        let arrayData = Object.values(groupedData);

        // Ordenar categorías por cantidad de licitaciones
        arrayData.sort((a, b) => b.cantidadTotal - a.cantidadTotal);

        // 3. Para cada categoría, ordenamos sus licitaciones por fecha desc y generamos "recent"
        arrayData.forEach((cat) => {
          cat.licitaciones.sort((a, b) => b.rawDate - a.rawDate);
          // recent = las 3 últimas
          cat.recent = cat.licitaciones.slice(0, 3).map((item) => ({
            ...item,
            // formateamos la fecha para mostrar
            fechaApertura: item.rawDate.toLocaleDateString("es-AR"),
          }));
        });

        // 4. Convertimos licitaciones a un array con fecha formateada
        //    para mostrar en la "caja izquierda"
        //    (o si prefieres, guardamos la lista entera con la fecha formateada)
        arrayData = arrayData.map((cat) => ({
          ...cat,
          licitaciones: cat.licitaciones.map((lic) => ({
            ...lic,
            fechaApertura: lic.rawDate.toLocaleDateString("es-AR"),
          })),
        }));

        // 5. setTenderData con este array final
        setTenderData(arrayData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTenderData();
  }, [language]);

  // Render
  return (
    <div id="tender-preview" className="bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Título principal */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#1b293f] mb-8 text-center">
          {t("tenderPreview", "title")}
        </h2>

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
                  {/* Caja Izquierda (categoría) */}
                  <motion.div className="md:w-1/2 p-6 bg-white">
                    <h3 className="text-2xl font-semibold text-[#1b293f] mb-4">
                      {tenderData[currentCategory].categoria}
                    </h3>
                    <p className="text-md text-gray-600 mb-4">
                      {tenderData[currentCategory].descripcion}
                    </p>
                    <p className="text-md text-gray-600">
                      <span className="font-medium">
                        {t("tenderPreview", "totalLabel")}
                      </span>{" "}
                      {tenderData[currentCategory].cantidadTotal}
                    </p>
                    <p className="text-md text-gray-600">
                      <span className="font-medium">
                        {t("tenderPreview", "amountLabel")}
                      </span>{" "}
                      {tenderData[currentCategory].montoTotal > 0
                        ? `$${tenderData[currentCategory].montoTotal.toLocaleString("es-AR")}`
                        : t("tenderPreview", "noDisponible")}
                    </p>
                    <div className="mt-6">
                      <Link
                        href="/licitaciones"
                        className="inline-flex items-center bg-[#1b293f] text-white hover:bg-[#bfbfbf] hover:text-[#1b293f] transition-colors duration-200 px-4 py-2 rounded"
                      >
                        {t("tenderPreview", "seeActiveTenders")}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </motion.div>

                  {/* Caja Derecha (licitaciones recientes de esa misma categoría) */}
                  <motion.div className="md:w-1/2 p-6 bg-[#1b293f] text-white">
                    <h4 className="text-xl font-semibold mb-4">
                      {t("tenderPreview", "recentTenders")}
                    </h4>
                    <ul className="space-y-4">
                      {tenderData[currentCategory].recent.map((lic, index) => (
                        <li key={index} className="border-b border-gray-700 pb-2">
                          <p className="font-medium">{lic.nombre}</p>
                          <p className="text-sm text-gray-300">
                            {t("tenderPreview", "aperturaLabel")}:{" "}
                            {lic.fechaApertura} -{" "}
                            {t("tenderPreview", "montoLabel")}:{" "}
                            {lic.monto > 0
                              ? `$${lic.monto.toLocaleString("es-AR")}`
                              : t("tenderPreview", "noDisponible")}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botones de categorías */}
          <div className="flex justify-center mt-8">
            {tenderData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCategory(index)}
                className={`w-3 h-3 rounded-full mx-1 ${
                  currentCategory === index ? "bg-[#1b293f]" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Leyenda final (datos en vivo no traducidos) */}
        <p className="text-sm text-gray-500 mt-6 text-center">
          {t("tenderPreview", "liveDataNote")}
        </p>
      </div>
    </div>
  );
}
