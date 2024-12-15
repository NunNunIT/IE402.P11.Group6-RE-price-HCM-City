"use client";

import { useState } from "react";
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

type YearData = {
  [year: string]: {
    priceAVG: number;
    [month: string]: number; // Represents months as "01", "02", ..., "12"
  };
};

// Define year data in the new format
const yearData: YearData = {
  "2022": {
    priceAVG: 150,
    "01": 96,
    "02": 121,
    "03": 129,
    "04": 146,
    "05": 171,
    "06": 263,
    "07": 215,
    "08": 292,
    "09": 253,
    "10": 357,
    "11": 375,
    "12": 286,
  },
  "2023": {
    priceAVG: 220,
    "01": 225,
    "02": 185,
    "03": 219,
    "04": 274,
    "05": 241,
    "06": 288,
    "07": 224,
    "08": 290,
    "09": 262,
    "10": 258,
    "11": 290,
    "12": 255,
  },
  "2024": {
    priceAVG: 214,
    "01": 213,
    "02": 247,
    "03": 273,
    "04": 59,
    "05": 192,
    "06": 240,
    "07": 278,
    "08": 157,
    "09": 216,
    "10": 355,
    "11": 219,
    "12": 262,
  },
};

// Transform year data to fit the chart
const transformYearData = (data: Record<string, number>) => {
  return Object.entries(data)
    .filter(([key]) => key !== "priceAVG") // Exclude the `priceAVG` field
    .sort(([a], [b]) => parseInt(a) - parseInt(b)) // Sort months numerically
    .map(([month, price]) => ({
      month, // Keep the month as-is, e.g., "01", "02"
      price,
    }));
};

const chartConfig = {
  price: {
    label: "Giá",
    color: "hsl(var(--chart-1))", // Customize as needed
  },
  average: {
    label: "Trung Bình Năm",
    color: "hsl(var(--chart-2))", // Customize as needed
  },
} satisfies ChartConfig;

export function AreaChartComponent() {
  const [selectedYear, setSelectedYear] = useState<keyof YearData>("2024");

  // Transform the selected year's data for the chart
  const chartData = transformYearData(yearData[selectedYear]);
  const averagePrice = yearData[selectedYear].priceAVG;

  // Dynamically calculate Y-axis domain
  const yAxisDomain = [
    Math.floor(Math.min(...chartData.map((data) => data.price)) / 100) * 100, // Round down to nearest 100
    Math.ceil(Math.max(...chartData.map((data) => data.price)) / 100) * 100, // Round up to nearest 100
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Biểu Đồ Giá Cả</CardTitle>
        <CardDescription>
          Hiển thị giá trị theo từng tháng. Chọn năm để xem dữ liệu tương ứng.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-4">
          <label htmlFor="year-selector" className="font-medium w-auto mr-2">
            Chọn năm:
          </label>
          <select
            id="year-selector"
            className="rounded-md border-gray-300 shadow-sm focus:ring focus:ring-opacity-50 w-auto p-1"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {Object.keys(yearData).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
            width={1000} // Extended chart width
            height={400} // Keep height unchanged
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}`}
            />
            <YAxis domain={yAxisDomain} /> {/* Dynamic Y-axis */}
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
              Năm {selectedYear}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
