import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="sticky top-0 w-full h-[5rem] flex justify-between items-center">
        <div className="flex gap-3">
            <span>Logo</span>
        </div>
        <div className="flex gap-3">
            <Link href="#">Bất động sản</Link>
            <Link href="#">Địa điểm</Link>
            <Link href="#">Tin tức</Link>
        </div>

        <div className="flex gap-3">
            <Button startIcon={<PlusIcon className="size-6" />}>Đăng tin</Button>
            <Button>Đăng nhập</Button>
        </div>
    </div>
  );
}
