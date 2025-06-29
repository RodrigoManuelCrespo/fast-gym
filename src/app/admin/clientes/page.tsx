"use client"
import {
    Calendar,
    CreditCard,
    DollarSign,
    FileText,
    MoreHorizontal,
    Plus,
    Users,
    UserCheck,
    AlertTriangle,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos de ejemplo


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
                <Tabs defaultValue="clients" className="space-y-4">
                    <TabsContent value="clients" className="space-y-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle>Clientes</CardTitle>
                                    <CardDescription>Últimos Clientes registrados</CardDescription>
                                </div>
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Agregar Cliente
                                </Button>
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
                    </TabsContent>

                    <TabsContent value="trainers" className="space-y-4">
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
                    </TabsContent>

                    <TabsContent value="memberships" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Membresías por Vencer</CardTitle>
                                    <CardDescription>Próximas a vencer en los próximos 30 días</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentClients
                                            .filter((client) => client.status === "Activo")
                                            .slice(0, 3)
                                            .map((client) => (
                                                <div key={client.id} className="flex items-center justify-between p-3 border rounded-lg">
                                                    <div>
                                                        <p className="font-medium">{client.name}</p>
                                                        <p className="text-sm text-muted-foreground">Vence: {client.expiryDate}</p>
                                                    </div>
                                                    <Button size="sm" variant="outline">
                                                        Renovar
                                                    </Button>
                                                </div>
                                            ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Pagos Pendientes</CardTitle>
                                    <CardDescription>Clientes con pagos atrasados</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recentClients
                                            .filter((client) => client.status === "Vencido")
                                            .map((client) => (
                                                <div
                                                    key={client.id}
                                                    className="flex items-center justify-between p-3 border rounded-lg border-red-200"
                                                >
                                                    <div>
                                                        <p className="font-medium">{client.name}</p>
                                                        <p className="text-sm text-red-600">Vencido desde: {client.expiryDate}</p>
                                                    </div>
                                                    <Button size="sm" variant="destructive">
                                                        Contactar
                                                    </Button>
                                                </div>
                                            ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
    )
}
