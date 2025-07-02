"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Activity,
  ShoppingCart,
  Heart,
  MessageSquare,
  Star,
  TrendingUp,
  Eye,
  Download,
  Share2,
  Clock,
  RefreshCw,
} from "lucide-react"

interface ActivityItem {
  id: string
  type: "purchase" | "like" | "view" | "comment" | "rating" | "share" | "download" | "listing"
  user: {
    name: string
    avatar: string
    verified?: boolean
  }
  project?: {
    name: string
    id: string
  }
  timestamp: Date
  metadata?: {
    rating?: number
    price?: number
    comment?: string
  }
}

const activityTypes = {
  purchase: { icon: ShoppingCart, color: "text-green-400", label: "purchased" },
  like: { icon: Heart, color: "text-red-400", label: "liked" },
  view: { icon: Eye, color: "text-blue-400", label: "viewed" },
  comment: { icon: MessageSquare, color: "text-purple-400", label: "commented on" },
  rating: { icon: Star, color: "text-yellow-400", label: "rated" },
  share: { icon: Share2, color: "text-cyan-400", label: "shared" },
  download: { icon: Download, color: "text-indigo-400", label: "downloaded" },
  listing: { icon: TrendingUp, color: "text-orange-400", label: "listed" },
}

// Mock real-time activity data
const generateMockActivity = (): ActivityItem => {
  const types = Object.keys(activityTypes) as Array<keyof typeof activityTypes>
  const type = types[Math.floor(Math.random() * types.length)]

  const users = [
    { name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32", verified: true },
    { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Mike Rodriguez", avatar: "/placeholder.svg?height=32&width=32", verified: true },
    { name: "Emily Watson", avatar: "/placeholder.svg?height=32&width=32" },
    { name: "David Kim", avatar: "/placeholder.svg?height=32&width=32" },
  ]

  const projects = [
    { name: "TaskFlow Pro", id: "1" },
    { name: "AI Content Generator", id: "2" },
    { name: "DataViz Dashboard", id: "3" },
    { name: "CryptoTracker", id: "4" },
    { name: "FitnessPal Clone", id: "5" },
  ]

  const user = users[Math.floor(Math.random() * users.length)]
  const project = projects[Math.floor(Math.random() * projects.length)]

  const activity: ActivityItem = {
    id: Math.random().toString(36).substr(2, 9),
    type,
    user,
    project,
    timestamp: new Date(),
  }

  // Add type-specific metadata
  if (type === "purchase") {
    activity.metadata = { price: Math.floor(Math.random() * 5000) + 1000 }
  } else if (type === "rating") {
    activity.metadata = { rating: Math.floor(Math.random() * 2) + 4 } // 4-5 stars
  } else if (type === "comment") {
    const comments = [
      "Great project with solid architecture!",
      "Exactly what I was looking for.",
      "Clean code and good documentation.",
      "Impressive work, highly recommended.",
      "Perfect for my use case.",
    ]
    activity.metadata = { comment: comments[Math.floor(Math.random() * comments.length)] }
  }

  return activity
}

export function LiveActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLive, setIsLive] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    // Initialize with some activities
    const initialActivities = Array.from({ length: 10 }, () => generateMockActivity())
    setActivities(initialActivities)

    let interval: NodeJS.Timeout

    if (isLive) {
      // Simulate real-time updates
      interval = setInterval(
        () => {
          const newActivity = generateMockActivity()
          setActivities((prev) => [newActivity, ...prev.slice(0, 49)]) // Keep last 50 activities
          setLastUpdate(new Date())
        },
        Math.random() * 5000 + 2000,
      ) // Random interval between 2-7 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLive])

  const toggleLive = () => {
    setIsLive(!isLive)
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  const renderActivityContent = (activity: ActivityItem) => {
    const activityType = activityTypes[activity.type]
    const Icon = activityType.icon

    return (
      <div className="flex items-start space-x-3">
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
          <AvatarFallback className="text-xs">{activity.user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-white text-sm truncate">{activity.user.name}</span>
            {activity.user.verified && <Badge className="bg-blue-500/20 text-blue-400 text-xs px-1">✓</Badge>}
            <Icon className={`w-4 h-4 ${activityType.color} flex-shrink-0`} />
          </div>

          <div className="text-sm text-gray-300">
            <span className={activityType.color}>{activityType.label}</span>
            {activity.project && (
              <>
                {" "}
                <span className="text-purple-400 hover:text-purple-300 cursor-pointer">{activity.project.name}</span>
              </>
            )}

            {/* Type-specific content */}
            {activity.type === "purchase" && activity.metadata?.price && (
              <span className="text-green-400"> for ${activity.metadata.price.toLocaleString()}</span>
            )}
            {activity.type === "rating" && activity.metadata?.rating && (
              <span className="text-yellow-400"> {activity.metadata.rating} stars</span>
            )}
          </div>

          {activity.type === "comment" && activity.metadata?.comment && (
            <div className="mt-2 p-2 bg-white/5 rounded text-sm text-gray-300 italic">
              "{activity.metadata.comment}"
            </div>
          )}

          <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{formatTimeAgo(activity.timestamp)}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="glass border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="w-5 h-5 text-purple-400" />
            <CardTitle className="text-white">Live Activity Feed</CardTitle>
            {isLive && (
              <Badge className="bg-green-500/20 text-green-400 animate-pulse">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                Live
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400">Last update: {lastUpdate.toLocaleTimeString()}</span>
            <Button variant="ghost" size="sm" onClick={toggleLive} className="w-8 h-8 p-0">
              <RefreshCw className={`w-4 h-4 ${isLive ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={activity.id}>
                {renderActivityContent(activity)}
                {index < activities.length - 1 && <Separator className="bg-white/10 mt-4" />}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
