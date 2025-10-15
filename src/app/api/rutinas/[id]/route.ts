import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import { withAuthRoute } from "@/lib/withAuthRoute"
import { Rutina } from "@/models/RutinaModel"
import { Ejercicio } from "@/models/EjercicioModel"

export async function GET(req: Request, context: { params: { id: string } }) {
    const { params } = context

    const result = await withAuthRoute(req, ["entrenador", "cliente"])
    if (!("user" in result)) return result

    try {
        await connectToDB()
        console.log(Ejercicio.modelName) // fuerza el registro del schema

        const rutina = await Rutina.findById(params.id)
            .populate("clienteId", "nombre apellido")
            .populate("entrenadorId", "nombre apellido")
            .populate("ejercicios.ejercicioId")

        if (!rutina) {
            return NextResponse.json({ error: "Rutina no encontrada" }, { status: 404 })
        }

        if (
            result.user.role === "cliente" &&
            rutina.clienteId._id.toString() !== result.user.id
        ) {
            return NextResponse.json({ error: "Acceso no autorizado" }, { status: 403 })
        }

        return NextResponse.json({ data: rutina }, { status: 200 })
    } catch (error) {
        console.error("Error al obtener rutina por ID:", error)
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
