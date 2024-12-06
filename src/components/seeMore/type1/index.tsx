"use client";

import { LocationCard, NewsCard, RealEstateCard } from "@/components/card";

import { Button } from "@/components/ui/button";

export default function SeeMore({
  typeCard,
  seeMoreLink,
  title,
}: {
  typeCard?: string;
  fetchLink?: string;
  seeMoreLink?: string;
  title?: string;
}) {
  // Mock data for rendering cards, replace with your fetched data
  const mockData = [1, 2, 3, 4, 5, 6, 7, 8];

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
      {mockData.map((item, index) => (
        <LocationCard key={index} />
      ))}
    </>
  );

  const RenderRealEstate = () => (
    <>
      {mockData.map((item, index) => (
        <RealEstateCard key={index} />
      ))}
    </>
  );

  const RenderNews = () => (
    <>
      {mockData.map((item, index) => (
        <NewsCard key={index} />
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
      <Button href={seeMoreLink ?? "#"}>Xem thêm</Button>
    </div>
  );
}
