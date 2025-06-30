import { connectToDB } from "@/lib/mongodb"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await connectToDB()
        return NextResponse.json({ message: "✅ Conexión a MongoDB exitosa" }, { status: 200 })
    } catch (error) {
        console.error("❌ Error conectando a la BD:", error)
        return NextResponse.json({ error: "Error conectando a la BD" }, { status: 500 })
    }
}
