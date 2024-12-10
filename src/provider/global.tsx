"use server";

import { AuthDialogProvider } from ".";
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth";
import { AlertProvider } from "./alert-dialog";

export async function GlobalProvider({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <AuthDialogProvider>
        <AlertProvider>
          {children}
          <Toaster />
        </AlertProvider>
      </AuthDialogProvider>
    </SessionProvider>
  )
}
