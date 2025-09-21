import { authFetch } from "@/lib/authFetch"
import { Rutina } from "@/types/RutinaType"

const BASE_URL = "/api/rutinas"

export const rutinaService = {

    listarRutina: async (): Promise<{ data: Rutina[] }> => {
        return authFetch(`${BASE_URL}`, {
            method: "GET",
        })
    },

    crearRutina: async (data: unknown) => {
        return authFetch(BASE_URL, {
            method: "POST",
            body: JSON.stringify(data),
        })
    },
}
