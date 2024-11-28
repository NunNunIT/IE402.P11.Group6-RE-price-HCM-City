"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { LoginButton, LogoutButton } from "./authentication-button"

import { Button } from "../ui/button"
import { HiDotsVertical } from "react-icons/hi"
import { ToggleTheme } from "../toggle-theme"
import { useSession } from "next-auth/react";

export const AuthenticationDropdownMenu = () => {
  const { data: session } = useSession();

  return !!session?.user?.id && (
    <DropdownMenu>
      <DropdownMenuTrigger className="md:block hidden" asChild>
        <Button variant="ghost" size="icon">
          <HiDotsVertical className="size-6 mx-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <div className="flex flex-row items-center gap-3 p-2">
          <Avatar>
            <AvatarImage
              src={session.user.image}
              alt={session.user.name}
            />
            <AvatarFallback>{(session.user.name ?? "U")[0]}</AvatarFallback>
          </Avatar>
          <span>Tên user</span>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Chế độ tối
            <DropdownMenuShortcut>
              <ToggleTheme modal />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Quản lý</DropdownMenuItem>
        <DropdownMenuItem>Đăng tin</DropdownMenuItem>
        <DropdownMenuItem>Bất động sản</DropdownMenuItem>
        <DropdownMenuItem>Biến động</DropdownMenuItem>
        <DropdownMenuItem>Tin tức</DropdownMenuItem>
        <DropdownMenuSeparator />
        <LoginButton className="w-full">
          Đăng nhập
        </LoginButton>
        <DropdownMenuItem asChild>
          <LogoutButton className="w-full">
            Đăng xuất
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}