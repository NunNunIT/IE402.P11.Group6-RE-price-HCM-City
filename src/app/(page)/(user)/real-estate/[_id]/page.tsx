import { ENUM_MARKER_SYMBOL } from "@/utils";
import { FaLocationDot } from "react-icons/fa6";
import { ImageViewType1 } from "@/components/imageView";
import { SaveRealBtn } from "@/components";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const GISMap = dynamic(() => import("@/components/gis-map"), { ssr: false });

interface IRealEstateDetailPageProps extends IDefaultPageProps {
  params: { _id: string };
}

export default async function RealEstateDetailPage({
  params: { _id },
}: IRealEstateDetailPageProps) {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/real-estates/${_id}`
  )
    .then(async (res) => {
      const payload = await res.json();
      return payload;
    })
    .then(async (payload) => {
      const data = payload.data;
      return data;
    })
    .catch((error) => {
      console.error("🚀 ~ .catch ~ error", error.message);
      return null;
    });
  if (!data) return notFound();

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 min-h-[100dvh] w-full mx-auto p-3">
      <div className="w-full h-full bg-white dark:bg-zinc-900 space-y-6 pr-3">
        <ImageViewType1 images={data.imageUrl} />
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-3xl">{data.title}</h1>
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
          <h2 className="font-bold text-xl">Thông tin mô tả</h2>
          <div className="">{data.desc}</div>
        </div>

        {/* <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl">Đặc điểm bất động sản</h2>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries({
              legal: "sodo",
              direction: "nam",
              bedroom: 2,
              bathroom: 1,
            }).map(([key, value], index) => (
              <div
                key={index}
                className="py-2 flex flex-row justify-between items-center border-y-2 border-y-zinc-200 dark:border-y-zinc-800"
              >
                <span className="font-semibold">{TranslateKey(key)}</span>
                <span>
                  {typeof value === "number" ? value : TranslateKey(value)}
                </span>
              </div>
            ))}
          </div>
        </div> */}

        {/* <div className="rounded-lg border-2 border-zinc-200 dark:border-zinc-800 p-3">
          <h2 className="font-bold text-xl mb-1">Liên hệ</h2>
          <div className="flex flex-row">
            <Image
              src="https://cdn.caohockinhte.edu.vn/wp-content/uploads/2024/10/avatar-vo-tri-cute-meo-1.jpg"
              width={100}
              height={100}
              className="object-cover w-20 h-20 rounded-full overflow-hidden"
              alt="User Avatar"
            />
            <div className="ml-4 flex flex-col justify-center">
              <p className="font-semibold text-lg">Tên</p>
              <p className="text-sky-500">0987296708</p>
              <a
                href="mailto:123@gmail.com"
                className="text-zinc-500 hover:text-sky-500 no-underline"
              >
                123@gmail.com
              </a>
            </div>
            <div className="flex flex-col">
              <Button>Gọi điện</Button>
              <Button variant="secondary" href="mailto:123@gmail.com">
                Gửi mail
              </Button>
            </div>
          </div>
        </div> */}
      </div>
      <GISMap
        zoom={20}
        className="container"
        center={data.locate}
        points={[
          {
            ...data.locate,
            title: data.title,
            type: ENUM_MARKER_SYMBOL.REAL_ESTATE,
          },
        ]}
      />
    </div>
  );
}
