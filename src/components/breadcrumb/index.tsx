"use client";

import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useParams, usePathname } from "next/navigation";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch data");
  const payload = await res.json();
  return payload.data.title;
}

const transfer = [
  { pathRoute: "/", nav: [{ route: "/", label: "Trang chủ" }] },
  {
    pathRoute: "/analysis",
    nav: [
      { route: "/", label: "Trang chủ" },
      { route: "/analysis", label: "Biến động" },
    ],
  },
  {
    pathRoute: "/create-new-re",
    nav: [
      { route: "/", label: "Trang chủ" },
      { route: "/create-new-re", label: "Tạo tin đăng bán bất động sản" },
    ],
  },
  {
    pathRoute: "/news",
    nav: [
      { route: "/", label: "Trang chủ" },
      { route: "/news", label: "Tin tức" },
    ],
  },
  {
    pathRoute: "/news/:id",
    nav: [
      { route: "/", label: "Trang chủ" },
      { route: "/news", label: "Tin tức" },
    ],
  },
  {
    pathRoute: "/news-search-result",
    nav: [
      { route: "/", label: "Trang chủ" },
      { route: "/news-search-result", label: "Kết quả tìm kiếm tin tức" },
    ],
  },
  {
    pathRoute: "/search-result",
    nav: [
      { route: "/", label: "Trang chủ" },
      { route: "/search-result", label: "Kết quả tìm kiếm bất động sản" },
    ],
  },
  {
    pathRoute: "/notifications",
    nav: [
      { route: "/", label: "Trang chủ" },
      { route: "/notifications", label: "Thông báo" },
    ],
  },
  {
    pathRoute: "/real-estate",
    nav: [
      { route: "/", label: "Trang chủ" },
      { route: "/real-estate", label: "Bất động sản" },
    ],
  },
  {
    pathRoute: "/real-estate/:id",
    nav: [
      { route: "/", label: "Trang chủ" },
      { route: "/real-estate", label: "Bất động sản" },
    ],
  },
  {
    pathRoute: "/user",
    nav: [
      { route: "/", label: "Trang chủ" },
      { route: "/user", label: "Tài khoản" },
    ],
  },

  {
    pathRoute: "/user/saved",
    nav: [
      { route: "/", label: "Trang chủ" },
      { route: "/user", label: "Tài khoản" },
      { route: "/user/saved", label: "Bộ sưu tập lưu" },
    ],
  },
  {
    pathRoute: "/user/my-re",
    nav: [
      { route: "/", label: "Trang chủ" },
      { route: "/user", label: "Tài khoản" },
      { route: "/user/my-re", label: "Bất động sản của tôi" },
    ],
  },
] as const;

export default function BreadcrumbWithCustomSeparator() {
  const { _id } = useParams();
  const pathname = usePathname();
  const path = pathname.includes("/real-estate/")
    ? 'real-estates' : pathname.includes("/news/")
      ? 'news' : undefined;
  const { data: title, isLoading, error } = useSWR(
    !!_id && path && `/api/${path}/${_id}`, fetcher);

  const breadcrumbNav =
    transfer.find((item) => {
      if (item.pathRoute.includes(":id")) {
        const baseRoute = item.pathRoute.replace("/:id", "");
        return pathname.startsWith(baseRoute);
      }
      return pathname === item.pathRoute;
    })?.nav || [];

  return (
    <div className="bg-white p-2 md:px-6 w-full">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbNav.map((navItem, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={navItem.route}>
                {navItem.label}
              </BreadcrumbLink>
              {((index < breadcrumbNav.length - 1) ||
                (_id && path && index === breadcrumbNav.length - 1)
              ) && (
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                )}
            </BreadcrumbItem>
          ))}
          {_id && path && (
            <BreadcrumbItem>
              <BreadcrumbLink className="text-ellipsis inline-block w-full">
                {isLoading || error ? <p>Loading...</p> : title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
