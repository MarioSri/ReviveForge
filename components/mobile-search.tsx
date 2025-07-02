"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, X, Clock, TrendingUp, Star, ArrowUpRight, Mic, Camera, Filter } from "lucide-react"

interface SearchResult {
  id: string
  type: "project" | "seller" | "category"
  title: string
  subtitle?: string
  price?: number
  rating?: number
  avatar?: string
  category?: string
  trending?: boolean
}

interface MobileSearchProps {
  onSearch: (query: string) => void
  onFilterToggle: () => void
}

const recentSearches = [
  "React SaaS projects",
  "Mobile apps under $5000",
  "AI content generators",
  "E-commerce platforms",
  "Next.js applications",
]

const trendingSearches = [
  "AI chatbots",
  "Crypto trading bots",
  "Social media apps",
  "Productivity tools",
  "Health & fitness apps",
]

const sampleResults: SearchResult[] = [
  {
    id: "1",
    type: "project",
    title: "TaskFlow Pro",
    subtitle: "Project management SaaS",
    price: 2500,
    category: "SaaS",
    trending: true,
  },
  {
    id: "2",
    type: "project",
    title: "AI Content Generator",
    subtitle: "GPT-powered writing tool",
    price: 5500,
    category: "AI/ML",
  },
  {
    id: "3",
    type: "seller",
    title: "Alex Chen",
    subtitle: "Premium seller • 15 projects sold",
    rating: 4.8,
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    type: "category",
    title: "SaaS Platforms",
    subtitle: "45 projects available",
  },
]

export function MobileSearch({ onSearch, onFilterToggle }: MobileSearchProps) {
  const [query, setQuery] = useState("")
  const [isExpanded, setIsExpanded] = useState(false)
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        setResults(
          sampleResults.filter(
            (result) =>
              result.title.toLowerCase().includes(query.toLowerCase()) ||
              result.subtitle?.toLowerCase().includes(query.toLowerCase()),
          ),
        )
        setIsLoading(false)
      }, 300)
    } else {
      setResults([])
    }
  }, [query])

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    onSearch(searchQuery)
    setIsExpanded(false)
    inputRef.current?.blur()
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    inputRef.current?.focus()
  }

  const handleVoiceSearch = () => {
    // Voice search implementation would go here
    console.log("Voice search activated")
  }

  const handleImageSearch = () => {
    // Image search implementation would go here
    console.log("Image search activated")
  }

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          placeholder="Search projects, sellers, or categories..."
          className="pl-12 pr-24 h-12 bg-white/5 border-white/10 text-white placeholder-gray-400 rounded-xl"
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {query && (
            <Button variant="ghost" size="sm" onClick={clearSearch} className="w-8 h-8 p-0 hover:bg-white/10">
              <X className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={handleVoiceSearch} className="w-8 h-8 p-0 hover:bg-white/10">
            <Mic className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleImageSearch} className="w-8 h-8 p-0 hover:bg-white/10">
            <Camera className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onFilterToggle} className="w-8 h-8 p-0 hover:bg-white/10">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search Overlay */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-gray-950/95 backdrop-blur-sm">
          <div className="p-4">
            {/* Search Header */}
            <div className="flex items-center space-x-3 mb-6">
              <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)} className="w-10 h-10 p-0">
                <X className="w-5 h-5" />
              </Button>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, sellers, or categories..."
                  className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder-gray-400 rounded-xl"
                  autoFocus
                />
              </div>
            </div>

            {/* Search Content */}
            <div className="space-y-6">
              {/* Search Results */}
              {query.length > 2 && (
                <div>
                  <h3 className="text-white font-semibold mb-3">Search Results</h3>
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse">
                          <div className="h-16 bg-white/5 rounded-lg"></div>
                        </div>
                      ))}
                    </div>
                  ) : results.length > 0 ? (
                    <div className="space-y-2">
                      {results.map((result) => (
                        <Card
                          key={result.id}
                          className="glass border-white/10 cursor-pointer hover:border-purple-500/50 transition-colors"
                          onClick={() => handleSearch(result.title)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              {result.type === "seller" && result.avatar ? (
                                <Avatar className="w-10 h-10">
                                  <AvatarImage src={result.avatar || "/placeholder.svg"} />
                                  <AvatarFallback>{result.title.charAt(0)}</AvatarFallback>
                                </Avatar>
                              ) : (
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                  {result.type === "project" && <Search className="w-5 h-5 text-white" />}
                                  {result.type === "category" && <Filter className="w-5 h-5 text-white" />}
                                  {result.type === "seller" && <Star className="w-5 h-5 text-white" />}
                                </div>
                              )}

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-medium text-white truncate">{result.title}</h4>
                                  {result.trending && (
                                    <Badge className="bg-orange-500/20 text-orange-400 text-xs">
                                      <TrendingUp className="w-3 h-3 mr-1" />
                                      Trending
                                    </Badge>
                                  )}
                                </div>
                                {result.subtitle && <p className="text-sm text-gray-400 truncate">{result.subtitle}</p>}
                              </div>

                              <div className="flex items-center space-x-2">
                                {result.price && (
                                  <span className="text-sm font-medium gradient-text">
                                    ${result.price.toLocaleString()}
                                  </span>
                                )}
                                {result.rating && (
                                  <div className="flex items-center text-sm text-gray-400">
                                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                    {result.rating}
                                  </div>
                                )}
                                <ArrowUpRight className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No results found for "{query}"</p>
                    </div>
                  )}
                </div>
              )}

              {/* Recent Searches */}
              {query.length <= 2 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">Recent Searches</h3>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      Clear
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                      >
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-300">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              {query.length <= 2 && (
                <div>
                  <h3 className="text-white font-semibold mb-3">Trending Searches</h3>
                  <div className="space-y-2">
                    {trendingSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-white/5 transition-colors text-left"
                      >
                        <TrendingUp className="w-4 h-4 text-orange-400" />
                        <span className="text-gray-300">{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
