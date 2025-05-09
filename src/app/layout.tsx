import "./globals.css";

import { Be_Vietnam_Pro } from "next/font/google";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { SpeedInsights } from "@vercel/speed-insights/next";

const GlobalProvider = dynamic(
  () => import("@/provider/global").then((mod) => mod.GlobalProvider),
  { ssr: false }
);

const be_vietnam_pro = Be_Vietnam_Pro({
  weight: "500",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "Batdongsan | %s ",
    default: "Batdongsan",
  },
  description:
    "Trang web hàng đầu về bất động sản tại Việt Nam, cung cấp thông tin mua bán và cho thuê nhà đất chi tiết và chính xác.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={be_vietnam_pro.className}
      style={{
        fontFamily:
          "__Be_Vietnam_Pro_3db0d5, __Be_Vietnam_Pro_Fallback_3db0d5 !important",
      }}
    >
      <body
        className={`unremoved-classname bg-zinc-50 dark:bg-black antialiased`}
      >
        <GlobalProvider>{children}</GlobalProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
