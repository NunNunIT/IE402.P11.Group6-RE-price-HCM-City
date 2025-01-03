import Image from "next/image";
import { notFound } from "next/navigation";
import { SeeMoreType2 } from "@/components/seeMore";
import { CommentSection } from "@/components";

export async function generateMetadata({
  params: { _id },
}: {
  params: { _id: string };
}) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news/${_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "reload",
  })
    .then(async (res) => {
      const payload = await res.json();
      return payload;
    })
    .then(async (payload) => {
      const data = payload.data;
      return data;
    })
    .catch((error): null => {
      console.error(
        ">> Error:",
        error instanceof Error ? error.message : "unknown error"
      );
      return null;
    });

  if (!data) return { title: "News Not Found" };

  return {
    title: data.title,
    description: data.description,
  };
}

export default async function NewsDetailPage({
  params: { _id },
}: {
  params: { _id: string };
}) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news/${_id}`
  )
    .then(async (res) => {
      const payload = await res.json();
      return payload;
    })
    .then(async (payload) => {
      const data = payload.data;
      return data;
    })
    .catch((error): null => {
      console.error(
        ">> Error:",
        error instanceof Error ? error.message : "unknown error"
      );
      return null;
    });
  if (!data) return notFound();

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-4 grid md:grid-cols-[3fr_1fr] grid-cols-1 gap-8">
        <div className="w-full mx-auto mt-8 gap-8">
          <div className="space-y-6">
            <h2 className="font-bold">{data.title}</h2>
            <div className="text-gray-600 flex gap-2 text-sm">
              <Image
                src={data?.owner?.avt}
                alt={data?.owner?.username}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border"
                unoptimized
              />
              <div>
                <p>{data?.owner?.username}</p>
                <p>{new Date(data.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
            <CommentSection />
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <SeeMoreType2
            typeCard="news"
            title="Bài viết khác"
            linkFetch="/api/news?page=1"
            seeMoreLink="/news"
          />
        </div>
      </div>
    </div>
  );
}
