"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { StatCard } from "@/components/stat-card"
import { ReviewCard } from "@/components/review-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, TrendingUp, MessageSquare, AlertCircle, ArrowRight } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import Link from "next/link"

const chartData = [
  { date: "Jan", rating: 4.2 },
  { date: "Feb", rating: 4.3 },
  { date: "Mar", rating: 4.1 },
  { date: "Apr", rating: 4.4 },
  { date: "May", rating: 4.5 },
  { date: "Jun", rating: 4.6 },
]

const recentReviews = [
  {
    platform: "Google",
    author: "Sarah Johnson",
    rating: 5,
    date: "2 hours ago",
    content:
      "Absolutely fantastic experience! The food was incredible and the service was impeccable. Will definitely be coming back.",
    sentiment: "positive" as const,
    responded: false,
  },
  {
    platform: "Yelp",
    author: "Michael Chen",
    rating: 4,
    date: "5 hours ago",
    content:
      "Great atmosphere and delicious food. The only downside was the wait time, but it was worth it in the end.",
    sentiment: "positive" as const,
    responded: true,
  },
  {
    platform: "TripAdvisor",
    author: "Emma Williams",
    rating: 2,
    date: "1 day ago",
    content:
      "Disappointed with our visit. The food was cold and the service was slow. Expected much better based on the reviews.",
    sentiment: "negative" as const,
    responded: false,
  },
]

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Overview" subtitle="Monitor your restaurant's reputation across all platforms" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="space-y-6 lg:space-y-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              <StatCard
                title="Average Rating"
                value="4.6"
                change="+0.2 from last month"
                changeType="positive"
                icon={Star}
              />
              <StatCard
                title="Total Reviews"
                value="1,284"
                change="+127 this month"
                changeType="positive"
                icon={MessageSquare}
              />
              <StatCard
                title="Response Rate"
                value="94%"
                change="+5% from last month"
                changeType="positive"
                icon={TrendingUp}
              />
              <StatCard
                title="Pending Responses"
                value="12"
                change="3 urgent"
                changeType="negative"
                icon={AlertCircle}
              />
            </div>

            <Card>
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Rating Trend</CardTitle>
                    <p className="text-sm text-muted-foreground">Your average rating over the last 6 months</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    rating: {
                      label: "Rating",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[250px] lg:h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <YAxis domain={[0, 5]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="rating"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <div>
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Recent Reviews</h2>
                  <p className="text-sm text-muted-foreground">Latest feedback from your customers</p>
                </div>
                <Button variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
                  <Link href="/reviews">
                    View All Reviews
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {recentReviews.map((review, index) => (
                  <ReviewCard key={index} {...review} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
