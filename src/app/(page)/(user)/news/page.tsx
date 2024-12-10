"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NewsCard } from "@/components/card";
import { INewsArticle } from "@/lib/model";
import { SeeMoreType1 } from "@/components/seeMore";

export default function Home() {
  const router = useRouter();
  const [news, setNews] = useState<INewsArticle[] | null>(null); // Changed to an array

  useEffect(() => {
    // Fetch the news data from the API route
    fetch("/api/news") // Update this to your correct API or data path
      .then((response) => response.json())
      .then((data) => {
        setNews(data); // Store the entire array of news data
      })
      .catch((error) => {
        console.error("Error fetching news data:", error);
        router.push("/404");
      });
  }, []);

  function extractFirstImage(content: string): string | null {
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);
    return imgMatch ? imgMatch[1] : null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] max-w-6xl mx-auto">
      <div className="w-full grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
        {news === null ? (
          <p>Loading...</p> // Show loading message while data is being fetched
        ) : news.length === 0 ? (
          <p>No news available.</p> // Show message if there are no items in the news array
        ) : (
          news.map((item) => (
            <NewsCard
              key={item._id} // Use _id as a unique key for each card
              image={extractFirstImage(item.content)} // Extract image URL from content
              title={item.title} // Pass title as a prop
            />
          ))
        )}
      </div>
      <SeeMoreType1 typeCard="realEstate" title="Bất động sản" linkFetch="/api/news"/>
    </div>
  );
}
