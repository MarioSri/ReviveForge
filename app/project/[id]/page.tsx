"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Share2,
  Star,
  TrendingUp,
  Shield,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Github,
  ExternalLink,
  Download,
} from "lucide-react"

// Mock data - in real app this would come from API
const project = {
  id: 1,
  name: "TaskFlow Pro",
  description:
    "A comprehensive project management SaaS platform with team collaboration features, time tracking, and advanced reporting capabilities. Originally built for enterprise clients but abandoned due to founder pivot.",
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
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    reviews: 23,
    verified: true,
    joinedDate: "March 2022",
  },
  metrics: {
    codeQuality: 85,
    documentation: 70,
    testCoverage: 60,
    security: 90,
    performance: 75,
  },
  features: [
    "User authentication & authorization",
    "Project & task management",
    "Team collaboration tools",
    "Time tracking & reporting",
    "File sharing & storage",
    "API integrations",
    "Mobile responsive design",
    "Admin dashboard",
  ],
  techDetails: {
    frontend: "React 18, TypeScript, Tailwind CSS",
    backend: "Node.js, Express, JWT Authentication",
    database: "PostgreSQL with Prisma ORM",
    hosting: "AWS EC2, S3, RDS",
    monitoring: "Sentry, Google Analytics",
  },
}

const relatedProjects = [
  {
    id: 2,
    name: "TeamSync",
    price: 1800,
    healthScore: 72,
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 3,
    name: "ProjectHub",
    price: 3200,
    healthScore: 85,
    image: "/placeholder.svg?height=150&width=200",
  },
  {
    id: 4,
    name: "WorkFlow",
    price: 2100,
    healthScore: 68,
    image: "/placeholder.svg?height=150&width=200",
  },
]

export default function ProjectDetailPage() {
  const [currentImage, setCurrentImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <span>Marketplace</span> / <span>SaaS Platforms</span> / <span className="text-white">{project.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <div className="glass-card">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{project.name}</h1>
                  <p className="text-gray-300 text-lg">{project.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={`border-white/20 ${isLiked ? "bg-red-500/20 text-red-400" : "hover:bg-white/10"}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 bg-transparent">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">{project.healthScore}</div>
                  <div className="text-sm text-gray-400">Health Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{project.views}</div>
                  <div className="text-sm text-gray-400">Views</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{project.likes}</div>
                  <div className="text-sm text-gray-400">Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{project.lastUpdated}</div>
                  <div className="text-sm text-gray-400">Last Updated</div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="border-white/20">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Image Gallery */}
            <div className="glass-card">
              <h2 className="text-xl font-semibold text-white mb-4">Screenshots</h2>
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={project.images[currentImage] || "/placeholder.svg"}
                    alt={`${project.name} screenshot ${currentImage + 1}`}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        currentImage === index ? "border-purple-500" : "border-white/20"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Information Tabs */}
            <div className="glass-card">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-white/5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="tech">Tech Stack</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="due-diligence">Due Diligence</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {project.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-3">Project History</h3>
                      <p className="text-gray-300">
                        TaskFlow Pro was originally developed as an enterprise project management solution. The project
                        gained significant traction with over 200 GitHub stars and a growing user base. However, the
                        founder decided to pivot to a different market, leaving this valuable asset available for
                        acquisition.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tech" className="mt-6">
                  <div className="space-y-4">
                    {Object.entries(project.techDetails).map(([category, details]) => (
                      <div key={category}>
                        <h4 className="font-semibold text-white capitalize mb-2">
                          {category.replace(/([A-Z])/g, " $1")}
                        </h4>
                        <p className="text-gray-300">{details}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="metrics" className="mt-6">
                  <div className="space-y-4">
                    {Object.entries(project.metrics).map(([metric, score]) => (
                      <div key={metric}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-white capitalize">{metric.replace(/([A-Z])/g, " $1")}</span>
                          <span className="text-gray-300">{score}%</span>
                        </div>
                        <Progress value={score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="due-diligence" className="mt-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-green-400">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span>Code repository verified</span>
                    </div>
                    <div className="flex items-center text-green-400">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span>Seller identity confirmed</span>
                    </div>
                    <div className="flex items-center text-green-400">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span>No legal issues found</span>
                    </div>
                    <div className="flex items-center text-yellow-400">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      <span>Dependencies need updating</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Info */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar>
                    <AvatarImage src={project.seller.avatar || "/placeholder.svg"} />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <span className="font-semibold text-white">{project.seller.name}</span>
                      {project.seller.verified && <CheckCircle className="w-4 h-4 text-green-400 ml-1" />}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {project.seller.rating} ({project.seller.reviews} reviews)
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-4">Member since {project.seller.joinedDate}</p>
                <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 bg-transparent">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Seller
                </Button>
              </CardContent>
            </Card>

            {/* Price and Purchase */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Purchase Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold gradient-text mb-2">${project.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-400">One-time purchase</div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                    Buy Now
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 bg-transparent">
                    Make Offer
                  </Button>
                </div>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <Shield className="w-4 h-4 mr-2" />
                    Secure escrow payment
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Download className="w-4 h-4 mr-2" />
                    Full source code included
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start hover:bg-white/10">
                    <Github className="w-4 h-4 mr-2" />
                    View Repository
                  </Button>
                  <Button variant="ghost" className="w-full justify-start hover:bg-white/10">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">Related Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((relatedProject) => (
              <Card
                key={relatedProject.id}
                className="glass border-white/10 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={relatedProject.image || "/placeholder.svg"}
                    alt={relatedProject.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white mb-2">{relatedProject.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold gradient-text">${relatedProject.price.toLocaleString()}</span>
                    <div className="flex items-center text-sm text-gray-400">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {relatedProject.healthScore}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
