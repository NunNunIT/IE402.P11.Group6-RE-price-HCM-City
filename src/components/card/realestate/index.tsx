// components/RealEstateCard.tsx
"use client";

import React from "react";
import Image from "next/image";
import { GoHeart } from "react-icons/go";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface RealEstateCardProps {
  image?: string;
  title?: string;
  location?: string;
  distance?: string;
  price?: string;
}

const RealEstateCard: React.FC<RealEstateCardProps> = ({
  image,
  title,
  location,
  distance,
  price,
}) => {
  return (
    <Link href="#">
      <div className="group max-w-sm overflow-hidden transition-shadow aspect-[3/4]">
        {/* Image */}
        <div className="relative">
          <Image
            width={1000}
            height={500}
            src={
              image ??
              "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg"
            }
            alt={title ?? "Name"}
            className="object-cover rounded-xl w-full h-48 aspect-[4/3] group-hover:scale-105 ease-in duration-300"
          />
        </div>
        {/* Content */}
        <div className="p-2 h-full flex flex-col">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 truncate line-clamp-2">
              {title ?? "Name"}
            </h3>
            <p className="text-sm text-zinc-500">{location ?? "Địa chỉ"}</p>
            <span className="text-sm text-green-500 dark:text-green-500">
              Cách bạn {distance ?? "15m"}
            </span>
          </div>

          <div className="w-full flex justify-end items-end">
            <p className="text-lg font-bold text-red-500 dark:text-red-500 mt-2">
              {price ?? "5000 VND"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RealEstateCard;
