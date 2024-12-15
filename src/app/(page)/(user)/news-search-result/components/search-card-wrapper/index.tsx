"use client";

import { ENUM_MARKER_SYMBOL, parseObjectToSearchParams } from "@/utils";
import { useEffect, useRef } from "react";

import { NewsCard, NewSearchResultCard } from "@/components/card";
import { SearchTab } from "@/components/search";
import { Skeleton } from "@/components/ui/skeleton";
import useSWRInfinite from "swr/infinite";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoSearchOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");

  const payload = await res.json();
  return payload.data as any[];
};

export const SearchCardWrapper = ({ searchParams }: IDefaultPageProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const getKey = (pageIndex: number, previousPageData: any[]) => {
    if (previousPageData && previousPageData.length === 0) return null; // End of data
    const baseParams = parseObjectToSearchParams(searchParams);
    return `/api/news?${baseParams}&page=${pageIndex + 1}&limit=10`;
  };

  const { data, error, isLoading, size, setSize } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    }
  );

  const flattenedData = data ? data.flat() : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const hasMoreData = !data || (data[size - 1] && data[size - 1].length > 0);

  useEffect(() => {
    const observerElement = observerRef.current;
    if (!observerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoadingMore && hasMoreData) {
          setSize(size + 1);
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerElement);

    return () => {
      observer.disconnect();
    };
  }, [size, isLoadingMore, hasMoreData, setSize]);

  return (
    <div className="max-w-5xl mx-auto w-full">
      {/* Search Tab */}
      <div className="w-full mx-auto my-4">
      <form
          action={`/news-search-result`}
          method="GET"
          className={cn(
            "gap-8 flex w-full rounded-md",
            "border border-zinc-200 bg-white px-4 py-2 text-sm",
            "ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed",
            "disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950",
            "dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
          )}
        >
          {/* Search keyword input */}
          <Input
            type="text"
            name="keyword"
            placeholder="Nhập từ khóa để tìm tin tức"
            className="flex-1 border-none"
            required
          />
          <Button type="submit">
            <IoSearchOutline className="size-6" />
          </Button>
        </form>
      </div>

      {/* Search Results */}
      <div className="flex-1 flex flex-col">
        <div className="md:p-0 p-2 mb-4">
          <h1>
            Tin tức có tên gần với{" "}
            <span className="text-orange-500">{searchParams.keyword}</span>{" "}
          </h1>
          {!(isLoading || error) && (
            <p>Hiện có {flattenedData.length} tin tức tương tự</p>
          )}
        </div>

        {flattenedData.length > 0 ? (
          <div className="w-full grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 md:p-0 p-2">
            {flattenedData.map((item, index) => (
              <NewsCard key={index} data={item} />
            ))}
          </div>
        ) : (
          isLoadingMore && (
            <div className="flex justify-center items-center h-full">
              <p>Không có kết quả nào</p>
            </div>
          )
        )}

        {/* Loading Indicator */}
        {isLoadingMore && <Skeleton className="w-full h-20" />}

        {/* Intersection Observer Target */}
        {hasMoreData && <div ref={observerRef} className="h-10"></div>}
      </div>
    </div>
  );
};

export default SearchCardWrapper;
