export interface Cliente {
    _id: string
    nombre: string
    apellido: string
    email: string
    telefono?: string
    dni: string
    role: "cliente"
    createdAt: string
    updatedAt: string
    __v?: number
}
