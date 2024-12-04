import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/partial/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <div className="w-full sticky top-0 p-3 bg-white dark:bg-zinc-900">
          <SidebarTrigger />
        </div>
        {children}
      </div>
    </SidebarProvider>
  );
}
