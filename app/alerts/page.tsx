"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"

export default function AlertsPage() {
  const [alertsEnabled, setAlertsEnabled] = useState(true)
  const [emailInput, setEmailInput] = useState("")
  const [emails, setEmails] = useState(["admin@restaurant.com", "manager@restaurant.com"])

  const handleAddEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && emailInput.trim()) {
      e.preventDefault()
      if (!emails.includes(emailInput.trim())) {
        setEmails([...emails, emailInput.trim()])
        setEmailInput("")
      }
    }
  }

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove))
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Alertas" subtitle="Configura las notificaciones de reseñas" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="mx-auto max-w-3xl">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de Alertas</CardTitle>
                <CardDescription>
                  Recibe notificaciones por email cuando lleguen nuevas reseñas que cumplan tus criterios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <Label htmlFor="alerts-enabled" className="text-base">
                      Activar Alertas
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones por email sobre nuevas reseñas
                    </p>
                  </div>
                  <Switch id="alerts-enabled" checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email-input">Emails de Notificación</Label>
                  <div className="space-y-2">
                    <Input
                      id="email-input"
                      type="email"
                      placeholder="Añadir email y presionar Enter"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      onKeyDown={handleAddEmail}
                      disabled={!alertsEnabled}
                    />
                    {emails.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {emails.map((email) => (
                          <Badge key={email} variant="secondary" className="gap-1 pr-1">
                            {email}
                            <button
                              onClick={() => handleRemoveEmail(email)}
                              className="ml-1 rounded-sm hover:bg-muted"
                              disabled={!alertsEnabled}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Presiona Enter para añadir múltiples direcciones de email
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="min-rating">Rating Mínimo para Alertas</Label>
                  <Select defaultValue="2" disabled={!alertsEnabled}>
                    <SelectTrigger id="min-rating">
                      <SelectValue placeholder="Seleccionar rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Estrella o menos</SelectItem>
                      <SelectItem value="2">2 Estrellas o menos</SelectItem>
                      <SelectItem value="3">3 Estrellas o menos</SelectItem>
                      <SelectItem value="4">4 Estrellas o menos</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Recibirás notificaciones solo para reseñas con este rating o inferior
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="frequency">Frecuencia de Notificaciones</Label>
                  <Select defaultValue="instant" disabled={!alertsEnabled}>
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Seleccionar frecuencia" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instant">Instantánea</SelectItem>
                      <SelectItem value="hourly">Cada hora</SelectItem>
                      <SelectItem value="daily">Diaria (resumen)</SelectItem>
                      <SelectItem value="weekly">Semanal (resumen)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end pt-4">
                  <Button size="lg" disabled={!alertsEnabled} className="w-full sm:w-auto">
                    Guardar Cambios
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
