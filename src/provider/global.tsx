import { ThemeProvider } from ".";


export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </ThemeProvider>
  )
}
