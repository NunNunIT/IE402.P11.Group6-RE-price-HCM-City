import { AreaChartComponent } from "@/components/charts/AreaChartComponent";
import dynamic from "next/dynamic";
const GISMap = dynamic(() => import("@/components/gis-map"), { ssr: false });
import { ENUM_MARKER_SYMBOL } from "@/utils";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"; // Import Breadcrumb components
import { Slash } from "lucide-react";

export default function Page() {
  return (
    <div>
      <div className="w-full p-2 mb-4 mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <a href="/">Trang chủ</a>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <a href="/analysis">Biến động</a>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid md:grid-cols-[1.5fr_1fr] grid-cols-1 gap-3 justify-start min-h-[100dvh]">
        <AreaChartComponent />
        <div className="sticky top-0 h-screen">
          <GISMap
            zoom={20}
            className="container h-full"
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
    </div>
  );
}
