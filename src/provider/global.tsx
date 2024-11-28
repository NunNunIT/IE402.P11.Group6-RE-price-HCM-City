import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from ".";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/auth";

export default async function GlobalProvider({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  )
}
