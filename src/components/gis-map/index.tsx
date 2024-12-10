'use client'

import { Button, buttonVariants } from '../ui/button';
import { Point, Polygon, } from '@arcgis/core/geometry';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { ENUM_MARKER_SYMBOL } from '@/utils';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import PopupTemplate from "@arcgis/core/PopupTemplate";
import { cn } from '@/lib/utils';
import { districts } from './assets';

// Ensure CSS is loaded
function loadCss() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://js.arcgis.com/4.29/esri/themes/light/main.css';
  document.head.appendChild(link);
}

interface IMapProps {
  zoom?: number;
  center?: { lat: number, long: number };
  className?: string;
  points?: { lat: number, long: number, type?: ENUM_MARKER_SYMBOL, title: string, description: string }[];
  isShowDistrict?: boolean;
}

const DEFAULT_PROPS = {
  zoom: 10,
  center: { lat: 10.851985339727143, long: 106.69508635065 },
  isShowDistrict: false
}

// TODO: don't trigger rerender when props change
export default function MapComponent(props: IMapProps) {
  const mergedProps = { ...DEFAULT_PROPS, ...props };
  const mapRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<MapView | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [isAreaVisible, setIsAreaVisible] = useState(mergedProps.isShowDistrict);
  const districtGraphicsLayerRef = useRef<GraphicsLayer | null>(null);
  const pointGraphicsLayerRef = useRef<GraphicsLayer | null>(null);
  const [zoom, setZoom] = useState(mergedProps.zoom)

  useLayoutEffect(() => {
    loadCss();
    if (!mapRef.current) return;
    mapInstanceRef.current = new Map({ basemap: 'topo-vector' });
    pointGraphicsLayerRef.current = new GraphicsLayer();
    districtGraphicsLayerRef.current = new GraphicsLayer();
    mapInstanceRef.current.add(pointGraphicsLayerRef.current);
    mapInstanceRef.current.add(districtGraphicsLayerRef.current);
    viewRef.current = new MapView({
      container: mapRef.current,
      map: mapInstanceRef.current,
      center: [mergedProps.center?.long, mergedProps.center?.lat],
      zoom: mergedProps.zoom
    })
    const zoomHandle = viewRef.current.watch('zoom', (newZoom) => {
      setZoom(newZoom)
    });
    return () => {
      viewRef.current?.destroy();
      mapInstanceRef.current?.destroy();
      pointGraphicsLayerRef.current?.destroy();
      zoomHandle.remove();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mergedProps.isShowDistrict || !viewRef.current || !districtGraphicsLayerRef.current) return;
    districtGraphicsLayerRef.current?.removeAll();
    districts.forEach(district => {
      const polygon = new Polygon({
        rings: [district.rings]
      });
      const graphic = new Graphic({
        geometry: polygon,
        symbol: district.symbol,
        attributes: {
          name: district.name
        },
        popupTemplate: {
          title: "{name}",
          content: "This is {name}"
        }
      });
      districtGraphicsLayerRef.current?.add(graphic);
    })
  }, [mergedProps.isShowDistrict]);

  useEffect(() => {
    if (!pointGraphicsLayerRef.current) return;
    pointGraphicsLayerRef.current.removeAll();
    mergedProps.points?.forEach(point => {
      const graphicPoint = new Point({
        longitude: point.long,
        latitude: point.lat
      });

      const pictureMarkerSymbol = new PictureMarkerSymbol({
        url: `/symbols/${point.type ?? ENUM_MARKER_SYMBOL.DEFAULT}.png`,
        width: "32px",
        height: "32px"
      });

      const pointGraphic = new Graphic({
        geometry: graphicPoint,
        symbol: pictureMarkerSymbol,
        attributes: {
          title: point.title,
          description: point.description
        },
        popupTemplate: new PopupTemplate({
          title: "{title}",
          content: "{description}"
        })
      });
      pointGraphicsLayerRef.current?.add(pointGraphic);
    });
  }, [mergedProps.points]);

  useEffect(() => {
    if (!viewRef.current) return;
    if (viewRef.current.ready) {
      viewRef.current.goTo({
        center: [mergedProps.center?.long, mergedProps.center?.lat],
        zoom: mergedProps.zoom
      }, {
        duration: 1000,
        easing: "ease-in-out"
      }).catch((error) => {
        console.error('Error in goTo:', error);
      });
    } else {
      viewRef.current.when(() => {
        viewRef.current?.goTo({
          center: [mergedProps.center?.long, mergedProps.center?.lat],
          zoom: mergedProps.zoom
        }, {
          duration: 1000,
          easing: "ease-in-out"
        }).catch((error) => {
          console.error('Error in goTo:', error);
        });
      });
    }
  }, [mergedProps.center, mergedProps.zoom]);

  useEffect(() => {
    if (!districtGraphicsLayerRef.current) return;
    districtGraphicsLayerRef.current.visible = isAreaVisible;
  }, [isAreaVisible]);

  const toggleArea = useCallback(() => {
    setIsAreaVisible(prev => !prev);
    // Implement toggle area visibility logic here
  }, []);

  return (
    <div className='sticky top-[5.75rem] max-h-[calc(100dvh_-_6.5rem)]'>
      <div className={cn("relative h-full w-full", mergedProps.className)}>
        <div ref={mapRef} className="h-full w-full" />
        <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
          {/* <input
            className="px-2 py-1 border rounded"
            placeholder="Tìm một tọa độ"
            onKeyDown={handleFindLocation}
          />
          <Button variant="outline" onClick={togglePoints}>
            {isPointsVisible ? "Ẩn địa điểm" : "👁️ Hiển địa điểm"}
          </Button> */}
          <Button variant="outline" onClick={toggleArea}>
            {isAreaVisible ? "Ẩn vùng" : "👁️ Hiện vùng"}
          </Button>
          {/* <Button variant="outline" onClick={toggleDrawing}>
            {isDrawing ? "✍️ Đang vẽ" : "✏️ Vẽ"}
          </Button> */}
          <span className={buttonVariants({ variant: 'outline' })}>
            Độ zoom: {zoom.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
