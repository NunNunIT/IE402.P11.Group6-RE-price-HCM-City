"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { Button } from "../ui/button";
import { Fragment } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { IoIosNotifications } from "react-icons/io";
import { LogoutButton } from "./authentication-button";
import { NAVIGATION_OPTIONS_DATA } from "@/data/navigation.data";
import { isVisibleContext } from "@/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";

export const AuthenticationDropdownMenu = () => {
  const { data: session, status } = useSession();

  return (
    status === "authenticated" &&
    !!session?.user?.id && (
      <>
        <Button variant="ghost" size="icon" href="/notifications">
          <IoIosNotifications className="size-6 mx-auto" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger className="md:block hidden" asChild>
            <Button variant="ghost" size="icon">
              <HiDotsVertical className="size-6 mx-auto" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <Link href="/user" className="flex flex-row items-center gap-3 p-2">
              <Avatar>
                <AvatarImage src={session.user.image} alt={session.user.name} />
                <AvatarFallback>{(session.user.name ?? "U")[0]}</AvatarFallback>
              </Avatar>
              <span>{session.user.name}</span>
            </Link>
            <DropdownMenuSeparator />
            {NAVIGATION_OPTIONS_DATA.map((data) => (
              isVisibleContext(session, data) && (
                <Fragment key={data.title}>
                  <DropdownMenuItem asChild>
                    <Button
                      href={data.link}
                      variant="ghost"
                      className="w-full justify-start"
                    >
                      {data.title}
                    </Button>
                  </DropdownMenuItem>
                  {data?.isNeedSeparator && <DropdownMenuSeparator />}
                </Fragment>
              )
            ))}
            <DropdownMenuItem className="!p-0">
              <LogoutButton className="w-full">Đăng xuất</LogoutButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    )
  );
};
