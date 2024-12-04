import { Button } from "@/components/ui/button";
import { FaLocationDot } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { GISMap } from "@/components";
import { ImageViewType1 } from "@/components/imageView";
import { SearchTab } from "@/components/search";
import { SeeMoreType1 } from "@/components/seeMore";
import { NewsCard, SearchResultCard } from "@/components/card";

export default function SearchResultPage() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 min-h-[100dvh] w-full">
      <div className="w-full h-full bg-white dark:bg-zinc-900 p-3 space-y-3">
        <div className="w-full max-w-4xl mx-auto my-auto z-10 md:px-0">
          <SearchTab />
        </div>
        <div className="px-4">
          <h1>Bất động sản tại Quận 1</h1>
          <p>Hiện có 181 tin đăng bán tại khu vực này</p>
        </div>
        <div className="px-4 flex flex-col gap-4">
          <SearchResultCard />
          <SearchResultCard />
        </div>
        <div className="px-4 flex flex-col gap-4">
          <h2>Tin tức</h2>
          <div className="grid grid-cols-3 gap-4">
            <NewsCard></NewsCard>
            <NewsCard></NewsCard>
            <NewsCard></NewsCard>
          </div>
        </div>
      </div>
      <GISMap className="container" />
    </div>
  );
}
