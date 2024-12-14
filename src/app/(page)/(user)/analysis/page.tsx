import { AreaChartComponent } from "@/components/charts/AreaChartComponent";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh]">
      <h1>Analysis</h1>
      <AreaChartComponent />
    </div>
  );
}
