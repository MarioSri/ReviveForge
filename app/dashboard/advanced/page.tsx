import { AnalyticsCards } from "@/components/analytics-cards"
import { InteractiveCharts } from "@/components/interactive-charts"
import { AdvancedDataTable } from "@/components/advanced-data-table"
import { KanbanBoard } from "@/components/kanban-board"
import { CalendarComponent } from "@/components/calendar-component"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdvancedDashboardPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Comprehensive analytics and management tools for your ReviveForge marketplace
          </p>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/5 mb-8">
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-8">
            <AnalyticsCards />
          </TabsContent>

          <TabsContent value="charts" className="space-y-8">
            <InteractiveCharts />
          </TabsContent>

          <TabsContent value="projects" className="space-y-8">
            <AdvancedDataTable />
          </TabsContent>

          <TabsContent value="pipeline" className="space-y-8">
            <KanbanBoard />
          </TabsContent>

          <TabsContent value="calendar" className="space-y-8">
            <CalendarComponent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
