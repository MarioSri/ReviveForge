"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2 } from "lucide-react"

interface SwipeableGalleryProps {
  images: string[]
  title?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showControls?: boolean
  showIndicators?: boolean
  className?: string
  onImageClick?: (index: number) => void
}

export function SwipeableGallery({
  images,
  title,
  autoPlay = false,
  autoPlayInterval = 3000,
  showControls = true,
  showIndicators = true,
  className = "",
  onImageClick,
}: SwipeableGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  useEffect(() => {
    if (isPlaying && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
      }, autoPlayInterval)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, images.length, autoPlayInterval])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  const handleImageClick = (index: number) => {
    onImageClick?.(index)
  }

  if (images.length === 0) {
    return (
      <Card className={`glass border-white/10 ${className}`}>
        <div className="aspect-video flex items-center justify-center text-gray-400">
          <p>No images available</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className={`glass border-white/10 overflow-hidden ${className}`}>
      <div className="relative">
        {/* Title */}
        {title && (
          <div className="absolute top-4 left-4 z-10">
            <Badge className="bg-black/50 backdrop-blur-sm text-white">{title}</Badge>
          </div>
        )}

        {/* Controls */}
        {showControls && images.length > 1 && (
          <div className="absolute top-4 right-4 z-10 flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlayPause}
              className="w-8 h-8 p-0 bg-black/50 backdrop-blur-sm hover:bg-black/70"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleImageClick(currentIndex)}
              className="w-8 h-8 p-0 bg-black/50 backdrop-blur-sm hover:bg-black/70"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Image Container */}
        <div
          ref={containerRef}
          className="relative aspect-video overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-300 ease-in-out h-full"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              width: `${images.length * 100}%`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 cursor-pointer"
                onClick={() => handleImageClick(index)}
              >
                <img
                  src={image || "/placeholder.svg?height=400&width=600"}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-black/50 backdrop-blur-sm hover:bg-black/70"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-black/50 backdrop-blur-sm hover:bg-black/70"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </>
        )}

        {/* Indicators */}
        {showIndicators && images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4">
            <Badge className="bg-black/50 backdrop-blur-sm text-white text-xs">
              {currentIndex + 1} / {images.length}
            </Badge>
          </div>
        )}
      </div>
    </Card>
  )
}
