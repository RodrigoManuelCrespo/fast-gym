// src/app/admin/layout.tsx
"use client"

import DashboardLayout from "@/components/shared/DashboardLayout"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <DashboardLayout role="admin">{children}</DashboardLayout>
}
