"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabsType4";

import SearchNews from "./searchNews";
import SearchRe from "./searchRe";

export default function SearchTabs() {
  return (
    <Tabs defaultValue="realEstate" className="w-full max-w-4xl">
      <TabsList className="">
        <TabsTrigger className="w-36" value="realEstate">
          Bất động sản
        </TabsTrigger>
        <TabsTrigger className="w-36" value="news">
          Tin tức
        </TabsTrigger>
      </TabsList>
      <TabsContent value="realEstate" className="p-4">
        <SearchRe />
      </TabsContent>
      <TabsContent value="news" className="p-4">
        <SearchNews />
      </TabsContent>
    </Tabs>
  );
}

