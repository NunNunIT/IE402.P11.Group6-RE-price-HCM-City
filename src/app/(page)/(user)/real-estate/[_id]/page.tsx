import { Button } from "@/components/ui/button";
import { FaLocationDot } from "react-icons/fa6";
import { GISMap, SaveBtn } from "@/components";
import { ImageViewType1 } from "@/components/imageView";
import Image from "next/image";
import TranslateKey from "@/lib/func/transfer";

export default function Page() {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 min-h-[100dvh] w-full mx-auto">
      <div className="w-full h-full bg-white dark:bg-zinc-900 p-3 space-y-6">
        <ImageViewType1 />
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-3xl">
            Hiếm - khu vip nhà 4T - HXH - gần mặt tiền - Nguyễn Thái Sơn -
            44m2(4.2 x 10.5) - nhỉnh 7 tỷ
          </h1>
          <div className="flex flex-row gap-2 items-center font-semibold">
            <FaLocationDot />
            <span>Đường Nguyễn Thái Sơn, Phường 5, Gò Vấp, Hồ Chí Minh</span>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center gap-6">
          <div className="flex flex-row gap-8">
            <div className="flex flex-col">
              <span className="text-zinc-600 dark:text-zinc-400">Giá</span>
              <span className="font-semibold text-red-600 dark:text-red-500 text-xl">
                500000
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-zinc-600 dark:text-zinc-400">
                Diện tích
              </span>
              <span className="font-semibold text-red-600 dark:text-red-500 text-xl">
                50 m<sup>2</sup>
              </span>
            </div>
          </div>
          <SaveBtn component="real-estate" />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="font-bold text-xl">Thông tin mô tả</h2>
          <div className="">
            Vị trí: 1/ Gò Dầu, P. Tân Quý, Q. Tân Phú. Hẻm 4,5m, cách mặt tiền
            chỉ 4 căn nhà, cách AEON MALL Tân Phú chỉ 400m, nhiều tiện ích xung
            quanh. DT: 45m² (4,5*10m). Kết cấu: Trệt + 1 Lầu. Nhà có 2 PN + 2
            WC. Nhà mới đẹp. Vào ở ngay. Sổ hồng riêng. LH Kỳ Duyên để xem nhà
            trực tiếp.
          </div>
        </div>

        <div className="flex flex-col gap-3">
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
        </div>

        <div className="rounded-lg border-2 border-zinc-200 dark:border-zinc-800 p-3">
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
        </div>
      </div>
      <GISMap className="container" />
    </div>
  );
}
