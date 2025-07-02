"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Eye, Target, Users, ShoppingCart, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
  trend: "up" | "down"
  color: "green" | "red" | "blue" | "purple" | "orange"
}

function MetricCard({ title, value, change, changeLabel, icon, trend, color }: MetricCardProps) {
  const colorClasses = {
    green: "text-green-400 bg-green-500/10 border-green-500/20",
    red: "text-red-400 bg-red-500/10 border-red-500/20",
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  }

  return (
    <Card className="glass border-white/10 hover:border-purple-500/30 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm text-gray-400 font-medium">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
            <div className="flex items-center space-x-2">
              <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClasses[color]}`}>
                {trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 mr-1" />
                )}
                {change}%
              </div>
              <span className="text-xs text-gray-400">{changeLabel}</span>
            </div>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ProgressCardProps {
  title: string
  value: number
  target: number
  label: string
  color: string
}

function ProgressCard({ title, value, target, label, color }: ProgressCardProps) {
  const percentage = (value / target) * 100

  return (
    <Card className="glass border-white/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-white text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-white">{value.toLocaleString()}</span>
            <span className="text-sm text-gray-400">of {target.toLocaleString()}</span>
          </div>
          <Progress value={percentage} className="h-2" />
          <p className="text-xs text-gray-400">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function AnalyticsCards() {
  const metrics = [
    {
      title: "Total Revenue",
      value: "$47,250",
      change: 12.5,
      changeLabel: "vs last month",
      icon: <DollarSign className="w-6 h-6" />,
      trend: "up" as const,
      color: "green" as const,
    },
    {
      title: "Project Views",
      value: "23,847",
      change: 8.2,
      changeLabel: "vs last week",
      icon: <Eye className="w-6 h-6" />,
      trend: "up" as const,
      color: "blue" as const,
    },
    {
      title: "Success Rate",
      value: "94.2%",
      change: -2.1,
      changeLabel: "vs last month",
      icon: <Target className="w-6 h-6" />,
      trend: "down" as const,
      color: "red" as const,
    },
    {
      title: "Active Users",
      value: "1,847",
      change: 15.3,
      changeLabel: "vs last month",
      icon: <Users className="w-6 h-6" />,
      trend: "up" as const,
      color: "purple" as const,
    },
    {
      title: "Projects Sold",
      value: "156",
      change: 23.1,
      changeLabel: "vs last month",
      icon: <ShoppingCart className="w-6 h-6" />,
      trend: "up" as const,
      color: "green" as const,
    },
    {
      title: "Avg. Response Time",
      value: "2.4h",
      change: -18.5,
      changeLabel: "vs last week",
      icon: <Clock className="w-6 h-6" />,
      trend: "up" as const,
      color: "orange" as const,
    },
  ]

  const progressMetrics = [
    {
      title: "Monthly Revenue Goal",
      value: 47250,
      target: 60000,
      label: "78.8% of monthly target achieved",
      color: "green",
    },
    {
      title: "New User Acquisition",
      value: 1847,
      target: 2000,
      label: "92.4% of monthly target achieved",
      color: "blue",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {progressMetrics.map((metric, index) => (
          <ProgressCard key={index} {...metric} />
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Top Performing Category</h3>
              <Badge className="bg-green-500/20 text-green-400">+24%</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold gradient-text">SaaS Platforms</p>
              <p className="text-sm text-gray-400">Generated $18,450 this month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Conversion Rate</h3>
              <Badge className="bg-blue-500/20 text-blue-400">Stable</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold gradient-text">3.8%</p>
              <p className="text-sm text-gray-400">From views to purchases</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Average Deal Size</h3>
              <Badge className="bg-purple-500/20 text-purple-400">+12%</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold gradient-text">$3,240</p>
              <p className="text-sm text-gray-400">Per successful transaction</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
