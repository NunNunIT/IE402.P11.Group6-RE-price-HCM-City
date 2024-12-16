"use client";

import { Card, CardContent } from "@/components/ui/card";
import { NAVIGATION_USER_LINKS, NAVIGATION_USER_LOGOUT } from "@/data/navigation-user.data";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const LogoutButton = dynamic(
  () => import("@/components/customize-ui/authentication-button").then(mod => mod.LogoutButton),
  { ssr: false, loading: () => <>Loading...</> }
);

const isActiveLink = (pathname: string, link: string) => {
  return pathname === link;
}

export default function UserLayout({ children }: IDefaultLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] mx-auto container my-4 px-4 gap-4">
      <Card className="h-fit">
        <CardContent className="mt-6">
          <ul className="flex flex-col w-full gap-2">
            {NAVIGATION_USER_LINKS.map(({ icon: Icon, ...tab }, index) => (
              <li key={index}>
                <Button
                  className="w-full flex justify-start items-center text-left"
                  variant={isActiveLink(pathname, tab.link) ? "default" : "ghost"}
                  onClick={() => router.push(tab.link)}
                >
                  <Icon className="size-5 mr-2" />
                  <span>{tab.title}</span>
                </Button>
              </li>
            ))}
          </ul>

          <LogoutButton className="w-full justify-start items-center hidden md:flex mt-8">
            <NAVIGATION_USER_LOGOUT.icon className="size-5 mr-2" />
            <span>{NAVIGATION_USER_LOGOUT.title}</span>
          </LogoutButton>
        </CardContent>
      </Card>
      <div className="gap-4">
        {children}
      </div>
    </div>
  );
}
