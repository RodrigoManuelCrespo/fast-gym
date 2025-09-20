"use client"
import {
    CreditCard,
    DollarSign,
    FileText,
    Plus,
    Users,
    UserCheck,
    AlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"


// Datos de ejemplo
const stats = [
    {
        title: "Total Clientes",
        value: "1,234",
        change: "+12%",
        icon: Users,
        color: "text-blue-600",
    },
    {
        title: "Entrenadores Activos",
        value: "45",
        change: "+3%",
        icon: UserCheck,
        color: "text-green-600",
    },
    {
        title: "Ingresos del Mes",
        value: "$45,231",
        change: "+18%",
        icon: DollarSign,
        color: "text-emerald-600",
    },
    {
        title: "Membresías por Vencer",
        value: "23",
        change: "-5%",
        icon: AlertTriangle,
        color: "text-orange-600",
    },
]

export default function AdminDashboard() {
    return (
        <div>

            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                {/* Estadísticas principales */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground">
                                    <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                                        {stat.change}
                                    </span>{" "}
                                    desde el mes pasado
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Acciones rápidas */}
                <Card>
                    <CardHeader>
                        <CardTitle>Acciones Rápidas</CardTitle>
                        <CardDescription>Gestiona rápidamente las operaciones principales del gimnasio</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Button className="h-20 flex-col gap-2">
                                <Plus className="h-5 w-5" />
                                Nuevo Cliente
                            </Button>
                            <Button className="h-20 flex-col gap-2">
                                <Link href="/admin/entrenadores/nuevo-entrenador" className="flex flex-col items-center">
                                    <UserCheck className="h-5 w-5" />
                                    Nuevo Entrenador
                                </Link>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col gap-2">
                                <CreditCard className="h-5 w-5" />
                                Registrar Pago
                            </Button>
                            <Button variant="outline" className="h-20 flex-col gap-2">
                                <FileText className="h-5 w-5" />
                                Generar Reporte
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

