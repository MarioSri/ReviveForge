"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { TrendingUp, DollarSign, Eye } from "lucide-react"

// Sample data
const revenueData = [
  { month: "Jan", revenue: 12400, projects: 23, users: 1200 },
  { month: "Feb", revenue: 15600, projects: 28, users: 1450 },
  { month: "Mar", revenue: 18900, projects: 35, users: 1680 },
  { month: "Apr", revenue: 22300, projects: 42, users: 1920 },
  { month: "May", revenue: 28700, projects: 51, users: 2150 },
  { month: "Jun", revenue: 35200, projects: 63, users: 2380 },
  { month: "Jul", revenue: 41800, projects: 72, users: 2650 },
  { month: "Aug", revenue: 47250, projects: 84, users: 2890 },
]

const categoryData = [
  { name: "SaaS Platforms", value: 35, color: "#8B5CF6" },
  { name: "Mobile Apps", value: 25, color: "#3B82F6" },
  { name: "Web Apps", value: 20, color: "#10B981" },
  { name: "E-commerce", value: 12, color: "#F59E0B" },
  { name: "AI/ML", value: 8, color: "#EF4444" },
]

const performanceData = [
  { day: "Mon", views: 2400, clicks: 180, conversions: 12 },
  { day: "Tue", views: 1800, clicks: 145, conversions: 8 },
  { day: "Wed", views: 3200, clicks: 240, conversions: 18 },
  { day: "Thu", views: 2800, clicks: 210, conversions: 15 },
  { day: "Fri", views: 3600, clicks: 280, conversions: 22 },
  { day: "Sat", views: 1900, clicks: 120, conversions: 7 },
  { day: "Sun", views: 2100, clicks: 135, conversions: 9 },
]

const hourlyData = [
  { hour: "00", activity: 12 },
  { hour: "02", activity: 8 },
  { hour: "04", activity: 5 },
  { hour: "06", activity: 15 },
  { hour: "08", activity: 45 },
  { hour: "10", activity: 78 },
  { hour: "12", activity: 95 },
  { hour: "14", activity: 88 },
  { hour: "16", activity: 102 },
  { hour: "18", activity: 85 },
  { hour: "20", activity: 65 },
  { hour: "22", activity: 35 },
]

export function InteractiveCharts() {
  const [timeRange, setTimeRange] = useState("8M")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  return (
    <div className="space-y-6">
      {/* Revenue Trend Chart */}
      <Card className="glass border-white/10">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Revenue & Growth Trends</CardTitle>
              <p className="text-sm text-gray-400 mt-1">Track your marketplace performance over time</p>
            </div>
            <div className="flex gap-2">
              {["1M", "3M", "6M", "8M", "1Y"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={
                    timeRange === range
                      ? "bg-gradient-to-r from-purple-500 to-blue-500"
                      : "border-white/20 hover:bg-white/10 bg-transparent"
                  }
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
              projects: {
                label: "Projects Sold",
                color: "hsl(var(--chart-2))",
              },
              users: {
                label: "Active Users",
                color: "hsl(var(--chart-3))",
              },
            }}
            className="h-[400px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="projectsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8B5CF6"
                  fillOpacity={1}
                  fill="url(#revenueGradient)"
                  name="Revenue ($)"
                />
                <Area
                  type="monotone"
                  dataKey="projects"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#projectsGradient)"
                  name="Projects Sold"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Project Categories</CardTitle>
            <p className="text-sm text-gray-400">Distribution of projects by category</p>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Projects",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                    <span className="text-sm text-gray-300">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{category.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Weekly Performance</CardTitle>
            <p className="text-sm text-gray-400">Views, clicks, and conversions by day</p>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                views: {
                  label: "Views",
                  color: "hsl(var(--chart-1))",
                },
                clicks: {
                  label: "Clicks",
                  color: "hsl(var(--chart-2))",
                },
                conversions: {
                  label: "Conversions",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="views" fill="#8B5CF6" name="Views" />
                  <Bar dataKey="clicks" fill="#3B82F6" name="Clicks" />
                  <Bar dataKey="conversions" fill="#10B981" name="Conversions" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Heatmap */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Daily Activity Pattern</CardTitle>
          <p className="text-sm text-gray-400">User activity throughout the day</p>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              activity: {
                label: "Activity",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="hour" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="activity"
                  stroke="#10B981"
                  fillOpacity={1}
                  fill="url(#activityGradient)"
                  name="Active Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Peak Performance</p>
                <p className="text-lg font-semibold text-white">Friday 4PM</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Avg. Deal Value</p>
                <p className="text-lg font-semibold text-white">$3,240</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Eye className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Conversion Rate</p>
                <p className="text-lg font-semibold text-white">3.8%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
