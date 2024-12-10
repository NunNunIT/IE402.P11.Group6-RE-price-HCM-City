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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content is required."),
});

interface Params {
  id: string;
}

export default function NewsEdit({ params }: { params: Params }) {
  const router = useRouter();
  const [newsData, setNewsData] = useState<{
    title: string;
    content: string;
  } | null>(null);

  useEffect(() => {
    // Giả lập fetch dữ liệu
    const fetchNewsData = async () => {
      const defaultData = {
        title: "Gem Park - Lợi Cho Người Ở, Lãi Cho Người Đầu Tư",
        content: "Trong số gần 150 booking đầu tiên tại Gem Park tháng 11 mới đây có vợ chồng bác sĩ Hoài Thu. Cậu con trai duy nhất đi du học bên Đức, anh chị quyết định bán căn nhà nhỏ trong ngõ để mua 2 căn hộ Gem Park, 1 căn 3 phòng ngủ để ở và 1 căn 2 phòng ngủ để đầu tư. Do lịch thanh toán nhẹ nhàng nên khoản tín dụng trong ngân hàng vẫn giữ được 2 năm cho đến kỳ thanh toán cuối, đảm bảo cho nhu cầu học tập của cậu con trai cưng lẫn chi phí sinh hoạt. Giống như vợ chồng chị Hoài Thu, những người Hải Phòng thành đạt sau những năm tháng tập trung cho sự nghiệp và gia đình, giờ đây họ muốn sống chậm, thư thái và tận hưởng. Một không gian sống sang trọng, tiện nghi, gần trung tâm cũ – nơi có những góc phố chứa đầy kỷ niệm cùng quán xá với hương vị thân quen và trung tâm mới, nơi sẽ diễn ra những hoạt động lễ hội của thành phố sẽ là chốn an dưỡng lý tưởng. Chỉ cách trung tâm cũ và trung tâm mới 8 phút di chuyển, Gem Park cũng nằm ở vị trí khá lý tưởng cho người trẻ muốn tối ưu thời gian cho cả ba nhu cầu: sống – làm việc – giải trí. “Có tới 56 tiện ích bao quanh căn hộ, tất cả nhu cầu thường nhật của một con người hiện đại: nghỉ ngơi, làm việc, học tập, vui chơi, rèn luyện thể chất, phát triển và kết nối – đều ở ngay bên cạnh, muốn tiếp cận chỉ cần một nút chạm.” – Quỳnh Anh, một chuyên viên quản lý quỹ đầu tư sinh năm 1994 cho biết lý do cô muốn trở thành cư dân Gem Park. Với số tiền tích lũy sau 6 năm làm việc cho một công ty đa quốc gia, Quỳnh Anh dễ dàng sở hữu căn hộ với khoản thanh toán ban đầu 480 triệu (tương đương 20% giá trị căn hộ). Ngân hàng hỗ trợ 65%, lãi suất 0% cho đến khi nhận nhà vào năm 2026, vì vậy với mức lương khá cao của vị trí quản lý của tập đoàn đa quốc gia và chi tiêu tiết kiệm tại Hải Phòng, Quỳnh Anh có thể thong dong cho đến ngày nhận nhà. Bàn giao căn hộ thanh toán 10%. Nhận sổ hồng thanh toán 5%. Bên cạnh đó, khách hàng còn được hưởng lợi nhân đôi 50 triệu đồng khi booking không hoàn lại và nhận ưu đãi đến 6%.",
      };
      setNewsData(defaultData);
    };

    fetchNewsData();
  }, []);


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (newsData) {
      form.reset({
        title: newsData.title,
        content: newsData.content,
      });
    }
  }, [newsData, form]);

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    toast({
      title: "News updated successfully",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  };

  if (!newsData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative max-w-5xl w-full mx-auto my-3">
      <h1 className="md:text-4xl text-2xl font-bold my-3 text-center">
        Sửa tin tức
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
                    <Input
                      // placeholder="Nhập tiêu đề"
                      {...field}
                    />
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
                      // placeholder="Nhập nội dung"
                      {...field}
                      className="min-h-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="sticky bottom-0 p-2 bg-white dark:bg-zinc-900 w-full flex justify-between">
            <Button type="button" className="w-full mr-2 bg-white text-black border border-black hover:bg-gray-100" onClick={() => router.push('/admin/news-manage')}>
              Hủy
            </Button>
            <Button type="submit" className="w-full">
              Cập nhật
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}