"use client"

import { ArrowLeft, Clock, Target, Info, Dumbbell, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useState } from "react"

// Datos de ejemplo para la rutina
const routineInfo = {
    name: "Fuerza Superior",
    duration: "45 min",
    difficulty: "Intermedio",
    date: "Miércoles, 24 Ene",
    totalExercises: 6,
}

const exerciseData = [
    {
        id: 1,
        name: "Press de Banca",
        muscleGroup: "Pecho",
        sets: 4,
        reps: "8-10",
        weight: "80 kg",
        restTime: "2 min",
        instructions: [
            "Acuéstate en el banco con los pies firmes en el suelo",
            "Agarra la barra con las manos separadas al ancho de los hombros",
            "Baja la barra controladamente hasta tocar el pecho",
            "Empuja la barra hacia arriba hasta extender completamente los brazos",
        ],
        tips: "Mantén la espalda pegada al banco y los omóplatos retraídos",
        imageUrl: "/placeholder.svg?height=200&width=350&text=Press+de+Banca",
    },
    {
        id: 2,
        name: "Remo con Barra",
        muscleGroup: "Espalda",
        sets: 4,
        reps: "8-10",
        weight: "70 kg",
        restTime: "2 min",
        instructions: [
            "Párate con los pies separados al ancho de los hombros",
            "Inclínate hacia adelante manteniendo la espalda recta",
            "Agarra la barra con las palmas hacia abajo",
            "Tira de la barra hacia el abdomen apretando los omóplatos",
        ],
        tips: "Mantén el core activado y evita usar impulso",
        imageUrl: "/placeholder.svg?height=200&width=350&text=Remo+con+Barra",
    },
    {
        id: 3,
        name: "Press Militar",
        muscleGroup: "Hombros",
        sets: 3,
        reps: "10-12",
        weight: "50 kg",
        restTime: "90 seg",
        instructions: [
            "Párate erguido con los pies separados al ancho de los hombros",
            "Coloca la barra a la altura de los hombros",
            "Empuja la barra hacia arriba hasta extender completamente los brazos",
            "Baja controladamente hasta la posición inicial",
        ],
        tips: "Mantén el core activado y evita arquear la espalda",
        imageUrl: "/placeholder.svg?height=200&width=350&text=Press+Militar",
    },
    {
        id: 4,
        name: "Dominadas",
        muscleGroup: "Espalda",
        sets: 3,
        reps: "6-8",
        weight: "Peso corporal",
        restTime: "2.5 min",
        instructions: [
            "Cuelga de la barra con las palmas hacia adelante",
            "Separa las manos al ancho de los hombros",
            "Tira de tu cuerpo hacia arriba hasta que la barbilla pase la barra",
            "Baja controladamente hasta la posición inicial",
        ],
        tips: "Si no puedes hacer dominadas completas, usa banda elástica de asistencia",
        imageUrl: "/placeholder.svg?height=200&width=350&text=Dominadas",
    },
    {
        id: 5,
        name: "Curl de Bíceps",
        muscleGroup: "Brazos",
        sets: 3,
        reps: "12-15",
        weight: "25 kg",
        restTime: "1 min",
        instructions: [
            "Párate erguido con los pies separados al ancho de los hombros",
            "Agarra la barra con las palmas hacia arriba",
            "Mantén los codos pegados al cuerpo",
            "Flexiona los brazos llevando la barra hacia el pecho",
        ],
        tips: "Evita balancear el cuerpo, el movimiento debe ser controlado",
        imageUrl: "/placeholder.svg?height=200&width=350&text=Curl+de+Biceps",
    },
    {
        id: 6,
        name: "Extensión de Tríceps",
        muscleGroup: "Brazos",
        sets: 3,
        reps: "12-15",
        weight: "12 kg",
        restTime: "1 min",
        instructions: [
            "Siéntate en un banco con respaldo",
            "Sostén una mancuerna con ambas manos por encima de la cabeza",
            "Baja la mancuerna detrás de la cabeza flexionando solo los antebrazos",
            "Extiende los brazos para volver a la posición inicial",
        ],
        tips: "Mantén los codos fijos y cerca de la cabeza durante todo el movimiento",
        imageUrl: "/placeholder.svg?height=200&width=350&text=Extension+Triceps",
    },
]

export default function MobileExerciseRoutine() {
    const [expandedExercises, setExpandedExercises] = useState<number[]>([])
    const [completedExercises] = useState<number[]>([])

    const toggleExercise = (exerciseId: number) => {
        setExpandedExercises((prev) =>
            prev.includes(exerciseId) ? prev.filter((id) => id !== exerciseId) : [...prev, exerciseId],
        )
    }

    const progressPercentage = (completedExercises.length / exerciseData.length) * 100

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="bg-gray-800 shadow-lg shadow-gray-900/20 sticky top-0 z-10">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <div>
                                <h1 className="text-lg font-bold text-white">{routineInfo.name}</h1>
                                <div className="flex items-center space-x-3 text-xs text-gray-400">
                                    <div className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {routineInfo.duration}
                                    </div>
                                    <div className="flex items-center">
                                        <Target className="h-3 w-3 mr-1" />
                                        {routineInfo.difficulty}
                                    </div>
                                    <div className="flex items-center">
                                        <Dumbbell className="h-3 w-3 mr-1" />
                                        {completedExercises.length}/{routineInfo.totalExercises} completados
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                        <span>{routineInfo.date}</span>
                        <span>{Math.round(progressPercentage)}% completado</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                </div>
            </div>

            {/* Exercise List */}
            <div className="px-4 py-4 space-y-4">
                {exerciseData.map((exercise, index) => (
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        index={index}
                        isExpanded={expandedExercises.includes(exercise.id)}
                        onToggle={() => toggleExercise(exercise.id)}
                    />
                ))}
            </div>
        </div>
    )
}

interface ExerciseCardProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exercise: any
    index: number
    isExpanded: boolean
    onToggle: () => void
}

function ExerciseCard({ exercise, index, isExpanded, onToggle }: ExerciseCardProps) {
    const [isCompleted, setIsCompleted] = useState(false)

    return (
        <Card
            className={`border-gray-700 overflow-hidden transition-all duration-200 ${isCompleted ? "bg-green-900/20 border-green-600/50" : "bg-gray-800"
                }`}
        >
            <CardContent className="p-0">
                {/* Exercise Header */}
                <div className="p-4">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3 flex-1">
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${isCompleted ? "bg-green-600 text-white" : "bg-blue-600 text-white"
                                    }`}
                            >
                                {index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3
                                    className={`text-lg font-semibold mb-2 ${isCompleted ? "text-green-400 line-through" : "text-white"}`}
                                >
                                    {exercise.name}
                                </h3>
                                <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs mb-3">
                                    {exercise.muscleGroup}
                                </Badge>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            {/* Checkbox */}
                            <button
                                onClick={() => setIsCompleted(!isCompleted)}
                                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${isCompleted ? "bg-green-600 border-green-600" : "border-gray-500 hover:border-gray-400"
                                    }`}
                            >
                                {isCompleted && (
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                )}
                            </button>

                            {/* Expand button */}
                            <Button variant="ghost" size="sm" onClick={onToggle} className="text-gray-400 hover:text-white p-2">
                                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    {/* Exercise Stats - Mejorado */}
                    <div className="bg-gray-700/30 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Series:</span>
                                <span className="text-lg font-bold text-white">{exercise.sets}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Reps:</span>
                                <span className="text-lg font-bold text-white">{exercise.reps}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Peso:</span>
                                <span className="text-lg font-bold text-white">{exercise.weight}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-400">Descanso:</span>
                                <span className="text-lg font-bold text-white">{exercise.restTime}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                    <div className="border-t border-gray-700">
                        {/* Exercise Image */}
                        <div className="p-4 pb-3">
                            <img
                                src={exercise.imageUrl || "/placeholder.svg"}
                                alt={exercise.name}
                                className="w-full h-48 object-cover rounded-lg bg-gray-700"
                            />
                        </div>

                        {/* Instructions */}
                        <div className="px-4 pb-4">
                            <div className="bg-gray-700/30 rounded-lg p-4">
                                <h4 className="text-white font-semibold mb-3 flex items-center text-sm">
                                    <Info className="h-4 w-4 mr-2 text-blue-600" />
                                    Técnica de ejecución
                                </h4>
                                <ol className="space-y-2 text-sm text-gray-300 mb-4">
                                    {exercise.instructions.map((instruction: string, idx: number) => (
                                        <li key={idx} className="flex">
                                            <span className="text-blue-600 font-medium mr-2 flex-shrink-0">{idx + 1}.</span>
                                            <span>{instruction}</span>
                                        </li>
                                    ))}
                                </ol>

                                {/* Tips */}
                                <div className="bg-yellow-600/20 rounded-lg p-3 border-l-4 border-yellow-600">
                                    <p className="text-sm text-yellow-200">
                                        <strong className="text-yellow-100">Consejo:</strong> {exercise.tips}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
