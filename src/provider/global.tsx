"use server";

import { Toaster as Toaster2 } from "@/components/ui/toaster"
import { auth } from "@/lib/auth";
import dynamic from "next/dynamic";

const AlertProvider = dynamic(() => import("./alert-dialog").then(mod => mod.AlertProvider), { ssr: false });
const Toaster = dynamic(() => import("@/components/ui/sonner").then(mod => mod.Toaster), { ssr: false });
const AuthDialogProvider = dynamic(() => import("./auth-dialog").then(mod => mod.AuthDialogProvider), { ssr: false });
const SessionProvider = dynamic(() => import("next-auth/react").then(mod => mod.SessionProvider), { ssr: false });

export async function GlobalProvider({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <AuthDialogProvider>
        <AlertProvider>
          {children}
          <Toaster />
          <Toaster2 />
        </AlertProvider>
      </AuthDialogProvider>
    </SessionProvider>
  )
}
