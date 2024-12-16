import { SeeMoreType2 } from "@/components/seeMore";
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
    <div className="min-h-screen w-full">
      <div className="max-w-6xl mx-auto mt-8 grid md:grid-cols-[2fr_1fr] grid-cols-1 gap-8">
        <div className="md:p-0 px-2">
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

        <aside className="">
          <div className="border rounded-lg p-4">
            <SeeMoreType2
              typeCard="news"
              title="Bài viết khác"
              linkFetch="/api/news?page=1"
              seeMoreLink="/news"
            />
          </div>
        </aside>
      </div>
    </div>
  );
}
