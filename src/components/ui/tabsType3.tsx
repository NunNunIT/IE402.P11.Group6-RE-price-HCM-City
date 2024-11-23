/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & { outsideClassName?: string }
>(({ className, outsideClassName, ...props }, ref) => {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const scrollLeft = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: -100, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 100, // Adjust scroll amount as needed
        behavior: "smooth",
      });
    }
  };

  const checkOverflow = () => {
    if (listRef.current) {
      const { scrollWidth, clientWidth } = listRef.current;
      setIsOverflowing(scrollWidth > clientWidth);
    }
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  useEffect(() => {
    if (listRef.current) {
      const observer = new MutationObserver(checkOverflow);
      observer.observe(listRef.current, { childList: true, subtree: true });
      return () => {
        observer.disconnect();
      };
    }
  }, [listRef.current]);

  return (
    <div className={outsideClassName}>
      <div className="relative flex items-center">
        {isOverflowing && (
          <button
            onClick={scrollLeft}
            className="hidden md:block absolute left-0 z-10 rounded-r-full text-zinc-500 bg-zinc-100 dark:bg-zinc-900"
          >
            <IoIosArrowBack className="w-8 h-8" />
          </button>
        )}
        <TabsPrimitive.List
          ref={listRef}
          className={cn(
            "flex flex-nowrap flex-row overflow-x-auto gap-2 no-scrollbar justify-start h-fit items-center text-zinc-500",
            isOverflowing ? "md:mx-10 md:px-10" : "",
            className
          )}
          {...props}
        >
          {props.children}
        </TabsPrimitive.List>

        {isOverflowing && (
          <button
            onClick={scrollRight}
            className="hidden md:block absolute right-0 z-10 rounded-l-full text-zinc-500 bg-zinc-100 dark:bg-zinc-900"
          >
            <IoIosArrowForward className="w-8 h-8" />
          </button>
        )}
      </div>
    </div>
  );
});

TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "text-nowrap font-semibold w-fit inline-flex items-center justify-center whitespace-nowrap px-8 md:py-3 py-2",
      "ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:font-semibold md:border-b-3 border-b-transparent data-[state=active]:border-b-pri-red-1 dark:data-[state=active]:border-b-pri-red-1",
      "md:bg-transparent bg-zinc-100 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80",
      "md:data-[state=active]:bg-transparent md:dark:data-[state=active]:bg-transparent data-[state=active]:bg-pri-red-1 dark:data-[state=active]:bg-pri-red-1 hover:data-[state=active]:bg-transparent",
      "text-lg md:text-zinc-600 md:dark:data-[state=active]:text-pri-red-1 md:data-[state=active]:text-pri-red-1 data-[state=active]:text-white",
      "md:rounded-none md:hover:data-[state=active]:rounded-none md:hover:rounded-md rounded-full",
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
      "mt-2 mb-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300 ",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
