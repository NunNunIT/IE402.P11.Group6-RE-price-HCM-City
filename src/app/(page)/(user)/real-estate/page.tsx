"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
// import { SearchRe } from "@/components/search";
const SearchRe = dynamic(() => import("@/components/search").then(m => m.SearchRe), {
  ssr: false,
});

const RealEstateCard = dynamic(() => import("@/components/card/realestate"), {
  ssr: false,
});

export default function Home() {
  const [cards, setCards] = useState<any[]>([]); // Dữ liệu bất động sản
  const [page, setPage] = useState(1); // Quản lý số trang
  const [isLoading, setIsLoading] = useState(false); // Trạng thái tải
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Hàm gọi API để lấy thêm dữ liệu
  const fetchMoreData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/real-estates?limit=12&page=${page}`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      console.log();

      const { data } = await res.json();
      console.log("Data lon:", data);

      if (data.rows?.length > 0) {
        setCards((prev) => [...prev, ...data.rows]); // Thêm dữ liệu mới vào danh sách
        setPage((prev) => prev + 1); // Tăng số trang
      }
    } catch (error) {
      console.error("Lỗi khi tải thêm dữ liệu:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading]);

  // Sử dụng Intersection Observer API
  useEffect(() => {
    const observerElement = observerRef.current;
    if (!observerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          fetchMoreData();
        }
      },
      { threshold: 1.0 } // Kích hoạt khi phần tử hoàn toàn xuất hiện
    );

    observer.observe(observerElement);

    return () => {
      observer.disconnect();
    };
  }, [fetchMoreData, isLoading]);

  // Gọi API lần đầu tiên khi component được mount
  useEffect(() => {
    fetchMoreData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col pt-4 min-h-[calc(100dvh_-_7.25rem)]">
      <SearchRe />

      <div className="mt-3 w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
        {cards.map((item, index) => (
          <RealEstateCard key={index} data={item} />
        ))}
      </div>

      {isLoading && (
        <div className="py-4">
          <span>Đang tải thêm...</span>
        </div>
      )}

      <div ref={observerRef} className="h-10"></div>
    </div>
  );
}
