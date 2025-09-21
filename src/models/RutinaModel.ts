// /models/RutinaModel.ts

import { Schema, model, models } from "mongoose"

const rutinaSchema = new Schema(
    {
        nombre: { type: String, required: true },
        descripcion: { type: String },
        clienteId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        entrenadorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        dias: [{ type: String }], // ej: ["Lunes", "Miércoles"]
        ejercicios: [
            {
                ejercicioId: { type: Schema.Types.ObjectId, ref: "Ejercicio", required: true },
                series: Number,
                repeticiones: Number,
                descanso: String,
            },
        ],
        estado: { type: String, enum: ["activa", "completada", "suspendida"], default: "activa" },
        observaciones: { type: String },
        fechaAsignacion: { type: Date, default: Date.now },
    },
    { timestamps: true }
)

export const Rutina = models.Rutina || model("Rutina", rutinaSchema)
