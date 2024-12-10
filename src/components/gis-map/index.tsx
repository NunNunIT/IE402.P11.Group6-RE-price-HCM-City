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

// TODO: don't trigger rerender when props change
export default function MapComponent(props: IMapProps) {
  const mergedProps = { ...DEFAULT_PROPS, ...props };
  const mapRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<MapView | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const graphicsLayerRef = useRef<GraphicsLayer | null>(null);
  const [zoom, setZoom] = useState(mergedProps.zoom)

  useLayoutEffect(() => {
    loadCss();
    if (!mapRef.current) return;
    mapInstanceRef.current = new Map({ basemap: 'topo-vector' });
    graphicsLayerRef.current = new GraphicsLayer();
    mapInstanceRef.current.add(graphicsLayerRef.current);
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
      graphicsLayerRef.current?.destroy();
      zoomHandle.remove();
    }
  }, [mergedProps.center?.lat, mergedProps.center?.long, mergedProps.zoom])

  useEffect(() => {
    if (!graphicsLayerRef.current) return;
    graphicsLayerRef.current.removeAll();
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
      console.log("🚀 ~ useEffect ~ point:", point)

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
      graphicsLayerRef.current?.add(pointGraphic);
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

  return (
    <div className='sticky top-[5.75rem] max-h-[calc(100dvh_-_6.5rem)]'>
      <div className={cn("relative h-full w-full", mergedProps.className)}>
        <div ref={mapRef} className="h-full w-full" />
        <MapControls view={viewRef.current} zoom={zoom} />
      </div>
    </div>
  )
}
