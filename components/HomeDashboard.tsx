"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for incidents
const mockIncidents = [
  { id: 1, timestamp: "2024-03-15T10:30:00", location: "Central Station", type: "Tailgating", lat: 51.505, lng: -0.09 },
  { id: 2, timestamp: "2024-03-15T11:15:00", location: "North Terminal", type: "Fare Dodging", lat: 51.51, lng: -0.08 },
  { id: 3, timestamp: "2024-03-15T12:00:00", location: "West Gate", type: "Invalid Ticket", lat: 51.50, lng: -0.1 },
  // Add more mock incidents as needed
]

export function HomeDashboardComponent() {
  const [incidents, setIncidents] = useState(mockIncidents)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const newIncident = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          location: ["Central Station", "North Terminal", "West Gate", "South Entrance"][Math.floor(Math.random() * 4)],
          type: ["Tailgating", "Fare Dodging", "Invalid Ticket"][Math.floor(Math.random() * 3)],
          lat: 51.505 + (Math.random() - 0.5) * 0.1,
          lng: -0.09 + (Math.random() - 0.5) * 0.1,
        }
        setIncidents(prev => prev ? [newIncident, ...prev.slice(0, 9)] : [newIncident]) // Keep only the last 10 incidents
      } catch (error) {
        console.error("Error updating incidents:", error)
      }
    }, 5000) // Add a new incident every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incidents.length}</div>
            <p className="text-xs text-muted-foreground">+20.1% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">132</div>
            <p className="text-xs text-muted-foreground">-3.2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Common Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Fare Dodging</div>
            <p className="text-xs text-muted-foreground">42% of all incidents</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Live Incident Feed</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[calc(100vh-300px)] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents && incidents.map(incident => (
                  <TableRow key={incident.id}>
                    <TableCell>{new Date(incident.timestamp).toLocaleTimeString()}</TableCell>
                    <TableCell>{incident.location}</TableCell>
                    <TableCell>
                      <Badge variant={incident.type === "Tailgating" ? "destructive" : "default"}>
                        {incident.type}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}