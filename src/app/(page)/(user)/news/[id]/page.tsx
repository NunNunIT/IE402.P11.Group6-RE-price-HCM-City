"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { IComment, INewsArticle } from "@/model";
import Comments from "@/components/comments";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const FullNewsPage = () => {
  const { id } = useParams();
  const router = useRouter();

  const [news, setNews] = useState<INewsArticle | null>(null);
  const [comments, setComments] = useState<IComment[]>([
    {
      userId: "01",
      comId: "001",
      fullName: "Nguyễn Văn A",
      text: "Bài viết hay xuất sắc",
      avatarUrl: "https://ui-avatars.com/api/?name=NVA&background=random",
      timestamp: new Date().toISOString(),
      replies: [],
    },
  ]);

  const handleSubmitComment = (newComment: IComment) => {
    setComments([...comments, newComment]);
  };

  useEffect(() => {
    if (id) {
      // Fetch the news data from the API route
      // test: http://localhost:3000/news/gem-park-loi-cho-nguoi-o-lai-cho-nguoi-dau-tu
      // datat: src/app/content/news.json
      fetch("/api/news") // Fetch from the API route
        .then((response) => response.json())
        .then((data) => {
          const newsArticle = data.find(
            (item: INewsArticle) => item.slug === id
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
                src="https://cdn-assets-angel.batdongsan.com.vn/assets/images/authorDefaultPhoto.png"
                className="h-10 w-10 rounded-full border"
              />
              <div>
                <p>
                  <span className="mr-1">Được đăng bởi</span>
                  <strong>{news.author}</strong>
                </p>
                <div>
                  <span className="mr-2">
                    Cập nhật lần cuối vào{" "}
                    {new Date(news.updatedAt).toLocaleString()}
                  </span>
                  <span>• Đọc trong khoảng {news.readTime} phút</span>
                </div>
              </div>
            </div>
            <article data-clarity-region="article">
              <div className="content-wrapper">
                <div className="p">
                  <strong>{news.introduction}</strong>
                </div>

                <figure className="my-4 size-full">
                  <img src={news.imageUrl} alt="" loading="lazy" />
                </figure>

                <Markdown className="prose mt-4">{news.content}</Markdown>

                <div className="p">—————–</div>
              </div>
              <div className="content-wrapper">
                <div className="p">
                  <i>
                    <b>Tuyên bố miễn trừ trách nhiệm:</b> {news.disclaimer}
                  </i>
                </div>
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

        <Comments
          commentData={comments}
          onSubmitComment={handleSubmitComment}
        />
      </main>
    </div>
  );
};

export default FullNewsPage;
