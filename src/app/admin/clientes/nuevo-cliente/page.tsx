"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function NewClientForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nuevo cliente:", formData)
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center px-4 overflow-x-hidden box-border">
      <Card className="w-full max-w-full box-border">
        <CardHeader>
          <CardTitle>Nuevo Cliente</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="space-y-6 w-full box-border">
            <div className="space-y-1 w-full box-border">
              <p className="text-sm text-muted-foreground">Nombre</p>
              <Input
                name="name"
                placeholder="Ej: Ana López"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-1 w-full box-border">
              <p className="text-sm text-muted-foreground">Correo electrónico</p>
              <Input
                name="email"
                type="email"
                placeholder="ana@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-1 w-full box-border">
              <p className="text-sm text-muted-foreground">Teléfono</p>
              <Input
                name="phone"
                type="tel"
                placeholder="11 2345 6789"
                value={formData.phone}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <Button type="submit" className="w-full">
              Guardar Cliente
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
