import { ThemeProvider } from ".";
import { Toaster } from "@/components/ui/sonner";


export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
    >
      {children}
      <Toaster />
    </ThemeProvider>
  )
}
