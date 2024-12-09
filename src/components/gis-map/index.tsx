'use client'

import { Point, Polygon } from '@arcgis/core/geometry';
import { districts, places } from './assets';
import { useEffect, useRef, useState } from 'react';

import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Map from '@arcgis/core/Map';
import MapControls from './controls';
import MapView from '@arcgis/core/views/MapView';
import { cn } from '@/lib/utils';
import { loadCss } from './utils';

interface IMapProps {
  zoom?: number;
  center?: [number, number];
  className?: string;
}

const DEFAULT_PROPS = {
  zoom: 10,
  center: [106.69508635065, 10.851985339727143]
}

export default function MapComponent(props: IMapProps) {
  props = Object.assign(DEFAULT_PROPS, props);
  const mapRef = useRef<HTMLDivElement>(null)
  const view = useRef<MapView>(null)
  const [zoom, setZoom] = useState(props.zoom)

  useEffect(() => {
    loadCss()

    const map = new Map({ basemap: 'topo-vector' })

    view.current = new MapView({
      container: mapRef.current,
      map: map,
      center: props.center,
      zoom
    })

    // const districtLayer = new GraphicsLayer();
    // districts.forEach((district) => {
    //   const graphic = new Graphic({
    //     geometry: new Polygon({
    //       rings: [district.rings],
    //     }),
    //     symbol: district.symbol,
    //     // attributes: polylineAtt
    //   })
    //   districtLayer.add(graphic)
    // })
    // map.add(districtLayer);

    // const placeLayer = new GraphicsLayer();
    // places.forEach(async function (place) {
    //   place.forEach(async function (data) {
    //     // console.log("🚀 ~ data:", data)
    //     // const graphic = new Graphic({
    //     //   geometry: new Point({
    //     //     x: data.locationlat,
    //     //     y: data.locationlong,
    //     //   }),
    //     //   symbol: data.symbol,
    //     //   // attributes: data,
    //     // });
    //     // placeLayer.add(graphic);
    //   });
    // });
    // map.add(placeLayer);

    // const streetLayer = new GraphicsLayer();
    // streets.forEach((street) => {
    //   streetLayer.add(new Graphic(street))
    // })
    // map.add(streetLayer);

    view.current?.watch('zoom', (newZoom) => {
      setZoom(newZoom)
    })

    return () => { if (view) view.current?.destroy() }
  }, [])

  return (
    <div className='sticky top-[5.75rem] max-h-[calc(100dvh_-_6.5rem)]'>
      <div className={cn("relative h-full w-full", props.className)}>
        <div ref={mapRef} className="h-full w-full" />
        <MapControls view={view.current} zoom={zoom} />
      </div>
    </div>
  )
}
