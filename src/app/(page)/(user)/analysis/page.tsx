import { AreaChartComponent } from "@/components/charts/AreaChartComponent";
import dynamic from "next/dynamic";
const GISMap = dynamic(() => import("@/components/gis-map"), { ssr: false });
// import { ENUM_MARKER_SYMBOL } from "@/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Biến động",
  description:
    "Trang phân tích dữ liệu bất động sản, cung cấp thông tin chi tiết về các xu hướng và số liệu thống kê.",
};

export default function Page() {
  return (
    <div className="grid md:grid-cols-[1.5fr_1fr] grid-cols-1 gap-3 justify-start min-h-[100dvh]">
      <AreaChartComponent />
      <div className="sticky top-0 h-screen">
        <GISMap
          zoom={20}
          className="container min-h-[calc(100dvh_-_7.75rem)] flex"
          isShowDistrict
          // center={data.locate}
          // points={[
          //   {
          //     ...data.locate,
          //     title: data.title,
          //     type: ENUM_MARKER_SYMBOL.REAL_ESTATE,
          //   },
          //   ...data.locations!
          //     .slice(0, 24)
          //     .map((location: any) => ({
          //       ...location.locate,
          //       title: data.title,
          //       type: data.category,
          //     }))
          // ]}
        />
      </div>
    </div>
  );
}
