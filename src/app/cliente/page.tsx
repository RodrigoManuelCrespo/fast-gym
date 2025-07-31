import { Clock, Calendar, Play, ChevronRight, Dumbbell, Target, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo para las rutinas
const routines = [
    {
        id: 1,
        name: "Fuerza Superior",
        duration: "45 min",
        days: ["Lun", "Mié", "Vie"],
        progress: 75,
        nextSession: "Hoy",
        difficulty: "Intermedio",
        exercises: 8,
        icon: Dumbbell,
        color: "bg-gradient-to-br from-blue-500 to-blue-600",
        lightColor: "bg-blue-50 text-blue-700",
    },
    {
        id: 2,
        name: "Cardio HIIT",
        duration: "30 min",
        days: ["Mar", "Jue", "Sáb"],
        progress: 60,
        nextSession: "Mañana",
        difficulty: "Avanzado",
        exercises: 6,
        icon: Zap,
        color: "bg-gradient-to-br from-orange-500 to-red-500",
        lightColor: "bg-orange-50 text-orange-700",
    },
    {
        id: 3,
        name: "Tren Inferior",
        duration: "50 min",
        days: ["Lun", "Jue"],
        progress: 40,
        nextSession: "Viernes",
        difficulty: "Intermedio",
        exercises: 10,
        icon: Target,
        color: "bg-gradient-to-br from-green-500 to-emerald-600",
        lightColor: "bg-green-50 text-green-700",
    },
]

export default function GymHomeScreen() {
    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <div className="bg-gray-800 shadow-lg shadow-gray-900/20">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Hola, Juan 👋</h1>
                            <p className="text-gray-300 mt-1">¿Listo para entrenar hoy?</p>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Calendar className="h-4 w-4" />
                            <span>Miércoles, 24 Ene</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">12</div>
                            <div className="text-sm text-gray-300">Entrenamientos</div>
                            <div className="text-xs text-gray-400">esta semana</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-green-600">8.5</div>
                            <div className="text-sm text-gray-300">Horas</div>
                            <div className="text-xs text-gray-400">total</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-orange-600">420</div>
                            <div className="text-sm text-gray-300">Calorías</div>
                            <div className="text-xs text-gray-400">promedio</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600">85%</div>
                            <div className="text-sm text-gray-300">Consistencia</div>
                            <div className="text-xs text-gray-400">este mes</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Routines Section */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">Tus Rutinas</h2>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            Ver todas
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>

                    {/* Routines Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {routines.map((routine) => (
                            <RoutineCard key={routine.id} routine={routine} />
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm">
                    <h3 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Button
                            variant="outline"
                            className="h-auto py-3 flex-col space-y-2 bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-gray-200"
                        >
                            <Play className="h-5 w-5 text-blue-600" />
                            <span className="text-sm">Entrenar Ahora</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-auto py-3 flex-col space-y-2 bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-gray-200"
                        >
                            <Calendar className="h-5 w-5 text-green-600" />
                            <span className="text-sm">Programar</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-auto py-3 flex-col space-y-2 bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-gray-200"
                        >
                            <Target className="h-5 w-5 text-orange-600" />
                            <span className="text-sm">Mis Metas</span>
                        </Button>
                        <Button
                            variant="outline"
                            className="h-auto py-3 flex-col space-y-2 bg-gray-700/50 border-gray-600 hover:bg-gray-700 text-gray-200"
                        >
                            <Dumbbell className="h-5 w-5 text-purple-600" />
                            <span className="text-sm">Historial</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface RoutineCardProps {
    routine: {
        id: number
        name: string
        duration: string
        days: string[]
        progress: number
        nextSession: string
        difficulty: string
        exercises: number
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        icon: any
        color: string
        lightColor: string
    }
}

function RoutineCard({ routine }: RoutineCardProps) {
    const IconComponent = routine.icon

    return (
        <Card className="bg-gray-800 border border-gray-700 hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <CardContent className="p-0">
                {/* Header with gradient */}
                <div className={`${routine.color} p-4 text-white relative`}>
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1">{routine.name}</h3>
                            <div className="flex items-center space-x-3 text-white/90 text-sm">
                                <div className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {routine.duration}
                                </div>
                                <div>{routine.exercises} ejercicios</div>
                            </div>
                        </div>
                        <div className="bg-white/20 p-2 rounded-lg">
                            <IconComponent className="h-6 w-6" />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Progress */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-200">Progreso</span>
                            <span className="text-sm text-gray-300">{routine.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${routine.progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Days and Info */}
                    <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">Días:</span>
                            <div className="flex space-x-1">
                                {routine.days.map((day) => (
                                    <Badge key={day} variant="secondary" className="text-xs px-2 py-1">
                                        {day}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">Próxima sesión:</span>
                            <span className="text-sm font-medium text-white">{routine.nextSession}</span>
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-300">Dificultad:</span>
                            <Badge className={routine.lightColor}>{routine.difficulty}</Badge>
                        </div>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Play className="h-4 w-4 mr-2" />
                        Ver Detalles
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
