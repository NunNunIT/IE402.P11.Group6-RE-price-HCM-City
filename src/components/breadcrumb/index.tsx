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
  const tranfer = [
    { pathRoute: "/", nav: [{ route: "/", label: "Trang chủ" }] },
    {
      pathRoute: "/user",
      nav: [
        { route: "/", label: "Trang chủ" },
        { route: "/user", label: "Tài khoản" },
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
    {
      pathRoute: "/analysis",
      nav: [
        { route: "/", label: "Trang chủ" },
        { route: "/analysis", label: "Biến động" },
      ],
    },
    {
      pathRoute: "/news",
      nav: [
        { route: "/", label: "Trang chủ" },
        { route: "/news", label: "Tin tức" },
      ],
    },
  ];

  const pathname = usePathname();

  // Extract the breadcrumb labels for the current path
  const breadcrumbLabels =
    tranfer.find((item) => item.pathRoute === pathname)?.nav || [];

  return (
    <div className="bg-white p-2 md:px-6 w-full">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbLabels.map((nav, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={nav.route || "#"}>
                {nav.label}
              </BreadcrumbLink>
              {index < breadcrumbLabels.length - 1 && (
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
