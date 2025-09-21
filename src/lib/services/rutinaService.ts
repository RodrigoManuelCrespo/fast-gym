import { authFetch } from "@/lib/authFetch"

const BASE_URL = "/api/rutinas"

export const rutinaService = {
    crearRutina: async (data: unknown) => {
        return authFetch(BASE_URL, {
            method: "POST",
            body: JSON.stringify(data),
        })
    },
}
