import { authFetch } from "@/lib/authFetch"
import { RegistroPago } from "@/types/PagoType"

const BASE_URL = "/api/pagos"

export const pagoService = {
    registrarPago: async (data: RegistroPago) => {
        return authFetch(`${BASE_URL}/registrar-pago`, {
            method: "POST",
            body: JSON.stringify(data),
        })
    },
}
