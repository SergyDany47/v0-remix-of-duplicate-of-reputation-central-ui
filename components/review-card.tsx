import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReviewCardProps {
  platform: string
  author: string
  rating: number
  date: string
  content: string
  sentiment: "positive" | "negative" | "neutral"
  responded?: boolean
}

export function ReviewCard({ platform, author, rating, date, content, sentiment, responded = false }: ReviewCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{author}</span>
                <Badge variant="outline" className="text-xs">
                  {platform}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn("h-4 w-4", i < rating ? "fill-primary text-primary" : "fill-muted text-muted")}
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{date}</span>
              </div>
            </div>

            <Badge
              variant="secondary"
              className={cn(
                "shrink-0",
                sentiment === "positive" && "bg-chart-2/20 text-chart-2",
                sentiment === "negative" && "bg-destructive/20 text-destructive",
                sentiment === "neutral" && "bg-muted text-muted-foreground",
              )}
            >
              {sentiment}
            </Badge>
          </div>

          <p className="text-sm leading-relaxed text-foreground">{content}</p>
        </div>
      </CardContent>
    </Card>
  )
}
