"use client"

import { useState } from "react"
import { MobileProjectCard } from "@/components/mobile-project-card"
import { MobileNavigation } from "@/components/mobile-navigation"
import { MobileFilters } from "@/components/mobile-filters"
import { MobileSearch } from "@/components/mobile-search"
import { SwipeableGallery } from "@/components/swipeable-gallery"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { LiveActivityFeed } from "@/components/live-activity-feed"
import { AuditTrail } from "@/components/audit-trail"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Zap, Star } from "lucide-react"

// Sample project data
const sampleProjects = [
  {
    id: "1",
    name: "TaskFlow Pro",
    description:
      "Comprehensive project management SaaS with team collaboration features, time tracking, and advanced reporting capabilities.",
    price: 2500,
    healthScore: 78,
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
    category: "SaaS",
    lastUpdated: "6 months ago",
    views: 1250,
    likes: 45,
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    seller: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4.8,
    },
    featured: true,
    trending: true,
  },
  {
    id: "2",
    name: "AI Content Generator",
    description: "GPT-powered content generation tool with API integration and user management system.",
    price: 5500,
    healthScore: 90,
    techStack: ["Next.js", "OpenAI API", "Prisma", "PostgreSQL"],
    category: "AI/ML",
    lastUpdated: "2 months ago",
    views: 1450,
    likes: 67,
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    seller: {
      name: "Emily Watson",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4.7,
    },
    featured: true,
  },
  {
    id: "3",
    name: "DataViz Dashboard",
    description: "Analytics dashboard with beautiful charts and real-time data processing capabilities.",
    price: 1800,
    healthScore: 72,
    techStack: ["Vue.js", "Python", "MongoDB", "D3.js"],
    category: "Web App",
    lastUpdated: "4 months ago",
    views: 650,
    likes: 28,
    images: ["/placeholder.svg?height=400&width=600"],
    seller: {
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4.6,
    },
  },
]

interface FilterState {
  categories: string[]
  priceRange: [number, number]
  techStack: string[]
  healthScore: [number, number]
  sortBy: string
}

export default function MobilePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 10000],
    techStack: [],
    healthScore: [0, 100],
    sortBy: "recent",
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    console.log("Searching for:", query)
  }

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    console.log("Filters updated:", newFilters)
  }

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 10000],
      techStack: [],
      healthScore: [0, 100],
      sortBy: "recent",
    })
  }

  const handleProjectLike = (projectId: string) => {
    console.log("Liked project:", projectId)
  }

  const handleProjectBookmark = (projectId: string) => {
    console.log("Bookmarked project:", projectId)
  }

  const handleProjectShare = (projectId: string) => {
    console.log("Shared project:", projectId)
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Mobile Navigation */}
      <MobileNavigation />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />

      {/* Main Content */}
      <div className="pt-14 pb-20 px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            Discover Amazing <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-gray-400">Find your next big opportunity</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <MobileSearch onSearch={handleSearch} onFilterToggle={() => setShowFilters(true)} />
        </div>

        {/* Trending Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-semibold text-white">Trending Now</h2>
            <Badge className="bg-orange-500/20 text-orange-400">
              <Zap className="w-3 h-3 mr-1" />
              Hot
            </Badge>
          </div>

          <div className="space-y-4">
            {sampleProjects
              .filter((p) => p.trending)
              .map((project) => (
                <MobileProjectCard
                  key={project.id}
                  project={project}
                  onLike={handleProjectLike}
                  onBookmark={handleProjectBookmark}
                  onShare={handleProjectShare}
                />
              ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <MobileFilters filters={filters} onFiltersChange={handleFiltersChange} onClearFilters={clearFilters} />
        </div>

        {/* Featured Gallery */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Star className="w-5 h-5 text-yellow-400 mr-2" />
            Featured Projects
          </h2>
          <SwipeableGallery
            images={[
              "/placeholder.svg?height=200&width=400",
              "/placeholder.svg?height=200&width=400",
              "/placeholder.svg?height=200&width=400",
            ]}
            title="Featured Projects Gallery"
            className="mb-4"
          />
        </div>

        {/* Admin Dashboard Tabs (for demo) */}
        <div className="mb-6">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/5">
              <TabsTrigger value="activity">Live Activity</TabsTrigger>
              <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="mt-4">
              <LiveActivityFeed />
            </TabsContent>

            <TabsContent value="audit" className="mt-4">
              <AuditTrail />
            </TabsContent>
          </Tabs>
        </div>

        {/* All Projects */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">All Projects</h2>
            <Badge variant="outline" className="border-white/20">
              {sampleProjects.length} projects
            </Badge>
          </div>

          {sampleProjects.map((project) => (
            <MobileProjectCard
              key={project.id}
              project={project}
              onLike={handleProjectLike}
              onBookmark={handleProjectBookmark}
              onShare={handleProjectShare}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
            Load More Projects
          </Button>
        </div>
      </div>
    </div>
  )
}
