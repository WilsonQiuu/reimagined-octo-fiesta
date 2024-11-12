"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronDown, Edit2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Incident {
  id: number
  timestamp: string
  location: string
  type: string
  status: string
  videoUrl?: string
}

const mockIncidents: Incident[] = [
  { id: 1, timestamp: "2024-03-15T10:30:00", location: "Central Station", type: "Tailgating", status: "Resolved", videoUrl: "https://example.com/video1.mp4" },
  { id: 2, timestamp: "2024-03-15T11:15:00", location: "North Terminal", type: "Fare Dodging", status: "Pending", videoUrl: "https://example.com/video2.mp4" },
  { id: 3, timestamp: "2024-03-14T09:45:00", location: "West Gate", type: "Invalid Ticket", status: "Resolved", videoUrl: "https://example.com/video3.mp4" },
  { id: 4, timestamp: "2024-03-14T14:20:00", location: "South Entrance", type: "Tailgating", status: "Under Investigation", videoUrl: "https://example.com/video4.mp4" },
  { id: 5, timestamp: "2024-03-13T16:55:00", location: "East Platform", type: "Fare Dodging", status: "Resolved", videoUrl: "https://example.com/video5.mp4" },
]

export function IncidentHistoryComponent() {
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents)
  const [date, setDate] = useState<Date>()
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null)
  const [editingIncident, setEditingIncident] = useState<Incident | null>(null)

  const handleTypeToggle = (type: string) => {
    setSelectedTypes(current =>
      current.includes(type)
        ? current.filter(t => t !== type)
        : [...current, type]
    )
  }

  const filteredIncidents = incidents.filter(incident => {
    const matchesDate = date ? incident.timestamp.startsWith(format(date, "yyyy-MM-dd")) : true
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(incident.type)
    return matchesDate && matchesType
  })

  const handleWatchVideo = (incident: Incident) => {
    setSelectedIncident(incident)
  }

  const handleCloseVideo = () => {
    setSelectedIncident(null)
  }

  const handleEditIncident = (incident: Incident) => {
    setEditingIncident({ ...incident })
  }

  const handleSaveEdit = () => {
    if (editingIncident) {
      setIncidents(currentIncidents =>
        currentIncidents.map(inc =>
          inc.id === editingIncident.id ? editingIncident : inc
        )
      )
      setEditingIncident(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-3xl font-bold">Incident History</h2>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[180px] justify-start">
                <ChevronDown className="mr-2 h-4 w-4" />
                Filter by Type
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuCheckboxItem
                checked={selectedTypes.includes("Tailgating")}
                onCheckedChange={() => handleTypeToggle("Tailgating")}
              >
                Tailgating
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedTypes.includes("Fare Dodging")}
                onCheckedChange={() => handleTypeToggle("Fare Dodging")}
              >
                Fare Dodging
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={selectedTypes.includes("Invalid Ticket")}
                onCheckedChange={() => handleTypeToggle("Invalid Ticket")}
              >
                Invalid Ticket
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="w-full sm:w-auto">
            <Label htmlFor="search" className="sr-only">
              Search incidents
            </Label>
            <Input
              id="search"
              placeholder="Search incidents..."
              className="w-full sm:w-[200px]"
            />
          </div>
        </div>
      </div>

      {selectedIncident && (
        <div className="relative mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCloseVideo}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close video</span>
          </Button>
          <h3 className="text-lg font-semibold mb-2">
            Incident Video: {selectedIncident.location} - {format(new Date(selectedIncident.timestamp), "PPpp")}
          </h3>
          <div className="aspect-video bg-black">
            <video
              src={selectedIncident.videoUrl}
              controls
              className="w-full h-full"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredIncidents.map((incident) => (
            <TableRow key={incident.id}>
              <TableCell className="font-medium">{incident.id}</TableCell>
              <TableCell>{format(new Date(incident.timestamp), "PPpp")}</TableCell>
              <TableCell>{incident.location}</TableCell>
              <TableCell>
                <Badge variant="outline">{incident.type}</Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    incident.status === "Resolved"
                      ? "default"
                      : incident.status === "Pending"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {incident.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => handleWatchVideo(incident)}
                >
                  Watch Video
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditIncident(incident)}
                    >
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Incident</DialogTitle>
                    </DialogHeader>
                    {editingIncident && (
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-type" className="text-right">
                            Type
                          </Label>
                          <Select
                            value={editingIncident.type}
                            onValueChange={(value) =>
                              setEditingIncident({ ...editingIncident, type: value })
                            }
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Tailgating">Tailgating</SelectItem>
                              <SelectItem value="Fare Dodging">Fare Dodging</SelectItem>
                              <SelectItem value="Invalid Ticket">Invalid Ticket</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="edit-status" className="text-right">
                            Status
                          </Label>
                          <Select
                            value={editingIncident.status}
                            onValueChange={(value) =>
                              setEditingIncident({ ...editingIncident, status: value })
                            }
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Resolved">Resolved</SelectItem>
                              <SelectItem value="Pending">Pending</SelectItem>
                              <SelectItem value="Under Investigation">Under Investigation</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleSaveEdit}>Save Changes</Button>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}