"use client"

import * as React from "react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { ArrowUpRight, Bot, Globe2, LayoutDashboard, Moon, Settings, Sun, Users, BarChart3 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// ============= API ENDPOINTS =============
// Azure-deployed API endpoints
const API_ENDPOINTS = {
  DASHBOARD_STATS: "https://mypmapi.azurewebsites.net/api/dashboard-summary", // Returns: { totalFilesDownloaded: number, totalFilesProcessed: number, filesDownloadedToday: number, filesProcessedToday: number }
  FILES_TREND: "https://mypmapi.azurewebsites.net/api/daily-metrics", // Returns: [{ name: string, downloads: number, authors: number, processed: number }]
  RECENT_PAPERS: "https://mypmapi.azurewebsites.net/api/recent-papers", // Returns: [{ id: number, name: string, authors: string, keywords: string, downloadTime: string }]
}

// Set to true to use mock data, false to use real APIs
const USE_MOCK_DATA = false

// ============= TYPE DEFINITIONS =============
interface DashboardStats {
  totalFilesDownloaded: number
  totalFilesProcessed: number
  filesDownloadedToday: number
  filesProcessedToday: number
}

interface FilesTrendData {
  name: string
  downloads: number
  authors: number
  processed: number
}

interface RecentPaper {
  id: number
  name: string
  authors: string
  keywords: string
  downloadTime: string
  url: string
}

// ============= MOCK DATA =============
const mockDashboardStats: DashboardStats = {
  totalFilesDownloaded: 0,
  totalFilesProcessed: 0,
  filesDownloadedToday: 0,
  filesProcessedToday: 0,
}

const mockFileData: FilesTrendData[] = [
]

const mockRecentPapers: RecentPaper[] = [
 
]

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = React.useState(false)

  // ============= STATE FOR API DATA =============
  const [dashboardStats, setDashboardStats] = React.useState<DashboardStats>(mockDashboardStats)
  const [filesTrendData, setFilesTrendData] = React.useState<FilesTrendData[]>(mockFileData)
  const [recentPapers, setRecentPapers] = React.useState<RecentPaper[]>(mockRecentPapers)
  const [loading, setLoading] = React.useState(false)

  // ============= API FETCH FUNCTIONS =============
  const fetchDashboardStats = async () => {
    if (USE_MOCK_DATA) {
      console.log("Using mock data for dashboard stats")
      setDashboardStats(mockDashboardStats)
      return
    }

    try {
      setLoading(true)
      const response = await fetch(API_ENDPOINTS.DASHBOARD_STATS)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data: DashboardStats = await response.json()
      setDashboardStats(data)
      console.log("Dashboard stats fetched successfully:", data)
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      console.log("Falling back to mock data")
      setDashboardStats(mockDashboardStats)
    } finally {
      setLoading(false)
    }
  }

  const fetchFilesTrend = async () => {
    if (USE_MOCK_DATA) {
      console.log("Using mock data for files trend")
      setFilesTrendData(mockFileData)
      return
    }

    try {
      setLoading(true)
      const response = await fetch(API_ENDPOINTS.FILES_TREND)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data: FilesTrendData[] = await response.json()
      setFilesTrendData(data)
      console.log("Files trend data fetched successfully:", data)
    } catch (error) {
      console.error("Error fetching files trend:", error)
      console.log("Falling back to mock data")
      setFilesTrendData(mockFileData)
    } finally {
      setLoading(false)
    }
  }

  const fetchRecentPapers = async () => {
    if (USE_MOCK_DATA) {
      console.log("Using mock data for recent papers")
      setRecentPapers(mockRecentPapers)
      return
    }

    try {
      setLoading(true)
      const response = await fetch(API_ENDPOINTS.RECENT_PAPERS)
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data: RecentPaper[] = await response.json()
      setRecentPapers(data)
      console.log("Recent papers fetched successfully:", data)
    } catch (error) {
      console.error("Error fetching recent papers:", error)
      console.log("Falling back to mock data")
      setRecentPapers(mockRecentPapers)
    } finally {
      setLoading(false)
    }
  }

  // ============= FETCH ALL DATA =============
  const fetchAllData = async () => {
    console.log("Fetching all dashboard data...")
    await Promise.all([fetchDashboardStats(), fetchFilesTrend(), fetchRecentPapers()])
    console.log("All data fetched")
  }

  // ============= EFFECTS =============
  React.useEffect(() => {
    // Initial data fetch
    fetchAllData()

    // Set up auto-refresh every 30 seconds (only if not using mock data)
    if (!USE_MOCK_DATA) {
      const interval = setInterval(() => {
        console.log("Auto-refreshing data...")
        fetchAllData()
      }, 30000)

      return () => clearInterval(interval)
    }
  }, [])



  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen p-8 bg-background text-foreground ${isDarkMode ? "dark" : ""}`}>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-primary">ASA Space Admin Portal</h2>
        <div className="flex items-center space-x-2">
          <Link href="/powerbi">
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              PowerBI
            </Button>
          </Link>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button onClick={fetchAllData} disabled={loading}>
            <Settings className="mr-2 h-4 w-4" />
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
          {USE_MOCK_DATA && (
            <div className="text-xs text-muted-foreground bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded">
              Mock Data Mode
            </div>
          )}
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4 mt-6">
        <TabsList>
          <TabsTrigger value="overview">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Total Files Downloaded</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalFilesDownloaded.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Total Files Processed</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalFilesProcessed.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Files Downloaded Today</CardTitle>
                <Bot className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.filesDownloadedToday}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-primary">Files Processed Today</CardTitle>
                <Globe2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.filesProcessedToday}</div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="text-primary">Files Downloaded Trend</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={filesTrendData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                        borderColor: isDarkMode ? "#374151" : "#e5e7eb",
                        color: isDarkMode ? "#ffffff" : "#000000",
                      }}
                    />
                    <Bar dataKey="downloads" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="text-primary">Author Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={filesTrendData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                        borderColor: isDarkMode ? "#374151" : "#e5e7eb",
                        color: isDarkMode ? "#ffffff" : "#000000",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="authors"
                      stroke="currentColor"
                      strokeWidth={2}
                      dot={false}
                      className="stroke-primary"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Papers Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Last 20 Papers Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%] text-primary">Paper Name</TableHead>
                    <TableHead className="w-[25%] text-primary">Authors</TableHead>
                    <TableHead className="w-[20%] text-primary">Keywords</TableHead>
                    <TableHead className="w-[15%] text-primary">Download Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPapers.map((paper) => (
                    <TableRow key={paper.id}>
                      <TableCell className="font-medium">
                        {paper.url ? (
                          <a
                            href={paper.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="max-w-md truncate text-primary hover:underline"
                            title="Download paper"
                          >
                            {paper.name}
                          </a>
                        ) : (
                          <div className="max-w-md truncate" title={paper.name}>
                            {paper.name}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={paper.authors}>
                          {paper.authors}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs truncate" title={paper.keywords}>
                          {paper.keywords}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{paper.downloadTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
