// app/api/pagos/registrar-con-membresia/route.ts

import { NextResponse } from "next/server"
import { withAuthRoute } from "@/lib/withAuthRoute"
import { connectToDB } from "@/lib/mongodb"
import { Pago } from "@/models/PagoModel"
import { Membresia } from "@/models/MembresiaModel"
import { isValidObjectId } from "mongoose"

const DURACIONES = {
    mensual: 30,
    trimestral: 90,
    anual: 365,
}

export async function POST(req: Request) {
    const result = await withAuthRoute(req, ["admin"])
    if (!("user" in result)) return result

    try {
        const { clienteId, monto, metodo, tipoMembresia, observaciones } = await req.json()

        if (!clienteId || !monto || !metodo || !tipoMembresia) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 })
        }

        if (!isValidObjectId(clienteId)) {
            return NextResponse.json({ error: "ID de cliente inválido" }, { status: 400 })
        }

        await connectToDB()

        // 1. Crear el pago
        const nuevoPago = await Pago.create({
            clienteId,
            monto,
            metodo,
            observaciones,
            registradoPor: result.user.id,
        })

        // 2. Calcular fechas de la membresía
        const hoy = new Date()
        const dias = DURACIONES[tipoMembresia as keyof typeof DURACIONES]
        const fin = new Date(hoy)
        fin.setDate(hoy.getDate() + dias)

        // 3. Crear la membresía
        const nuevaMembresia = await Membresia.create({
            clienteId,
            tipo: tipoMembresia,
            inicio: hoy,
            fin,
            activa: true,
        })

        return NextResponse.json(
            {
                message: "Pago y membresía registrados correctamente",
                pago: nuevoPago,
                membresia: nuevaMembresia,
            },
            { status: 201 }
        )
    } catch (error) {
        console.error("Error al registrar el pago:", error)
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}
