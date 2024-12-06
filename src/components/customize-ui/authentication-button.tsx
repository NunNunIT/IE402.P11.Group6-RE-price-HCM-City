"use client";

import { Button, ButtonProps } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

import { useAuthDialogContext } from "@/provider";

export function LoginButton(props: Omit<ButtonProps, "onClick">) {
  const { onOpenChange } = useAuthDialogContext();
  const { status } = useSession();
  return status !== "authenticated" && <Button onClick={() => onOpenChange(true)} {...props} />
}

export function LoginWithProviderButton({ provider, ...props }: Omit<ButtonProps, "onClick"> & {
  provider: "google" | "github";
}) {
  const { status } = useSession();
  return status !== "authenticated" && (
    <Button
      onClick={() => signIn(provider, { redirectTo: "/" })}
      {...props}
    />
  )
}

export function LogoutButton(props: Omit<ButtonProps, "onClick">) {
  const { status } = useSession();
  return status === "authenticated" && (
    <Button variant="secondary" onClick={() => signOut({ redirect: true })} {...props} />
  )
}