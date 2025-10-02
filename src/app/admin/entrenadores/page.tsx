"use client"
import {
    Calendar,
    MoreHorizontal,
    Plus,
    Eye,
    Edit,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Entrenador } from "@/types/EntrenadorType"
import { entrenadorService } from "@/lib/services/entrenadorService"
import Link from "next/link"

export default function EntrenadoresPage() {
    const [entrenadores, setEntrenadores] = useState<Array<Entrenador>>([]);

    useEffect(() => {
        entrenadorService.entrenadores()
            .then((res) => setEntrenadores(res.data))
            .catch(() => toast.error("Error al cargar Entrenadores"))
    }, [])
    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Entrenadores</CardTitle>
                        <CardDescription>Listado del personal</CardDescription>
                    </div>
                    <Link href="/admin/entrenadores/nuevo-entrenador">
                        <Button className="cursor-pointer">
                            <Plus className="mr-2 h-4 w-4" />
                            Agregar Entrenador
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Teléfono</TableHead>
                                <TableHead>Fecha de Registro</TableHead>
                                <TableHead>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {entrenadores.map((entrenador) => (
                                <TableRow key={entrenador._id}>
                                    <TableCell>
                                        <div className="font-medium">
                                            {entrenador.nombre}, {entrenador.apellido}
                                        </div>
                                    </TableCell>
                                    <TableCell>{entrenador.email}</TableCell>
                                    <TableCell>{entrenador.telefono}</TableCell>
                                    <TableCell>
                                        {new Date(entrenador.createdAt).toLocaleDateString("es-AR")}
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
                                                    Ver Perfil
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                    Ver Horarios
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}