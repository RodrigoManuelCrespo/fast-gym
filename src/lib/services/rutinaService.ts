import { authFetch } from "@/lib/authFetch"
import { Rutina } from "@/types/RutinaType"

const BASE_URL = "/api/rutinas"

export const rutinaService = {

    listarRutinas: async (): Promise<{ data: Rutina[] }> => {
        return authFetch(`${BASE_URL}`, {
            method: "GET",
        })
    },

    obtenerRutinaPorId: async (id: string): Promise<{ data: Rutina }> => {
        return authFetch(`${BASE_URL}/${id}`, {
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
