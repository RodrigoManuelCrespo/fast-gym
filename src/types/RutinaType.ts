// types/RutinaType.ts
export interface Rutina {
    _id: string
    nombre: string
    descripcion?: string
    clienteId: {
        nombre: string
        apellido: string
    }
    dias: string[]
    estado: "activa" | "completada" | "suspendida"
    fechaAsignacion: string
}
