"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Building2, Users, Settings, Shield } from "lucide-react"

const navigation = [
  { name: "Dashboard Admin", href: "/admin", icon: LayoutDashboard },
  { name: "Gestión de Empresas", href: "/admin/companies", icon: Building2 },
  { name: "Gestión de Usuarios", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden h-screen w-64 flex-col bg-slate-800 lg:flex">
      <div className="flex h-16 items-center border-b border-slate-700 px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-semibold text-white">Admin Portal</span>
            <p className="text-xs text-slate-400">Reputation Central</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-teal-500 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-slate-700 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-slate-700/50 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-xs font-semibold text-white">
            AD
          </div>
          <div className="flex-1 text-sm">
            <div className="font-medium text-white">Admin User</div>
            <div className="text-xs text-slate-400">Super Admin</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export navigation for mobile use
export { navigation }
