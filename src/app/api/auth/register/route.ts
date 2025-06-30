import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const { email, password, role } = await req.json()

        if (!email || !password || !role) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
        }

        await connectToDB()

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return NextResponse.json({ error: "El usuario ya existe" }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            email,
            password: hashedPassword,
            role,
        })

        return NextResponse.json({ message: "Usuario creado", user: newUser }, { status: 201 })
    } catch (error) {
        console.error("Error al registrar usuario:", error)
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
