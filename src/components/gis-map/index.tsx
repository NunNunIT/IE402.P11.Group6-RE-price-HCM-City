"use client";

import { setAssetPath as setCalciteComponentsAssetPath } from '@esri/calcite-components/dist/components';

setCalciteComponentsAssetPath("https://js.arcgis.com/calcite-components/2.13.2/assets");

import "@arcgis/map-components/dist/components/arcgis-map";
import "@arcgis/map-components/dist/components/arcgis-legend";
import "@arcgis/map-components/dist/components/arcgis-zoom";
// import "@arcgis/map-components/dist/components/arcgis-search";
import {
  ArcgisLegend,
  ArcgisMap,
  ArcgisZoom
} from "@arcgis/map-components-react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import "./style.css";

interface IMapProps {
  className?: string;
  zoom?: number;
  center?: number[];
}

export default function Map(props: IMapProps) {
  const {
    className,
    zoom = 10,
    center = [106.69508635065, 10.851985339727143]
  } = props;

  const mapDiv = useRef(null);

  useEffect(() => {
  }, [])

  return (
    <div className={cn("relative max-sm:max-w-[100vw] max-w-[80vw] h-[75dvh] overflow-hidden", className)}>
      <ArcgisMap
        className='h-full w-full'
        ref={mapDiv}
        onArcgisViewReadyChange={(event: CustomEvent) => {
          console.log("MapView ready", event);
        }}
        zoom={zoom}
        center={center}
      >
        <ArcgisZoom className="absolute top-4 left-4" position="top-left" />
        <ArcgisLegend className="absolute bottom-0 left-0 right-0" position="bottom-left" />
      </ArcgisMap>
    </div>
  );
}
