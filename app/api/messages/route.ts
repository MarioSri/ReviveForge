import { type NextRequest, NextResponse } from "next/server"

// Mock conversations data
const conversations = [
  {
    id: 1,
    participants: ["user1", "user2"],
    projectId: 1,
    lastMessage: {
      id: 7,
      senderId: "user2",
      text: "I'm interested in purchasing your project. Can we discuss the technical details?",
      timestamp: new Date().toISOString(),
      read: false,
    },
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: new Date().toISOString(),
  },
]

const messages = [
  {
    id: 1,
    conversationId: 1,
    senderId: "user2",
    text: "Hi! I'm very interested in your TaskFlow Pro project. I've been looking for a project management solution exactly like this.",
    timestamp: "2024-01-15T10:30:00Z",
    read: true,
  },
  {
    id: 2,
    conversationId: 1,
    senderId: "user1",
    text: "Hello Sarah! Thanks for your interest. I'd be happy to discuss the project with you. What specific aspects would you like to know more about?",
    timestamp: "2024-01-15T10:32:00Z",
    read: true,
  },
  {
    id: 3,
    conversationId: 1,
    senderId: "user2",
    text: "I'd love to know more about the technical architecture and the current user base. Also, is the database included in the transfer?",
    timestamp: "2024-01-15T10:35:00Z",
    read: true,
  },
  {
    id: 4,
    conversationId: 1,
    senderId: "user1",
    text: "Great questions! The project is built with React/Node.js and has a PostgreSQL database. Currently has about 150 active users. Yes, I can include the database with anonymized data.",
    timestamp: "2024-01-15T10:38:00Z",
    read: true,
  },
  {
    id: 5,
    conversationId: 1,
    senderId: "user2",
    text: "That sounds perfect. Would it be possible to schedule a demo call to see the admin dashboard?",
    timestamp: "2024-01-15T10:40:00Z",
    read: true,
  },
  {
    id: 6,
    conversationId: 1,
    senderId: "user1",
    text: "I'm available tomorrow afternoon or Thursday morning. What works better for you?",
    timestamp: "2024-01-15T10:42:00Z",
    read: true,
  },
  {
    id: 7,
    conversationId: 1,
    senderId: "user2",
    text: "I'm interested in purchasing your project. Can we discuss the technical details?",
    timestamp: new Date().toISOString(),
    read: false,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const conversationId = searchParams.get("conversationId")

  if (conversationId) {
    // Get messages for specific conversation
    const conversationMessages = messages.filter((m) => m.conversationId === Number.parseInt(conversationId))

    return NextResponse.json({
      messages: conversationMessages,
    })
  } else {
    // Get all conversations for user
    return NextResponse.json({
      conversations: conversations.map((conv) => ({
        ...conv,
        // In real app, populate participant and project details
        participant: {
          id: "user2",
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=40&width=40",
          status: "online",
          verified: true,
          rating: 4.9,
        },
        project: {
          id: 1,
          name: "TaskFlow Pro",
          price: 2500,
        },
      })),
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { conversationId, text, recipientId, projectId } = body

    if (!text?.trim()) {
      return NextResponse.json({ error: "Message text is required" }, { status: 400 })
    }

    let conversation

    if (conversationId) {
      // Add message to existing conversation
      conversation = conversations.find((c) => c.id === conversationId)
      if (!conversation) {
        return NextResponse.json({ error: "Conversation not found" }, { status: 404 })
      }
    } else {
      // Create new conversation
      if (!recipientId || !projectId) {
        return NextResponse.json(
          { error: "recipientId and projectId are required for new conversations" },
          { status: 400 },
        )
      }

      conversation = {
        id: conversations.length + 1,
        participants: ["current-user", recipientId],
        projectId: Number.parseInt(projectId),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      conversations.push(conversation)
    }

    // Create new message
    const newMessage = {
      id: messages.length + 1,
      conversationId: conversation.id,
      senderId: "current-user", // In real app, get from auth
      text: text.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    }

    messages.push(newMessage)

    // Update conversation's last message
    conversation.lastMessage = {
      id: newMessage.id,
      senderId: newMessage.senderId,
      text: newMessage.text,
      timestamp: newMessage.timestamp,
      read: false,
    }
    conversation.updatedAt = new Date().toISOString()

    return NextResponse.json({
      message: "Message sent successfully",
      data: newMessage,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
