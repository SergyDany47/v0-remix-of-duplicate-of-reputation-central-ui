"use client"

import Link from "next/link"

import { Bell, Star, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { navigation } from "@/components/sidebar"

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const userInfo = (
    <div className="flex items-center gap-2">
      <div className="flex flex-1 items-center gap-3 rounded-lg bg-secondary px-3 py-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
          RC
        </div>
        <div className="flex-1 text-sm">
          <div className="font-medium">Restaurant Co.</div>
          <div className="text-xs text-muted-foreground">Premium Plan</div>
        </div>
      </div>
      <Link href="/login">
        <Button variant="ghost" size="icon" className="h-9 w-9" title="Cerrar sesión">
          <LogOut className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  )

  const logo = (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <Star className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="text-lg font-semibold">Reputation Central</span>
    </div>
  )

  return (
    <div className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-8">
      {/* Mobile: Logo + Hamburger */}
      <div className="flex items-center gap-3 lg:hidden">
        <MobileNav navigation={navigation} logo={logo} userInfo={userInfo} />
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary">
            <Star className="h-4 w-4 text-primary-foreground" />
          </div>
        </div>
      </div>

      {/* Desktop: Title */}
      <div className="hidden lg:block">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>

      {/* Right side: Search (hidden on mobile), Theme Toggle, Notifications */}
      <div className="flex items-center gap-2 lg:gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>
      </div>
    </div>
  )
}
