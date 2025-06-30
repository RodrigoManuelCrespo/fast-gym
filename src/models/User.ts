import { Schema, model, models } from "mongoose"

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "entrenador", "cliente"], required: true },
    // Otros campos que quieras agregar
}, {
    timestamps: true
})

export const User = models.User || model("User", userSchema)
