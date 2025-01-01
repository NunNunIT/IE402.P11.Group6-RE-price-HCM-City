import NavBar from "@/partial/nav";
import { BreadcrumbCustom } from "@/components";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Trang chủ",
  description:
    "Trang web hàng đầu về bất động sản tại Việt Nam, cung cấp thông tin mua bán và cho thuê nhà đất chi tiết và chính xác.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <BreadcrumbCustom />
      {children}
      <SpeedInsights />
    </>
  );
}
