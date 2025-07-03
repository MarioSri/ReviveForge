"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Plus,
  Eye,
  Heart,
  DollarSign,
  TrendingUp,
  Settings,
  Bell,
  Star,
  MessageSquare,
  Download,
  Edit,
  Trash2,
  Check,
  X,
  Calendar,
  MoreHorizontal,
  Filter,
  Search,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"
import { useOffers, useActOnOffer } from "@/lib/api"
import { toast } from "sonner"
import Link from "next/link"

// Mock data for demonstration
const userProjects = [
  {
    id: 1,
    name: "TaskFlow Pro",
    status: "Listed",
    price: 2500,
    views: 1250,
    likes: 45,
    offers: 3,
    listedDate: "2024-01-15",
    image: "/placeholder.jpg",
    healthScore: 78,
  },
  {
    id: 2,
    name: "DataViz Dashboard",
    status: "Draft",
    price: 1800,
    views: 0,
    likes: 0,
    offers: 0,
    listedDate: null,
    image: "/placeholder.jpg",
    healthScore: 72,
  },
]

const purchases = [
  {
    id: 1,
    name: "AI Content Generator",
    purchaseDate: "2024-01-10",
    price: 5500,
    seller: "Sarah Johnson",
    status: "Completed",
    image: "/placeholder.jpg",
  },
  {
    id: 2,
    name: "CryptoTracker",
    purchaseDate: "2024-01-05",
    price: 3200,
    seller: "Mike Chen",
    status: "In Progress",
    image: "/placeholder.jpg",
  },
]

const favorites = [
  {
    id: 1,
    name: "FitnessPal Clone",
    price: 2800,
    healthScore: 75,
    priceChange: "+5%",
    image: "/placeholder.jpg",
  },
  {
    id: 2,
    name: "ShopEasy Mobile",
    price: 4200,
    healthScore: 85,
    priceChange: "-2%",
    image: "/placeholder.jpg",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const { mutate: actOnOffer, isPending: actLoading } = useActOnOffer()

  const handleOfferAction = (id: string, action: "accept" | "reject") => {
    actOnOffer(
      { id, action },
      {
        onSuccess: () => {
          toast.success(`Offer ${action}ed successfully!`)
        },
        onError: () => {
          toast.error(`Failed to ${action} offer`)
        },
      }
    )
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Manage your projects and track your marketplace activity
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Link href="/sell">
              <Button className="group">
                <Plus className="w-4 h-4 mr-2" />
                List New Project
                <ArrowUpRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-br from-green-500/10 to-green-600/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                  <p className="text-2xl font-bold text-foreground">
                    ${(8700).toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 mt-1">+12% from last month</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                  <p className="text-2xl font-bold text-foreground">2</p>
                  <p className="text-xs text-blue-600 mt-1">1 pending review</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold text-foreground">
                    {(1250).toLocaleString()}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">+8% this week</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Offers</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-xs text-orange-600 mt-1">2 new today</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="border-0 bg-muted/30">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="border-b px-6 pt-6">
                <TabsList className="grid w-full grid-cols-5 bg-background/50">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="projects">My Projects</TabsTrigger>
                  <TabsTrigger value="offers-received">Offers Received</TabsTrigger>
                  <TabsTrigger value="offers-sent">Offers Sent</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="p-6">
                <div className="space-y-8">
                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          type: "offer",
                          message: "New offer received for TaskFlow Pro",
                          time: "2 hours ago",
                          amount: "$2,800",
                          status: "new"
                        },
                        {
                          type: "view",
                          message: "Your project DataViz Dashboard was viewed 15 times",
                          time: "5 hours ago",
                          status: "info"
                        },
                        {
                          type: "purchase",
                          message: "Purchase of AI Content Generator completed",
                          time: "1 day ago",
                          status: "success"
                        },
                        {
                          type: "like",
                          message: "TaskFlow Pro received 3 new likes",
                          time: "2 days ago",
                          status: "info"
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                        >
                          <div className={`w-2 h-2 rounded-full ${
                            activity.status === "new" ? "bg-orange-500" :
                            activity.status === "success" ? "bg-green-500" :
                            "bg-blue-500"
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              {activity.message}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.time}
                            </p>
                          </div>
                          {activity.amount && (
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                              {activity.amount}
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="border-0 bg-background/50 hover:bg-background/80 transition-colors cursor-pointer group">
                        <CardContent className="p-6 text-center">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                            <Plus className="w-6 h-6 text-primary" />
                          </div>
                          <h4 className="font-semibold text-foreground mb-2">List New Project</h4>
                          <p className="text-sm text-muted-foreground">
                            Add a new project to the marketplace
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-0 bg-background/50 hover:bg-background/80 transition-colors cursor-pointer group">
                        <CardContent className="p-6 text-center">
                          <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-500/20 transition-colors">
                            <Search className="w-6 h-6 text-blue-600" />
                          </div>
                          <h4 className="font-semibold text-foreground mb-2">Browse Projects</h4>
                          <p className="text-sm text-muted-foreground">
                            Discover new acquisition opportunities
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-0 bg-background/50 hover:bg-background/80 transition-colors cursor-pointer group">
                        <CardContent className="p-6 text-center">
                          <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-500/20 transition-colors">
                            <Sparkles className="w-6 h-6 text-purple-600" />
                          </div>
                          <h4 className="font-semibold text-foreground mb-2">AI Valuation</h4>
                          <p className="text-sm text-muted-foreground">
                            Get AI-powered project valuations
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="projects" className="p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">My Projects</h3>
                    <Link href="/sell">
                      <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </Link>
                  </div>

                  <div className="rounded-lg border border-border/50 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-border/50 hover:bg-muted/50">
                          <TableHead>Project</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Views</TableHead>
                          <TableHead>Offers</TableHead>
                          <TableHead>Health</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {userProjects.map((project) => (
                          <TableRow key={project.id} className="border-border/50 hover:bg-muted/50">
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <img
                                  src={project.image}
                                  alt={project.name}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                                <div>
                                  <div className="font-medium text-foreground">{project.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {project.listedDate ? `Listed ${project.listedDate}` : "Draft"}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={project.status === "Listed" ? "default" : "secondary"}
                              >
                                {project.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="font-medium">
                              ${project.price.toLocaleString()}
                            </TableCell>
                            <TableCell>{project.views}</TableCell>
                            <TableCell>{project.offers}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="text-sm font-medium">{project.healthScore}%</div>
                                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                                    style={{ width: `${project.healthScore}%` }}
                                  />
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="offers-received" className="p-6">
                <OffersTable type="received" onAction={handleOfferAction} loading={actLoading} />
              </TabsContent>

              <TabsContent value="offers-sent" className="p-6">
                <OffersTable type="sent" onAction={handleOfferAction} loading={actLoading} />
              </TabsContent>

              <TabsContent value="favorites" className="p-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Favorite Projects</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((item) => (
                      <Card key={item.id} className="border-0 bg-background/50 hover:bg-background/80 transition-all hover:scale-105 group">
                        <CardContent className="p-0">
                          <div className="aspect-video overflow-hidden rounded-t-lg">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-foreground mb-2">{item.name}</h4>
                            <div className="flex items-center justify-between">
                              <div className="text-lg font-bold text-foreground">
                                ${item.price.toLocaleString()}
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant={item.priceChange.startsWith("+") ? "destructive" : "default"}
                                  className="text-xs"
                                >
                                  {item.priceChange}
                                </Badge>
                              </div>
                            </div>
                            <div className="mt-2 text-sm text-muted-foreground">
                              Health Score: {item.healthScore}%
                            </div>
                            <Button className="w-full mt-4" size="sm">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function OffersTable({ 
  type, 
  onAction, 
  loading 
}: { 
  type: "received" | "sent"
  onAction: (id: string, action: "accept" | "reject") => void
  loading: boolean
}) {
  // Mock data - in real app this would come from the API
  const offers = [
    {
      id: "1",
      project: "TaskFlow Pro",
      amount: 2800,
      buyer: "Sarah Johnson",
      seller: "Alex Chen",
      status: "pending",
      date: "2024-01-15",
      avatar: "/placeholder.svg",
    },
    {
      id: "2",
      project: "DataViz Dashboard",
      amount: 1500,
      buyer: "Mike Rodriguez",
      seller: "Alex Chen",
      status: "accepted",
      date: "2024-01-10",
      avatar: "/placeholder.svg",
    },
  ]

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-foreground">
        {type === "received" ? "Offers Received" : "Offers Sent"}
      </h3>

      <div className="rounded-lg border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-muted/50">
              <TableHead>Project</TableHead>
              <TableHead>{type === "received" ? "Buyer" : "Seller"}</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              {type === "received" && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id} className="border-border/50 hover:bg-muted/50">
                <TableCell>
                  <div className="font-medium text-foreground">{offer.project}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={offer.avatar} />
                      <AvatarFallback>
                        {(type === "received" ? offer.buyer : offer.seller).charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground">
                      {type === "received" ? offer.buyer : offer.seller}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  ${offer.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      offer.status === "pending"
                        ? "secondary"
                        : offer.status === "accepted"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {offer.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{offer.date}</TableCell>
                {type === "received" && (
                  <TableCell className="text-right">
                    {offer.status === "pending" && (
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onAction(offer.id, "reject")}
                          disabled={loading}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => onAction(offer.id, "accept")}
                          disabled={loading}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}