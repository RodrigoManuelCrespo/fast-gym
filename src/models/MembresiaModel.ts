import { Schema, model, models } from "mongoose"

const membresiaSchema = new Schema(
    {
        clienteId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        tipo: { type: String, enum: ["mensual", "trimestral", "anual"], required: true },
        inicio: { type: Date, required: true },
        fin: { type: Date, required: true },
        activa: { type: Boolean, default: true },
    },
    { timestamps: true }
)

export const Membresia = models.Membresia || model("Membresia", membresiaSchema)
