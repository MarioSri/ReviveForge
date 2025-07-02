"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus, CalendarIcon, Clock, Video, Phone, Users, Bell } from "lucide-react"

interface CalendarEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  duration: number
  type: "call" | "meeting" | "demo" | "negotiation"
  attendees: {
    name: string
    avatar: string
    email: string
  }[]
  location?: string
  status: "scheduled" | "completed" | "cancelled"
  priority: "low" | "medium" | "high"
  projectId?: string
  projectName?: string
}

const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Project Demo - TaskFlow Pro",
    description: "Demo call with Alex Chen to showcase TaskFlow Pro features",
    date: "2024-02-15",
    time: "14:00",
    duration: 60,
    type: "demo",
    attendees: [
      { name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32", email: "alex@example.com" },
      { name: "You", avatar: "/placeholder.svg?height=32&width=32", email: "you@example.com" },
    ],
    location: "Zoom Meeting",
    status: "scheduled",
    priority: "high",
    projectId: "1",
    projectName: "TaskFlow Pro",
  },
  {
    id: "2",
    title: "Negotiation Call - AI Content Generator",
    description: "Price negotiation and terms discussion",
    date: "2024-02-16",
    time: "10:30",
    duration: 45,
    type: "negotiation",
    attendees: [
      { name: "Emily Watson", avatar: "/placeholder.svg?height=32&width=32", email: "emily@example.com" },
      { name: "You", avatar: "/placeholder.svg?height=32&width=32", email: "you@example.com" },
    ],
    location: "Phone Call",
    status: "scheduled",
    priority: "high",
    projectId: "4",
    projectName: "AI Content Generator",
  },
  {
    id: "3",
    title: "Technical Review - DataViz Dashboard",
    description: "Code review and technical assessment",
    date: "2024-02-17",
    time: "16:00",
    duration: 90,
    type: "meeting",
    attendees: [
      { name: "Mike Rodriguez", avatar: "/placeholder.svg?height=32&width=32", email: "mike@example.com" },
      { name: "Tech Lead", avatar: "/placeholder.svg?height=32&width=32", email: "tech@example.com" },
      { name: "You", avatar: "/placeholder.svg?height=32&width=32", email: "you@example.com" },
    ],
    location: "Conference Room A",
    status: "scheduled",
    priority: "medium",
    projectId: "3",
    projectName: "DataViz Dashboard",
  },
  {
    id: "4",
    title: "Follow-up Call - ShopEasy Mobile",
    description: "Post-acquisition follow-up and handover",
    date: "2024-02-14",
    time: "11:00",
    duration: 30,
    type: "call",
    attendees: [
      { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32", email: "sarah@example.com" },
      { name: "You", avatar: "/placeholder.svg?height=32&width=32", email: "you@example.com" },
    ],
    location: "Phone Call",
    status: "completed",
    priority: "low",
    projectId: "2",
    projectName: "ShopEasy Mobile",
  },
]

export function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents)
  const [showNewEventDialog, setShowNewEventDialog] = useState(false)
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")

  // Get calendar data
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split("T")[0]
    return events.filter((event) => event.date === dateString)
  }

  // Get event type styling
  const getEventTypeStyle = (type: string) => {
    switch (type) {
      case "demo":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "negotiation":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "meeting":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "call":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "demo":
        return <Video className="w-3 h-3" />
      case "negotiation":
        return <Users className="w-3 h-3" />
      case "meeting":
        return <CalendarIcon className="w-3 h-3" />
      case "call":
        return <Phone className="w-3 h-3" />
      default:
        return <CalendarIcon className="w-3 h-3" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  // Generate calendar days
  const calendarDays = []

  // Previous month's trailing days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month, -i)
    calendarDays.push({ date, isCurrentMonth: false })
  }

  // Current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    calendarDays.push({ date, isCurrentMonth: true })
  }

  // Next month's leading days
  const remainingDays = 42 - calendarDays.length
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day)
    calendarDays.push({ date, isCurrentMonth: false })
  }

  const today = new Date()
  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString()
  }

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= today && event.status === "scheduled")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Calendar & Meetings</h2>
          <p className="text-gray-400">Schedule and manage your project-related meetings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="border-white/20 hover:bg-white/10 bg-transparent"
          >
            Today
          </Button>
          <Dialog open={showNewEventDialog} onOpenChange={setShowNewEventDialog}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </DialogTrigger>
            <DialogContent className="glass border-white/10 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white">Schedule New Meeting</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create a new meeting or call for your project discussions
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Meeting Title</label>
                  <Input
                    placeholder="Enter meeting title"
                    className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
                    <Input type="date" className="bg-white/5 border-white/10 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                    <Input type="time" className="bg-white/5 border-white/10 text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Meeting Type</label>
                  <Select>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                    <SelectContent className="glass border-white/10">
                      <SelectItem value="demo">Demo</SelectItem>
                      <SelectItem value="negotiation">Negotiation</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="call">Call</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <Textarea
                    placeholder="Meeting description..."
                    className="bg-white/5 border-white/10 text-white placeholder-gray-400"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowNewEventDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-500 to-blue-500">Schedule Meeting</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card className="glass border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="text-xl font-semibold text-white">
                    {monthNames[month]} {year}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" onClick={goToPreviousMonth} className="hover:bg-white/10">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={goToNextMonth} className="hover:bg-white/10">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {["month", "week", "day"].map((mode) => (
                    <Button
                      key={mode}
                      variant={viewMode === mode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode(mode as any)}
                      className={
                        viewMode === mode
                          ? "bg-gradient-to-r from-purple-500 to-blue-500"
                          : "border-white/20 hover:bg-white/10 bg-transparent"
                      }
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-400">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map(({ date, isCurrentMonth }, index) => {
                  const dayEvents = getEventsForDate(date)
                  const isSelected = selectedDate?.toDateString() === date.toDateString()

                  return (
                    <div
                      key={index}
                      className={`
                        min-h-[80px] p-1 border border-white/5 rounded cursor-pointer transition-all
                        ${isCurrentMonth ? "hover:bg-white/5" : "opacity-50"}
                        ${isToday(date) ? "bg-purple-500/20 border-purple-500/30" : ""}
                        ${isSelected ? "bg-blue-500/20 border-blue-500/30" : ""}
                      `}
                      onClick={() => setSelectedDate(date)}
                    >
                      <div className={`text-sm font-medium mb-1 ${isCurrentMonth ? "text-white" : "text-gray-500"}`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded border ${getEventTypeStyle(event.type)} truncate`}
                          >
                            <div className="flex items-center space-x-1">
                              {getEventTypeIcon(event.type)}
                              <span className="truncate">{event.title}</span>
                              <div className={`w-1 h-1 rounded-full ${getPriorityColor(event.priority)}`} />
                            </div>
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-400 text-center">+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-white truncate">{event.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">{event.projectName}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(event.priority)}`} />
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <div className="flex items-center">
                        <CalendarIcon className="w-3 h-3 mr-1" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {event.time}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-1">
                        {getEventTypeIcon(event.type)}
                        <Badge className={getEventTypeStyle(event.type)} variant="outline">
                          {event.type}
                        </Badge>
                      </div>
                      <div className="flex -space-x-1">
                        {event.attendees.slice(0, 3).map((attendee, index) => (
                          <Avatar key={index} className="w-5 h-5 border border-white/20">
                            <AvatarImage src={attendee.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">{attendee.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        ))}
                        {event.attendees.length > 3 && (
                          <div className="w-5 h-5 rounded-full bg-gray-600 border border-white/20 flex items-center justify-center">
                            <span className="text-xs text-white">+{event.attendees.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {upcomingEvents.length === 0 && (
                  <div className="text-center py-6 text-gray-400">
                    <CalendarIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No upcoming events</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Meeting Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">This Week</span>
                  <span className="text-lg font-semibold text-white">
                    {
                      events.filter((e) => {
                        const eventDate = new Date(e.date)
                        const weekStart = new Date(today)
                        weekStart.setDate(today.getDate() - today.getDay())
                        const weekEnd = new Date(weekStart)
                        weekEnd.setDate(weekStart.getDate() + 6)
                        return eventDate >= weekStart && eventDate <= weekEnd && e.status === "scheduled"
                      }).length
                    }
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">This Month</span>
                  <span className="text-lg font-semibold text-white">
                    {
                      events.filter((e) => {
                        const eventDate = new Date(e.date)
                        return (
                          eventDate.getMonth() === today.getMonth() &&
                          eventDate.getFullYear() === today.getFullYear() &&
                          e.status === "scheduled"
                        )
                      }).length
                    }
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Completed</span>
                  <span className="text-lg font-semibold gradient-text">
                    {events.filter((e) => e.status === "completed").length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meeting Types */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Meeting Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { type: "demo", label: "Demos", count: events.filter((e) => e.type === "demo").length },
                  {
                    type: "negotiation",
                    label: "Negotiations",
                    count: events.filter((e) => e.type === "negotiation").length,
                  },
                  { type: "meeting", label: "Meetings", count: events.filter((e) => e.type === "meeting").length },
                  { type: "call", label: "Calls", count: events.filter((e) => e.type === "call").length },
                ].map((item) => (
                  <div key={item.type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1 rounded ${getEventTypeStyle(item.type)}`}>{getEventTypeIcon(item.type)}</div>
                      <span className="text-sm text-gray-300">{item.label}</span>
                    </div>
                    <Badge variant="outline" className="border-white/20">
                      {item.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
