"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
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
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z.object({
  title: z.string().min(1, "Tên không được bỏ trống."),
  desc: z.string().min(1, "Mô tả không được bỏ trống."),
  imgs: z.array(z.string()).min(1, "Ít nhất một hình ảnh phải được tải lên."),
  type: z.enum(["land", "house"]).optional(),
  area: z.string().min(1, "Diện tích không được bỏ trống."),
  price: z.number().min(1, "Giá bán không được bỏ trống."),
  legal: z.enum(["sodo", "hopdong", "dangchoso", "khac", ""]).optional(),
  interior: z.string().optional(),
  bedroom: z.number().optional(),
  bathroom: z.number().optional(),
  direction: z.string().optional(),
});

export default function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      desc: "",
      type: undefined,
      area: "",
      price: undefined,
      legal: undefined,
      interior: "",
      bedroom: undefined,
      bathroom: undefined,
      direction: "",
      imgs: [],
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
    <div className="max-w-5xl w-full mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiêu đề</FormLabel>
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
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea placeholder="Nhập mô tả" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loại hình</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
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
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diện tích</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập diện tích" {...field} />
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
                <FormLabel>Giá bán</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập giá bán"
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
            name="legal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giấy tờ</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
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
            name="interior"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nội thất</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập nội thất (nếu có)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bedroom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số phòng ngủ</FormLabel>
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
            name="bathroom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số phòng tắm</FormLabel>
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

          <FormField
            control={form.control}
            name="direction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hướng</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập hướng" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imgs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hình ảnh</FormLabel>
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

          <Button type="submit" className="w-full">
            Gửi
          </Button>
        </form>
      </Form>
    </div>
  );
}
