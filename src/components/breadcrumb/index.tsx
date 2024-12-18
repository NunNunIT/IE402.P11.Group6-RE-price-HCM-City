"use client";

import { Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function BreadcrumbWithCustomSeparator() {
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
  ];

  const pathname = usePathname();

  // Extract the breadcrumb navigation for the current path
  const breadcrumbNav =
    transfer.find((item) => item.pathRoute === pathname)?.nav || [];

  return (
    <div className="bg-white p-2 md:px-6 w-full">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbNav.map((navItem, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={navItem.route}>
                {navItem.label}
              </BreadcrumbLink>
              {index < breadcrumbNav.length - 1 && (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
