"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Clock, TrendingUp } from "lucide-react"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const reviewsEvolutionData = [
  { day: "Día 1", reviews: 12 },
  { day: "Día 5", reviews: 18 },
  { day: "Día 10", reviews: 25 },
  { day: "Día 15", reviews: 32 },
  { day: "Día 20", reviews: 28 },
  { day: "Día 25", reviews: 35 },
  { day: "Día 30", reviews: 42 },
]

const recentReviews = [
  {
    platform: "Google",
    author: "María García",
    rating: 5,
    comment: "Excelente servicio y comida deliciosa. Totalmente recomendado.",
  },
  {
    platform: "TripAdvisor",
    author: "Carlos Rodríguez",
    rating: 4,
    comment: "Muy buena experiencia, aunque el tiempo de espera fue un poco largo.",
  },
  {
    platform: "Yelp",
    author: "Ana Martínez",
    rating: 5,
    comment: "El mejor restaurante de la zona. Ambiente acogedor y platos increíbles.",
  },
  {
    platform: "Google",
    author: "Luis Fernández",
    rating: 3,
    comment: "La comida estaba bien pero el servicio podría mejorar.",
  },
  {
    platform: "Facebook",
    author: "Isabel Torres",
    rating: 5,
    comment: "Perfecto para celebraciones. El personal es muy atento.",
  },
]

export default function DashboardPage() {
  const [isEmpty, setIsEmpty] = useState(false)

  if (isEmpty) {
    return (
      <div className="flex h-screen bg-background">
        <Sidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <Header title="Dashboard" subtitle="Panel de control de tu restaurante" />

          <main className="flex flex-1 items-center justify-center p-4 lg:p-8">
            <Card className="w-full max-w-md">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center lg:p-12">
                <div className="mb-6 rounded-full bg-primary/10 p-6">
                  <Clock className="h-12 w-12 text-primary" />
                </div>
                <h3 className="mb-3 text-xl font-semibold">Estamos activando tu cuenta</h3>
                <p className="mb-6 text-muted-foreground">
                  Tu dashboard aparecerá aquí pronto. Normalmente este proceso toma 24 horas.
                </p>
                <Button onClick={() => setIsEmpty(false)} variant="outline" size="sm">
                  Ver vista previa (Demo)
                </Button>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Dashboard" subtitle="Panel de control de tu restaurante" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="space-y-6 lg:space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              <StatCard
                title="Total de Reseñas"
                value="1,284"
                change="+127 este mes"
                changeType="positive"
                icon={MessageSquare}
              />

              <Card>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Rating Promedio</p>
                      <div className="flex items-center gap-2">
                        <p className="text-3xl font-semibold tracking-tight">4.6</p>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= 4
                                  ? "fill-primary text-primary"
                                  : star === 5
                                    ? "fill-primary/50 text-primary/50"
                                    : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs font-medium text-chart-2">+0.3 desde el mes pasado</p>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <StatCard
                title="Reseñas Positivas"
                value="1,089"
                change="85% del total"
                changeType="positive"
                icon={ThumbsUp}
              />

              <StatCard
                title="Reseñas Negativas"
                value="48"
                change="4% del total"
                changeType="negative"
                icon={ThumbsDown}
              />
            </div>

            <Card className="overflow-hidden border-2">
              <CardHeader className="bg-gradient-to-br from-primary/5 via-primary/3 to-transparent pb-8">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl lg:text-2xl">Evolución de Reseñas</CardTitle>
                    <p className="text-sm text-muted-foreground">Reseñas recibidas en los últimos 30 días</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-chart-2/10 px-3 py-1.5">
                    <TrendingUp className="h-4 w-4 text-chart-2" />
                    <span className="text-sm font-semibold text-chart-2">+24%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ChartContainer
                  config={{
                    reviews: {
                      label: "Reseñas",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[280px] lg:h-[380px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={reviewsEvolutionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorReviews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                      <XAxis
                        dataKey="day"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                      <ChartTooltip
                        content={<ChartTooltipContent indicator="line" />}
                        cursor={{ stroke: "hsl(var(--chart-1))", strokeWidth: 1, strokeDasharray: "5 5" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="reviews"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={3}
                        fill="url(#colorReviews)"
                        dot={{
                          fill: "hsl(var(--background))",
                          stroke: "hsl(var(--chart-1))",
                          strokeWidth: 3,
                          r: 5,
                        }}
                        activeDot={{
                          fill: "hsl(var(--chart-1))",
                          stroke: "hsl(var(--background))",
                          strokeWidth: 3,
                          r: 8,
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Últimas Reseñas Recibidas</CardTitle>
                <p className="text-sm text-muted-foreground">Feedback más reciente de tus clientes</p>
              </CardHeader>
              <CardContent>
                {/* Desktop: Table */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plataforma</TableHead>
                        <TableHead>Autor</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Comentario</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentReviews.map((review, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Badge variant="outline">{review.platform}</Badge>
                          </TableCell>
                          <TableCell className="font-medium">{review.author}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3.5 w-3.5 ${
                                    i < review.rating ? "fill-primary text-primary" : "text-muted"
                                  }`}
                                />
                              ))}
                              <span className="ml-1 text-sm font-medium">{review.rating}.0</span>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-md">
                            <p className="truncate text-sm text-muted-foreground">{review.comment}</p>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile: Cards */}
                <div className="space-y-4 md:hidden">
                  {recentReviews.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{review.author}</p>
                              <Badge variant="outline" className="mt-1">
                                {review.platform}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3.5 w-3.5 ${
                                    i < review.rating ? "fill-primary text-primary" : "text-muted"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button onClick={() => setIsEmpty(true)} variant="outline" size="sm">
                Ver estado vacío (Demo)
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
