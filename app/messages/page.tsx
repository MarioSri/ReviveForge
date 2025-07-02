"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Send,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Star,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const conversations = [
  {
    id: 1,
    participant: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      verified: true,
      rating: 4.9,
    },
    project: {
      name: "TaskFlow Pro",
      price: 2500,
    },
    lastMessage: {
      text: "I'm interested in purchasing your project. Can we discuss the technical details?",
      time: "2 min ago",
      unread: true,
      sender: "them",
    },
    type: "inquiry",
  },
  {
    id: 2,
    participant: {
      name: "Mike Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "offline",
      verified: true,
      rating: 4.7,
    },
    project: {
      name: "AI Content Generator",
      price: 5500,
    },
    lastMessage: {
      text: "Perfect! I'll prepare the transfer documentation.",
      time: "1 hour ago",
      unread: false,
      sender: "me",
    },
    type: "negotiation",
  },
  {
    id: 3,
    participant: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      status: "online",
      verified: false,
      rating: 4.2,
    },
    project: {
      name: "CryptoTracker",
      price: 3200,
    },
    lastMessage: {
      text: "Thanks for the demo! I need to discuss with my team.",
      time: "3 hours ago",
      unread: false,
      sender: "them",
    },
    type: "demo",
  },
]

const currentMessages = [
  {
    id: 1,
    sender: "them",
    text: "Hi! I'm very interested in your TaskFlow Pro project. I've been looking for a project management solution exactly like this.",
    time: "10:30 AM",
    type: "text",
  },
  {
    id: 2,
    sender: "me",
    text: "Hello Sarah! Thanks for your interest. I'd be happy to discuss the project with you. What specific aspects would you like to know more about?",
    time: "10:32 AM",
    type: "text",
  },
  {
    id: 3,
    sender: "them",
    text: "I'd love to know more about the technical architecture and the current user base. Also, is the database included in the transfer?",
    time: "10:35 AM",
    type: "text",
  },
  {
    id: 4,
    sender: "me",
    text: "Great questions! The project is built with React/Node.js and has a PostgreSQL database. Currently has about 150 active users. Yes, I can include the database with anonymized data.",
    time: "10:38 AM",
    type: "text",
  },
  {
    id: 5,
    sender: "them",
    text: "That sounds perfect. Would it be possible to schedule a demo call to see the admin dashboard?",
    time: "10:40 AM",
    type: "text",
  },
  {
    id: 6,
    sender: "me",
    text: "I'm available tomorrow afternoon or Thursday morning. What works better for you?",
    time: "10:42 AM",
    type: "text",
  },
  {
    id: 7,
    sender: "them",
    text: "I'm interested in purchasing your project. Can we discuss the technical details?",
    time: "Just now",
    type: "text",
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would send the message to your API
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.project.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="pt-16 h-screen flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-white/10 bg-gray-950/50">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <h1 className="text-xl font-bold text-white mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="overflow-y-auto h-full">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors ${
                selectedConversation.id === conversation.id ? "bg-white/10" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.participant.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {conversation.participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-950 ${
                      conversation.participant.status === "online" ? "bg-green-400" : "bg-gray-400"
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1">
                      <h3 className="font-semibold text-white truncate">{conversation.participant.name}</h3>
                      {conversation.participant.verified && <Shield className="w-3 h-3 text-green-400" />}
                    </div>
                    <span className="text-xs text-gray-400">{conversation.lastMessage.time}</span>
                  </div>

                  <p className="text-sm text-gray-400 mb-1">{conversation.project.name}</p>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-300 truncate flex-1">{conversation.lastMessage.text}</p>
                    {conversation.lastMessage.unread && <div className="w-2 h-2 bg-purple-500 rounded-full ml-2" />}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <Badge
                      variant={
                        conversation.type === "inquiry"
                          ? "default"
                          : conversation.type === "negotiation"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {conversation.type}
                    </Badge>
                    <span className="text-xs text-gray-400">${conversation.project.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/10 bg-gray-950/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={selectedConversation.participant.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedConversation.participant.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-950 ${
                    selectedConversation.participant.status === "online" ? "bg-green-400" : "bg-gray-400"
                  }`}
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="font-semibold text-white">{selectedConversation.participant.name}</h2>
                  {selectedConversation.participant.verified && <Shield className="w-4 h-4 text-green-400" />}
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs text-gray-400">{selectedConversation.participant.rating}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Discussing: {selectedConversation.project.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-white/20 bg-transparent">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-white/20 bg-transparent">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-white/20 bg-transparent">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {currentMessages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === "me"
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                    : "bg-white/10 text-white"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div
                  className={`flex items-center justify-end mt-1 space-x-1 ${
                    message.sender === "me" ? "text-white/70" : "text-gray-400"
                  }`}
                >
                  <span className="text-xs">{message.time}</span>
                  {message.sender === "me" && <CheckCircle className="w-3 h-3" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-white/10 bg-gray-950/50">
          <div className="flex items-end space-x-2">
            <Button variant="outline" size="sm" className="border-white/20 bg-transparent">
              <Paperclip className="w-4 h-4" />
            </Button>
            <div className="flex-1">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="bg-white/5 border-white/10 text-white resize-none"
                rows={1}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2 mt-2">
            <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:bg-white/5">
              Schedule Demo
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:bg-white/5">
              Send Offer
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:bg-white/5">
              Request Details
            </Button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Project Details */}
      <div className="w-80 border-l border-white/10 bg-gray-950/50 p-4">
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white">{selectedConversation.project.name}</h3>
                <p className="text-2xl font-bold gradient-text">
                  ${selectedConversation.project.price.toLocaleString()}
                </p>
              </div>

              <div className="space-y-2">
                <Button variant="outline" className="w-full border-white/20 bg-transparent">
                  View Project Details
                </Button>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500">Make Offer</Button>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="font-semibold text-white mb-2">Conversation Status</h4>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-gray-300">Active discussion</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h4 className="font-semibold text-white mb-2">Safety Tips</h4>
                <div className="space-y-2 text-xs text-gray-400">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-3 h-3 mt-0.5 text-yellow-400" />
                    <span>Always use escrow for payments</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-3 h-3 mt-0.5 text-yellow-400" />
                    <span>Verify project functionality before purchase</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-3 h-3 mt-0.5 text-yellow-400" />
                    <span>Request documentation and transfer guide</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
