export type RolUsuario = "cliente" | "entrenador" | "admin"

export interface DatosRegistroBase {
    email: string
    role: RolUsuario
    password?: string
}

export interface RegistroCliente extends DatosRegistroBase {
    role: "cliente"
    nombre: string
    apellido: string
    dni: string
    telefono?: string
}

export interface RegistroEntrenador extends DatosRegistroBase {
    role: "entrenador"
    nombre: string
    apellido: string
    dni: string
}

export interface RegistroAdmin extends DatosRegistroBase {
    role: "admin"
}

export type DatosRegistro = RegistroCliente | RegistroEntrenador | RegistroAdmin
