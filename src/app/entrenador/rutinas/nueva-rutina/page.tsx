'use client'

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

import { clienteService } from "@/lib/services/clienteService"
import { ejercicioService } from "@/lib/services/ejercicioService"
import { rutinaService } from "@/lib/services/rutinaService"
import { Cliente } from "@/types/ClienteType"
import { Ejercicio } from "@/types/EjercicioType"

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

export default function NuevaRutinaForm() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [ejerciciosDisponibles, setEjerciciosDisponibles] = useState<Ejercicio[]>([])

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    clienteId: "",
    dias: [] as string[],
    ejercicios: [] as {
      ejercicioId: string
      series: number
      repeticiones: number
      descanso: string
    }[],
    observaciones: "",
  })

  useEffect(() => {
    clienteService.clientes().then((res) => setClientes(res.data))
    ejercicioService.listarEjercicios().then((res) => setEjerciciosDisponibles(res.data))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const toggleDia = (dia: string) => {
    setForm((prev) => ({
      ...prev,
      dias: prev.dias.includes(dia)
        ? prev.dias.filter((d) => d !== dia)
        : [...prev.dias, dia],
    }))
  }

  const handleEjercicioChange = (index: number, field: string, value: string | number) => {
    const updated = [...form.ejercicios]
    updated[index] = { ...updated[index], [field]: value }
    setForm({ ...form, ejercicios: updated })
  }

  const agregarEjercicio = () => {
    setForm({
      ...form,
      ejercicios: [...form.ejercicios, { ejercicioId: "", series: 3, repeticiones: 12, descanso: "60s" }],
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await rutinaService.crearRutina(form)
      toast.success("Rutina creada correctamente")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error al crear rutina")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Nueva Rutina</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Nombre */}
          <div>
            <p className="text-sm mb-1">Nombre</p>
            <Input name="nombre" value={form.nombre} onChange={handleChange} required />
          </div>

          {/* Cliente */}
          <div>
            <p className="text-sm mb-1">Cliente</p>
            <Select value={form.clienteId} onValueChange={(val) => setForm({ ...form, clienteId: val })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar cliente" />
              </SelectTrigger>
              <SelectContent>
                {clientes.map((c) => (
                  <SelectItem key={c._id} value={c._id}>
                    {c.nombre} {c.apellido}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Días */}
          <div>
            <p className="text-sm mb-2">Días de entrenamiento</p>
            <div className="flex flex-wrap gap-3">
              {DIAS.map((dia) => (
                <label key={dia} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={form.dias.includes(dia)}
                    onCheckedChange={() => toggleDia(dia)}
                  />
                  {dia}
                </label>
              ))}
            </div>
          </div>

          {/* Ejercicios */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">Ejercicios</p>
              <Button type="button" onClick={agregarEjercicio} size="sm">
                Agregar
              </Button>
            </div>
            {form.ejercicios.map((ej, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select
                  value={ej.ejercicioId}
                  onValueChange={(val) => handleEjercicioChange(index, "ejercicioId", val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ejercicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {ejerciciosDisponibles.map((e) => (
                      <SelectItem key={e._id ?? ''} value={e._id ?? ''}>{e.nombre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Series"
                  value={ej.series}
                  onChange={(e) => handleEjercicioChange(index, "series", Number(e.target.value))}
                />
                <Input
                  type="number"
                  placeholder="Reps"
                  value={ej.repeticiones}
                  onChange={(e) => handleEjercicioChange(index, "repeticiones", Number(e.target.value))}
                />
                <Input
                  type="text"
                  placeholder="Descanso (ej: 60s)"
                  value={ej.descanso}
                  onChange={(e) => handleEjercicioChange(index, "descanso", e.target.value)}
                />
              </div>
            ))}
          </div>

          {/* Observaciones */}
          <div>
            <p className="text-sm mb-1">Observaciones</p>
            <Textarea
              name="observaciones"
              value={form.observaciones}
              onChange={handleChange}
              placeholder="Observaciones adicionales (opcional)"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Guardar Rutina</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
