import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thông báo",
  description:
    "Nhận thông báo mới nhất về bất động sản và xu hướng thị trường.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return children;
}
