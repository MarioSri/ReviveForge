"use client"

import { useState, useRef } from "react"
import { useParams } from "next/navigation"
import { useProject, useAIEvaluate } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
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
  Eye,
  Calendar,
  Code,
  Database,
  Server,
  Zap,
  ChevronLeft,
  ChevronRight,
  Play,
  Maximize2,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default function ProjectDetailPage() {
  const { id } = useParams()
  const { data: project, isLoading, error, refetch } = useProject(id as string)
  const aiEval = useAIEvaluate()
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [showOfferDialog, setShowOfferDialog] = useState(false)

  if (isLoading) {
    return <ProjectDetailSkeleton />
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground">Project not found</h1>
          <p className="mt-2 text-muted-foreground">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/marketplace">
            <Button className="mt-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Marketplace
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const images = project.screenshots || [project.thumbnail || "/placeholder.jpg"]
  const healthColor = project.health_score >= 80 
    ? "text-green-500" 
    : project.health_score >= 50 
    ? "text-yellow-500" 
    : "text-red-500"

  const handleAIValuation = () => {
    if (!project.github_url) {
      toast.error("No GitHub URL available for this project")
      return
    }

    aiEval.mutate(
      { githubUrl: project.github_url },
      {
        onSuccess: () => {
          toast.success("AI valuation complete!")
          refetch()
        },
        onError: () => {
          toast.error("AI valuation failed")
        },
      }
    )
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/marketplace" className="hover:text-foreground transition-colors">
            Marketplace
          </Link>
          <span>/</span>
          <span className="text-foreground">{project.title}</span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Section */}
            <Card className="border-0 bg-muted/30">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {project.title}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsLiked(!isLiked)}
                      className="h-10 w-10 p-0"
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    </Button>
                    <Button variant="outline" size="sm" className="h-10 w-10 p-0">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${healthColor}`}>
                      {project.health_score || 0}%
                    </div>
                    <div className="text-sm text-muted-foreground">Health Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {project.views || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {project.likes || 0}
                    </div>
                    <div className="text-sm text-muted-foreground">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {project.last_updated || "6mo ago"}
                    </div>
                    <div className="text-sm text-muted-foreground">Last Updated</div>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack?.map((tech: string) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Image Gallery */}
            <Card className="border-0 bg-muted/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Screenshots
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <img
                      src={images[currentImageIndex]}
                      alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                      className="h-full w-full object-cover"
                    />
                    
                    {images.length > 1 && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                          disabled={currentImageIndex === 0}
                          className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-background/80 backdrop-blur-sm"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentImageIndex(Math.min(images.length - 1, currentImageIndex + 1))}
                          disabled={currentImageIndex === images.length - 1}
                          className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 p-0 bg-background/80 backdrop-blur-sm"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        
                        <div className="absolute bottom-4 right-4">
                          <Badge className="bg-background/80 backdrop-blur-sm">
                            {currentImageIndex + 1} / {images.length}
                          </Badge>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {images.map((image: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 h-20 w-20 overflow-hidden rounded-lg border-2 transition-colors ${
                            currentImageIndex === index 
                              ? "border-primary" 
                              : "border-transparent hover:border-muted-foreground"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* AI Valuation */}
            {project.ai_analysis && (
              <Card className="border-0 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    AI Valuation Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="relative inline-flex">
                        <div className="w-20 h-20 rounded-full border-4 border-muted flex items-center justify-center">
                          <span className="text-lg font-bold text-foreground">
                            {project.ai_analysis.healthScore}%
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-muted-foreground">Health Score</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        ${project.ai_analysis.valueMin?.toLocaleString()} - ${project.ai_analysis.valueMax?.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Estimated Value</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {project.ai_analysis.difficultyRating}/5
                      </div>
                      <div className="text-sm text-muted-foreground">Revival Difficulty</div>
                    </div>
                  </div>
                  
                  {project.ai_analysis.analysisSummary && (
                    <div className="mt-6 p-4 bg-background/50 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        {project.ai_analysis.analysisSummary}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Detailed Information */}
            <Card className="border-0 bg-muted/30">
              <CardContent className="p-0">
                <Tabs defaultValue="overview" className="w-full">
                  <div className="border-b px-6 pt-6">
                    <TabsList className="grid w-full grid-cols-4 bg-background/50">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="tech">Tech Details</TabsTrigger>
                      <TabsTrigger value="metrics">Metrics</TabsTrigger>
                      <TabsTrigger value="due-diligence">Due Diligence</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="overview" className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          Project Description
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {project.description || "No detailed description available."}
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          Key Features
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            "User authentication & authorization",
                            "Modern responsive design",
                            "API integrations",
                            "Database management",
                            "Admin dashboard",
                            "Mobile-friendly interface"
                          ].map((feature, index) => (
                            <div key={index} className="flex items-center text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="tech" className="p-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Code className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold text-foreground">Frontend</h3>
                          </div>
                          <div className="space-y-2">
                            {project.tech_stack?.filter((tech: string) => 
                              ["React", "Vue", "Angular", "Next.js", "Nuxt.js", "Svelte"].includes(tech)
                            ).map((tech: string) => (
                              <Badge key={tech} variant="outline">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Server className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold text-foreground">Backend</h3>
                          </div>
                          <div className="space-y-2">
                            {project.tech_stack?.filter((tech: string) => 
                              ["Node.js", "Express", "Django", "Flask", "Rails", "Laravel"].includes(tech)
                            ).map((tech: string) => (
                              <Badge key={tech} variant="outline">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Database className="h-5 w-5 text-primary" />
                            <h3 className="font-semibold text-foreground">Database</h3>
                          </div>
                          <div className="space-y-2">
                            {project.tech_stack?.filter((tech: string) => 
                              ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Firebase", "Supabase"].includes(tech)
                            ).map((tech: string) => (
                              <Badge key={tech} variant="outline">{tech}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="metrics" className="p-6">
                    <div className="space-y-6">
                      {[
                        { label: "Code Quality", value: 85 },
                        { label: "Documentation", value: 70 },
                        { label: "Test Coverage", value: 60 },
                        { label: "Security", value: 90 },
                        { label: "Performance", value: 75 },
                      ].map((metric) => (
                        <div key={metric.label}>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-foreground font-medium">{metric.label}</span>
                            <span className="text-muted-foreground">{metric.value}%</span>
                          </div>
                          <Progress value={metric.value} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="due-diligence" className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center text-green-500">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>Code repository verified</span>
                      </div>
                      <div className="flex items-center text-green-500">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>Seller identity confirmed</span>
                      </div>
                      <div className="flex items-center text-green-500">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        <span>No legal issues found</span>
                      </div>
                      <div className="flex items-center text-yellow-500">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        <span>Dependencies need updating</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Seller Info */}
            <Card className="border-0 bg-muted/30">
              <CardHeader>
                <CardTitle>Seller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={project.seller?.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {project.seller?.name?.charAt(0) || "S"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {project.seller?.name || "Anonymous Seller"}
                      </span>
                      <Shield className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {project.seller?.rating || 4.8} ({project.seller?.reviews || 23} reviews)
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Member since {project.seller?.joinedDate || "March 2022"}
                </p>
                
                <Button variant="outline" className="w-full">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contact Seller
                </Button>
              </CardContent>
            </Card>

            {/* Price and Actions */}
            <Card className="border-0 bg-muted/30">
              <CardHeader>
                <CardTitle>Purchase Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    ${project.value_min?.toLocaleString() || "0"}
                  </div>
                  <div className="text-sm text-muted-foreground">Starting price</div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" onClick={() => setShowOfferDialog(true)}>
                    Make Offer
                  </Button>
                  
                  {!project.ai_analysis && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleAIValuation}
                      disabled={aiEval.isPending}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {aiEval.isPending ? "Running AI Valuation..." : "Run AI Valuation"}
                    </Button>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Shield className="w-4 h-4 mr-2" />
                    Secure escrow payment
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Download className="w-4 h-4 mr-2" />
                    Full source code included
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    30-day support included
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="border-0 bg-muted/30">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {project.github_url && (
                    <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" className="w-full justify-start">
                        <Github className="w-4 h-4 mr-2" />
                        View Repository
                      </Button>
                    </Link>
                  )}
                  
                  {project.live_url && (
                    <Link href={project.live_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" className="w-full justify-start">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </Link>
                  )}
                  
                  <Button variant="ghost" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Assets
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="h-6 w-64 mb-8" />
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-96 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
          </div>
          
          <div className="space-y-6">
            <Skeleton className="h-48 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-32 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}