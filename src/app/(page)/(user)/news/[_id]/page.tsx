import Image from "next/image";
import { notFound } from "next/navigation";

interface INewsDetailPageProps extends IDefaultPageProps {
  params: { _id: string };
}

export default async function NewsDetailPage({
  params: { _id },
}: INewsDetailPageProps) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news/${_id}`,
    {
      cache: "reload",
    }
  )
    .then(async (res) => {
      const payload = await res.json();
      return payload;
    })
    .then(async (payload) => {
      const data = payload.data;
      return data;
    })
    .catch((error: unknown): null => {
      console.error(
        ">> Error:",
        error instanceof Error ? error.message : "unknown error"
      );
      return null;
    });
  if (!data) return notFound();

  return (
    <div className="min-h-screen">
      <main className="max-w-6xl mx-auto px-4 py-4">
        <div className="max-w-screen-xl mx-auto mt-8 grid grid-cols-12 gap-8">
          <div className="col-span-8">
            <h2 className="mb-5 font-bold">{data.title}</h2>
            <div className="text-gray-600 flex gap-2 mb-5 text-sm">
              <Image
                src={data?.owner?.avt}
                alt={data?.owner?.username}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border"
                unoptimized
              />
              <div>
                <p>
                  <span className="mr-1">Được đăng bởi</span>
                  <strong>{data?.owner?.username}</strong>
                </p>
                <div>
                  <span className="mr-2">
                    Cập nhật lần cuối vào{" "}
                    {new Date(data.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <article data-clarity-region="article">
              <div className="content-wrapper">
                <div
                  className="prose mt-4"
                  dangerouslySetInnerHTML={{ __html: data.content }}
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
}
