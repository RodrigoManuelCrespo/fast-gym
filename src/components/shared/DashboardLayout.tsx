"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import AppSidebar from "@/components/shared/AppSidebar"

export default function DashboardLayout({
    children,
    role,
}: {
    children: React.ReactNode
    role: "admin" | "entrenador" | "cliente"
}) {
    return (
        <SidebarProvider>
            <AppSidebar role={role} />
            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4">
                    <SidebarTrigger />
                    <div className="ml-auto flex items-center gap-2">
                        <Button variant="outline" size="icon">
                            <Bell className="h-4 w-4" />
                        </Button>
                    </div>
                </header>
                <main className="p-4">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    )
}
