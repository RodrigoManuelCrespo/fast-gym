"use client"

import Link from "next/link"
import Image from "next/image"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, TrendingUp, Settings, CircleUserRound, Dumbbell, ReceiptText, UserRoundCog, ListChecks, IdCard } from "lucide-react"

type Role = "admin" | "entrenador" | "cliente"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menuByRole: Record<Role, { title: string; url: string; icon: any }[]> = {
    admin: [
        { title: "Inicio", url: "/admin", icon: UserRoundCog },
        { title: "Clientes", url: "/admin/clientes", icon: CircleUserRound },
        { title: "Entrenadores", url: "/admin/entrenadores", icon: Dumbbell },
        { title: "Pagos", url: "/admin/pagos", icon: ReceiptText },
    ],
    entrenador: [
        { title: "Inicio", url: "/entrenador", icon: Dumbbell },
        { title: "Mis Clientes", url: "/entrenador/clientes", icon: CircleUserRound },
        { title: "Rutinas", url: "/entrenador/rutinas", icon: ListChecks  },
    ],
    cliente: [
        { title: "Mi Panel", url: "/cliente", icon: CircleUserRound },
        { title: "Mis Rutinas", url: "/cliente/rutinas", icon: ListChecks },
        { title: "Membresía", url: "/cliente/membresia", icon: IdCard },
    ],
}

export default function AppSidebar({ role }: { role: Role }) {
    const menuItems = menuByRole[role]

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <TrendingUp className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">FAST Gym</span>
                                    <span className="truncate text-xs capitalize">{role}</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Panel</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg">
                                    <Image
                                        src="/placeholder.svg?height=32&width=32"
                                        alt="Avatar"
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">Usuario</span>
                                        <span className="truncate text-xs">usuario@fast.com</span>
                                    </div>
                                    <ChevronDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" sideOffset={4}>
                                <DropdownMenuLabel>Cuenta</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Configuración
                                </DropdownMenuItem>
                                <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}
