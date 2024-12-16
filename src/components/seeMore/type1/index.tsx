"use client";

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import useSWR from "swr";

const RealEstateCard = dynamic(() => import("@/components/card/realestate"));
const NewsCard = dynamic(() => import("@/components/card/news"));
const LocationCard = dynamic(() => import("@/components/card/location"));

const fetcher = (url: string) => fetch(url).then((res) => res.json()).then((payload) => payload.data);

export default function SeeMore({
  typeCard,
  seeMoreLink,
  title,
  linkFetch,
}: {
  typeCard?: string;
  fetchLink?: string;
  seeMoreLink?: string;
  title?: string;
  linkFetch?: string;
}) {
  const { data, error, isLoading } = useSWR(linkFetch, fetcher);

  if (error) return <div>Error loading data: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log("Fetched Data:", data);

  const RenderCard = () => {
    switch (typeCard) {
      case "location":
        return RenderLocation();
      case "realEstate":
        return RenderRealEstate();
      case "news":
        return RenderNews();
      default:
        return <div>No matching card type found.</div>;
    }
  };

  const RenderLocation = () => (
    <>
      {data?.map((item: any, index: any) => (
        <LocationCard key={index} data={item} />
      ))}
    </>
  );

  const RenderRealEstate = () => (
    <>
      {data?.map((item: any, index: any) => (
        <RealEstateCard key={index} data={item} />
      ))}
    </>
  );

  const RenderNews = () => (
    <>
      {data?.map((item: any, index: any) => (
        <NewsCard key={index} data={item} />
      ))}
    </>
  );

  return (
    <div className="w-full flex flex-col gap-6 justify-center items-center">
      <div className="w-full border-b border-zinc-200 dark:border-zinc-800 py-2 mb-3 flex flex-row justify-between items-center">
        <h3 className="font-semibold text-2xl border-l-8 border-teal-500 pl-2 text-zinc-900 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
        {RenderCard()}
      </div>
      {seeMoreLink && <Button href={seeMoreLink ?? "#"}>Xem thêm</Button>}
    </div>
  );
}
