import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function Filters({ filters, handleFilterChange, categorias, rubros, tiposContratacion }) {
  const [filteredRubros, setFilteredRubros] = useState([])

  // Actualizar los rubros disponibles en función de la categoría seleccionada
  useEffect(() => {
    const newRubros = rubros.filter((rubro) => {
      return !filters.categoria || rubro.categoria === filters.categoria
    })
    setFilteredRubros(newRubros)
  }, [filters.categoria, rubros])

  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <Select onValueChange={(value) => handleFilterChange('categoria', value === "all" ? "" : value)} value={filters.categoria}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          {categorias.map((categoria) => (
            <SelectItem key={categoria} value={categoria}>
              {categoria}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilterChange('rubro', value === "all" ? "" : value)} value={filters.rubro}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por rubro" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los rubros</SelectItem>
          {filteredRubros.map((rubro) => (
            <SelectItem key={rubro} value={rubro}>
              {rubro}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => handleFilterChange('tipoContratacion', value === "all" ? "" : value)} value={filters.tipoContratacion}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por tipo de contratación" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los tipos</SelectItem>
          {tiposContratacion.map((tipo) => (
            <SelectItem key={tipo} value={tipo}>
              {tipo}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DatePicker
        selected={filters.fechaInicio ? new Date(filters.fechaInicio) : null}
        onChange={(date) => handleFilterChange('fechaInicio', date ? date.toISOString().split('T')[0] : '')}
        placeholderText="Fecha inicio"
        className="border p-2 rounded w-full text-black" // Añadido text-black para hacer visible el texto
        dateFormat="yyyy-MM-dd"
      />
      <DatePicker
        selected={filters.fechaFin ? new Date(filters.fechaFin) : null}
        onChange={(date) => handleFilterChange('fechaFin', date ? date.toISOString().split('T')[0] : '')}
        placeholderText="Fecha fin"
        className="border p-2 rounded w-full text-black" // Añadido text-black para hacer visible el texto
        dateFormat="yyyy-MM-dd"
      />
    </div>
  )
}
