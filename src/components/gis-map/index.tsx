'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { ENUM_MARKER_SYMBOL } from '@/utils';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Map from '@arcgis/core/Map';
import MapControls from './controls';
import MapView from '@arcgis/core/views/MapView';
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol";
import { Point, } from '@arcgis/core/geometry';
import PopupTemplate from "@arcgis/core/PopupTemplate";
import { cn } from '@/lib/utils';

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
}

const DEFAULT_PROPS = {
  zoom: 10,
  center: { lat: 10.851985339727143, long: 106.69508635065 }
}

export default function MapComponent(props: IMapProps) {
  const mergedProps = { ...DEFAULT_PROPS, ...props };
  const mapRef = useRef<HTMLDivElement>(null)
  const view = useRef<MapView | null>(null)
  const map = useRef<Map | null>(null)
  const [zoom, setZoom] = useState(mergedProps.zoom)

  useLayoutEffect(() => {
    loadCss()

    if (!mapRef.current) return;

    map.current = new Map({ basemap: 'topo-vector' })

    view.current = new MapView({
      container: mapRef.current,
      map: map.current,
      center: [mergedProps.center?.long, mergedProps.center?.lat],
      zoom: mergedProps.zoom
    })

    const zoomHandle = view.current.watch('zoom', (newZoom) => {
      setZoom(newZoom)
    });

    return () => {
      zoomHandle?.remove();
      view.current?.destroy()
    }
  }, [mergedProps.center?.lat, mergedProps.center?.long, mergedProps.zoom])

  useEffect(() => {
    const graphicsLayer = new GraphicsLayer();
    if (!map.current) return;
    map.current.add(graphicsLayer);

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

      graphicsLayer.add(pointGraphic);
    });
  }, [mergedProps.points]);

  return (
    <div className='sticky top-[5.75rem] max-h-[calc(100dvh_-_6.5rem)]'>
      <div className={cn("relative h-full w-full", mergedProps.className)}>
        <div ref={mapRef} className="h-full w-full" />
        {view.current && <MapControls view={view.current} zoom={zoom} />}
      </div>
    </div>
  )
}
