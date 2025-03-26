"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ActivityChart } from "@/components/activity-chart"

interface Activity {
  id: string
  name: string
  type: string
  date: Date
  completed: boolean
}

export function History() {
  const [filter, setFilter] = useState("weekly")
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
  ])

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Activity History</h1>
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
          <ActivityChart filter="weekly" />
        </TabsContent>
        <TabsContent value="monthly" className="mt-4">
          <ActivityChart filter="monthly" />
        </TabsContent>
        <TabsContent value="yearly" className="mt-4">
          <ActivityChart filter="yearly" />
        </TabsContent>
      </Tabs>

      <div className="space-y-4 mt-6">
        <h2 className="text-lg font-semibold">Recent Activities</h2>
        {activities.map((activity) => (
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
                  <div
                    className={`w-2 h-2 rounded-full mr-2 ${
                      activity.type === "running"
                        ? "bg-blue-500"
                        : activity.type === "gym"
                          ? "bg-green-500"
                          : activity.type === "yoga"
                            ? "bg-purple-500"
                            : "bg-gray-500"
                    }`}
                  />
                  <span className="text-sm capitalize">{activity.type}</span>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

