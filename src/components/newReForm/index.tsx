"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ImageDropZone } from "@/components";
import TranslateKey from "@/lib/func/transfer";
import dynamic from "next/dynamic";
import { ENUM_MAP_MODE } from "@/utils";
import { toast } from "sonner";
import { uploadFilesToCloudinary } from "@/lib/func/cloudinary";
import { useState } from "react";
import Editor from "../rich-text/editor";
import { useRouter } from "next/navigation";
const LocationSelect = dynamic(
  () => import("@/components/VNLocationSelector"),
  { ssr: false, loading: () => <p>Loading...</p> }
);
const GisMap = dynamic(() => import("@/components/gis-map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const FormSchema = z.object({
  title: z.string().min(1, "Tên không được bỏ trống."),
  desc: z.string().min(1, "Mô tả không được bỏ trống."),
  imgs: z.array(z.string()).min(1, "Ít nhất một hình ảnh phải được tải lên."),
  type: z.enum(["land", "house"]).optional(),
  area: z.string().min(1, "Diện tích không được bỏ trống."),
  price: z.string().min(1, "Giá bán không được bỏ trống."),
  legal: z.enum(["sodo", "hopdong", "dangchoso", "khac", ""]).optional(),
  coordinates: z.tuple([z.number(), z.number()]),
  polygon: z.array(z.tuple([z.number(), z.number()])).optional(),
  locate: z
    .object({
      province: z.string().nullable().optional(),
      district: z.string().nullable().optional(),
      ward: z.string().nullable().optional(),
      street: z.string().nullable().optional(),
      wardId: z.string().nullable().optional(),
    })
    .superRefine((data, ctx) => {
      if (!data.province) {
        return ctx.addIssue({
          path: [],
          code: "custom",
          message: "Tỉnh không được để trống",
        });
      }

      if (!data.district) {
        ctx.addIssue({
          path: [],
          code: "custom",
          message: "Huyện không được để trống",
        });
      }
      if (!data.ward) {
        ctx.addIssue({
          path: [],
          code: "custom",
          message: "Xã không được để trống",
        });
      }
      if (!data.street) {
        ctx.addIssue({
          path: [],
          code: "custom",
          message: "Đường không được để trống",
        });
      }
    }),
  interior: z.enum(["noneInterior", "fullInterior"]).optional(),
  bed: z.number().optional(),
  bath: z.number().optional(),
  direction: z
    .enum([
      "nam",
      "bac",
      "tay",
      "dong",
      "taynam",
      "taybac",
      "dongbac",
      "dongnam",
    ])
    .optional(),
});

export default function InputForm({ urlReturn }: { urlReturn: string }) {
  const router = useRouter();
  const [mapZoomController, setZoomController] = useState<number | undefined>(undefined);
  const [mapCenterController, setCenterController] = useState<TPosition | undefined>(undefined);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      desc: "",
      type: undefined,
      area: "",
      price: "",
      legal: undefined,
      interior: undefined,
      bed: undefined,
      bath: undefined,
      direction: undefined,
      imgs: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const blobUrls = values.imgs; // Mảng blob URL
    if (!blobUrls || blobUrls.length === 0) {
      console.error("No images to process!");
      return;
    }

    const promise = async () => {
      const files = await Promise.all(
        blobUrls.map(async (blobUrl) => {
          const res = await fetch(blobUrl);
          const blob = await res.blob();
          const fileName = `image-${Date.now()}.jpeg`;
          return new File([blob], fileName, { type: blob.type });
        })
      );
      const uploadedUrls = await uploadFilesToCloudinary(files, "ie402/real-estates");
      const updatedValues = { ...values, imgs: uploadedUrls };
      const res = await fetch("/api/real-estates/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedValues),
      });

      if (!res.ok) throw new Error("Failed to add real estate.");
      const payload = await res.json();
      return payload.data;
    }

    toast.promise(promise(), {
      loading: "Uploading images and saving data...",
      success: (data) => {
        console.log("🚀 ~ toast.promise ~ data:", data)
        router.push(urlReturn);
        return "Real estate added successfully!"
      },
      error: "Failed to upload images or save data.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg space-y-2">
          <h2 className="font-semibold text-2xl border-l-8 border-teal-500 pl-2 text-zinc-900 dark:text-white">
            Thông tin cơ bản
          </h2>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Tiêu đề</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tiêu đề" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Mô tả</FormLabel>
                <FormControl>
                  <Editor content={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg space-y-2">
          <h2 className="font-semibold text-2xl border-l-8 border-teal-500 pl-2 text-zinc-900 dark:text-white">
            Hình ảnh
          </h2>
          <FormField
            control={form.control}
            name="imgs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Hình ảnh</FormLabel>
                <FormControl>
                  <ImageDropZone
                    value={field.value || []} // Đảm bảo giá trị mặc định là []
                    onChange={field.onChange} // Sử dụng field.onChange để cập nhật giá trị
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg space-y-2">
          <h2 className="font-semibold text-2xl border-l-8 border-teal-500 pl-2 text-zinc-900 dark:text-white">
            Thông tin chi tiết
          </h2>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Loại hình</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn loại hình" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="land">Đất</SelectItem>
                        <SelectItem value="house">Nhà</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="legal"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Giấy tờ</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn loại giấy tờ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="sodo">Sổ đỏ/ Sổ hồng</SelectItem>
                        <SelectItem value="hopdong">
                          Hợp đồng mua bán
                        </SelectItem>
                        <SelectItem value="dangchoso">Đang chờ sổ</SelectItem>
                        <SelectItem value="khac">Khác</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Diện tích</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập diện tích"
                    endIcon={
                      <span className="rounded-md bg-zinc-600 text-white">
                        Đơn vị: m²
                      </span>
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Giá bán</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập giá bán"
                    endIcon={
                      <span className="rounded-md bg-zinc-600 text-white">
                        Đơn vị: tỷ
                      </span>
                    }
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg space-y-2">
          <h2 className="font-semibold text-2xl border-l-8 border-teal-500 pl-2 text-zinc-900 dark:text-white">
            Thông tin khác
          </h2>
          <FormField
            control={form.control}
            name="interior"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Nội thất</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Nội thất" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {["noneInterior", "fullInterior"].map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {TranslateKey(item)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <FormField
              control={form.control}
              name="bed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Số phòng ngủ</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nhập số phòng ngủ"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bath"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Số phòng tắm</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nhập số phòng tắm"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="direction"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Hướng</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn loại hướng" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {[
                          "nam",
                          "bac",
                          "tay",
                          "dong",
                          "taynam",
                          "taybac",
                          "dongbac",
                          "dongnam",
                        ].map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {TranslateKey(item)}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg space-y-2">
          <h2 className="font-semibold text-2xl border-l-8 border-teal-500 pl-2 text-zinc-900 dark:text-white">
            Vị trí
          </h2>
          <FormField
            control={form.control}
            name="locate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Địa điểm</FormLabel>
                <FormControl>
                  <LocationSelect
                    {...field}
                    setZoomController={setZoomController}
                    setCenterController={setCenterController}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coordinates"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Vị trí</FormLabel>
                <FormControl>
                  <GisMap
                    isShowDistrict
                    className="min-h-[30rem] flex items-stretch"
                    {...mapZoomController ? { zoom: mapZoomController } : {}}
                    {...mapCenterController ? { center: mapCenterController } : {}}
                    mode={ENUM_MAP_MODE.Edit}
                    value={field.value?.slice(0, 2) as [number, number]}
                    onChange={field.onChange}
                    onPolygonComplete={(value) =>
                      form.setValue("polygon", value)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="sticky bottom-0 p-2">
          <Button type="submit" className="w-full">
            Gửi
          </Button>
        </div>
      </form>
    </Form>
  );
}
