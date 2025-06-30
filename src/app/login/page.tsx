"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const res = await fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        })

        const data = await res.json()
        setLoading(false)

        if (!res.ok) {
            console.error(data.error || "Error al iniciar sesión")
            return
        }

        localStorage.setItem("token", data.token)

        // Redirige según el rol
        switch (data.role) {
            case "admin":
                router.push("/admin")
                break
            case "entrenador":
                router.push("/entrenador")
                break
            case "cliente":
                router.push("/cliente")
                break
            default:
                console.error("Rol desconocido")
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <form onSubmit={handleLogin} className="space-y-4 w-full max-w-sm">
                <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>
                <Input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Ingresando..." : "Ingresar"}
                </Button>
            </form>
        </main>
    )
}
