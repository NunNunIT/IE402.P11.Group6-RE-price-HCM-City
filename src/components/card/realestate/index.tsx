// components/RealEstateCard.tsx
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LucideDot } from "lucide-react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { SaveBtn } from "@/components";

interface RealEstateCardProps {
  image?: string;
  title?: string;
  location?: string;
  distance?: string;
  price?: string;
  area?: number;
}

const RealEstateCard: React.FC<RealEstateCardProps> = ({
  image,
  title,
  location,
  distance,
  price,
  area,
}) => {

  return (
    <div className="group max-w-sm transition-shadow aspect-[3/4]">
      <Link href="#">
        {/* Image */}
        <div className="relative h-48 rounded-xl overflow-hidden">
          <Image
            width={1000}
            height={500}
            src={
              image ??
              "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg"
            }
            alt={title ?? "Name"}
            className="object-cover w-full h-full aspect-[4/3] group-hover:scale-105 ease-in duration-300"
          />
          <span className="absolute p-2 bg-black/60 bottom-0 w-full text-sm text-green-300 dark:text-green-500">
            Cách bạn {distance ?? "15m"}
          </span>
        </div>
        {/* Content */}
        <div className="p-2 h-fit flex flex-col">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 truncate line-clamp-2">
              {title ?? "Name"}
            </h3>
            <p className="text-sm text-zinc-500 flex gap-2 flex-row">
              <HiOutlineLocationMarker className="size-4 text-gray-800" />
              {location ?? "Địa chỉ"}
            </p>
          </div>
        </div>
      </Link>
      <div className="w-full flex flex-row gap-1 justify-between items-center px-2">
        <SaveBtn component="real-estate"/>

        <Link href="#" className="w-ful flex flex-row gap-1">
          <p className="text-lg font-bold text-red-500 dark:text-red-500">
            {area ?? "25"} m<sup>2</sup>
          </p>
          <LucideDot className="text-red-500 dark:text-red-500" />
          <p className="text-lg font-bold text-red-500 dark:text-red-500">
            {price ?? "5000 VND"}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default RealEstateCard;
