import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb"; // Import Breadcrumb components
import { Slash } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ params: { _id } }: { params: { _id: string } }) {
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
      <main className="max-w-6xl mx-auto px-4 py-4">
        <div className="w-full p-2 mb-4 mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <a href="/">Trang chủ</a>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <a href="/news">Tin tức</a>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <span>{data.title}</span>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

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
                <p>{data?.owner?.username}</p>
                <p>{new Date(data.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </div>
        </div>
      </main>
    </div>
  );
}
