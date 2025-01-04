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
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const DEFAULT_NEWS_FORM = {
  title: "",
  content: "",
  imgUrl: "",
} as const;

const FormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
  imgUrl: z.string().url("Invalid URL").optional(),
});

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    cache: "reload"
  });
  if (!res.ok) throw new Error("Failed to fetch data");
  const payload = await res.json();
  return payload.data;
}

export default function NewsEdit({ params: { id } }: { params: { id: string } }) {
  const router = useRouter();
  const { data, isLoading, error } = useSWR(`/api/news/${id}`, fetcher);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: DEFAULT_NEWS_FORM,
  });

  useEffect(() => {
    if (!data) return;
    form.reset({
      title: data.title,
      content: data.content,
      imgUrl: data.imgUrl
    })
  }, [data, form]);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const res = await fetch(`/api/news-manage`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...values }),
      });

      if (!res.ok) throw new Error("Failed to update news");

      toast({
        title: "News updated successfully",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(values, null, 2)}</code>
          </pre>
        ),
      });

      router.push("/admin/news-manage");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="relative max-w-5xl w-full mx-auto my-3">
      <h1 className="md:text-4xl text-2xl font-bold my-3 text-left">
        Sửa tin tức
      </h1>
      {isLoading || error ? (
        <div>Loading...</div>
      ) : (
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
                      <Input {...field} disabled={form.formState.isSubmitting} />
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
                      <Textarea
                        {...field}
                        className="min-h-[200px]"
                        disabled={form.formState.isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imgUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={form.formState.isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sticky bottom-0 p-2 bg-white dark:bg-zinc-900 w-full flex justify-between">
              <Button
                type="button"
                className="w-full mr-2 bg-white text-black border border-black hover:bg-gray-100"
                onClick={router.back}
              >
                Hủy
              </Button>
              <Button type="submit" className="w-full" disabled={!form.formState.isDirty || form.formState.isSubmitting}>
                Cập nhật
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
