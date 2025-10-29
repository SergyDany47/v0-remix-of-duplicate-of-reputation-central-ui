"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MessageSquare, ThumbsUp, Calendar } from "lucide-react"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ratingTrendData = [
  { month: "Jan", rating: 4.2, reviews: 98 },
  { month: "Feb", rating: 4.3, reviews: 112 },
  { month: "Mar", rating: 4.1, reviews: 105 },
  { month: "Apr", rating: 4.4, reviews: 128 },
  { month: "May", rating: 4.5, reviews: 142 },
  { month: "Jun", rating: 4.6, reviews: 156 },
]

const platformDistribution = [
  { name: "Google", value: 485, color: "hsl(var(--chart-1))" },
  { name: "Yelp", value: 342, color: "hsl(var(--chart-2))" },
  { name: "TripAdvisor", value: 287, color: "hsl(var(--chart-3))" },
  { name: "Facebook", value: 170, color: "hsl(var(--chart-4))" },
]

const sentimentData = [
  { category: "Positive", count: 892 },
  { category: "Neutral", count: 234 },
  { category: "Negative", count: 158 },
]

const responseTimeData = [
  { day: "Mon", avgTime: 2.4 },
  { day: "Tue", avgTime: 1.8 },
  { day: "Wed", avgTime: 2.1 },
  { day: "Thu", avgTime: 1.5 },
  { day: "Fri", avgTime: 2.8 },
  { day: "Sat", avgTime: 3.2 },
  { day: "Sun", avgTime: 2.9 },
]

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Analytics" subtitle="Deep dive into your reputation metrics" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="space-y-6 lg:space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Performance Overview</h2>
                <p className="text-sm text-muted-foreground">Track your reputation metrics over time</p>
              </div>
              <Select defaultValue="6months">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              <StatCard
                title="Average Rating"
                value="4.6"
                change="+0.2 from last period"
                changeType="positive"
                icon={Star}
              />
              <StatCard
                title="Total Reviews"
                value="1,284"
                change="+127 this period"
                changeType="positive"
                icon={MessageSquare}
              />
              <StatCard
                title="Response Rate"
                value="94%"
                change="+5% from last period"
                changeType="positive"
                icon={ThumbsUp}
              />
              <StatCard
                title="Avg Response Time"
                value="2.3h"
                change="-0.5h from last period"
                changeType="positive"
                icon={Calendar}
              />
            </div>

            <Tabs defaultValue="ratings" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-4">
                <TabsTrigger value="ratings">Ratings</TabsTrigger>
                <TabsTrigger value="platforms">Platforms</TabsTrigger>
                <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
                <TabsTrigger value="response">Response</TabsTrigger>
              </TabsList>

              <TabsContent value="ratings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Rating & Review Volume Trends</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Track how your average rating and review volume change over time
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        rating: {
                          label: "Average Rating",
                          color: "hsl(var(--chart-1))",
                        },
                        reviews: {
                          label: "Review Count",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                      className="h-[300px] lg:h-[400px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={ratingTrendData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis yAxisId="left" domain={[0, 5]} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="hsl(var(--muted-foreground))"
                            fontSize={12}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="rating"
                            stroke="hsl(var(--chart-1))"
                            strokeWidth={2}
                            dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="reviews"
                            stroke="hsl(var(--chart-2))"
                            strokeWidth={2}
                            dot={{ fill: "hsl(var(--chart-2))", r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="platforms" className="space-y-4">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Reviews by Platform</CardTitle>
                      <p className="text-sm text-muted-foreground">Distribution of reviews across platforms</p>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          value: {
                            label: "Reviews",
                          },
                        }}
                        className="h-[250px] lg:h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={platformDistribution}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={100}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {platformDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Platform Breakdown</CardTitle>
                      <p className="text-sm text-muted-foreground">Detailed review counts by platform</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {platformDistribution.map((platform) => (
                          <div key={platform.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: platform.color }} />
                              <span className="font-medium">{platform.name}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{platform.value}</div>
                              <div className="text-xs text-muted-foreground">
                                {((platform.value / 1284) * 100).toFixed(1)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="sentiment" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sentiment Distribution</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Breakdown of positive, neutral, and negative reviews
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        count: {
                          label: "Reviews",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[300px] lg:h-[400px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sentimentData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                            <Cell fill="hsl(var(--chart-2))" />
                            <Cell fill="hsl(var(--chart-3))" />
                            <Cell fill="hsl(var(--destructive))" />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="response" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Average Response Time by Day</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      How quickly you respond to reviews throughout the week
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        avgTime: {
                          label: "Hours",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[300px] lg:h-[400px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={responseTimeData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="avgTime" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
