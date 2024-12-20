"use client";

import dynamic from "next/dynamic";
import { useCallback } from "react";
import useSWR from "swr";

const RealEstateCard = dynamic(() => import("@/components/card/realestate"));
const LocationCard = dynamic(() => import("@/components/card/location"));

const getKey = (typeCard: "realEstate" | "location") => {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me/fav${typeCard.charAt(0).toUpperCase()}${typeCard.slice(1)}`
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  const payload = await res.json();
  return payload.data;
}

export default function Wrapper({ typeCard }: { typeCard: "realEstate" | "location" }) {
  const { data, isLoading, error } = useSWR(getKey(typeCard), fetcher)

  const renderCards = useCallback(() => {
    if (typeCard === "realEstate") {
      return data?.map((item: any, index: number) => (
        <RealEstateCard
          key={index}
          data={{
            _id: item._id,
            title: item.title,
            imageUrl: item.imageUrls?.[0],
            locate: item.locate,
            price: item.price,
            area: item.area,
          }}
        />
      ));
    } else if (typeCard === "location") {
      return data?.map((item: any, index: number) => (
        <LocationCard
          key={index}
          data={{
            _id: item._id,
            imageUrl: item.imageUrls?.[0],
            title: item.title,
            locate: item.locate,
            category: item.category,
            avgStarGGMap: item.avgStarGGMap,
          }}
        />
      ));
    }
    return null;
  }, [data, typeCard]);

  return (
    <div className="w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 md:p-0 p-2">
      {isLoading || error ? (
        <div className="col-span-full text-center">Đang tải...</div>
      ) : data.length > 0 ? (
        renderCards()
      ) : (
        <div className="col-span-full text-center">
          Không có mục nào trong danh sách.
        </div>
      )}
    </div>
  );
}
