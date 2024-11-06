"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

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

export function CustomMultipleBarChart({
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
    <Card className="max-h-full h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[3/1] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="wifi" fill="var(--color-wifi)" radius={4} />
            <Bar dataKey="bluetooth" fill="var(--color-bluetooth)" radius={4} />
          </BarChart>
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
