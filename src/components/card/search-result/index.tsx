"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MapPin } from "lucide-react";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuthWrapperFunction } from "@/hooks";

interface RealEstateCardProps {
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
  imageUrl = "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg",
  title = "Giỏ hàng chuyển nhượng căn hộ Vinhomes Ba Son 1PN, 2PN, 3PN",
  price = 1.6,
  area = 60,
  locate,
  owner,
  createdAt,
}: RealEstateCardProps) {
  const [isLiked, setIsLiked] = useState(false); // Trạng thái yêu thích
  const [showPopup, setShowPopup] = useState(false); // Trạng thái hiển thị popup
  const handleHeartClick = async () => {
    setIsLiked(!isLiked);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000); // Ẩn popup sau 5 giây
  };
  const onClickHeart = useAuthWrapperFunction(handleHeartClick);
  return (
    <Link
      href="#"
      className="container w-full flex h-auto p-3 shadow-lg rounded cursor-pointer hover:shadow-xl"
    >
      <div className="w-[30%] flex flex-col gap-2 mr-2">
        {/* Ảnh chính */}
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
      </div>

      <div className="w-[70%] flex flex-col justify-between py-3">
        <div className="flex flex-col gap-2">
          <h5 className="text-lg font-bold text-gray-900 line-clamp-2">
            {title}
          </h5>
          <div className="flex gap-8">
            <p className="font-extrabold text-red-600">{price + " tỷ"}</p>
            <p className="font-extrabold text-red-600">
              {area + " m2"}
            </p>
            <p className="text-gray-500 font-medium">{(price * 1000 / area).toFixed(1)} tr/m2</p>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin className="w-4 text-gray-500" />
            <p className="text-gray-500 text-sm">
              {(locate && `${locate.xa}, ${locate.huyen}, ${locate.tinh}`) ?? "Bình Tân, Hồ Chí Minh"}
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={owner?.avt ?? ""} alt={owner?.username} />
                <AvatarFallback>{(owner?.username ?? "U")[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs font-semibold">{owner?.username ?? "Unknown"}</p>
                <p className="text-[8px] text-gray-500">
                  Ngày đăng: {new Date(createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            {/* Thay đổi màu khi trái tim được yêu thích */}
            <Heart
              className={cn("mr-3 w-5", isLiked ? "fill-red-600 text-red-600" : "text-gray-400")}
              onClick={onClickHeart}
            />
          </div>
        </div>
      </div>

      {/* Hiển thị thông báo khi yêu thích */}
      {showPopup && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded-full mt-4">
          Đã lưu thành công!
        </div>
      )}
    </Link>
  );
}
