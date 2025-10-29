import { AdminHeader } from "@/components/admin-header"
import { AdminSidebar } from "@/components/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, TrendingUp, DollarSign } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-slate-50">
      <AdminSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader title="Dashboard Admin" subtitle="Vista general del sistema" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-white shadow-sm border border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">Total Empresas</CardTitle>
                <Building2 className="h-4 w-4 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">124</div>
                <p className="text-xs text-teal-600">+12 este mes</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">Usuarios Activos</CardTitle>
                <Users className="h-4 w-4 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">1,847</div>
                <p className="text-xs text-teal-600">+201 este mes</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">Ingresos Mensuales</CardTitle>
                <DollarSign className="h-4 w-4 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">$45,231</div>
                <p className="text-xs text-teal-600">+20.1% vs mes anterior</p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-slate-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-700">Tasa de Crecimiento</CardTitle>
                <TrendingUp className="h-4 w-4 text-teal-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">+12.5%</div>
                <p className="text-xs text-teal-600">Últimos 30 días</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
