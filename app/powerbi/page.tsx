"use client"

import * as React from "react"
import { ArrowLeft, BarChart3 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PowerBIPage() {
  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <div className="flex items-center space-x-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight text-primary">PowerBI Analytics</h2>
        </div>
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-primary" />
        </div>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-primary">Interactive Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full h-[800px] border rounded-lg overflow-hidden">
           <iframe title="Sample Report Demo" width="100%" height="100%" src="https://playground.powerbi.com/sampleReportEmbed" frameBorder="0" allowFullScreen="true"></iframe>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>
          <strong>Note:</strong> Replace the iframe src with your actual PowerBI embed URL. 
          You can get this from PowerBI Service → Share → Embed → Website or blog.
        </p>
        <p className="mt-2">
          Example PowerBI embed URL format: 
          <code className="bg-muted px-2 py-1 rounded text-xs ml-2">
            https://app.powerbi.com/reportEmbed?reportId=YOUR_REPORT_ID&autoAuth=true&ctid=YOUR_TENANT_ID
          </code>
        </p>
      </div>
    </div>
  )
}
