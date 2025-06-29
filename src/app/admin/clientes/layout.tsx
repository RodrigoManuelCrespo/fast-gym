// src/app/clientes/layout.tsx
"use client"

import DashboardLayout from "@/components/shared/DashboardLayout"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout role="cliente">{children}</DashboardLayout>
}