"use client";

import { TrendingUp } from "lucide-react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ReferenceLine,
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

const chartData = [
  { month: "January", price: 186 },
  { month: "February", price: 305 },
  { month: "March", price: 237 },
  { month: "April", price: 73 },
  { month: "May", price: 209 },
  { month: "June", price: 214 },
  { month: "July", price: 250 },
  { month: "August", price: 190 },
  { month: "September", price: 220 },
  { month: "October", price: 300 },
  { month: "November", price: 185 },
  { month: "December", price: 260 },
];

const averagePrice =
  chartData.reduce((sum, { price }) => sum + price, 0) / chartData.length;

const chartConfig = {
  price: {
    label: "Giá",
    color: "hsl(var(--chart-1))", // Add your desired color configuration here
  },
  average: {
    label: "Trung Bình Năm",
    color: "hsl(var(--chart-2))", // Add your desired color configuration here
  },
} satisfies ChartConfig;

export function AreaChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Biểu Đồ Giá Cả - Năm 2024</CardTitle>
        <CardDescription>
          Hiển thị giá trị theo từng tháng trong năm 2024.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            width={600}
            height={300}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <Legend verticalAlign="top" height={36} />
            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={chartConfig.price.color}
              strokeWidth={2}
              dot={{ stroke: chartConfig.price.color, strokeWidth: 2 }}
              name={chartConfig.price.label}
            />
            <ReferenceLine
              y={averagePrice}
              stroke={chartConfig.average.color}
              strokeDasharray="3 3"
              label={{
                position: "top",
                value: chartConfig.average.label,
                fill: chartConfig.average.color,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Giá trị tăng 5.2% so với tháng trước{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Năm 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
