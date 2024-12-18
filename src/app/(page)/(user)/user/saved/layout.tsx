import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bộ sưu tập lưu",
  description:
    "Trang quản lý bất động sản, địa điểm đã lưu.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return children;
}
