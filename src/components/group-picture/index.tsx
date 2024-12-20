"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const cityData = [
  {
    name: "TP. Hồ Chí Minh",
    listings: 63467,
    image:
      "https://file4.batdongsan.com.vn/images/newhome/cities1/HCM-web-2.jpg",
    cols: "md:col-span-2 md:row-span-2",
    height: "lg:h-full h-80",
    link: "/search-result?province=Hồ+Chí+Minh",
  },
  {
    name: "Hà Nội",
    listings: 58619,
    image:
      "https://file4.batdongsan.com.vn/images/newhome/cities1/HN-web-2.jpg",
    cols: "",
    height: "h-48",
    link: "/search-result?province=Hà+Nội",
  },
  {
    name: "Đà Nẵng",
    listings: 8952,
    image:
      "https://file4.batdongsan.com.vn/images/newhome/cities1/DDN-web-3.jpg",
    cols: "",
    height: "h-48",
    link: "/search-result?province=Đà+Nẵng",
  },
  {
    name: "Bình Dương",
    listings: 7352,
    image:
      "https://file4.batdongsan.com.vn/images/newhome/cities1/BD-web-2.jpg",
    cols: "",
    height: "h-48",
    link: "/search-result?province=Bình+Dương",
  },
  {
    name: "Đồng Nai",
    listings: 3876,
    image:
      "https://file4.batdongsan.com.vn/images/newhome/cities1/DNA-web-2.jpg",
    cols: "",
    height: "h-48",
    link: "/search-result?province=Đồng+Nai",
  },
];

export default function GroupPicture() {
  return (
    <div className="mx-auto h-full w-full max-w-6xl">
      <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl dark:text-white mb-6">
        Bất động sản theo địa điểm
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Link
          href={cityData[0].link}
          className={`h-full w-full aspect-[4/3] group relative flex items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg`}
        >
          <Image
            unoptimized
            src={cityData[0].image}
            loading="lazy"
            alt={cityData[0].name}
            width={500}
            height={500}
            className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-105"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70"></div>
          <div className="relative ml-4 mb-3 text-white md:ml-5">
            <h3 className="text-lg font-semibold md:text-xl">
              {cityData[0].name}
            </h3>
          </div>
        </Link>
        <div className="grid grid-cols-2 gap-2">
          {cityData.slice(1, 5).map((city, index) => (
            <Link
              href={city.link}
              key={index}
              className={`h-full w-full aspect-[4/3] group relative flex items-end overflow-hidden rounded-lg bg-gray-100 shadow-lg`}
            >
              <Image
                unoptimized
                src={city.image}
                height={1000}
                width={1000}
                loading="lazy"
                alt={city.name}
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-105"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-70"></div>
              <div className="relative ml-4 mb-3 text-white md:ml-5">
                <h3 className="text-lg font-semibold md:text-xl">
                  {city.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
