import Image from "next/image";
import { SearchTab } from "@/components/search";
import { SeeMoreType1 } from "@/components/seeMore";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh]">
      <div className="relative w-full h-[80dvh] -mt-[11rem] flex justify-center items-center z-10">
        <Image
          src="/decorate/searchTab.jpg"
          alt="Background"
          width="1000"
          height="1000"
          className="absolute z-5 w-full h-full object-cover brightness-75"
        />
        <div className="w-full max-w-4xl mx-auto my-auto z-10 pt-16 md:px-0 px-3">
          <SearchTab />
        </div>
      </div>
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 my-6">
        <SeeMoreType1 typeCard="realestate" title="Bất động sản" />
        <SeeMoreType1 typeCard="news" title="Tin tức" />
      </div>
    </div>
  );
}
