import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { ChangeEvent, useCallback } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

const putUserAvatar = async (url: string, { arg }: { arg: File }) => {
  const formData = new FormData();
  formData.append("avt", arg);
  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update avatar");
  const payload = await res.json();
  return payload.data;
}

export default function PersonalAvatar({ data, className }: { data: any, className?: string }) {
  const { update } = useSession();
  const { trigger } = useSWRMutation("/api/users/me", putUserAvatar);

  const handleImageChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file) return;

    toast.promise(trigger(file), {
      loading: "Đang đăng ảnh...",
      success: (data) => {
        update({ picture: data.avt });
        return "Hình đại diện được cập nhật thành công";
      },
      error: () => "Cập nhật thất bại",
      finally: () => { e.target.value = '' }
    });
  }, [trigger, update]);

  return (
    <div className={cn("flex flex-col items-center h-fit w-fit", className)}>
      <Avatar className="!size-20 max-sm:!size-28">
        <AvatarImage src={data?.avt ?? '#'} alt={data?.username ?? 'unknown'} />
        <AvatarFallback>{(data?.username ?? 'u')[0]}</AvatarFallback>
      </Avatar>
      <Button size="icon" variant="outline" className="!size-8 absolute bottom-0 right-0">
        <label htmlFor="imageChanged" className="absolute inset-0 z-50" />
        <Pencil className="size-4" />
        <input
          id="imageChanged"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </Button>
    </div>
  )
}