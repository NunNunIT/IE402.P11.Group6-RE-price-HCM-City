"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define the switchVariants using class variance authority (CVA) for styling
const switchRootVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "data-[state=checked]:bg-black data-[state=unchecked]:bg-zinc-200 dark:focus-visible:ring-zinc-300 dark:focus-visible:ring-offset-zinc-950 dark:data-[state=checked]:bg-white dark:data-[state=unchecked]:bg-zinc-800",
        priRed:
          "data-[state=checked]:bg-pri-red-1 data-[state=unchecked]:bg-zinc-200 dark:focus-visible:ring-zinc-300 dark:focus-visible:ring-offset-zinc-950 dark:data-[state=checked]:bg-pri-red-1 dark:data-[state=unchecked]:bg-zinc-800",
      },
      size: {
        default: "h-6 w-11",
        sm: "h-5 w-9",
        lg: "h-7 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full shadow-lg transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
  {
    variants: {
      variant: {
        default: "data-[state=checked]:bg-white data-[state=unchecked]:bg-white dark:data-[state=checked]:bg-black dark:data-[state=unchecked]:bg-white",
        priRed:
          "data-[state=checked]:bg-white data-[state=unchecked]:bg-white",
      },
      size: {
        default: "h-5 w-5",
        sm: "h-4 w-4",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Define the SwitchProps interface
export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
  VariantProps<typeof switchRootVariants> { }

// Create the Switch component using forwardRef for Radix Switch
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, variant, size, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchRootVariants({ variant, size }), className)}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(switchThumbVariants({ variant, size }))}
    />
  </SwitchPrimitives.Root>
));

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
