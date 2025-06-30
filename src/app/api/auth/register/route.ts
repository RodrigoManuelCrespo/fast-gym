import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const { name, email, password, role } = await req.json()

        if (!name || !email || !password) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
        }

        await connectToDB()

        const userExists = await User.findOne({ email })
        if (userExists) {
            return NextResponse.json({ error: "El usuario ya existe" }, { status: 409 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || "cliente",
        })

        await newUser.save()

        return NextResponse.json({ message: "Usuario registrado correctamente" }, { status: 201 })
    } catch (error) {
        console.error("Error en register:", error)
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
