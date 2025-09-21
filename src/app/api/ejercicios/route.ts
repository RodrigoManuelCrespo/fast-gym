import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import { Ejercicio } from "@/models/EjercicioModel"
import { withAuthRoute } from "@/lib/withAuthRoute"

export async function GET() {
    try {
        await connectToDB()
        const ejercicios = await Ejercicio.find().sort({ createdAt: -1 })
        return NextResponse.json({ data: ejercicios }, { status: 200 })
    } catch (error) {
        console.error("Error al obtener ejercicios:", error)
        return NextResponse.json({ error: "Error al obtener ejercicios" }, { status: 500 })
    }
}

export async function POST(req: Request) {
    const result = await withAuthRoute(req, ["entrenador"])
    if (!("user" in result)) return result

    try {
        const { nombre, descripcion, imagen, videoURL } = await req.json()

        if (!nombre) {
            return NextResponse.json({ error: "El nombre del ejercicio es obligatorio" }, { status: 400 })
        }

        await connectToDB()
        const nuevo = await Ejercicio.create({ nombre, descripcion, imagen, videoURL })

        return NextResponse.json({ message: "Ejercicio creado", data: nuevo }, { status: 201 })
    } catch (error) {
        console.error("Error al crear ejercicio:", error)
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}