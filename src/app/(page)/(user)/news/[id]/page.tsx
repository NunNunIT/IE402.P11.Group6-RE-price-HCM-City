"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { INewsArticle } from "@/lib/model";

const FullNewsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [news, setNews] = useState<INewsArticle | null>(null);

  useEffect(() => {
    if (id) {
      // Fetch the news data from the API route
      fetch("/api/news") // Update this to your correct API or data path
        .then((response) => response.json())
        .then((data) => {
          const newsArticle = data.find(
            (item: INewsArticle) => item._id === id
          );
          if (newsArticle) {
            setNews(newsArticle);
          } else {
            router.push("/404");
          }
        })
        .catch((error) => {
          console.error("Error fetching news data:", error);
          router.push("/404");
        });
    }
  }, [id, router]);

  if (!news) return <div>Loading...</div>;

  return (
    <div className="min-h-screen">
      <main className="max-w-6xl mx-auto px-4 py-4">
        <div className="max-w-screen-xl mx-auto mt-8 grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <h2 className="mb-5 font-bold">{news.title}</h2>
            <div className="text-gray-600 flex gap-2 mb-5 text-sm">
              <img
                src="https://ui-avatars.com/api/?name=NVA&background=random"
                className="h-10 w-10 rounded-full border"
              />
              <div>
                <p>
                  <span className="mr-1">Được đăng bởi</span>
                  <strong>{news.owner}</strong>
                </p>
                <div>
                  <span className="mr-2">
                    Cập nhật lần cuối vào{" "}
                    {new Date(news.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <article data-clarity-region="article">
              <div className="content-wrapper">
                {/* Render HTML content */}
                <div
                  className="prose mt-4"
                  dangerouslySetInnerHTML={{ __html: news.content }}
                />

                <div className="p">—————–</div>
              </div>
            </article>
          </div>

          <aside className="col-span-4">
            <div className="border rounded-lg p-4">
              <h4 className="mb-4">Bài viết được xem nhiều nhất</h4>
              <ul className="space-y-2">
                <li className="py-2 border-b border-gray-200">
                  Trọn Bộ Lãi Suất Vay Mua Nhà Mới Nhất Tháng 11/2024
                </li>
                <li className="py-2 border-b border-gray-200">
                  Thị Trường BĐS Tháng 10/2024: Phục Hồi Cả Nhu Cầu Và Lượng Tin
                  Đăng
                </li>
                <li className="py-2 border-gray-200">
                  Bất Động Sản Đông Anh (Hà Nội) Tiếp Tục Nổi Sóng Mới
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default FullNewsPage;
