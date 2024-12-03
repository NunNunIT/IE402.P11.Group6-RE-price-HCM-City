// import dynamic from "next/dynamic";

import { GISMap } from "@/components";
import { NewsCard, RealEstateCard } from "@/components/card";
import LocationCard from "@/components/card/location";
import { ImageViewType1 } from "@/components/imageView";
import { SearchTab } from "@/components/search";
import { SeeMoreType1 } from "@/components/seeMore";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
// import { GISMap } from "@/components";
// const GISMap = dynamic(() => import("@/components").then((mod) => mod.GISMap),
//   { ssr: false }
// );
import { FaLocationDot } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 min-h-[100dvh] w-full max-w-6xl">
      <div className="w-full h-full bg-white dark:bg-zinc-900 p-3 space-y-3">
        <ImageViewType1 />
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-3xl">
            Hiếm - khu vip nhà 4T - HXH - gần mặt tiền - Nguyễn Thái Sơn -
            44m2(4.2 x 10.5) - nhỉnh 7 tỷ
          </h1>
          <div className="flex flex-row gap-2">
            <FaLocationDot />
            <span>Đường Nguyễn Thái Sơn, Phường 5, Gò Vấp, Hồ Chí Minh</span>
          </div>
          {/* <span>0987654321</span> */}
        </div>
        <div className="flex flex-row gap-6">
          <div className="flex flex-col">
            <span className="text-zinc-600 dark:text-zinc-400">Giá</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-xl">
              500000
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-zinc-600 dark:text-zinc-400">Diện tích</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-xl">
              50m2
            </span>
          </div>
          <Button variant="ghost">
            <FaRegHeart className="size-6 text-zinc-800 dark:text-zinc-200" />
          </Button>
        </div>
      </div>
      <GISMap className="container" />
    </div>
  );
}
