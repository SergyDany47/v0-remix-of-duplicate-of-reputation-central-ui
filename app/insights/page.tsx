"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertCircle, Lightbulb, Target, Users } from "lucide-react"

const insights = [
  {
    type: "positive",
    icon: TrendingUp,
    title: "Rating Improvement Trend",
    description: "Your average rating has increased by 0.3 stars over the last 3 months",
    impact: "high",
    actionable: true,
    action: "Keep up the great work! Consider highlighting this improvement in your marketing.",
  },
  {
    type: "negative",
    icon: TrendingDown,
    title: "Weekend Response Time Spike",
    description: "Response times are 40% slower on weekends compared to weekdays",
    impact: "medium",
    actionable: true,
    action: "Consider adding weekend staff or setting up automated responses for common questions.",
  },
  {
    type: "warning",
    icon: AlertCircle,
    title: "Negative Review Cluster",
    description: "3 negative reviews mentioning 'slow service' in the past week",
    impact: "high",
    actionable: true,
    action: "Review staffing levels during peak hours and consider process improvements.",
  },
  {
    type: "insight",
    icon: Lightbulb,
    title: "Top Praised Feature",
    description: "Food quality mentioned positively in 78% of 5-star reviews",
    impact: "medium",
    actionable: true,
    action: "Highlight your food quality in marketing materials and social media.",
  },
  {
    type: "insight",
    icon: Users,
    title: "Customer Loyalty Indicator",
    description: "23% of reviewers have left multiple reviews over time",
    impact: "medium",
    actionable: false,
    action: "Consider implementing a loyalty program to reward repeat customers.",
  },
  {
    type: "positive",
    icon: Target,
    title: "Response Rate Achievement",
    description: "You've maintained a 90%+ response rate for 6 consecutive months",
    impact: "high",
    actionable: false,
    action: "Excellent engagement! This builds trust with potential customers.",
  },
]

const commonThemes = [
  { theme: "Food Quality", mentions: 342, sentiment: "positive", trend: "up" },
  { theme: "Service Speed", mentions: 156, sentiment: "negative", trend: "down" },
  { theme: "Atmosphere", mentions: 234, sentiment: "positive", trend: "stable" },
  { theme: "Value for Money", mentions: 189, sentiment: "neutral", trend: "stable" },
  { theme: "Staff Friendliness", mentions: 298, sentiment: "positive", trend: "up" },
  { theme: "Wait Times", mentions: 167, sentiment: "negative", trend: "down" },
]

const competitorComparison = [
  { metric: "Average Rating", you: "4.6", competitor: "4.3", status: "better" },
  { metric: "Total Reviews", you: "1,284", competitor: "892", status: "better" },
  { metric: "Response Rate", you: "94%", competitor: "67%", status: "better" },
  { metric: "Avg Response Time", you: "2.3h", competitor: "8.5h", status: "better" },
]

export default function InsightsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header title="Insights" subtitle="AI-powered recommendations to improve your reputation" />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="space-y-6 lg:space-y-8">
            <div>
              <div className="mb-4 lg:mb-6">
                <h2 className="text-2xl font-semibold">Key Insights</h2>
                <p className="text-sm text-muted-foreground">Actionable recommendations based on your review data</p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
                {insights.map((insight, index) => {
                  const Icon = insight.icon
                  return (
                    <Card key={index}>
                      <CardContent className="p-4 lg:p-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-start gap-3">
                              <div
                                className={`rounded-lg p-2 ${
                                  insight.type === "positive"
                                    ? "bg-chart-2/20"
                                    : insight.type === "negative"
                                      ? "bg-destructive/20"
                                      : insight.type === "warning"
                                        ? "bg-chart-3/20"
                                        : "bg-primary/20"
                                }`}
                              >
                                <Icon
                                  className={`h-5 w-5 ${
                                    insight.type === "positive"
                                      ? "text-chart-2"
                                      : insight.type === "negative"
                                        ? "text-destructive"
                                        : insight.type === "warning"
                                          ? "text-chart-3"
                                          : "text-primary"
                                  }`}
                                />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold">{insight.title}</h3>
                                <p className="mt-1 text-sm text-muted-foreground">{insight.description}</p>
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className={
                                insight.impact === "high"
                                  ? "bg-primary/20 text-primary"
                                  : "bg-muted text-muted-foreground"
                              }
                            >
                              {insight.impact}
                            </Badge>
                          </div>

                          {insight.actionable && (
                            <div className="rounded-lg bg-muted/50 p-4">
                              <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                                <Target className="h-4 w-4" />
                                Recommended Action
                              </div>
                              <p className="text-sm text-muted-foreground">{insight.action}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Common Themes in Reviews</CardTitle>
                <p className="text-sm text-muted-foreground">Most frequently mentioned topics and their sentiment</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {commonThemes.map((theme, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                          <span className="font-medium">{theme.theme}</span>
                          <span className="text-sm text-muted-foreground">{theme.mentions} mentions</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant="secondary"
                          className={
                            theme.sentiment === "positive"
                              ? "bg-chart-2/20 text-chart-2"
                              : theme.sentiment === "negative"
                                ? "bg-destructive/20 text-destructive"
                                : "bg-muted text-muted-foreground"
                          }
                        >
                          {theme.sentiment}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {theme.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-chart-2" />
                          ) : theme.trend === "down" ? (
                            <TrendingDown className="h-4 w-4 text-destructive" />
                          ) : (
                            <div className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">How you compare to similar restaurants in your area</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {competitorComparison.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="font-medium">{item.metric}</span>
                      <div className="flex items-center gap-4 sm:gap-6">
                        <div className="text-left sm:text-right">
                          <div className="text-sm text-muted-foreground">You</div>
                          <div className="font-semibold">{item.you}</div>
                        </div>
                        <div className="text-left sm:text-right">
                          <div className="text-sm text-muted-foreground">Avg Competitor</div>
                          <div className="font-semibold text-muted-foreground">{item.competitor}</div>
                        </div>
                        <Badge variant="secondary" className="bg-chart-2/20 text-chart-2">
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
