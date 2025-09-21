"use client"

import {
  MoreHorizontal,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { ejercicioService } from "@/lib/services/ejercicioService"
import type { Ejercicio } from "@/types/EjercicioType"

export default function EjerciciosPage() {
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await ejercicioService.listarEjercicios()
        setEjercicios(res.data)
      } catch (error) {
        console.error("Error al cargar ejercicios:", error)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [])

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Ejercicios</CardTitle>
            <CardDescription>Listado de ejercicios disponibles</CardDescription>
          </div>
          <Link href="/entrenador/ejercicios/nuevo-ejercicio">
            <Button>
              <Plus />
              Nuevo Ejercicio
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Cargando ejercicios...</p>
          ) : ejercicios.length === 0 ? (
            <p>No hay ejercicios registrados.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Imagen</TableHead>
                  <TableHead>Video</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ejercicios.map((ejercicio) => (
                  <TableRow key={ejercicio._id}>
                    <TableCell className="font-medium">{ejercicio.nombre}</TableCell>
                    <TableCell className="max-w-[200px] truncate whitespace-nowrap overflow-hidden">{ejercicio.descripcion || "-"}</TableCell>
                    <TableCell>
                      {ejercicio.imagen ? (
                        <a
                          href={ejercicio.imagen}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-sm"
                        >
                          Ver imagen
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      {ejercicio.videoURL ? (
                        <a
                          href={ejercicio.videoURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline text-sm"
                        >
                          Ver video
                        </a>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Ver Detalles
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
