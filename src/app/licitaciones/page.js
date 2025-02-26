"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Search, Calendar, DollarSign, Briefcase, Tag } from "lucide-react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

// Importamos useTranslation
import { useTranslation } from "../TranslationProvider";

export default function LicitacionesPage() {
  const [licitaciones, setLicitaciones] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroTipoContratacion, setFiltroTipoContratacion] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroJurisdiccion, setFiltroJurisdiccion] = useState("");

  // Extraemos t() y language
  const { t, language } = useTranslation();

  // Mapeos manuales de categorías y tipos
  const categoryMap = {
    "Sin Clasificación": "Unclassified",
    "Tecnología e Infraestructura IT": "IT Infrastructure and Technology",
    "Educación y Capacitación": "Education and Training",
    "Servicios Generales": "General Services",
    "Marketing y Comercialización": "Marketing and Commercialization",
    "Infraestructura y Construcción": "Infrastructure and Construction",
    "Gastronomía y Eventos": "Gastronomy and Events",
    "Concesiones y Predios": "Concessions and Lots",
    "Salud y Bienestar": "Health and Wellness",
  };

  const typeMap = {
    "Contratación directa": "Direct Contracting",
    "Contratación menor": "Minor Contracting",
    "Licitación pública": "Public Tender",
    "Sin Tipo de Contratación": "No Contract Type",
  };

  // Cadenas del diccionario
  const pageTitle = t("licitacionesPage", "pageTitle");
  const filtersTitle = t("licitacionesPage", "filtersTitle");
  const categoryLabel = t("licitacionesPage", "categoryLabel");
  const allCategories = t("licitacionesPage", "allCategories");
  const typeLabel = t("licitacionesPage", "typeLabel");
  const allTypes = t("licitacionesPage", "allTypes");
  const nameLabel = t("licitacionesPage", "nameLabel");
  const namePlaceholder = t("licitacionesPage", "namePlaceholder");
  const dateLabel = t("licitacionesPage", "dateLabel");
  const unavailable = t("licitacionesPage", "unavailable");
  const noResults = t("licitacionesPage", "noResults");
  const liveDataNote = t("licitacionesPage", "liveDataNote");

  // Claves para jurisdicción
  const jurisdictionLabel = t("licitacionesPage", "jurisdictionLabel");
  const allJurisdictions = t("licitacionesPage", "allJurisdictions");

  // Fallbacks
  const noCategory = t("licitacionesPage", "noCategory") || "Sin Clasificación";
  const noState = t("licitacionesPage", "noState") || "Sin Estado";
  const noContractType = t("licitacionesPage", "noContractType") || "Sin Tipo de Contratación";
  const noName = t("licitacionesPage", "noName") || "Nombre no disponible";
  const noDate = t("licitacionesPage", "noDate") || "Fecha no disponible";

  // Función para parsear monto
  const parseMonto = (montoStr) => {
    if (!montoStr || typeof montoStr !== "string") return unavailable;
    try {
      let montoClean = montoStr.replace(/[^0-9,.-]/g, "").trim();
      montoClean = montoClean.replace(/\./g, "");
      montoClean = montoClean.replace(/,/g, ".");
      const monto = parseFloat(montoClean);
      return isNaN(monto) ? unavailable : monto;
    } catch (error) {
      console.error("Error al procesar el monto:", error);
      return unavailable;
    }
  };

  useEffect(() => {
    const fetchLicitaciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "procesos-bac-dashboard"));
        const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        console.log("Número total de licitaciones obtenidas:", documents.length);
        console.log("Licitaciones obtenidas desde Firestore:", documents);

        const today = new Date();
        console.log("Hoy:", today);

        const licitacionesData = documents
          .filter((doc) => doc.categoria_general && doc.categoria_general !== noCategory)
          .map((doc) => {
            let nombreProceso = noName;
            let monto = 0;
            let tipoContratacion = noContractType;
            let fechaApertura = noDate;
            let estado = noState;
            let categoria = doc.categoria_general || noCategory;

            // Parseamos informacion_basica
            try {
              const informacionBasica = JSON.parse(doc.informacion_basica || "{}");
              if (informacionBasica.nombre_proceso) {
                nombreProceso = informacionBasica.nombre_proceso
                  .toLowerCase()
                  .replace(/(^|\s)([a-záéíóúñ])/g, (_, sep, char) => sep + char.toUpperCase());
              }
              tipoContratacion = informacionBasica.procedimiento_seleccion || noContractType;
            } catch (error) {
              console.error("Error al parsear informacion_basica:", error);
            }

            // Parseamos monto_duracion
            try {
              const montoDuracion = JSON.parse(doc.monto_duracion || "{}");
              monto = parseMonto(montoDuracion.monto);
            } catch (error) {
              console.error("Error al parsear monto_duracion:", error);
            }

            // Parseamos cronograma
            // Modificación en la parte donde se extrae la fecha
            try {
              const cronograma = JSON.parse(doc.cronograma || "{}");
              if (cronograma.fecha_acto_apertura) {
                const [datePart, timePart] = cronograma.fecha_acto_apertura.split(" ");
                let [day, month, year] = datePart.split("/");
                day = day.padStart(2, "0");
                month = month.padStart(2, "0");
                const formattedDate = `${year}-${month}-${day}T${timePart}`;
                const dateObj = new Date(formattedDate);

                if (!isNaN(dateObj.getTime())) {
                  fechaApertura = dateObj;
                }
              }
            } catch (error) {
              console.error("Error al procesar cronograma:", error);
            }

            console.log("Fecha antes de filtrar:", fechaApertura);
            console.log(
              "Fecha válida:",
              fechaApertura instanceof Date && !isNaN(fechaApertura.getTime())
            );

            // Estado
            estado = doc.estado || noState;

            // Mapeo de idioma inglés
            if (language === "en") {
              categoria = categoryMap[categoria] || categoria;
              tipoContratacion = typeMap[tipoContratacion] || tipoContratacion;
            }

            // Asignamos "CABA" como jurisdicción (por defecto)
            const jurisdiccion = "CABA";

            return {
              id: doc.id,
              nombre: nombreProceso,
              categoria,
              tipoContratacion,
              fechaApertura,
              monto,
              estado,
              jurisdiccion,
            };
          })
          // Filtrar por fecha >= hoy
          .filter((licitacion) => {
            return (
              licitacion.fechaApertura instanceof Date && licitacion.fechaApertura >= today
            );
          });

        console.log("Número de licitaciones después del filtrado por fecha:", licitacionesData.length);
        console.log("Licitaciones después del filtrado:", licitacionesData);

        // Ordenar desc por fecha
        licitacionesData.sort((a, b) => b.fechaApertura - a.fechaApertura);

        // Convertir la fecha a string legible
        const licitacionesFinal = licitacionesData.map((licitacion) => ({
          ...licitacion,
          fechaApertura:
            licitacion.fechaApertura instanceof Date
              ? licitacion.fechaApertura.toLocaleDateString("es-AR")
              : licitacion.fechaApertura,
        }));

        console.log("Licitaciones finales antes de setear estado:", licitacionesFinal);

        setLicitaciones(licitacionesFinal);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchLicitaciones();
  }, [language]);

  // Función de filtrado
  const filtrarLicitaciones = () => {
    return licitaciones.filter((licitacion) => {
      const categoriaCoincide = filtroCategoria
        ? licitacion.categoria === filtroCategoria
        : true;

      const tipoContratacionCoincide = filtroTipoContratacion
        ? licitacion.tipoContratacion === filtroTipoContratacion
        : true;

      const nombreCoincide = filtroNombre
        ? licitacion.nombre.toLowerCase().includes(filtroNombre.toLowerCase())
        : true;

      const jurisdiccionCoincide = filtroJurisdiccion
        ? licitacion.jurisdiccion === filtroJurisdiccion
        : true;

      return (
        categoriaCoincide &&
        tipoContratacionCoincide &&
        nombreCoincide &&
        jurisdiccionCoincide
      );
    });
  };

  const licitacionesFiltradas = filtrarLicitaciones();

  return (
    <>
      {/* Head SEO Optimizado */}
      <Head>
        <title>Portal de Licitaciones de CABA | INTED</title>
        <meta
          name="description"
          content="Consulta las licitaciones activas de la Ciudad Autónoma de Buenos Aires en tiempo real. Filtra por categoría, tipo de contratación y jurisdicción. Accede a información detallada sobre cada proceso."
        />
        <meta
          name="keywords"
          content="
            licitaciones caba, contrataciones públicas, licitaciones ciudad autónoma de buenos aires, 
            compras del estado, licitaciones abiertas, licitaciones vigentes, portal de licitaciones, 
            obras públicas en CABA, contrataciones gubernamentales, adjudicación de contratos, 
            licitaciones de infraestructura, servicios generales, tecnología en licitaciones, 
            compras estatales, contratación directa, licitación pública, proveedores del estado
          "
        />
        <meta name="author" content="Inted" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        <meta property="og:title" content="Portal de Licitaciones de CABA | INTED" />
        <meta
          property="og:description"
          content="Consulta las licitaciones activas de la Ciudad Autónoma de Buenos Aires en tiempo real. Filtra por categoría, tipo de contratación y jurisdicción. Accede a información detallada sobre cada proceso."
        />
        <meta property="og:image" content="https://inted.com.ar/images/licitaciones.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://inted.com.ar/licitaciones" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portal de Licitaciones de CABA | INTED" />
        <meta
          name="twitter:description"
          content="Consulta las licitaciones activas de la Ciudad Autónoma de Buenos Aires en tiempo real. Filtra por categoría, tipo de contratación y jurisdicción. Accede a información detallada sobre cada proceso."
        />
        <meta name="twitter:image" content="https://inted.com.ar/images/licitaciones.jpg" />
        <meta name="twitter:image:alt" content="Licitaciones activas en la Ciudad Autónoma de Buenos Aires" />

        <link rel="icon" href="/favicon.ico" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "INTED Consultoría",
            "url": "https://inted.com.ar",
            "logo": "https://inted.com.ar/logo.png",
            "description": "Consultoría en licitaciones, contrataciones con el Estado y Desarrollo de Proyectos Constructivos.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Juramento 1475",
              "addressLocality": "Ciudad Autónoma de Buenos Aires",
              "addressCountry": "Argentina"
            },
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+54-XXX-XXX-XXXX",
                "contactType": "Consultoría"
              }
            ],
            "sameAs": [
              "https://www.linkedin.com/company/inted",
              "https://twitter.com/inted",
              "https://www.facebook.com/inted"
            ]
          })}
        </script>
      </Head>

      {/* Contenido de la página */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-[#1b293f] mb-6 text-center"
          >
            {pageTitle}
          </motion.h1>

          {/* Subtítulo (opcional) */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-center text-gray-600 mb-12"
          >
            {/* Aquí podrías insertar un subtítulo si lo deseas */}
          </motion.p>

          {/* Contenedor de Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-12"
          >
            <h2 className="text-2xl font-semibold text-[#1b293f] mb-6">
              {filtersTitle}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Filtro Categoría */}
              <div>
                <label
                  htmlFor="categoria"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {categoryLabel}
                </label>
                <select
                  id="categoria"
                  value={filtroCategoria}
                  onChange={(e) => setFiltroCategoria(e.target.value)}
                  className="w-full px-4 py-2 rounded-md shadow-sm text-[#1b293f] bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1b293f]"
                >
                  <option value="">{allCategories}</option>
                  {[...new Set(licitaciones.map((data) => data.categoria))].map(
                    (categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Filtro Tipo de Contratación */}
              <div>
                <label
                  htmlFor="tipoContratacion"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {typeLabel}
                </label>
                <select
                  id="tipoContratacion"
                  value={filtroTipoContratacion}
                  onChange={(e) => setFiltroTipoContratacion(e.target.value)}
                  className="w-full px-4 py-2 rounded-md shadow-sm text-[#1b293f] bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1b293f]"
                >
                  <option value="">{allTypes}</option>
                  {[...new Set(licitaciones.map((data) => data.tipoContratacion))].map(
                    (tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Filtro Jurisdicción */}
              <div>
                <label
                  htmlFor="jurisdiccion"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {jurisdictionLabel}
                </label>
                <select
                  id="jurisdiccion"
                  value={filtroJurisdiccion}
                  onChange={(e) => setFiltroJurisdiccion(e.target.value)}
                  className="w-full px-4 py-2 rounded-md shadow-sm text-[#1b293f] bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1b293f]"
                >
                  <option value="">{allJurisdictions}</option>
                  <option value="CABA">CABA</option>
                </select>
              </div>

              {/* Filtro Nombre */}
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {nameLabel}
                </label>
                <div className="relative">
                  <input
                    id="nombre"
                    type="text"
                    value={filtroNombre}
                    onChange={(e) => setFiltroNombre(e.target.value)}
                    placeholder={namePlaceholder}
                    className="w-full px-4 py-2 rounded-md shadow-sm text-[#1b293f] bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1b293f] pl-10"
                  />
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lista de licitaciones */}
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
                      <h3 className="text-xl font-bold text-[#1b293f] mb-2">
                        {licitacion.nombre}
                      </h3>
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
                          <span className="text-sm">
                            {dateLabel}: {licitacion.fechaApertura}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <DollarSign size={16} className="mr-2" />
                          <span className="text-sm font-semibold">
                            {licitacion.monto === unavailable
                              ? unavailable
                              : licitacion.monto.toLocaleString("es-AR")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 text-xl">{noResults}</p>
            )}
          </motion.div>

          {/* Nota sobre datos en vivo */}
          <p className="text-sm text-gray-500 mt-8 text-center">{liveDataNote}</p>
        </div>
      </div>
    </>
  );
}
