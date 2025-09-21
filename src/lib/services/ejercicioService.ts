import { authFetch } from "@/lib/authFetch"
import { Ejercicio } from "@/types/EjercicioType"

const BASE_URL = "/api/ejercicios"

export const ejercicioService = {
    listarEjercicios: async (): Promise<{ data: Ejercicio[] }> => {
        return authFetch(BASE_URL, { method: "GET" })
    },

    crearEjercicio: async (data: Ejercicio) => {
        return authFetch(BASE_URL, {
            method: "POST",
            body: JSON.stringify(data),
        })
    },
}
