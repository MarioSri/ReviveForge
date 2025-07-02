import { type NextRequest, NextResponse } from "next/server"

// Mock data - in a real app, this would come from a database
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
    sellerId: "user1",
    createdAt: "2024-01-15T00:00:00Z",
    status: "active",
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
    sellerId: "user2",
    createdAt: "2024-02-01T00:00:00Z",
    status: "active",
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
    sellerId: "user3",
    createdAt: "2024-01-20T00:00:00Z",
    status: "active",
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
    sellerId: "user4",
    createdAt: "2024-02-10T00:00:00Z",
    status: "active",
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
    sellerId: "user5",
    createdAt: "2024-01-05T00:00:00Z",
    status: "active",
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
    sellerId: "user6",
    createdAt: "2023-12-15T00:00:00Z",
    status: "active",
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  // Get query parameters
  const search = searchParams.get("search")?.toLowerCase() || ""
  const category = searchParams.get("category")
  const minPrice = Number.parseInt(searchParams.get("minPrice") || "0")
  const maxPrice = Number.parseInt(searchParams.get("maxPrice") || "999999")
  const sortBy = searchParams.get("sortBy") || "recent"
  const page = Number.parseInt(searchParams.get("page") || "1")
  const limit = Number.parseInt(searchParams.get("limit") || "12")

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      !search ||
      project.name.toLowerCase().includes(search) ||
      project.description.toLowerCase().includes(search) ||
      project.techStack.some((tech) => tech.toLowerCase().includes(search))

    const matchesCategory = !category || project.category === category
    const matchesPrice = project.price >= minPrice && project.price <= maxPrice

    return matchesSearch && matchesCategory && matchesPrice && project.status === "active"
  })

  // Sort projects
  filteredProjects.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "health":
        return b.healthScore - a.healthScore
      case "popular":
        return b.views - a.views
      case "recent":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  // Paginate
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex)

  return NextResponse.json({
    projects: paginatedProjects,
    pagination: {
      page,
      limit,
      total: filteredProjects.length,
      totalPages: Math.ceil(filteredProjects.length / limit),
      hasNext: endIndex < filteredProjects.length,
      hasPrev: page > 1,
    },
    filters: {
      categories: [...new Set(projects.map((p) => p.category))],
      techStack: [...new Set(projects.flatMap((p) => p.techStack))],
      priceRange: {
        min: Math.min(...projects.map((p) => p.price)),
        max: Math.max(...projects.map((p) => p.price)),
      },
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "description", "price", "category", "techStack"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Create new project
    const newProject = {
      id: projects.length + 1,
      ...body,
      views: 0,
      likes: 0,
      featured: false,
      sellerId: "current-user", // In real app, get from auth
      createdAt: new Date().toISOString(),
      status: "pending", // Projects start as pending for review
    }

    // In a real app, save to database
    projects.push(newProject)

    return NextResponse.json(
      {
        message: "Project submitted successfully",
        project: newProject,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
