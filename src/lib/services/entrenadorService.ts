import { authFetch } from "@/lib/authFetch"
import { Entrenador } from "@/types/EntrenadorType"

const BASE_URL = "/api/entrenadores"

export const entrenadorService = {
    entrenadores: async (): Promise<{ data: Entrenador[] }> => {
        return authFetch(`${BASE_URL}`, { method: "GET" })
    },
}