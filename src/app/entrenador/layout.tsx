// src/app/entrenador/layout.tsx
"use client"

import DashboardLayout from "@/components/shared/DashboardLayout"

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout role="entrenador">{children}</DashboardLayout>
}