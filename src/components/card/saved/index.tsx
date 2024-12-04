import React from "react";
import { IoTrashBin } from "react-icons/io5";
import {
  ItemType,
  LocationCardProps,
  NewsCardProps,
  RealEstateCardProps,
} from "@/types/item";
import { LocationCard, RealEstateCard, NewsCard } from "@/components/card";

interface SavedCardProps {
  type?: ItemType;
  value?: LocationCardProps | NewsCardProps | RealEstateCardProps;
  removeFunction?: () => void;
}

const RenderCard: React.FC<{ type?: ItemType; props: any }> = ({
  type,
  props,
}) => {
  switch (type) {
    case "location":
      return <LocationCard {...props} />;
    case "realestate":
      return <RealEstateCard {...props} />;
    case "news":
      return <NewsCard {...props} />;
    default:
      return <div>No matching card type found.</div>;
  }
};

const SavedCard: React.FC<SavedCardProps> = ({
  type,
  value,
  removeFunction,
}) => {
  return (
    <div className="relative w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
      <button
        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white text-black border border-transparent rounded-full hover:border-black z-10 transition-all"
        onClick={removeFunction}
        aria-label="Remove item"
      >
        <IoTrashBin className="w-5 h-5" />
      </button>
      <div className="flex flex-col gap-4">
        <RenderCard type={type} props={value} />
      </div>
    </div>
  );
};

export default SavedCard;