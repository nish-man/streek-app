"use client"

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ActivityAreaChartProps {
  filter: "weekly" | "monthly" | "yearly"
  activityType: string
}

export function ActivityAreaChart({ filter, activityType }: ActivityAreaChartProps) {
  // Same data structure as ActivityChart
  const weeklyData = [
    { name: "Mon (Today)", running: 2, gym: 0, yoga: 0, cycling: 0, other: 0, total: 2 },
    { name: "Tue (Apr 23)", running: 0, gym: 1, yoga: 0, cycling: 0, other: 0, total: 1 },
    { name: "Wed (Apr 24)", running: 1, gym: 1, yoga: 1, cycling: 0, other: 0, total: 3 },
    { name: "Thu (Apr 25)", running: 0, gym: 0, yoga: 0, cycling: 0, other: 0, total: 0 },
    { name: "Fri (Apr 26)", running: 1, gym: 1, yoga: 0, cycling: 0, other: 0, total: 2 },
    { name: "Sat (Apr 27)", running: 0, gym: 0, yoga: 1, cycling: 0, other: 0, total: 1 },
    { name: "Sun (Apr 28)", running: 0, gym: 0, yoga: 0, cycling: 0, other: 1, total: 1 },
  ]

  const monthlyData = [
    { name: "Week 1 (Apr 1-7)", running: 3, gym: 2, yoga: 3, cycling: 0, other: 1, total: 9 },
    { name: "Week 2 (Apr 8-14)", running: 4, gym: 3, yoga: 2, cycling: 1, other: 0, total: 10 },
    { name: "Week 3 (Apr 15-21)", running: 2, gym: 3, yoga: 1, cycling: 1, other: 1, total: 8 },
    { name: "Week 4 (Apr 22-28)", running: 4, gym: 5, yoga: 2, cycling: 1, other: 0, total: 12 },
  ]

  const yearlyData = [
    { name: "Jan", running: 12, gym: 10, yoga: 8, cycling: 0, other: 2, total: 32 },
    { name: "Feb", running: 10, gym: 12, yoga: 6, cycling: 0, other: 2, total: 30 },
    { name: "Mar", running: 15, gym: 13, yoga: 7, cycling: 0, other: 1, total: 36 },
    { name: "Apr", running: 14, gym: 11, yoga: 6, cycling: 1, other: 2, total: 34 },
    { name: "May", running: 18, gym: 15, yoga: 5, cycling: 2, other: 2, total: 42 },
    { name: "Jun", running: 16, gym: 14, yoga: 6, cycling: 2, other: 1, total: 39 },
    { name: "Jul", running: 18, gym: 15, yoga: 7, cycling: 2, other: 3, total: 45 },
    { name: "Aug", running: 14, gym: 13, yoga: 6, cycling: 2, other: 1, total: 36 },
    { name: "Sep", running: 12, gym: 11, yoga: 5, cycling: 2, other: 2, total: 32 },
    { name: "Oct", running: 10, gym: 9, yoga: 4, cycling: 2, other: 1, total: 26 },
    { name: "Nov", running: 13, gym: 12, yoga: 5, cycling: 2, other: 2, total: 34 },
    { name: "Dec", running: 11, gym: 10, yoga: 5, cycling: 2, other: 1, total: 29 },
  ]

  const data = filter === "weekly" ? weeklyData : filter === "monthly" ? monthlyData : yearlyData

  const activityColors = {
    running: "#3b82f6", // blue-500
    gym: "#22c55e", // green-500
    yoga: "#a855f7", // purple-500
    cycling: "#f59e0b", // amber-500
    other: "#f43f5e", // rose-500
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-base">Activity Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
              <XAxis 
                dataKey="name" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                angle={-20}
                textAnchor="end"
                height={60}
                tick={{ dy: 10 }}
              />
              <YAxis fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />

              <Area
                type="monotone"
                dataKey={activityType}
                name={activityType.charAt(0).toUpperCase() + activityType.slice(1)}
                stroke={activityColors[activityType as keyof typeof activityColors]}
                fill={activityColors[activityType as keyof typeof activityColors]}
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

