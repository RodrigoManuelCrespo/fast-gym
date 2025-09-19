import { authFetch } from "@/lib/authFetch"
import { Cliente } from "@/types/ClienteType"

const BASE_URL = "/api/clientes"

export const clienteService = {
    clientes: async (): Promise<{ data: Cliente[] }> => {
        return authFetch(`${BASE_URL}`, { method: "GET" })
    },
}
