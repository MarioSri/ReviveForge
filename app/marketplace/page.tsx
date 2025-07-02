"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  SlidersHorizontal,
  Eye,
  Heart,
  TrendingUp,
  Calendar,
  Code,
  Globe,
  Smartphone,
  ShoppingCart,
  Brain,
} from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    name: "TaskFlow Pro",
    description: "Abandoned project management SaaS with 200+ GitHub stars and solid foundation",
    price: 2500,
    healthScore: 78,
    techStack: ["React", "Node.js", "PostgreSQL"],
    category: "SaaS",
    lastUpdated: "6 months ago",
    views: 1250,
    likes: 45,
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 2,
    name: "ShopEasy Mobile",
    description: "E-commerce mobile app with payment integration and user base of 500+ downloads",
    price: 4200,
    healthScore: 85,
    techStack: ["React Native", "Firebase", "Stripe"],
    category: "Mobile App",
    lastUpdated: "3 months ago",
    views: 890,
    likes: 32,
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 3,
    name: "DataViz Dashboard",
    description: "Analytics dashboard with beautiful charts and real-time data processing",
    price: 1800,
    healthScore: 72,
    techStack: ["Vue.js", "Python", "MongoDB"],
    category: "Web App",
    lastUpdated: "4 months ago",
    views: 650,
    likes: 28,
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 4,
    name: "AI Content Generator",
    description: "GPT-powered content generation tool with API integration and user management",
    price: 5500,
    healthScore: 90,
    techStack: ["Next.js", "OpenAI API", "Prisma"],
    category: "AI/ML",
    lastUpdated: "2 months ago",
    views: 1450,
    likes: 67,
    image: "/placeholder.svg?height=200&width=300",
    featured: true,
  },
  {
    id: 5,
    name: "CryptoTracker",
    description: "Cryptocurrency portfolio tracker with real-time prices and alerts",
    price: 3200,
    healthScore: 68,
    techStack: ["Angular", "Express", "Redis"],
    category: "Web App",
    lastUpdated: "5 months ago",
    views: 720,
    likes: 19,
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
  {
    id: 6,
    name: "FitnessPal Clone",
    description: "Fitness tracking app with workout plans and nutrition database",
    price: 2800,
    healthScore: 75,
    techStack: ["Flutter", "Django", "PostgreSQL"],
    category: "Mobile App",
    lastUpdated: "7 months ago",
    views: 980,
    likes: 41,
    image: "/placeholder.svg?height=200&width=300",
    featured: false,
  },
]

const categories = [
  { name: "SaaS Platforms", icon: Globe, count: 45 },
  { name: "Mobile App", icon: Smartphone, count: 32 },
  { name: "Web App", icon: Code, count: 67 },
  { name: "E-commerce", icon: ShoppingCart, count: 28 },
  { name: "AI/ML", icon: Brain, count: 19 },
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recent")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = project.price >= priceRange[0] && project.price <= priceRange[1]
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(project.category)

    return matchesSearch && matchesPrice && matchesCategory
  })

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "health":
        return b.healthScore - a.healthScore
      case "popular":
        return b.views - a.views
      default:
        return 0
    }
  })

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Project <span className="gradient-text">Marketplace</span>
          </h1>
          <p className="text-gray-300 text-lg">Discover and acquire abandoned digital projects with potential</p>
        </div>

        {/* Search and Filters */}
        <div className="glass-card mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search projects, technologies, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-white/20 hover:bg-white/10"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white"
              >
                <option value="recent">Most Recent</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="health">Health Score</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Price Range</h3>
                  <Slider value={priceRange} onValueChange={setPriceRange} max={10000} step={100} className="mb-2" />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.name} className="flex items-center space-x-2">
                        <Checkbox
                          id={category.name}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([...selectedCategories, category.name])
                            } else {
                              setSelectedCategories(selectedCategories.filter((c) => c !== category.name))
                            }
                          }}
                        />
                        <label htmlFor={category.name} className="text-sm text-gray-300 cursor-pointer">
                          {category.name} ({category.count})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Popular Tech</h3>
                  <div className="flex flex-wrap gap-2">
                    {["React", "Node.js", "Python", "Vue.js", "Next.js", "Flutter"].map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="border-white/20 text-gray-300 hover:bg-white/10 cursor-pointer"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-300">
            Showing {sortedProjects.length} of {projects.length} projects
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 bg-transparent">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Grid View
            </Button>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map((project) => (
            <Card
              key={project.id}
              className="glass border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="relative">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {project.featured && (
                  <Badge className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-blue-500">Featured</Badge>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button size="sm" variant="ghost" className="bg-black/50 hover:bg-black/70">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-white group-hover:text-purple-400 transition-colors">
                    {project.name}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-400">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {project.healthScore}
                  </div>
                </div>
                <CardDescription className="text-gray-400 line-clamp-2">{project.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-white/20 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between text-sm text-gray-400">
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {project.views}
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1" />
                      {project.likes}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.lastUpdated}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div>
                      <div className="text-2xl font-bold gradient-text">${project.price.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">One-time purchase</div>
                    </div>
                    <Link href={`/project/${project.id}`}>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" className="border-white/20 hover:bg-white/10 bg-transparent">
            Load More Projects
          </Button>
        </div>
      </div>
    </div>
  )
}
