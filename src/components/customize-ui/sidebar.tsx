"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LoginButton, LogoutButton } from "./authentication-button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { Button } from "../ui/button";
import { FaBars } from "react-icons/fa6";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { hasPermission } from "@/utils";
import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

export function Sidebar() {
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const toggleTheme = useCallback(() => setTheme(prev => prev === "dark" ? "light" : "dark"), [setTheme]);

  return (
    <Sheet>
      <SheetTrigger className="md:hidden block" asChild>
        <Button variant="ghost" size="icon">
          <FaBars className="size-6 mx-auto" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col gap-3 mt-16">
          <LoginButton variant="ghost" className="w-full justify-start">
            Đăng nhập
          </LoginButton>
          {status === "authenticated" && session?.user && (
            <div className="flex flex-row items-center gap-3 p-2">
              <Avatar>
                <AvatarImage
                  src={session.user.image}
                  alt={session.user.name}
                />
                <AvatarFallback>{(session.user.name ?? "U")[0]}</AvatarFallback>
              </Avatar>
              <span className="font-semibold">{session.user.name}</span>
            </div>
          )}
          <Separator />
          <Button variant="ghost" className="w-full justify-between items-center" onClick={toggleTheme}>
            <span>Chế độ tối</span>
            <Switch checked={resolvedTheme === "dark"} onCheckedChange={toggleTheme} />
          </Button>
          {status === "authenticated" && session?.user && hasPermission(session.user, "has:manage") && (
            <>
              <Separator />
              <Button href="#" variant="ghost" className="w-full justify-start">
                Quản lý
              </Button>
            </>
          )}
          <Separator />
          <Button href="#" variant="ghost" className="w-full justify-start">
            Đăng tin
          </Button>
          <Button href="#" variant="ghost" className="w-full justify-start">
            Bất động sản
          </Button>
          <Button href="#" variant="ghost" className="w-full justify-start">
            Biến động
          </Button>
          <Button href="#" variant="ghost" className="w-full justify-start">
            Tin tức
          </Button>
          {status === "authenticated" && session?.user && (
            <Separator />
          )}
          <LogoutButton variant="destructive" className="w-full justify-start">
            Đăng xuất
          </LogoutButton>
        </div>
      </SheetContent>
    </Sheet >
  );
}