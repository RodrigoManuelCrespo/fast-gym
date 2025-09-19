import { Schema, model, models } from "mongoose"

const pagoSchema = new Schema(
    {
        clienteId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        monto: { type: Number, required: true },
        metodo: { type: String, enum: ["efectivo", "tarjeta", "transferencia"], required: true },
        observaciones: { type: String },
        registradoPor: { type: Schema.Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
)

export const Pago = models.Pago || model("Pago", pagoSchema)
