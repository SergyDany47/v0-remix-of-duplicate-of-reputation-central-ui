"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Download, RefreshCw, CalendarIcon, Star } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import { cn } from "@/lib/utils"

const allReviews = [
  {
    author: "Sarah Johnson",
    platform: "Google",
    rating: 5,
    comment: "Absolutely fantastic experience! The food was incredible and the service was impeccable.",
    date: "2024-01-15",
  },
  {
    author: "Michael Chen",
    platform: "TripAdvisor",
    rating: 4,
    comment: "Great atmosphere and delicious food. The only downside was the wait time.",
    date: "2024-01-14",
  },
  {
    author: "Emma Williams",
    platform: "Google",
    rating: 2,
    comment: "Disappointed with our visit. The food was cold and the service was slow.",
    date: "2024-01-13",
  },
  {
    author: "David Martinez",
    platform: "TripAdvisor",
    rating: 5,
    comment: "Best dining experience in the city! The chef's special was outstanding.",
    date: "2024-01-12",
  },
  {
    author: "Lisa Anderson",
    platform: "Google",
    rating: 3,
    comment: "Food was decent but nothing special. Service was friendly but a bit slow.",
    date: "2024-01-11",
  },
  {
    author: "James Wilson",
    platform: "TripAdvisor",
    rating: 1,
    comment: "Terrible experience. Waited over an hour for our food and when it arrived it was cold.",
    date: "2024-01-10",
  },
  {
    author: "Maria Garcia",
    platform: "Google",
    rating: 5,
    comment: "Exceptional! Every dish was perfectly prepared and beautifully presented.",
    date: "2024-01-09",
  },
  {
    author: "Robert Taylor",
    platform: "TripAdvisor",
    rating: 4,
    comment: "Really enjoyed our meal here. The ambiance is lovely and the food is consistently good.",
    date: "2024-01-08",
  },
  {
    author: "Jennifer Lee",
    platform: "Google",
    rating: 5,
    comment: "Outstanding service and amazing food. Highly recommend the seafood pasta!",
    date: "2024-01-07",
  },
  {
    author: "Thomas Brown",
    platform: "TripAdvisor",
    rating: 3,
    comment: "Average experience. Nothing stood out but nothing was terrible either.",
    date: "2024-01-06",
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn("h-4 w-4", star <= rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/30")}
        />
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  const [dateFrom, setDateFrom] = useState<Date>()
  const [dateTo, setDateTo] = useState<Date>()
  const [currentPage, setCurrentPage] = useState(1)
  const [platformFilter, setPlatformFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")
  const itemsPerPage = 10

  const filteredReviews = allReviews.filter((review) => {
    // Platform filter
    if (platformFilter !== "all" && review.platform.toLowerCase() !== platformFilter) {
      return false
    }

    // Rating filter
    if (ratingFilter !== "all" && review.rating !== Number.parseInt(ratingFilter)) {
      return false
    }

    // Date range filter
    const reviewDate = new Date(review.date)
    if (dateFrom && reviewDate < dateFrom) {
      return false
    }
    if (dateTo && reviewDate > dateTo) {
      return false
    }

    return true
  })

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentReviews = filteredReviews.slice(startIndex, endIndex)

  const handleReset = () => {
    setPlatformFilter("all")
    setRatingFilter("all")
    setDateFrom(undefined)
    setDateTo(undefined)
    setCurrentPage(1)
  }

  const handleFilterChange = (setter: (value: string) => void, value: string) => {
    setter(value)
    setCurrentPage(1)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Reseñas" subtitle="Gestiona y analiza todas tus reseñas" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4 lg:p-6">
                <div className="space-y-4">
                  {/* Filters row */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center lg:gap-3">
                    <Select
                      value={platformFilter}
                      onValueChange={(value) => handleFilterChange(setPlatformFilter, value)}
                    >
                      <SelectTrigger className="w-full lg:w-[180px]">
                        <SelectValue placeholder="Plataforma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas las Plataformas</SelectItem>
                        <SelectItem value="google">Google</SelectItem>
                        <SelectItem value="tripadvisor">TripAdvisor</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={ratingFilter} onValueChange={(value) => handleFilterChange(setRatingFilter, value)}>
                      <SelectTrigger className="w-full lg:w-[180px]">
                        <SelectValue placeholder="Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los Ratings</SelectItem>
                        <SelectItem value="5">5 Estrellas</SelectItem>
                        <SelectItem value="4">4 Estrellas</SelectItem>
                        <SelectItem value="3">3 Estrellas</SelectItem>
                        <SelectItem value="2">2 Estrellas</SelectItem>
                        <SelectItem value="1">1 Estrella</SelectItem>
                      </SelectContent>
                    </Select>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent lg:w-[180px]">
                          <CalendarIcon className="h-4 w-4" />
                          {dateFrom ? format(dateFrom, "dd/MM/yyyy") : "Fecha desde"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateFrom}
                          onSelect={(date) => {
                            setDateFrom(date)
                            setCurrentPage(1)
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent lg:w-[180px]">
                          <CalendarIcon className="h-4 w-4" />
                          {dateTo ? format(dateTo, "dd/MM/yyyy") : "Fecha hasta"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateTo}
                          onSelect={(date) => {
                            setDateTo(date)
                            setCurrentPage(1)
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 bg-transparent sm:w-auto"
                      onClick={handleReset}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Actualizar
                    </Button>
                    <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent sm:w-auto">
                      <Download className="h-4 w-4" />
                      Exportar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="min-h-[600px] p-3 lg:p-4">
                <div className="space-y-4">
                  {/* Desktop: Table */}
                  <div className="hidden rounded-md border md:block">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Autor</TableHead>
                          <TableHead>Plataforma</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead className="max-w-md">Comentario</TableHead>
                          <TableHead>Fecha</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentReviews.map((review, index) => (
                          <TableRow key={index} className="h-16">
                            <TableCell className="py-2 font-medium">{review.author}</TableCell>
                            <TableCell className="py-2">{review.platform}</TableCell>
                            <TableCell className="py-2">
                              <StarRating rating={review.rating} />
                            </TableCell>
                            <TableCell className="max-w-md py-2">
                              <p className="line-clamp-2 text-sm text-muted-foreground">{review.comment}</p>
                            </TableCell>
                            <TableCell className="py-2 text-sm text-muted-foreground">
                              {format(new Date(review.date), "dd/MM/yyyy")}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Mobile: Cards */}
                  <div className="space-y-3 md:hidden">
                    {currentReviews.map((review, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <p className="font-medium">{review.author}</p>
                                <div className="mt-1 flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {review.platform}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">
                                    {format(new Date(review.date), "dd/MM/yyyy")}
                                  </span>
                                </div>
                              </div>
                              <StarRating rating={review.rating} />
                            </div>
                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex flex-col items-center justify-between gap-4 border-t pt-4 sm:flex-row">
                    <p className="text-sm text-muted-foreground">
                      Mostrando {startIndex + 1} a {Math.min(endIndex, filteredReviews.length)} de{" "}
                      {filteredReviews.length} reseñas
                    </p>
                    <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="w-full sm:w-auto"
                      >
                        Anterior
                      </Button>
                      <div className="flex items-center gap-1 overflow-x-auto pb-2 sm:pb-0">
                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                          // Show first, last, current, and adjacent pages
                          let page: number
                          if (totalPages <= 5) {
                            page = i + 1
                          } else if (currentPage <= 3) {
                            page = i + 1
                          } else if (currentPage >= totalPages - 2) {
                            page = totalPages - 4 + i
                          } else {
                            page = currentPage - 2 + i
                          }
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className="h-8 w-8 shrink-0 p-0"
                            >
                              {page}
                            </Button>
                          )
                        })}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="w-full sm:w-auto"
                      >
                        Siguiente
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
