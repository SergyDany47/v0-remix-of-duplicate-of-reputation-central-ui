"use client"

import { Bell, Search, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MobileNav } from "@/components/mobile-nav"
import { navigation } from "@/components/admin-sidebar"

interface AdminHeaderProps {
  title: string
  subtitle?: string
}

export function AdminHeader({ title, subtitle }: AdminHeaderProps) {
  const userInfo = (
    <div className="flex items-center gap-3 rounded-lg bg-slate-700/50 px-3 py-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-xs font-semibold text-white">
        AD
      </div>
      <div className="flex-1 text-sm">
        <div className="font-medium text-white">Admin User</div>
        <div className="text-xs text-slate-400">Super Admin</div>
      </div>
    </div>
  )

  const logo = (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500">
        <Shield className="h-5 w-5 text-white" />
      </div>
      <div>
        <span className="text-base font-semibold text-white">Admin Portal</span>
        <p className="text-xs text-slate-400">Reputation Central</p>
      </div>
    </div>
  )

  return (
    <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8">
      {/* Mobile: Logo + Hamburger */}
      <div className="flex items-center gap-3 lg:hidden">
        <MobileNav navigation={navigation} logo={logo} userInfo={userInfo} />
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-teal-500">
            <Shield className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>

      {/* Desktop: Title */}
      <div className="hidden lg:block">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-800">{title}</h1>
        {subtitle && <p className="text-sm text-slate-600">{subtitle}</p>}
      </div>

      {/* Right side: Search (hidden on mobile), Notifications */}
      <div className="flex items-center gap-2 lg:gap-4">
        <div className="relative hidden w-80 md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input placeholder="Search companies, users..." className="border-slate-200 pl-9" />
        </div>

        <Button variant="ghost" size="icon" className="relative hover:bg-slate-100">
          <Bell className="h-5 w-5 text-slate-600" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-teal-500" />
        </Button>
      </div>
    </div>
  )
}
