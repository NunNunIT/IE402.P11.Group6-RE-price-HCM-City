"use client";

import { Button, ButtonProps } from "../ui/button";

import { useAuthWrapperFunction } from "@/hooks";
import { useRouter } from "next/navigation";

export default function AuthNavButton({ href, ...props }: Omit<ButtonProps, "onClick"> & { href: string }) {
  const router = useRouter();
  const onClick = useAuthWrapperFunction(async () => { router.push(href); });
  return <Button {...props} onClick={onClick} />;
}