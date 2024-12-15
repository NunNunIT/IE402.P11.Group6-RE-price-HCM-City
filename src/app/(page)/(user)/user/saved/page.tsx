"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Wrapper from "./components/wrapper";

export default function SavedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh]">
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
