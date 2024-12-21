"use client";

import dynamic from "next/dynamic";
import { useMapController } from "../../search-result/components";
const GISMap = dynamic(() => import("@/components/gis-map"), { ssr: false });

export function CustomizeMap() {
  const { centerController, zoomController } = useMapController();
  return (
    <div className="sticky top-0 h-screen">
      <GISMap
        className="container min-h-[calc(100dvh_-_7.75rem)] flex"
        isShowDistrict
        {...(centerController ? { center: centerController } : {})}
        {...(zoomController ? { zoom: zoomController } : {})}
      />
    </div>
  )
}