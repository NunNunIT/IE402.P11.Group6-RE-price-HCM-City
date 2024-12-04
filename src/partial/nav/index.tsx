import { AuthenticationDropdownMenu } from "@/components/customize-ui/authentication-dropdown-menu";
import { Button } from "@/components/ui/button";
import { HiHomeModern } from "react-icons/hi2";
import { LoginButton } from "@/components/customize-ui/authentication-button";
import { PlusIcon } from "lucide-react";
import { Sidebar } from "@/components/customize-ui/sidebar";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <div className="sticky bg-white/95 dark:bg-black/90 top-0 w-full h-[5rem] z-[50]">
      <div className="md:px-6 px-3 max-w-8xl mx-auto h-full flex justify-between items-center">
        <div className="flex gap-3 justify-start items-center">
          <Link href="/" className="flex gap-2 justify-center items-center">
            <HiHomeModern className="size-8 text-black dark:text-white" />
            <span className="font-extrabold text-xl text-black dark:text-white">
              Batdongsan
            </span>
          </Link>

          <div className="md:flex ml-6 gap-3 hidden">
            <Button
              href="/real-estate"
              variant="ghost"
              className="font-semibold"
            >
              Bất động sản
            </Button>
            <Button href="/analysis" variant="ghost" className="font-semibold">
              Biến động
            </Button>
            <Button href="/news" variant="ghost" className="font-semibold">
              Tin tức
            </Button>
          </div>
        </div>

        <div className="gap-3 md:flex hidden">
          <Button
            href="/create-new-re"
            startIcon={<PlusIcon className="size-6" />}
          >
            Đăng tin
          </Button>
          <LoginButton>Đăng nhập</LoginButton>
          <AuthenticationDropdownMenu />
        </div>

        <div className="md:hidden block">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
