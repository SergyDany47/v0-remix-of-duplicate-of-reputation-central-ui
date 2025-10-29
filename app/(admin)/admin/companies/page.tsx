"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RefreshCw } from "lucide-react"

interface Company {
  id: string
  name: string
  email: string
  status: "active" | "pending"
  registrationDate: string
  googleMapsUrl?: string
  tripadvisorUrl?: string
  subscriptionActive: boolean
}

const mockCompanies: Company[] = [
  {
    id: "1",
    name: "La Bella Italia",
    email: "contact@labellaitalia.com",
    status: "active",
    registrationDate: "2024-01-15",
    googleMapsUrl: "https://maps.google.com/...",
    tripadvisorUrl: "https://tripadvisor.com/...",
    subscriptionActive: true,
  },
  {
    id: "2",
    name: "Sushi Master",
    email: "info@sushimaster.com",
    status: "active",
    registrationDate: "2024-02-20",
    subscriptionActive: true,
  },
  {
    id: "3",
    name: "El Asador",
    email: "admin@elasador.com",
    status: "pending",
    registrationDate: "2024-03-10",
    subscriptionActive: false,
  },
  {
    id: "4",
    name: "Café Central",
    email: "hello@cafecentral.com",
    status: "active",
    registrationDate: "2024-01-28",
    googleMapsUrl: "https://maps.google.com/...",
    subscriptionActive: true,
  },
  {
    id: "5",
    name: "Pizzería Napoli",
    email: "contact@pizzerianapoli.com",
    status: "pending",
    registrationDate: "2024-03-15",
    subscriptionActive: false,
  },
]

export default function CompaniesPage() {
  const [companies] = useState<Company[]>(mockCompanies)
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    googleMapsUrl: "",
    tripadvisorUrl: "",
    subscriptionActive: false,
  })

  const handleManage = (company: Company) => {
    setSelectedCompany(company)
    setFormData({
      googleMapsUrl: company.googleMapsUrl || "",
      tripadvisorUrl: company.tripadvisorUrl || "",
      subscriptionActive: company.subscriptionActive,
    })
    setDialogOpen(true)
  }

  const handleSave = () => {
    console.log("Saving company data:", { company: selectedCompany?.name, ...formData })
    setDialogOpen(false)
  }

  const handleForceSync = () => {
    console.log("Forcing historical sync for:", selectedCompany?.name)
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader title="Gestión de Empresas" subtitle="Administra todas las empresas registradas" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="space-y-6">
            {/* Desktop: Table */}
            <div className="hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="text-slate-600">Nombre Empresa</TableHead>
                    <TableHead className="text-slate-600">Email Usuario</TableHead>
                    <TableHead className="text-slate-600">Estado</TableHead>
                    <TableHead className="text-slate-600">Fecha de Registro</TableHead>
                    <TableHead className="text-right text-slate-600">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow key={company.id} className="border-slate-200">
                      <TableCell className="font-medium text-slate-800">{company.name}</TableCell>
                      <TableCell className="text-slate-600">{company.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={company.status === "active" ? "default" : "secondary"}
                          className={company.status === "active" ? "bg-teal-500 hover:bg-teal-600" : ""}
                        >
                          {company.status === "active" ? "Activo" : "Pendiente"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {new Date(company.registrationDate).toLocaleDateString("es-ES")}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleManage(company)}
                          className="border-slate-200 hover:bg-slate-50 bg-transparent"
                        >
                          Gestionar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile: Cards */}
            <div className="space-y-4 md:hidden">
              {companies.map((company) => (
                <Card key={company.id} className="rounded-xl border-slate-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{company.name}</p>
                          <p className="text-sm text-slate-600">{company.email}</p>
                        </div>
                        <Badge
                          variant={company.status === "active" ? "default" : "secondary"}
                          className={company.status === "active" ? "bg-teal-500 hover:bg-teal-600" : ""}
                        >
                          {company.status === "active" ? "Activo" : "Pendiente"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">
                          {new Date(company.registrationDate).toLocaleDateString("es-ES")}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleManage(company)}
                          className="border-slate-200 hover:bg-slate-50"
                        >
                          Gestionar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] rounded-xl sm:w-full">
          <DialogHeader>
            <DialogTitle className="text-slate-800">Gestionar Empresa</DialogTitle>
            <DialogDescription className="text-slate-600">{selectedCompany?.name}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="google-maps" className="text-slate-700">
                Añadir URL Google Maps
              </Label>
              <Input
                id="google-maps"
                placeholder="https://maps.google.com/..."
                value={formData.googleMapsUrl}
                onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                className="border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tripadvisor" className="text-slate-700">
                Añadir URL TripAdvisor
              </Label>
              <Input
                id="tripadvisor"
                placeholder="https://tripadvisor.com/..."
                value={formData.tripadvisorUrl}
                onChange={(e) => setFormData({ ...formData, tripadvisorUrl: e.target.value })}
                className="border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full border-slate-200 bg-transparent hover:bg-slate-50"
                onClick={handleForceSync}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Forzar Sincronización Histórica
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div className="space-y-0.5">
                <Label htmlFor="subscription" className="text-slate-700">
                  Activar Suscripción
                </Label>
                <p className="text-sm text-slate-600">Habilitar acceso premium</p>
              </div>
              <Switch
                id="subscription"
                checked={formData.subscriptionActive}
                onCheckedChange={(checked) => setFormData({ ...formData, subscriptionActive: checked })}
              />
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="w-full border-slate-200 hover:bg-slate-50 sm:w-auto"
            >
              Cancelar
            </Button>
            <Button onClick={handleSave} className="w-full bg-teal-500 hover:bg-teal-600 sm:w-auto">
              Guardar Cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
