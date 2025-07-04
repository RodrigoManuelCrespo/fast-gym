"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const formFields = [
    { label: "Nombre", name: "nombre", placeholder: "Ingresá el nombre del cliente" },
    { label: "Apellido", name: "apellido", placeholder: "Ingresá el apellido del cliente" },
    { label: "DNI", name: "dni", placeholder: "Ingresá el DNI (sin puntos ni espacios)" },
    { label: "Correo electrónico", name: "email", type: "email", placeholder: "ejemplo@email.com" },
    { label: "Teléfono", name: "telefono", type: "tel", placeholder: "3411234567" },
]

export default function NewClientForm() {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        apellido: "",
        dni: "",
        telefono: "",
        role: "cliente",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error en el registro:", errorData);
                alert(`Error: ${errorData.message || "Algo salió mal"}`);
                return;
            }

            alert("Cliente registrado correctamente");
            setFormData({
                nombre: "",
                email: "",
                apellido: "",
                dni: "",
                telefono: "",
                role: "cliente",
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
                    {formFields.map(({ name, label, placeholder, type = "text" }) => (
                        <div key={name} className="space-y-1">
                            <p className="text-sm text-muted-foreground">{label}</p>
                            <Input
                                name={name}
                                type={type}
                                placeholder={placeholder}
                                value={formData[name as keyof typeof formData]}
                                onChange={handleChange}
                                required={name !== "telefono"}
                            />
                        </div>
                    ))}

                    <Button type="submit" className="w-full">
                        Guardar Cliente
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
