"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
} from "lucide-react"
import { useOffers, useActOnOffer } from "@/lib/api"
import DataTable from "@/components/advanced-data-table"
import { useToast } from "@/hooks/use-toast"

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
    image: "/placeholder.svg?height=100&width=150",
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
    image: "/placeholder.svg?height=100&width=150",
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
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 2,
    name: "CryptoTracker",
    purchaseDate: "2024-01-05",
    price: 3200,
    seller: "Mike Chen",
    status: "In Progress",
    image: "/placeholder.svg?height=100&width=150",
  },
]

const watchlist = [
  {
    id: 1,
    name: "FitnessPal Clone",
    price: 2800,
    healthScore: 75,
    priceChange: "+5%",
    image: "/placeholder.svg?height=100&width=150",
  },
  {
    id: 2,
    name: "ShopEasy Mobile",
    price: 4200,
    healthScore: 85,
    priceChange: "-2%",
    image: "/placeholder.svg?height=100&width=150",
  },
]

const recentActivity = [
  {
    type: "offer",
    message: "New offer received for TaskFlow Pro",
    time: "2 hours ago",
    amount: "$2,800",
  },
  {
    type: "view",
    message: "Your project DataViz Dashboard was viewed 15 times",
    time: "5 hours ago",
  },
  {
    type: "purchase",
    message: "Purchase of AI Content Generator completed",
    time: "1 day ago",
  },
  {
    type: "like",
    message: "TaskFlow Pro received 3 new likes",
    time: "2 days ago",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [tab, setTab] = useState<"received" | "sent">("received")
  const {
    data: receivedOffers,
    isLoading: loadingReceived,
    error: errorReceived,
  } = useOffers(true)
  const {
    data: sentOffers,
    isLoading: loadingSent,
    error: errorSent,
  } = useOffers(false)
  const { mutate: actOnOffer, isLoading: actLoading } = useActOnOffer()
  const toast = useToast()

  function handleAction(id: string, action: "accept" | "reject") {
    actOnOffer(
      { id, action },
      {
        onSuccess: () =>
          toast.toast({ title: `Offer ${action}ed!` }),
        onError: () =>
          toast.toast({ title: "Error", variant: "destructive" }),
      }
    )
  }

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Welcome back, <span className="gradient-text">Alex</span>
            </h1>
            <p className="text-gray-300">
              Manage your projects and track your marketplace activity
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            List New Project
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="glass border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Earnings</p>
                  <p className="text-2xl font-bold gradient-text">
                    {(8700).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Listings</p>
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
                <Eye className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Views</p>
                  <p className="text-2xl font-bold text-white">
                    {(1250).toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Pending Offers</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <MessageSquare className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 bg-white/5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">My Projects</TabsTrigger>
                <TabsTrigger value="purchases">Purchases</TabsTrigger>
                <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  {/* Recent Activity */}
                  <Card className="glass border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-3 rounded-lg bg-white/5"
                          >
                            <div
                              className={`w-2 h-2 rounded-full ${
                                activity.type === "offer"
                                  ? "bg-green-400"
                                  : activity.type === "view"
                                  ? "bg-blue-400"
                                  : activity.type === "purchase"
                                  ? "bg-purple-400"
                                  : "bg-yellow-400"
                              }`}
                            />
                            <div className="flex-1">
                              <p className="text-white text-sm">
                                {activity.message}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {activity.time}
                              </p>
                            </div>
                            {activity.amount && (
                              <Badge className="bg-green-500/20 text-green-400">
                                {activity.amount}
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="projects" className="mt-6">
                <Card className="glass border-white/10">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-white">My Projects</CardTitle>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-purple-500 to-blue-500"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userProjects.map((project) => (
                        <div
                          key={project.id}
                          className="flex items-center space-x-4 p-4 rounded-lg bg-white/5"
                        >
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">
                              {project.name}
                            </h3>
                            <div className="flex items-center space-x-4 mt-1">
                              <Badge
                                variant={
                                  project.status === "Listed"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {project.status}
                              </Badge>
                              <span className="text-sm text-gray-400">
                                ${project.price.toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {project.views}
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-4 h-4 mr-1" />
                              {project.likes}
                            </div>
                            <div className="flex items-center">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              {project.offers}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 bg-transparent"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 hover:border-red-500/50 hover:text-red-400 bg-transparent"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="purchases" className="mt-6">
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Purchase History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {purchases.map((purchase) => (
                        <div
                          key={purchase.id}
                          className="flex items-center space-x-4 p-4 rounded-lg bg-white/5"
                        >
                          <img
                            src={purchase.image || "/placeholder.svg"}
                            alt={purchase.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">
                              {purchase.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              Seller: {purchase.seller}
                            </p>
                            <p className="text-sm text-gray-400">
                              Purchased: {purchase.purchaseDate}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-white">
                              ${purchase.price.toLocaleString()}
                            </div>
                            <Badge
                              variant={
                                purchase.status === "Completed"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {purchase.status}
                            </Badge>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 bg-transparent"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="watchlist" className="mt-6">
                <Card className="glass border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Watchlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {watchlist.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 p-4 rounded-lg bg-white/5"
                        >
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-white">{item.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm text-gray-400">
                                Health Score: {item.healthScore}
                              </span>
                              <Badge
                                variant={item.priceChange.startsWith("+")
                                  ? "destructive"
                                  : "default"}
                              >
                                {item.priceChange}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold gradient-text">
                              ${item.price.toLocaleString()}
                            </div>
                          </div>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-purple-500 to-blue-500"
                          >
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white">Alex Chen</h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      4.9 (12 reviews)
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-white/20 hover:bg-white/10 bg-transparent"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-white/10"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    List New Project
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-white/10"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Browse Marketplace
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-white/10"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Messages
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start hover:bg-white/10"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Pro Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <p className="text-purple-300">
                      Add detailed screenshots to increase project views by 40%
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <p className="text-blue-300">
                      Projects with complete documentation sell 60% faster
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
