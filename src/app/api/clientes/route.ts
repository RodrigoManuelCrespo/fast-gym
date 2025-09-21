import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import { User } from "@/models/UserModel"
import { withAuthRoute } from "@/lib/withAuthRoute"

export async function GET(req: Request) {
    const result = await withAuthRoute(req, ["admin", "entrenador"])
    if (!("user" in result)) return result

    try {
        await connectToDB()

        const clientes = await User.find({ role: "cliente" }).select("-password")

        return NextResponse.json({ data: clientes }, { status: 200 })
    } catch (error) {
        console.error("Error al obtener clientes:", error)
        return NextResponse.json({ error: "Error al obtener clientes" }, { status: 500 })
    }
}
