import React from "react";
import Image from "next/image";
import { Heart, MapPin } from "lucide-react";

interface RealEstateCardProps {
  image?: string;
  title?: string;
  location?: string;
  distance?: string;
  price?: string;
}

export default function SearchResultCard({
  image,
  title,
  location,
  distance,
  price,
}: RealEstateCardProps) {
  return (
    <div className="container w-full flex h-auto p-3 shadow-lg rounded">
      <div className="w-[30%] flex flex-col gap-2 mr-2">
        <Image
          width={1000}
          height={500}
          src={
            image ??
            "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg"
          }
          alt={title ?? "Name"}
          className="object-cover w-full h-40 aspect-[4/3] ease-in duration-300"
        />
        <div className="grid grid-cols-2 gap-2">
          <Image
            width={1000}
            height={500}
            src={
              image ??
              "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg"
            }
            alt={title ?? "Name"}
            className="object-cover w-auto h-16 ease-in duration-300"
          />
          <Image
            width={1000}
            height={500}
            src={
              image ??
              "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg"
            }
            alt={title ?? "Name"}
            className="object-cover w-auto h-16 ease-in duration-300"
          />
        </div>
      </div>

      <div className="w-[70%] flex flex-col justify-between py-3">
        <div className="flex flex-col gap-2">
          <h5 className="text-lg font-bold text-gray-900 line-clamp-2">
            Giỏ hàng chuyển nhượng căn hộ Vinhomes Ba Son 1PN, 2PN, 3PN, 4PN
            những căn nhà gần biển giá tốt Giỏ hàng chuyển nhượng căn hộ
            Vinhomes Ba Son 1PN, 2PN, 3PN, 4PN những căn nhà gần biển giá tốt
          </h5>
          <div className="flex gap-8">
            <p className="font-extrabold text-red-600">1,6 tỷ</p>
            <p className="font-extrabold text-red-600 text-gray-500">60m2</p>
            <p className="text-gray-500 font-medium">48,5 tr/m2</p>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin className="w-4 text-gray-500" />
            <p className="text-gray-500 text-sm">Bình Tân, Hồ Chí Minh</p>
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
            <Heart className="mr-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
