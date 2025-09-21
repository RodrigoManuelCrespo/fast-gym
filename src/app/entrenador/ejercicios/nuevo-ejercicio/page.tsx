'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { ejercicioService } from "@/lib/services/ejercicioService"

export default function NuevoEjercicioForm() {
    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        imagen: "",
        videoURL: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await ejercicioService.crearEjercicio(form)
            toast.success("Ejercicio registrado correctamente")
            setForm({
                nombre: "",
                descripcion: "",
                imagen: "",
                videoURL: "",
            })
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Nuevo Ejercicio</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nombre */}
                    <div className="space-y-1">
                        <p className="text-sm mb-2">Nombre del Ejercicio</p>
                        <Input
                            name="nombre"
                            placeholder="Ej. Press de banca"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Descripción */}
                    <div className="space-y-1">
                        <p className="text-sm mb-2">Descripción</p>
                        <Textarea
                            name="descripcion"
                            placeholder="Breve descripción del ejercicio"
                            value={form.descripcion}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Imagen */}
                    <div className="space-y-1">
                        <p className="text-sm mb-2">URL de Imagen</p>
                        <Input
                            name="imagen"
                            placeholder="https://..."
                            value={form.imagen}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Video */}
                    <div className="space-y-1">
                        <p className="text-sm mb-2">URL de Video</p>
                        <Input
                            name="videoURL"
                            placeholder="https://www.youtube.com/watch?v=..."
                            value={form.videoURL}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end mt-8">
                        <Button type="submit" className="w-full sm:w-auto">
                            Guardar Ejercicio
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
