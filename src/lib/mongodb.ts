// lib/mongo.ts
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error("Falta la variable de entorno MONGODB_URI")
}

let isConnected = false

export async function connectToDB() {
  if (isConnected) return

  try {
    const db = await mongoose.connect(MONGODB_URI)
    isConnected = true
    console.log("🟢 Conectado a MongoDB:", db.connection.name)
  } catch (error) {
    console.error("🔴 Error conectando a MongoDB:", error)
  }
}
