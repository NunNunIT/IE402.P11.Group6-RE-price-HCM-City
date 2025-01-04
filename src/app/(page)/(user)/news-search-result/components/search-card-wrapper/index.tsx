"use client";

import { parseObjectToSearchParams } from "@/utils";
import { useEffect, useRef } from "react";

import { NewsCard } from "@/components/card";
import { Skeleton } from "@/components/ui/skeleton";
import useSWRInfinite from "swr/infinite";

const fetcher = async (url: string) => {
  const res = await fetch(url, { cache: "reload" });
  if (!res.ok) throw new Error("Failed to fetch data");

  const payload = await res.json();
  return payload.data.rows as any[];
};

export const SearchCardWrapper = ({ searchParams }: IDefaultPageProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const getKey = (pageIndex: number, previousPageData: any[]) => {
    if (previousPageData && previousPageData.length === 0) return null;
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

    return () => observer.disconnect();
  }, [size, isLoadingMore, hasMoreData, setSize]);

  return (
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
      {isLoadingMore && <Skeleton className="w-full h-20" />}
      {hasMoreData && <div ref={observerRef} className="h-10"></div>}
    </div>
  );
};

export default SearchCardWrapper;
