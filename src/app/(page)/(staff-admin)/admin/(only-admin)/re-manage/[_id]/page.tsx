import { FaLocationDot } from "react-icons/fa6";
import { ImageViewType1 } from "@/components/imageView";
import { SaveRealBtn } from "@/components";
import { notFound } from "next/navigation";
import translateKey from "@/lib/func/transfer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CustomizeMap } from "./components";

interface IRealEstateDetailPageProps extends IDefaultPageProps {
  params: { _id: string };
}

export async function generateMetadata({
  params: { _id },
}: IRealEstateDetailPageProps) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/real-estates/${_id}`, {
    cache: "reload"
  }).then(async (res) => {
    const payload = await res.json();
    return payload.data;
  })
    .catch((error): null => {
      console.error("🚀 ~ .catch ~ error", error.message);
      return null;
    });

  if (!data) return {};

  return {
    title: data.title,
    description: data.desc,
    openGraph: {
      title: data.title,
      description: data.desc,
      images: data.imageUrls,
    },
  };
}

export default async function RealEstateDetailPage({
  params: { _id },
}: IRealEstateDetailPageProps) {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/real-estates/${_id}`, {
    cache: "reload"
  }).then(async (res) => {
      const payload = await res.json();
      return payload.data;
    })
    .catch((error): null => {
      console.error("🚀 ~ .catch ~ error", error.message);
      return null;
    });
  if (!data) return notFound();

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 min-h-[100dvh] w-full mx-auto p-3">
      <div className="w-full h-full bg-white dark:bg-zinc-900 space-y-6 pr-3">
        <ImageViewType1 images={data.imageUrls} />

        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-3xl leading-10">
            {data?.isAuth == "auth" && (
              <span className="h-full bg-green-700 rounded-md px-1 py-1 text-white text-base mr-2 align-middle">
                Xác thực
              </span>
            )}
            {data.title}
          </h1>
          <div className="flex flex-row gap-2 items-center font-semibold">
            <FaLocationDot />
            <span>
              {data.locate?.diachi}, {data.locate?.xa}, {data.locate?.huyen},{" "}
              {data.locate?.tinh}
            </span>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center gap-6">
          <div className="flex flex-row gap-8">
            <div className="flex flex-col">
              <span className="text-zinc-600 dark:text-zinc-400">Giá</span>
              <span className="font-semibold text-red-600 dark:text-red-500 text-xl">
                {data.price} tỷ
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-600 dark:text-zinc-400">
                Diện tích
              </span>
              <span className="font-semibold text-red-600 dark:text-red-500 text-xl">
                {data.area} m<sup>2</sup>
              </span>
            </div>
          </div>

          <SaveRealBtn component="real-estate" realEstateId={data._id} />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl">Đặc điểm bất động sản</h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(data?.info ?? {}).map(([key, value], index) => (
              <div
                key={index}
                className="py-2 flex flex-row justify-between items-center border-y-2 border-y-zinc-200 dark:border-y-zinc-800"
              >
                <span className="font-semibold">{translateKey(key)}</span>
                <span>
                  {typeof value === "number"
                    ? value
                    : translateKey(value as string)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl">Thông tin mô tả</h2>
          <div dangerouslySetInnerHTML={{ __html: data.desc }} />
        </div>

        <div className="rounded-lg border-2 border-zinc-200 dark:border-zinc-800 p-3">
          <h2 className="font-bold text-xl mb-1">Liên hệ</h2>
          <div className="flex flex-row">
            <Avatar>
              <AvatarImage
                src={
                  data.owner?.avt ??
                  "https://cdn.caohockinhte.edu.vn/wp-content/uploads/2024/10/avatar-vo-tri-cute-meo-1.jpg"
                }
              />
              <AvatarFallback>
                {data.owner?.username?.[0] ?? "U"}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 flex flex-col justify-center">
              <p className="font-semibold text-lg">
                {data.owner?.username ?? "Tên"}
              </p>
              {!!data.owner?.phone && (
                <p className="text-sky-500">{data.owner?.phone}</p>
              )}
              <a
                href={`mailto:${data.owner?.email ?? "123@gmail.com"}`}
                className="text-zinc-500 hover:text-sky-500 no-underline"
              >
                {data.owner?.email ?? "123@gmail.com"}
              </a>
            </div>
            <div className="flex flex-col ml-auto gap-2">
              {!!data.owner?.phone && <Button size="sm">Gọi điện</Button>}
              <Button
                variant="secondary"
                size="sm"
                href={`mailto:${data.owner?.email ?? "123@gmail.com"}`}
              >
                Gửi mail
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CustomizeMap
        title={data.title}
        locate={data.locate}
        polygon={data.polygon?.points ?? []}
      />
    </div>
  );
}
