import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { FileText, MessageCircle } from "lucide-react"

export default function LicitacionesTable({ filteredData, determinarEstado }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "En curso":
        return <Badge className="bg-blue-500 hover:bg-blue-600">{status}</Badge>
      case "De apertura próxima":
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>
      case "En curso/Terminada":
        return <Badge className="bg-orange-500 hover:bg-orange-600">{status}</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const handleGenerateReport = async (doc) => {
    try {
      const formData = new FormData();
      formData.append("numero_proceso", doc.numero_proceso);
  
      const response = await fetch("http://localhost:8080/generate_pdf", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Informe_Licitacion_${doc.numero_proceso}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Error al generar el reporte:", response.statusText);
      }
    } catch (error) {
      console.error("Error al hacer la solicitud al servidor Flask:", error);
    }
  };
  

  const handleChatWithProcess = (doc) => {
    console.log("Opening chat for:", doc.numero_proceso)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Detalles de Licitaciones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold">Proceso</TableHead>
                <TableHead className="font-semibold">Rubro</TableHead>
                <TableHead className="font-semibold">Categoría</TableHead>
                <TableHead className="font-semibold">Monto</TableHead>
                <TableHead className="font-semibold">Tipo de Contratación</TableHead>
                <TableHead className="font-semibold">Estado</TableHead>
                <TableHead className="font-semibold text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{doc.numero_proceso}</TableCell>
                  <TableCell>{doc.rubro}</TableCell>
                  <TableCell>{doc.categoria_general}</TableCell>
                  <TableCell>{doc.monto_duracion?.monto || "Sin Monto"}</TableCell>
                  <TableCell>{doc.informacion_basica?.procedimiento_seleccion || "Sin Tipo de Contratación"}</TableCell>
                  <TableCell>{getStatusBadge(determinarEstado(doc))}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleGenerateReport(doc)}
                        title="Generar reporte en PDF"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">Generar reporte en PDF</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleChatWithProcess(doc)}
                        title="Chatear con el Proceso de Compra"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="sr-only">Chatear con el Proceso de Compra</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
