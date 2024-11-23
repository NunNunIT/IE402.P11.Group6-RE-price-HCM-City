import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:user-none dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 duration-200",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
        destructive:
          "bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
        outline:
          "border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        secondary:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        outline_teal:
          "border border-teal-600 bg-white hover:bg-teal-100 text-teal-600 hover:text-teal-800 dark:border-teal-800 dark:bg-teal-800 dark:text-teal-300 dark:hover:bg-teal-600 dark:hover:text-teal-50",
        secondary_teal:
          "bg-teal-100 text-teal-900 hover:bg-teal-100/80 dark:bg-teal-800 dark:text-teal-50 dark:hover:bg-teal-800/80",
        ghost:
          "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        ghost2:
          "text-zinc-900 bg-zinc-100/80 hover:bg-zinc-200/80 hover:text-zinc-900",
        link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
        blue: "bg-blue-500 hover:bg-blue-600 text-base font-medium text-white",
        white: "bg-zinc-50 text-zinc-900 hover:bg-zinc-100 hover:text-zinc-900",
        zinc: "bg-zinc-950 text-zinc-50 hover:bg-zinc-50/90 hover:text-zinc-900",
        priRedHover:
          "text-zinc-900 dark:text-zinc-200 hover:text-pri-red-1 dark:hover:text-pri-red-1",
        priRed2:
          "bg-pri-red-2 text-white dark:text-white hover:bg-pri-red-2 hover:brightness-110",
        priRed1:
          "bg-pri-red-1 text-white dark:text-white hover:bg-pri-red-1 hover:brightness-110",
        vip: "border-none bg-gradient-to-r from-[#b2842c] via-[#fcf6ba] to-[#b2842c] text-yellow-800 ease-in-out hover:scale-[1.02]",
        delete:
          "border-1 border-red-600 bg-white hover:bg-red-600 dark:border-red-600 dark:bg-zinc-900 dark:hover:bg-red-800 dark:hover:text-zinc-50 text-red-800 hover:text-white dark:text-red-600",
        none: "",
      },
      size: {
        default: "h-12 px-4 py-2",
        sm: "h-11 rounded-md px-3",
        lg: "h-13 rounded-md px-8",
        icon: "size-12",
        none: ""
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  href?: string; // Add href prop to interface
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      startIcon,
      endIcon,
      variant,
      size,
      asChild = false,
      children,
      href,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"; // Use 'a' if href is provided

    const buttonContent = (
      <>
        {startIcon && (
          <span className={`aspect-square ${children ? "mr-2" : ""}`}>
            {startIcon}
          </span>
        )}
        {children}
        {endIcon && (
          <span className={`aspect-square ${children ? "ml-2" : ""}`}>
            {endIcon}
          </span>
        )}
      </>
    );

    if (href) {
      return (
        <Link href={href}>
          <Comp
            className={cn(buttonVariants({ variant, size, className }), startIcon && "pl-3", endIcon && "pr-3")}
            ref={ref} // Adjust ref type for anchor element
            {...props}
          >
            {buttonContent}
          </Comp>
        </Link>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), startIcon && "pl-3", endIcon && "pr-3")}
        ref={ref}
        {...props}
      >
        {buttonContent}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
