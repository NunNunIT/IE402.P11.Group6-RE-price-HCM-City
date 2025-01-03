import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý địa điểm",
  description: "Trang quản lý địa điểm.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return children;
}
