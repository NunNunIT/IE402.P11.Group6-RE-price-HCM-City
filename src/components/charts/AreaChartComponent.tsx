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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import LocationSelect from "../VNLocationSelector";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { Button } from "../ui/button";
import { IoIosArrowDown } from "react-icons/io";
import useSWR from "swr";
import { parseObjectToSearchParams } from "@/utils";

// Data structure for yearly data
// type YearData = {
//   [year: string]: {
//     priceAVG: number;
//     [month: string]: number; // Represents months as "01", "02", ..., "12"
//   };
// };

type MonthData = {
  month: string;
  price: number;
};

// Yearly data
// const yearData: YearData = {
//   "2020": {
//     priceAVG: 150,
//     "01": 162,
//     "02": 138,
//     "03": 155,
//     "04": 120,
//     "05": 175,
//     "06": 134,
//     "07": 161,
//     "08": 140,
//     "09": 169,
//     "10": 147,
//     "11": 165,
//     "12": 153
//   },
//   "2021": {
//     priceAVG: 150,
//     "01": 145,
//     "02": 163,
//     "03": 133,
//     "04": 158,
//     "05": 172,
//     "06": 130,
//     "07": 162,
//     "08": 154,
//     "09": 138,
//     "10": 173,
//     "11": 141,
//     "12": 169
//   },
//   "2022": {
//     priceAVG: 150,
//     "01": 96,
//     "02": 121,
//     "03": 129,
//     "04": 146,
//     "05": 171,
//     "06": 263,
//     "07": 215,
//     "08": 292,
//     "09": 253,
//     "10": 357,
//     "11": 375,
//     "12": 286,
//   },
//   "2023": {
//     priceAVG: 220,
//     "01": 225,
//     "02": 185,
//     "03": 219,
//     "04": 274,
//     "05": 241,
//     "06": 288,
//     "07": 224,
//     "08": 290,
//     "09": 262,
//     "10": 258,
//     "11": 290,
//     "12": 255,
//   },
//   "2024": {
//     priceAVG: 214,
//     "01": 213,
//     "02": 247,
//     "03": 273,
//     "04": 59,
//     "05": 192,
//     "06": 240,
//     "07": 278,
//     "08": 157,
//     "09": 216,
//     "10": 355,
//     "11": 219,
//     "12": 262,
//   },
//   "2025": {
//     priceAVG: NaN
//   }
// };

function TableDemo({ data, year }: { data: any, year?: number }) {
  if (!data) {
    return (
      <div className="text-gray-500 text-center">
        Vui lòng chọn khu vực để hiển thị dữ liệu.
      </div>
    );
  }

  const rows = data.districts || data.wards || []; // Hiển thị `districts` hoặc `wards`

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-2/3 font-semibold">
            So sánh giá khu vực lân cận
          </TableHead>
          <TableHead className="font-semibold text-center">
            Giá bán phổ biến hiện tại
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((item: any, index: number) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell className="text-center">
              {item.analysis !== null ? `${item.analysis[year].priceAVG}` : "N/A"}{" "}
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

interface ILocation {
  province?: string;
  district?: string;
  ward?: string;
}

function Locate({ value, onChangeValue }: { value: ILocation, onChangeValue: (__data: ILocation) => void }) {
  const [delayValue, setDelayValue] = useState<ILocation>(value);
  const handleSubmit = () => {
    if (!delayValue?.province) {
      alert("Vui lòng chọn tỉnh/thành phố!");
      return;
    }

    // ! DON'T TORCH THIS
    onChangeValue({
      province: delayValue.province,
      district: delayValue.district,
      ward: delayValue.ward
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span className="flex flex-row gap-1 text-red-500 text-2xl font-bold items-center cursor-pointer">
          {[
            value?.ward ? `Phường ${value.ward}` : null,
            value?.district,
            value?.province || "Hồ Chí Minh",
          ]
            .filter(Boolean)
            .join(", ")
          }
          <IoIosArrowDown className="size-8 text-red-500 ml-2" />
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Chọn khu vực</DialogTitle>
        </DialogHeader>
        <LocationSelect value={delayValue} onChange={setDelayValue} depthLevel={3} />
        <DialogFooter className="items-end">
          <Button type="button" onClick={handleSubmit}>
            OK
          </Button>
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

function calculateMonthRate(
  chartData: MonthData[],
  lastChartData: MonthData[] | null,
  currentMonth: number
): string | null {
  const currentMonthStr = currentMonth.toString().padStart(2, "0");

  // Find the current month's data
  const currentData = chartData.find((item) => item.month === currentMonthStr);

  // Determine the previous month's string, handling the case for December (month 12)
  const previousMonthStr = (currentMonth - 1).toString().padStart(2, "0");
  let previousData: MonthData | null = null;

  // Check if the previous month is December and get the data accordingly
  if (previousMonthStr === "00") {
    if (lastChartData) {
      previousData = lastChartData.find((item) => item.month === "12");
    }
  } else {
    previousData = chartData.find((item) => item.month === previousMonthStr);
  }

  // Calculate the rate of increase/decrease
  if (currentData && previousData) {
    const cal =
      ((currentData.price - previousData.price) / previousData.price) * 100;
    return cal.toFixed(1); // Return the rate as a string with one decimal
  }

  // Return null if data is insufficient for calculation
  return null;
}

// Helper function to get the month numbers for a given quarter
function getQuarterMonths(quarter: number, currentMonth: number): number[] {
  const monthRanges = [
    [1, 2, 3], // Quarter 1
    [4, 5, 6], // Quarter 2
    [7, 8, 9], // Quarter 3
    [10, 11, 12], // Quarter 4
  ];

  const quarterMonths = monthRanges[quarter - 1] || [];

  // Filter out months greater than the current month
  return quarterMonths.filter((month) => month <= currentMonth);
}

// Helper function to calculate the average price for a set of months
function calculateAveragePrice(data: MonthData[]): number | null {
  if (data.length === 0) return null;
  const total = data.reduce((acc, item) => acc + item.price, 0);
  return total / data.length;
}

function calculateQuarterRate(
  chartData: MonthData[],
  lastChartData: MonthData[] | null,
  currentMonth: number
): string | null {
  // Determine the current quarter (1-4)
  const currentQuarter = Math.ceil(currentMonth / 3);

  // Get the range of months for the current and previous quarters
  const currentQuarterMonths = getQuarterMonths(currentQuarter, currentMonth);
  const previousQuarterMonths = getQuarterMonths(
    currentQuarter === 1 ? 4 : currentQuarter - 1,
    12
  );

  // Calculate the average price for the current quarter
  const currentQuarterData = chartData.filter((item) =>
    currentQuarterMonths.includes(parseInt(item.month))
  );
  let previousQuarterData = null;
  if (currentQuarter === 1) {
    if (lastChartData) {
      previousQuarterData = lastChartData.filter((item) =>
        previousQuarterMonths.includes(parseInt(item.month))
      );
    }
  } else {
    previousQuarterData = chartData.filter((item) =>
      previousQuarterMonths.includes(parseInt(item.month))
    );
  }

  const currentQuarterAvg = calculateAveragePrice(currentQuarterData);
  const previousQuarterAvg = calculateAveragePrice(previousQuarterData);

  // If both quarters have data, calculate the rate
  if (currentQuarterAvg !== null && previousQuarterAvg !== null) {
    const rate =
      ((currentQuarterAvg - previousQuarterAvg) / previousQuarterAvg) * 100;
    return rate.toFixed(1); // Return the rate with one decimal place
  }

  return null; // Return null if data is insufficient for calculation
}

function predictNextMonth(
  chartData: MonthData[],
  lastChartData: MonthData[] | null,
  currentMonth: number
): number | null {
  const currentMonthStr = currentMonth.toString().padStart(2, "0");
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const previous2Month =
    currentMonth <= 2 ? 12 + (currentMonth - 2) : currentMonth - 2;

  // Get the data for the current, previous, and two months ago
  const currentData = chartData.find((item) => item.month === currentMonthStr);
  const previousMonthStr = previousMonth.toString().padStart(2, "0");
  let prevData = null;
  if (previousMonth === 12) {
    prevData = lastChartData.find((item) => item.month === previousMonthStr);
  } else {
    prevData = chartData.find((item) => item.month === previousMonthStr);
  }

  const previous2MonthStr = previous2Month.toString().padStart(2, "0");
  let prev2Data = null;
  if (previous2Month >= 11) {
    prev2Data = lastChartData.find((item) => item.month === previous2MonthStr);
  } else {
    prev2Data = chartData.find((item) => item.month === previous2MonthStr);
  }

  // If we have data for all three months, we can calculate the prediction
  if (currentData && prevData && prev2Data) {
    // Calculate the month-to-month price changes
    const changeCurrentToPrev = currentData.price - prevData.price;
    const changePrevToTwoMonthsAgo = prevData.price - prev2Data.price;

    // Calculate the average change over the last two months
    const averageChange = (changeCurrentToPrev + changePrevToTwoMonthsAgo) / 2;

    // Predict the next month's price by adding the average change to the current month's price
    const predictedNextMonth = currentData.price + averageChange;

    return predictedNextMonth;
  }

  return null; // Return null if there's insufficient data
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  const payload = await res.json();
  return payload.data;
}

export function AreaChartComponent() {
  const [selectedYear, setSelectedYear] = useState((new Date()).getFullYear());
  const [location, setLocation] = useState<ILocation>({ province: "Hồ Chí Minh" });
  const { data, isLoading, error } = useSWR(`/api/analysis?${parseObjectToSearchParams(location)}`, fetcher);
  if (isLoading || error) return <div>Loading...</div>;

  // Transform the selected year's data for the chart
  const chartData = transformYearData(data.analysis[selectedYear]);
  const lastChartData = transformYearData(data.analysis[selectedYear - 1]);
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthKey = currentMonth.toString().padStart(2, "0");
  const avgPrice = data.analysis[selectedYear].priceAVG;
  const currentPrice = data.analysis[selectedYear][currentMonthKey];
  const monthRate = calculateMonthRate(chartData, lastChartData, currentMonth);
  const quarterRate = calculateQuarterRate(chartData, lastChartData, currentMonth);
  const predictData = predictNextMonth(chartData, lastChartData, currentMonth);

  // Dynamically calculate Y-axis domain
  const yAxisDomain = [
    Math.floor(Math.min(...chartData.map((data) => data.price)) / 100) * 100,
    Math.ceil(Math.max(...chartData.map((data) => data.price)) / 100) * 100,
  ];

  return (
    <div className="w-full bg-white dark:bg-black p-2">
      <h1 className="text-2xl font-bold">
        Lịch sử giá tại <Locate value={location} onChangeValue={setLocation} />
      </h1>

      <div className="flex items-end justify-end my-2">
        <div className="flex flex-row border-2 rounded-lg border-zinc-300 w-fit overflow-hidden">
          {[2024, 2023, 2022, 2021, 2020].map((year, index) => (
            <div
              key={index}
              onClick={() => setSelectedYear(year)}
              className={`border-r-2 border-zinc-300 p-2 cursor-pointer ${selectedYear === year
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
                  {avgPrice}
                  <span className="text-zinc-600 font-medium text-base">
                    tr/m<sup>2</sup>
                  </span>
                </div>
                <span className="text-zinc-600">Giá trung bình năm</span>
              </div>
              <div className="flex md:flex-col flex-row-reverse justify-between md:mt-0 mt-2">
                <div className="flex flex-row items-center justify-start gap-2 text-xl text-red-500 font-semibold">
                  {currentPrice}
                  <span className="text-zinc-600 font-medium text-base">
                    tr/m<sup>2</sup>
                  </span>
                </div>
                <span className="text-zinc-600 text-base">
                  Giá trị phổ biến tháng hiện tại
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:border-l-2 md:border-t-0 border-t-2 border-zinc-300 md:pl-3 py-3">
              <>
                {/* Check if monthRate is null */}
                {monthRate === null ? (
                  <span className="text-zinc-600 text-base">
                    Không có dữ liệu so sánh với tháng trước
                  </span>
                ) : // Conditional rendering based on whether rate is negative or positive
                  monthRate[0] === "-" ? (
                    <>
                      <span className="flex flex-row items-center justify-start gap-2 text-xl text-red-500 font-semibold">
                        <FaArrowCircleDown className="size-8 text-red-500" />
                        {monthRate}%
                      </span>
                      <span className="text-zinc-600 text-base">
                        Giá trị giảm {monthRate}% so với tháng trước
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex flex-row items-center justify-start gap-2 text-xl text-green-600 font-semibold">
                        <FaArrowCircleUp className="size-8 text-green-600" />
                        {monthRate}%
                      </span>
                      <span className="text-zinc-600 text-base">
                        Giá trị tăng {monthRate}% so với tháng trước
                      </span>
                    </>
                  )}
              </>
              <>
                {/* Check if quarterRate is null */}
                {quarterRate === null ? (
                  <span className="text-zinc-600 text-base">
                    Không có dữ liệu so sánh với quý trước
                  </span>
                ) : // Conditional rendering based on whether rate is negative or positive
                  quarterRate[0] === "-" ? (
                    <>
                      <span className="flex flex-row items-center justify-start gap-2 text-xl text-red-500 font-semibold">
                        <FaArrowCircleDown className="size-8 text-red-500" />
                        {quarterRate}%
                      </span>
                      <span className="text-zinc-600 text-base">
                        Giá trị giảm {quarterRate}% so với quý trước
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex flex-row items-center justify-start gap-2 text-xl text-green-600 font-semibold">
                        <FaArrowCircleUp className="size-8 text-green-600" />
                        {quarterRate}%
                      </span>
                      <span className="text-zinc-600 text-base">
                        Giá trị tăng {quarterRate}% so với quý trước
                      </span>
                    </>
                  )}
              </>
            </div>
            <div className="flex md:flex-col flex-row-reverse md:justify-center items-center justify-between gap-2 md:border-l-2 md:border-t-0 border-t-2 border-zinc-300 md:pl-3 py-3">
              {predictData === null ? (
                <span className="text-zinc-600 text-base">
                  Không có dữ liệu dự đoán
                </span>
              ) : (
                <>
                  <div className="flex flex-row items-center justify-start gap-2 md:text-2xl text-xl text-red-500 font-semibold">
                    {predictData}
                    <span className="text-zinc-600 font-medium text-base">
                      tr/m<sup>2</sup>
                    </span>
                  </div>
                  <span className="text-zinc-600 text-base">
                    Dự đoán giá trị tháng sau
                  </span>
                </>
              )}
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
                y={data?.analysis[selectedYear].priceAVG}
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
        <TableDemo data={data} year={selectedYear} />
      </div>
    </div>
  );
}
