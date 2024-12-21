"use client";

import { Button, buttonVariants } from "../ui/button";
import { Point, Polygon } from "@arcgis/core/geometry";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { ENUM_MAP_MODE, ENUM_MARKER_SYMBOL } from "@/utils";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import { cn } from "@/lib/utils";
import { districts } from "./assets";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";

// Ensure CSS is loaded
function loadCss() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://js.arcgis.com/4.29/esri/themes/light/main.css";
  document.head.appendChild(link);
}

interface IMapProps {
  mode?: ENUM_MAP_MODE;
  zoom?: number;
  center?: { lat: number; long: number };
  className?: string;
  points?: {
    lat: number;
    long: number;
    type?: ENUM_MARKER_SYMBOL;
    title: string;
    description: string;
  }[];
  isShowDistrict?: boolean;
  value?: [number, number];
  onChange?: (__value: [number, number]) => void;
  polygon?: [number, number][];
  onPolygonComplete?: (__polygon: [number, number][]) => void;
}

const DEFAULT_PROPS = {
  mode: ENUM_MAP_MODE.View,
  zoom: 10,
  center: { lat: 10.851985339727143, long: 106.69508635065 },
  isShowDistrict: false,
};

const editMarkerSymbol = new PictureMarkerSymbol({
  url: `/symbols/${ENUM_MARKER_SYMBOL.REAL_ESTATE}.png`,
  width: "48px",
  height: "48px",
});

export default function MapComponent(props: IMapProps) {
  const mergedProps = Object.assign({}, DEFAULT_PROPS, props);
  const mapRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<MapView | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [isAreaVisible, setIsAreaVisible] = useState(
    mergedProps.isShowDistrict
  );
  const districtGraphicsLayerRef = useRef<GraphicsLayer | null>(null);
  const pointGraphicsLayerRef = useRef<GraphicsLayer | null>(null);
  const editGraphicRef = useRef<GraphicsLayer | null>(null);
  const sketchViewModelRef = useRef<SketchViewModel | null>(null);
  const sketchLayerRef = useRef<GraphicsLayer | null>(null);
  const polygonLayerRef = useRef<GraphicsLayer | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);

  const [zoom, setZoom] = useState(mergedProps.zoom);

  useLayoutEffect(() => {
    loadCss();
    if (!mapRef.current) return;
    mapInstanceRef.current = new Map({
      basemap: "topo-vector",
    });

    districtGraphicsLayerRef.current = new GraphicsLayer();
    polygonLayerRef.current = new GraphicsLayer();
    sketchLayerRef.current = new GraphicsLayer();
    pointGraphicsLayerRef.current = new GraphicsLayer();

    mapInstanceRef.current.add(districtGraphicsLayerRef.current);
    mapInstanceRef.current.add(polygonLayerRef.current);
    mapInstanceRef.current.add(sketchLayerRef.current);
    mapInstanceRef.current.add(pointGraphicsLayerRef.current);

    if (mergedProps.mode === ENUM_MAP_MODE.Edit) {
      editGraphicRef.current = new GraphicsLayer();
      mapInstanceRef.current.add(editGraphicRef.current);
    }

    viewRef.current = new MapView({
      container: mapRef.current,
      map: mapInstanceRef.current,
      center: [mergedProps.center?.long, mergedProps.center?.lat],
      zoom: mergedProps.zoom,
      ui: {
        components: ["zoom", "compass"],
      },
    });

    if (viewRef.current) {
      sketchViewModelRef.current = new SketchViewModel({
        view: viewRef.current,
        layer: sketchLayerRef.current,
        polygonSymbol: {
          type: "simple-fill",
          color: "rgba(0, 255, 0, 0.2)",
          style: "solid",
          outline: {
            color: "green",
            width: 2,
          },
        },
      });

      sketchViewModelRef.current.on("create", (event) => {
        if (event.state === "complete") {
          const geometry = event.graphic.geometry as Polygon;
          const polygonCoords = geometry.rings[0].map(
            (point) => [point[0], point[1]] as [number, number]
          );

          // Callback to parent component with polygon coordinates
          mergedProps.onPolygonComplete?.(polygonCoords);

          // Reset drawing mode
          setIsDrawingMode(false);
        }
      });
    }

    const zoomHandle = viewRef.current.watch("zoom", (newZoom) => {
      setZoom(newZoom);
    });

    return () => {
      viewRef.current?.destroy();
      mapInstanceRef.current?.destroy();
      pointGraphicsLayerRef.current?.destroy();
      zoomHandle.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDrawingMode = useCallback(() => {
    if (!sketchViewModelRef.current) return;

    setIsDrawingMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        // Start polygon drawing
        sketchViewModelRef.current?.create("polygon");
      } else {
        // Cancel current sketch
        sketchViewModelRef.current?.cancel();
      }
      return newMode;
    });
  }, []);

  useEffect(() => {
    if (!viewRef.current) return;
    const handleCenterChange = () => {
      const center = viewRef.current?.center;
      if (
        !center ||
        (mergedProps.mode !== ENUM_MAP_MODE.Edit && !editGraphicRef.current)
      )
        return;
      mergedProps.onChange?.([center.latitude, center.longitude]);
      editGraphicRef.current?.removeAll();
      const centerPoint = new Point({
        longitude: center.longitude,
        latitude: center.latitude,
      });
      const editPointGraphic = new Graphic({
        geometry: centerPoint,
        symbol: editMarkerSymbol,
        attributes: {
          title: "Edit Point",
          description: "This is the center point for editing.",
        },
        popupTemplate: new PopupTemplate({
          title: "{title}",
          content: "{description}",
        }),
      });
      editGraphicRef.current.add(editPointGraphic);
    };
    const centerHandle = viewRef.current.watch("center", handleCenterChange);
    return () => {
      centerHandle.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      !mergedProps.isShowDistrict ||
      !viewRef.current ||
      !districtGraphicsLayerRef.current
    )
      return;
    districtGraphicsLayerRef.current?.removeAll();
    districts.forEach((district) => {
      const polygon = new Polygon({
        rings: [district.rings],
      });
      const graphic = new Graphic({
        geometry: polygon,
        symbol: district.symbol,
        attributes: {
          name: district.name,
        },
        popupTemplate: {
          title: "{name}",
          content: "This is {name}",
        },
      });
      districtGraphicsLayerRef.current?.add(graphic);
    });
  }, [mergedProps.isShowDistrict]);

  useEffect(() => {
    if (!pointGraphicsLayerRef.current) return;
    pointGraphicsLayerRef.current.removeAll();
    mergedProps.points?.forEach((point) => {
      const graphicPoint = new Point({
        longitude: point.long,
        latitude: point.lat,
      });

      const pictureMarkerSymbol = new PictureMarkerSymbol({
        url: `/symbols/${point.type ?? ENUM_MARKER_SYMBOL.DEFAULT}.png`,
        width: "32px",
        height: "32px",
      });

      const pointGraphic = new Graphic({
        geometry: graphicPoint,
        symbol: pictureMarkerSymbol,
        attributes: {
          title: point.title,
          description: point.description,
        },
        popupTemplate: new PopupTemplate({
          title: "{title}",
          content: "{description}",
        }),
      });
      pointGraphicsLayerRef.current?.add(pointGraphic);
    });
  }, [mergedProps.points]);

  useEffect(() => {
    if (!viewRef.current) return;
    if (viewRef.current.ready) {
      viewRef.current
        .goTo(
          {
            center: [mergedProps.center?.long, mergedProps.center?.lat],
            zoom: mergedProps.zoom,
          },
          {
            duration: 1000,
            easing: "ease-in-out",
          }
        )
        .catch((error) => {
          console.error("Error in goTo:", error);
        });
    } else {
      viewRef.current.when(() => {
        viewRef.current
          ?.goTo(
            {
              center: [mergedProps.center?.long, mergedProps.center?.lat],
              zoom: mergedProps.zoom,
            },
            {
              duration: 1000,
              easing: "ease-in-out",
            }
          )
          .catch((error) => {
            console.error("Error in goTo:", error);
          });
      });
    }
  }, [mergedProps.center, mergedProps.zoom]);

  useEffect(() => {
    if (!polygonLayerRef.current) return;
    polygonLayerRef.current.removeAll();
    if (mergedProps.polygon?.length < 3) return;
    const polygon = new Polygon({
      rings: [mergedProps.polygon],
    });
    const simpleFillSymbol = {
      type: "simple-fill", // autocast as new SimpleFillSymbol()
      color: [0, 0, 255, 0.6], // Blue transparent fill
      style: "solid",
      outline: {
        color: [255, 255, 255], // Blue outline
        width: 2,
      },
    };
    const graphic = new Graphic({
      geometry: polygon,
      symbol: simpleFillSymbol,
    });
    polygonLayerRef.current?.add(graphic);
  }, [mergedProps.polygon]);

  useEffect(() => {
    if (!districtGraphicsLayerRef.current) return;
    districtGraphicsLayerRef.current.visible = isAreaVisible;
  }, [isAreaVisible]);

  const toggleArea = useCallback(() => {
    setIsAreaVisible((prev) => !prev);
    // Implement toggle area visibility logic here
  }, []);

  return (
    <div className="sticky top-[7.25rem] max-h-[calc(100dvh_-_7.25rem)] w-full">
      <div className={cn("relative h-full w-full", mergedProps.className)}>
        <div ref={mapRef} className={cn("h-full min-h-[30rem] w-full", mergedProps.className)} />
        <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
          {mergedProps.isShowDistrict && (
            <Button type="button" variant="outline" onClick={toggleArea}>
              {isAreaVisible ? "Ẩn vùng" : "👁️ Hiện vùng"}
            </Button>
          )}

          {mergedProps.mode === ENUM_MAP_MODE.Edit && (
            <Button
              type="button"
              variant={isDrawingMode ? "destructive" : "outline"}
              onClick={toggleDrawingMode}
            >
              {isDrawingMode ? "Hủy vẽ" : "✏️ Vẽ Polygon"}
            </Button>
          )}

          <span className={buttonVariants({ variant: "outline" })}>
            Độ zoom: {zoom.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
