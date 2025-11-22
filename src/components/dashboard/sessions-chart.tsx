"use client"

import { format } from "date-fns"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { sessionData } from "@/lib/mock-data"

const chartConfig = {
  duration: {
    label: "Duration (min)",
    color: "hsl(var(--chart-1))",
  },
}

export function SessionsChart() {
  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <BarChart 
          data={sessionData}
          margin={{
            top: 5,
            right: 10,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => format(new Date(value), "MMM d")}
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
          <Bar dataKey="duration" fill="hsl(var(--chart-1))" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
