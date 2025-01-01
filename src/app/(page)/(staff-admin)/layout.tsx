import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "@/partial/sidebar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quản trị viên",
  description: "Trang quản trị viên.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <div className="w-full sticky top-0 p-3 bg-white dark:bg-zinc-900 z-50">
          <SidebarTrigger />
        </div>
        <div className="w-full max-w-6xl mx-auto px-2">{children}</div>
      </div>
    </SidebarProvider>
  );
}
