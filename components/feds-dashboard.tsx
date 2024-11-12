"use client";

import { Bell, Home, Video, LineChart, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HomeDashboardComponent } from "@/components/HomeDashboard";
import { LiveMonitoringComponent } from "@/components/LiveMonitoring";
import { IncidentHistoryComponent } from "@/components/IncidentHistory";


export function FedsDashboard() {
  return (
    <Tabs defaultValue="home" className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 p-4">
        <h1 className="text-2xl font-bold mb-8">FEDS Dashboard</h1>
        <nav>
          <TabsList  className="flex flex-col items-stretch h-auto">
            <TabsTrigger value="home" className="justify-start">
              <Home className="mr-2" /> Home
            </TabsTrigger>
            <TabsTrigger value="live" className="justify-start">
              <Video className="mr-2" /> Live Monitoring
            </TabsTrigger>
            <TabsTrigger value="history" className="justify-start">
              <LineChart className="mr-2" /> Incident History
            </TabsTrigger>
            <TabsTrigger value="analytics" className="justify-start">
              <LineChart className="mr-2" /> Analytics & Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="justify-start">
              <Settings className="mr-2" /> Settings
            </TabsTrigger>
            <TabsTrigger value="feedback" className="justify-start">
              <User className="mr-2" /> User Feedback
            </TabsTrigger>
          </TabsList>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold">FEDS Dashboard</h2>
          <div className="flex items-center space-x-4">
            <Input type="search" placeholder="Search..." className="w-64" />
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Admin User</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dynamic Content Below the Header */}
        <TabsContent value="home">
          <HomeDashboardComponent />
        </TabsContent>
        <TabsContent value="live">
          <LiveMonitoringComponent />
        </TabsContent>
        <TabsContent value="history">
          <IncidentHistoryComponent />
        </TabsContent>
        <TabsContent value="analytics">
          <AnalyticsReports />
        </TabsContent>
        <TabsContent value="settings">
          <SettingsUserManagement />
        </TabsContent>
        <TabsContent value="feedback">
          <UserFeedback />
        </TabsContent>
      </main>
    </Tabs>
  );
}

// Placeholder components for each tab
function IncidentHistory() {
  return <div>Incident History Content</div>;
}

function AnalyticsReports() {
  return <div>Analytics and Reports Content</div>;
}

function SettingsUserManagement() {
  return <div>Settings and User Management Content</div>;
}

function UserFeedback() {
  return <div>User Feedback Content</div>;
}
