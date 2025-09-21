import { Schema, model, models } from "mongoose"

const ejercicioSchema = new Schema(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String },
        imagen: { type: String },
        videoURL: { type: String },
    },
    {
        timestamps: true,
    }
)

export const Ejercicio = models.Ejercicio || model("Ejercicio", ejercicioSchema)
