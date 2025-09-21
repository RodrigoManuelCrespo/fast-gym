// /app/api/rutinas/route.ts

import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import { withAuthRoute } from "@/lib/withAuthRoute"
import { Rutina } from "@/models/RutinaModel"

export async function POST(req: Request) {
    const result = await withAuthRoute(req, ["entrenador"])
    if (!("user" in result)) return result

    try {
        const { nombre, descripcion, clienteId, dias, ejercicios, observaciones } = await req.json()

        if (!nombre || !clienteId || !Array.isArray(ejercicios) || ejercicios.length === 0) {
            return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 })
        }

        await connectToDB()

        const nuevaRutina = await Rutina.create({
            nombre,
            descripcion,
            clienteId,
            entrenadorId: result.user.id,
            dias,
            ejercicios,
            observaciones,
        })

        return NextResponse.json({ message: "Rutina creada", data: nuevaRutina }, { status: 201 })
    } catch (error) {
        console.error("Error al crear rutina:", error)
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
