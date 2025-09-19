export interface RegistroPago {
    clienteId: string
    monto: number
    metodo: "efectivo" | "tarjeta" | "transferencia"
    tipoMembresia: "mensual" | "trimestral" | "anual"
    observaciones?: string
}
