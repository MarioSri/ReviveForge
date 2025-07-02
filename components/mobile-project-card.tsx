"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Eye, Star, TrendingUp, Calendar, Share2, Bookmark, ChevronRight, Zap } from "lucide-react"
import Link from "next/link"

interface MobileProjectCardProps {
  project: {
    id: string
    name: string
    description: string
    price: number
    healthScore: number
    techStack: string[]
    category: string
    lastUpdated: string
    views: number
    likes: number
    images: string[]
    seller: {
      name: string
      avatar: string
      rating: number
    }
    featured?: boolean
    trending?: boolean
  }
  onLike?: (id: string) => void
  onBookmark?: (id: string) => void
  onShare?: (id: string) => void
}

export function MobileProjectCard({ project, onLike, onBookmark, onShare }: MobileProjectCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    onLike?.(project.id)
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
    onBookmark?.(project.id)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onShare?.(project.id)
  }

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  return (
    <Card className="glass border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden">
      {/* Image Gallery */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={project.images[currentImageIndex] || "/placeholder.svg?height=224&width=400"}
          alt={project.name}
          className="w-full h-full object-cover"
        />

        {/* Image Navigation */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {project.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {project.featured && (
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs">Featured</Badge>
          )}
          {project.trending && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleLike}
            className={`w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
              isLiked ? "bg-red-500/80 text-white" : "bg-black/50 text-white hover:bg-black/70"
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={handleBookmark}
            className={`w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all ${
              isBookmarked ? "bg-blue-500/80 text-white" : "bg-black/50 text-white hover:bg-black/70"
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={handleShare}
            className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 flex items-center justify-center transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Health Score */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
          <TrendingUp className="w-3 h-3 text-green-400" />
          <span className="text-xs text-white font-medium">{project.healthScore}</span>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-lg leading-tight line-clamp-2 mb-1">{project.name}</h3>
            <Badge variant="outline" className="border-white/20 text-xs">
              {project.category}
            </Badge>
          </div>
          <div className="text-right ml-3">
            <div className="text-xl font-bold gradient-text">${project.price.toLocaleString()}</div>
            <div className="text-xs text-gray-400">one-time</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{project.description}</p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 mb-4">
          {project.techStack.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline" className="border-white/20 text-xs">
              {tech}
            </Badge>
          ))}
          {project.techStack.length > 3 && (
            <Badge variant="outline" className="border-white/20 text-xs">
              +{project.techStack.length - 3}
            </Badge>
          )}
        </div>

        {/* Seller Info */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={project.seller.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-xs">{project.seller.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-sm text-white font-medium truncate">{project.seller.name}</div>
            <div className="flex items-center text-xs text-gray-400">
              <Star className="w-3 h-3 text-yellow-400 mr-1" />
              {project.seller.rating}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {project.views}
            </div>
            <div className="flex items-center">
              <Heart className="w-4 h-4 mr-1" />
              {project.likes}
            </div>
          </div>
          <div className="flex items-center text-xs">
            <Calendar className="w-3 h-3 mr-1" />
            {project.lastUpdated}
          </div>
        </div>

        {/* Action Button */}
        <Link href={`/project/${project.id}`}>
          <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium">
            View Details
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
