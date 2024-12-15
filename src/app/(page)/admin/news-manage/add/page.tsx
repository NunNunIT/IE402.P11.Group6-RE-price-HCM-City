"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { ImageDropZone } from "@/components"; // Import ImageDropZone component
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation

const FormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
  owner: z.string().min(1, "Owner is required."), // Add owner field
  imageUrls: z.array(z.string()).min(1, "At least one image must be uploaded."), // Add imageUrls field
});

export default function NewsForm() {
  const router = useRouter(); // Initialize useRouter
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
      owner: "", // Add default value for owner
      imageUrls: [], // Add default value for imageUrls
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      console.log("Form submitted with values:", values);
      const response = await fetch("/api/news-manage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response body:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to create news");
      }

      toast({
        title: "News created successfully",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(result.data, null, 2)}</code>
          </pre>
        ),
      });

      router.push("/admin/news-manage"); // Navigate to news-manage page
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative max-w-5xl w-full mx-auto mt-3">
      <h1 className="md:text-4xl text-2xl font-bold my-3 text-left">Tạo tin tức mới</h1>
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
                    <Textarea placeholder="Nhập nội dung" {...field} className="min-h-[200px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="owner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Owner</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập owner" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageUrls"
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
