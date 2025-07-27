import { NextResponse } from "next/server"
import { verifyJWT } from "@/lib/jwt"

export type UserFromToken = {
    id: string
    role: "admin" | "cliente" | "entrenador"
}

export async function withAuthRoute(
    req: Request,
    allowedRoles: string[] = []
): Promise<{ user: UserFromToken } | NextResponse> {
    const authHeader = req.headers.get("authorization")
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null

    if (!token) {
        return NextResponse.json({ error: "Token no proporcionado" }, { status: 401 })
    }

    const user = verifyJWT<UserFromToken>(token)

    if (!user) {
        return NextResponse.json({ error: "Token inválido o expirado" }, { status: 401 })
    }

    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return NextResponse.json({ error: "Acceso denegado" }, { status: 403 })
    }

    return { user }
}
