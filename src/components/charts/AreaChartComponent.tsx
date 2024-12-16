"use client";

import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import LocationSelect from "../VNLocationSelector";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { Button } from "../ui/button";
import { IoIosArrowDown } from "react-icons/io";

// Data structure for yearly data
type YearData = {
  [year: string]: {
    priceAVG: number;
    [month: string]: number; // Represents months as "01", "02", ..., "12"
  };
};

// Yearly data
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

const invoices = [
  {
    invoice: "INV001",
    totalAmount: "$250.00",
  },
  {
    invoice: "INV002",
    totalAmount: "$150.00",
  },
  {
    invoice: "INV003",
    totalAmount: "$350.00",
  },
];

function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-2/3 font-semibold">
            So sánh giá khu vực lân cận
          </TableHead>
          <TableHead className="font-semibold">Giá bán phổ biến nhất</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell className="text-right flex flex-row flex-nowrap gap-1">
              {invoice.totalAmount}
              <span className="text-zinc-600 font-medium">
                tr/m<sup>2</sup>
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function Locate() {
  const [value, onChangeValue] = useState(undefined)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex flex-row gap-1 text-red-500 text-2xl font-bold">
          TP Hồ Chí Minh
          <IoIosArrowDown className="size-8 text-red-500" />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Chọn khu vực</DialogTitle>
        </DialogHeader>
        <LocationSelect value={value} onChange={onChangeValue} depthLevel={3} />
        <DialogFooter className="items-end">
          <Button type="submit">OK</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Transform year data for the chart
const transformYearData = (data: Record<string, number> | undefined | null) => {
  if (!data) {
    return []; // Trả về mảng rỗng nếu không có dữ liệu
  }
  return Object.entries(data)
    .filter(([key]) => key !== "priceAVG") // Loại bỏ `priceAVG`
    .sort(([a], [b]) => parseInt(a) - parseInt(b)) // Sắp xếp các tháng theo số
    .map(([month, price]) => ({ month, price }));
};

const chartConfig = {
  price: {
    label: "Giá",
    color: "hsl(var(--chart-1))",
  },
  average: {
    label: "Trung Bình Năm",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AreaChartComponent() {
  const [selectedYear, setSelectedYear] = useState(2024);

  // Transform the selected year's data for the chart
  const chartData = transformYearData(yearData[selectedYear]);

  // Dynamically calculate Y-axis domain
  const yAxisDomain = [
    Math.floor(Math.min(...chartData.map((data) => data.price)) / 100) * 100,
    Math.ceil(Math.max(...chartData.map((data) => data.price)) / 100) * 100,
  ];

  return (
    <div className="w-full bg-white dark:bg-black p-2">
      <h1 className="text-2xl font-bold">
        Lịch sử giá tại <Locate />
      </h1>

      <div className="flex items-end justify-end my-2">
        <div className="flex flex-row border-2 rounded-lg border-zinc-300 w-fit overflow-hidden">
          {[2024, 2023, 2022, 2021, 2020].map((year, index) => (
            <div
              key={index}
              onClick={() => setSelectedYear(year)}
              className={`border-r-2 border-zinc-300 p-2 cursor-pointer ${
                selectedYear === year
                  ? "bg-red-500/30 text-red-500 font-semibold"
                  : ""
              }`}
            >
              <span className="text-sm">{year}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 my-6">
        {chartData.length !== 0 && (
          <div className="grid md:grid-cols-[1fr_1.5fr_1fr] grid-col-1 gap-3 border-2 border-zinc-300 rounded-md md:p-6 p-3">
            <div className="flex flex-col gap-2 py-3">
              <div className="flex md:flex-col flex-row-reverse justify-between">
                <div className="flex flex-row items-center justify-start gap-2 text-xl text-red-500 font-semibold">
                  {yearData[selectedYear]?.priceAVG}
                  <span className="text-zinc-600 font-medium text-base">
                    tr/m<sup>2</sup>
                  </span>
                </div>
                <span className="text-zinc-600">Giá trung bình năm</span>
              </div>
              <div className="flex md:flex-col flex-row-reverse justify-between md:mt-0 mt-2">
                <div className="flex flex-row items-center justify-start gap-2 text-xl text-red-500 font-semibold">
                  {yearData[selectedYear]?.["12"]}
                  <span className="text-zinc-600 font-medium text-base">
                    tr/m<sup>2</sup>
                  </span>
                </div>
                <span className="text-zinc-600 text-base">
                  Giá trị phổ biến hiện tại
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:border-l-2 md:border-t-0 border-t-2 border-zinc-300 md:pl-3 py-3">
              <div className="flex md:flex-col flex-row-reverse justify-between">
                <span className="flex flex-row items-center justify-start gap-2 text-xl text-green-600 font-semibold">
                  <FaArrowCircleUp className="size-8 text-green-600" />
                  5.2%
                </span>
                <span className="text-zinc-600 text-base">
                  Giá trị tăng 5.2% so với tháng trước
                </span>
              </div>
              <div className="flex md:flex-col flex-row-reverse justify-between md:mt-0 mt-2">
                <span className="flex flex-row items-center justify-start gap-2 text-xl text-red-500 font-semibold">
                  <FaArrowCircleDown className="size-8 text-red-500" />
                  5.2%
                </span>
                <span className="text-zinc-600 text-base">
                  Giá trị tăng 5.2% so với quý trước
                </span>
              </div>
            </div>
            <div className="flex md:flex-col flex-row-reverse md:justify-center items-center justify-between gap-2 md:border-l-2 md:border-t-0 border-t-2 border-zinc-300 md:pl-3 py-3">
              <div className="flex flex-row items-center justify-start gap-2 md:text-2xl text-xl text-red-500 font-semibold">
                {yearData[selectedYear]?.["12"]}
                <span className="text-zinc-600 font-medium text-base">
                  tr/m<sup>2</sup>
                </span>
              </div>
              <span className="text-zinc-600 text-base">
                Dự đoán giá trị tháng sau
              </span>
            </div>
          </div>
        )}

        <ChartContainer config={chartConfig}>
          {chartData.length === 0 ? (
            <div className="text-center text-gray-500 text-xl">
              Không có dữ liệu
            </div>
          ) : (
            <LineChart
              data={chartData}
              margin={{
                left: 0,
                right: 0,
              }}
              width={1000} // Extended chart width
              height={400} // Keep height unchanged
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                // tickMargin={8}
                tickFormatter={(value) => `${value}`}
              />
              <YAxis domain={yAxisDomain} /> {/* Dynamic Y-axis */}
              <Legend verticalAlign="top" height={36} />
              <ChartTooltip
                cursor={{ strokeDasharray: "3 3" }}
                content={<ChartTooltipContent indicator="line" />}
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
                y={yearData[selectedYear].priceAVG}
                stroke={chartConfig.average.color}
                strokeDasharray="3 3"
                label={{
                  position: "top",
                  value: chartConfig.average.label,
                  fill: chartConfig.average.color,
                }}
              />
            </LineChart>
          )}
        </ChartContainer>
        <TableDemo />
      </div>
    </div>
  );
}
