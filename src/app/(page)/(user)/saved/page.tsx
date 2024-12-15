"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Wrapper from "./components/wrapper";
import { SearchBar } from "@/components/search";

export default function SavedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh]">
      <div className="relative w-full h-[40dvh] flex justify-center items-center z-10">
        <Image
          src="/decorate/searchTab.jpg"
          alt="Background"
          width="1000"
          height="1000"
          className="absolute z-5 w-full h-full object-cover brightness-75"
        />
        <div className="w-full max-w-4xl mx-auto my-auto z-10 pt-20 md:px-0 px-3">
          <SearchBar />
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 my-6">
        <Tabs defaultValue="realEstate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="realEstate">Bất động sản</TabsTrigger>
            <TabsTrigger value="location">Địa điểm</TabsTrigger>
          </TabsList>
          <TabsContent value="realEstate">
            <Wrapper typeCard="realEstate" />
          </TabsContent>
          <TabsContent value="location">
            <Wrapper typeCard="location" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
