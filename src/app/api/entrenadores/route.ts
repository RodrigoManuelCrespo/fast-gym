/* MODIFICAR PARA ENTRENADOR */

import { NextResponse } from "next/server"
import { connectToDB } from "@/lib/mongodb"
import { User } from "@/models/UserModel"
import { withAuthRoute } from "@/lib/withAuthRoute"

export async function GET(req: Request) {
    const result = await withAuthRoute(req, ["admin"])
    if (!("user" in result)) return result

    try {
        await connectToDB()

        const entrenadores = await User.find({ role: "entrenador" }).select("-password")

        return NextResponse.json({ data: entrenadores }, { status: 200 })
    } catch (error) {
        console.error("Error al obtener entrenadores:", error)
        return NextResponse.json({ error: "Error al obtener entrenadores" }, { status: 500 })
    }
}
