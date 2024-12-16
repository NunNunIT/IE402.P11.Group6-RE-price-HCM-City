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
    { route: "/", label: ["Trang chủ"] },
    { route: "/user", label: ["Trang chủ", "Tài khoản"] },
    { route: "/real-estate", label: ["Trang chủ", "Bất động sản"] },
    {
      route: "/user/saved",
      label: ["Trang chủ", "Tài khoản", "Bộ sưu tập lưu"],
    },
    {
      route: "/user/my-re",
      label: ["Trang chủ", "Tài khoản", "Bất động sản của tôi"],
    },
    { route: "/analysis", label: ["Trang chủ", "Biến động"] },
    { route: "/news", label: ["Trang chủ", "Tin tức"] },
  ];

  const pathname = usePathname();

  // Extract the breadcrumb labels for the current path
  const breadcrumbLabels =
    tranfer.find((item) => item.route === pathname)?.label || [];

  return (
    <div className="bg-white p-2 md:px-6 w-full">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbLabels.map((label, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                href={
                  tranfer.find((item) => item.label.includes(label))?.route ||
                  "#"
                }
              >
                {label}
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
