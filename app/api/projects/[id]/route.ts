import { type NextRequest, NextResponse } from "next/server"

// Mock project data - in real app, fetch from database
const getProjectById = (id: string) => {
  const projects = [
    {
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
        id: "user1",
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
      repositoryUrl: "https://github.com/alexchen/taskflow-pro",
      liveUrl: "https://taskflow-demo.com",
      documentation: "https://docs.taskflow-demo.com",
      reasonForSelling: "Pivoting to a different market focus",
      targetBuyer: "Small to medium development teams",
      negotiable: true,
      includesDatabase: true,
      includesDomain: false,
      status: "active",
      createdAt: "2024-01-15T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
  ]

  return projects.find((p) => p.id === Number.parseInt(id))
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const project = getProjectById(params.id)

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  // Increment view count (in real app, update database)
  project.views += 1

  return NextResponse.json({ project })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const project = getProjectById(params.id)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    // In real app, verify user owns this project
    // if (project.seller.id !== currentUserId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    // }

    // Update project (in real app, update database)
    Object.assign(project, {
      ...body,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      message: "Project updated successfully",
      project,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const project = getProjectById(params.id)

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 })
  }

  // In real app, verify user owns this project and update database
  project.status = "deleted"

  return NextResponse.json({
    message: "Project deleted successfully",
  })
}
