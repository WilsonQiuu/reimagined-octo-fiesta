"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const mockCameras = [
  { id: 1, name: "Central Station Entrance", status: "active" },
  { id: 2, name: "North Terminal Gate", status: "active" },
  { id: 3, name: "West Gate Turnstiles", status: "inactive" },
  { id: 4, name: "South Entrance", status: "active" },
]

export function LiveMonitoringComponent() {
  const [selectedCamera, setSelectedCamera] = useState(mockCameras[0])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {mockCameras.map((camera) => (
          <Card key={camera.id} className={selectedCamera.id === camera.id ? "border-primary" : ""}>
            <CardHeader className="p-4">
              <CardTitle className="text-sm">{camera.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <Badge variant={camera.status === "active" ? "default" : "secondary"}>
                {camera.status}
              </Badge>
              <Button 
                className="w-full mt-2" 
                variant={selectedCamera.id === camera.id ? "default" : "outline"}
                onClick={() => setSelectedCamera(camera)}
              >
                {selectedCamera.id === camera.id ? "Viewing" : "View"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Live Feed: {selectedCamera.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Live video feed would be displayed here</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Detections</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {[...Array(5)].map((_, index) => (
              <li key={index} className="flex justify-between items-center p-2 bg-gray-100 dark:bg-gray-800 rounded">
                <span>Potential fare evasion detected</span>
                <Badge variant="outline">{new Date().toLocaleTimeString()}</Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}