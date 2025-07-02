"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Filter, X, SlidersHorizontal, ChevronDown } from "lucide-react"

interface FilterState {
  categories: string[]
  priceRange: [number, number]
  techStack: string[]
  healthScore: [number, number]
  sortBy: string
}

interface MobileFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
}

const categories = [
  { id: "saas", label: "SaaS Platforms", count: 45 },
  { id: "mobile", label: "Mobile Apps", count: 32 },
  { id: "web", label: "Web Apps", count: 67 },
  { id: "ecommerce", label: "E-commerce", count: 28 },
  { id: "ai", label: "AI/ML", count: 19 },
  { id: "blockchain", label: "Blockchain", count: 12 },
]

const techStacks = [
  { id: "react", label: "React", count: 89 },
  { id: "nodejs", label: "Node.js", count: 76 },
  { id: "python", label: "Python", count: 54 },
  { id: "nextjs", label: "Next.js", count: 43 },
  { id: "vue", label: "Vue.js", count: 32 },
  { id: "angular", label: "Angular", count: 28 },
  { id: "flutter", label: "Flutter", count: 21 },
  { id: "django", label: "Django", count: 18 },
]

const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "health", label: "Health Score" },
  { value: "popular", label: "Most Popular" },
  { value: "trending", label: "Trending" },
]

export function MobileFilters({ filters, onFiltersChange, onClearFilters }: MobileFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(["categories", "price"])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const updateFilters = (updates: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  const toggleCategory = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((c) => c !== categoryId)
      : [...filters.categories, categoryId]
    updateFilters({ categories: newCategories })
  }

  const toggleTechStack = (techId: string) => {
    const newTechStack = filters.techStack.includes(techId)
      ? filters.techStack.filter((t) => t !== techId)
      : [...filters.techStack, techId]
    updateFilters({ techStack: newTechStack })
  }

  const activeFiltersCount =
    filters.categories.length +
    filters.techStack.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0) +
    (filters.healthScore[0] > 0 || filters.healthScore[1] < 100 ? 1 : 0)

  return (
    <div className="flex items-center space-x-2">
      {/* Sort Dropdown */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 bg-transparent">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Sort
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="glass border-white/10 h-[300px]">
          <SheetHeader>
            <SheetTitle className="text-white">Sort Projects</SheetTitle>
          </SheetHeader>
          <div className="grid grid-cols-1 gap-2 mt-4">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                variant={filters.sortBy === option.value ? "default" : "ghost"}
                className={`justify-start ${
                  filters.sortBy === option.value ? "bg-gradient-to-r from-purple-500 to-blue-500" : "hover:bg-white/10"
                }`}
                onClick={() => {
                  updateFilters({ sortBy: option.value })
                  setIsOpen(false)
                }}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Filters */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 bg-transparent relative">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center bg-purple-500 text-white text-xs">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="glass border-white/10 h-[80vh]">
          <SheetHeader>
            <div className="flex items-center justify-between">
              <SheetTitle className="text-white">Filter Projects</SheetTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" onClick={onClearFilters} className="text-gray-400 hover:text-white">
                  Clear All
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="h-full mt-4">
            <div className="space-y-6 pb-20">
              {/* Categories */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto text-left hover:bg-transparent"
                  onClick={() => toggleSection("categories")}
                >
                  <span className="text-white font-semibold">Categories</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedSections.includes("categories") ? "rotate-180" : ""
                    }`}
                  />
                </Button>

                {expandedSections.includes("categories") && (
                  <div className="mt-3 space-y-3">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={category.id}
                            checked={filters.categories.includes(category.id)}
                            onCheckedChange={() => toggleCategory(category.id)}
                          />
                          <label htmlFor={category.id} className="text-gray-300 cursor-pointer flex-1">
                            {category.label}
                          </label>
                        </div>
                        <Badge variant="outline" className="border-white/20 text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator className="bg-white/10" />

              {/* Price Range */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto text-left hover:bg-transparent"
                  onClick={() => toggleSection("price")}
                >
                  <span className="text-white font-semibold">Price Range</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedSections.includes("price") ? "rotate-180" : ""}`}
                  />
                </Button>

                {expandedSections.includes("price") && (
                  <div className="mt-4 space-y-4">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
                      max={10000}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>${filters.priceRange[0].toLocaleString()}</span>
                      <span>${filters.priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>

              <Separator className="bg-white/10" />

              {/* Health Score */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto text-left hover:bg-transparent"
                  onClick={() => toggleSection("health")}
                >
                  <span className="text-white font-semibold">Health Score</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedSections.includes("health") ? "rotate-180" : ""
                    }`}
                  />
                </Button>

                {expandedSections.includes("health") && (
                  <div className="mt-4 space-y-4">
                    <Slider
                      value={filters.healthScore}
                      onValueChange={(value) => updateFilters({ healthScore: value as [number, number] })}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{filters.healthScore[0]}%</span>
                      <span>{filters.healthScore[1]}%</span>
                    </div>
                  </div>
                )}
              </div>

              <Separator className="bg-white/10" />

              {/* Tech Stack */}
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between p-0 h-auto text-left hover:bg-transparent"
                  onClick={() => toggleSection("tech")}
                >
                  <span className="text-white font-semibold">Tech Stack</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${expandedSections.includes("tech") ? "rotate-180" : ""}`}
                  />
                </Button>

                {expandedSections.includes("tech") && (
                  <div className="mt-3 space-y-3">
                    {techStacks.map((tech) => (
                      <div key={tech.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            id={tech.id}
                            checked={filters.techStack.includes(tech.id)}
                            onCheckedChange={() => toggleTechStack(tech.id)}
                          />
                          <label htmlFor={tech.id} className="text-gray-300 cursor-pointer flex-1">
                            {tech.label}
                          </label>
                        </div>
                        <Badge variant="outline" className="border-white/20 text-xs">
                          {tech.count}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>

          {/* Apply Button */}
          <div className="absolute bottom-0 left-0 right-0 p-4 glass border-t border-white/10">
            <Button
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Apply Filters ({activeFiltersCount})
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center space-x-2 overflow-x-auto">
          {filters.categories.map((categoryId) => {
            const category = categories.find((c) => c.id === categoryId)
            return category ? (
              <Badge
                key={categoryId}
                variant="outline"
                className="border-purple-500/50 text-purple-300 whitespace-nowrap"
              >
                {category.label}
                <button onClick={() => toggleCategory(categoryId)} className="ml-1 hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ) : null
          })}

          {filters.techStack.map((techId) => {
            const tech = techStacks.find((t) => t.id === techId)
            return tech ? (
              <Badge key={techId} variant="outline" className="border-blue-500/50 text-blue-300 whitespace-nowrap">
                {tech.label}
                <button onClick={() => toggleTechStack(techId)} className="ml-1 hover:text-white">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ) : null
          })}
        </div>
      )}
    </div>
  )
}
