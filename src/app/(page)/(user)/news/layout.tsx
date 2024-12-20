import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tin tức",
  description:
    "Cập nhật tin tức mới nhất về thị trường bất động sản, xu hướng và phân tích chuyên sâu.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return children;
}
