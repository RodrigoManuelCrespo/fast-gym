import { DatosRegistro } from "@/types/AuthType"
import { authFetch } from "@/lib/authFetch"

const BASE_URL = "/api/auth"

export const authService = {
    login: async (email: string, password: string) => {
        const res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()

        if (!res.ok) throw new Error(data.error || "Error al iniciar sesión")

        localStorage.setItem("token", data.token)

        return data
    },

    register: async (formData: DatosRegistro) => {
        return authFetch(`${BASE_URL}/register`, {
            method: "POST",
            body: JSON.stringify(formData),
        })
    },
}
