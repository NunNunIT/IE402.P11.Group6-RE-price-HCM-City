import { AuthNavButton } from "@/components/customize-ui";
import { AuthenticationDropdownMenu } from "@/components/customize-ui/authentication-dropdown-menu";
import { Button } from "@/components/ui/button";
import { HiHomeModern } from "react-icons/hi2";
import Link from "next/link";
import { LoginButton } from "@/components/customize-ui/authentication-button";
import { NAVIGATION_DESKTOP_DATA } from "@/data/navigation.data";
import { PlusIcon, Search, XIcon } from "lucide-react";
import { Sidebar } from "@/components/customize-ui/sidebar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import SearchTabs from "@/components/search/searchTab";

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
            {NAVIGATION_DESKTOP_DATA.map((data) => (
              <Button
                key={data.link}
                href={data.link}
                variant="ghost"
                className="font-semibold"
              >
                {data.title}
              </Button>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-end items-end mr-3">
          <Sheet>
            <SheetTrigger asChild>
              <div className="cursor-pointer w-fit md:p-2 rounded-full border-2 border-zinc-400 bg-white flex flex-row gap-6 justify-between items-center">
                <span className="text-zinc-600 truncate text-nowrap ml-2 md:block hidden">
                  Tìm kiếm ...
                </span>
                <div className="rounded-full p-1 bg-zinc-100">
                  <Search className="size-6 text-zinc-600" />
                </div>
              </div>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              style={{
                backgroundImage: "url('/decorate/searchTab.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="inset-y-0 h-[100dvh] p-0"
            >
              <div className="relative h-full w-full mx-auto">
                <SheetClose className="z-10">
                  <Button
                    variant="secondary"
                    className="rounded-full absolute top-2 right-2 z-10"
                    size="icon"
                  >
                    <XIcon className="size-6" />
                  </Button>
                </SheetClose>
                <div className="max-w-4xl mx-auto w-full z-10 mt-20 md:p-0 p-2">
                  <SearchTabs />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="gap-3 md:flex hidden">
          <AuthNavButton
            href="/create-new-re"
            startIcon={<PlusIcon className="size-6" />}
          >
            Đăng tin
          </AuthNavButton>
          <LoginButton>Đăng nhập</LoginButton>
          <AuthenticationDropdownMenu />
        </div>

        <div className="md:hidden flex gap-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
