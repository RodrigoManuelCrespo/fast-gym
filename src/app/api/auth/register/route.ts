import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import { User } from "@/models/UserModel"
import bcrypt from "bcryptjs"
import { withAuthRoute } from "@/lib/withAuthRoute"

export async function POST(req: Request) {
    // ✅ Solo permite admins
    const result = await withAuthRoute(req, ["admin"])
    if (!("user" in result)) return result

    try {
        const { email, password, role, nombre, apellido, telefono, dni } = await req.json()

        if (!email || !role) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
        }

        if (role === "cliente" || role === "entrenador") {
            if (!nombre || !apellido || !dni) {
                return NextResponse.json({ error: "Faltan nombre, apellido o DNI" }, { status: 400 })
            }
        }

        await connectToDB()

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ error: "El usuario ya existe" }, { status: 409 })
        }

        const plainPassword = password || dni
        const hashedPassword = await bcrypt.hash(plainPassword, 10)

        const newUser = await User.create({
            email,
            password: hashedPassword,
            role,
            nombre,
            apellido,
            telefono,
            dni,
        })

        return NextResponse.json({ message: "Usuario creado", user: newUser }, { status: 201 })
    } catch (error) {
        console.error("Error al registrar usuario:", error)
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
