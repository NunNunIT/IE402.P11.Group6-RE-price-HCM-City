import { SearchRe } from "@/components/search";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bất động sản",
  description:
    "Trang hiển thị thông tin bất động sản và các thông tin liên quan.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh]">
      {children}
    </div>
  );
}
