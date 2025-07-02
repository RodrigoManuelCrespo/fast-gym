"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function NewClientForm() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        apellido: "",
        dni: "",
        telefono: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Nuevo cliente:", formData);

        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            console.log(response)

            if (!response.ok) {
                // Manejo de error simple
                const errorData = await response.json();
                console.error("Error en el registro:", errorData);
                alert(`Error: ${errorData.message || "Algo salió mal"}`);
                return;
            }

            const data = await response.json();
            console.log("Registro exitoso:", data);
            alert("Cliente registrado correctamente");
            // Acá podrías limpiar el formulario o redirigir, etc.
            setFormData({
                nombre: "",
                email: "",
                apellido: "",
                dni: "",
                telefono: "",
            });
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
            alert("Error de conexión. Intenta más tarde.");
        }
    };


    return (
        <Card className="max-w-mx mx-auto">
            <CardHeader>
                <CardTitle>Nuevo Cliente</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Nombre</p>
                        <Input
                            name="nombre"
                            placeholder="Ana"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Apellido</p>
                        <Input
                            name="apellido"
                            placeholder="López"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">DNI</p>
                        <Input
                            name="dni"
                            placeholder="41678907"
                            value={formData.dni}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Correo electrónico</p>
                        <Input
                            name="email"
                            type="email"
                            placeholder="ana@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Teléfono</p>
                        <Input
                            name="telefono"
                            type="tel"
                            placeholder="3411111111"
                            value={formData.telefono}
                            onChange={handleChange}
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        Guardar Cliente
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
