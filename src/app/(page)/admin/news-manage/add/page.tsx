"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import { ImageDropZone } from "@/components"; // Import ImageDropZone component
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import Editor from "@/components/rich-text/editor";
import { uploadFilesToCloudinary } from "@/lib/func/cloudinary";

const FormSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được bỏ trống"),
  content: z.string().min(1, "Nội dung không được bỏ trống"),
  img: z.array(z.string()).min(1, "Ít nhất một ảnh"), // Add imageUrls field
});

export default function NewsForm() {
  const router = useRouter(); // Initialize useRouter
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      img: [], // Add default value for imageUrls
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const blobUrls = values.img; // Mảng blob URL
    if (!blobUrls || blobUrls.length === 0) {
      console.error("No images to process!");
      return;
    }
  
    try {
      // Bước 1: Chuyển đổi blob URLs thành File
      const files = await Promise.all(
        blobUrls.map(async (blobUrl) => {
          const res = await fetch(blobUrl);
          const blob = await res.blob();
          const fileName = `image-${Date.now()}.jpeg`;
          return new File([blob], fileName, { type: blob.type });
        })
      );
  
      console.log("Files converted from blob URLs:", files);
  
      // Bước 2: Upload files lên Cloudinary
      const uploadedUrls = await uploadFilesToCloudinary(files, "ie402/news");
      console.log("Uploaded URLs from Cloudinary:", uploadedUrls);
  
      // Bước 3: Thay thế imgs trong form
      const updatedValues = {
        ...values,
        img: uploadedUrls,
      };
  
      console.log("Updated form values:", updatedValues);
  
      // Bước 4: Gửi dữ liệu tới API `/api/real-estate/add`
      const response = await fetch('/api/news-manage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues), // Gửi dữ liệu dạng JSON
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("API Response:", result);
        toast.success("Real estate added successfully!");
        router.push("/admin/news-manage")
      } else {
        const error = await response.json();
        console.error("API Error:", error);
        toast.error(`Failed to add real estate: ${error.message}`);
      }
    } catch (error) {
      console.error("Error processing images:", error);
      toast.error("Failed to upload images or save data.");
    }
  };

  return (
    <div className="relative max-w-5xl w-full mx-auto mt-3">
      <h1 className="md:text-4xl text-2xl font-bold my-3 text-left">
        Tạo tin tức mới
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white dark:bg-zinc-900 p-4 rounded-lg shadow-md">
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
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Nội dung</FormLabel>
                  <FormControl>
                    <Editor content={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Hình ảnh</FormLabel>
                  <FormControl>
                    <ImageDropZone
                      value={field.value || []} // Ensure default value is an array
                      onChange={field.onChange} // Use field.onChange to update value
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sticky bottom-0 p-2 bg-white dark:bg-zinc-900 w-full">
            <Button type="submit" className="w-full">
              Đăng tải
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
