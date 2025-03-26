"use client"

import { useState } from "react"
import { Calendar, BarChart2, LineChart, PieChart, Filter, Info, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ActivityChart } from "@/components/activity-chart"
import { ActivityAreaChart } from "@/components/activity-area-chart"
import { ActivityPieChart } from "@/components/activity-pie-chart"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

interface Activity {
  id: string
  name: string
  type: string
  date: Date
  completed: boolean
}

export function Analytics() {
  const [filter, setFilter] = useState("weekly")
  const [activityType, setActivityType] = useState("running")
  const [chartType, setChartType] = useState("bar")
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      name: "Morning Run",
      type: "running",
      date: new Date(Date.now() - 86400000),
      completed: true,
    },
    {
      id: "2",
      name: "Gym Workout",
      type: "gym",
      date: new Date(),
      completed: true,
    },
    {
      id: "3",
      name: "Morning Run",
      type: "running",
      date: new Date(Date.now() - 86400000 * 2),
      completed: true,
    },
    {
      id: "4",
      name: "Yoga Session",
      type: "yoga",
      date: new Date(Date.now() - 86400000 * 3),
      completed: true,
    },
    {
      id: "5",
      name: "Morning Run",
      type: "running",
      date: new Date(Date.now() - 86400000 * 4),
      completed: true,
    },
    {
      id: "6",
      name: "Evening Ride",
      type: "cycling",
      date: new Date(Date.now() - 86400000 * 2),
      completed: true,
    },
    {
      id: "7",
      name: "Swimming",
      type: "other",
      date: new Date(Date.now() - 86400000 * 3),
      completed: true,
    },
  ])

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activityDetailsOpen, setActivityDetailsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case "running":
        return "bg-blue-500"
      case "gym":
        return "bg-green-500"
      case "yoga":
        return "bg-purple-500"
      case "cycling":
        return "bg-amber-500"
      case "other":
        return "bg-rose-500"
      default:
        return "bg-gray-500"
    }
  }

  const viewActivityDetails = (activity: Activity) => {
    setSelectedActivity(activity);
    setActivityDetailsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="border-b pb-3 mb-4">
        <h1 className="text-2xl font-bold text-foreground">Activity Dashboard</h1>
        <p className="text-muted-foreground">Track and analyze your fitness activities</p>
      </div>

      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm font-medium">Filter Activities</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex space-x-1 bg-muted/50 p-1 rounded-md">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${chartType === "bar" ? "bg-background shadow-sm" : ""}`}
                        onClick={() => setChartType("bar")}
                      >
                        <BarChart2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Bar Chart</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${chartType === "line" ? "bg-background shadow-sm" : ""}`}
                        onClick={() => setChartType("line")}
                      >
                        <LineChart className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Line Chart</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-8 w-8 ${chartType === "pie" ? "bg-background shadow-sm" : ""}`}
                        onClick={() => setChartType("pie")}
                      >
                        <PieChart className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Pie Chart</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-primary hover:bg-primary-dark flex items-center gap-1 rounded-full">
                    <Plus className="h-4 w-4" />
                    Add Activity
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Activity</DialogTitle>
                    <DialogDescription>
                      Record a new fitness activity to track your progress.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    {/* Existing dialog content */}
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                    <Button>Save Activity</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 scrollbar-none">
              <Badge
                variant={activityType === "running" ? "default" : "outline"}
                className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 ${
                  activityType === "running" 
                    ? "bg-blue-500 text-white"
                    : "bg-blue-50 hover:bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                }`}
                onClick={() => setActivityType("running")}
              >
                Running
              </Badge>
              <Badge
                variant={activityType === "gym" ? "default" : "outline"}
                className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 ${
                  activityType === "gym" 
                    ? "bg-green-500 text-white"
                    : "bg-green-50 hover:bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                }`}
                onClick={() => setActivityType("gym")}
              >
                Gym
              </Badge>
              <Badge
                variant={activityType === "yoga" ? "default" : "outline"}
                className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 ${
                  activityType === "yoga" 
                    ? "bg-purple-500 text-white"
                    : "bg-purple-50 hover:bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300"
                }`}
                onClick={() => setActivityType("yoga")}
              >
                Yoga
              </Badge>
              <Badge
                variant={activityType === "cycling" ? "default" : "outline"}
                className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 ${
                  activityType === "cycling" 
                    ? "bg-amber-500 text-white"
                    : "bg-amber-50 hover:bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300"
                }`}
                onClick={() => setActivityType("cycling")}
              >
                Cycling
              </Badge>
              <Badge
                variant={activityType === "other" ? "default" : "outline"}
                className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 ${
                  activityType === "other" 
                    ? "bg-rose-500 text-white"
                    : "bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300"
                }`}
                onClick={() => setActivityType("other")}
              >
                Other
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="weekly" onClick={() => setFilter("weekly")}>
                Weekly
              </TabsTrigger>
              <TabsTrigger value="monthly" onClick={() => setFilter("monthly")}>
                Monthly
              </TabsTrigger>
              <TabsTrigger value="yearly" onClick={() => setFilter("yearly")}>
                Yearly
              </TabsTrigger>
            </TabsList>
            <TabsContent value="weekly" className="mt-4">
              {chartType === "bar" && <ActivityChart filter="weekly" activityType={activityType} />}
              {chartType === "line" && <ActivityAreaChart filter="weekly" activityType={activityType} />}
              {chartType === "pie" && <ActivityPieChart filter="weekly" />}
            </TabsContent>
            <TabsContent value="monthly" className="mt-4">
              {chartType === "bar" && <ActivityChart filter="monthly" activityType={activityType} />}
              {chartType === "line" && <ActivityAreaChart filter="monthly" activityType={activityType} />}
              {chartType === "pie" && <ActivityPieChart filter="monthly" />}
            </TabsContent>
            <TabsContent value="yearly" className="mt-4">
              {chartType === "bar" && <ActivityChart filter="yearly" activityType={activityType} />}
              {chartType === "line" && <ActivityAreaChart filter="yearly" activityType={activityType} />}
              {chartType === "pie" && <ActivityPieChart filter="yearly" />}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="space-y-4 mt-6">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Recent Activities</h2>
          <span className="text-xs text-muted-foreground">{activities.filter(a => a.type === activityType).length} activities</span>
        </div>
        
        {activities
          .filter((activity) => activity.type === activityType)
          .map((activity) => (
            <Card key={activity.id}>
              <CardHeader className="py-3">
                <CardTitle className="text-base flex justify-between items-center">
                  <span>{activity.name}</span>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {activity.date.toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="py-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${getActivityTypeColor(activity.type)}`} />
                    <span className="text-sm capitalize">{activity.type}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => viewActivityDetails(activity)}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      <Dialog open={activityDetailsOpen} onOpenChange={setActivityDetailsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activity Details</DialogTitle>
            <DialogDescription>
              Detailed information about this activity
            </DialogDescription>
          </DialogHeader>
          
          {selectedActivity && (
            <div className="space-y-4 py-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{selectedActivity.name}</h3>
                <Badge 
                  className={`${
                    selectedActivity.type === "running" ? "bg-blue-500" : 
                    selectedActivity.type === "gym" ? "bg-green-500" : 
                    selectedActivity.type === "yoga" ? "bg-purple-500" :
                    selectedActivity.type === "cycling" ? "bg-amber-500" : "bg-rose-500"
                  }`}
                >
                  {selectedActivity.type}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Date</p>
                  <p>{selectedActivity.date.toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Status</p>
                  <p>{selectedActivity.completed ? "Completed" : "In Progress"}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <p className="text-muted-foreground text-sm">Summary</p>
                <p className="text-sm">
                  This {selectedActivity.type} activity was recorded on {selectedActivity.date.toLocaleDateString()}. 
                  You can track more details in the analytics dashboard.
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button onClick={() => setActivityDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

