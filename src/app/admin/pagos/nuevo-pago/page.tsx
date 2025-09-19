'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
// import { pagoService } from "@/lib/services/pagoService"
// import { clienteService } from "@/lib/services/clienteService"

export default function NuevoPagoForm() {
    const [clientes] = useState<{ id: string; nombre: string; apellido: string }[]>([])
    const [form, setForm] = useState({
        clienteId: "",
        monto: "",
        metodo: "efectivo",
        tipoMembresia: "mensual",
        observaciones: "",
    })

    // useEffect(() => {
    //     clienteService.list()
    //         .then((res) => setClientes(res.data))
    //         .catch(() => toast.error("Error al cargar clientes"))
    // }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSelect = (name: string, value: string) => {
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            // await pagoService.registrarConMembresia({
            //     clienteId: form.clienteId,
            //     monto: Number(form.monto),
            //     metodo: form.metodo as "efectivo" | "tarjeta" | "transferencia",
            //     tipoMembresia: form.tipoMembresia as "mensual" | "trimestral" | "anual",
            //     observaciones: form.observaciones,
            // })
            toast.success("Pago y membresía registrados correctamente")
            setForm({
                clienteId: "",
                monto: "",
                metodo: "efectivo",
                tipoMembresia: "mensual",
                observaciones: "",
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
                <CardTitle>Registrar Pago</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Cliente */}
                    <div className="space-y-1">
                        <p className="text-sm mb-2">Cliente</p>
                        <Select value={form.clienteId} onValueChange={(val) => handleSelect("clienteId", val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccionar cliente" />
                            </SelectTrigger>
                            <SelectContent>
                                {clientes.map((c) => (
                                    <SelectItem key={c.id} value={c.id}>
                                        {c.nombre} {c.apellido}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Monto y Método en una fila */}
                    <div className="flex flex-row lg:flex-row gap-4">
                        <div className="flex-1 space-y-1">
                            <p className="text-sm mb-2">Método de Pago</p>
                            <Select value={form.metodo} onValueChange={(val) => handleSelect("metodo", val)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="efectivo">Efectivo</SelectItem>
                                    <SelectItem value="tarjeta">Tarjeta</SelectItem>
                                    <SelectItem value="transferencia">Transferencia</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm mb-2">Monto</p>
                            <Input type="number" name="monto" value={form.monto} onChange={handleChange} required />
                        </div>
                    </div>

                    {/* Tipo de Membresía */}
                    <div className="space-y-1">
                        <p className="text-sm mb-2">Tipo de Membresía</p>
                        <Select value={form.tipoMembresia} onValueChange={(val) => handleSelect("tipoMembresia", val)}>
                            <SelectTrigger className="w-full">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="mensual">Mensual</SelectItem>
                                <SelectItem value="trimestral">Trimestral</SelectItem>
                                <SelectItem value="anual">Anual</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Observaciones */}
                    <div className="space-y-1">
                        <p className="text-sm mb-2">Observaciones</p>
                        <Textarea
                            name="observaciones"
                            value={form.observaciones}
                            onChange={handleChange}
                            placeholder="Observaciones (opcional)"
                            className="w-full"
                        />
                    </div>


                    <div className="flex justify-end mt-8">
                        <Button type="submit" className="w-full sm:w-auto">
                            Registrar Pago
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
