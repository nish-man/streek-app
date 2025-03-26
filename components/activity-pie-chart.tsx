"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ActivityPieChartProps {
  filter: "weekly" | "monthly" | "yearly"
}

export function ActivityPieChart({ filter }: ActivityPieChartProps) {
  // Activity distribution data
  const weeklyData = [
    { name: "Running", value: 4 },
    { name: "Gym", value: 3 },
    { name: "Yoga", value: 2 },
    { name: "Cycling", value: 0 },
    { name: "Other", value: 1 },
  ]

  const monthlyData = [
    { name: "Running", value: 13 },
    { name: "Gym", value: 13 },
    { name: "Yoga", value: 8 },
    { name: "Cycling", value: 3 },
    { name: "Other", value: 2 },
  ]

  const yearlyData = [
    { name: "Running", value: 163 },
    { name: "Gym", value: 145 },
    { name: "Yoga", value: 70 },
    { name: "Cycling", value: 18 },
    { name: "Other", value: 20 },
  ]

  const data = filter === "weekly" ? weeklyData : filter === "monthly" ? monthlyData : yearlyData

  const COLORS = ["#3b82f6", "#22c55e", "#a855f7", "#f59e0b", "#f43f5e"]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base">Activity Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} activities`, "Count"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

