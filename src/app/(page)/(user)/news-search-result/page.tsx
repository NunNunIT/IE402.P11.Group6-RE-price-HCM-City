import { SearchCardWrapper } from "./components";
import { Suspense } from "react";
import type { Metadata } from "next";
import { SearchNews } from "@/components/search";

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm tin tức",
  description: "Trang hiển thị kết quả tìm kiếm tin tức",
};

export default async function SearchResultPage({ searchParams }: IDefaultPageProps) {
  return (
    <div className="w-full min-h-[100dvh]">
      <SearchNews />
      <Suspense fallback={<>Loading...</>}>
        <SearchCardWrapper {...{ searchParams }} />
      </Suspense>
    </div>
  );
}
