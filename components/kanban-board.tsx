"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, MoreHorizontal, Calendar, DollarSign, MessageSquare, Paperclip, Star } from "lucide-react"

interface KanbanCard {
  id: string
  title: string
  description: string
  price: number
  seller: {
    name: string
    avatar: string
    rating: number
  }
  dueDate: string
  priority: "Low" | "Medium" | "High"
  tags: string[]
  comments: number
  attachments: number
  healthScore: number
}

interface KanbanColumn {
  id: string
  title: string
  color: string
  cards: KanbanCard[]
  limit?: number
}

const initialColumns: KanbanColumn[] = [
  {
    id: "interested",
    title: "Interested",
    color: "bg-blue-500/20 border-blue-500/30",
    cards: [
      {
        id: "1",
        title: "TaskFlow Pro",
        description: "Project management SaaS with great potential",
        price: 2500,
        seller: { name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32", rating: 4.8 },
        dueDate: "2024-02-15",
        priority: "High",
        tags: ["SaaS", "React", "Node.js"],
        comments: 3,
        attachments: 2,
        healthScore: 78,
      },
      {
        id: "2",
        title: "DataViz Dashboard",
        description: "Analytics dashboard with beautiful charts",
        price: 1800,
        seller: { name: "Mike Rodriguez", avatar: "/placeholder.svg?height=32&width=32", rating: 4.6 },
        dueDate: "2024-02-20",
        priority: "Medium",
        tags: ["Web App", "Vue.js", "Python"],
        comments: 1,
        attachments: 1,
        healthScore: 72,
      },
    ],
  },
  {
    id: "evaluating",
    title: "Evaluating",
    color: "bg-yellow-500/20 border-yellow-500/30",
    limit: 3,
    cards: [
      {
        id: "3",
        title: "AI Content Generator",
        description: "GPT-powered content generation tool",
        price: 5500,
        seller: { name: "Emily Watson", avatar: "/placeholder.svg?height=32&width=32", rating: 4.7 },
        dueDate: "2024-02-10",
        priority: "High",
        tags: ["AI/ML", "Next.js", "OpenAI"],
        comments: 5,
        attachments: 4,
        healthScore: 90,
      },
    ],
  },
  {
    id: "negotiating",
    title: "Negotiating",
    color: "bg-orange-500/20 border-orange-500/30",
    cards: [
      {
        id: "4",
        title: "ShopEasy Mobile",
        description: "E-commerce mobile app with payment integration",
        price: 4200,
        seller: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32", rating: 4.9 },
        dueDate: "2024-02-08",
        priority: "High",
        tags: ["Mobile App", "React Native", "Firebase"],
        comments: 8,
        attachments: 3,
        healthScore: 85,
      },
    ],
  },
  {
    id: "acquired",
    title: "Acquired",
    color: "bg-green-500/20 border-green-500/30",
    cards: [
      {
        id: "5",
        title: "CryptoTracker",
        description: "Cryptocurrency portfolio tracker",
        price: 3200,
        seller: { name: "David Kim", avatar: "/placeholder.svg?height=32&width=32", rating: 4.5 },
        dueDate: "2024-01-30",
        priority: "Medium",
        tags: ["Web App", "Angular", "Express"],
        comments: 2,
        attachments: 1,
        healthScore: 68,
      },
    ],
  },
]

export function KanbanBoard() {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns)
  const [draggedCard, setDraggedCard] = useState<KanbanCard | null>(null)
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null)
  const [newCardTitle, setNewCardTitle] = useState("")
  const [showNewCardDialog, setShowNewCardDialog] = useState(false)
  const [selectedColumn, setSelectedColumn] = useState<string>("")

  const handleDragStart = (card: KanbanCard, columnId: string) => {
    setDraggedCard(card)
    setDraggedFrom(columnId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault()
    if (!draggedCard || !draggedFrom) return

    const newColumns = columns.map((column) => {
      if (column.id === draggedFrom) {
        return {
          ...column,
          cards: column.cards.filter((card) => card.id !== draggedCard.id),
        }
      }
      if (column.id === targetColumnId) {
        return {
          ...column,
          cards: [...column.cards, draggedCard],
        }
      }
      return column
    })

    setColumns(newColumns)
    setDraggedCard(null)
    setDraggedFrom(null)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-500/20 text-red-400"
      case "Medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "Low":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const addNewCard = () => {
    if (!newCardTitle.trim() || !selectedColumn) return

    const newCard: KanbanCard = {
      id: Date.now().toString(),
      title: newCardTitle,
      description: "New project opportunity",
      price: 0,
      seller: { name: "Unknown", avatar: "/placeholder.svg?height=32&width=32", rating: 0 },
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      priority: "Medium",
      tags: [],
      comments: 0,
      attachments: 0,
      healthScore: 0,
    }

    const newColumns = columns.map((column) => {
      if (column.id === selectedColumn) {
        return {
          ...column,
          cards: [...column.cards, newCard],
        }
      }
      return column
    })

    setColumns(newColumns)
    setNewCardTitle("")
    setShowNewCardDialog(false)
    setSelectedColumn("")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Project Acquisition Pipeline</h2>
          <p className="text-gray-400">Track your project acquisition journey from interest to completion</p>
        </div>
        <Dialog open={showNewCardDialog} onOpenChange={setShowNewCardDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="glass border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Project</DialogTitle>
              <DialogDescription className="text-gray-400">
                Add a new project to your acquisition pipeline
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Title</label>
                <Input
                  value={newCardTitle}
                  onChange={(e) => setNewCardTitle(e.target.value)}
                  placeholder="Enter project name"
                  className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Column</label>
                <select
                  value={selectedColumn}
                  onChange={(e) => setSelectedColumn(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white"
                >
                  <option value="">Select a column</option>
                  {columns.map((column) => (
                    <option key={column.id} value={column.id}>
                      {column.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewCardDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={addNewCard} className="bg-gradient-to-r from-purple-500 to-blue-500">
                  Add Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-80"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            <Card className={`glass border-white/10 ${column.color} h-full`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-white text-sm font-medium">{column.title}</CardTitle>
                    <Badge variant="outline" className="border-white/20 text-xs">
                      {column.cards.length}
                    </Badge>
                    {column.limit && (
                      <Badge variant="outline" className="border-white/20 text-xs">
                        /{column.limit}
                      </Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" className="hover:bg-white/10">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {column.cards.map((card) => (
                  <Card
                    key={card.id}
                    className="glass border-white/10 cursor-move hover:border-purple-500/50 transition-all duration-200"
                    draggable
                    onDragStart={() => handleDragStart(card, column.id)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {/* Header */}
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-white text-sm line-clamp-2">{card.title}</h3>
                          <Badge className={getPriorityColor(card.priority)} variant="outline">
                            {card.priority}
                          </Badge>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-400 line-clamp-2">{card.description}</p>

                        {/* Price and Health Score */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3 text-green-400" />
                            <span className="text-sm font-medium text-green-400">${card.price.toLocaleString()}</span>
                          </div>
                          {card.healthScore > 0 && (
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 rounded-full bg-green-400" />
                              <span className="text-xs text-gray-400">{card.healthScore}% health</span>
                            </div>
                          )}
                        </div>

                        {/* Tags */}
                        {card.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {card.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="outline" className="border-white/20 text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {card.tags.length > 2 && (
                              <Badge variant="outline" className="border-white/20 text-xs">
                                +{card.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Seller Info */}
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-5 h-5">
                            <AvatarImage src={card.seller.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">{card.seller.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-gray-400">{card.seller.name}</span>
                          {card.seller.rating > 0 && (
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-400" />
                              <span className="text-xs text-gray-400 ml-1">{card.seller.rating}</span>
                            </div>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <div className="flex items-center space-x-3 text-xs text-gray-400">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(card.dueDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-gray-400">
                            {card.comments > 0 && (
                              <div className="flex items-center">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                {card.comments}
                              </div>
                            )}
                            {card.attachments > 0 && (
                              <div className="flex items-center">
                                <Paperclip className="w-3 h-3 mr-1" />
                                {card.attachments}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Add Card Button */}
                <Button
                  variant="ghost"
                  className="w-full border-2 border-dashed border-white/20 hover:border-white/40 hover:bg-white/5 text-gray-400 hover:text-white"
                  onClick={() => {
                    setSelectedColumn(column.id)
                    setShowNewCardDialog(true)
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Project
                </Button>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((column) => {
          const totalValue = column.cards.reduce((sum, card) => sum + card.price, 0)
          return (
            <Card key={column.id} className="glass border-white/10">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{column.title}</span>
                    <Badge variant="outline" className="border-white/20 text-xs">
                      {column.cards.length}
                    </Badge>
                  </div>
                  <div className="text-lg font-semibold gradient-text">${totalValue.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Total pipeline value</div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
