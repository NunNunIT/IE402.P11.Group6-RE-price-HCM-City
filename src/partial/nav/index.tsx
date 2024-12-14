import { AuthNavButton } from "@/components/customize-ui";
import { AuthenticationDropdownMenu } from "@/components/customize-ui/authentication-dropdown-menu";
import { Button } from "@/components/ui/button";
import { HiHomeModern } from "react-icons/hi2";
import Link from "next/link";
import { LoginButton } from "@/components/customize-ui/authentication-button";
import { NAVIGATION_DESKTOP_DATA } from "@/data/navigation.data";
import { PlusIcon } from "lucide-react";
import { Sidebar } from "@/components/customize-ui/sidebar";

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
              <Button key={data.link} href={data.link} variant="ghost" className="font-semibold">
                {data.title}
              </Button>
            ))}
          </div>
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
