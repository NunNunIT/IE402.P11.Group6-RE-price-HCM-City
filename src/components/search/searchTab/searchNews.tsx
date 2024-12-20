"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";

import { cn } from "@/lib/utils";

export default function SearchNews() {
  return (
    <form
      action={`/news-search-result`}
      method="GET"
      className={cn(
        "gap-8 flex w-full rounded-md",
        "border border-zinc-200 bg-white px-4 py-2 text-sm",
        "ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed",
        "disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950",
        "dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
      )}
    >
      {/* Search keyword input */}
      <Input
        type="text"
        name="keyword"
        placeholder="Nhập từ khóa để tìm tin tức"
        className="flex-1 border-none"
        required
      />
      <Button type="submit">
        <IoSearchOutline className="size-6" />
      </Button>
    </form>
  );
}
