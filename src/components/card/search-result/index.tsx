"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Heart, MapPin } from "lucide-react";
import Link from "next/link";

interface RealEstateCardProps {
  images: string[]; // Mảng ảnh
  title?: string;
  location?: string;
  distance?: string;
  price?: string;
}

export default function SearchResultCard({
  images = [
    "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg",
    "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg",
    "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg",
    "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg",
    "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg",
  ],
  title,
  location,
  distance,
  price,
}: RealEstateCardProps) {
  const [isLiked, setIsLiked] = useState(false); // Trạng thái yêu thích
  const [showPopup, setShowPopup] = useState(false); // Trạng thái hiển thị popup

  const handleHeartClick = () => {
    setIsLiked(!isLiked);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000); // Ẩn popup sau 5 giây
  };

  const displayedImages = images.slice(0, 3); // Hiển thị 3 ảnh
  const remainingImages = images.length - displayedImages.length; // Số lượng ảnh còn lại

  return (
    <Link
      href="#"
      className="container w-full flex h-auto p-3 shadow-lg rounded cursor-pointer hover:shadow-xl"
    >
      <div className="w-[30%] flex flex-col gap-2 mr-2">
        {/* Ảnh chính */}
        <div className="relative">
          <Image
            width={1000}
            height={500}
            src={displayedImages[0]}
            alt={title ?? "Name"}
            className="object-cover w-full h-40 aspect-[4/3] ease-in duration-300"
          />
        </div>

        {/* Ảnh phụ */}
        <div className="relative grid grid-cols-2 gap-2">
          {displayedImages.slice(1).map((image, index) => (
            <div key={index} className="relative">
              {/* Kiểm tra ảnh cuối cùng có phải là ảnh còn lại không */}
              <Image
                width={1000}
                height={500}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover w-full h-16 ease-in duration-300"
              />
              {/* Nếu là ảnh cuối cùng và còn ảnh dư, tạo lớp mờ */}
              {remainingImages > 0 && index === displayedImages.length - 2 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-bold text-lg">
                  +{remainingImages}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="w-[70%] flex flex-col justify-between py-3">
        <div className="flex flex-col gap-2">
          <h5 className="text-lg font-bold text-gray-900 line-clamp-2">
            {title ??
              "Giỏ hàng chuyển nhượng căn hộ Vinhomes Ba Son 1PN, 2PN, 3PN"}
          </h5>
          <div className="flex gap-8">
            <p className="font-extrabold text-red-600">{price ?? "1,6 tỷ"}</p>
            <p className="font-extrabold text-red-600 text-gray-500">
              {distance ?? "60m2"}
            </p>
            <p className="text-gray-500 font-medium">48,5 tr/m2</p>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin className="w-4 text-gray-500" />
            <p className="text-gray-500 text-sm">
              {location ?? "Bình Tân, Hồ Chí Minh"}
            </p>
          </div>
          <div>
            <p className="line-clamp-2 text-sm font-medium">
              Với tiện ích toàn khu ngày càng hoàn thiện, tuyến Metro số 1 sắp
              đi vào hoạt động, Trung tâm thương mại tại chân đế toà nhà hạng A+
              toà nhà hạng A+
            </p>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Image
                width={1000}
                height={500}
                src={
                  "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg"
                }
                alt={"User Avatar"}
                className="object-cover w-8 h-8 rounded-full"
              />
              <div>
                <p className="text-xs font-semibold">Phan Nguyễn Hải Yến</p>
                <p className="text-[8px] text-gray-500">
                  Ngày đăng: 20/11/2024
                </p>
              </div>
            </div>
            {/* Thay đổi màu khi trái tim được yêu thích */}
            <Heart
              className={`mr-3 w-5 ${
                isLiked ? "fill-red-600 text-red-600" : "text-gray-400"
              }`}
              onClick={handleHeartClick}
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
