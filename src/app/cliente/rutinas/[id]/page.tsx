"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Clock, Dumbbell, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { rutinaService } from "@/lib/services/rutinaService"
import { useRouter } from "next/navigation"
import type { Rutina } from "@/types/RutinaType"

export default function RutinaDetallePage() {
    const [rutina, setRutina] = useState<Rutina | null>(null)
    const [expanded, setExpanded] = useState<number[]>([])
    const [completados, setCompletados] = useState<number[]>([])
    const params = useParams()
    const router = useRouter()

    useEffect(() => {
        const fetchRutina = async () => {
            try {
                const res = await rutinaService.obtenerRutinaPorId(params.id as string)
                setRutina(res.data)
            } catch (error) {
                console.error("Error al cargar rutina", error)
            }
        }

        fetchRutina()
    }, [params.id])

    if (!rutina) return <p className="text-center text-gray-400 p-6">Cargando rutina...</p>

    const toggle = (index: number) => {
        setExpanded((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        )
    }

    const marcarCompletado = (index: number) => {
        setCompletados((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        )
    }

    const progreso = (completados.length / rutina.ejercicios.length) * 100

    return (
        <div className="min-h-screen bg-gray-900">
            <div className="bg-gray-800 sticky top-0 z-10 shadow-md">
                <div className="max-w-2xl mx-auto px-4 py-6">
                    <div className="flex items-center space-x-3 mb-3">
                        <Button variant="ghost" size="sm" className="text-gray-300 p-2" onClick={() => router.back()}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-lg font-bold text-white">{rutina.nombre}</h1>
                            <div className="flex gap-3 text-xs text-gray-400 mt-1">
                                <div className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" /> {rutina.ejercicios.length} ejercicios
                                </div>
                                <div className="flex items-center">
                                    <Dumbbell className="h-3 w-3 mr-1" /> Estado: {rutina.estado}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                        <span>
                            <Calendar className="inline h-3 w-3 mr-1" />
                            {new Date(rutina.fechaAsignacion).toLocaleDateString("es-AR")}
                        </span>
                        <span>{Math.round(progreso)}% completado</span>
                    </div>
                    <Progress value={progreso} className="h-2" />
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
                {rutina.ejercicios.map((ej, index) => (
                    console.log(ej),
                    <Card
                        key={index}
                        className={`overflow-hidden transition-all ${completados.includes(index)
                            ? "bg-green-900/20 border-green-600"
                            : "bg-gray-800 border-gray-700"
                            }`}
                    >
                        <CardContent className="p-0">
                            <div className="p-4">
                                <div className="flex justify-between mb-4">
                                    <div className="flex space-x-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${completados.includes(index) ? "bg-green-600" : "bg-blue-600"}`}>
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className={`text-lg font-semibold ${completados.includes(index) ? "text-green-400 line-through" : "text-white"}`}>
                                                {ej.ejercicioId.nombre}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        {/* Check */}
                                        <button
                                            onClick={() => marcarCompletado(index)}
                                            className={`w-6 h-6 rounded border-2 flex items-center justify-center ${completados.includes(index)
                                                ? "bg-green-600 border-green-600"
                                                : "border-gray-500 hover:border-gray-400"
                                                }`}
                                        >
                                            {completados.includes(index) && (
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                        {/* Expand */}
                                        <Button variant="ghost" size="sm" onClick={() => toggle(index)} className="p-2 text-gray-400">
                                            {expanded.includes(index) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 text-sm bg-gray-700/30 rounded-lg p-4">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Series:</span>
                                        <span className="text-white font-bold">{ej.series}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Reps:</span>
                                        <span className="text-white font-bold">{ej.repeticiones}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Descanso:</span>
                                        <span className="text-white font-bold">{ej.descanso}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Expandido */}
                            {expanded.includes(index) && (
                                <div className="border-t border-gray-700 p-4">
                                    {ej.ejercicioId.imagen && (
                                        <Image
                                            src={ej.ejercicioId.imagen}
                                            alt={ej.ejercicioId.nombre}
                                            width={800}
                                            height={384}
                                            className="w-full h-48 object-cover rounded-lg bg-gray-700"
                                        />
                                    )}
                                    <div className="bg-yellow-600/20 p-3 border-l-4 border-yellow-600 rounded-lg my-4">
                                        <p className="text-yellow-200 text-sm">
                                            {ej.ejercicioId.descripcion || "Sin descripción disponible."}
                                            {ej.ejercicioId.videoURL && (
                                                <a
                                                    href={ej.ejercicioId.videoURL}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-400 text-sm underline py-6"
                                                >
                                                    Ver video explicativo
                                                </a>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div >
    )
}
