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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager" | "user"
  company: string
  status: "active" | "inactive"
  registrationDate: string
  lastLogin?: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    email: "carlos@labellaitalia.com",
    role: "manager",
    company: "La Bella Italia",
    status: "active",
    registrationDate: "2024-01-15",
    lastLogin: "2024-03-20",
  },
  {
    id: "2",
    name: "María González",
    email: "maria@sushimaster.com",
    role: "user",
    company: "Sushi Master",
    status: "active",
    registrationDate: "2024-02-20",
    lastLogin: "2024-03-19",
  },
  {
    id: "3",
    name: "Juan Pérez",
    email: "juan@elasador.com",
    role: "user",
    company: "El Asador",
    status: "inactive",
    registrationDate: "2024-03-10",
    lastLogin: "2024-03-15",
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana@cafecentral.com",
    role: "manager",
    company: "Café Central",
    status: "active",
    registrationDate: "2024-01-28",
    lastLogin: "2024-03-20",
  },
  {
    id: "5",
    name: "Pedro Sánchez",
    email: "pedro@pizzerianapoli.com",
    role: "user",
    company: "Pizzería Napoli",
    status: "active",
    registrationDate: "2024-03-15",
    lastLogin: "2024-03-18",
  },
  {
    id: "6",
    name: "Laura Torres",
    email: "laura@labellaitalia.com",
    role: "user",
    company: "La Bella Italia",
    status: "active",
    registrationDate: "2024-02-10",
    lastLogin: "2024-03-20",
  },
  {
    id: "7",
    name: "Miguel Ángel Ruiz",
    email: "miguel@sushimaster.com",
    role: "admin",
    company: "Sushi Master",
    status: "active",
    registrationDate: "2024-01-05",
    lastLogin: "2024-03-20",
  },
]

const companies = ["La Bella Italia", "Sushi Master", "El Asador", "Café Central", "Pizzería Napoli"]

export default function UsersPage() {
  const [users] = useState<User[]>(mockUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user" as "admin" | "manager" | "user",
    company: "",
    status: true,
  })

  const handleManage = (user: User) => {
    setSelectedUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
      status: user.status === "active",
    })
    setDialogOpen(true)
  }

  const handleCreateUser = () => {
    setFormData({
      name: "",
      email: "",
      role: "user",
      company: "",
      status: true,
    })
    setCreateDialogOpen(true)
  }

  const handleSave = () => {
    console.log("Saving user data:", { user: selectedUser?.name, ...formData })
    setDialogOpen(false)
  }

  const handleCreate = () => {
    console.log("Creating new user:", formData)
    setCreateDialogOpen(false)
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "destructive"
      case "manager":
        return "default"
      default:
        return "secondary"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Administrador"
      case "manager":
        return "Gerente"
      default:
        return "Usuario"
    }
  }

  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader title="Gestión de Usuarios" subtitle="Administra todos los usuarios del sistema" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="space-y-6">
            {/* Header with Create Button */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Usuarios Registrados</h2>
                <p className="text-sm text-slate-600">{users.length} usuarios en total</p>
              </div>
              <Button onClick={handleCreateUser} className="bg-teal-500 hover:bg-teal-600">
                <UserPlus className="mr-2 h-4 w-4" />
                Crear Usuario
              </Button>
            </div>

            {/* Desktop: Table */}
            <div className="hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200">
                    <TableHead className="text-slate-600">Nombre</TableHead>
                    <TableHead className="text-slate-600">Email</TableHead>
                    <TableHead className="text-slate-600">Rol</TableHead>
                    <TableHead className="text-slate-600">Empresa</TableHead>
                    <TableHead className="text-slate-600">Estado</TableHead>
                    <TableHead className="text-slate-600">Último Acceso</TableHead>
                    <TableHead className="text-right text-slate-600">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} className="border-slate-200">
                      <TableCell className="font-medium text-slate-800">{user.name}</TableCell>
                      <TableCell className="text-slate-600">{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getRoleBadgeVariant(user.role)}
                          className={user.role === "manager" ? "bg-teal-500 hover:bg-teal-600" : ""}
                        >
                          {getRoleLabel(user.role)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">{user.company}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === "active" ? "default" : "secondary"}
                          className={user.status === "active" ? "bg-teal-500 hover:bg-teal-600" : ""}
                        >
                          {user.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-600">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString("es-ES") : "Nunca"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleManage(user)}
                          className="border-slate-200 hover:bg-slate-50"
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
              {users.map((user) => (
                <Card key={user.id} className="rounded-xl border-slate-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{user.name}</p>
                          <p className="text-sm text-slate-600">{user.email}</p>
                          <p className="mt-1 text-sm text-slate-600">{user.company}</p>
                        </div>
                        <Badge
                          variant={user.status === "active" ? "default" : "secondary"}
                          className={user.status === "active" ? "bg-teal-500 hover:bg-teal-600" : ""}
                        >
                          {user.status === "active" ? "Activo" : "Inactivo"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={getRoleBadgeVariant(user.role)}
                          className={user.role === "manager" ? "bg-teal-500 hover:bg-teal-600" : ""}
                        >
                          {getRoleLabel(user.role)}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleManage(user)}
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

      {/* Edit User Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] rounded-xl sm:w-full">
          <DialogHeader>
            <DialogTitle className="text-slate-800">Gestionar Usuario</DialogTitle>
            <DialogDescription className="text-slate-600">{selectedUser?.email}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name" className="text-slate-700">
                Nombre Completo
              </Label>
              <Input
                id="edit-name"
                placeholder="Nombre del usuario"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-email" className="text-slate-700">
                Email
              </Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="email@ejemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-role" className="text-slate-700">
                Rol
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value: "admin" | "manager" | "user") => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger id="edit-role" className="border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Usuario</SelectItem>
                  <SelectItem value="manager">Gerente</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-company" className="text-slate-700">
                Empresa Asignada
              </Label>
              <Select value={formData.company} onValueChange={(value) => setFormData({ ...formData, company: value })}>
                <SelectTrigger id="edit-company" className="border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div className="space-y-0.5">
                <Label htmlFor="edit-status" className="text-slate-700">
                  Estado del Usuario
                </Label>
                <p className="text-sm text-slate-600">Activar o desactivar acceso</p>
              </div>
              <Switch
                id="edit-status"
                checked={formData.status}
                onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
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

      {/* Create User Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] rounded-xl sm:w-full">
          <DialogHeader>
            <DialogTitle className="text-slate-800">Crear Nuevo Usuario</DialogTitle>
            <DialogDescription className="text-slate-600">Añade un nuevo usuario al sistema</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="create-name" className="text-slate-700">
                Nombre Completo
              </Label>
              <Input
                id="create-name"
                placeholder="Nombre del usuario"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-email" className="text-slate-700">
                Email
              </Label>
              <Input
                id="create-email"
                type="email"
                placeholder="email@ejemplo.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-role" className="text-slate-700">
                Rol
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value: "admin" | "manager" | "user") => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger id="create-role" className="border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Usuario</SelectItem>
                  <SelectItem value="manager">Gerente</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="create-company" className="text-slate-700">
                Empresa Asignada
              </Label>
              <Select value={formData.company} onValueChange={(value) => setFormData({ ...formData, company: value })}>
                <SelectTrigger id="create-company" className="border-slate-200">
                  <SelectValue placeholder="Selecciona una empresa" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
              <div className="space-y-0.5">
                <Label htmlFor="create-status" className="text-slate-700">
                  Estado Inicial
                </Label>
                <p className="text-sm text-slate-600">Usuario activo al crear</p>
              </div>
              <Switch
                id="create-status"
                checked={formData.status}
                onCheckedChange={(checked) => setFormData({ ...formData, status: checked })}
              />
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button
              variant="outline"
              onClick={() => setCreateDialogOpen(false)}
              className="w-full border-slate-200 hover:bg-slate-50 sm:w-auto"
            >
              Cancelar
            </Button>
            <Button onClick={handleCreate} className="w-full bg-teal-500 hover:bg-teal-600 sm:w-auto">
              Crear Usuario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
