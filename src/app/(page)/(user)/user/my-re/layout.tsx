import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bất động sản của tôi",
  description: "Trang quản lý thông tin bất động sản đã đăng bán.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return children;
}
