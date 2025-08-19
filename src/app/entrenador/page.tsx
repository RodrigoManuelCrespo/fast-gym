"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, ClipboardList } from "lucide-react"

// Simulación de datos (más adelante se puede obtener desde una API o DB)
const trainerName = "Arnold"; // Esto idealmente vendrá de sesión o props
const assignedClients = 0; // Simula cantidad de clientes

export default function TrainerDashboard() {
    return (
        <div className="p-4 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Hola, {trainerName}</h1>
                <p className="text-muted-foreground">Este es tu panel de entrenador</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Clientes Asignados</CardTitle>
                        <Users className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{assignedClients}</div>
                        <p className="text-xs text-muted-foreground">
                            {assignedClients > 0 ? "Clientes activos en seguimiento" : "Aún no tenés clientes asignados"}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rutinas</CardTitle>
                        <ClipboardList className="h-4 w-4 text-emerald-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">Aún no tenés rutinas cargadas</p>
                    </CardContent>
                </Card>
            </div>

            {/* Acciones futuras (botones, accesos rápidos, etc.) */}
            <div className="flex flex-wrap gap-4">
                <Button disabled>Agregar rutina</Button>
                <Button variant="outline" disabled>Ver clientes</Button>
            </div>
        </div>
    )
}
