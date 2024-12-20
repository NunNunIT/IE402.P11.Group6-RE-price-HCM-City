"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { SearchRe } from "@/components/search";

// Lazy load components
const RealEstateCard = dynamic(() => import("@/components/card/realestate"));
const SeeMoreType1 = dynamic(() => import("@/components/seeMore/type1"), {
  ssr: false, // Chỉ tải trên client
});

export default function Home() {
  const [cards, setCards] = useState<any[]>([]); // Dữ liệu bất động sản
  const [page, setPage] = useState(1); // Quản lý số trang
  const [loading, setLoading] = useState(false); // Trạng thái tải
  const observerRef = useRef<HTMLDivElement | null>(null);

  // Hàm gọi API để lấy thêm dữ liệu
  const fetchMoreData = useCallback(async () => {
    if (loading) return;
    setLoading(true);

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
      setLoading(false);
    }
  }, [page, loading]);

  // Sử dụng Intersection Observer API
  useEffect(() => {
    const observerElement = observerRef.current;
    if (!observerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          fetchMoreData();
        }
      },
      { threshold: 1.0 } // Kích hoạt khi phần tử hoàn toàn xuất hiện
    );

    observer.observe(observerElement);

    return () => {
      observer.disconnect();
    };
  }, [fetchMoreData, loading]);

  // Gọi API lần đầu tiên khi component được mount
  useEffect(() => {
    fetchMoreData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
        {cards.map((item, index) => (
          <RealEstateCard key={index} data={item} />
        ))}
      </div>

      {/* Loader */}
      {loading && (
        <div className="py-4">
          <span>Đang tải thêm...</span>
        </div>
      )}

      {/* Trạm quan sát */}
      <div ref={observerRef} className="h-10"></div>
    </>
  );
}
