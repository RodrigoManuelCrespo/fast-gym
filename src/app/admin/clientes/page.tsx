"use client"
import {
    MoreHorizontal,
    Plus,
    Eye,
    Edit,
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


const recentClients = [
    {
        id: "1",
        name: "Ana García",
        email: "ana.garcia@email.com",
        membership: "Premium",
        status: "Activo",
        joinDate: "2024-01-15",
        expiryDate: "2024-07-15",
    },
    {
        id: "2",
        name: "Carlos López",
        email: "carlos.lopez@email.com",
        membership: "Básico",
        status: "Activo",
        joinDate: "2024-02-01",
        expiryDate: "2024-08-01",
    },
    {
        id: "3",
        name: "María Rodríguez",
        email: "maria.rodriguez@email.com",
        membership: "Premium",
        status: "Vencido",
        joinDate: "2023-12-10",
        expiryDate: "2024-06-10",
    },
    {
        id: "4",
        name: "Juan Martínez",
        email: "juan.martinez@email.com",
        membership: "Estándar",
        status: "Activo",
        joinDate: "2024-01-20",
        expiryDate: "2024-07-20",
    },
]


export default function AdminDashboard() {
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
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Membresía</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Vencimiento</TableHead>
                                <TableHead>Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentClients.map((client) => (
                                <TableRow key={client.id}>
                                    <TableCell>
                                        <div>
                                            <div className="font-medium">{client.name}</div>
                                            <div className="text-sm text-muted-foreground">{client.email}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{client.membership}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={client.status === "Activo" ? "default" : "destructive"}>
                                            {client.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{client.expiryDate}</TableCell>
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
                </CardContent>
            </Card>
        </div>
    )
}
