"use client"
import {
    Calendar,
    MoreHorizontal,
    Plus,
    Eye,
    Edit,
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



const trainers = [
    {
        id: "1",
        name: "Pedro Sánchez",
        specialty: "Entrenamiento Funcional",
        clients: 25,
        status: "Activo",
        rating: 4.8,
    },
    {
        id: "2",
        name: "Laura Fernández",
        specialty: "Yoga y Pilates",
        clients: 30,
        status: "Activo",
        rating: 4.9,
    },
    {
        id: "3",
        name: "Miguel Torres",
        specialty: "Musculación",
        clients: 22,
        status: "Activo",
        rating: 4.7,
    },
]

export default function AdminDashboard() {
    return (
        <div>


                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Entrenadores</CardTitle>
                                    <CardDescription>Personal de entrenamiento y sus especialidades</CardDescription>
                                </div>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Agregar Entrenador
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Entrenador</TableHead>
                                            <TableHead>Especialidad</TableHead>
                                            <TableHead>Clientes</TableHead>
                                            <TableHead>Calificación</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {trainers.map((trainer) => (
                                            <TableRow key={trainer.id}>
                                                <TableCell className="font-medium">{trainer.name}</TableCell>
                                                <TableCell>{trainer.specialty}</TableCell>
                                                <TableCell>{trainer.clients}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <span className="mr-1">⭐</span>
                                                        {trainer.rating}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="default">{trainer.status}</Badge>
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