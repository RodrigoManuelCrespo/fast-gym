import { Schema, model, models } from "mongoose"

const userSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, select: false },
        role: {
            type: String,
            enum: ["admin", "entrenador", "cliente"],
            required: true,
        },

        // Campos opcionales
        nombre: { type: String },
        apellido: { type: String },
        telefono: { type: String },
    },
    { timestamps: true }
)

export const User = models.User || model("User", userSchema)
