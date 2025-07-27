export async function authFetch<T = unknown>(input: RequestInfo, init: RequestInit = {}): Promise<T> {
    const token = localStorage.getItem("token")

    const headers = {
        ...init.headers,
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    const response = await fetch(input, { ...init, headers })

    const data = await response.json()

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
            // 🔐 Redirige al login si no está autorizado
            if (typeof window !== "undefined") {
                localStorage.removeItem("token")
                window.location.href = "/login" // o "/"
            }
        }

        throw new Error(data.error || "Error en la solicitud")
    }

    return data
}
