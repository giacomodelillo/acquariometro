"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

export const description = "A multiple line chart";

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

export function CustomMultipleLineChart({
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
    <Card className=" max-h-full h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-[3/1] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={0}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="wifi"
              type="monotone"
              stroke="var(--color-wifi)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="bluetooth"
              type="monotone"
              stroke="var(--color-bluetooth)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
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
