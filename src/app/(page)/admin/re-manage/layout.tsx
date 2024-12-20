import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản lý bất động sản",
  description:
    "Trang quản lý thông tin bất động sản.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return children;
}
