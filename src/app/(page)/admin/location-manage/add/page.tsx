"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageDropZone } from "@/components";
import { ENUM_MARKER_SYMBOL } from "@/utils";
import { dataService } from "@/data/select";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ENUM_MAP_MODE } from "@/utils";
const GisMap = dynamic(() => import("@/components/gis-map"), {
  ssr: false,
  loading: () => <>Loading...</>,
});

const cateEnum = Object.values(ENUM_MARKER_SYMBOL);
const FormSchema = z.object({
  ggMapId: z.string().min(1, "mapId không được bỏ trống."),
  ggMapUrl: z.string().min(1, "mapUrl không được bỏ trống."),
  title: z.string().min(1, "Title không được bỏ trống."),
  desc: z.string(),
  category: z.enum(cateEnum as unknown as [string, ...string[]]).optional(),
  locate: z.tuple([z.number(), z.number()]),
  imageUrls: z
    .array(z.string())
    .min(1, "Ít nhất một hình ảnh phải được tải lên."),
  avgStarGGMap: z.number().min(0).max(5),
  exts: z.array(
    z.enum([
      "air_conditioning",
      "open_24_7",
      "suitable_for_groups",
      "child_area",
      "private_room",
      "child_friendly",
      "pet_friendly",
      "parking",
      "restroom",
      "outdoor_seating",
      "free_parking",
      "accepts_cards",
      "romantic_style",
      "special_occasion",
      "family_friendly",
      "wifi_available",
      "delivery",
      "music_available",
      "on_site_sales",
      "takeout",
      "reservations",
      "smoking_area",
    ])
  ),
});
export default function AddLocation() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ggMapId: "",
      ggMapUrl: "",
      title: "",
      desc: "",
      category: cateEnum.find((cate) => cate === ENUM_MARKER_SYMBOL.DEFAULT),
      imageUrls: [],
      exts: [],
      avgStarGGMap: 0,
    },
  });

  const router = useRouter();

  const extOption = dataService.options.map((option) => {
    return { label: option.value, value: option.value };
  });

  const handleImageUpload = async (newImages: (string | File)[]) => {
    return Promise.all(
      newImages.map(async (image) => {
        if (typeof image === "string" && image.startsWith("blob:")) {
          // Nếu là blob URL, chuyển thành File
          const blob = await fetch(image).then((res) => res.blob()); // Lấy blob từ URL
          const file = new File([blob], `image-${Date.now()}.jpg`, {
            type: blob.type,
          });

          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", "location-upload");

          // Gọi API của bạn để upload
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cloudinary`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error("Error uploading image");
          }
          const result = await response.json();

          return result.url; // Trả về URL đã upload
        }
        return image; // Nếu là File, không cần xử lý gì
      })
    );
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const uploadedImageUrls = await handleImageUpload(values.imageUrls);

      // Tạo dữ liệu body mới cho API
      const addValues = {
        ...values,
        imageUrls: uploadedImageUrls, // Thay thế imageUrls bằng URL đã upload
      };

      const result = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/location`,
        {
          method: "POST",
          body: JSON.stringify(addValues),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      // Kiểm tra nếu yêu cầu không thành công
      if (!result.ok) {
        throw new Error(`Failed to submit data: ${result.statusText}`);
      }

      // Xử lý kết quả thành công
      const responseData = await result.json();
      console.log(responseData);
      toast({
        title: "Thêm địa điểm thành công",
        description: "địa điểm đã đưuọc thêm",
      });

      router.push("/admin/location-manage");
    } catch (error) {
      // Xử lý lỗi khi upload hoặc gửi yêu cầu
      console.error("Error during form submission:", error);
      toast({
        title: "Error submitting form",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center p-5 min-h-[100dvh]">
      <div className="relative max-w-5xl w-full mx-auto my-3">
        <h1 className="md:text-4xl text-2xl font-bold my-3 text-center">
          Tạo Location
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg space-y-2">
              <FormField
                control={form.control}
                name="ggMapId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Google map id
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập ggMapId" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ggMapUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Google map url
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập ggMapUrl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg space-y-2">
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
                      <Textarea placeholder="Nhập mô tả" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Loại địa điểm
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn loại địa điểm" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {Object.values(ENUM_MARKER_SYMBOL).map((symbol) => (
                              <SelectItem key={symbol} value={symbol}>
                                {symbol}
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
              <FormField
                control={form.control}
                name="exts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thêm các thành phẩn mở rộng</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        defaultOptions={extOption}
                        value={field.value.map((value) => ({
                          label: value,
                          value,
                        }))}
                        onChange={(options) =>
                          field.onChange(options.map((option) => option.value))
                        }
                        placeholder="Chọn các thành phần mở rộng của địa điểm..."
                        emptyIndicator={
                          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                            no results found.
                          </p>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg">
              <FormField
                control={form.control}
                name="locate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Vị trí</FormLabel>
                    <FormControl>
                      <GisMap
                        isShowDistrict
                        className="min-h-[30rem] flex items-stretch"
                        zoom={15}
                        mode={ENUM_MAP_MODE.Edit}
                        value={field.value?.slice(0, 2) as [number, number]}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg space-y-2">
              <FormField
                control={form.control}
                name="imageUrls"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Hình ảnh</FormLabel>
                    <FormControl>
                      <ImageDropZone
                        value={field.value || []} // Đảm bảo giá trị mặc định là []
                        onChange={(newImages) => {
                          // Kết hợp các ảnh mới với ảnh cũ
                          const updatedImages = [...field.value, ...newImages];
                          field.onChange(updatedImages);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg space-y-2">
              <FormField
                control={form.control}
                name="avgStarGGMap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">
                      Số sao đánh giá trung bình
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0} // Giá trị nhỏ nhất
                        max={5} // Giá trị lớn nhất
                        step={0.1} // Chỉ chấp nhận các số cách nhau 0.5
                        placeholder="Nhập đánh giá trung bình"
                        {...field}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) {
                            field.onChange(value); // Chỉ gọi khi giá trị hợp lệ
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="sticky bottom-0 p-2 z-10 bg-white">
              <Button type="submit" className="w-full">
                Gửi
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
