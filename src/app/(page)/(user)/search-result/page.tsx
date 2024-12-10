import { NewsCard } from "@/components/card";
import { SearchResultCards } from "./components";
import { SearchTab } from "@/components/search";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const GISMap = dynamic(() => import("@/components/gis-map"), { ssr: false });

export default async function SearchResultPage({ searchParams }: IDefaultPageProps) {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 min-h-[100dvh] w-full">
      <div className="w-full h-full bg-white dark:bg-zinc-900 p-3 space-y-3">
        <div className="w-full max-w-4xl mx-auto my-auto z-10 md:px-0">
          <SearchTab />
        </div>
        <Suspense fallback={<>Loading...</>}>
          <SearchResultCards {...{ searchParams }} />
        </Suspense>
        <div className="px-4 flex flex-col gap-4">
          <h2>Tin tức</h2>
          <div className="grid grid-cols-3 gap-4">
            <NewsCard></NewsCard>
            <NewsCard></NewsCard>
            <NewsCard></NewsCard>
          </div>
        </div>
      </div>
      <GISMap />
    </div>
  );
}
