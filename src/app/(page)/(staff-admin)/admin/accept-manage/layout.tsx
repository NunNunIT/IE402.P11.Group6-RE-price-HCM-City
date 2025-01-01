import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Xét duyệt",
  description: "Trang xét duyệt bài đăng bán bất động sản.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return children;
}
