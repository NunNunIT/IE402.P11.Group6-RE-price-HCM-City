"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
// import { HalfCircleIcon } from "@/icons/svg";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-fit items-center justify-center text-zinc-500 z-10",
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      `inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-base font-medium rounded-t-xl
        ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950
        focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
       data-[state=active]:border-zinc-500
        data-[state=active]:bg-white dark:data-[state=active]:bg-black
        data-[state=active]:text-black dark:data-[state=active]:text-white
        bg-zinc-950/50 dark:bg-zinc-950/80
        text-white dark:text-white
        hover:text-zinc-200 dark:hover:text-zinc-500 data-[state=active]:font-bold 
        dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300`,
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "bg-white dark:bg-black rounded-b-xl rounded-r-xl z-50 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
