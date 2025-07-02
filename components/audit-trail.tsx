"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Shield,
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Settings,
  Database,
  Lock,
  Eye,
  FileText,
} from "lucide-react"

interface AuditEvent {
  id: string
  timestamp: Date
  user: {
    id: string
    name: string
    email: string
    avatar: string
    role: string
  }
  action: string
  resource: string
  resourceId: string
  details: string
  ipAddress: string
  userAgent: string
  status: "success" | "warning" | "error"
  severity: "low" | "medium" | "high" | "critical"
  metadata?: Record<string, any>
}

const auditEvents: AuditEvent[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    user: {
      id: "user1",
      name: "John Admin",
      email: "john@reviveforge.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "admin",
    },
    action: "user.login",
    resource: "authentication",
    resourceId: "auth-001",
    details: "Successful admin login",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    status: "success",
    severity: "low",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    user: {
      id: "user2",
      name: "Sarah Manager",
      email: "sarah@reviveforge.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "manager",
    },
    action: "project.approve",
    resource: "project",
    resourceId: "proj-123",
    details: "Approved project listing: TaskFlow Pro",
    ipAddress: "10.0.0.50",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    status: "success",
    severity: "medium",
    metadata: { projectName: "TaskFlow Pro", price: 2500 },
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    user: {
      id: "user3",
      name: "Mike Security",
      email: "mike@reviveforge.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "security",
    },
    action: "security.alert",
    resource: "security",
    resourceId: "sec-456",
    details: "Multiple failed login attempts detected",
    ipAddress: "203.0.113.1",
    userAgent: "curl/7.68.0",
    status: "warning",
    severity: "high",
    metadata: { attempts: 5, blocked: true },
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    user: {
      id: "system",
      name: "System",
      email: "system@reviveforge.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "system",
    },
    action: "backup.complete",
    resource: "database",
    resourceId: "db-backup-789",
    details: "Daily database backup completed successfully",
    ipAddress: "127.0.0.1",
    userAgent: "ReviveForge-BackupService/1.0",
    status: "success",
    severity: "low",
    metadata: { size: "2.3GB", duration: "45s" },
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    user: {
      id: "user4",
      name: "Alex Developer",
      email: "alex@reviveforge.com",
      avatar: "/placeholder.svg?height=32&width=32",
      role: "developer",
    },
    action: "config.update",
    resource: "system",
    resourceId: "config-001",
    details: "Updated payment gateway configuration",
    ipAddress: "192.168.1.200",
    userAgent: "Mozilla/5.0 (Linux; Ubuntu)",
    status: "success",
    severity: "medium",
    metadata: { gateway: "stripe", version: "2023.10" },
  },
]

const actionIcons = {
  "user.login": User,
  "user.logout": User,
  "project.approve": CheckCircle,
  "project.reject": XCircle,
  "security.alert": AlertTriangle,
  "backup.complete": Database,
  "config.update": Settings,
  "data.export": Download,
  "permission.grant": Lock,
  "audit.view": Eye,
}

const statusColors = {
  success: "text-green-400",
  warning: "text-yellow-400",
  error: "text-red-400",
}

const severityColors = {
  low: "bg-gray-500/20 text-gray-400",
  medium: "bg-blue-500/20 text-blue-400",
  high: "bg-orange-500/20 text-orange-400",
  critical: "bg-red-500/20 text-red-400",
}

export function AuditTrail() {
  const [events, setEvents] = useState<AuditEvent[]>(auditEvents)
  const [filteredEvents, setFilteredEvents] = useState<AuditEvent[]>(auditEvents)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [userFilter, setUserFilter] = useState<string>("all")

  useEffect(() => {
    let filtered = events

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.resource.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((event) => event.status === statusFilter)
    }

    // Apply severity filter
    if (severityFilter !== "all") {
      filtered = filtered.filter((event) => event.severity === severityFilter)
    }

    // Apply user filter
    if (userFilter !== "all") {
      filtered = filtered.filter((event) => event.user.role === userFilter)
    }

    setFilteredEvents(filtered)
  }, [events, searchQuery, statusFilter, severityFilter, userFilter])

  const formatTimestamp = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const getActionIcon = (action: string) => {
    const IconComponent = actionIcons[action as keyof typeof actionIcons] || FileText
    return IconComponent
  }

  const exportAuditLog = () => {
    const csvContent = [
      ["Timestamp", "User", "Action", "Resource", "Details", "Status", "Severity", "IP Address"].join(","),
      ...filteredEvents.map((event) =>
        [
          event.timestamp.toISOString(),
          event.user.name,
          event.action,
          event.resource,
          `"${event.details}"`,
          event.status,
          event.severity,
          event.ipAddress,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `audit-log-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="glass border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <CardTitle className="text-white">Audit Trail</CardTitle>
            <Badge className="bg-blue-500/20 text-blue-400">{filteredEvents.length} events</Badge>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={exportAuditLog}
            className="border-white/20 hover:bg-white/10 bg-transparent"
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="glass border-white/10">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>

          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent className="glass border-white/10">
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <Select value={userFilter} onValueChange={setUserFilter}>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="User Role" />
            </SelectTrigger>
            <SelectContent className="glass border-white/10">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="developer">Developer</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setStatusFilter("all")
              setSeverityFilter("all")
              setUserFilter("all")
            }}
            className="border-white/20 hover:bg-white/10"
          >
            <Filter className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        {/* Events List */}
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {filteredEvents.map((event, index) => {
              const ActionIcon = getActionIcon(event.action)
              return (
                <div key={event.id}>
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                      <ActionIcon className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-white text-sm">{event.action}</span>
                        <Badge className={severityColors[event.severity]}>{event.severity}</Badge>
                        <div className={`w-2 h-2 rounded-full ${statusColors[event.status].replace("text-", "bg-")}`} />
                      </div>

                      <p className="text-sm text-gray-300 mb-2">{event.details}</p>

                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-4 h-4">
                            <AvatarImage src={event.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="text-xs">{event.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span>{event.user.name}</span>
                          <Badge variant="outline" className="border-white/20 text-xs px-1">
                            {event.user.role}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimestamp(event.timestamp)}</span>
                        </div>
                        <span>IP: {event.ipAddress}</span>
                      </div>

                      {/* Metadata */}
                      {event.metadata && (
                        <div className="mt-2 p-2 bg-white/5 rounded text-xs text-gray-400">
                          <div className="grid grid-cols-2 gap-2">
                            {Object.entries(event.metadata).map(([key, value]) => (
                              <div key={key}>
                                <span className="font-medium">{key}:</span> {String(value)}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {index < filteredEvents.length - 1 && <Separator className="bg-white/10 mt-4" />}
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
