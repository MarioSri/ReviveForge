"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Star,
} from "lucide-react"

interface Project {
  id: string
  name: string
  seller: {
    name: string
    avatar: string
    rating: number
  }
  category: string
  price: number
  status: "Active" | "Sold" | "Pending" | "Draft"
  healthScore: number
  views: number
  likes: number
  listedDate: string
  lastActivity: string
  techStack: string[]
}

const sampleProjects: Project[] = [
  {
    id: "1",
    name: "TaskFlow Pro",
    seller: { name: "Alex Chen", avatar: "/placeholder.svg?height=32&width=32", rating: 4.8 },
    category: "SaaS",
    price: 2500,
    status: "Active",
    healthScore: 78,
    views: 1250,
    likes: 45,
    listedDate: "2024-01-15",
    lastActivity: "2 hours ago",
    techStack: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "2",
    name: "ShopEasy Mobile",
    seller: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32", rating: 4.9 },
    category: "Mobile App",
    price: 4200,
    status: "Sold",
    healthScore: 85,
    views: 890,
    likes: 32,
    listedDate: "2024-01-10",
    lastActivity: "1 day ago",
    techStack: ["React Native", "Firebase"],
  },
  {
    id: "3",
    name: "DataViz Dashboard",
    seller: { name: "Mike Rodriguez", avatar: "/placeholder.svg?height=32&width=32", rating: 4.6 },
    category: "Web App",
    price: 1800,
    status: "Pending",
    healthScore: 72,
    views: 650,
    likes: 28,
    listedDate: "2024-01-08",
    lastActivity: "5 hours ago",
    techStack: ["Vue.js", "Python", "MongoDB"],
  },
  {
    id: "4",
    name: "AI Content Generator",
    seller: { name: "Emily Watson", avatar: "/placeholder.svg?height=32&width=32", rating: 4.7 },
    category: "AI/ML",
    price: 5500,
    status: "Active",
    healthScore: 90,
    views: 1450,
    likes: 67,
    listedDate: "2024-01-05",
    lastActivity: "30 minutes ago",
    techStack: ["Next.js", "OpenAI API"],
  },
  {
    id: "5",
    name: "CryptoTracker",
    seller: { name: "David Kim", avatar: "/placeholder.svg?height=32&width=32", rating: 4.5 },
    category: "Web App",
    price: 3200,
    status: "Draft",
    healthScore: 68,
    views: 720,
    likes: 19,
    listedDate: "2024-01-03",
    lastActivity: "1 week ago",
    techStack: ["Angular", "Express"],
  },
]

type SortField = keyof Project | "seller.name" | "seller.rating"
type SortDirection = "asc" | "desc"

export function AdvancedDataTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [sortField, setSortField] = useState<SortField>("listedDate")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Filter and sort data
  const filteredAndSortedData = useMemo(() => {
    const filtered = sampleProjects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.seller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || project.status === statusFilter
      const matchesCategory = categoryFilter === "all" || project.category === categoryFilter

      return matchesSearch && matchesStatus && matchesCategory
    })

    // Sort data
    filtered.sort((a, b) => {
      let aValue: any
      let bValue: any

      if (sortField === "seller.name") {
        aValue = a.seller.name
        bValue = b.seller.name
      } else if (sortField === "seller.rating") {
        aValue = a.seller.rating
        bValue = b.seller.rating
      } else {
        aValue = a[sortField as keyof Project]
        bValue = b[sortField as keyof Project]
      }

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (sortDirection === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [searchTerm, statusFilter, categoryFilter, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)
  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedData.map((project) => project.id))
    } else {
      setSelectedRows([])
    }
  }

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRows([...selectedRows, id])
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      Active: "bg-green-500/20 text-green-400",
      Sold: "bg-blue-500/20 text-blue-400",
      Pending: "bg-yellow-500/20 text-yellow-400",
      Draft: "bg-gray-500/20 text-gray-400",
    }
    return variants[status as keyof typeof variants] || variants.Draft
  }

  return (
    <Card className="glass border-white/10">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-white">Project Management</CardTitle>
            <p className="text-sm text-gray-400 mt-1">Manage and track all your marketplace projects</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500">
              Add Project
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search projects, sellers, or categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder-gray-400"
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  Status: {statusFilter === "all" ? "All" : statusFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass border-white/10">
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Statuses</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Active")}>Active</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Sold")}>Sold</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("Draft")}>Draft</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="border-white/20 hover:bg-white/10 bg-transparent">
                  <Filter className="w-4 h-4 mr-2" />
                  Category: {categoryFilter === "all" ? "All" : categoryFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="glass border-white/10">
                <DropdownMenuItem onClick={() => setCategoryFilter("all")}>All Categories</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("SaaS")}>SaaS</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("Mobile App")}>Mobile App</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("Web App")}>Web App</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCategoryFilter("AI/ML")}>AI/ML</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Selected Actions */}
        {selectedRows.length > 0 && (
          <div className="flex items-center gap-4 mb-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <span className="text-sm text-purple-300">{selectedRows.length} items selected</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-purple-500/20 hover:bg-purple-500/10 bg-transparent"
              >
                Bulk Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-red-500/20 hover:bg-red-500/10 text-red-400 bg-transparent"
              >
                Delete Selected
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="rounded-lg border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="text-gray-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("name")}
                    className="hover:bg-white/10 p-0 h-auto font-medium"
                  >
                    Project Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-gray-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("seller.name")}
                    className="hover:bg-white/10 p-0 h-auto font-medium"
                  >
                    Seller
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-gray-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("category")}
                    className="hover:bg-white/10 p-0 h-auto font-medium"
                  >
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-gray-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("price")}
                    className="hover:bg-white/10 p-0 h-auto font-medium"
                  >
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-gray-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("status")}
                    className="hover:bg-white/10 p-0 h-auto font-medium"
                  >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-gray-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("healthScore")}
                    className="hover:bg-white/10 p-0 h-auto font-medium"
                  >
                    Health
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-gray-300">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSort("views")}
                    className="hover:bg-white/10 p-0 h-auto font-medium"
                  >
                    Views
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-gray-300">Activity</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((project) => (
                <TableRow key={project.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(project.id)}
                      onCheckedChange={(checked) => handleSelectRow(project.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-white">{project.name}</div>
                      <div className="flex gap-1">
                        {project.techStack.slice(0, 2).map((tech) => (
                          <Badge key={tech} variant="outline" className="border-white/20 text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.techStack.length > 2 && (
                          <Badge variant="outline" className="border-white/20 text-xs">
                            +{project.techStack.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={project.seller.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{project.seller.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm text-white">{project.seller.name}</div>
                        <div className="flex items-center text-xs text-gray-400">
                          <Star className="w-3 h-3 text-yellow-400 mr-1" />
                          {project.seller.rating}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-white/20">
                      {project.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-white">${project.price.toLocaleString()}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(project.status)}>{project.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="text-sm font-medium text-white">{project.healthScore}</div>
                      <div className="w-12 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                          style={{ width: `${project.healthScore}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {project.views}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        {project.likes}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-400">{project.lastActivity}</div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="hover:bg-white/10">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="glass border-white/10" align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Project
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-400">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length}{" "}
            results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-white/20 hover:bg-white/10 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-gradient-to-r from-purple-500 to-blue-500"
                        : "border-white/20 hover:bg-white/10 bg-transparent"
                    }
                  >
                    {page}
                  </Button>
                )
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-white/20 hover:bg-white/10 bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
