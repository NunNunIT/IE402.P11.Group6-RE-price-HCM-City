"use client";

import { ENUM_MARKER_SYMBOL, parseObjectToSearchParams } from "@/utils";
import { useEffect, useRef } from "react";

import { SearchResultCard } from "@/components/card";
import { SearchTab } from "@/components/search";
import dynamic from "next/dynamic";
import useSWRInfinite from "swr/infinite";

const GISMap = dynamic(() => import("@/components/gis-map"), { ssr: false });

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");

  const payload = await res.json();
  return payload.data as any[];
};

export const SearchResultCards = ({ searchParams }: IDefaultPageProps) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  const getKey = (pageIndex: number, previousPageData: any[]) => {
    if (previousPageData && previousPageData.length === 0) return null; // End of data
    const baseParams = parseObjectToSearchParams(searchParams);
    return `/api/real-estates?${baseParams}&page=${pageIndex + 1}&limit=10`;
  };

  const {
    data,
    error,
    isLoading,
    size,
    setSize
  } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    revalidateOnFocus: false,
  });

  const flattenedData = data ? data.flat() : [];
  const isLoadingMore =
    isLoading ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
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

  if (!isLoading && flattenedData.length === 0) {
    return <div className="px-4">Không tìm thấy kết quả</div>;
  }

  return (
    <>
      <div className="w-full h-full bg-white dark:bg-zinc-900 p-3 space-y-3">
        <div className="w-full max-w-4xl mx-auto my-auto z-10 md:px-0">
          <SearchTab />
        </div>
        <div className="flex flex-col">
          <div className="px-4 mb-4">
            <h1>Bất động sản tại {searchParams.district}</h1>
            <p>Hiện có {flattenedData.length} tin đăng bán tại khu vực này</p>
          </div>

          <div className="w-full flex flex-col gap-3 md:p-0 p-2">
            {flattenedData.map((item, index) => (
              <SearchResultCard key={index} {...item} />
            ))}
          </div>

          {/* Loading Indicator */}
          {isLoadingMore && (
            <div className="flex justify-center my-4">
              <span>Đang tải thêm...</span>
            </div>
          )}

          {/* Intersection Observer Target */}
          {hasMoreData && <div ref={observerRef} className="h-10"></div>}

          {/* Error Handling */}
          {error && (
            <div className="px-4 text-red-500">
              Đã có lỗi xảy ra khi tải dữ liệu
            </div>
          )}
        </div>
      </div>
      <GISMap
        zoom={15}
        center={flattenedData?.[0]?.locate}
        points={flattenedData?.map(data => ({
          ...data.locate,
          type: ENUM_MARKER_SYMBOL.REAL_ESTATE
        }))}
      />
    </>
  );
};

export default SearchResultCards;
