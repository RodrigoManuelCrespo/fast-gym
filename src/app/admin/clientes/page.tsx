"use client"

import { MoreHorizontal, Plus, Eye, Edit, Trash2 } from "lucide-react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { toast } from "sonner"
import { clienteService } from "@/lib/services/clienteService"

interface Cliente {
    _id: string
    nombre: string
    apellido: string
    email: string
    telefono?: string
    createdAt: string
}

export default function AdminDashboard() {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const res = await clienteService.clientes()
                setClientes(res.data)
            } catch (error: unknown) {
                console.error("Error al cargar clientes:", error)
                if (error instanceof Error) {
                    toast.error(error.message)
                } else {
                    toast.error("Error al cargar clientes")
                }
            } finally {
                setLoading(false)
            }
        }

        fetchClientes()
    }, [])

    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Clientes</CardTitle>
                        <CardDescription>Últimos Clientes registrados</CardDescription>
                    </div>
                    <Link href="/admin/clientes/nuevo-cliente">
                        <Button>
                            <Plus />
                            Agregar Cliente
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <p>Cargando clientes...</p>
                    ) : clientes.length === 0 ? (
                        <p>No hay clientes registrados.</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Teléfono</TableHead>
                                    <TableHead>Fecha de Registro</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {clientes.map((cliente) => (
                                    <TableRow key={cliente._id}>
                                        <TableCell>
                                            <div>
                                                <div className="font-medium">
                                                    {cliente.nombre} {cliente.apellido}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{cliente.email}</TableCell>
                                        <TableCell>{cliente.telefono || "-"}</TableCell>
                                        <TableCell>
                                            {new Date(cliente.createdAt).toLocaleDateString("es-AR")}
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






