"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SavedCard } from "@/components/card";
import { MockData } from "@/types/item";

export default function SavedCards({
  typeCard,
  data,
  savedCardLink,
}: {
  typeCard?: string;
  data?: MockData[];
  savedCardLink?: string;
}) {
  const mockDataAll: MockData[] = data ?? [
    {
      type: "realestate",
      value: {
        image: "/decorate/searchTab.jpg",
        title: "Real Estate Title",
        location: "New York",
        distance: "5km",
        price: "$500,000",
      },
    },
    {
      type: "location",
      value: {
        image: "/decorate/searchTab.jpg",
        title: "Workshop Location",
        location: "California",
        duration: "3 days",
        workshopType: "Technology",
        rating: 4.5,
      },
    },
    {
      type: "location",
      value: {
        image: "/decorate/searchTab.jpg",
        title: "Workshop Location 2",
        location: "Texas",
        duration: "2 days",
        workshopType: "Art",
        rating: 4.0,
      },
    },
    {
      type: "realestate",
      value: {
        image: "/decorate/searchTab.jpg",
        title: "Luxury Apartment",
        location: "California",
        distance: "2km",
        price: "$1,000,000",
      },
    },
    {
      type: "location",
      value: {
        image: "/decorate/searchTab.jpg",
        title: "Workshop Location 3",
        location: "Chicago",
        duration: "1 day",
        workshopType: "Health",
        rating: 5.0,
      },
    },
    {
      type: "realestate",
      value: {
        image: "/decorate/searchTab.jpg",
        title: "Modern House",
        location: "Florida",
        distance: "10km",
        price: "$350,000",
      },
    },
  ];

  const [itemData, setItemData] = useState<MockData[]>(mockDataAll);

  const removeItem = (index: number) => {
    setItemData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const RenderCard = () => {
    switch (typeCard) {
      case "location":
        return <RenderLocation />;
      case "realestate":
        return <RenderRealEstate />;
      case "all":
        return <RenderAll />;
      default:
        return <div>No matching card type found.</div>;
    }
  };

  const RenderAll = () => (
    <>
      {itemData.map((item, index) => (
        <SavedCard
          key={index}
          type={item.type}
          value={item.value}
          removeFunction={() => removeItem(index)}
        />
      ))}
    </>
  );

  const RenderLocation = () => (
    <>
      {itemData
        .filter((item) => item.type === "location")
        .map((item, index) => (
          // <LocationCard key={index} />
          <SavedCard key={index} type={item.type} value={item.value} />
        ))}
    </>
  );

  const RenderRealEstate = () => (
    <>
      {itemData
        .filter((item) => item.type === "realestate")
        .map((item, index) => (
          // <RealEstateCard key={index} />
          <SavedCard key={index} type={item.type} value={item.value} />
        ))}
    </>
  );

  return (
    <div className="w-full flex flex-col pt-2 gap-6 justify-center items-center">
      <div className="w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
        {RenderCard()}
      </div>
      <Button href={savedCardLink ?? "#"}>Xem thêm</Button>
    </div>
  );
}
