"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";

export default function SearchBar() {
  return (
    <div className="gap-8 flex w-full rounded-md border border-zinc-200 bg-white px-8 py-4 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300">
      <Input
        type="text"
        placeholder="Tìm kiếm..."
        startIcon={<IoSearchOutline className="size-6" />}
      />
      <Button>
        <IoSearchOutline className="size-6" />
      </Button>
    </div>
  );
}
