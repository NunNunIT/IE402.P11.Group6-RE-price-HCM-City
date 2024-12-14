"use client";

import { ENUM_MARKER_SYMBOL, parseObjectToSearchParams } from "@/utils";
import { useEffect, useRef } from "react";

import { NewSearchResultCard } from "@/components/card";
import { SearchTab } from "@/components/search";
import { Skeleton } from "@/components/ui/skeleton";
import useSWRInfinite from "swr/infinite";

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
    <div className="w-screen h-screen bg-white dark:bg-zinc-900 flex flex-col p-3">
      {/* Search Tab */}
      <div className="w-full max-w-4xl mx-auto my-4">
        <SearchTab />
      </div>

      {/* Search Results */}
      <div className="flex-1 flex flex-col">
        <div className="px-4 mb-4">
          <h1>
            Tin tức có tên gần với{" "}
            <span className="text-orange-500">{searchParams.keyword}</span>{" "}
          </h1>
          {!(isLoading || error) && (
            <p>Hiện có {flattenedData.length} tin tức tương tự</p>
          )}
        </div>

        {flattenedData.length > 0 ? (
          <div className="w-full flex flex-col gap-3 md:p-0 p-2">
            {flattenedData.map((item, index) => (
              <NewSearchResultCard key={index} {...item} />
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
