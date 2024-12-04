import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Trang chủ",
    url: "/",
    icon: Home,
  },
  {
    title: "Quản lý bất động sản",
    url: "/re-manage",
    icon: Inbox,
  },
  {
    title: "Quản lý địa điểm",
    url: "/location-manage",
    icon: Calendar,
  },
  {
    title: "Quản lý tin tức",
    url: "/news-manage",
    icon: Search,
  },
  {
    title: "Xét duyệt",
    url: "/accept-manage",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className="bg-white dark:bg-zinc-900">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
