"use client"

import { useEffect, useState } from "react"
import { Calendar, Dumbbell, Play } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { rutinaService } from "@/lib/services/rutinaService"
import type { Rutina } from "@/types/RutinaType"
import Link from "next/link"

export default function ClienteHome() {
    const [rutinas, setRutinas] = useState<Rutina[]>([])

    useEffect(() => {
        const fetchRutinas = async () => {
            try {
                const res = await rutinaService.listarRutinas()
                setRutinas(res.data)
            } catch (error) {
                console.error("Error al obtener rutinas:", error)
            }
        }

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
                                <span className="text-xs">{routine.estado}</span>
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
                        <div className="flex gap-1">
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
