"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabsType4";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoSearchOutline } from "react-icons/io5";
import { SelectorLocationDialogSheet } from "@/components";
import { useState } from "react";

export default function TabsDemo() {
  const [searchProvince, setSearchProvince] = useState<string | string[]>(
    "Hồ Chí Minh"
  );
  const [currentPosition, setCurrentPosition] = useState<TPosition | null>(
    null
  );

  return (
    <Tabs defaultValue="realestate" className="w-full max-w-4xl">
      <TabsList className="">
        <TabsTrigger className="w-36" value="realestate">
          Bất động sản
        </TabsTrigger>
        <TabsTrigger className="w-36" value="news">
          Tin tức
        </TabsTrigger>
      </TabsList>
      <TabsContent value="realestate" className="p-4">
        <div className="gap-8 flex w-full rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300">
          <SelectorLocationDialogSheet
            search={true}
            multiChoice={false}
            selectedValue={searchProvince}
            setSelectedValue={setSearchProvince}
            typeTrigger={2}
            // triggerCustomize={triggerCustomize}
            positioning
            currentPosition={currentPosition}
            setCurrentPosition={setCurrentPosition}
            typeOptions={2}
          />
          <Input
            type="text"
            placeholder="Nhập địa điểm tìm kiếm"
            startIcon={<IoSearchOutline className="size-6" />}
          />
          <Button>
            <IoSearchOutline className="size-6" />
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="news" className="p-4">
        <div className="gap-8 flex w-full rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300">
          <Input
            type="text"
            placeholder="Tìm kiếm tin tức"
            startIcon={<IoSearchOutline className="size-6" />}
            className="border-none"
          />
          <Button>
            <IoSearchOutline className="size-6" />
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
