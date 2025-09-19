"use client"

import {
    MoreHorizontal,
    Plus,
    Eye,
    Trash2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
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

const pagos = [
    {
        id: "1",
        cliente: "Ana García",
        email: "ana@email.com",
        monto: 8000,
        metodo: "Efectivo",
        fecha: "2024-08-01",
        tipoMembresia: "Mensual",
    },
    {
        id: "2",
        cliente: "Carlos López",
        email: "carlos@email.com",
        monto: 22000,
        metodo: "Tarjeta",
        fecha: "2024-07-20",
        tipoMembresia: "Trimestral",
    },
]

export default function PagosAdminPage() {
    return (
        <div>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Pagos Registrados</CardTitle>
                        <CardDescription>Listado de pagos y membresías asociadas</CardDescription>
                    </div>
                    <Link href="/admin/pagos/nuevo-pago">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Registrar Pago
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Monto</TableHead>
                                <TableHead>Método</TableHead>
                                <TableHead>Membresía</TableHead>
                                <TableHead>Fecha</TableHead>
                                <TableHead>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {pagos.map((pago) => (
                                <TableRow key={pago.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{pago.cliente}</div>
                                            <div className="text-sm text-muted-foreground">{pago.email}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>${pago.monto}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{pago.metodo}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge>{pago.tipoMembresia}</Badge>
                                    </TableCell>
                                    <TableCell>{pago.fecha}</TableCell>
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
                </CardContent>
            </Card>
        </div>
    )
}
