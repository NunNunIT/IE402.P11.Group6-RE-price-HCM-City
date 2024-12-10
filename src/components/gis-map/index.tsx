'use client'

import { Point, Polygon } from '@arcgis/core/geometry';
import { useEffect, useRef, useState } from 'react';

import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Map from '@arcgis/core/Map';
import MapControls from './controls';
import MapView from '@arcgis/core/views/MapView';
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
  points?: { lat: number, long: number }[];
}

const DEFAULT_PROPS = {
  zoom: 10,
  center: { lat: 10.851985339727143, long: 106.69508635065 }
}

export default function MapComponent(props: IMapProps) {
  const mergedProps = { ...DEFAULT_PROPS, ...props };
  const mapRef = useRef<HTMLDivElement>(null)
  const view = useRef<MapView | null>(null)
  const [zoom, setZoom] = useState(mergedProps.zoom)

  useEffect(() => {
    loadCss()

    if (!mapRef.current) return;

    const map = new Map({ basemap: 'topo-vector' })

    view.current = new MapView({
      container: mapRef.current,
      map: map,
      center: [mergedProps.center.long, mergedProps.center.lat],
      zoom: mergedProps.zoom
    })

    const zoomHandle = view.current.watch('zoom', (newZoom) => {
      setZoom(newZoom)
    });

    return () => {
      zoomHandle?.remove();
      view.current?.destroy()
    }
  }, [mergedProps.center, mergedProps.zoom])

  return (
    <div className='sticky top-[5.75rem] max-h-[calc(100dvh_-_6.5rem)]'>
      <div className={cn("relative h-full w-full", mergedProps.className)}>
        <div ref={mapRef} className="h-full w-full" />
        {view.current && <MapControls view={view.current} zoom={zoom} />}
      </div>
    </div>
  )
}