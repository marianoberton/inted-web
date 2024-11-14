"use client"

import React, { useState, useEffect } from "react"
import { Chart as ChartJS, registerables } from "chart.js"
import "chartjs-adapter-date-fns"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../firebaseConfig"
import LicitacionesTable from "../components/LicitacionesTable"
import ResumenGeneral from "../components/ResumenGeneral"
import Filters from "../components/Filters"
import Charts from "../components/Charts"

ChartJS.register(...registerables)

export default function Dashboard() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [filters, setFilters] = useState({
    categoria: "",
    rubro: "",
    tipoContratacion: "",
    fechaInicio: "",
    fechaFin: "",
  })

  const [categorias, setCategorias] = useState([])
  const [rubros, setRubros] = useState([])
  const [tiposContratacion, setTiposContratacion] = useState([])

  const [reparticionData, setReparticionData] = useState({})
  const [reparticionesUnicas, setReparticionesUnicas] = useState(0) // Nuevo estado
  const [montoDuracionData, setMontoDuracionData] = useState([])
  const [categoriaData, setCategoriaData] = useState({}) // Cambiado de rubroData a categoriaData
  const [monedaData, setMonedaData] = useState({})
  const [procedimientoData, setProcedimientoData] = useState({
    labels: [],
    count: [],
    monto: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "procesos-bac-dashboard"))
        const documents = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

        documents.forEach((item) => {
          try {
            item.informacion_basica = JSON.parse(item.informacion_basica)
          } catch (e) {
            item.informacion_basica = {}
          }
          try {
            item.monto_duracion = JSON.parse(item.monto_duracion)
          } catch (e) {
            item.monto_duracion = {}
          }
          try {
            item.cronograma = JSON.parse(item.cronograma)
          } catch (e) {
            item.cronograma = {}
          }
        })

        const uniqueCategorias = [...new Set(documents.map((item) => item.categoria_general))]
        const uniqueRubros = [...new Set(documents.map((item) => item.rubro))]
        const uniqueTiposContratacion = [...new Set(documents.map((item) => item.informacion_basica?.procedimiento_seleccion || "Sin Tipo de Contratación"))]

        setCategorias(uniqueCategorias)
        setRubros(uniqueRubros)
        setTiposContratacion(uniqueTiposContratacion)

        setData(documents)
        setFilteredData(documents)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const filtered = data.filter((item) => {
      const fechaContrato = parseFecha(item.cronograma?.fecha_publicacion)

      return (
        (filters.categoria === "" || item.categoria_general === filters.categoria) &&
        (filters.rubro === "" || item.rubro === filters.rubro) &&
        (filters.tipoContratacion === "" || item.informacion_basica?.procedimiento_seleccion === filters.tipoContratacion) &&
        (filters.fechaInicio === "" || (fechaContrato && fechaContrato >= new Date(filters.fechaInicio))) &&
        (filters.fechaFin === "" || (fechaContrato && fechaContrato <= new Date(filters.fechaFin)))
      )
    })
    setFilteredData(filtered)
  }, [filters, data])

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value === "placeholder" ? "" : value }));
  }

  function parseMonto(montoStr) {
    if (!montoStr) return 0
    let montoClean = montoStr.replace(/[^\d.,-]/g, "").trim()
    montoClean = montoClean.replace(/\./g, "")
    montoClean = montoClean.replace(/,/g, ".")
    let monto = parseFloat(montoClean)
    return isNaN(monto) ? 0 : monto
  }

  function parseFecha(fechaStr) {
    if (!fechaStr) return null
    const [datePart, timePart] = fechaStr.split(" ")
    const [day, month, year] = datePart.split("/")
    const [hours, minutes, seconds] = timePart ? timePart.split(":") : ["0", "0", "0"]
    return new Date(year, month - 1, day, hours, minutes, seconds)
  }

  // Cálculos adicionales
  useEffect(() => {
    const reparticionData = filteredData.reduce((acc, item) => {
      const monto = parseMonto(item.monto_duracion?.monto)
      const codigo = item.codigo_reparticion || "Sin Código"
      acc[codigo] = (acc[codigo] || 0) + monto
      return acc
    }, {})

    const montoDuracionData = filteredData.map((item) => {
      const monto = parseMonto(item.monto_duracion?.monto)
      const duracionStr = item.monto_duracion?.duracion_contrato || ""
      const duracion = parseInt(duracionStr.replace(/[^\d]/g, "")) || 0
      return { x: monto, y: duracion }
    })

    const categoriaData = filteredData.reduce((acc, item) => {
      const categoria = item.categoria_general || "Sin Categoría"
      acc[categoria] = (acc[categoria] || 0) + 1
      return acc
    }, {})

    const monedaData = filteredData.reduce((acc, item) => {
      const moneda = item.informacion_basica?.moneda || "Sin Moneda"
      acc[moneda] = (acc[moneda] || 0) + 1
      return acc
    }, {})

    const procedimientoDataObj = filteredData.reduce((acc, item) => {
      const procedimiento = item.informacion_basica?.procedimiento_seleccion || "Sin Procedimiento"
      const monto = parseMonto(item.monto_duracion?.monto)

      if (!acc[procedimiento]) {
        acc[procedimiento] = { count: 0, monto: 0 }
      }

      acc[procedimiento].count += 1
      acc[procedimiento].monto += monto

      return acc
    }, {})

    const procedimientoLabels = Object.keys(procedimientoDataObj)
    const procedimientoCount = procedimientoLabels.map((label) => procedimientoDataObj[label].count)
    const procedimientoMonto = procedimientoLabels.map((label) => procedimientoDataObj[label].monto)

    // Calcular el número de reparticiones únicas
    setReparticionesUnicas(Object.keys(reparticionData).length)

    setReparticionData(reparticionData)
    setMontoDuracionData(montoDuracionData)
    setCategoriaData(categoriaData) // Actualizar estado con categoriaData en lugar de rubroData
    setMonedaData(monedaData)
    setProcedimientoData({
      labels: procedimientoLabels,
      count: procedimientoCount,
      monto: procedimientoMonto,
    })
  }, [filteredData])

  const totalLicitaciones = filteredData.length
  const montoTotal = filteredData.reduce((sum, item) => {
    const monto = parseMonto(item.monto_duracion?.monto)
    return sum + monto
  }, 0)

  const temporalData = filteredData.reduce((acc, item) => {
    const fechaPublicacion = parseFecha(item.cronograma?.fecha_publicacion)
    if (fechaPublicacion) {
      const fechaKey = fechaPublicacion.toISOString().split("T")[0]
      acc[fechaKey] = (acc[fechaKey] || 0) + 1
    }
    return acc
  }, {})

  const temporalLabels = Object.keys(temporalData).sort()
  const temporalValues = temporalLabels.map((label) => temporalData[label])

  function determinarEstado(item) {
    const now = new Date()
    const fechaFinRecepcion = parseFecha(item.cronograma?.fecha_fin_recepcion_documentos)
    const fechaActoApertura = parseFecha(item.cronograma?.fecha_acto_apertura)

    if (fechaFinRecepcion && now > fechaFinRecepcion) {
      return "En curso/Terminada"
    } else if (fechaActoApertura && now < fechaActoApertura) {
      return "De apertura próxima"
    } else {
      return "En curso"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Licitaciones</h1>

      <Filters
        filters={filters}
        handleFilterChange={handleFilterChange}
        categorias={categorias}
        rubros={rubros}
        tiposContratacion={tiposContratacion}
      />

      <div className="mb-8">
        <ResumenGeneral
          totalLicitaciones={totalLicitaciones}
          montoTotal={montoTotal}
          reparticionesUnicas={reparticionesUnicas}
        />
      </div>

      <Charts
        temporalLabels={temporalLabels}
        temporalValues={temporalValues}
        categoriaData={categoriaData} // Cambiado a categoriaData
        reparticionData={reparticionData}
      />

      <LicitacionesTable filteredData={filteredData} determinarEstado={determinarEstado} />
    </div>
  )
}
