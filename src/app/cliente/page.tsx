"use client"

import { useEffect, useState } from "react"
import { Calendar, Dumbbell, Play, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { rutinaService } from "@/lib/services/rutinaService"
import type { Rutina } from "@/types/RutinaType"
import Link from "next/link"

export default function ClienteHome() {
    const [rutinas, setRutinas] = useState<Rutina[]>([])
    const [clases, setClases] = useState<
        { id: number; nombre: string; fecha: string; hora: string; entrenador: string }[]
    >([])

    useEffect(() => {
        const fetchRutinas = async () => {
            try {
                const res = await rutinaService.listarRutinas()
                setRutinas(res.data)
            } catch (error) {
                console.error("Error al obtener rutinas:", error)
            }
        }

        // Simulamos próximas clases sin backend
        const mockClases = [
            { id: 1, nombre: "Funcional", fecha: "2025-10-23", hora: "18:00", entrenador: "Sofía Gómez" },
            { id: 2, nombre: "Crossfit", fecha: "2025-10-25", hora: "19:30", entrenador: "Lucas Torres" },
            { id: 3, nombre: "Spinning", fecha: "2025-10-27", hora: "17:00", entrenador: "Martina Díaz" },
        ]
        setClases(mockClases)

        fetchRutinas()
    }, [])

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="bg-gray-800">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Mis Rutinas</h1>
                            <p className="text-gray-300 text-sm">Entrenamientos activos asignados</p>
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date().toLocaleDateString("es-AR", {
                                weekday: "long",
                                day: "numeric",
                                month: "short",
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Rutinas */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                {rutinas.length === 0 ? (
                    <p className="text-gray-400 text-center">No tenés rutinas asignadas por el momento.</p>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {rutinas.map((rutina) => (
                            <RoutineCard key={rutina._id} routine={rutina} />
                        ))}
                    </div>
                )}
            </div>

            {/* 🔹 Próximas clases */}
            <div className="max-w-4xl mx-auto px-4 mt-6">
                <Card className="bg-gray-800 border border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white text-lg flex items-center">
                            <Clock className="h-5 w-5 mr-2 text-blue-400" /> Próximas Clases
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {clases.map((clase) => (
                            <div
                                key={clase.id}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-700 pb-2 last:border-none"
                            >
                                <div>
                                    <p className="font-medium text-white">{clase.nombre}</p>
                                    <p className="text-gray-400 text-sm">
                                        {new Date(clase.fecha).toLocaleDateString("es-AR")} – {clase.hora} hs
                                    </p>
                                    <p className="text-gray-500 text-xs">Entrenador: {clase.entrenador}</p>
                                </div>
                                <Button
                                    size="sm"
                                    className="mt-2 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Ver Detalles
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

// Componente de tarjeta de rutina
interface RoutineCardProps {
    routine: Rutina
}

function RoutineCard({ routine }: RoutineCardProps) {
    const IconComponent = Dumbbell
    const color = "bg-gradient-to-br from-blue-500 to-blue-600"

    return (
        <Card className="bg-gray-800 border border-gray-700 hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <CardContent className="p-0">
                {/* Header con gradiente */}
                <div className={`${color} p-4 text-white`}>
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-semibold text-lg mb-1">{routine.nombre}</h3>
                            <div className="flex items-center gap-3 text-sm text-white/90">
                                <span className="text-xs capitalize">{routine.estado}</span>
                            </div>
                        </div>
                        <div className="bg-white/20 p-2 rounded-lg">
                            <IconComponent className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                {/* Detalles */}
                <div className="p-4 space-y-3">
                    {/* Días */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Días:</span>
                        <div className="flex gap-1 flex-wrap justify-end">
                            {routine.dias.map((dia) => (
                                <Badge key={dia} variant="secondary" className="text-xs px-2 py-1">
                                    {dia}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Fecha asignación */}
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">Asignado el:</span>
                        <span className="text-sm text-white">
                            {new Date(routine.fechaAsignacion).toLocaleDateString("es-AR")}
                        </span>
                    </div>

                    {/* Botón */}
                    <Link href={`/cliente/rutinas/${routine._id}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                            <Play className="h-4 w-4 mr-2" />
                            Ver Detalles
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}