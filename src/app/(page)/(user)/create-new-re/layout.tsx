import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tạo tin đăng bán bất động sản",
  description:
    "Trang tạo tin đăng bán bất động sản, cung cấp thông tin chi tiết về bất động sản cần bán.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return children;
}
