"use client";

import { TrendingUp } from "lucide-react";
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

const chartData = [
  { month: "January", desktop: 186, mobile: 264 },
  { month: "February", desktop: 285, mobile: 209 },
  { month: "March", desktop: 237, mobile: 203 },
  { month: "April", desktop: 203, mobile: 237 },
  { month: "May", desktop: 209, mobile: 285 },
  { month: "June", desktop: 264, mobile: 186 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function CustomRadarChart({
  title,
  description,
}: {
  title: string;
  description: string;
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
            <PolarAngleAxis
              stroke="hsla(var(--foreground))"
              tick={false}
              tickLine={false}
              axisLine={false}
            />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0}
              stroke="var(--color-desktop)"
              strokeWidth={2}
            />
            <Radar
              dataKey="mobile"
              fill="var(--color-mobile)"
              fillOpacity={0}
              stroke="var(--color-mobile)"
              strokeWidth={2}
            />
            <PolarRadiusAxis
              angle={60}
              stroke="hsla(var(--foreground))"
              orientation="middle"
              axisLine={false}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Ultimo aggiornamento
        </div>
        <div className="leading-none text-muted-foreground">
          2024-10-5 20:14
        </div>
      </CardFooter>
    </Card>
  );
}
