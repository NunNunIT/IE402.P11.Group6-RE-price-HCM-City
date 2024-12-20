"use client";
import { usePathname, useRouter } from "next/navigation";

import {
  Building2,
  CheckCheckIcon,
  Home,
  MapPin,
  Newspaper,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { HiHomeModern } from "react-icons/hi2";

// Menu items.
const items = [
  {
    title: "Trang chủ",
    url: "/",
    icon: Home,
  },
  {
    title: "Quản lý bất động sản",
    url: "/admin/re-manage",
    icon: Building2,
  },
  {
    title: "Quản lý địa điểm",
    url: "/admin/location-manage",
    icon: MapPin,
  },
  {
    title: "Quản lý tin tức",
    url: "/admin/news-manage",
    icon: Newspaper,
  },
  {
    title: "Xét duyệt",
    url: "/admin/accept-manage",
    icon: CheckCheckIcon,
  },
];

const isActiveLink = (pathname: string, link: string) => {
  return pathname === link;
};

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarContent className="bg-white dark:bg-zinc-900">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href="/" className="flex gap-2 justify-center items-center">
              <HiHomeModern className="size-8 text-black dark:text-white" />
              <span className="font-extrabold text-xl text-black dark:text-white">
                Batdongsan
              </span>
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-3">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mt-2">
                  <SidebarMenuButton
                    asChild
                    className={`py-3 h-12 ${
                      isActiveLink(pathname, item.url) ? "bg-zinc-900 text-white hover:bg-zinc-950 hover:text-white" : ""
                    }`}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-12" />
                      <span className="">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
