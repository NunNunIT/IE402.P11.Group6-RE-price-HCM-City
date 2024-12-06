import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Image from "next/image";
import { MockData } from "@/types/item";
import SavedCard from "@/components/savedCard";
import { SearchBar } from "@/components/search";

const mockDataAll: MockData[] = [
  {
    type: "realEstate",
    value: {
      image: "/decorate/searchTab.jpg",
      title: "Real Estate Title",
      location: "New York",
      distance: "5km",
      price: "$500,000",
    },
  },
  {
    type: "location",
    value: {
      image: "/decorate/searchTab.jpg",
      title: "Workshop Location",
      location: "California",
      duration: "3 days",
      workshopType: "Technology",
      rating: 4.5,
    },
  },
  {
    type: "location",
    value: {
      image: "/decorate/searchTab.jpg",
      title: "Workshop Location 2",
      location: "Texas",
      duration: "2 days",
      workshopType: "Art",
      rating: 4.0,
    },
  },
  {
    type: "realEstate",
    value: {
      image: "/decorate/searchTab.jpg",
      title: "Luxury Apartment",
      location: "California",
      distance: "2km",
      price: "$1,000,000",
    },
  },
  {
    type: "location",
    value: {
      image: "/decorate/searchTab.jpg",
      title: "Workshop Location 3",
      location: "Chicago",
      duration: "1 day",
      workshopType: "Health",
      rating: 5.0,
    },
  },
  {
    type: "realEstate",
    value: {
      image: "/decorate/searchTab.jpg",
      title: "Modern House",
      location: "Florida",
      distance: "10km",
      price: "$350,000",
    },
  },
];

export default function SavedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh]">
      {/* <GISMap className="container" /> */}
      {/* <div className="relative w-full h-[50dvh] -mt-[11rem] flex justify-center items-center z-10"> */}
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
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="realEstate">Bất động sản</TabsTrigger>
            <TabsTrigger value="location">Địa điểm</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <SavedCard typeCard="all" data={mockDataAll} />
          </TabsContent>
          <TabsContent value="realEstate">
            <SavedCard typeCard="realEstate" />
          </TabsContent>
          <TabsContent value="location">
            <SavedCard typeCard="location" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
