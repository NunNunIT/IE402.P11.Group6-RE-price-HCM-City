import { ENUM_MARKER_SYMBOL } from "@/utils";
import dynamic from "next/dynamic";
import useSWR from "swr";
const GISMap = dynamic(() => import("@/components/gis-map"), { ssr: false });

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  const payload = await res.json();
  return payload.data;
}

export function CustomizeMap({ locate, polygon }: { locate: { lat: number, long: number }, polygon: [number, number][] }) {
  const { data } = useSWR(`/api/locations?sort=locate:${locate.lat},${locate.long}`, fetcher);

  return (
    <GISMap
      zoom={20}
      className="container"
      isShowDistrict
      center={locate}
      polygon={polygon}
      points={[
        ...(Array.isArray(data.rows)
          ? data.rows.slice(0, 24).map((location: any) => ({
            ...location.locate,
            title: location.title,
            type: location.category,
          }))
          : []
        ),
        {
          ...data.locate,
          title: data.title,
          type: ENUM_MARKER_SYMBOL.REAL_ESTATE,
        },
      ]}
    />
  )
}