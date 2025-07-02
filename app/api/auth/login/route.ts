import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// Mock user storage - in real app, use database
const users = [
  {
    id: "user1",
    firstName: "Alex",
    lastName: "Chen",
    email: "alex@example.com",
    password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm", // "password123"
    role: "seller",
    verified: true,
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.8,
    reviews: 23,
    joinedDate: "March 2022",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Remove password from response
    const { password: _, ...userResponse } = user

    // In real app, create JWT token here
    const token = "mock-jwt-token"

    return NextResponse.json({
      message: "Login successful",
      user: userResponse,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
