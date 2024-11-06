"use client";

import { Bluetooth, TrendingUp } from "lucide-react";
import {
  PolarAngleAxis,
  PolarRadiusAxis,
  PolarGrid,
  Radar,
  RadarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radar chart with a grid filled";

const chartConfig = {
  wifi: {
    label: "Wifi",
    color: "hsl(var(--chart-1))",
  },
  bluetooth: {
    label: "Bluetooth",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CustomRadarChart({
  title,
  description,
  lastUpdate,
  chartData,
}: {
  title?: string;
  description?: string;
  lastUpdate?: string;
  chartData: any[];
}) {
  return (
    <Card className="flex flex-col h-full w-full">
      <CardHeader className="items-center pb-4">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square min-h-[15rem]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid
              // className="fill-[--color-desktop] opacity-30 border-solid"
              gridType="circle"
              radialLines={false}
            />
            <PolarRadiusAxis
              angle={60}
              stroke="hsla(var(--foreground))"
              orientation="middle"
              axisLine={false}
              reversed={true}
            />
            <PolarAngleAxis
              stroke="hsla(var(--foreground))"
              tick={false}
              tickLine={false}
              axisLine={false}
            />
            <Radar
              dataKey="wifi"
              fill="var(--color-wifi)"
              fillOpacity={0}
              stroke="var(--color-wifi)"
              strokeWidth={2}
            />
            <Radar
              dataKey="bluetooth"
              fill="var(--color-bluetooth)"
              fillOpacity={0}
              stroke="var(--color-bluetooth)"
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Ultimo aggiornamento
        </div>
        <div className="leading-none text-muted-foreground">{lastUpdate}</div>
      </CardFooter>
    </Card>
  );
}
