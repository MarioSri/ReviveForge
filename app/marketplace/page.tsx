"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useProjects } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  SlidersHorizontal,
  Heart,
  Star,
  TrendingUp,
  Eye,
  ArrowRight,
  Grid3X3,
  List,
  ChevronDown,
  X,
} from "lucide-react"
import Link from "next/link"

const TECH_STACK_OPTIONS = [
  "React", "Vue.js", "Angular", "Next.js", "Nuxt.js", "Svelte",
  "Node.js", "Express", "Django", "Flask", "Ruby on Rails", "Laravel",
  "PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Supabase",
  "TypeScript", "Python", "JavaScript", "PHP", "Ruby", "Go"
]

const CATEGORIES = [
  "SaaS Platform", "Mobile App", "Web App", "E-commerce", 
  "AI/ML", "Blockchain", "Game", "Desktop App", "API/Backend"
]

const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "health", label: "Health Score" },
  { value: "popular", label: "Most Popular" },
]

export default function MarketplacePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  
  const [filters, setFilters] = useState({
    q: searchParams.get("q") || "",
    tech: searchParams.getAll("tech"),
    category: searchParams.get("category") || "",
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 10000,
    minHealth: Number(searchParams.get("minHealth")) || 0,
    sortBy: searchParams.get("sortBy") || "recent",
  })

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1)
  const PAGE_SIZE = 12

  const { data, isLoading, error } = useProjects(filters, page, PAGE_SIZE)

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    
    const params = new URLSearchParams()
    Object.entries(updated).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v))
      } else if (value && value !== 0 && value !== "") {
        params.set(key, String(value))
      }
    })
    if (page > 1) params.set("page", String(page))
    
    router.replace(`/marketplace?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      q: "",
      tech: [],
      category: "",
      minPrice: 0,
      maxPrice: 10000,
      minHealth: 0,
      sortBy: "recent",
    })
    setPage(1)
    router.replace("/marketplace")
  }

  const activeFiltersCount = 
    (filters.tech.length > 0 ? 1 : 0) +
    (filters.category ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 10000 ? 1 : 0) +
    (filters.minHealth > 0 ? 1 : 0)

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Project Marketplace
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Discover and acquire undervalued digital projects
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden w-80 flex-shrink-0 lg:block">
            <div className="sticky top-24 space-y-6">
              <Card className="border-0 bg-muted/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Filters</h3>
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="h-auto p-0 text-muted-foreground hover:text-foreground"
                      >
                        Clear all
                      </Button>
                    )}
                  </div>

                  <div className="space-y-6">
                    {/* Search */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Search
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="Search projects..."
                          value={filters.q}
                          onChange={(e) => updateFilters({ q: e.target.value })}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Category
                      </label>
                      <Select
                        value={filters.category}
                        onValueChange={(value) => updateFilters({ category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All categories</SelectItem>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-3 block">
                        Tech Stack
                      </label>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {TECH_STACK_OPTIONS.map((tech) => (
                          <div key={tech} className="flex items-center space-x-2">
                            <Checkbox
                              id={tech}
                              checked={filters.tech.includes(tech)}
                              onCheckedChange={(checked) => {
                                const newTech = checked
                                  ? [...filters.tech, tech]
                                  : filters.tech.filter((t) => t !== tech)
                                updateFilters({ tech: newTech })
                              }}
                            />
                            <label
                              htmlFor={tech}
                              className="text-sm text-foreground cursor-pointer"
                            >
                              {tech}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-3 block">
                        Price Range
                      </label>
                      <div className="space-y-3">
                        <Slider
                          value={[filters.minPrice, filters.maxPrice]}
                          onValueChange={([min, max]) => 
                            updateFilters({ minPrice: min, maxPrice: max })
                          }
                          max={10000}
                          step={100}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>${filters.minPrice.toLocaleString()}</span>
                          <span>${filters.maxPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Health Score */}
                    <div>
                      <label className="text-sm font-medium text-foreground mb-3 block">
                        Min Health Score
                      </label>
                      <div className="space-y-3">
                        <Slider
                          value={[filters.minHealth]}
                          onValueChange={([value]) => updateFilters({ minHealth: value })}
                          max={100}
                          step={5}
                          className="w-full"
                        />
                        <div className="text-sm text-muted-foreground">
                          {filters.minHealth}% and above
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filters & Controls */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => updateFilters({ sortBy: value })}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {data && (
                  <div className="text-sm text-muted-foreground">
                    {data.count} projects
                  </div>
                )}
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {filters.tech.map((tech) => (
                  <Badge key={tech} variant="secondary" className="gap-1">
                    {tech}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => 
                        updateFilters({ 
                          tech: filters.tech.filter((t) => t !== tech) 
                        })
                      }
                    />
                  </Badge>
                ))}
                {filters.category && (
                  <Badge variant="secondary" className="gap-1">
                    {filters.category}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => updateFilters({ category: "" })}
                    />
                  </Badge>
                )}
                {(filters.minPrice > 0 || filters.maxPrice < 10000) && (
                  <Badge variant="secondary" className="gap-1">
                    ${filters.minPrice.toLocaleString()} - ${filters.maxPrice.toLocaleString()}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => updateFilters({ minPrice: 0, maxPrice: 10000 })}
                    />
                  </Badge>
                )}
                {filters.minHealth > 0 && (
                  <Badge variant="secondary" className="gap-1">
                    Health ≥ {filters.minHealth}%
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => updateFilters({ minHealth: 0 })}
                    />
                  </Badge>
                )}
              </div>
            )}

            {/* Projects Grid/List */}
            {isLoading ? (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" 
                : "space-y-4"
              }>
                {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <Skeleton key={i} className="h-80 rounded-lg" />
                ))}
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground">
                    Something went wrong
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Failed to load projects. Please try again.
                  </p>
                  <Button className="mt-4" onClick={() => window.location.reload()}>
                    Retry
                  </Button>
                </div>
              </div>
            ) : !data?.data?.length ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground">
                    No projects found
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your filters or search terms.
                  </p>
                  <Button className="mt-4" onClick={clearFilters}>
                    Clear filters
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" 
                  : "space-y-4"
                }>
                  {data.data.map((project: any) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      viewMode={viewMode} 
                    />
                  ))}
                </div>

                {/* Pagination */}
                {data.count > PAGE_SIZE && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {Array.from({ 
                        length: Math.min(5, Math.ceil(data.count / PAGE_SIZE)) 
                      }).map((_, i) => {
                        const pageNum = i + 1
                        return (
                          <Button
                            key={pageNum}
                            variant={page === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPage(pageNum)}
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setPage(Math.min(Math.ceil(data.count / PAGE_SIZE), page + 1))}
                      disabled={page >= Math.ceil(data.count / PAGE_SIZE)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, viewMode }: { project: any; viewMode: "grid" | "list" }) {
  const [isLiked, setIsLiked] = useState(false)

  const healthColor = project.health_score >= 80 
    ? "text-green-500" 
    : project.health_score >= 50 
    ? "text-yellow-500" 
    : "text-red-500"

  if (viewMode === "list") {
    return (
      <Card className="group border-0 bg-muted/30 transition-all hover:bg-muted/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg">
              <img
                src={project.thumbnail || "/placeholder.jpg"}
                alt={project.title}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {project.tech_stack?.slice(0, 3).map((tech: string) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.tech_stack?.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.tech_stack.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="ml-4 text-right">
                  <div className="text-xl font-bold text-foreground">
                    ${project.value_min?.toLocaleString() || "0"}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className={`text-sm font-medium ${healthColor}`}>
                      {project.health_score || 0}% health
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {project.views || 0}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {project.likes || 0}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className="h-8 w-8 p-0"
                  >
                    <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  
                  <Link href={`/projects/${project.id}`}>
                    <Button size="sm" className="group">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group border-0 bg-muted/30 transition-all hover:bg-muted/50 hover:scale-105">
      <CardContent className="p-0">
        <div className="relative">
          <div className="aspect-video overflow-hidden rounded-t-lg">
            <img
              src={project.thumbnail || "/placeholder.jpg"}
              alt={project.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className="absolute top-3 right-3 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm hover:bg-background"
          >
            <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          
          <div className="absolute bottom-3 right-3">
            <Badge className={`${healthColor} bg-background/80 backdrop-blur-sm`}>
              {project.health_score || 0}%
            </Badge>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {project.tech_stack?.slice(0, 2).map((tech: string) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.tech_stack?.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{project.tech_stack.length - 2}
              </Badge>
            )}
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xl font-bold text-foreground">
              ${project.value_min?.toLocaleString() || "0"}
            </div>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {project.views || 0}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                {project.likes || 0}
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <Link href={`/projects/${project.id}`}>
              <Button className="w-full group">
                View Details
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}