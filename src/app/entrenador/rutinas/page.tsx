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
import { rutinaService } from "@/lib/services/rutinaService"
import { Rutina } from "@/types/RutinaType"

export default function RutinasPage() {
    const [rutinas, setRutinas] = useState<Rutina[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await rutinaService.listarRutina()
                setRutinas(res.data)
            } catch (error) {
                console.error("Error al cargar rutinas:", error)
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
                        <CardTitle>Rutinas</CardTitle>
                        <CardDescription>Listado de rutinas creadas</CardDescription>
                    </div>
                    <Link href="/entrenador/rutinas/nueva-rutina">
                        <Button>
                            <Plus />
                            Nueva Rutina
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p>Cargando rutinas...</p>
                    ) : rutinas.length === 0 ? (
                        <p>No hay rutinas registradas.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nombre</TableHead>
                                        <TableHead>Cliente</TableHead>
                                        <TableHead>Días</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead>Asignada</TableHead>
                                        <TableHead>Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {rutinas.map((rutina) => (
                                        <TableRow key={rutina._id}>
                                            <TableCell className="font-medium">{rutina.nombre}</TableCell>
                                            <TableCell>{rutina.clienteId?.nombre} {rutina.clienteId?.apellido}</TableCell>
                                            <TableCell>{rutina.dias.join(", ")}</TableCell>
                                            <TableCell>
                                                <span className={`text-sm font-medium ${rutina.estado === "activa" ? "text-green-600" :
                                                    rutina.estado === "completada" ? "text-blue-600" :
                                                        "text-red-600"
                                                    }`}>
                                                    {rutina.estado}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {new Date(rutina.fechaAsignacion).toLocaleDateString("es-AR")}
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
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
