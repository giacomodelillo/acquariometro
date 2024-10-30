"use client";

import * as React from "react";
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

const chartData = [
  { date: "2024-04-01", wifi: 222, bluetooth: 150 },
  { date: "2024-04-02", wifi: 97, bluetooth: 180 },
  { date: "2024-04-03", wifi: 167, bluetooth: 120 },
  { date: "2024-04-04", wifi: 242, bluetooth: 260 },
  { date: "2024-04-05", wifi: 373, bluetooth: 290 },
  { date: "2024-04-06", wifi: 301, bluetooth: 340 },
  { date: "2024-04-07", wifi: 245, bluetooth: 180 },
  { date: "2024-04-08", wifi: 409, bluetooth: 320 },
  { date: "2024-04-09", wifi: 59, bluetooth: 110 },
  { date: "2024-04-10", wifi: 261, bluetooth: 190 },
  { date: "2024-04-11", wifi: 327, bluetooth: 350 },
  { date: "2024-04-12", wifi: 292, bluetooth: 210 },
  { date: "2024-04-13", wifi: 342, bluetooth: 380 },
  { date: "2024-04-14", wifi: 137, bluetooth: 220 },
  { date: "2024-04-15", wifi: 120, bluetooth: 170 },
  { date: "2024-04-16", wifi: 138, bluetooth: 190 },
  { date: "2024-04-17", wifi: 446, bluetooth: 360 },
  { date: "2024-04-18", wifi: 364, bluetooth: 410 },
  { date: "2024-04-19", wifi: 243, bluetooth: 180 },
  { date: "2024-04-20", wifi: 89, bluetooth: 150 },
  { date: "2024-04-21", wifi: 137, bluetooth: 200 },
  { date: "2024-04-22", wifi: 224, bluetooth: 170 },
  { date: "2024-04-23", wifi: 138, bluetooth: 230 },
  { date: "2024-04-24", wifi: 387, bluetooth: 290 },
  { date: "2024-04-25", wifi: 215, bluetooth: 250 },
  { date: "2024-04-26", wifi: 75, bluetooth: 130 },
  { date: "2024-04-27", wifi: 383, bluetooth: 420 },
  { date: "2024-04-28", wifi: 122, bluetooth: 180 },
  { date: "2024-04-29", wifi: 315, bluetooth: 240 },
  { date: "2024-04-30", wifi: 454, bluetooth: 380 },
  { date: "2024-05-01", wifi: 165, bluetooth: 220 },
  { date: "2024-05-02", wifi: 293, bluetooth: 310 },
  { date: "2024-05-03", wifi: 247, bluetooth: 190 },
  { date: "2024-05-04", wifi: 385, bluetooth: 420 },
  { date: "2024-05-05", wifi: 481, bluetooth: 390 },
  { date: "2024-05-06", wifi: 498, bluetooth: 520 },
  { date: "2024-05-07", wifi: 388, bluetooth: 300 },
  { date: "2024-05-08", wifi: 149, bluetooth: 210 },
  { date: "2024-05-09", wifi: 227, bluetooth: 180 },
  { date: "2024-05-10", wifi: 293, bluetooth: 330 },
  { date: "2024-05-11", wifi: 335, bluetooth: 270 },
  { date: "2024-05-12", wifi: 197, bluetooth: 240 },
  { date: "2024-05-13", wifi: 197, bluetooth: 160 },
  { date: "2024-05-14", wifi: 448, bluetooth: 490 },
  { date: "2024-05-15", wifi: 473, bluetooth: 380 },
  { date: "2024-05-16", wifi: 338, bluetooth: 400 },
  { date: "2024-05-17", wifi: 499, bluetooth: 420 },
  { date: "2024-05-18", wifi: 315, bluetooth: 350 },
  { date: "2024-05-19", wifi: 235, bluetooth: 180 },
  { date: "2024-05-20", wifi: 177, bluetooth: 230 },
  { date: "2024-05-21", wifi: 82, bluetooth: 140 },
  { date: "2024-05-22", wifi: 81, bluetooth: 120 },
  { date: "2024-05-23", wifi: 252, bluetooth: 290 },
  { date: "2024-05-24", wifi: 294, bluetooth: 220 },
  { date: "2024-05-25", wifi: 201, bluetooth: 250 },
  { date: "2024-05-26", wifi: 213, bluetooth: 170 },
  { date: "2024-05-27", wifi: 420, bluetooth: 460 },
  { date: "2024-05-28", wifi: 233, bluetooth: 190 },
  { date: "2024-05-29", wifi: 78, bluetooth: 130 },
  { date: "2024-05-30", wifi: 340, bluetooth: 280 },
  { date: "2024-05-31", wifi: 178, bluetooth: 230 },
  { date: "2024-06-01", wifi: 178, bluetooth: 200 },
  { date: "2024-06-02", wifi: 470, bluetooth: 410 },
  { date: "2024-06-03", wifi: 103, bluetooth: 160 },
  { date: "2024-06-04", wifi: 439, bluetooth: 380 },
  { date: "2024-06-05", wifi: 88, bluetooth: 140 },
  { date: "2024-06-06", wifi: 294, bluetooth: 250 },
  { date: "2024-06-07", wifi: 323, bluetooth: 370 },
  { date: "2024-06-08", wifi: 385, bluetooth: 320 },
  { date: "2024-06-09", wifi: 438, bluetooth: 480 },
  { date: "2024-06-10", wifi: 155, bluetooth: 200 },
  { date: "2024-06-11", wifi: 92, bluetooth: 150 },
  { date: "2024-06-12", wifi: 492, bluetooth: 420 },
  { date: "2024-06-13", wifi: 81, bluetooth: 130 },
  { date: "2024-06-14", wifi: 426, bluetooth: 380 },
  { date: "2024-06-15", wifi: 307, bluetooth: 350 },
  { date: "2024-06-16", wifi: 371, bluetooth: 310 },
  { date: "2024-06-17", wifi: 475, bluetooth: 520 },
  { date: "2024-06-18", wifi: 107, bluetooth: 170 },
  { date: "2024-06-19", wifi: 341, bluetooth: 290 },
  { date: "2024-06-20", wifi: 408, bluetooth: 450 },
  { date: "2024-06-21", wifi: 169, bluetooth: 210 },
  { date: "2024-06-22", wifi: 317, bluetooth: 270 },
  { date: "2024-06-23", wifi: 480, bluetooth: 530 },
  { date: "2024-06-24", wifi: 132, bluetooth: 180 },
  { date: "2024-06-25", wifi: 141, bluetooth: 190 },
  { date: "2024-06-26", wifi: 434, bluetooth: 380 },
  { date: "2024-06-27", wifi: 448, bluetooth: 490 },
  { date: "2024-06-28", wifi: 149, bluetooth: 200 },
  { date: "2024-06-29", wifi: 103, bluetooth: 160 },
  { date: "2024-06-30", wifi: 446, bluetooth: 400 },
];

const chartConfig = {
  views: {
    label: "Dispositivi",
  },
  wifi: {
    label: "Wifi",
    color: "hsl(var(--chart-1))",
  },
  bluetooth: {
    label: "Bluetooth",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChartInteractive({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("wifi");

  const total = React.useMemo(
    () => ({
      wifi: chartData.reduce((acc, curr) => acc + curr.wifi, 0),
      bluetooth: chartData.reduce((acc, curr) => acc + curr.bluetooth, 0),
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 p-4 ">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex">
          <div className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t p-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 ">
            <span className="text-xs text-muted-foreground">Presenza</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              75%
            </span>
          </div>
          {["wifi", "bluetooth"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t p-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 "
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="p-4 ">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
