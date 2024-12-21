"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

interface NewCardProps {
  _id: string;
  imageUrl?: string;
  title?: string;
  owner?: any;
  createdAt?: string;
}

export default function NewSearchResultCard({
  _id,
  imageUrl = "https://photo.rever.vn/v3/get/rvhe0PS+4VVS4Z8WZzoVBQToU5B4zzCZg5f9dc2EdjtJdprSpJtPtK0VShcsHCoQDDJ3cXBnMshiyvde_rN47nHA==/750x500/image.jpg",
  title = "Giỏ hàng chuyển nhượng căn hộ Vinhomes Ba Son 1PN, 2PN, 3PN",
  owner,
  createdAt,
}: NewCardProps) {
  return (
    <Link
      href={_id ? `/news/${_id}` : "#"}
      className="container w-full flex h-auto p-3 shadow-lg rounded cursor-pointer hover:shadow-xl"
    >
      <div className="w-[30%] flex flex-col gap-2 mr-2">
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
          <div className="flex gap-8"></div>
        </div>
        <div>
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
                  {/* Ngày đăng: {new Date(createdAt).toLocaleDateString()} */}
                  Ngày đăng: {createdAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
