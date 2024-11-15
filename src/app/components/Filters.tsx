import React, { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface FiltersProps {
  filters: {
    categoria: string;
    rubro: string;
    tipoContratacion: string;
    fechaInicio: string | null;
    fechaFin: string | null;
  };
  handleFilterChange: (key: string, value: string) => void;
  categorias: string[];
  rubros: { categoria: string }[];
  tiposContratacion: string[];
}

const Filters: React.FC<FiltersProps> = ({ filters, handleFilterChange, categorias, rubros, tiposContratacion }) => {
  const [filteredRubros, setFilteredRubros] = useState<{ categoria: string }[]>([]);

  useEffect(() => {
    const newRubros = rubros.filter((rubro) => {
      return !filters.categoria || rubro.categoria === filters.categoria;
    });
    setFilteredRubros(newRubros);
  }, [filters.categoria, rubros]);

  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {/* Filtro por Categoría */}
      <Select value={filters.categoria} onValueChange={(value) => handleFilterChange('categoria', value === "all" ? "" : value)}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por categoría" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas las categorías</SelectItem>
          {categorias.map((categoria, index) => (
            <SelectItem key={`${categoria}-${index}`} value={categoria}>
              {categoria}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Filtro por Rubro */}
      <Select value={filters.rubro} onValueChange={(value) => handleFilterChange('rubro', value === "all" ? "" : value)}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por rubro" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los rubros</SelectItem>
          {filteredRubros.map((rubro, index) => (
            <SelectItem key={`${rubro.categoria}-${index}`} value={rubro.categoria}>
              {rubro.categoria}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Filtro por Tipo de Contratación */}
      <Select value={filters.tipoContratacion} onValueChange={(value) => handleFilterChange('tipoContratacion', value === "all" ? "" : value)}>
        <SelectTrigger>
          <SelectValue placeholder="Filtrar por tipo de contratación" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los tipos</SelectItem>
          {tiposContratacion.map((tipo, index) => (
            <SelectItem key={`${tipo}-${index}`} value={tipo}>
              {tipo}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Filtro por Fecha Inicio */}
      <DatePicker
        selected={filters.fechaInicio ? new Date(filters.fechaInicio) : null}
        onChange={(date: Date | null) => handleFilterChange('fechaInicio', date ? date.toISOString().split('T')[0] : '')}
        placeholderText="Fecha inicio"
        className="border p-2 rounded w-full text-black"
        dateFormat="yyyy-MM-dd"
      />

      {/* Filtro por Fecha Fin */}
      <DatePicker
        selected={filters.fechaFin ? new Date(filters.fechaFin) : null}
        onChange={(date: Date | null) => handleFilterChange('fechaFin', date ? date.toISOString().split('T')[0] : '')}
        placeholderText="Fecha fin"
        className="border p-2 rounded w-full text-black"
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
};

export default Filters;
