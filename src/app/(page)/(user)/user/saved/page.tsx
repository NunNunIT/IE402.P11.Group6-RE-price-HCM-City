"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Wrapper from "./components/wrapper";

const TABS_SAVED_VALUE = [["realEstate", "Bất động sản"], ["location", "Địa điểm"]] as const;

export default function SavedPage() {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 my-6">
      <Tabs defaultValue="realEstate" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          {TABS_SAVED_VALUE.map(([tab, title]) => (
            <TabsTrigger key={tab} value={tab}>{title}</TabsTrigger>
          ))}
        </TabsList>
        {TABS_SAVED_VALUE.map(([tab]) => (
          <TabsContent key={tab} value={tab}>
            <Wrapper typeCard={tab} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
