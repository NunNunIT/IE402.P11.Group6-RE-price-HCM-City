"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";

const NewsCard = dynamic(() => import("@/components/card/news"), {
  ssr: false,
});
const SearchNews = dynamic(() => import("@/components/search/searchTab/searchNews"), {
  ssr: false,
});

export default function Home() {
  const [cards, setCards] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchMoreData = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/news?limit=12&page=${page}`);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      const { data } = await res.json();
      if (data.rows?.length > 0) {
        setCards((prev) => [...prev, ...data.rows]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Lỗi khi tải thêm dữ liệu:", error.message);
    } finally {
      setIsLoading(false);
    }
  }, [page, isLoading, setIsLoading]);

  useEffect(() => {
    const observerElement = observerRef.current;
    if (!observerElement) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isLoading) {
        fetchMoreData();
      }
    }, { threshold: 1.0 });
    observer.observe(observerElement);

    return () => observer.disconnect();
  }, [fetchMoreData, isLoading]);

  useEffect(() => {
    fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] max-w-6xl mx-auto">
      <SearchNews />
      <div className="w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 md:p-0 p-2">
        {cards.map((item, index) => (
          <NewsCard key={index} data={item} />
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
