import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý tin tức",
  description: "Trang quản lý tin tức.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return children;
}
