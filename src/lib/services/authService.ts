import { DatosRegistro } from "@/types/AuthTypes"

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
        const res = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })

        const data = await res.json()

        if (!res.ok) throw new Error(data.error || "Error al registrar")

        return data
    },
}
