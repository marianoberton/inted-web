import React from 'react';
import { Bar, Line, Pie } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { es } from "date-fns/locale";
import 'chartjs-adapter-date-fns';

export default function Charts({ temporalLabels = [], temporalValues = [], categoriaData = {}, reparticionData = {} }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Monto por Categoría */}
        <Card>
          <CardHeader>
            <CardTitle>Monto por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={{
                labels: Object.keys(categoriaData),
                datasets: [
                  {
                    label: "Monto (ARS)",
                    data: Object.values(categoriaData),
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Monto Total por Código de Repartición */}
        <Card>
          <CardHeader>
            <CardTitle>Monto Total por Código de Repartición</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar
              data={{
                labels: Object.keys(reparticionData),
                datasets: [
                  {
                    label: "Monto (ARS)",
                    data: Object.values(reparticionData),
                    backgroundColor: "rgba(153, 102, 255, 0.6)",
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Distribución por Categoría */}
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie
              data={{
                labels: Object.keys(categoriaData),
                datasets: [
                  {
                    data: Object.values(categoriaData),
                    backgroundColor: [
                      "rgba(255, 159, 64, 0.6)",
                      "rgba(54, 162, 235, 0.6)",
                      "rgba(255, 99, 132, 0.6)",
                      "rgba(75, 192, 192, 0.6)",
                      "rgba(153, 102, 255, 0.6)",
                    ],
                  },
                ],
              }}
            />
          </CardContent>
        </Card>

        {/* Evolución Temporal de Licitaciones */}
        <Card>
          <CardHeader>
            <CardTitle>Evolución Temporal de Licitaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <Line
              data={{
                labels: temporalLabels,
                datasets: [
                  {
                    label: "Número de Licitaciones",
                    data: temporalValues,
                    fill: false,
                    borderColor: "rgba(75, 192, 192, 1)",
                    tension: 0.1,
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "day",
                      tooltipFormat: "dd/MM/yyyy",
                    },
                    adapters: {
                      date: {
                        locale: es,
                      },
                    },
                  },
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
