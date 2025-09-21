export interface Rutina {
    _id: string
    clienteId: {
        nombre: string
        apellido: string
    }
    nombre: string
    descripcion?: string
    dias: string[]
    estado: "activa" | "completada" | "suspendida"
    fechaAsignacion: string
    ejercicios: {
        ejercicioId: {
            _id: string
            nombre: string
            descripcion?: string
            videoURL?: string
            imagen?: string
        }
        series: number
        repeticiones: number
        descanso: string
    }[]
}
