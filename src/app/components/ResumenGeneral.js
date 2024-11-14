import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign, FileText, Building } from "lucide-react";

export default function ResumenGeneral({ totalLicitaciones, montoTotal, reparticionesUnicas }) {
  const formattedMonto = montoTotal.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0, // Sin decimales
    maximumFractionDigits: 0
  });

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3 justify-items-center">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Procesos de Compras</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLicitaciones}</div>
          <p className="text-xs text-muted-foreground">
            {totalLicitaciones > 1000 ? '+1000' : ''} procesos activos
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Monto Total (ARS)</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formattedMonto}</div>
          <p className="text-xs text-muted-foreground">Valor total de licitaciones</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cantidad de Reparticiones</CardTitle>
          <Building className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{reparticionesUnicas}</div>
          <p className="text-xs text-muted-foreground">Diversidad de reparticiones</p>
        </CardContent>
      </Card>
    </div>
  );
}
