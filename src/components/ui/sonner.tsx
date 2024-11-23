"use client"

import { LoaderCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { useMediaQuery } from "usehooks-ts"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()
  const isMobile = useMediaQuery("(max-width: 640px)");

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
        duration: 3000,
      }}
      richColors
      closeButton
      position={isMobile ? "top-center" : "bottom-right"}
      icons={{
        loading: <LoaderCircle className="animate-spin ml-2 size-4" />
      }}
      {...props}
    />
  )
}

export { Toaster }
