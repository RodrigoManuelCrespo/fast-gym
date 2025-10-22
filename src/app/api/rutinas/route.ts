import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import { withAuthRoute } from "@/lib/withAuthRoute"
import { Rutina } from "@/models/RutinaModel"

export async function GET(req: Request) {
    const result = await withAuthRoute(req, ["entrenador", "cliente"])
    if (!("user" in result)) return result

    try {
        await connectToDB()

        let rutinas

        if (result.user.role === "entrenador") {
            rutinas = await Rutina.find({ entrenadorId: result.user.id })
                .populate("clienteId", "nombre apellido")
                .sort({ createdAt: -1 })
        } else {
            rutinas = await Rutina.find({ clienteId: result.user.id })
                .populate("entrenadorId", "nombre apellido")
                .sort({ createdAt: -1 })
        }

        return NextResponse.json({ data: rutinas }, { status: 200 })
    } catch (error) {
        console.error("Error al obtener rutinas:", error)
        return NextResponse.json({ error: "Error al obtener rutinas" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const result = await withAuthRoute(req, ["entrenador"])
    if (!("user" in result)) return result

    try {
        const { nombre, descripcion, clienteId, dias, ejercicios, observaciones } = await req.json()

        if (!nombre || !clienteId || !Array.isArray(ejercicios) || ejercicios.length === 0) {
            return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 })
        }

        // 🔹 Validación de estructura de ejercicios (opcional pero recomendable)
        const ejerciciosValidados = ejercicios.map((e) => ({
            ejercicioId: e.ejercicioId,
            series: e.series,
            repeticiones: e.repeticiones,
            descanso: e.descanso,
            observacion: e.observacion || "", // asegurar campo siempre presente
        }))

        await connectToDB()

        const nuevaRutina = await Rutina.create({
            nombre,
            descripcion,
            clienteId,
            entrenadorId: result.user.id,
            dias,
            ejercicios: ejerciciosValidados,
            observaciones,
        })

        return NextResponse.json({ message: "Rutina creada", data: nuevaRutina }, { status: 201 })
    } catch (error) {
        console.error("Error al crear rutina:", error)
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}