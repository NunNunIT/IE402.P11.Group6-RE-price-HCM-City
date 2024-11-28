import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { AuthenticationDropdownMenu } from "@/components/customize-ui/authentication-dropdown-menu";
import { Button } from "@/components/ui/button";
import { FaBars } from "react-icons/fa6";
import { HiHomeModern } from "react-icons/hi2";
import { LoginButton } from "@/components/customize-ui/authentication-button";
import { PlusIcon } from "lucide-react";

export default function NavBar() {
  return (
    <div className="sticky bg-white/95 dark:bg-black/90 top-0 w-full h-[5rem] z-[50]">
      <div className="md:px-6 px-3 max-w-8xl mx-auto h-full flex justify-between items-center">
        <div className="flex gap-3 justify-start items-center">
          <div className="flex gap-2 justify-center items-center">
            <HiHomeModern className="size-8 text-black dark:text-white" />
            <span className="font-extrabold text-xl text-black dark:text-white">
              Batdongsan
            </span>
          </div>

          <div className="md:flex ml-6 gap-3 hidden">
            <Button href="#" variant="ghost" className="font-semibold">
              Bất động sản
            </Button>
            <Button href="#" variant="ghost" className="font-semibold">
              Tin tức
            </Button>
          </div>
        </div>

        <div className="gap-3 md:flex hidden">
          <Button startIcon={<PlusIcon className="size-6" />}>Đăng tin</Button>
          <LoginButton>Đăng nhập</LoginButton>
          <AuthenticationDropdownMenu />
        </div>

        <div className="md:hidden block">
          <Sheet>
            <SheetTrigger className="md:hidden block" asChild>
              <Button variant="ghost" size="icon">
                <FaBars className="size-6 mx-auto" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-3 mt-16">
                <div className="flex flex-row items-center gap-3 p-2">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">Tên user</span>
                </div>
                <Button variant="ghost" className="w-full justify-start">
                  Chế độ tối
                </Button>
                <Button href="#" variant="ghost" className="w-full justify-start">
                  Quản lý
                </Button>
                <Button href="#" variant="ghost" className="w-full justify-start">
                  Đăng tin
                </Button>
                <Button href="#" variant="ghost" className="w-full justify-start">
                  Bất động sản
                </Button>
                <Button href="#" variant="ghost" className="w-full justify-start">
                  Biến động
                </Button>
                <Button href="#" variant="ghost" className="w-full justify-start">
                  Tin tức
                </Button>
                <LoginButton variant="ghost" className="w-full justify-start">
                  Đăng nhập
                </LoginButton>
                <LoginButton variant="ghost" className="w-full justify-start">
                  Đăng xuất
                </LoginButton>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
