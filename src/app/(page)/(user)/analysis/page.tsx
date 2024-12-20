import { AreaChartComponent } from "@/components/charts/AreaChartComponent";
import type { Metadata } from "next";
import { MapControllerProvider } from "../search-result/components";
import { CustomizeMap } from "./components";

export const metadata: Metadata = {
  title: "Biến động",
  description:
    "Trang phân tích dữ liệu bất động sản, cung cấp thông tin chi tiết về các xu hướng và số liệu thống kê.",
};

export default function Page() {
  return (
    <MapControllerProvider>
      <div className="grid md:grid-cols-[1.5fr_1fr] grid-cols-1 gap-3 justify-start min-h-[100dvh]">
        <AreaChartComponent />
        <CustomizeMap />
      </div>
    </MapControllerProvider>
  );
}
