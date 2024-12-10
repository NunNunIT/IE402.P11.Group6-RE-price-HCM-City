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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageDropZone } from "@/components";

const FormSchema = z.object({
  ggMapId: z.string().min(1, "mapId không được bỏ trống."),
  ggMapUrl: z.string().min(1, "mapUrl không được bỏ trống."),
  title: z.string().min(1, "title không được bỏ trống."),
  desc: z.string(),
  categories: z.enum(["cate1", "cate2", "cate3", "cate4"]).optional(),
  locate: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    ward: z.string(),
  }),
  imageUrls: z.array(z.string()).min(1, "Ít nhất một hình ảnh phải được tải lên."),
  exts: z.array(z.string()),
});
export default function AddLocation() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ggMapId: "",
      ggMapUrl: "",
      title: "",
      desc: "",
      categories: "cate1",
      locate: {
        lat: 0,
        lng: 0,
        ward: "",
      },
      imageUrls: [],
      exts: [],
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  };


  return (
    <div className="flex flex-col items-center p-5 min-h-[100dvh]">
      <div className="relative max-w-5xl w-full mx-auto my-3">
        <h1 className="md:text-4xl text-2xl font-bold my-3 text-center">
          Sửa Location
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg space-y-2">
              <FormField
                control={form.control}
                name="ggMapId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">google map id</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập ggMapId" {...field}/>
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
                    <FormLabel className="font-semibold">google map url</FormLabel>
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
                      <Input placeholder="Nhập mô tả" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Loại địa điểm</FormLabel>
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
                        onChange={field.onChange} // Sử dụng field.onChange để cập nhật giá trị
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg space-y-2">
              
            </div>

            <div className="sticky bottom-0 p-2">
              <Button type="submit" className="w-full">
                Sửa
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
