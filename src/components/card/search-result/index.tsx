"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useAuthWrapperFunction } from "@/hooks";
import { SaveRealBtn } from "@/components";

interface RealEstateCardProps {
  _id: string;
  imageUrl?: string;
  title?: string;
  location?: string;
  distance?: string;
  price?: number;
  area?: number;
  locate?: any;
  owner?: any;
  createdAt?: string;
}

export default function SearchResultCard({
  _id,
  imageUrl = "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg",
  title = "Giỏ hàng chuyển nhượng căn hộ Vinhomes Ba Son 1PN, 2PN, 3PN",
  price = 1.6,
  area = 60,
  locate,
  owner,
  createdAt,
}: RealEstateCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleHeartClick = async () => {
    setIsLiked((prev) => {
      if (!prev) {
        toast.success("Đã thêm vào danh sách yêu thích");
      } else {
        toast("Đã xóa khỏi danh sách yêu thích");
      }
      return !prev;
    });
  };

  const onClickHeart = useAuthWrapperFunction(handleHeartClick);

  return (
    <div className="container w-full flex h-auto p-3 shadow-lg rounded cursor-pointer hover:shadow-xl">
      <Link
        href={_id ? `/real-estate/${_id}` : "#"}
        className="w-[30%] flex flex-col gap-2 mr-2"
      >
        <div className="relative">
          <Image
            unoptimized
            width={1000}
            height={500}
            src={imageUrl}
            alt={title ?? "Name"}
            className="object-cover w-full h-40 aspect-[4/3] ease-in duration-300"
          />
        </div>
      </Link>

      <div className="w-[70%] flex flex-col justify-between py-3">
        <Link
          href={_id ? `/real-estate/${_id}` : "#"}
          className="flex flex-col gap-2"
        >
          <h5 className="text-lg font-bold text-gray-900 line-clamp-2">
            {title}
          </h5>
          <div className="flex gap-8">
            <p className="font-extrabold text-red-600">{price + " tỷ"}</p>
            <p className="font-extrabold text-red-600">{area + " m²"}</p>
            <p className="text-gray-500 font-medium">
              {((price * 1000) / area).toFixed(1)} tr/m²
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin className="w-4 text-gray-500" />
            <p className="text-gray-500 text-sm">
              {(locate &&
                `${locate.diachi}, ${locate.xa}, ${locate.huyen}, ${locate.tinh}`) ||
                "Bình Tân, Hồ Chí Minh"}
            </p>
          </div>
        </Link>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={owner?.avt ?? ""} alt={owner?.username} />
              <AvatarFallback>{(owner?.username ?? "U")[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-semibold">
                {owner?.username ?? "Unknown"}
              </p>
              <p className="text-[8px] text-gray-500">
                Ngày đăng: {(createdAt ? new Date(createdAt) : new Date()).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Save Button */}
          <SaveRealBtn component="real-estate" realEstateId={_id} />
        </div>
      </div>
    </div>
  );
}
