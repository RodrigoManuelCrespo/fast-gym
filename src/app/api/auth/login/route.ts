import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import { User } from "@/models/User"
import { signJWT } from "@/lib/jwt"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        if (!email || !password) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
        }

        await connectToDB()
        const user = await User.findOne({ email }).select("+password")
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 })
        }

        const token = signJWT({ id: user._id, role: user.role })

        return NextResponse.json({ token, role: user.role }, { status: 200 })
    } catch (error) {
        console.error("Error en login:", error)
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
