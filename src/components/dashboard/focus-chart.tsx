"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { focusData } from "@/lib/mock-data"

const chartConfig = {
  focus: {
    label: "Focus Score",
    color: "hsl(var(--chart-1))",
  },
  optimal: {
    label: "Optimal",
    color: "hsl(var(--chart-2))",
  },
}

export function FocusChart() {
  return (
    <div className="h-[300px] w-full">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <LineChart
          data={focusData}
          margin={{
            top: 5,
            right: 20,
            left: -10,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            domain={[40, 100]}
           />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="focus"
            type="monotone"
            stroke="hsl(var(--chart-1))"
            strokeWidth={3}
            dot={false}
          />
           <Line
            dataKey="optimal"
            type="monotone"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            strokeDasharray="3 3"
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
