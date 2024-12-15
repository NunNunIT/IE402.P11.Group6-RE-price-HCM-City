"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LoginButton, LogoutButton } from "./authentication-button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

import { Button } from "../ui/button";
import { FaBars } from "react-icons/fa6";
import { Fragment } from "react";
import { IoIosNotifications } from "react-icons/io";
import { NAVIGATION_MOBILE_DATA } from "@/data/navigation.data";
import { Separator } from "../ui/separator";
import { isVisibleContext } from "@/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function Sidebar() {
  const { data: session, status } = useSession();

  return (
    <>
      <Button variant="ghost" size="icon">
        <IoIosNotifications className="size-6 mx-auto" />
      </Button>
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
              <Link href="/user" className="flex flex-row items-center gap-3 p-2">
                <Avatar>
                  <AvatarImage src={session.user.image} alt={session.user.name} />
                  <AvatarFallback>{(session.user.name ?? "U")[0]}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{session.user.name}</span>
              </Link>
            )}
            <Separator />
            {NAVIGATION_MOBILE_DATA.map((data, index) => (
              isVisibleContext(session, data) && (
                <Fragment key={index}>
                  <Button key={data.title} href={data.link} variant="ghost" className="w-full justify-start">
                    {data.title}
                  </Button>
                  {data.isNeedSeparator && <Separator />}
                </Fragment>
              )
            ))}
            <LogoutButton variant="secondary" className="w-full justify-start">
              Đăng xuất
            </LogoutButton>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
