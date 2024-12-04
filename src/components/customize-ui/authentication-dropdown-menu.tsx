"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LoginButton, LogoutButton } from "./authentication-button";

import { Button } from "../ui/button";
import { HiDotsVertical } from "react-icons/hi";
import { hasPermission } from "@/utils/functions";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

export const AuthenticationDropdownMenu = () => {
  const { data: session, status } = useSession();

  return (
    status === "authenticated" &&
    !!session?.user?.id && (
      <DropdownMenu>
        <DropdownMenuTrigger className="md:block hidden" asChild>
          <Button variant="ghost" size="icon">
            <HiDotsVertical className="size-6 mx-auto" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <div className="flex flex-row items-center gap-3 p-2">
            <Avatar>
              <AvatarImage src={session.user.image} alt={session.user.name} />
              <AvatarFallback>{(session.user.name ?? "U")[0]}</AvatarFallback>
            </Avatar>
            <span>{session.user.name}</span>
          </div>

          <DropdownMenuSeparator />
          {hasPermission(session.user, "has:manage") && (
            <DropdownMenuItem>Quản lý</DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Button
              href="/create-new-re"
              variant="ghost"
              className="w-full justify-start"
            >
              Đăng tin
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              href="/real-estate"
              variant="ghost"
              className="w-full justify-start"
            >
              Bất động sản
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              href="/analysis"
              variant="ghost"
              className="w-full justify-start"
            >
              Biến động
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              href="/news"
              variant="ghost"
              className="w-full justify-start"
            >
              Tin tức
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button href="#" variant="ghost" className="w-full justify-start">
              Lưu
            </Button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <LoginButton className="w-full">Đăng nhập</LoginButton>
          <DropdownMenuItem className="!p-0">
            <LogoutButton className="w-full">Đăng xuất</LogoutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  );
};
